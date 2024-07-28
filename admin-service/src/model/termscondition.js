// models/Category.js
const mongoose = require("mongoose");

const termsandconditionSchema = new mongoose.Schema({
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

const termsandcondition = mongoose.model("termsandcondition", termsandconditionSchema);

module.exports = termsandcondition;
