var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Example Login.gov OIDC Client (Express.js)' });
});

router.get('/profile', authenticate, function(req, res){
    console.log("USER PROFILE", req.user)

    res.render('profile', {
      user: req.user.name
    })
})

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("AUTHENTICATED");
        return next();
    }
    console.log("NOT AUTHENTICATED");
    res.redirect('/');
}

module.exports = router;
