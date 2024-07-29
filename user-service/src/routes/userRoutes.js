const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const { uploadSingleImages } = require("../middleware/uploadFile");
const { userAuth } = require("../middleware/auth");

// Public routes (no authentication required)
router.post("/register", user_controller.register_user);
router.post("/login", user_controller.login);
router.post("/forgot_password", user_controller.forgot_password);
router.post("/reset_password/:otp", user_controller.reset_password);
router.post("/generate_otp", user_controller.generate_otp);
router.post("/refresh_token", user_controller.refresh_token);

// Protected routes (authentication required)
// router.use(userAuth); // Apply userAuth middleware to the routes below

// router.get("/get_profile", user_controller.get_profile);
// router.post("/change_password", user_controller.change_password);
// router.put("/edit_profile", uploadSingleImages, user_controller.edit_profile);
// router.delete("/delete_account", user_controller.delete_account);

module.exports = router;
