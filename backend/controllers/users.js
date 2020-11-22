const bcrypt = require('bcryptjs');
const User = require('../models/user');

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

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
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
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about,
        avatar: req.body.avatar,
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
