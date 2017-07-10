const express = require('express');
const morgan = require('morgan');
const request = require('request');
const qs = require('qs');
const env = require('node-env-file');

env(__dirname + '/.env', {raise: false});

const app = express();
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/install', (req, res) => {
  if (!req.query.code) {
    return res
      .status(400)
      .render('error', {message: 'No code received.'});
  }
  const queryString = qs.stringify({
    client_id: process.env.APP_ID,
    client_secret: process.env.APP_SECRET,
    redirect_uri: process.env.APP_REDIRECT,
    code: req.query.code,
  });
  request(
    'https://graph.facebook.com/oauth/access_token?' + queryString,
    (err, response, body) => {
      if (err) {
        return res
          .status(500)
          .render(
            'error',
            {
              message: 'Error when sending request for access token.',
              code: err
            }
          );
      }
      const parsedBody = JSON.parse(body);
      if (response.statusCode !== 200) {
        return res
          .status(500)
          .render(
            'error',
            {
              message: 'Access token exchange failed.',
              code: JSON.stringify(parsedBody.error)
            }
          );
      }

      let accessToken = parsedBody.access_token;
      if (!accessToken) {
        return res
          .status(500)
          .render(
            'error',
            {message: 'Response did not contain an access token.'}
          );
      }

      const queryString = qs.stringify({
        fields: 'name',
        access_token: accessToken,
      });

      request(
        'https://graph.facebook.com/company?' + queryString,
        (err, response, body) => {
          if (err) {
            return res
              .status(500)
              .render(
                'error',
                {
                  message: 'Error when sending a graph request.',
                  code: err
                }
              );
          }
          const parsedBody = JSON.parse(body);
          if (response.statusCode !== 200) {
            return res
              .status(500)
              .render(
                'error',
                {
                  message: 'Graph API returned an error.',
                  code: JSON.stringify(parsedBody.error)
                }
              );
          }

          return res.render('success', {companyName: parsedBody.name});
        }
      );
    }
  );
});

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});
