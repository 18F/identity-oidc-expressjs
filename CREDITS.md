# Credits, Notes, and Reference

This project is based on an [example express service provider](https://github.com/18F/identity-oidc-nodejs-express) and corresponding instructions in that repo.

## Links

  + [Running express apps in debug mode](https://expressjs.com/en/guide/debugging.html)

## Development Process

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
