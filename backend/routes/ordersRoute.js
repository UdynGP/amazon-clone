const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createorderController,
  getordersbyuserController,
  updateorderpaymentstatusController,
  updateorderprogressstatusController,
  deleteorderController,
} = require("../controllers/ordersController");

// router object
const router = express.Router();

// Routing
// CREATE ORDER || METHOD=POST
router.post("/create-order", requireSignIn, createorderController);
/*
// GET ALL ORDERS || METHOD=GET
router.get("/", getordersController);*/

// GET ALL ORDERS CREATED BY USER || METHOD=GET
router.get("/user/:id", getordersbyuserController);

// UPDATE ORDER PAYMENT STATUS || METHOD=PUT
router.put(
  "/payment/user/:userid/order/:orderid",
  requireSignIn,
  isAdmin,
  updateorderpaymentstatusController
);

// UPDATE ORDER PROGRESS STATUS || METHOD=PUT
router.put(
  "/order-progress/user/:userid/order/:orderid",
  requireSignIn,
  isAdmin,
  updateorderprogressstatusController
);

// DELETE CATEGORY || METHOD=DELETE
router.delete(
  "/delete-order/:id",
  requireSignIn,
  isAdmin,
  deleteorderController
);

module.exports = router;
