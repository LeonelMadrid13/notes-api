// File: src/routes/loginRouter.js

import express from 'express';
import { loginUser, verifyToken } from '../controllers/loginController.js';
import { createUser } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);
//This is a protected route 
router.get('/data', checkToken, verifyToken);

export default router;
