const express = require("express");
const app = express();
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router(); // this is the common router no need to use app.get/post..
const {
  userCart,
  getuserCart,
  removeusercart,
} = require("../controllers/user"); // this is function coming from controllers.
// routes
router.get("/user/cart", authMiddleware, getuserCart);
router.post("/user/cart", authMiddleware, userCart);
router.delete("/user/cart", authMiddleware, removeusercart);
module.exports = router;
