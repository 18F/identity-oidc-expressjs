var loginGovRoutes = {};

loginGovRoutes.configure = function(app, passport) {

    //
    // LOGIN
    // ... app.get('/auth/login-gov/login', passport.authenticate('oidc'))
    //

    app.get('/auth/login-gov/login/loa-1', passport.authenticate('oidc-loa-1'));
    app.get('/auth/login-gov/login/loa-3', passport.authenticate('oidc-loa-3'));

    //
    // CALLBACK
    // ... app.get('/auth/login-gov/callback', passport.authenticate('oidc', {successRedirect:'/profile', failureRedirect:'/'}) )
    //

    app.get('/auth/login-gov/callback/loa-1', passport.authenticate('oidc-loa-1', {successRedirect:'/profile', failureRedirect:'/'}) );
    app.get('/auth/login-gov/callback/loa-3', passport.authenticate('oidc-loa-3', {successRedirect:'/profile', failureRedirect:'/'}) );

    //
    // LOGOUT
    //

    app.get('/auth/login-gov/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

module.exports = loginGovRoutes;
