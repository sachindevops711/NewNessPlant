const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  refresh_token:{
    type: String,
    required: false
  },
  is_deleted:{
    type: Boolean,
    default: false,
    required: false
  },
  reset_password_token:{
    type: String,
    required: false
  },
  reset_password_expires:{
    type: Date,
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

// Before saving the user document, hash the password if it's modified
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
