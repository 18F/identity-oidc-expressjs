var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var fs = require('fs'); // used to read in the key file
var jose = require('node-jose'); // used to parse the keystore
var Issuer = require('openid-client').Issuer;
var Strategy = require('openid-client').Strategy;

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










var jwk_file = "./keys/full_key.jwk"
var oidc_discover_url = "https://mitreid.org" // https://idp.int.login.gov/.well-known/openid-configuration
//var client_params = {
//	client_id: 'login-nodejs-govt-test',
//	token_endpoint_auth_method: 'private_key_jwt'
//}
//var strat_params = {
//	redirect_uri: 'http://localhost:3000/openid-connect-login',
//	scope: 'openid profile email phone address',
//	response: ['userinfo']
//}

var authroutes = require('./routes/authenticated_routes')(app, passport);
var jwk_json = JSON.parse(fs.readFileSync(jwk_file, "utf-8"));

let load_keystore = jose.JWK.asKeyStore(jwk_json) // returns a Promise
let discover_issuer = Issuer.discover(oidc_discover_url) // returns a Promise

//// Create a client, and use it set up a Strategy for passport to use
//// since we need both the Issuer and the keystore, we'll use Promise.all()
//Promise.all([load_keystore, discover_issuer])
//	.then(([ks, myIssuer]) => {
//		console.log("Found Issuer: ", myIssuer);
//		const oidc_client = new myIssuer.Client(client_params, ks);
//		console.log("Created client: ", oidc_client);
//
//		// create a strategy along with the function that processes the results
//		passport.use('oidc', new Strategy({client: oidc_client, params: strat_params}, (tokenset, userinfo, done) => {
//			// we're just loging out the tokens. Don't do this in production
//			console.log('tokenset', tokenset);
//			console.log('access_token', tokenset.access_token);
//			console.log('id_token', tokenset.id_token);
//			console.log('claims', tokenset.claims);
//			console.log('userinfo', userinfo);
//
//			// to do anything, we need to return a user.
//			// if you are storing information in your application this would use some middlewhere and a database
//			// the call would typically look like
//			// User.findOrCreate(userinfo.sub, userinfo, (err, user) => { done(err, user); });
//			// we'll just pass along the userinfo object as a simple 'user' object
//			return done(null, userinfo);
//		}));
//	}) // close off the .then()
//	.catch((err) => {console.log("Error in OIDC setup", err);});























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
