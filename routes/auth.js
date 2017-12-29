const loginGov = require("../login-gov")

module.exports = function(app, passport) {

    // LOGIN

    app.get('/auth/login-gov/login', passport.authenticate('oidc')) // use default strategy (from app.js)

    app.get('/auth/login-gov/login/loa1', function(req, res){
      // change the strategy on the fly
      loginGov.reconfigure(passport, 1).then(function(result){
        console.log(result)
        console.log("RE-AUTHENTICATING PASSPORT USING LOA1")
        passport.authenticate('oidc')
      }).catch(function(){
        throw "LOGIN.GOV RECONFIGURATION ERROR"
      })
    })

    app.get('/auth/login-gov/login/loa3', function(req, res){
      // change the strategy on the fly
      loginGov.reconfigure(passport, 3).then(function(result){
        console.log(result)
        console.log("RE-AUTHENTICATING PASSPORT USING LOA3")
        passport.authenticate('oidc')
      }).catch(function(){
        throw "LOGIN.GOV RECONFIGURATION ERROR"
      })
    })

    // CALLBACK

    app.get('/auth/login-gov/callback', passport.authenticate('oidc', {successRedirect:'/profile', failureRedirect:'/'}) )

    // LOGOUT

    app.get('/auth/login-gov/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

}
