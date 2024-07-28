const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const adminModel = require("../model/adminModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Textlocal = require("textlocal-complete");

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

exports.findCategoryByName = async (name) => {
  try {
    const model = require('../model/categoryModel')
    const category = await model.findOne({ name });
    return category;
  } catch (error) {
    throw new Error(`Error finding category by category name: ${error.message}`);
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

exports.createJwtTokens = async (payload, userType) => {
  const {
    JWT_ADMIN_ACCESS_SECRET,
    JWT_ADMIN_REFRESH_SECRET,
    JWT_VENDOR_ACCESS_SECRET,
    JWT_VENDOR_REFRESH_SECRET,
    JWT_USER_ACCESS_SECRET,
    JWT_USER_REFRESH_SECRET,
    JWT_NORMAL_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN,
  } = process.env;
  let accessSecret;
  let refreshSecret;

  switch (userType) {
    case "admin":
      accessSecret = JWT_ADMIN_ACCESS_SECRET;
      refreshSecret = JWT_ADMIN_REFRESH_SECRET;
      break;
    case "vendor":
      accessSecret = JWT_VENDOR_ACCESS_SECRET;
      refreshSecret = JWT_VENDOR_REFRESH_SECRET;
      break;
    case "user":
    default:
      accessSecret = JWT_USER_ACCESS_SECRET;
      refreshSecret = JWT_USER_REFRESH_SECRET;
      break;
  }

  const access = jwt.sign(payload, accessSecret, {
    expiresIn: JWT_NORMAL_EXPIRES_IN,
  });
  const refresh = jwt.sign(payload, refreshSecret, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
  const access_token = `Bearer ${access}`;
  const refresh_token = `Bearer ${refresh}`;
  return { access_token, refresh_token };
};
