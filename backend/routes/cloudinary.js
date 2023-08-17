const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
//   conrollers
const { uploadImage, removeImage } = require("../controllers/cloudinary");
// middlewares for the admins
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware"); // middlewares
// routes

router.post("/uploadimage", authMiddleware, adminMiddleware, uploadImage);
router.post("/removeimage", authMiddleware, adminMiddleware, removeImage);
module.exports = router;
