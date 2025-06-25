import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../controllers/userController.js';


const key = process.env.JWT_SECRET || 'privatekey';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        //checking to make sure the user entered the correct email/password combo
        if (password === user.password) {
            //if user log in success, generate a JWT token for the user with a secret key
            jwt.sign({ user }, key, { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err) }
                res.send(token);
            });
        } else {
            console.log('ERROR: Could not log in');
        }
    } catch (error) {
        console.error('ERROR: An error occurred while logging in', error);
    }
}

export const verifyToken = (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, key, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
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

