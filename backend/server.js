// here i create the whole server where my backend is running...
const mongoose = require("mongoose"); // third party modules for node.js
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const DatabaseConnection = require("./database/databaseconnection");
// import routes...
const AuthRoute = require("./routes/auth");
const user = require("./routes/user");
const Category = require("./routes/catergory");
const subscategory = require("./routes/subcategory");
const Product = require("./routes/product");
const uploadImage = require("./routes/cloudinary");
const UserRoute = require("./routes/user");
const GetCart = require("./routes/user");

// import the Database connection function and run;
DatabaseConnection();
// middlewares
app.use(bodyParser.urlencoded({ extended: true })); // enabling the bodyparser to access as middle warre
app.use(bodyParser.json({ limit: "5mb" })); // increase the size if data is bigger.
app.use(morgan("tiny")); // printing the url or in the console or request.
app.use(cors());
// using Routes with middleware..
app.use("/api", AuthRoute, Category, Product, UserRoute, GetCart); // means AuthRoute will access only if we go to by /api first.this middleware does
app.use("/user", user); //access only first you got user/then .
app.use("/api", subscategory, uploadImage);
// app.use("/route", Category); // access by Category routes
// define the port first
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running at the ${Port}`);
});
