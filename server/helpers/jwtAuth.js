let jwt = require("jsonwebtoken");

let generateToken = (data, key, expireTime) => {
  return jwt.sign(data, key, {
    expiresIn: expireTime,
  });
};

module.exports = { generateToken };
