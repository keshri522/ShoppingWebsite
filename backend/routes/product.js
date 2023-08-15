const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
//   conrollers
const { createProduct } = require("../controllers/product"); // import the Auth confunction from the repo.
// niddlewares.
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware"); // middlewares
// routes

router.post("/product", authMiddleware, adminMiddleware, createProduct);
module.exports = router;
