const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// const cartSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         product: {
//           type: ObjectId,
//           ref: "Product",
//         },
//         count: Number,
//         color: String,
//         price: Number,
//       },
//     ],

//     cartTotal: Number,
//     totalAfterDiscount: Number,
//     orderdBy: { type: ObjectId, ref: "User" },
//   },
//   { timestamps: true }
// );
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
        brand: String, // Add brand property
        shipping: String, // Add shipping property
      },
    ],

    cartTotal: Number,
    totalAfterDiscount: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
