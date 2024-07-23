exports.successMessage = (res, statusCode = 200, message, data) => {
  const resData = {
    error: false,
    statusCode: statusCode,
    message: message,
    data,
  };

  return res.status(statusCode).json(resData);
};

exports.badRequest = (res, statusCode = 400, message, data = {}) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message: message,
    data,
  };
  return res.status(statusCode).send(resData);
};

exports.customErrorResponse = (res, statusCode = 501, message, errors = {}) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message: message,
    errors: errors,
  };
  return res.status(statusCode).json(resData);
};
