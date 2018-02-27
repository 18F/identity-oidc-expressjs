# identity-oidc-expressjs

An example [Login.gov](https://login.gov/) client application which authenticates users via OpenID Connect (OIDC). Built with [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), and [Passport.js](http://www.passportjs.org/docs/). Uses the [`openid-client`](https://github.com/panva/node-openid-client) package, a certified OpenID Relaying Party, to issue authentication requests.

Demo:

![a screencast of a user navigating this application: logging in using LOA1 by clicking a button on the homepage, then getting redirected to a profile page showing the user's email address, then logging out and demonstrating inability to access the profile page again. then repeating the process using LOA3 to log-in produces the same results, except it displays more user information on the profile page.](demo.gif)

## Prerequisites

### Install Dependencies

Install Node.js (version 8.9.3), perhaps using NVM to do so.

Install `nodemon` development server globally:

```sh
npm install nodemon -g
```

Install package dependences:

```sh
npm install
```

### Choose a Login.gov Environment

#### Sandbox Environment

Set the `DISCOVERY_URL` environment variable to one of the sandbox urls:

  + `https://idp.dev.identitysandbox.gov`
  + `https://idp.int.identitysandbox.gov` (untested)

#### Development Environment (Local Server)

Set the `DISCOVERY_URL` environment variable to `http://localhost:3000`.

Run a [Login.gov (`identity-idp`)](https://github.com/18F/identity-idp/) instance locally on port 3000:

```sh
bin/rails s -b 127.0.0.1
bundle exec sidekiq --config config/sidekiq.yml
mailcatcher -f
```

> NOTE: the `openid-client` package attempts to make various authentication requests to `127.0.0.1:3000`, but when the Login.gov instance is running normally on `localhost:3000` via the `make run` command, the `openid-client` requests won't be able to find it (produces `RequestError: connect ECONNREFUSED 127.0.0.1:3000` client errors). So a work-around for this issue is to run the Login.gov instance via the commands listed above. :smiley:

## Usage

Run this client application on a local web server:

```sh
DEBUG=identity-oidc-expressjs:* npm start # then view localhost:9393 in a browser
```

## [License](LICENSE.md)
