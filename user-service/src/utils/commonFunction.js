const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

exports.createJwtTokens = (payload) => {
  const access = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24hr",
  });
  const refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = `Bearer ${access}`
  const refreshToken = `Bearer ${refresh}`
  return { accessToken, refreshToken };
};

exports.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let encrypt = bcrypt.hash(password, salt);
  return encrypt;
};
