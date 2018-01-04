# identity-oidc-expressjs

An example OIDC service provider to authenticate users with login.gov. Built with Node.js, Express.js, and Passport.js.

This example service provider is configured to run on http://localhost:9393.

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

Right now this app is hard-coded to authenticate against a locally-running login.gov server. Once this application's credentials get propagated to the login.gov integration server, this application will be modified to allow you to choose a login.gov environment by setting an environment variable called `LOGIN_GOV_DISCOVERY_URL`. Stay tuned!

#### Integration Server

Coming Soon.

#### Local Server

Run a [login.gov](https://github.com/18F/identity-idp/) instance locally on port 3000. Note: Passport wants to make various authentication requests to `127.0.0.1:3000`, and when the login.gov instance is run normally at `localhost:3000`, Passport won't be able to find it (produces `connect ECONNREFUSED 127.0.0.1:3000` errors). A work-around for this issue is to run login.gov using the following command: `rails s -b 0.0.0.0`. However you should note that when login.gov is running in this way, it won't properly run `mailcatcher`, and it won't properly allow users to initially set up their LOA3 information. One workaround for the `mailcatcher` issue is to temporarily run the login.gov instance normally (using `make run`) and use its interface to "Sign up", then re-run login.gov using `rails s -b 0.0.0.0` before attempting subsequent login requests via this service provider. And one work-around for the LOA3 setup is to use a different example client (like [Rails](https://github.com/18F/identity-sp-rails) version) to perform the initial LOA3 authentication, then remember to log-out of that service provider, then subsequent LOA3 authentication attempts from this service provider should work.

## Usage

Run a local webserver:

```sh
DEBUG=identity-oidc-expressjs:* npm start # then view localhost:9393 in a browser
```

![a screencast of a user navigating this application: logging in using LOA1 by clicking a button on the homepage, then getting redirected to a profile page showing the user's email address, then logging out and demonstrating inability to access the profile page again. then repeating the process using LOA3 to log-in produces the same results, except it displays more user information on the profile page.](demo.gif)

## [License](LICENSE)
