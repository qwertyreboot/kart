const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    payment: {
      id: {
        type: String,
      },
      status: {
        type: String,
        required: true,
        enum: ["pending", "failed", "success"],
        default: "pending",
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["ordered", "paid", "shipped", "delivered", "cancelled"],
      default: "ordered",
    },
  },
  { timestamps: true }
);

// TODO: add a pre hook to update the stock of the products

module.exports = mongoose.model("Order", orderSchema);
