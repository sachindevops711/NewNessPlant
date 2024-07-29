const responseMessage = require("../helper/responseMessage");
const { v4: uuidv4 } = require("uuid");
const {
  catchAsync,
  findCategoryByName,
  findCategoryById,
  findPlantByName,
} = require("../utils/commonFunction");
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

//region create plant api
exports.create_plant = catchAsync(async (req, res) => {
  const { name, description, video, categorieName, id, regular_price, sale_price, discount } =
    req.body;
  const model = require("../model/plantModel");
  const existPlant = await findPlantByName(name);
  const existCategory = await findCategoryById(id);
  if (existPlant) {
    return response_ok(res, constants.ALREADY_EXIST("Plant name"), existPlant);
  } else {
    const joinSlug = (str) => {
      return str
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
    };
    const data = new model({
      name,
      regular_price,
      sale_price,
      video,
      discount,
      description,
      categorieName,
      category_id:existCategory._id,
      slug: `${existCategory._id}-${joinSlug(name)}`,
      image: req.fileUrl,
    });
    let result = await data.save();
    if (result) {
      return response_created(
        res,
        constants.CREATED_SUCCESSFULLY("New Plant"),
        result
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create a new plant"),
        []
      );
    }
  }
});
//#endregion

//#region edit plant
exports.edit_plant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const model = require("../model/plantModel");
  const find_plant = await model.findById({
    _id: id,
    is_deleted: false,
  });
  if (req.fileUrl) {
    // If an old image exists, delete it
    if (find_plant.image !== null) {
      const oldFilePath = path.join("./public/upload", find_plant.image);
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error(`Error deleting old image: ${err.message}`);
        }
      });
    }
  }
  if (find_plant) {
    const joinSlug = (str) => {
      return str
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
    };
    const update_plant = await model.findByIdAndUpdate(
      { _id: find_plant._id },
      {
        $set: {
          name,
          slug: joinSlug(name),
          image: req.fileUrl,
        },
      },
      { new: true }
    );
    if (update_plant) {
      return response_ok(
        res,
        constants.UPDATED_SUCCESSFULLY("Plant"),
        update_plant
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("update plant"),
        []
      );
    }
  } else {
    return data_not_found(res, "Plant");
  }
});
//#endregion

//#region delete plant
exports.delete_plant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const model = require("../model/plantModel");
  const find_plant = await model.findById({
    _id: id,
    is_deleted: false,
  });
  // If an old image exists, delete it
  if (find_plant.image !== null) {
    const oldFilePath = path.join("./public/upload", find_plant.image);
    fs.unlink(oldFilePath, (err) => {
      if (err) {
        console.error(`Error deleting old image: ${err.message}`);
      }
    });
  }
  if (find_plant) {
    const delete_plant = await model.findByIdAndUpdate(
      { _id: find_plant._id },
      {
        $set: {
          is_deleted: true,
        },
      },
      { new: true }
    );
    if (delete_plant) {
      return response_ok(
        res,
        constants.DELETED_SUCCESSFULLY("Plant"),
        delete_plant
      );
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("delete plant"),
        []
      );
    }
  } else {
    return data_not_found(res, "Plant");
  }
});
//#endregion

//#region get plant by id
exports.get_plant_by_id = catchAsync(async (req, res) => {
  const { id } = req.params;
  const model = require("../model/plantModel");
  const find_plant = await model.findOne({
    _id: id,
    is_deleted: false,
  });
  if (find_plant) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Plant"),
      find_plant
    );
  } else {
    return data_not_found(res, "Plant");
  }
});
//#endregion

//#region get plant
exports.get_plant = catchAsync(async (req, res) => {
  const model = require("../model/plantModel");
  const find_plant = await model.find({
    is_deleted: false,
  });
  if (find_plant.length > 0) {
    return response_ok(
      res,
      constants.FETCHED_SUCCESSFULLY("Plant"),
      find_plant
    );
  } else {
    return data_not_found(res, "Plant");
  }
});
//#endregion
