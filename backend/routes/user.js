const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// GET all users
router.get('/', userController.showAllUsers);

// GET a single user by ID
router.get('/:id', userController.showUser);

// CREATE a new user
router.post('/', userController.createUser);

// UPDATE a user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

// OPTIONAL: Login form (mostly for frontend or admin panel, not needed for API)
router.get('/login', userController.showLoginForm);

module.exports = router;
