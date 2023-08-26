// modals
const Product = require("../model/product");
const Cart = require("../model/cart");
const User = require("../model/userSchema");

const userCart = async (req, res) => {
  try {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email });

    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id });

    if (cartExistByThisUser) {
      await cartExistByThisUser.deleteOne();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;

      let { price } = await Product.findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = price;

      products.push(object);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();
    if (newCart) {
      res.json({ ok: true });
    } else {
      res.json("card not saved");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
};
// this is for getting all the cart item

const getuserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price totalAfterDiscount")
      .exec();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const removeusercart = async (req, res) => {
  console.log(req.user.email);
  try {
    const user = await User.findOne({ email: req.user.email });

    if (user) {
      const cart = await Cart.findOneAndRemove({ orderdBy: user._id });

      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json("Cart not found");
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { getuserCart, userCart, removeusercart };
