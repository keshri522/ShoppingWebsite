const admin = require("../firbase/index"); // import admin from firebase to verify the token in backend

// create a functino which will verify token and act as a middle ware..
const authMiddleware = (req, res, next) => {
  console.log(req.headers);

  // if everything is ok means toekn is verfied then go to next() function means controllers
  next();
};
module.exports = authMiddleware;
