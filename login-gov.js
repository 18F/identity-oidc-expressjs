var crypto = require('crypto');
var fs = require('fs');
var pem2jwk = require('pem-jwk').pem2jwk;
var jose = require('node-jose');
var Issuer = require('openid-client').Issuer;
var Strategy = require('openid-client').Strategy;

const loginGov = {};

const keyFile = './keys/login-gov/expressjs_demo_sp.key';
const key = fs.readFileSync(keyFile, 'ascii');
const jwk = pem2jwk(key);
const keys = [jwk];

const discoveryUrl = 'http://localhost:3000'; // TODO: read from environment variable, allow user to differentiate between localhost and 'https://idp.int.login.gov/'

const clientOptions = {
  client_id: 'urn:gov:gsa:openidconnect:sp:expressjs',
  token_endpoint_auth_method: 'private_key_jwt',
  id_token_signed_response_alg: 'RS256'
};

function strategyParams(loaNumber){
  return {
    response_type: 'code',
    acr_values: `http://idmanagement.gov/ns/assurance/loa/${loaNumber}`,
    scope: 'openid email address phone profile:birthdate profile:name profile social_security_number',
    redirect_uri: `http://localhost:9393/auth/login-gov/callback/loa-${loaNumber}`,
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
    const client = new issuer.Client(clientOptions, keystore);

    const strategy = new Strategy(
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
  return crypto.randomBytes(length).toString('hex');
};

module.exports = loginGov;
