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
    // ... adapted from https://github.com/18F/fs-permit-platform/blob/6f3681a5861d96db76c279f726c23971f3e037c7/server/src/auth/passport-config.es6#L41-L56
    app.get('/auth/login-gov/oidc-logout', function(req, res) {
        //req.logout();

        //console.log("LOGOUT USER", req.user)
        //console.log("LOGOUT TOKEN", req.token)

        //const logoutUrl = `${loginGov.discoveryUrl}/openid_connect/logout` // TODO: get from issuer well-known config data
        const logoutUrl = loginGov.issuer.end_session_endpoint
        const token = req.user.token
        const logoutRedirectUrl = process.env.LOGOUT_REDIRECT_URL || `http://localhost:${(process.env.PORT || '9393')}`
        const state = req.user.state
        const requestUrl = `${logoutUrl}?id_token_hint=${token}&post_logout_redirect_uri=${logoutRedirectUrl}&state=${state}`
        //const requestUrl = `${logoutUrl}?id_token_hint=${token}&post_logout_redirect_uri=${logoutRedirectUrl}&state=${loginGov.randomString(32)}`

        return res.redirect(requestUrl);
    });

};

module.exports = loginGovRoutes;
