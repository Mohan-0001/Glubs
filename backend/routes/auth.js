const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// Optional alias route
// router.post('/signin', authController.login);

module.exports = router;
