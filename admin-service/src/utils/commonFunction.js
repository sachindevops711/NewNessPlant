const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const adminModel = require("../model/adminModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Textlocal = require('textlocal-complete');

exports.createJwtTokens = (payload) => {
  const access = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24hr",
  });
  const refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const access_token = `Bearer ${access}`;
  const refresh_token = `Bearer ${refresh}`;
  return { access_token, refresh_token };
};

exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.findUserByEmail = async (email) => {
  try {
    const user = await adminModel.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
};

exports.sendSms = async (phone, message) => {
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => console.log(message.sid));
};
