module.exports = function(app, passport) {

    app.get('/auth/login-gov/login', passport.authenticate('oidc'))

    app.get('/auth/login-gov/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

    app.get('/auth/login-gov/callback',
      passport.authenticate('oidc', {
        //successRedirect:'/profile',
        failureRedirect:'/'
      }),
      function(req, res){
        console.log("CALLBACK PARAMS", res.query)
        res.redirect("/profile")
      }
    )
}
