import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { getUserByEmail } from '../controllers/userController.js';
import { handleError } from '../utils/handleError.js';

const key = process.env.JWT_SECRET || 'privatekey';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, error: 'Email and password are required' });
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ success: false, error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ success: false, error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            key,
            { expiresIn: '1h' }
        );


        const { id, name, email: userEmail, isAdmin } = user;

        return res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id,
                    name,
                    email: userEmail,
                    isAdmin,
                },
            },
        });
    } catch (error) {
        handleError(res, error, 'Login User Error');
    }
};

export {
    loginUser
};

