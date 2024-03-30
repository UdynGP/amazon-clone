const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

// Create order
const createorderController = async (req, res) => {
  try {
    const { products, paymentid, orderamount, useremail } = req.body;

    // Validations
    /*
    if (!paymentstatus) {
      return res.status(400).send({ message: "Payment Status is Required!" });
    }*/
    if (!useremail) {
      return res.status(400).send({ message: "Buyer email is Required!" });
    }

    if (!orderamount) {
      return res.status(400).send({ message: "Order Amount is Required!" });
    }

    // Check existing user
    const user = await User.findOne({ email: useremail });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist!",
      });
    }

    const userId = user._id;

    const order = new Order({
      products,
      paymentid,
      paymentstatus: paymentid ? "Successful" : "Pending",
      buyer: userId,
      amount: orderamount,
    });

    // Decrease product quantity by 1
    for (const product of products) {
      // console.log(product);
      const product_obj = await Product.findOne({ _id: product._id });
      if (product_obj && order.paymentstatus === "Successful") {
        product_obj.quantity -= 1;
        await product_obj.save();
      }
    }

    await order.save();
    res.status(201).send({
      success: true,
      message: "Order created Successfully!",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Order Creation",
      error,
    });
  }
};

/*
// Get All Orders
const getordersController = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).send({
      success: true,
      message: "All orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occured while Orders Display",
      error,
    });
  }
};
*/

// Get All Orders created by user
const getordersbyuserController = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User does not exist!",
      });
    }
    const userId = existingUser._id;

    const orders = await Order.find({ buyer: userId })
      .populate("products", "name description price")
      .populate("buyer", "name email");

    res.status(200).send({
      success: true,
      message: `All Orders created by ${existingUser.name}`,
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while Order display",
      error,
    });
  }
};

// Update Payment Status
const updateorderpaymentstatusController = async (req, res) => {
  try {
    const { paymentstatus } = req.body;
    const { userid, orderid } = req.params;

    const existingUser = await User.findById(userid);
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User does not exist!",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderid,
      {
        paymentstatus,
      },
      { new: true }
    );
    if (!order) {
      return res.status(400).send({
        success: false,
        message: "Order does not exist!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Payment status updated Successfully!",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Payment status updation",
      error,
    });
  }
};

// Update Payment Status
const updateorderprogressstatusController = async (req, res) => {
  try {
    const { orderstatus } = req.body;
    const { userid, orderid } = req.params;

    const existingUser = await User.findById(userid);
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User does not exist!",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderid,
      {
        orderstatus,
      },
      { new: true }
    );
    if (!order) {
      return res.status(400).send({
        success: false,
        message: "Order does not exist!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order progress updated Successfully!",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Order progress updation",
      error,
    });
  }
};

// Delete order
const deleteorderController = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `Order ${order._id} Deleted Successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured during Order deletion",
      error,
    });
  }
};

module.exports.createorderController = createorderController;
module.exports.getordersbyuserController = getordersbyuserController;
module.exports.updateorderpaymentstatusController =
  updateorderpaymentstatusController;
module.exports.updateorderprogressstatusController =
  updateorderprogressstatusController;
module.exports.deleteorderController = deleteorderController;
// module.exports.getordersController = getordersController;
