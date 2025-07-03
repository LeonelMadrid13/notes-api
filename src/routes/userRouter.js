// File: src/routes/userRouter.js

const express = require('express');
const { getUserById, updateUser, deleteUser } = require('../controllers/userController.js');
const { getAllUsers, isUserAdmin } = require('../controllers/adminController.js');
const { checkToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(checkToken);

// Get all users (admin only)
router.get('/', isUserAdmin, getAllUsers);

// Get, update, or delete a user by ID
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;