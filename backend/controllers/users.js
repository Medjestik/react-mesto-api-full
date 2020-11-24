const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (!data) {
        res
          .status(500)
          .send({ message: 'Internal Server Error' });
        return;
      }
      res
        .status(200)
        .send(data);
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Нет пользователя с таким id' });
      }
      return res
        .status(500)
        .send({ message: 'Internal Server Error' });
    });
};

module.exports.getUserByToken = (req, res) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Нет пользователя с таким id' });
      }
      return res
        .status(500)
        .send({ message: 'Internal Server Error' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res
            .status(200)
            .send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res
              .status(400)
              .send({ message: 'Некорректные данные' });
          }
          return res
            .status(500)
            .send({ message: 'Internal Server Error' });
        });
    });
};

module.exports.editProfile = (req, res) => {
  const {
    name, about,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name, about,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => {
      res
        .status(200)
        .send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Некорректные данные' });
      }
      return res
        .status(500)
        .send({ message: 'Internal Server Error' });
    });
};

module.exports.editAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => {
      res
        .status(200)
        .send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Некорректные данные' });
      }
      return res
        .status(500)
        .send({ message: 'Internal Server Error' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        TOKEN_SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
