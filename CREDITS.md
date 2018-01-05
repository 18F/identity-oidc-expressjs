# Credits, Notes, and Reference

## Links

### Login.gov

  + [Login.gov developer documentation](https://developers.login.gov/)
  + [Login.gov OIDC documentation](https://developers.login.gov/openid-connect/#developer-portal)
  + [Login.gov Registered Clients](https://github.com/18F/identity-idp/blob/master/config/service_providers.yml#L125-L129)
  + [Login.gov OIDC Sinatra Client](https://github.com/18F/identity-sp-sinatra)
  + [Login.gov SAML Rails Client](https://github.com/18F/identity-sp-rails)
  + [18F `fs-intake-module` Application](https://github.com/18F/fs-intake-module/blob/master/server/src/auth/login-gov.es6) - a super helpful Login.gov client implementation using Express.js and Passport.js
  + Login.gov Auto Discovery URLs:
    + https://localhost:3000/.well-known/openid-configuration
    + https://idp.int.login.gov/.well-known/openid-configuration

### Node.js and Express.js

  + [A previous Express.js project by the author](https://github.com/data-creative/express-on-rails-starter-app/blob/starter/app.js)
  + [A previous Express.js tutorial by the author](https://github.com/prof-rossetti/southernct-csc-443-01-201701/blob/master/projects/crud-application/checkpoints/)
  + [Running Express.js apps in debug mode](https://expressjs.com/en/guide/debugging.html)

### Passport.js

  + [Passport.js Docs](http://www.passportjs.org/docs/)
  + [Using multiple Passport strategies - gist](https://gist.github.com/joshbirk/1732068)
  + [Using multiple Passport strategies - issue comment](https://github.com/jaredhanson/passport/issues/287#issuecomment-58188179)

### Authentication and OIDC

  + [OIDC Node.js Demo](https://github.com/srmoore/oidc_nodejs_demo) - very helpful for understanding OIDC mechanics and implementation using Passport.js
  + [Node.js OpenID Client](https://github.com/panva/node-openid-client)
  + [JSON Web Tokens (JWT)](https://jwt.io/)
  + [Converting PEM to JWK](https://github.com/dannycoates/pem-jwk)
  + [PEM vs CRT vs KEY](https://crypto.stackexchange.com/questions/43697/what-is-the-difference-between-pem-csr-key-and-crt)
  + [Node Jose](https://github.com/cisco/node-jose)

### Assets

  + [Login.gov SVG](https://github.com/18F/identity-sp-sinatra/blob/master/public/img/login-gov.svg)
  + [Stylesheet](https://github.com/18F/identity-sp-sinatra/blob/master/public/css/lib/basscss.min.css)
  + [Page Content](https://github.com/18F/identity-sp-sinatra/blob/master/views/success.erb)
