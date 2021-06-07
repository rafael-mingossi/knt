const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;

  return expressJwt({
    //this will check if the secret was created throug the API
    secret,
    algorithms: ["HS256"], //www.jwt.io
  }).unless({
    path: [
      //regular expressions -> www.regex101.com
      { url: /\/api\/v1\/users(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

module.exports = authJwt; //it will be used in app.js
