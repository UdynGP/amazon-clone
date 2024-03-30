const express = require("express");
const formidable = require("express-formidable");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createcategoryController,
  updatecategoryController,
  getcategoriesController,
  getcategoryController,
  deletecategoryController,
  getcategorypictureController,
} = require("../controllers/categoriesController");

// router object
const router = express.Router();

// Routing
// CREATE CATEGORY || METHOD=POST
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createcategoryController
);

// GET ALL CATEGORIES || METHOD=GET
router.get("/", getcategoriesController);

// GET SINGLE CATEGORY || METHOD=GET
router.get("/:slug", getcategoryController);

// GET CATEGORY PHOTO || METHOD=GET
router.get("/picture/:categoryid", getcategorypictureController);

// UPDATE CATEGORY || METHOD=PUT
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updatecategoryController
);

// DELETE CATEGORY || METHOD=DELETE
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deletecategoryController
);

module.exports = router;
