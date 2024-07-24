const jwt = require("jsonwebtoken");
const {
  unauthorize,
  response_bad_request,
} = require("../utils/commonResponse");
const responseMessage = require("../helper/responseMessage");
require("dotenv").config();
// const responseMessage = require("../utils/ResponseMessage.json");
// const Admin = require('../model/Admin')

// exports.adminAuth = function (req, res, next) {
//   const token = req.header("auth");
//   if (!token) {
//     res.status(401).json({
//       status: code[401],
//       message: responseMessage.TOKEN_NOT_AUTHORIZED,
//       data: [],
//     });
//   } else {
//     try {
//       const decode = jwt.verify(token, process.env.SECRET_KEY);
//       req.admin_id = decode.adminId;
//       next();
//     } catch (err) {
//       res.status(400).json({
//         status: code[400],
//         message: responseMessage.TOKEN_NOT_VALID,
//         data: err.message,
//       });
//     }
//   }
// };

exports.userAuth = function (req, res, next) {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorize(res, responseMessage.TOKEN_NOT_AUTHORIZED);
  }

  // Get the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user_id = decoded.userId;
    next();
  } catch (err) {
    return response_bad_request(
      res,
      responseMessage.TOKEN_NOT_VALID,
      err.message
    );
  }
};

// exports.isAdmin = async (req, res, next) => {
//   try {
//     const isAdmin = await Admin.findById({ _id: req.admin_id });
//     if (!isAdmin) {
//       return res.status(401).json({
//         status: code[401],
//         message: responseMessage.NO_ADMIN_EMAIL,
//         data: [],
//       });
//     }
//     req.admin = isAdmin;
//     next();
//   } catch (error) {
//     return res.status(400).json({
//       status: code[400],
//       message: responseMessage.TOKEN_NOT_VALID,
//       data: [],
//     });
//   }
// };

// exports.isUser = async (req, res, next) => {
//   try {
//     const isUser = await User.findById({ _id: req.user_id });
//     if (!isUser) {
//       return res.status(401).json({
//         status: code[401],
//         message: responseMessage.NO_USER_EMAIL,
//         data: [],
//       });
//     }
//     req.user = isUser;
//     next();
//   } catch (error) {
//     return res.status(400).json({
//       status: code[400],
//       message: responseMessage.TOKEN_NOT_VALID,
//       data: [],
//     });
//   }
// };
