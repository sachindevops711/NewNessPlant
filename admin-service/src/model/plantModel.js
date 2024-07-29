// models/Plant.js
const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  categorie_name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  regular_price: {
    type: Number,
    required: false,
  },
  sale_price: {
    type: Number,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  stock: {
    type: Number,
    default: 0,
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: false,
  },
  image: {
    type: String,
    default: null,
  },
  video: {
    type: String,
    default: null,
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

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
