const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createJwtTokens,
  catchAsync,
  findUserByNumber,
  findUserByEmail,
  sendSms,
  generateOtp,
} = require("../utils/commonFunction");
const constants = require("../constants/constants");
const {
  internal_server_error,
  data_not_found,
  unauthorize,
  response_ok,
  response_created,
  response_bad_request,
  response_forbidden,
} = require("../utils/commonResponse");
const fs = require("fs");
const path = require("path");
const { resetPasswordMailforUser } = require("../config/mailService");

//#region register user
exports.register_user = catchAsync(async (req, res) => {
  let { name, last_name, email, password, number } = req.body;
  const model = require("../model/userModel");
  const existUser = await findUserByEmail(email);
  if (existUser) {
    return response_ok(
      res,
      constants.ALREADY_REGISTERED(constants.USER),
      existUser
    );
  } else {
    const data = new model({
      first_name: name,
      last_name,
      number,
      email,
      password,
    });
    let result = await data.save();
    if (result) {
      return response_created(res, constants.REGISTER_MESSAGE, result);
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create an account"),
        []
      );
    }
  }
});
//#endregion

//#region login
exports.login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  email = email ? email.toLowerCase() : "";
  const existUser = await findUserByEmail(email);
  if (existUser && existUser._id) {
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (validPassword) {
      const payload = { userId: existUser._id };
      const { access_token, refresh_token } = await createJwtTokens(
        payload,
        constants.USER
      );
      // Save refresh token to user (you should store this securely)
      existUser.refresh_token = refresh_token;
      await existUser.save();
      return response_ok(res, constants.LOGIN_MESSAGE, {
        access_token,
        ...existUser._doc,
      });
    } else {
      return unauthorize(res, constants.INCORRECT_CREDENTIALS);
    }
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion

//#region edit profile
exports.edit_profile = catchAsync(async (req, res) => {
  const { name, dob, gender, number } = req.body;
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.user_id,
    is_deleted: false,
  });
  if (req.fileUrl) {
    // If an old image exists, delete it
    if (find_profile.profile_image !== null) {
      const oldFilePath = path.join(
        "./public/upload",
        find_profile.profile_image
      );
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error(`Error deleting old image: ${err.message}`);
        }
      });
    }
  }
  if (find_profile) {
    const update_profile = await model.findByIdAndUpdate(
      { _id: find_profile._id },
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
        constants.UPDATED_SUCCESSFULLY("Profile"),
        update_profile
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update profile"),
        []
      );
    }
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion

//#region forgot password
exports.forgot_password = catchAsync(async (req, res) => {
  let user;
  if (req.body.number) {
    user = await findUserByNumber(req.body.number);
  } else if (req.body.email) {
    user = await findUserByEmail(req.body.email);
  }
  if (!user) {
    return data_not_found(res, "User");
  }
  // const welcomeMessage = 'Welcome to Newness plant! Your verification code is 54875';
  // sendSms(user.number, welcomeMessage);
  // Generate reset token and set expiration time (30 minutes from now)
  const resetToken = generateOtp();
  user.reset_password_token = resetToken;
  user.reset_password_expires = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save();
  const payload = {
    email: user.email,
    name: user.first_name,
    resetToken,
  };
  // Send reset email or message
  await resetPasswordMailforUser(payload);
  const type = req.body.number ? "message" : "email";
  return response_ok(res, constants.RESET_PASSWORD_MESSAGE_TYPE(type), user);
});
//#endregion

//#region reset password
exports.reset_password = catchAsync(async (req, res) => {
  const { otp } = req.params;
  const { password } = req.body;
  const model = require("../model/userModel");
  // Find the user with the reset token and check if it's still valid
  const find_user = await model.findOne({
    reset_password_token: otp,
    reset_password_expires: { $gt: Date.now() }, // Check if the token has not expired
  });

  if (!find_user) {
    return response_forbidden(res, constants.RESET_PASSWORD_LINK_EXPIRED, []);
  }

  // Update the user's password and clear the reset token fields
  find_user.password = password;
  find_user.reset_password_token = undefined;
  find_user.reset_password_expires = undefined;
  await find_user.save();

  return response_ok(res, constants.RESET_PASSWORD_MESSAGE, {
    user_id: find_user._id,
  });
});
//#endregion

