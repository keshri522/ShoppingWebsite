const express = require("express");
const app = express();
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router(); // this is the common router no need to use app.get/post..
const {
  userCart,
  getuserCart,
  removeusercart,
  addressSave,
  AllCartitmes,
} = require("../controllers/user"); // this is function coming from controllers.
// routes
router.get("/user/allcart", authMiddleware, AllCartitmes);
router.get("/user/cart", authMiddleware, getuserCart); // get all the cart from db
router.post("/user/cart", authMiddleware, userCart); // saving all the data of cartto db
router.delete("/user/cart", authMiddleware, removeusercart); // delete all the cart from db
router.post("/user/address", authMiddleware, addressSave); // save all the address to db
module.exports = router;
