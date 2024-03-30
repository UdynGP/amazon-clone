const slugify = require("slugify");
const fs = require("fs");
const dotenv = require("dotenv");
const Category = require("../models/Category");

dotenv.config();

// Create Category
const createcategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { picture } = req.files;

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Category name is Required!" });
    }

    // Check existing category
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category already exists!",
      });
    }

    // Create category
    const category = new Category({
      name,
      slug: slugify(name),
    });

    if (picture) {
      category.picture.data = fs.readFileSync(picture.path);
      category.picture.contentType = picture.type;
    }

    await category.save();
    res.status(201).send({
      success: true,
      message: "Category created Successfully!",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Category creation",
      error,
    });
  }
};

// Get All Categories
const getcategoriesController = async (req, res) => {
  try {
    const categories = await Category.find({}).select("-picture");

    res.status(200).send({
      success: true,
      message: "All Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Categories Display",
      error,
    });
  }
};

// Get Category
const getcategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).select(
      "-picture"
    );

    res.status(200).send({
      success: true,
      message: "Current category",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Category Display",
      error,
    });
  }
};

// Get Category Picture
const getcategorypictureController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryid).select(
      "picture"
    );
    if (category.picture.data) {
      res.set("Content-type", category.picture.contentType);
      return res.status(200).send(category.picture.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Category picture display",
      error,
    });
  }
};

// Update Category
const updatecategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { picture } = req.files;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    if (picture) {
      category.picture.data = fs.readFileSync(picture.path);
      category.picture.contentType = picture.type;
    }

    await category.save();
    res.status(200).send({
      success: true,
      message: "Category updated Successfully!",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Category updation",
      error: error,
    });
  }
};

// Delete Category
const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `${category.name} category deleted Successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Category deletion",
      error,
    });
  }
};

module.exports.createcategoryController = createcategoryController;
module.exports.getcategoriesController = getcategoriesController;
module.exports.getcategoryController = getcategoryController;
module.exports.getcategorypictureController = getcategorypictureController;
module.exports.updatecategoryController = updatecategoryController;
module.exports.deletecategoryController = deletecategoryController;
