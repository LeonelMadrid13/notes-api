import express from 'express';
import { loginUser, verifyToken } from '../controllers/loginController.js';
import { checkToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);

//This is a protected route 
router.get('/data', checkToken, verifyToken);

export default router;
