// models/Category.js
const mongoose = require("mongoose");

const contactusSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
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

const contactus = mongoose.model("contactus", contactusSchema);

module.exports = contactus;
