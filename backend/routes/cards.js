const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateAddCard, validateCardId } = require('../middlewares/validation.js');

router.get('/', getCards);
router.post('/', validateAddCard, createCard);
router.delete('/:id', validateCardId, deleteCard);
router.put('/:id/likes', validateCardId, likeCard);
router.delete('/:id/likes', validateCardId, dislikeCard);

module.exports = {
  router,
};
