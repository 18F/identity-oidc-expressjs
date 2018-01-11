# identity-oidc-expressjs

An example [Login.gov](https://login.gov/) client application which authenticates users via OpenID Connect (OIDC). Built with [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), and [Passport.js](http://www.passportjs.org/docs/). Uses the [`openid-client`](https://github.com/panva/node-openid-client) package, a certified OpenID Relaying Party, to issue authentication requests.

This example client application is configured to run on http://localhost:9393.

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

Right now this app is hard-coded to authenticate against a locally-running Login.gov server. Once this application's credentials get propagated to the Login.gov integration server, this application will be modified to allow you to choose a Login.gov environment by setting an environment variable called `LOGIN_GOV_DISCOVERY_URL`. Stay tuned!

#### Integration Server

Coming Soon.

#### Local Server

Run a [Login.gov (`identity-idp`)](https://github.com/18F/identity-idp/) instance locally on port 3000.

Note: the `openid-client` package attempts to make various authentication requests to `127.0.0.1:3000`, but when the Login.gov instance is running normally at `localhost:3000`, the `openid-client` requests won't be able to find it (produces `RequestError: connect ECONNREFUSED 127.0.0.1:3000` client errors). A work-around for this issue is to run Login.gov using the following command instead: `rails s -b 127.0.0.1`. However you should know that when Login.gov is run this way, it won't be able to perform the account creation process because `mailcatcher` doesn't run properly, and it won't allow users to initially set up their LOA3 information. One workaround for the account creation issue is to temporarily run the Login.gov instance normally (using the `make run` command) and use its interface to perform the account creation process, then re-run Login.gov using `rails s -b 127.0.0.1` before attempting subsequent authentication requests. And one work-around for the LOA3 setup is to use a different example client (like the [Rails version](https://github.com/18F/identity-sp-rails)) to perform the initial LOA3 authentication, then remember to log-out of that service provider, then subsequent LOA3 authentication requests should work.

## Usage

Run this client application on a local webserver:

```sh
DEBUG=identity-oidc-expressjs:* npm start # then view localhost:9393 in a browser
```

## [License](LICENSE.md)
