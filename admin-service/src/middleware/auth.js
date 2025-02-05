const jwt = require("jsonwebtoken");
const {
  unauthorize,
  response_bad_request,
} = require("../utils/commonResponse");
require("dotenv").config();
const constants = require("../constants/constants");
exports.adminAuth = function (req, res, next) {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorize(res, constants.EXPIRED_TOKEN_ERROR);
  }

  // Get the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_ACCESS_SECRET);
    req.admin_id = decoded.adminId;
    next();
  } catch (err) {
    return response_bad_request(
      res,
      constants.INVALID_TOKEN_ERROR,
      err.message
    );
  }
};
