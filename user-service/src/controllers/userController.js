const userModel = require("../model/userModel");
const responseMessage = require("../helper/responseMessage");
const bcrypt = require("bcryptjs");
const { createJwtTokens, encryptPassword } = require("../utils/commonFunction");
const {
  internal_server_error,
  data_not_found,
  unauthorize,
  response_ok,
  response_created,
  response_bad_request,
} = require("../utils/commonResponse");
const fs = require("fs");
const path = require("path");

//#region register user
exports.registerUser = async (req, res) => {
  try {
    let { name, last_name, email, password, number } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return response_ok(res, responseMessage.USER_ALREADY_EXIST, existUser);
    } else {
      encrypt = await encryptPassword(password);
      const data = new userModel({
        first_name: name,
        last_name,
        number,
        email,
        password: encrypt,
      });
      let result = await data.save();
      if (result) {
        return response_created(
          res,
          responseMessage.USER_ACCOUNT_CREATED,
          result
        );
      } else {
        return response_bad_request(
          res,
          responseMessage.FAILED_TO_REGISTER_AS_USER,
          []
        );
      }
    }
  } catch (err) {
    return internal_server_error(res, err.message);
  }
};
//#endregion

//#region login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email ? email.toLowerCase() : "";
    const existUser = await userModel.findOne({ email });
    if (existUser && existUser._id) {
      const validPassword = await bcrypt.compare(password, existUser.password);
      if (validPassword) {
        const payload = { userId: existUser._id };
        const { accessToken, refreshToken } = createJwtTokens(payload);
        // Save refresh token to user (you should store this securely)
        existUser.refreshToken = refreshToken;
        await existUser.save();
        return response_ok(res, responseMessage.USER_LOGGED_IN, {
          accessToken,
          ...existUser._doc,
        });
      } else {
        return unauthorize(res, responseMessage.INCORRECT_CREDENTIALS);
      }
    } else {
      return data_not_found(res, []);
    }
  } catch (err) {
    return internal_server_error(res, err.message);
  }
};
//#endregion

//#region edit profile
exports.edit_profile = async (req, res) => {
  try {
    const { name, dob, gender, number } = req.body;
    const find_profile = await userModel.findById({
      _id: req.user_id,
    });
    if (req.fileUrl) {
      // If an old image exists, delete it
      if (find_profile.profile_image !== null) {
        const oldFilePath = path.join('./public/upload', find_profile.profile_image);
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error(`Error deleting old image: ${err.message}`);
            return internal_server_error(res, "Error deleting old image");
          }
        });
      }
    }
    const update_profile = await userModel.findByIdAndUpdate(
      { _id: req.user_id },
      {
        $set: {
          first_name: name,
          dob,
          gender,
          number,
          profile_image: req.fileUrl,
        },
      },
      { new: true }
    );
    if (update_profile) {
      return response_ok(
        res,
        responseMessage.USER_PROFILE_UPDATED,
        update_profile
      );
    } else {
      return response_bad_request(
        res,
        responseMessage.FAILED_TO_REGISTER_AS_USER,
        []
      );
    }
  } catch (error) {
    return internal_server_error(res, error.message);
  }
};
//#endregion
