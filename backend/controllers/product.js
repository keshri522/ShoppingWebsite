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
const readProduct = async (req, res) => {
  try {
    let products = await Product.find({});
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

// Export the function if needed
module.exports = { createProduct, readProduct };
