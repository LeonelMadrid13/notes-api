import { PrismaClient } from '../generated/prisma/index.js'
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient()

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(200).json(allUsers);
    } catch (error) {
        new handleError(res, error, 'Get All Users Error');
    }
}

// check if the user is an admin
export const isUserAdmin = async (req, res, next) => {
    try {
        const { id } = req.body

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
        new handleError(res, error, 'Admin Check Error');
    }
}