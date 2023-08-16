const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
//   conrollers
const {
  create,
  read,
  update,
  remove,
  list,
  getSubcatecory,
} = require("../controllers/category");
// niddlewares.
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware"); // middlewares
// routes
router.post("/category", authMiddleware, adminMiddleware, create);
router.get("/categories", list); // public to all means if a user do not login he can also see all the list of the category
router.get("/category/:slug", read); // public can read or get any of the category based on the slug
router.put("/category/:slug", authMiddleware, adminMiddleware, update); // admin can update any of the category based on the slug
router.delete("/category/:slug", authMiddleware, adminMiddleware, remove); // admin can remove any of the category based on the slug.
router.get("/category/subcategory/:_Id", getSubcatecory);
module.exports = router;
