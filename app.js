var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var ejsLayouts = require("express-ejs-layouts") WAT
//var partials = require('express-partials') WAT

var session = require("express-session"); // NEW
var passport = require('passport'); // NEW
var OpenIDStrategy = require('passport-openid').Strategy; // NEW

//
// CONFIGURE PASSPORT
// ... adapted from: https://github.com/jaredhanson/passport-openid/blob/master/examples/signon/app.js
//

passport.serializeUser(function(user, done) {
  done(null, user.identifier);
}) // NEW

passport.deserializeUser(function(identifier, done) {
  done(null, { identifier: identifier });
}) // NEW

passport.use(new OpenIDStrategy({
    returnURL: 'http://localhost:3000/auth/openid/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, done) {
    process.nextTick(function () {
      return done(null, { identifier: identifier })
    });
  }
)); // NEW

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "My Identity SP" // NEW! set a common title for all EJS views
// app.use(partials()); WAT
// app.use(ejsLayouts) WAT

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//var sessionStore = new session.MemoryStore;
app.use(session({
  //cookie: { maxAge: 60000 },
  //store: sessionStore,
  secret: process.env.SESSION_SECRET || 'my-sp-session-secret',
  //name: 'my-sp-session-name',
  resave: true,
  saveUninitialized: true
})) // NEW

app.use(passport.initialize()) // NEW
app.use(passport.session()) // NEW

//app.use('/', index);
//app.use('/users', users);

//
// PASSPORT ROUTES
// ... adapted from: https://github.com/jaredhanson/passport-openid/blob/master/examples/signon/app.js
//

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.post('/auth/openid',
  passport.authenticate('openid', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/openid/return',
  passport.authenticate('openid', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

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
