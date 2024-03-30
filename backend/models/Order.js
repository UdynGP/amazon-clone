const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    paymentid: {
      type: String,
      required: true,
    },
    paymentstatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Awaiting Merchant Confirmation",
        "Successful",
        "Failure",
      ],
      required: true,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    orderstatus: {
      type: String,
      default: "Created",
      enum: ["Created", "Processing", "Shipped", "Delivered", "Cancelled"],
      required: true,
    },
    // deliverystatus: {
    //   type: String,
    //   default: "Not Delivered",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
