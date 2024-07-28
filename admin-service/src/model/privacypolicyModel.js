// models/Category.js
const mongoose = require("mongoose");

const privacypolicySchema = new mongoose.Schema({
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

const privacypolicy = mongoose.model("privacypolicy", privacypolicySchema);

module.exports = privacypolicy;
