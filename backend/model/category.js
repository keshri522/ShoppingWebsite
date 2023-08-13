const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// creating a schema for category
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Too-Short"],
      maxlength: [32, "Too-high"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

// creating the documents with the given schema..
const Catergory = mongoose.model("Catergory", categorySchema);
module.exports = Catergory;
