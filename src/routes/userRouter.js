// File: src/routes/userRouter.js

import express from 'express';
import { getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { getAllUsers, isUserAdmin } from '../controllers/adminController.js';
import { checkToken } from '../middlewares/authMiddleware.js';
import { requireSelfOrAdmin } from '../middlewares/requireSelfOrAdmin.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(checkToken);

// Get all users (admin only)
router.get('/', isUserAdmin, getAllUsers);

// Get, update, or delete a user by ID
router.get('/:id', requireSelfOrAdmin, getUserById);
router.put('/:id', requireSelfOrAdmin, updateUser);
router.delete('/:id', requireSelfOrAdmin, deleteUser);

export default router;