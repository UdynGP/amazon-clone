const slugify = require("slugify");
const fs = require("fs");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

dotenv.config();

// Create Product
const createproductController = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, quantity } =
      req.fields;
    const { picture } = req.files;

    // Switch
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required",
        });
      case !description:
        return res.status(500).send({
          error: "Description is Required",
        });
      case !price:
        return res.status(500).send({
          error: "Price is Required",
        });
      case !category:
        return res.status(500).send({
          error: "Category is Required",
        });
      case !subcategory:
        return res.status(500).send({
          error: "Subcategory is Required",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is Required",
        });
      case !picture || picture.size > 1000000:
        return res.status(500).send({
          error: "Picture is required. Size should be less than 1MB.",
        });
      default:
        break;
    }

    // Check existing category
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category does not exist!",
      });
    }
    // Check existing subcategory
    const existingSubcategory = await Subcategory.findOne({
      name: subcategory,
    });
    if (!existingSubcategory) {
      return res.status(400).send({
        success: false,
        message: "Subcategory does not exist!",
      });
    }
    const categoryId = existingCategory._id;
    const subcategoryId = existingSubcategory._id;

    const product = new Product({
      ...req.fields,
      slug: slugify(name),
      category: categoryId,
      subcategory: subcategoryId,
    });
    if (picture) {
      product.picture.data = fs.readFileSync(picture.path);
      product.picture.contentType = picture.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully!",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Product creation",
      error,
    });
  }
};

// Get Latest Products
const getproductsController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category", "name")
      .populate("subcategory", "name")
      .select("-picture")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Products Display",
      error,
    });
  }
};

// Get All Products under single Category
const getproductsbycategoryController = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ slug: req.params.slug });
    if (!existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category does not exist!",
      });
    }
    const categoryId = existingCategory._id;

    const products = await Product.find({ category: categoryId })
      .populate("category")
      .populate("subcategory")
      .select("-picture")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: `All Products under ${existingCategory.name} category`,
      totalCount: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Products display",
      error,
    });
  }
};

// Get All Products under single Subcategory
const getproductsbysubcategoryController = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      slug: req.params.categorySlug,
    });
    if (!existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category does not exist!",
      });
    }
    const categoryId = existingCategory._id;

    const existingSubcategory = await Subcategory.findOne({
      slug: req.params.subcategorySlug,
      category: categoryId,
    });
    if (!existingSubcategory) {
      return res.status(400).send({
        success: false,
        message: "Subcategory does not exist!",
      });
    }
    const subcategoryId = existingSubcategory._id;

    const products = await Product.find({
      category: categoryId,
      subcategory: subcategoryId,
    })
      .populate("category")
      .populate("subcategory")
      .select("-picture")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: `All products under ${existingCategory.name} category and ${existingSubcategory.name} subcategory`,
      totalCount: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Products display",
      error,
    });
  }
};

// Get Product
const getproductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subcategory")
      .select("-picture")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Current product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Product Display",
      error,
    });
  }
};

// Get Product Picture
const getproductpictureController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("picture");
    if (product.picture.data) {
      res.set("Content-type", product.picture.contentType);
      return res.status(200).send(product.picture.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Product picture display",
      error,
    });
  }
};

// Update Product
const updateproductController = async (req, res) => {
  // console.log(req);
  try {
    const { name, description, price, category, subcategory, quantity } =
      req.fields;
    const { picture } = req.files;
    const { id } = req.params;

    // Check existing category
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category does not exist!",
      });
    }

    // Check existing subcategory
    const existingSubcategory = await Subcategory.findOne({
      name: subcategory,
    });
    if (!existingSubcategory) {
      return res.status(400).send({
        success: false,
        message: "Subcategory does not exist!",
      });
    }
    const categoryId = existingCategory._id;
    const subcategoryId = existingSubcategory._id;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...req.fields,
        slug: slugify(name),
        category: categoryId,
        subcategory: subcategoryId,
      },
      { new: true }
    );
    if (picture) {
      product.picture.data = fs.readFileSync(picture.path);
      product.picture.contentType = picture.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated Successfully!",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Product updation",
      error: error.message.data,
    });
  }
};

// Delete Product
const deleteproductController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `${product.name} product Deleted Successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Product deletion",
      error,
    });
  }
};

// Search Products
const searchproductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-picture");
    res.json(results);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in Search Product API",
      error,
    });
  }
};

module.exports.createproductController = createproductController;
module.exports.getproductsController = getproductsController;
module.exports.getproductController = getproductController;
module.exports.getproductpictureController = getproductpictureController;
module.exports.getproductsbycategoryController =
  getproductsbycategoryController;
module.exports.getproductsbysubcategoryController =
  getproductsbysubcategoryController;
module.exports.updateproductController = updateproductController;
module.exports.deleteproductController = deleteproductController;
module.exports.searchproductController = searchproductController;
