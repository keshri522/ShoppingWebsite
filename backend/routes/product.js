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
  TotalProducts,
  PaginatioProduct,
  searchProducts,
} = require("../controllers/product"); // import the Auth confunction from the repo.
// niddlewares.
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware"); // middlewares
// routes

router.post("/product", authMiddleware, adminMiddleware, createProduct);
router.post("/products/pagination", PaginatioProduct);
router.get("/products/total", TotalProducts);
router.get("/products/:count", listallProduct); // this is public route use as a pagignation
router.delete(
  "/deleteProducts/:slug",
  authMiddleware,
  adminMiddleware,
  deleteProducts
);
router.get("/product/:slug", getSingleproduct);

router.put("/product/:slug", authMiddleware, adminMiddleware, updateProducts);
// this is for sending the data from frontend to backend .. to show based on the latest arrivals

router.get("/products/:count", listallProduct);
// this is routes where we use all the filters and search
// FILTERING AND SEARCHING
router.post("/search/filter", searchProducts);
module.exports = router;
