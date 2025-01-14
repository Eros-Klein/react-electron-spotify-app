const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
let server;
let token;

function startServer() {
    app.use(cors());

    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    app.get('/login', (req, res) => {
      res.redirect(requestUserAuthorization());
    });

    app.get('/redirect', async (req, res) => {
      const code = req.query['code'];
      token = await requestAccessToken(code);
      console.log(token);
      res.sendFile(__dirname + '/logged_in.html');
    });

    app.get('/token', async (req, res) => {
      console.log("token sent!");
      res.send(JSON.stringify(token));
    });
    
    server = app.listen(3172, () => {
      console.log('Server is running on http://localhost:3172');
    });
    
    return app;
}

function stopServer() {
    server.close();
}

module.exports = { startServer, stopServer };

// Logic for the OAuth2.0 Authorization Code Flow with PKCE

async function requestAccessToken(code) {
  const url = "https://accounts.spotify.com/api/token";
  const clientId = process.env.CLIENT_ID;
  const redirectUri = 'http://localhost:3172/redirect';

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  console.log(response);

  return response.access_token;
}

function requestUserAuthorization() {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = 'http://localhost:3172/redirect';

  const scope = 'user-library-read';
  const authUrl = new URL("https://accounts.spotify.com/authorize")

  const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }


  authUrl.search = new URLSearchParams(params).toString();

  return authUrl.toString();
}

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);

const sha256 = (plain) => {
  return crypto.createHash('sha256').update(plain).digest();
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const hashed = sha256(codeVerifier)
const codeChallenge = base64encode(hashed);