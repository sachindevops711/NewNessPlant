const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const { uploadSingleImages } = require("../middleware/uploadFile");
const { userAuth } = require("../middleware/auth");

// user side APIs
router.post("/register", user_controller.registerUser);
router.post("/login", user_controller.login);
router.put("/edit_profile", userAuth, uploadSingleImages, user_controller.edit_profile);

module.exports = router;
