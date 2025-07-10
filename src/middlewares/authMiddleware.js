import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'privatekey';

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(403).json({ success: false, error: 'No token provided' });
    }

    const bearer = header.split(' ');
    const token = bearer[1];

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, error: 'Invalid token' });
        }

        // ✅ Attach user info to req.user
        req.user = decoded;
        next();
    });
};

export { checkToken };
