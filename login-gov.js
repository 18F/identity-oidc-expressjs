var crypto = require('crypto');
var fs = require('fs');
var pem2jwk = require('pem-jwk').pem2jwk;
var jose = require('node-jose');
var Issuer = require('openid-client').Issuer;
var Strategy = require('openid-client').Strategy;

var loginGov = {};

var keyFile = process.env.KEY_FILE_PATH || './keys/login-gov/expressjs_demo_sp.key';
var key = fs.readFileSync(keyFile, 'ascii');
var jwk = pem2jwk(key);
var keys = [jwk];

var discoveryUrl = process.env.DISCOVERY_URL || 'http://localhost:3000';

var clientOptions = {
  client_id: process.env.CLIENT_ID || 'urn:gov:gsa:openidconnect:sp:expressjs',
  token_endpoint_auth_method: 'private_key_jwt',
  id_token_signed_response_alg: 'RS256'
};

function strategyParams(loaNumber){
  var redirectURI; // temporarily acting as sinatra app
  if (process.env.CLIENT_ID == "urn:gov:gsa:openidconnect:sp:sinatra") { // temporarily acting as the sinatra app, set via .env file
    redirectURI = `http://localhost:${process.env.PORT}/`
  } else {
    redirectURI = `http://localhost:${process.env.PORT}/auth/login-gov/callback/loa-${loaNumber}`
  } // TODO: after done acting as the sinatra app, remove this if statement and keep only the code inside the else clause

  return {
    response_type: 'code',
    acr_values: `http://idmanagement.gov/ns/assurance/loa/${loaNumber}`,
    scope: 'openid email address phone profile:birthdate profile:name profile social_security_number',
    redirect_uri: redirectURI,
    nonce: randomString(32),
    state: randomString(32),
    prompt: 'select_account'
  };
};

loginGov.configure = function(passport, loaNumber){
  if (parseInt(loaNumber) != 1 && parseInt(loaNumber) != 3) { throw "OOPS PLEASE CHOOSE A VALID LOA (expecting '1' OR '3')" };

  Promise.all([
    jose.JWK.asKeyStore(keys),
    Issuer.discover(discoveryUrl)
  ]).then(function([keystore, issuer]){
    var client = new issuer.Client(clientOptions, keystore);

    var strategy = new Strategy(
      {client: client, params: strategyParams(loaNumber)},
      function(tokenset, userinfo, done) {
        console.log("TOKEN SET", Object.keys(tokenset), tokenset)
        console.log("USER INFO", Object.keys(userinfo), userinfo)
        return done(null, userinfo);
      }
    );

    passport.use(`oidc-loa-${loaNumber}`, strategy);

    console.log("LOGIN.GOV CONFIGURATION SUCCESS", `(LOA${loaNumber})`);

  }).catch(function(err){
    console.log("LOGIN.GOV CONFIGURATION ERROR", err);
  });
};

function randomString(length) {
  return crypto.randomBytes(length).toString('hex'); // source: https://github.com/18F/fs-permit-platform/blob/c613a73ae320980e226d301d0b34881f9d954758/server/src/util.es6#L232-L237
};

module.exports = loginGov;
