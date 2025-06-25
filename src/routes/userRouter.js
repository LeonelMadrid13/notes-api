import express from 'express';
import { createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { getAllUsers, isUserAdmin } from '../controllers/adminController.js';
import { checkToken } from '../controllers/loginController.js';

const router = express.Router();

// Route to create a new user
router.post('/', createUser);
router.get('/', checkToken, isUserAdmin, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;