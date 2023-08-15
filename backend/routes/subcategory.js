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
} = require("../controllers/subcategory");
// niddlewares.
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware"); // middlewares
// routes
router.post("/subcategory", authMiddleware, adminMiddleware, create);
router.get("/subcategories", list); // public to all means if a user do not login he can also see all the list of the category
router.get("/subcategory/:slug", read); // public can read or get any of the category based on the slug
router.put("/subcategory/:slug", authMiddleware, adminMiddleware, update); // admin can update any of the category based on the slug
router.delete("/subcategory/:slug", authMiddleware, adminMiddleware, remove); // admin can remove any of the category based on the slug.
module.exports = router;
