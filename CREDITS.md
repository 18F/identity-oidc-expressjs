# Credits, Notes, and Reference

## Links

  + [Login.gov example express service provider](https://github.com/18F/identity-oidc-nodejs-express)
  + [Previous Project (express app w/ session storage and flash messaging)](https://github.com/data-creative/express-on-rails-starter-app/blob/starter/)
  + [Running express apps in debug mode](https://expressjs.com/en/guide/debugging.html)
  + [Setting up a new express app](https://github.com/prof-rossetti/southernct-csc-443-01-201701/blob/master/projects/crud-application/checkpoints/)
  + [Login.gov developer documentation](https://developers.login.gov/)
  + [Passport Docs](http://www.passportjs.org/docs/)
  + [Passport Docs - OpenId Strategy ](http://www.passportjs.org/docs/openid/)
  + [Passport OpenId Package](https://github.com/jaredhanson/passport-openid)
  + [Passport OpenId Package - Example App](https://github.com/jaredhanson/passport-openid/blob/master/examples/signon/app.js)
  + [Connect Flash Package](https://github.com/jaredhanson/connect-flash)
  + [EJS Layouts](https://colinmackay.scot/tag/express-ejs-layouts/)
  + [EJS Layouts WAT](https://scotch.io/tutorials/use-ejs-to-template-your-node-application#toc-advanced-layouts)

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

Install passport:

```sh
npm install express-session --save
npm install passport --save
npm install passport-openid --save
```
