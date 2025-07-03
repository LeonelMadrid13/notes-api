// File: src/routes/loginRouter.js

const express = require('express');
const { loginUser, verifyToken } = require('../controllers/loginController.js');
const { createUser } = require('../controllers/userController.js');
const { checkToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);
//This is a protected route 
router.get('/data', checkToken, verifyToken);

module.exports = router;
