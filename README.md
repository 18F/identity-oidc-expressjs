# my-identity-sp

An example service provider to authenticate users with login.gov using OIDC.

## Prerequisites

Install NVM and Node.js (version 8.9.3).

Run [identity-idp](https://github.com/18F/identity-idp/) at localhost:3000.

## Usage

Run a local webserver:

```sh
DEBUG=my-identity-sp:* npm start # then view localhost:9292 in a browser
```

![a screencast of a user navigating this application: logging in using LOA1 by clicking a button on the homepage, then getting redirected to a profile page showing the user's email address, then logging out and demonstrating inability to access the profile page again. then repeating the process using LOA3 to log-in produces the same results, except it displays more user information on the profile page.](demo.gif)
