# Credits, Notes, and Reference

This project is based on an [example express service provider](https://github.com/18F/identity-oidc-nodejs-express) and corresponding instructions in that repo.

## Links

  + [Running express apps in debug mode](https://expressjs.com/en/guide/debugging.html)
  + [Setting up a new express app](https://github.com/prof-rossetti/southernct-csc-443-01-201701/blob/master/projects/crud-application/checkpoints/)
  + [Login.gov developer documentation](https://developers.login.gov/)
  + [Login.gov OIDC documentation](https://developers.login.gov/openid-connect/#developer-portal)
  + [A previous Express project](https://github.com/data-creative/express-on-rails-starter-app/blob/starter/app.js)
  + [Passport.js Docs](http://www.passportjs.org/docs/)
  + [JSON Web Tokens (JWT)](https://jwt.io/)
  + [PEM Node Module](https://github.com/Dexus/pem)

## Development Process

### Setup

Install NVM and Node.js. Install Express Generator:

```shell
npm install express-generator -g
```

Generate a new app:

```shell
express --view=ejs my-identity-sp
cd my-identity-sp
```

Install package dependencies:

```shell
npm install # then .gitignore node_modules
```

Change in `bin/www` this app's port to 3030 to not conflict with the idp app already running locally on 3000. Then run this app locally in debug mode:

```shell
DEBUG=my-identity-sp:* npm start # then view localhost:3030 in a browser
```

Upgrade local dev server by installing nodemon (`npm install nodemon -g`) and updating the "start" command in `package.json` to invoke it.

### MIT Auth

```sh
npm install passport --save
npm install express-session --save # etc.
```

Auto Discovery URL: https://mitreid.org/.well-known/openid-configuration


MIT WELL KNOWN CONFIG:

```json
{
	"request_parameter_supported": true,
	"claims_parameter_supported": false,
	"introspection_endpoint": "https://mitreid.org/introspect",
	"scopes_supported": ["openid", "profile", "email", "pp", "api-part", "rest-api", "address", "offline_access", "phone"],
	"issuer": "https://mitreid.org/",
	"userinfo_encryption_enc_values_supported": ["A256CBC+HS512", "A256GCM", "A192GCM", "A128GCM", "A128CBC-HS256", "A192CBC-HS384", "A256CBC-HS512", "A128CBC+HS256"],
	"id_token_encryption_enc_values_supported": ["A256CBC+HS512", "A256GCM", "A192GCM", "A128GCM", "A128CBC-HS256", "A192CBC-HS384", "A256CBC-HS512", "A128CBC+HS256"],
	"authorization_endpoint": "https://mitreid.org/authorize",
	"service_documentation": "https://mitreid.org/about",
	"request_object_encryption_enc_values_supported": ["A256CBC+HS512", "A256GCM", "A192GCM", "A128GCM", "A128CBC-HS256", "A192CBC-HS384", "A256CBC-HS512", "A128CBC+HS256"],
	"device_authorization_endpoint": "https://mitreid.org/devicecode",
	"userinfo_signing_alg_values_supported": ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"],
	"claims_supported": ["sub", "name", "preferred_username", "given_name", "family_name", "middle_name", "nickname", "profile", "picture", "website", "gender", "zoneinfo", "locale", "updated_at", "birthdate", "email", "email_verified", "phone_number", "phone_number_verified", "address"],
	"claim_types_supported": ["normal"],
	"op_policy_uri": "https://mitreid.org/about",
	"token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic", "client_secret_jwt", "private_key_jwt", "none"],
	"token_endpoint": "https://mitreid.org/token",
	"response_types_supported": ["code", "token"],
	"request_uri_parameter_supported": false,
	"userinfo_encryption_alg_values_supported": ["RSA-OAEP", "RSA-OAEP-256", "RSA1_5"],
	"grant_types_supported": ["authorization_code", "implicit", "urn:ietf:params:oauth:grant-type:jwt-bearer", "client_credentials", "urn:ietf:params:oauth:grant_type:redelegate", "urn:ietf:params:oauth:grant-type:device_code"],
	"end_session_endpoint": "https://mitreid.org/endsession",
	"revocation_endpoint": "https://mitreid.org/revoke",
	"userinfo_endpoint": "https://mitreid.org/userinfo",
	"token_endpoint_auth_signing_alg_values_supported": ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"],
	"op_tos_uri": "https://mitreid.org/about",
	"require_request_uri_registration": false,
	"code_challenge_methods_supported": ["plain", "S256"],
	"id_token_encryption_alg_values_supported": ["RSA-OAEP", "RSA-OAEP-256", "RSA1_5"],
	"jwks_uri": "https://mitreid.org/jwk",
	"subject_types_supported": ["public", "pairwise"],
	"id_token_signing_alg_values_supported": ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "none"],
	"registration_endpoint": "https://mitreid.org/register",
	"request_object_signing_alg_values_supported": ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"],
	"request_object_encryption_alg_values_supported": ["RSA-OAEP", "RSA-OAEP-256", "RSA1_5"]
}
```

### Login.gov Auth

Auto Discovery URLs:

  + https://idp.int.login.gov/.well-known/openid-configuration
  + https://localhost:3000/.well-known/openid-configuration

IDENTITY-IDP LOCALHOST:3000 WELL KNOWN CONFIG:

```json
{
	"acr_values_supported": ["http://idmanagement.gov/ns/assurance/loa/1", "http://idmanagement.gov/ns/assurance/loa/3"],
	"claims_supported": ["iss", "sub", "email", "email_verified", "address", "phone", "phone_verified", "given_name", "family_name", "birthdate", "social_security_number"],
	"grant_types_supported": ["authorization_code"],
	"response_types_supported": ["code"],
	"scopes_supported": ["address", "email", "openid", "phone", "profile", "profile:birthdate", "profile:name", "social_security_number"],
	"subject_types_supported": ["pairwise"],
	"authorization_endpoint": "http://localhost:3000/openid_connect/authorize",
	"issuer": "http://localhost:3000/",
	"jwks_uri": "http://localhost:3000/api/openid_connect/certs",
	"service_documentation": "https://pages.18f.gov/identity-dev-docs/",
	"token_endpoint": "http://localhost:3000/api/openid_connect/token",
	"userinfo_endpoint": "http://localhost:3000/api/openid_connect/userinfo",
	"end_session_endpoint": "http://localhost:3000/openid_connect/logout",
	"id_token_signing_alg_values_supported": ["RS256"],
	"token_endpoint_auth_methods_supported": ["private_key_jwt"],
	"token_endpoint_auth_signing_alg_values_supported": ["RS256"]
}
```

Authorization Request:

```
https://idp.int.login.gov/openid_connect/authorize?
  acr_values=http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Floa%2F1&
  client_id=${CLIENT_ID}&
  nonce=${NONCE}&
  prompt=select_account&
  redirect_uri=${REDIRECT_URI}&
  response_type=code&
  scope=openid+email&
  state=abcdefghijklmnopabcdefghijklmnop
```
