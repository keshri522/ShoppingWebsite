const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
const user = require("../controllers/user"); // this is function coming from controllers.
// routes
router.get("/userfind", user);
module.exports = router;
