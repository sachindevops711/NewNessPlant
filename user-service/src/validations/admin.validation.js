const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const login = joi.object().keys({
  email: joi.string().trim().email().required().label("Email"),
  password: joi.string().required().label("Password"),
});

const editUserProfile = joi.object().keys({
  userName: joi.string().custom((value, helpers) => {
    if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
      return value;
    }
    return helpers.message(
      "Name must contain at least one uppercase and one lowercase letter"
    );
  }, "Name validation"),
  email: joi.string().trim().email().required().label("Email"),
  id: joi.string().optional(),
});

const contactMe = joi.object().keys({
  name: joi.string().trim().required().label("Name"),
  message: joi.string().trim().required().label("Message"),
  email: joi.string().trim().email().required().label("Email"),
});

const contactUs = joi.object().keys({
  name: joi.string().trim().required().label("Name"),
  web_link: joi.string().trim().required().label("Web Link"),
  address: joi.string().trim().required().label("Address"),
  email: joi.string().trim().email().required().label("Email"),
  lat: joi.number().required().label("Latitude"),
  long: joi.number().required().label("Latitude"),
  mobile_no: joi.string()
  .pattern(/^[0-9]{10}$/)
  .required()
  .label("Mobile No.")
});

const aboutus = joi.object().keys({
  title: joi.string().trim().required().label("Title"),
  description: joi.string().trim().required().label("Description"),
  // subpoint: joi.string().trim().required().label("Subpoint"),
});

const webtheme = joi.object().keys({
  primary_color: joi.string().trim().required().label("Primary color"),
  secondary_color: joi.string().trim().required().label("Secondary color"),
});

const enquiry = joi.object().keys({
  name: joi.string().trim().required().label("Name"),
  requirement: joi.string().trim().required().label("Requirement"),
  company_name: joi.string().trim().required().label("Company name"),
  city: joi.string().trim().required().label("City"),
  email: joi.string().trim().email().required().label("Email"),
  mobile_no: joi.string()
  .pattern(/^[0-9]{10}$/)
  .required()
  .label("Mobile No.")
});

const companyInfo = joi.object().keys({
  company_name: joi.string().trim().required().label("Company name"),
  description: joi.string().trim().required().label("Description"),
});

const clientInfo = joi.object().keys({
  title: joi.string().trim().required().label("Title"),
  id: joi.string().trim().optional().label("Id"),
});

const portfolio = joi.object().keys({
  name: joi.string().trim().required().label("Name"),
  number: joi.string().trim().required().label("Number"),
  id: joi.string().trim().optional().label("Id"),
});

module.exports = {
  login,
  contactMe,
  clientInfo,
  aboutus,
  webtheme,
  portfolio,
  enquiry,
  contactUs,
  companyInfo,
};
