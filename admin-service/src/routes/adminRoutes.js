const express = require("express");
const router = express.Router();
const admin_controller = require("../controllers/adminController");
const cms_controller = require("../controllers/cmsController");
const { uploadSingleImages } = require("../middleware/uploadFile");
const { adminAuth } = require("../middleware/auth");
// user side APIs
router.get("/get_profile", adminAuth, admin_controller.get_profile);
router.post("/login", admin_controller.login);
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

router.use(adminAuth);
router.post("/create/aboutus", cms_controller.create_aboutus);
router.get("/aboutus", cms_controller.get_aboutus);
router.post("/create/shippingpolicy", cms_controller.create_shippingpolicy);
router.get("/shippingpolicy", cms_controller.get_shippingpolicy);
router.post("/create/returnpolicy", cms_controller.create_returnpolicy);
router.get("/returnpolicy", cms_controller.get_returnpolicy);
router.post("/create/privacypolicy", cms_controller.create_privacypolicy);
router.get("/privacypolicy", cms_controller.get_privacypolicy);
router.post("/create/contactus", cms_controller.create_contactus);
router.get("/contactus", cms_controller.get_contactus);
router.post("/create/termscondition", cms_controller.create_termsandcondition);
router.get("/termscondition", cms_controller.get_termsandcondition);
module.exports = router;
