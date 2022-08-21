const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
      type: Boolean,
      default: false,
  }
});

module.exports = mongoose.model('user', userSchema);