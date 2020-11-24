const router = require('express').Router();

const {
  getUserByToken, getUserById, editProfile, editAvatar,
} = require('../controllers/users');

router.get('/me', getUserByToken);
router.get('/:id', getUserById);
router.patch('/me', editProfile);
router.patch('/me/avatar', editAvatar);

module.exports = {
  router,
};
