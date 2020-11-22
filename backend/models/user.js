const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/\S+/.test(value);
      },
      message: (props) => `${props.value} не корректная ссылка`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} не корректный email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
}, { versionKey: '_versionKey' });

module.exports = mongoose.model('user', userSchema);
