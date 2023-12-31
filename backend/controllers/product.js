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
  let { count } = req.params;

  try {
    let products = await Product.find({})
      .populate("category") // this will give whole info of the category based on the id.
      .populate("Subcatergory")
      .limit(parseInt(count)) // this will set the limit based on the count.. give only products
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
// update the product s
const updateProducts = async (req, res) => {
  try {
    // if req.body.title is present we need to create the slug of the title
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const update = await Product.findOneAndUpdate(
      { slug: req.params.slug }, // here the slug come from req.params.slug not the body slug
      req.body, // update the enitre body based on the slug
      { new: true }
    );
    res.status(200).send(update);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
// this will give us the total number of products in the database ..
const TotalProducts = async (req, res) => {
  try {
    let items = await Product.find({}).count();

    if (items) {
      res.status(200).json(items);
    } else {
      res.status(404).json("No products found");
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
// using paginations
const PaginatioProduct = async (req, res) => {
  const { sort, order, page } = req.body;
  const perPage = 6; // shows a limit how many pages we want to show on client
  const currentPage = page || 1; // its show the product  if the current page===0 then skip will also zero ..
  const find = (currentPage - 1) * perPage;
  try {
    let pagination = await Product.find({})
      .skip(find)
      .populate("category")
      .populate("Subcatergory")
      .sort([[sort, order]])
      .limit(perPage);

    if (pagination) {
      res.status(200).json(pagination);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//  HELPER FUNCTION
const handleQuerySearch = async (req, res, query) => {
  try {
    let Search = await Product.find({ $text: { $search: query } })
      .populate("category")
      .populate("Subcatergory");
    res.status(200).json(Search);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// helper function for the category
const FindCategory = async (req, res, category) => {
  try {
    console.log(category);
    let products = await Product.find({ category: category });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// helper function for the Price
const handlePrice = async (req, res, price) => {
  console.log("Price is ", price);
  try {
    let products = await Product.find({
      price: { $gte: price[0], $lte: price[1] },
    })
      .populate("category")
      .populate("Subcatergory");

    if (price) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// HELPER FUNCTION FOR  SUBCATEGORY

const handleSubcatergory = async (req, res, Subcatergory) => {
  console.log(Subcatergory);
  try {
    let Subcategories = await Product.find({ Subcatergory: Subcatergory })
      .populate("category")
      .populate("Subcatergory");
    if (Subcategories) {
      res.status(200).json(Subcategories);
    } else {
      res.status(404).json("No Subcatergory found ");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
// this function will return all the brand based on the brand
const handlebrand = async (req, res, brand) => {
  try {
    let brands = await Product.find({ brand: brand })
      .populate("category")
      .populate("Subcatergory");
    if (brands) {
      res.status(200).send(brands);
    } else {
      res.status(404).send("No products found for this brand");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
// this will give the product based on the color coming in the body
const handleColor = async (req, res, color) => {
  try {
    let colors = await Product.find({ color: color })
      .populate("category")
      .populate("Subcatergory");
    if (colors) {
      res.status(200).send(colors);
      // console.log(colors);
    } else {
      res.status(404).send("No products found for this colors");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
// FILTERING AND SEARCHING OF PRODUCTS
const searchProducts = async (req, res) => {
  const { query, price, category, Subcatergory, brand, color } = req.body; // based on the data user send from fronted it may color ,category ,brand
  // i need to create helper funtin based on th req.body..

  if (query) {
    await handleQuerySearch(req, res, query);
  }
  // if price is coming in body in the form of array
  if (price !== undefined) {
    await handlePrice(req, res, price);
  }
  // this is for the category by search
  if (category) {
    await FindCategory(req, res, category);
  }
  // this is for the subcategory
  if (Subcatergory) {
    await handleSubcatergory(req, res, Subcatergory);
  }
  // this is for the brand filtering
  if (brand) {
    await handlebrand(req, res, brand);
  }
  if (color) {
    await handleColor(req, res, color);
  }
};
// this is for the user controllers

// Export the function if needed
module.exports = {
  createProduct,
  listallProduct,
  deleteProducts,
  getSingleproduct,
  updateProducts,
  TotalProducts,
  PaginatioProduct,
  searchProducts,
};
