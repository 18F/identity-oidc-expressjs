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

### Auth

```sh
npm install passport --save
npm install express-session --save
```

Auto Discovery URL: https://idp.int.login.gov/.well-known/openid-configuration

Example Request:

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
