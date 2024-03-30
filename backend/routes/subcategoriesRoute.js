const express = require("express");
const formidable = require("express-formidable");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createsubcategoryController,
  getsubcategoriesController,
  getsubcategoryController,
  updatesubcategoryController,
  deletesubcategoryController,
  getsubcategoriesbycategoryController,
  getsubcategorypictureController,
} = require("../controllers/subcategoriesController");

// router object
const router = express.Router();

// Routing
// CREATE SUBCATEGORY || METHOD=POST
router.post(
  "/create-subcategory",
  requireSignIn,
  isAdmin,
  formidable(),
  createsubcategoryController
);

// GET ALL SUBCATEGORIES || METHOD=GET
router.get("/", getsubcategoriesController);

// GET ALL SUBCATEGORIES UNDER SINGLE CATEGORY || METHOD=GET
router.get("/category/:slug", getsubcategoriesbycategoryController);

// GET SINGLE SUBCATEGORY || METHOD=GET
router.get("/:slug", getsubcategoryController);

// GET SUBCATEGORY PHOTO || METHOD=GET
router.get("/picture/:subcategoryid", getsubcategorypictureController);

// UPDATE SUBCATEGORY || METHOD=PUT
router.put(
  "/update-subcategory/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updatesubcategoryController
);

// DELETE SUBCATEGORY || METHOD=DELETE
router.delete(
  "/delete-subcategory/:id",
  requireSignIn,
  isAdmin,
  deletesubcategoryController
);

module.exports = router;