//#region change password
exports.change_password = catchAsync(async (req, res) => {
  const { current_password, new_password } = req.body;
  const model = require("../model/userModel");
  // Find the user
  const user = await model.findById({ _id: req.user_id, is_deleted: false });
  if (!user) {
    return data_not_found(res, "User");
  }

  // Check current password
  const isMatch = await bcrypt.compare(current_password, user.password);
  if (!isMatch) {
    return unauthorize(res, constants.PASSWORD_WRONG);
  }

  // Update the user's password
  user.password = new_password;
  await user.save();
  return response_ok(res, constants.RESET_PASSWORD_MESSAGE, user);
});
//#endregion

//#region edit profile
exports.delete_account = catchAsync(async (req, res) => {
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.user_id,
    is_deleted: false,
  });
  if (find_profile) {
    const delete_account = await model.findByIdAndUpdate(
      { _id: req.user_id },
      {
        $set: {
          is_deleted: true,
          refresh_token: "",
          reset_password_token: "",
        },
      },
      { new: true }
    );
    if (delete_account) {
      return response_ok(
        res,
        constants.DELETED_SUCCESSFULLY(constants.USER),
        []
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("delete an account"),
        []
      );
    }
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion

//#region forgot password
exports.generate_otp = catchAsync(async (req, res) => {
  let user;
  if (req.body.number) {
    user = await findUserByNumber(req.body.number);
  } else if (req.body.email) {
    user = await findUserByEmail(req.body.email);
  }
  if (!user) {
    return data_not_found(res, "User");
  }
  // const welcomeMessage = 'Welcome to Newness plant! Your verification code is 54875';
  // sendSms(user.number, welcomeMessage);
  // Generate reset token and set expiration time (30 minutes from now)
  const resetToken = await generateOtp();
  user.reset_password_token = resetToken;
  user.reset_password_expires = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save();
  const payload = {
    email: user.email,
    name: user.first_name,
    resetToken,
  };
  // Send reset email or message
  await resetPasswordMailforUser(payload);
  const type = req.body.number ? "message" : "email";
  return response_ok(res, constants.RESET_PASSWORD_MESSAGE_TYPE(type), user);
});
//#endregion

//#region refresh token
exports.refresh_token = catchAsync(async (req, res) => {
  const { refresh_token } = req.body;
  const model = require("../model/userModel");

  // Verify the refresh token
  jwt.verify(
    refresh_token,
    process.env.JWT_USER_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) {
        return response_forbidden(res, constants.TOKEN_EXPIRED_ERROR, []);
      }

      try {
        // Find the user associated with the refresh token
        const user = await model.findById({
          _id: decoded.userId,
          is_deleted: false,
        });

        if (!user || !user.refresh_token === refresh_token) {
          return response_forbidden(res, constants.TOKEN_NOT_EXIST_ERROR, []);
        }

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "24hr",
          }
        );

        return response_ok(res, constants.REFRESH_TOKEN_SUCCESS, {
          access_token: newAccessToken,
        });
      } catch (error) {
        console.error("Error during refresh token process:", error);
        return internal_server_error(
          res,
          constants.INTERNAL_SERVER_ERROR,
          error.message
        );
      }
    }
  );
});

//#endregion

//#region get user infor
exports.get_profile = catchAsync(async (req, res) => {
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.user_id,
    is_deleted: false,
  });
  if (find_profile) {
    return response_ok(
      res,
      constants.PROFILE_MESSAGE(constants.USER),
      find_profile
    );
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion
