const express = require("express");
const router = express.Router();
const cms_controller = require("../controllers/cmsController");
const { adminAuth } = require("../middleware/auth");

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
