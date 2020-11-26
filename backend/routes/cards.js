const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateAddCard } = require('../middlewares/validation.js');

router.get('/', getCards);
router.post('/', validateAddCard, createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = {
  router,
};
