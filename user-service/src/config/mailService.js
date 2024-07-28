const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

//#region register User Email
exports.registerUserEmail = (data, genPassword) => {
  let to = [data.email];
  const userName = data.userName || data.adminName;
  ejs.renderFile(
    path.join(__dirname, "../templates/RegisteredUser.ejs"),
    { userName, genPassword },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return new Promise(function (resolve, reject) {
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "NCXT Presale Dashboard - Registered User",
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (err) {
              reject(err.message);
              console.log(error);
            } else {
              resolve(1);
              console.log("Message %s sent: %s", info.messageId, info.response);
            }
          });
        });
      }
    }
  );
};
//#endregion

//#region register User Email
exports.emailVerification = (data) => {
  let to = [data.email];
  const userName = data.userName;
  let id = data.eVerificationId;
  ejs.renderFile(
    path.join(__dirname, "../templates/EmailVerification.ejs"),
    { userName, id },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return new Promise(function (resolve, reject) {
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "NCXT Presale Dashboard - Email Verification Link",
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (err) {
              reject(err.message);
              console.log(error);
            } else {
              resolve(1);
              console.log("Message %s sent: %s", info.messageId, info.response);
            }
          });
        });
      }
    }
  );
};
//#endregion

//#region reset password mail for user
exports.resetPasswordMailforUser = (data) => {
  let to = data.email;
  let name = data.name;
  const forgotId = data.resetToken;
  ejs.renderFile(
    path.join(__dirname, "../templates/ForgotPasswordMail.ejs"),
    { name, forgotId },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return new Promise(function (resolve, reject) {
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "Newness Plant - Reset password link",
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              // reject(err.message);
              console.log(error);
            } else {
              // resolve(1);
              console.log("Message %s sent: %s", info.messageId, info.response);
            }
          });
        });
      }
    }
  );
};
//#endregion

//#region reset password mail for user
exports.resetPasswordMailforAdmin = (data) => {
  let to = [data.email];
  const userName = data.adminName;
  const forgotId = data.forgotId;
  ejs.renderFile(
    path.join(__dirname, "../templates/ForgotPasswordMail.ejs"),
    { userName, forgotId },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return new Promise(function (resolve, reject) {
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "NCXT Presale Dashboard - Reset password link",
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              reject(err.message);
              console.log(error);
            } else {
              resolve(1);
              console.log("Message %s sent: %s", info.messageId, info.response);
            }
          });
        });
      }
    }
  );
};
//#endregion

//#region OTP Verification Mail
exports.otpVerificationMail = (data) => {
  let to = [data.email];
  const userName = data.userName;
  const otp = data.otpVerify.otp;
  ejs.renderFile(
    path.join(__dirname, "../templates/OtpVerification.ejs"),
    { userName, otp },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: to,
          subject: "NCXT Presale Dashboard - OTP Verification link",
          html: data,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent");
          }
        });
      }
    }
  );
};
//#endregion
