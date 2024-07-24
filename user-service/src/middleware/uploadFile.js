const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/upload");
  },
  filename: function (request, file, callback) {
    var ext = file.originalname.split(".");
    callback(null, Date.now() + "." + ext[ext.length - 1]);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ])(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ error: err.message });
    }
    if (req.files) {
      req.fileUrls = {};
      if (req.files.image) {
        req.fileUrls.image = req.files.image[0].filename;
      }
      if (req.files.images) {
        req.fileUrls.images = req.files.images.map((file) => file.filename);
      }
    }
    next();
  });
};

// Middleware function for multiple single field image uploads
const uploadMultipleFieldSingleImages = (req, res, next) => {
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ error: err.message });
    }
    if (req.files) {
      req.fileUrls = {};
      if (req.files.image1) {
        req.fileUrls.image1 = req.files.image1[0].filename;
      }
      if (req.files.image2) {
        req.fileUrls.image2 = req.files.image2[0].filename;
      }
    }
    next();
  });
};

const uploadSingleImages = (req, res, next) => {
  upload.single('profile_image')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ error: err.message });
    }
    if (req.file) {
        req.fileUrl = req.file ? req.file.filename: "-" ;
    }
    next();
  });
};
module.exports = { uploadMiddleware, uploadMultipleFieldSingleImages, uploadSingleImages };
