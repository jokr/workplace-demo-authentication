# workplace-demo-authentication

A demo application demonstrating the Workplace third-party app authentication.
Upon redirect the server exchanges the code for an access token and makes
an Graph API request to get some basic information about the company.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone <repo>
$ cd workplace-demo-authentication
$ touch .env
```

Open the `.env` file and enter the credential details of your app in the following
form:

```
APP_ID=<app id>
APP_SECRET=<app_secret>
APP_REDIRECT=<app_redirect>
```

Then start the application.

```sh
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Make sure you have the [Heroku CLI](https://cli.heroku.com/) installed.

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

- [Graph API Overview](https://developers.facebook.com/docs/graph-api/overview)
- [Manual Login Flows](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow)
- [Workplace Docs](https://developers.facebook.com/docs/workplace)
