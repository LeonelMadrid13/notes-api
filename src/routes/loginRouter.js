// File: src/routes/loginRouter.js

import express from 'express';
import { loginUser } from '../controllers/loginController.js';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);

export default router;
