var crypto = require("crypto")
var fs = require('fs'); // used to read in the key file
var pem2jwk = require('pem-jwk').pem2jwk // used to convert key file from PEM to JWK

const keyFile = './keys/local/sinatra_demo_sp.key'
const key = fs.readFileSync(keyFile, 'ascii')
const jwk = pem2jwk(key)

const loginGov = {}

loginGov.keys = [jwk]

loginGov.discoveryUrl = 'http://localhost:3000' // 'https://idp.int.login.gov/'

loginGov.clientOptions = {
  client_id: 'urn:gov:gsa:openidconnect:sp:expressjs',
  token_endpoint_auth_method: 'private_key_jwt',
  id_token_signed_response_alg: 'RS256'
}

// expects loaNumber param to be "1" or "3"
loginGov.params = function(loaNumber){
  return {
    response_type: 'code',
    acr_values: `http://idmanagement.gov/ns/assurance/loa/${loaNumber}`,
    scope: 'openid email address phone profile:birthdate profile:name profile social_security_number',
    redirect_uri: 'http://localhost:9393/auth/login-gov/callback',
    nonce: randomString(32),
    state: randomString(32),
    prompt: 'select_account'
  }
}

function randomString(length) {
  return crypto.randomBytes(length).toString('hex')
}

module.exports = loginGov
