// models/Plant.js
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
