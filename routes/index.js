var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    heading: 'Login.gov OIDC Client (Express.js)'
  });
});

router.get('/profile', authenticate, function(req, res){
    res.render('profile', {
      heading: 'Profile Page',
      user: req.user
    })
})

router.get('/other', authenticate, function(req, res){
    res.render('other', {
      heading: 'Other Page',
      user: req.user
    })
})

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("AUTHENTICATED USER", req.user)
        return next();
    }
    console.log("NOT AUTHENTICATED");
    res.redirect('/');
}

module.exports = router;
