exports.successMessage = (res, statusCode = 200, message, data) => {
  const resData = {
    error: false,
    statusCode: statusCode,
    message: message,
    data,
  };

  return res.status(resData.statusCode).json(resData);
};

exports.badRequest = (res, statusCode = 400, message, data = {}) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message: message,
    data,
  };
  return res.status(resData.statusCode).send(resData);
};

exports.internal_server_error = (res, errors = {}) => {
  const resData = {
    error: true,
    statusCode: 500,
    message: "Internal Server Error",
    errors: errors,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.data_not_found = (res, value) => {
  const resData = {
    error: false,
    statusCode: 404,
    message: `${value} Not Found`,
    data: [],
  };
  return res.status(resData.statusCode).json(resData);
};

exports.unauthorize = (res, message) => {
  const resData = {
    error: true,
    statusCode: 401,
    message: message,
    data: [],
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_ok = (res, message, data) => {
  const resData = {
    error: false,
    statusCode: 200,
    message: message,
    data: data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_created = (res, message, data) => {
  const resData = {
    error: false,
    statusCode: 201,
    message: message,
    data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_bad_request = (res, message, data) => {
  const resData = {
    error: true,
    statusCode: 400,
    message: message,
    data: data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_forbidden = (res, message, data) => {
  const resData = {
    error: true,
    statusCode: 403,
    message: message,
    data: data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.custom_error_response = (res, statusCode, message, errors = {}) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message: message,
    errors: errors,
  };
  return res.status(resData.statusCode).json(resData);
};