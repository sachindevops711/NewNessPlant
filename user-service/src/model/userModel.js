const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: false
  },
  last_name: {
    type: String,
    default: null,
    trim: true,
    required: false
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: false
  },
  number: {
    type: Number,
    default: null,
    required: false
  },
  profile_image: {
    type: String,
    default: null,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  refreshToken:{
    type: String,
    required: false
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

const user = mongoose.model("user", userSchema);

module.exports = user;
