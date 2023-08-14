const admin = require("../firbase/index"); // import admin from firebase to verify the token in backend
const User = require("../model/userSchema");
// create a functino which will verify token and act as a middle ware..
const authMiddleware = async (req, res, next) => {
  try {
    // need to verify the token coming from frontend in headers.
    const check = await admin.auth().verifyIdToken(req.headers.token);
    // console.log("This is a Valid User");
    req.user = check; // means adding all the property that is coming from firebase after verifying the user like name ,email, and picture
    // if everything is ok means toekn is verfied then go to next() function means controllers
    next();
  } catch (error) {
    res.status(401).json({
      err: "Invalid or wrong Token",
    });
  }
};
// create admin middleware check if the role===admin then only pass
const adminMiddleware = async (req, res, next) => {
  try {
    const { email } = req.user; // destruting from auth middleware.
    const adminUser = await User.findOne({ email });
    if (adminUser.role === "admin") {
      // res.status(200).json(adminUser);

      next(); // next middleware
    } else {
      res.status(403).json("Admin access, admin denied");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authMiddleware, adminMiddleware };
