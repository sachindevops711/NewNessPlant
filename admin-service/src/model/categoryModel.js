// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: null,
    required: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: false,
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

const category = mongoose.model("category", categorySchema);

module.exports = category;
