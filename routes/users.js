const router = require('express').Router();
const { userUpdateValidation } = require('../middlewares/validationJoi');

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', userUpdateValidation, updateProfile);

module.exports = router;
