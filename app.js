var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  //cookie: { maxAge: 60000 },
  //store: sessionStore,
  secret: process.env.SESSION_SECRET || 'my-identity-sp-secret',
  name: 'my-identity-sp-session',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done( null, user);
})

var auth = require('./routes/auth')(app, passport);







var crypto = require("crypto")
var fs = require('fs'); // used to read in the key file
var pem2jwk = require('pem-jwk').pem2jwk // used to convert key file from PEM to JWK
var jose = require('node-jose'); // used to parse the keystore
var Issuer = require('openid-client').Issuer;
var Strategy = require('openid-client').Strategy;

var keyFile = './keys/local/sinatra_demo_sp.key'
var key = fs.readFileSync(keyFile, 'ascii')
console.log("KEY", key)
var jwk = pem2jwk(key)
console.log("JWK", typeof(jwk), jwk)
var keys = [jwk]
let loadKeystore = jose.JWK.asKeyStore(keys) // returns a Promise

function randomString(length) {
  return crypto.randomBytes(length).toString('hex')
}

loadKeystore.then(function(keystore){
  console.log("KEY STORE", keystore)

  // Problems using localhost because auto-discovery wants to use SSL, results in Request Errors
  // Problems using INT because of basic auth
  //
  //const DISCOVERY_URL = 'https://idp.int.login.gov/' //'localhost:3000' // 'https://idp.int.login.gov/'
  // Issuer.discover(DISCOVERY_URL).then(function(issuer){
  //   console.log("ISSUER", issuer)
  // }).catch(function(err){
  //   console.log("DISCOVERY ERROR", err)
  // })
  //
  // ... so use hard-coded, manual localhost strategy ...
  var issuer = new Issuer({
    "acr_values_supported": ["http://idmanagement.gov/ns/assurance/loa/1", "http://idmanagement.gov/ns/assurance/loa/3"],
    "claims_supported": ["iss", "sub", "email", "email_verified", "address", "phone", "phone_verified", "given_name", "family_name", "birthdate", "social_security_number"],
    "grant_types_supported": ["authorization_code"],
    "response_types_supported": ["code"],
    "scopes_supported": ["address", "email", "openid", "phone", "profile", "profile:birthdate", "profile:name", "social_security_number"],
    "subject_types_supported": ["pairwise"],
    "authorization_endpoint": "http://localhost:3000/openid_connect/authorize",
    "issuer": "http://localhost:3000/",
    "jwks_uri": "http://localhost:3000/api/openid_connect/certs",
    "service_documentation": "https://pages.18f.gov/identity-dev-docs/",
    "token_endpoint": "http://localhost:3000/api/openid_connect/token",
    "userinfo_endpoint": "http://localhost:3000/api/openid_connect/userinfo",
    "end_session_endpoint": "http://localhost:3000/openid_connect/logout",
    "id_token_signing_alg_values_supported": ["RS256"],
    "token_endpoint_auth_methods_supported": ["private_key_jwt"],
    "token_endpoint_auth_signing_alg_values_supported": ["RS256"]
  }) // localhost well known config values
  console.log("ISSUER", typeof(issuer), issuer)

  var client = new issuer.Client(
    {
      client_id: 'urn:gov:gsa:openidconnect:sp:sinatra',
      token_endpoint_auth_method: 'private_key_jwt',
      id_token_signed_response_alg: 'RS256'
    }, keystore
  )
  console.log("CLIENT", typeof(client), client)

  const params = {
    response_type: 'code',
    acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
    scope: 'openid email',
    redirect_uri: 'localhost:9393/auth/login-gov/callback',
    nonce: randomString(32),
    state: randomString(32),
    prompt: 'select_account'
  }
  console.log("PARAMS", params)

  const strategy = new Strategy({client: client, params: params}, function(tokenset, userinfo, done) {
    console.log("TOKEN SET", tokenset)
    console.log("USER INFO", userinfo)

    return done(null, userinfo);
  })

  passport.use("oidc", strategy)

}).catch(function(err){
  console.log("KEY STORE ERROR", err)
})
















app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
