const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');
const validateSignup = require('../middlewares/authValidator');
const errorHandler = require('../middlewares/errorMiddleware');

router.post('/signup', validateSignup, errorHandler, signup);
router.post('/login', login);

module.exports = router;