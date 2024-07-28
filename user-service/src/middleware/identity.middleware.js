const types = {
  ADMIN: 1,
  USER: 2,
  VENDOR: 3,
};

const getPlatformType = (type) => {
  switch (type) {
    case types.ADMIN:
      return "ADMIN";
    case types.VENDOR:
      return "VENDOR";
    default:
      return "USER";
  }
};

const identifyType = (type) => async (req, res, next) => {
  req.isVendor = type === types.VENDOR;
  req.isAdmin = type === types.ADMIN;
  req.isUser = type === types.USER;
  req.platformType = getPlatformType(type);
  next();
};

module.exports = identifyType;
