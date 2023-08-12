const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
//   conrollers
const Auth = require("../controllers/auth"); // import the Auth confunction from the repo.
// niddlewares.
const authMiddleware = require("../middlewares/authMiddleware"); // middlewares
// routes
router.post("/create-or-update", authMiddleware, Auth);

module.exports = router;
