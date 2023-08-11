// here i create the whole server where my backend is running...
const mongoose = require("mongoose"); // third party modules for node.js
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const DatabaseConnection = require("./database/databaseconnection");

// import the Database connection function and run;
DatabaseConnection();
// middlewares
app.use(bodyParser.urlencoded({ extended: true })); // enabling the bodyparser to access as middle warre
app.use(bodyParser.json({ limit: "5mb" })); // increase the size if data is bigger.
app.use(morgan("tiny")); // printing the url or in the console or request.
app.use(cors());

// routes
app.get("/api", (req, res) => {
  res.send("hello world");
});
// define the port first
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running at the ${Port}`);
});
