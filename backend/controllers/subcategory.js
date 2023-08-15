// import catergory modal first
const Subategory = require("../model/subcategory");
// import slugigy ..
const slugify = require("slugify"); // it will create automatic slugs based on req.body data
const create = async (req, res) => {
  try {
    const { name, parent } = req.body;

    // create new category
    const subcategory = await new Subategory({
      name: name,
      parent: parent,
      slug: slugify(name),
    });
    // save the category
    const savedCategory = await subcategory.save();
    res.status(200).json(savedCategory); // send as response to frontedn
  } catch (error) {
    // console.log(error)
    res.status(400).send("Creating subcategory failed"); // based on the code we can show the error in the frontend
  }
};

const read = async (req, res) => {
  try {
    // note here slug is coming from frontend like req.params.slug in slug we send the category from frontend
    const findOne = await Subategory.findOne({ slug: req.params.slug });
    if (findOne) {
      res.status(200).send(findOne);
    } else {
      throw new Error("subcategory not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Subcategory not found");
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = await Subategory.findOneAndDelete({
      slug: req.params.slug,
    });
    // added some condtions
    if (Deleted) {
      res.status(200).send(Deleted);
    } else {
      throw new Error("Subcategory not found"); // Throw an error if no document is found
    }
  } catch (error) {
    res.status(400).json("Subcategory not found"); // Send "Category not found" message as response
  }
};

const list = async (req, res) => {
  try {
    const Findall = await Subategory.find({}).sort({ createdAt: -1 }); // it will sort baed on current cateegory
    res.status(200).json(Findall);
  } catch (error) {
    res.status(400).json("Subcatagory not found");
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;

    // Update the category name and slug using findOneAndUpdate
    const updatedSubcategory = await Subategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true } // Return the updated document
    );

    if (!updatedSubcategory) {
      throw new Error("Subcategory not found");
    }
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(400).send("Subcategory not found");
  }
};

// export as a names ..
module.exports = { create, update, read, list, remove };
