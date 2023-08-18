const e = require("express");
const Product = require("../model/product");
const slugify = require("slugify");

// create api or function which will save all the coming from frontend

// const createProduct = async (req, res) => {
//   try {
//     // console.log(req, body);
//     // we need to create the slug that is coming from frotend using req.body
//     req.body.slug = slugify(req.body.title); // creating new slug based on the title coming from client side
//     let productSave = await new Product(req.body);
//     productSave.save();
//     res.status(200).json(productSave);
//   } catch (error) {
//     console.log(error);
//     // res.status(400).send("Title already present please change.");
//     res.status(400).json({
//       err: error.message,
//     });
//   }
// };
const createProduct = async (req, res) => {
  try {
    const title = req.body.title;
    const slug = slugify(title); // create a new slug based on the title

    // Check if a product with the same slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({
        error: "Product with the same title already exists.",
      });
    }

    // Create a new Product instance and save it
    const product = await new Product({ ...req.body, slug });
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};
// for the products to get request showing all the products ...
const listallProduct = async (req, res) => {
  let { count } = req.body;
  try {
    let products = await Product.find({})
      .limit(parseInt(count)) // this will set the limit based on the count.. give only products
      .populate("category") // this will give whole info of the category based on the id.
      .populate("Subcatergory") // this will give us whole info of Subcatergory based on the id
      .sort({ createdAt: -1 });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json("No products found");
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
// deleting a products form admin ..
const deleteProducts = async (req, res) => {
  // console.log(req.params.slug);
  try {
    let Deleteitem = await Product.findOneAndRemove({ _id: req.params.slug });
    if (Deleteitem) {
      // console.log("Item removed");
    }
    // fetching all the products except the deleted one.
    const FetchProducts = await Product.find({ _id: { $ne: req.params.slug } });
    if (FetchProducts) {
      res.status(200).json(FetchProducts);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send("Failed to delete products");
  }
};

// creating single product it return the product based on the slug ..
const getSingleproduct = async (req, res) => {
  try {
    let { slug } = req.params; // using destructing  method
    // need to find in Product collection
    let product = await Product.find({ slug: slug })
      .populate("Subcatergory")
      .populate("category");
    if (product) {
      // console.log(product);
      res.status(200).send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
// Export the function if needed
module.exports = {
  createProduct,
  listallProduct,
  deleteProducts,
  getSingleproduct,
};
