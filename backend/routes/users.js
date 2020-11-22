const router = require('express').Router();

const {
  getUsers, getUser, createUser, editProfile, editAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', editProfile);
router.patch('/me/avatar', editAvatar);

module.exports = {
  router,
};
