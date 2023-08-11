const express = require("express");
const app = express();
const router = express.Router(); // this is the common router no need to use app.get/post..
const Auth = require("../controllers/auth"); // import the Auth confunction from the repo.
// routes
router.get("/create-or-update", Auth);

module.exports = router;
