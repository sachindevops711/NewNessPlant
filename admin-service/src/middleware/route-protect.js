const User = require('../models/user');
const { AppError, catchAsync } = require('../utils/appError');
const constants = require('../constants/constants');
const { jwtVerify } = require('../helpers/commonFunction');

const { JWT_USER_ACCESS_SECRET, JWT_CMS_ACCESS_SECRET, TOKEN_HEADER_NAME } = process.env;

// Protect middleware that helps to protect protected routes
const protect = catchAsync(async (req, res, next) => {
  const Model = User;
  const accessSecret = req.isCMS ? JWT_CMS_ACCESS_SECRET : JWT_USER_ACCESS_SECRET;
  // 1) Getting token and check of it's there or not
  let accessToken;
  if (req.headers[TOKEN_HEADER_NAME] && req.headers[TOKEN_HEADER_NAME].startsWith('Bearer')) {
    [, accessToken] = req.headers[TOKEN_HEADER_NAME].split(' ');
  }
  if (!accessToken) {
    return next(new AppError(constants.UNAUTHORIZED_ERROR, constants.UNAUTHORIZED));
  }
 
  // 2) Verification token
  const decoded = await jwtVerify(accessToken, accessSecret);
  // 3) Check if user still exists (means if after generate a token, someone delete his/her account)
  const user = await Model.findById(decoded.id);
  if (!user) return next(new AppError(constants.TOKEN_NOT_EXIST_ERROR, constants.BAD_REQUEST));

  // GRANT ACCESS TO PROTECTED ROUTE & PASS THIS TO NEXT MIDDLEWARE
  req.user = user;
  req.user_type = req.user.user_type;
  req.admin_type = req.user.admin_type;
  next();
});

module.exports = protect;
