const slugify = require("slugify");
const fs = require("fs");
const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// Create Subcategory
const createsubcategoryController = async (req, res) => {
  try {
    const { name, categoryname } = req.fields;
    const { picture } = req.files;

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Subcategory name is Required!" });
    }
    if (!categoryname) {
      return res.status(400).send({ message: "Category name is Required!" });
    }

    // Check existing category
    const existingCategory = await Category.findOne({ name: categoryname });
    if (!existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category does not exist!",
      });
    }
    const categoryId = existingCategory._id;

    // Check existing subcategory
    const existingsubcategory = await Subcategory.findOne({
      name,
      category: categoryId,
    }).populate("category");
    if (existingsubcategory) {
      return res.status(400).send({
        success: false,
        message: `${existingsubcategory.name} subcategory already exists under ${existingsubcategory.category.name} category`,
      });
    }

    // Create Subcategory
    const subcategory = new Subcategory({
      name,
      slug: slugify(name),
      category: categoryId,
    });

    if (picture) {
      subcategory.picture.data = fs.readFileSync(picture.path);
      subcategory.picture.contentType = picture.type;
    }

    await subcategory.save();
    res.status(201).send({
      success: true,
      message: "Subcategory created Successfully!",
      subcategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Subcategory creation",
      error,
    });
  }
};

// Get All Subcategories
const getsubcategoriesController = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({});

    res.status(200).send({
      success: true,
      message: "All Subcategories",
      subcategories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Subcategories Display",
      error,
    });
  }
};

// Get All Subcategories under single Category
const getsubcategoriesbycategoryController = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ slug: req.params.slug });
    if (!existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category does not exist!",
      });
    }
    const categoryId = existingCategory._id;

    const subcategories = await Subcategory.find({ category: categoryId });

    res.status(200).send({
      success: true,
      message: `All Subcategories under ${existingCategory.name}`,
      subcategories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Subcategory display",
      error,
    });
  }
};

// Get Subcategory
const getsubcategoryController = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({
      slug: req.params.slug,
    });

    if (!subcategory) {
      return res.status(400).send({
        success: false,
        message: "Subcategory does not exist!",
      });
    }

    const parentCategory = await Category.findById(subcategory.category);
    res.status(200).send({
      success: true,
      message: "Current Subcategory",
      parentCategory: parentCategory.name,
      subcategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Subcategory display",
      error,
    });
  }
};

// Get Subcategory Picture
const getsubcategorypictureController = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(
      req.params.subcategoryid
    ).select("picture");
    if (subcategory.picture.data) {
      res.set("Content-type", subcategory.picture.contentType);
      return res.status(200).send(subcategory.picture.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Product picture display",
      error,
    });
  }
};

// Update Subcategory
const updatesubcategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { picture } = req.files;
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    if (picture) {
      subcategory.picture.data = fs.readFileSync(picture.path);
      subcategory.picture.contentType = picture.type;
    }

    await subcategory.save();
    res.status(200).send({
      success: true,
      message: "Subcategory updated Successfully!",
      subcategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Subcategory updation",
      error,
    });
  }
};

// Delete Category
const deletesubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `${subcategory.name} category deleted Successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Subcategory deletion",
      error,
    });
  }
};

module.exports.createsubcategoryController = createsubcategoryController;
module.exports.getsubcategoriesController = getsubcategoriesController;
module.exports.getsubcategoriesbycategoryController =
  getsubcategoriesbycategoryController;
module.exports.getsubcategoryController = getsubcategoryController;
module.exports.getsubcategorypictureController =
  getsubcategorypictureController;
module.exports.updatesubcategoryController = updatesubcategoryController;
module.exports.deletesubcategoryController = deletesubcategoryController;
