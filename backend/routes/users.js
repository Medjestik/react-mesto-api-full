const router = require('express').Router();

const {
  getUsers, getUserByToken, getUserById, editProfile, editAvatar,
} = require('../controllers/users');

router.get('/me', getUserByToken);
router.get('/', getUsers);

router.get('/:id', getUserById);
router.patch('/me', editProfile);
router.patch('/me/avatar', editAvatar);

module.exports = {
  router,
};
