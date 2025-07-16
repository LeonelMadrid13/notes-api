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

        const [token, refreshToken] = await Promise.all([
            jwt.sign({ id: user.id, isAdmin: user.isAdmin }, key, { expiresIn: '1h' }),
            jwt.sign({ id: user.id, isAdmin: user.isAdmin }, key, { expiresIn: '7d' }),
        ]);

        const { id, name, email: userEmail, isAdmin } = user;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,         // Use HTTPS in production!
            sameSite: 'lax',     // Required for cross-domain
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,         // Use HTTPS in production!
            sameSite: 'lax',     // Required for cross-domain
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.cookie('id', id, {
            httpOnly: true,
            secure: false,         // Use HTTPS in production! -> change to true for production
            sameSite: 'lax'     // Required for cross-domain
        });

        return res.status(200).json({
            success: true,
            data: {
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

