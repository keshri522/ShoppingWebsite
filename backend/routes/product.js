const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
//   conrollers
const {
  createProduct,
  listallProduct,
  deleteProducts,
  getSingleproduct,
  updateProducts,
} = require("../controllers/product"); // import the Auth confunction from the repo.
// niddlewares.
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware"); // middlewares
// routes

router.post("/product", authMiddleware, adminMiddleware, createProduct);

router.get("/products/:count", listallProduct); // this is public route use as a pagignation
router.delete(
  "/deleteProducts/:slug",
  authMiddleware,
  adminMiddleware,
  deleteProducts
);
router.get("/product/:slug", getSingleproduct);
router.put("/product/:slug", authMiddleware, adminMiddleware, updateProducts);
module.exports = router;
