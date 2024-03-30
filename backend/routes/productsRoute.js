const express = require("express");
const formidable = require("express-formidable");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createproductController,
  getproductsController,
  getproductsbycategoryController,
  getproductsbysubcategoryController,
  getproductController,
  getproductpictureController,
  updateproductController,
  deleteproductController,
  searchproductController,
} = require("../controllers/productsController");

// router object
const router = express.Router();

// Routing
// CREATE PRODUCT || METHOD=POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createproductController
);

// GET LATEST PRODUCTS || METHOD=GET
router.get("/", getproductsController);

// GET ALL PRODUCTS UNDER SINGLE CATEGORY || METHOD=GET
router.get("/category/:slug", getproductsbycategoryController);

// GET ALL PRODUCTS UNDER SINGLE SUBCATEGORY || METHOD=GET
router.get(
  "/category/:categorySlug/subcategory/:subcategorySlug",
  getproductsbysubcategoryController
);

// GET SINGLE PRODUCT || METHOD=GET
router.get("/:slug", getproductController);

// GET PRODUCT PHOTO || METHOD=GET
router.get("/picture/:pid", getproductpictureController);

// UPDATE PRODUCT || METHOD=PUT
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateproductController
);

// DELETE PRODUCT || METHOD=DELETE
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteproductController
);

// Search Products
router.get("/search/:keyword", searchproductController);

module.exports = router;
