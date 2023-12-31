// import catergory modal first
const Category = require("../model/category");
const Subcategory = require("../model/subcategory");
const Product = require("../model/product");
// import slugigy ..
const slugify = require("slugify"); // it will create automatic slugs based on req.body data
const create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    // create new category
    const category = await new Category({ name: name, slug: slugify(name) });
    // save the category
    const savedCategory = await category.save();
    res.status(200).json(savedCategory); // send as response to frontedn
  } catch (error) {
    // console.log(error)
    res.status(400).send("Creating category failed"); // based on the code we can show the error in the frontend
  }
};

const read = async (req, res) => {
  try {
    // note here slug is coming from frontend like req.params.slug in slug we send the category from frontend
    const findOne = await Category.findOne({ slug: req.params.slug });
    if (findOne) {
      // res.status(200).send(findOne);
      const products = await Product.find({ category: findOne._id }).populate(
        "category"
      );
      res.status(200).json({
        category: findOne,
        products: products,
      });
      // console.log(products);
    } else {
      throw new Error("category not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Category not found");
  }
};

const remove = async (req, res) => {
  try {
    console.log(req.params.slug);
    const Deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    // added some condtions
    if (Deleted) {
      res.status(200).send(Deleted);
    } else {
      throw new Error("Category not found"); // Throw an error if no document is found
    }
  } catch (error) {
    res.status(400).json("Category not found"); // Send "Category not found" message as response
  }
};

const list = async (req, res) => {
  try {
    const Findall = await Category.find({}).sort({ createdAt: -1 }); // it will sort baed on current cateegory
    res.status(200).json(Findall);
  } catch (error) {
    res.status(400).json("Catagory not found");
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;

    // Update the category name and slug using findOneAndUpdate
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      console.log("not found");
      throw new Error("Category not found");
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).send("Category not found");
  }
};

const getSubcatecory = async (req, res) => {
  // find the id coming from the in params in subcategory collections..
  try {
    let subs = await Subcategory.find({ parent: req.params._Id });
    if (subs) {
      res.status(200).send(subs);
    } else {
      res.status(404).json("No subcategory founds");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// export as a names ..
module.exports = { create, update, read, list, remove, getSubcatecory };
