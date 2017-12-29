# Credits, Notes, and Reference

## Links

### Login.gov

  + [Login.gov developer documentation](https://developers.login.gov/)
  + [Login.gov OIDC documentation](https://developers.login.gov/openid-connect/#developer-portal)
  + [Login.gov Registered Clients](https://github.com/18F/identity-idp/blob/master/config/service_providers.yml#L125-L129)
  + [Login.gov OIDC Sinatra Client](https://github.com/18F/identity-sp-sinatra)
  + [MIT OIDC Tutorial](https://github.com/18F/identity-oidc-nodejs-express)
  + [18F Login.gov Express.js Client Implementation](https://github.com/18F/fs-intake-module/blob/master/server/src/auth/login-gov.es6)

### Node, Express, Passport

  + [Previous Express.js Project](https://github.com/data-creative/express-on-rails-starter-app/)
  + [Running express apps in debug mode](https://expressjs.com/en/guide/debugging.html)
  + [Setting up a new express app](https://github.com/prof-rossetti/southernct-csc-443-01-201701/blob/master/projects/crud-application/checkpoints/)
  + [A previous Express project](https://github.com/data-creative/express-on-rails-starter-app/blob/starter/app.js)
  + [Passport.js Docs](http://www.passportjs.org/docs/)
  + [Using multiple Passport strategies - gist](https://gist.github.com/joshbirk/1732068)
  + [Using multiple Passport strategies - issue comment](https://github.com/jaredhanson/passport/issues/287#issuecomment-58188179)

### Auth

  + [OpenID Client](https://github.com/panva/node-openid-client)
  + [JSON Web Tokens (JWT)](https://jwt.io/)
  + [Converting PEM to JWK](https://github.com/dannycoates/pem-jwk)
  + [PEM vs CRT vs KEY](https://crypto.stackexchange.com/questions/43697/what-is-the-difference-between-pem-csr-key-and-crt)
  + [Node Jose](https://github.com/cisco/node-jose)

### Promises

  + [Mozilla Promises Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  + [Blog Post on Promises](http://www.datchley.name/es6-promises/) - examples of `Promise.resolve()`
  + [Promises in Passport.js](https://github.com/jaredhanson/passport/issues/536)
  + [Wrapping Functions inside a Bluebird Promise](https://stackoverflow.com/questions/33904054/wrap-async-method-to-return-a-promise-bluebird)
  + [Bluebird `method` docs](http://bluebirdjs.com/docs/api/promise.method.html)


## Development Process Notes

### Setup

Install Express Generator:

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

Change in `bin/www` this app's port to 9292 to not conflict with the idp app already running locally on 3000, and to coincide with whitelisted client config. Then run this app locally in debug mode:

```shell
DEBUG=my-identity-sp:* npm start # then view localhost:9292 in a browser
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

Login.gov will respond with client configuration errors like "Client Bad client_id" and "Redirect uri redirect_uri does match registered redirect_uri" until the service provider is properly configured on the respective login.gov environment.

To configure a locally-running login.gov instance, add a new cert to identity-idp repository as **certs/sp/sp_expressjs_demo.crt**, add the below entry to the identity-idp repository's **config/service_providers.yml** file, then finally run `make setup` or `bin/rake db:seed` or some other command to seed the database with your new service provider.

```yml
  'urn:gov:gsa:openidconnect:sp:expressjs':
    redirect_uris:
      - 'localhost:9393/'
      - 'localhost:9393/auth/login-gov/callback'
      - 'http://localhost:9393/'
      - 'http://localhost:9393/auth/login-gov/callback'
    cert: 'sp_expressjs_demo'
    friendly_name: 'Example OIDC Client (Express.js)'
```

After the database contains the new provider, authorization responses should stop returning client configuration errors. They do.

Subsequent "token requests" made from this app to the identity-idp result in `connect ECONNREFUSED 127.0.0.1:3000` errors. Trying to request `127.0.0.1:3000` instead of `localhost:3000` in a browser produces the same error. This was the same error that occurred when trying to auto-discover the local identity-idp. Basically some part of the stack of this oidc/passport/express application is trying to send a request to `127.0.0.1` but not able to find the server that way. After lots of googling, finally an SO post [reveals](https://stackoverflow.com/a/42157085/670433) an alternative strategy for running the identity-idp locally: `rails s -b 0.0.0.0`. Not sure what the -b option does, because it is not included in the help documentation. But it allows the client application to find the server. And it allows the auto-discovery. However, this causes issues with how mailcatcher is run, so emails are not received while running the server this way. Yikes. But it turns out they are still sent, and are accessible after-the-fact (when the server and mailcatcher are subsequently re-run using `make run`).

#### User Profile Info

Here is the information getting returned using LOA1:

```js
{ sub: 'c0d4a468-f73f-4c8e-9727-1018cf488001',
  iss: 'http://localhost:3000/',
  email: 'def4567@gsa.gov',
  email_verified: true,
  given_name: null,
  family_name: null,
  birthdate: null,
  social_security_number: null,
  address: null,
  phone: null,
  phone_verified: null }
```

The login.gov OIDC docs state that the `sub` attribute represents a unique identifier. I assume it is relevant/unique only within the context of the given issuer (`iss`). I tested these values are different for different local users, and they are indeed different. This suggests `sub` can be used for reference in client applications, but I would recommend also storing the issuer alongside it.

Originally, I'm not seeing a place to input additional LOA3-style information into login.gov. However, a form for such information is presented when the client application makes a request using an "LOA3" ACR value. After submitting the form to the server, the server timed-out. Need to check how localhost identifications are/can be mocked like the phone verification is. Using the rails SAML client application example, it seems these requests are handled properly. Perhaps the time-outs I'm seeing for this express OIDC client application are a result of running the local server differently. Need to test by adding LOA3 capabilities to the sinatra OIDC example client. This will show whether the timeouts are an OIDC thing or a result of running the server differently. But in the meantime, after using the rails SAML app to initiate a collection of user profile information for the local user, LOA3 requests from this express.js client app produce the following information:

```js
{ sub: 'c0d4a468-f73f-4c8e-9727-1018cf488001',
  iss: 'http://localhost:3000/',
  email: 'def4567@gsa.gov',
  email_verified: true,
  given_name: 'Test',
  family_name: 'User',
  birthdate: '01/01/1950',
  social_security_number: '012-34-5678',
  address:
   { formatted: '1600 Penn 123\nWashington, DC 20001',
     street_address: '1600 Penn 123',
     locality: 'Washington',
     region: 'DC',
     postal_code: '20001' },
  phone: '2345678900',
  phone_verified: true }
```

I want to be able to create two different login buttons, one using LOA1 and one using LOA3. This would involve passing different "ACR" values as part of the authentication strategy. But the way this client is currently configured, the authentication strategy is configured when the server starts running, not when individual requests are made. It doesn't seem like there is an easy way to re-configure the server in mid-run. But it might be worth a try.

### Views

Conditional checks for user:

```js
<% if(typeof(user) == "undefined"){ %>
  <a href="/auth/login-gov/login">Login</a>
<% } else { %>
  Welcome, <%= user.email %> |
  <a href="/auth/login-gov/logout">Logout</a>
<% } %>
```

> NOTE: using just `if(user)` causes an error about `user` being undefined.

## Testing Notes

To test:

  + Visit the homepage
  + Click the "Login" link
  + Expect to see a login.gov login page
  + Input name and password and click "Login"
  + Expect to be redirected
