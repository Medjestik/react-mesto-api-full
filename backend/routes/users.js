const router = require('express').Router();

const {
  getUsers, getUserById, getUserByToken, editProfile, editAvatar,
} = require('../controllers/users');

router.get('/:id', getUserById);
router.get('/', getUsers);
router.get('/me', getUserByToken);
router.patch('/me', editProfile);
router.patch('/me/avatar', editAvatar);

module.exports = {
  router,
};
