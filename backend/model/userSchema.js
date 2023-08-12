// creating a schema for the user model..
// scheme is basically a blueprint in in which we store the date in format..

const mongoose = require("mongoose");

// Creating the user Schema
const userSchema = new mongoose.Schema(
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
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);
module.exports = User;
