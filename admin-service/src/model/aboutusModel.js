// models/Category.js
const mongoose = require("mongoose");

const aboutusSchema = new mongoose.Schema({
  description: {
    type: String,
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

const aboutus = mongoose.model("aboutus", aboutusSchema);

module.exports = aboutus;
