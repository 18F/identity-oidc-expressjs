module.exports = function(app, passport) {
    app.get('/login', passport.authenticate('oidc'))

    app.get('/auth/result',
      passport.authenticate('oidc', {
        successRedirect:'/profile',
        failureRedirect:'/'
      }
    ))

    app.get('/profile', isLoggedIn, function(req, res){
        console.log("USER PROFILE", req.user)

        res.render('profile', {
          title: 'Express - profile',
          user: req.user.name
        })
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("IS AUTHENTICATED");
        return next();
    }
    console.log("NOT AUTHENTICATED");
    res.redirect('/');
}
