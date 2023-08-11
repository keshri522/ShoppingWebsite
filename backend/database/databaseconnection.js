// creating data base connection..
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// creating database connection .
const DatabaseConnection = async () => {
  try {
    const DataBaseUri = `mongodb+srv://rkeshri522:${process.env.password}@cluster0.pmobmox.mongodb.net/?retryWrites=true&w=majority`;
    const connect = await mongoose.connect(DataBaseUri, {
      UseNewUrlParser: true,
      useUnifiedTopology: true,
      // note//
      // UseNewUrlParser:ture  //When this option is enabled, it tells the MongoDB driver to use the new URL parser when connecting to the MongoDB server.
      // useUnifiedTopology: true, when we use this we  are instructing the MongoDB driver to use the unified topology engine for managing connections to the MongoDB server.
    });
    console.log("Database connected Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DatabaseConnection;
