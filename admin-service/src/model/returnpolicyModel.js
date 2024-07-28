// models/Category.js
const mongoose = require("mongoose");

const returnpolicySchema = new mongoose.Schema({
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

const returnpolicy = mongoose.model("returnpolicy", returnpolicySchema);

module.exports = returnpolicy;
