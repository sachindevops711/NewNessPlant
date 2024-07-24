const validators = require("../utils/validator");

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      const validated = await validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi)
        res.status(400).json({
          success: false,
          data: null,
          message: err.details[0].message.replaceAll('"', ""),
        });
    }
  };
};
