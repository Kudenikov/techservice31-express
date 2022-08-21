const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2000,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/.test(v);
      },
      message: 'Введена невалидная ссылка!',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);