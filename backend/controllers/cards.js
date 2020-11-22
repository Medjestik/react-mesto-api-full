const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
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

module.exports.createCard = (req, res) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => {
      if (!card) {
        res
          .status(500)
          .send({ message: 'Internal Server Error' });
        return;
      }
      res
        .status(200)
        .send(card);
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      res
        .status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Нет карточки с таким id' });
      }
      return res
        .status(500)
        .send({ message: 'Internal Server Error' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    res
      .status(200)
      .send({ data: card });
  })
  .catch((err) => {
    console.log(err.name);
    return res
      .status(500)
      .send({ message: 'Internal Server Error' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    res
      .status(200)
      .send({ data: card });
  })
  .catch((err) => {
    console.log(err.name);
    return res
      .status(500)
      .send({ message: 'Internal Server Error' });
  });
