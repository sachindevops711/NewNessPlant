const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const { uploadSingleImages } = require("../middleware/uploadFile");
const { adminAuth } = require("../middleware/auth");

// category create APIs
router.use(adminAuth);
router.post("/create", uploadSingleImages, category_controller.create_category);
router.put("/edit/:id", uploadSingleImages, category_controller.edit_category);
router.delete("/delete/:id", category_controller.delete_category);
router.get("/get/:id", category_controller.get_category_by_id);
router.get("/get", category_controller.get_category);


module.exports = router;
