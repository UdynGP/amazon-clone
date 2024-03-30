const JWT = require("jsonwebtoken");
const User = require("../models/User");

// Protected Route from base
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

// Admin Access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access. You are not Admin User.",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error in Admin Middleware",
    });
  }
};

module.exports.requireSignIn = requireSignIn;
module.exports.isAdmin = isAdmin;
