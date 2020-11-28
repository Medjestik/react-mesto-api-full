const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err.js');
const UnauthorizedError = require('../errors/unauthorized-error.js');
const ConflictError = require('../errors/conflict-request-err.js');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserByToken = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
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
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Пользователь с такой почтой уже есть в базе'));
          } else {
            next(err);
          }
        });
    });
};

module.exports.editProfile = (req, res, next) => {
  const {
    name, about,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name, about,
  }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.editAvatar = (req, res, next) => {
  const {
    avatar,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_TOKEN,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неверный email или пароль')));
};
