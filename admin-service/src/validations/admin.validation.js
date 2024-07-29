const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const login = joi.object().keys({
  email: joi.string().trim().email().required().label("Email"),
  password: joi.string().required().label("Password"),
});

const forget_password = joi.object().keys({
  email: joi.string().trim().email().required().label("Email"),
});

const refresh_token = joi.object().keys({
  refresh_token: joi.string().trim().required().label("Refresh Token"),
});

const reset_password = joi.object().keys({
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(6)
    .required(),
  otp: joi.number().required().label("OTP"),
});

const change_password = joi.object().keys({
  current_password: joi.string().trim().required().label("Current Password"),
  new_password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(6)
    .required()
    .label("New Password"),
});

const edit_user_profile = joi.object().keys({
  name: joi.string().trim().required().label("Name"),
  last_name: joi.string().trim().required().label("Last Name"),
  dob: joi.date().optional().label("Date of birth"),
  gender: joi.string().optional().allow("").label("Gender"),
});

const create_category = joi.object().keys({
  name: joi.string().required().label("Name"),
});

const update_category = joi.object().keys({
  name: joi.string().required().label("Name"),
  id: joi.string().optional(),
});

const category = joi.object().keys({
  id: joi.string().optional(),
});

module.exports = {
  login,
  forget_password,
  reset_password,
  change_password,
  refresh_token,
  edit_user_profile,
  create_category,
  update_category,
  category
};
