const Product = require("../model/product");
const slugify = require("slugify");

// create api or function which will save all the coming from frontend

const createProduct = async (req, res) => {
  try {
    // console.log(req, body);
    // we need to create the slug that is coming from frotend using req.body
    req.body.slug = slugify(req.body.title); // creating new slug based on the title coming from client side
    const productSave = await new Product(req.body);
    productSave.save();
    res.status(200).json(productSave);
  } catch (error) {
    console.log(error);
    res.status(400).json("Product not saved some error occurs");
  }
};
export default createProduct;
