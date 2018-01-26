var loginGov = require('../../login-gov');

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

    // Logout from this application, but not from login.gov
    app.get('/auth/login-gov/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Logout from this application and from login.gov
    app.get('/auth/login-gov/oidc-logout', function(req, res, next) {
        //req.logout();

        const logoutUrl = `${loginGov.discoveryUrl}/openid_connect/logout` // TODO: get from issuer well-known config data
        const logoutRedirectUrl = process.env.LOGOUT_REDIRECT_URL || `http://localhost:${(process.env.PORT || '9393')}`
        const token = "abc-123" // TODO: get from req.cookie OR req.session.passport.user
        const requestUrl = `${logoutUrl}?id_token_hint=${token}&post_logout_redirect_uri=${logoutRedirectUrl}&state=${loginGov.randomString(32)}`

        //res.redirect(logoutUrl, {
        //  search: null,
        //  query: {
        //    id_token_hint: "ABC-123",
        //    state: loginGov.randomString(32),
        //    post_logout_redirect_uri: logoutRedirectUrl
        //  }
        //});

        res.redirect(requestUrl);

        // return next();
    });

};

module.exports = loginGovRoutes;
