import express from 'express';
import { loginUser, verifyToken, checkToken } from '../controllers/loginController.js';

const router = express.Router();

router.post('/login', loginUser);

//This is a protected route 
router.get('/data', checkToken, verifyToken);

export default router;
