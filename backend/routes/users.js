const router = require('express').Router();

const {
  getUsers, getUserByToken, getUserById, editProfile, editAvatar,
} = require('../controllers/users');

const { validateUserInfo, validateAvatar } = require('../middlewares/validation.js');

router.get('/', getUsers);
router.get('/me', getUserByToken);
router.get('/:id', getUserById);
router.patch('/me', validateUserInfo, editProfile);
router.patch('/me/avatar', validateAvatar, editAvatar);

module.exports = {
  router,
};
