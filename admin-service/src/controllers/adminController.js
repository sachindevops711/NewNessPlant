const responseMessage = require("../helper/responseMessage");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const {
  createJwtTokens,
  catchAsync,
  findUserByEmail,
} = require("../utils/commonFunction");
const {
  internal_server_error,
  data_not_found,
  unauthorize,
  response_ok,
  response_bad_request,
  custom_error_response,
  response_forbidden,
} = require("../utils/commonResponse");
const fs = require("fs");
const path = require("path");
const { resetPasswordMailforUser } = require("../config/mailService");
const constants = require("../constants/constants");

//#region login
exports.login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  email = email ? email.toLowerCase() : "";
  const existAdmin = await findUserByEmail(email);
  if (existAdmin && existAdmin._id) {
    const validPassword = await bcrypt.compare(password, existAdmin.password);
    if (validPassword) {
      const payload = { adminId: existAdmin._id };
      const { access_token, refresh_token } = await createJwtTokens(
        payload,
        constants.ADMIN
      );
      // Save refresh token to admin (you should store this securely)
      existAdmin.refresh_token = refresh_token;
      await existAdmin.save();
      return response_ok(res, constants.LOGIN_MESSAGE, {
        access_token,
        ...existAdmin._doc,
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
  const { name, dob, gender } = req.body;
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.admin_id,
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
          return internal_server_error(res, "Error deleting old image");
        }
      });
    }
  }
  if (find_profile) {
    const update_profile = await model.findByIdAndUpdate(
      { _id: find_profile._id },
      {
        $set: {
          name,
          dob,
          gender,
          profile_image: req.fileUrl,
        },
      },
      { new: true }
    );
    if (update_profile) {
      return response_ok(
        res,
        responseMessage.ADMIN_PROFILE_UPDATED,
        update_profile
      );
    } else {
      return response_bad_request(
        res,
        responseMessage.FAILED_TO_UPDATE_PROFILE,
        []
      );
    }
  } else {
    return data_not_found(res, "Admin");
  }
});
//#endregion

//#region forgot password
exports.forgot_password = catchAsync(async (req, res) => {
  let admin = await findUserByEmail(req.body.email);
  if (!admin) {
    return data_not_found(res, "Admin");
  }
  // const welcomeMessage = 'Welcome to Newness plant! Your verification code is 54875';
  // sendSms(admin.number, welcomeMessage);
  // Generate reset token and set expiration time (30 minutes from now)
  const resetToken = Math.floor(100000 + Math.random() * 900000);
  admin.reset_password_token = resetToken;
  admin.reset_password_expires = Date.now() + 30 * 60 * 1000; // 30 minutes
  await admin.save();
  const payload = {
    email: admin.email,
    name: admin.name,
    resetToken,
  };
  // Send reset email or message
  await resetPasswordMailforUser(payload);
  return response_ok(res, `Password reset number sent`, admin);
});
//#endregion

//#region reset password
exports.reset_password = catchAsync(async (req, res) => {
  const { otp } = req.params;
  const { password } = req.body;
  const model = require("../model/userModel");
  // Find the admin with the reset token and check if it's still valid
  const find_admin = await model.findOne({
    reset_password_token: otp,
    reset_password_expires: { $gt: Date.now() }, // Check if the token has not expired
  });

  if (!find_admin) {
    return custom_error_response(
      res,
      404,
      "Reset password link expired or invalid"
    );
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update the admin's password and clear the reset token fields
  find_admin.password = hashedPassword;
  find_admin.reset_password_token = undefined;
  find_admin.reset_password_expires = undefined;
  await find_admin.save();

  return response_ok(res, "Password has been reset successfully", {
    user_id: find_admin._id,
  });
});
//#endregion

//#region change password
exports.change_password = catchAsync(async (req, res) => {
  const { current_password, new_password } = req.body;
  const model = require("../model/userModel");
  // Find the admin
  const admin = await model.findById({ _id: req.admin_id, is_deleted: false });
  if (!admin) {
    return data_not_found(res, "Admin");
  }

  // Check current password
  const isMatch = await bcrypt.compare(current_password, admin.password);
  if (!isMatch) {
    return unauthorize(res, responseMessage.CURRENT_PASSWORD_INCORRECT);
  }

  // Update the admin's password
  admin.password = new_password;
  await admin.save();
  return response_ok(res, responseMessage.PASSWORD_CHANGED, admin);
});
//#endregion

//#region edit profile
exports.delete_account = catchAsync(async (req, res) => {
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.admin_id,
    is_deleted: false,
  });
  if (find_profile) {
    const delete_account = await model.findByIdAndUpdate(
      { _id: req.admin_id },
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
      return response_ok(res, responseMessage.ADMIN_PROFILE_DELETED, []);
    } else {
      return response_bad_request(
        res,
        responseMessage.FAILED_TO_DELETE_ACCOUNT,
        []
      );
    }
  } else {
    return data_not_found(res, "Admin");
  }
});
//#endregion

//#region refresh token
exports.refresh_token = catchAsync(async (req, res) => {
  const { refresh_token } = req.body;
  const model = require("../model/userModel");

  // Verify the refresh token
  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return response_forbidden(
          res,
          responseMessage.INVALID_REFRESH_TOKEN,
          []
        );
      }

      // Find the admin associated with the refresh token
      const admin = await model.findById({
        _id: decoded.adminId,
        is_deleted: false,
      });
      if (!admin || !admin.refresh_token === refresh_token) {
        return response_forbidden(
          res,
          responseMessage.INVALID_REFRESH_TOKEN,
          []
        );
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { adminId: admin._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "24hr",
        }
      );

      return response_ok(res, responseMessage.NEW_ACCESS_TOKEN, {
        access_token: newAccessToken,
      });
    }
  );
});
//#endregion

//#region get admin infor
exports.get_profile = catchAsync(async (req, res) => {
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.admin_id,
    is_deleted: false,
  });
  if (find_profile) {
    return response_ok(res, responseMessage.USER_PROFILE_FETCHED, find_profile);
  } else {
    return data_not_found(res, "Admin");
  }
});
//#endregion
