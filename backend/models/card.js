const mongoose = require('mongoose');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/\S+/.test(value);
      },
      message: (props) => `${props.value} не корректная ссылка`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
