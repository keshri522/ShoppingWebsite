// creating a schema for the user model..
// scheme is basically a blueprint in in which we store the date in format..

const mongoose = require("mongoose");

// creating the user Schema
const userSchema = new mongoose.model(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: {
      // type:{type:mongoose.Schema.ObjectId,ref:"Product"}
    },
  },
  { timestamps: true }
);
//need to create documents..
module.exports = mongoose.model("User", userSchema);
// it creates a USer documents with the userSchema collections.
