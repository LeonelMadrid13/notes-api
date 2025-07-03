import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { getUserByEmail } from '../controllers/userController.js';
import { handleError } from '../utils/handleError.js';



const key = process.env.JWT_SECRET || 'privatekey';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking if the user entered email and password
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await getUserByEmail(email);
        //checking to make sure the user entered the correct email/password combo
        if (user && await bcrypt.compare(password, user.password)) {
            //if user log in success, generate a JWT token for the user with a secret key
            jwt.sign({ user }, key, { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err) }
                res.send({ token, id: user.id });
            });
        } else {
            handleError(res, new Error('Invalid email or password'), 'Could not login user');
        }
    } catch (error) {
        handleError(res, error, 'Login User Error');
    }
}

const verifyToken = (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, key, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            handleError(res, err, 'Forbidden: Invalid token');
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    })
}

export {
    loginUser,
    verifyToken
};

