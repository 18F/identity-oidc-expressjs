//
// AUTHENTICATION ROUTES
//

module.exports = function(app, passport) {

    //
    // LOGIN
    //

    app.get('/login', passport.authenticate('oidc'))

    //
    // LOGOUT
    //

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

    //
    // CALLBACK
    //

    app.get('/auth/result',
      passport.authenticate('oidc', {
        //successRedirect:'/profile',
        failureRedirect:'/'
      }),
      function(req, res){
        console.log("CALLBACK PARAMS", res.query)
        res.redirect("/profile")
      }
    )

    //
    // PROFILE
    //
    app.get('/profile', isLoggedIn, function(req, res){
        console.log("USER PROFILE", req.user)

        res.render('profile', {
          title: 'Express - profile',
          user: req.user.name
        })
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
