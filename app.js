var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var loginGov = require('./login-gov')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.locals.title = "Login.gov OIDC Client (Express.js)"

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








var jose = require('node-jose'); // used to parse the keystore
var Issuer = require('openid-client').Issuer;
var Strategy = require('openid-client').Strategy;

jose.JWK.asKeyStore(loginGov.keys).then(function(keystore){
  console.log("KEYSTORE", keystore)

  Issuer.discover(loginGov.discoveryUrl).then(function(issuer){
    console.log("ISSUER", typeof(issuer), issuer)

    var client = new issuer.Client(loginGov.clientOptions, keystore)
    console.log("CLIENT", typeof(client), client)

    const strategy = new Strategy({client: client, params: loginGov.params}, function(tokenset, userinfo, done) {
      console.log("TOKEN SET", tokenset)
      console.log("USER INFO", userinfo)
      return done(null, userinfo);
    })

    passport.use("oidc", strategy)

  }).catch(function(err){
    console.log("LOGIN.GOV DISCOVERY ERROR", err)
  })

}).catch(function(err){
  console.log("LOGIN.GOV KEYSTORE ERROR", err)
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
