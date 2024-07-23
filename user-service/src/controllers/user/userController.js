const userModel = require("../../model/user/userModel");
const responseMessage = require("../utils/responseMessage.json");
const bcrypt = require('bcryptjs');
const { createJwtTokens } = require("../utils/commonFunction");