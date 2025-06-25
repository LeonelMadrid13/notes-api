import express from 'express';
import { createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { getAllUsers, isUserAdmin } from '../controllers/adminController.js';
import { checkToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new user
router.post('/', createUser);
router.get('/', checkToken, isUserAdmin, getAllUsers);
router.get('/:id', checkToken, getUserById);
router.put('/:id', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);

export default router;