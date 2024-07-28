const responseMessage = require("../helper/responseMessage");
const { v4: uuidv4 } = require("uuid");
const { catchAsync, findCategoryByName } = require("../utils/commonFunction");
const {
  internal_server_error,
  data_not_found,
  unauthorize,
  response_ok,
  response_bad_request,
  custom_error_response,
  response_forbidden,
  response_created,
} = require("../utils/commonResponse");
const fs = require("fs");
const path = require("path");
const constants = require("../constants/constants");

//region create aboutus api
exports.create_aboutus = catchAsync(async (req, res) => {
  const { description } = req.body;
  const model = require("../model/aboutusModel");
  const existAboutus = await model.findOne({});
  if (existAboutus) {
    const update_aboutus = await model.findOneAndUpdate({ description });
    if (update_aboutus) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Aboutus"),
        update_aboutus
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update aboutus"),
        []
      );
    }
  } else {
    const data = new model({
      description,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Aboutus"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a aboutus"),
        []
      );
    }
  }
});
//#endregion

//#region get aboutus
exports.get_aboutus = catchAsync(async (req, res) => {
  const model = require("../model/aboutusModel");
  const find_aboutus = await model.findOne({});
  if (find_aboutus) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Aboutus"),
      find_aboutus
    );
  } else {
    return data_not_found(res, "Aboutus");
  }
});
//#endregion

//region create privacypolicy api
exports.create_privacypolicy = catchAsync(async (req, res) => {
  const { description } = req.body;
  const model = require("../model/privacypolicyModel");
  const existPrivacyPolicy = await model.findOne({});
  if (existPrivacyPolicy) {
    const update_privacypolicy = await model.findOneAndUpdate({ description });
    if (update_privacypolicy) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Privacy Policy"),
        update_privacypolicy
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update privacypolicy"),
        []
      );
    }
  } else {
    const data = new model({
      description,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Privacy Policy"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a privacypolicy"),
        []
      );
    }
  }
});
//#endregion

//#region get privacypolicy
exports.get_privacypolicy = catchAsync(async (req, res) => {
  const model = require("../model/privacypolicyModel");
  const find_privacypolicy = await model.findOne({});
  if (find_privacypolicy) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Privacy Policy"),
      find_privacypolicy
    );
  } else {
    return data_not_found(res, "Privacy Policy");
  }
});

//region create shippingpolicy api
exports.create_shippingpolicy = catchAsync(async (req, res) => {
  const { description } = req.body;
  const model = require("../model/shippingpolicyModel");
  const existShippingPolicy = await model.findOne({});
  if (existShippingPolicy) {
    const update_shippingpolicy = await model.findOneAndUpdate({ description });
    if (update_shippingpolicy) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Shipping Policy"),
        update_shippingpolicy
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update shippingpolicy"),
        []
      );
    }
  } else {
    const data = new model({
      description,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Shipping Policy"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a shippingpolicy"),
        []
      );
    }
  }
});
//#endregion

//#region get shippingpolicy
exports.get_shippingpolicy = catchAsync(async (req, res) => {
  const model = require("../model/shippingpolicyModel");
  const find_shippingpolicy = await model.findOne({});
  if (find_shippingpolicy) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Shipping Policy"),
      find_shippingpolicy
    );
  } else {
    return data_not_found(res, "Shipping Policy");
  }
});
//#endregion

//region create returnpolicy api
exports.create_returnpolicy = catchAsync(async (req, res) => {
  const { description } = req.body;
  const model = require("../model/returnpolicyModel");
  const existReturnPolicy = await model.findOne({});
  if (existReturnPolicy) {
    const update_returnpolicy = await model.findOneAndUpdate({ description });
    if (update_returnpolicy) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Return Policy"),
        update_returnpolicy
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update returnpolicy"),
        []
      );
    }
  } else {
    const data = new model({
      description,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Return Policy"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a returnpolicy"),
        []
      );
    }
  }
});
//#endregion

//#region get returnpolicy
exports.get_returnpolicy = catchAsync(async (req, res) => {
  const model = require("../model/returnpolicyModel");
  const find_returnpolicy = await model.findOne({});
  if (find_returnpolicy) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Return Policy"),
      find_returnpolicy
    );
  } else {
    return data_not_found(res, "Return Policy");
  }
});
//#endregion

//region create termsandcondition api
exports.create_termsandcondition = catchAsync(async (req, res) => {
  const { description } = req.body;
  const model = require("../model/termscondition");
  const existTOC = await model.findOne({});
  if (existTOC) {
    const update_termsandcondition = await model.findOneAndUpdate({
      description,
    });
    if (update_termsandcondition) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Terms and Conditions"),
        update_termsandcondition
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update termsandcondition"),
        []
      );
    }
  } else {
    const data = new model({
      description,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Terms and Conditions"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a termsandcondition"),
        []
      );
    }
  }
});
//#endregion

//#region get termsandcondition
exports.get_termsandcondition = catchAsync(async (req, res) => {
  const model = require("../model/termscondition");
  const find_termsandcondition = await model.findOne({});
  if (find_termsandcondition) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Terms and Conditions"),
      find_termsandcondition
    );
  } else {
    return data_not_found(res, "Terms and Conditions");
  }
});
//#endregion

//region create contactus api
exports.create_contactus = catchAsync(async (req, res) => {
  const { number, email, address } = req.body;
  const model = require("../model/contactusModel");
  const existContactus = await model.findOne({});
  if (existContactus) {
    const update_contactus = await model.findOneAndUpdate({
      number,
      email,
      address,
    });
    if (update_contactus) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Contactus"),
        update_contactus
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update contactus"),
        []
      );
    }
  } else {
    const data = new model({
      number,
      email,
      address,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Contactus"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a contactus"),
        []
      );
    }
  }
});
//#endregion

//#region get contactus
exports.get_contactus = catchAsync(async (req, res) => {
  const model = require("../model/contactusModel");
  const find_contactus = await model.findOne({});
  if (find_contactus) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Contactus"),
      find_contactus
    );
  } else {
    return data_not_found(res, "Contactus");
  }
});
//#endregion
