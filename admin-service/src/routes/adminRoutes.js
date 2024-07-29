const express = require("express");
const router = express.Router();
const admin_controller = require("../controllers/adminController");
const { uploadSingleImages } = require("../middleware/uploadFile");
const { adminAuth } = require("../middleware/auth");
const validator = require("../middleware/validation");

// admin side APIs
router.get("/get_profile", adminAuth, admin_controller.get_profile);
router.post("/login", [validator("login")], admin_controller.login);
router.post("/forgot_password", admin_controller.forgot_password);
router.post("/reset_password/:otp", admin_controller.reset_password);
router.post("/change_password", adminAuth, admin_controller.change_password);
router.post("/refresh_token", admin_controller.refresh_token);
router.put(
  "/edit_profile",
  adminAuth,
  uploadSingleImages,
  admin_controller.edit_profile
);

module.exports = router;
