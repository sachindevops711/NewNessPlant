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

//region create category api
exports.create_category = catchAsync(async (req, res) => {
  const { name } = req.body;
  const model = require("../model/categoryModel");
  const existCategory = await findCategoryByName(name);
  if (existCategory) {
    return response_ok(res, constants.ALREADY_EXIST("Category"), existCategory);
  } else {
    const data = new model({
      name,
      image: req.fileUrl,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("Category"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a category"),
        []
      );
    }
  }
});
//#endregion

//#region edit category
exports.edit_category = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const model = require("../model/categoryModel");
  const find_category = await model.findById({
    _id: id,
    is_deleted: false,
  });
  if (req.fileUrl) {
    // If an old image exists, delete it
    if (find_category.image !== null) {
      const oldFilePath = path.join("./public/upload", find_category.image);
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error(`Error deleting old image: ${err.message}`);
        }
      });
    }
  }
  if (find_category) {
    const update_category = await model.findByIdAndUpdate(
      { _id: find_category._id },
      {
        $set: {
          name,
          image: req.fileUrl,
        },
      },
      { new: true }
    );
    if (update_category) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Category"),
        update_category
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update category"),
        []
      );
    }
  } else {
    return data_not_found(res, "Category");
  }
});
//#endregion

//#region delete category
exports.delete_category = catchAsync(async (req, res) => {
  const { id } = req.params;
  const model = require("../model/categoryModel");
  const find_category = await model.findById({
    _id: id,
    is_deleted: false,
  });
  // If an old image exists, delete it
  if (find_category.image !== null) {
    const oldFilePath = path.join("./public/upload", find_category.image);
    fs.unlink(oldFilePath, (err) => {
      if (err) {
        console.error(`Error deleting old image: ${err.message}`);
      }
    });
  }
  if (find_category) {
    const delete_category = await model.findByIdAndUpdate(
      { _id: find_category._id },
      {
        $set: {
          is_deleted: true,
        },
      },
      { new: true }
    );
    if (delete_category) {
      return response_ok(
        res,
        constants.DELETED_SUCCESSFULLY("Category"),
        delete_category
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("delete category"),
        []
      );
    }
  } else {
    return data_not_found(res, "Category");
  }
});
//#endregion

//#region get category by id
exports.get_category_by_id = catchAsync(async (req, res) => {
  const { id } = req.params;
  const model = require("../model/categoryModel");
  const find_category = await model.findOne({
    _id: id,
    is_deleted: false,
  });
  if (find_category) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Category"),
      find_category
    );
  } else {
    return data_not_found(res, "Category");
  }
});
//#endregion

//#region get category
exports.get_category = catchAsync(async (req, res) => {
  const model = require("../model/categoryModel");
  const find_category = await model.find({
    is_deleted: false,
  });
  if (find_category.length > 0) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Category"),
      find_category
    );
  } else {
    return data_not_found(res, "Category");
  }
});
//#endregion
