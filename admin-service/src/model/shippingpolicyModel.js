// models/Category.js
const mongoose = require("mongoose");

const shippingpolicySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

const shippingpolicy = mongoose.model("shippingpolicy", shippingpolicySchema);

module.exports = shippingpolicy;
