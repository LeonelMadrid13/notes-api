import { getPrismaClient } from '../lib/prisma.js';
import { handleError } from '../utils/handleError.js';


const getAllUsers = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, isAdmin: true },
        });
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error, 'Get All Users Error');
    }
};


const isUserAdmin = async (req, res, next) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        if (user && user.role === 'ADMIN') {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
        }
    } catch (error) {
        handleError(res, error, 'Admin Check Error');
    }
}

export {
    getAllUsers,
    isUserAdmin
};