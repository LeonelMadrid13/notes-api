import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'privatekey';

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // 🔍 Check if Authorization header is presen
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: No token provided',
        });
    }

    // 🪙 Extract token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: No token provided',
        });
    }

    // ✅ Verify token
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            const message =
                err.name === 'TokenExpiredError'
                    ? 'Token expired'
                    : 'Invalid token';

            return res.status(401).json({
                success: false,
                error: `Unauthorized: ${message}`,
            });
        }

        // 🧠 Attach decoded payload to req.user
        req.user = decoded;
        next();
    });
};

const isUserAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.user;

        if (isAdmin) {
            next(); // ✅ allow access
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
        }
    } catch (error) {
        handleError(res, error, 'Admin Check Error');
    }
};

export { checkToken, isUserAdmin };
