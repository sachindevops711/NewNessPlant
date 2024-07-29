const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const plant_controller = require("../controllers/plantController");
const { uploadSingleImages } = require("../middleware/uploadFile");
const { adminAuth } = require("../middleware/auth");
const validator = require("../middleware/validation");

// category create APIs
router.use(adminAuth);
router.post("/create", uploadSingleImages, plant_controller.create_plant);
router.put("/edit/:id", [validator("update_category")], uploadSingleImages, category_controller.edit_category);
router.delete("/delete/:id", category_controller.delete_category);
router.get("/get/:id", category_controller.get_category_by_id);
router.get("/get", category_controller.get_category);


module.exports = router;
