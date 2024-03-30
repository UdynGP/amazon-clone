const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const JWT = require("jsonwebtoken");

// Register
const registerController = async (req, res) => {
  try {
    const { name, email, password, cpassword, contact, address, secretanswer } =
      req.body;
    // Validations
    if (!name) {
      return res.send({ message: "Name is Required!" });
    }
    if (!email) {
      return res.send({ message: "Email is Required!" });
    }
    if (!password) {
      return res.send({ message: "Password is Required!" });
    }
    if (!cpassword) {
      return res.send({ message: "Confirm Password is Required!" });
    }
    if (!contact) {
      return res.send({ message: "Contact is Required!" });
    }
    if (!address) {
      return res.send({ message: "Address is Required!" });
    }
    if (!secretanswer) {
      return res.send({ message: "Secret Answer is Required!" });
    }

    // Check Password length is atleast 6 characters
    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Length of Password should be atleast 6 characters!!",
      });
    }

    // Check Password and Confirm Password same or not
    if (password !== cpassword) {
      return res.status(401).send({
        success: false,
        message: "Password and Confirm Password fields do not match!!",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already registered!",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      contact,
      address,
      password: hashedPassword,
      secretanswer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully!",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Registration",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user
    const user = await User.findOne({ email });

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registered!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password!",
      });
    }
    // token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
        role: user.role,
      },
      message: `Welcome ${user.name}`,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Login",
      error,
    });
  }
};

// resetPasswordController
const resetPasswordController = async (req, res) => {
  try {
    const { email, secretanswer, newpassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is required!",
      });
    }
    if (!secretanswer) {
      res.status(400).send({
        message: "Secret Answer is required!",
      });
    }
    if (!newpassword) {
      res.status(400).send({
        message: "New Password is required!",
      });
    }
    if (newpassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Length of Password should be atleast 6 characters!!",
      });
    }

    // Check email
    const user = await User.findOne({ email, secretanswer });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email/Answer!",
      });
    }
    const hashedPassword = await hashPassword(newpassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Get Users
const getusersController = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Users Display",
      error,
    });
  }
};

// Get User
const getuserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send({
      success: true,
      message: "User Details",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while User Display",
      error,
    });
  }
};

// Update user details
const updateuserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, address, secretanswer } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        contact,
        address,
        secretanswer,
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist!",
      });
    }

    res.status(201).send({
      success: true,
      message: "User Updated Successfully!",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during User details Updation",
      error,
    });
  }
};

// Delete user
const deleteuserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `User ${user._id} Deleted Successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Order deletion",
      error,
    });
  }
};

/*
// Test Controller for Admin Privileges
const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    res.send({ error });
  }
};*/

module.exports.registerController = registerController;
module.exports.loginController = loginController;
module.exports.resetPasswordController = resetPasswordController;
module.exports.getusersController = getusersController;
module.exports.getuserController = getuserController;
module.exports.updateuserController = updateuserController;
module.exports.deleteuserController = deleteuserController;
// module.exports.testController = testController;
