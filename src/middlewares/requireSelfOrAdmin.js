// src/middlewares/requireSelfOrAdmin.js
export function requireSelfOrAdmin(req, res, next) {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.isAdmin;

    if (userId === id || isAdmin) {
        return next();
    }

    return res.status(403).json({ error: 'Forbidden: Not authorized' });
}