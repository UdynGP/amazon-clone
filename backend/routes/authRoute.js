const express = require("express");
const {
  registerController,
  loginController,
  resetPasswordController,
  getusersController,
  getuserController,
  updateuserController,
  deleteuserController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

// Routing
// REGISTER || METHOD=POST
router.post("/signup", registerController);

// LOGIN || METHOD=POST
router.post("/login", loginController);

// Forgot Password
router.post("/reset-password", resetPasswordController);

// Get users
router.get("/users", requireSignIn, isAdmin, getusersController);

// Get user
router.get("/user/:id", requireSignIn, getuserController);

// Update user details
router.put("/user/:id", requireSignIn, updateuserController);

// Delete user
router.delete("/user/:id", requireSignIn, isAdmin, deleteuserController);

/*
// Test Route
router.get("/test", requireSignIn, isAdmin, testController);*/

// Protected Auth Route for User
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
/*
// Protected Auth Route for Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
*/
module.exports = router;
