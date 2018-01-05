const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const loginGovStrategy = require('./login-gov');

const loginGovRoutes = require('./routes/auth/login-gov');
const index = require('./routes/index');
const users = require('./routes/users');

var app = express();

app.locals.title = "Login.gov OIDC Client (Express.js)";

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
  secret: process.env.SESSION_SECRET || 'identity-oidc-expressjs-secret',
  name: 'identity-oidc-expressjs-session',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done( null, user); }); // this is where you might fetch a user record from the database. see http://www.passportjs.org/docs/configure/#sessions

loginGovStrategy.configure(passport, 1); // configure LOA1 strategy
loginGovStrategy.configure(passport, 3); // configure LOA3 strategy

loginGovRoutes.configure(app, passport); // use login.gov auth routes
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
