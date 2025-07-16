// Add this to your auth routes
import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'privatekey';

const refreshTokenHandler = (req, res) => {
    console.log({req})
    const { refreshToken } = req.headers.cookie;

    if (!refreshToken) {
        return res.status(401).json({ success: false, error: 'No refresh token' });
    }

    // Verify refresh token
    jwt.verify(refreshToken, key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, error: 'Invalid or expired refresh token' });
        }

        // Optionally: check if the token is blacklisted/revoked in DB

        // Generate new access token (short expiry)
        const accessToken = jwt.sign(
            { id: decoded.id, isAdmin: decoded.isAdmin },
            key,
            { expiresIn: '1h' }
        );

        // Optionally: generate and set a new refresh token as well
        // const newRefreshToken = jwt.sign({ ... }, key, { expiresIn: '7d' });
        // res.cookie('refreshToken', newRefreshToken, { httpOnly: true, ... });
        res.cookie('authorization', accessToken, {
            httpOnly: true,
            secure: true,         // Use HTTPS in production!
            sameSite: 'none',     // Required for cross-domain
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.json({
            success: true,
            data: { message: 'Token refreshed successfully'},
        });
    });
};

export { refreshTokenHandler };