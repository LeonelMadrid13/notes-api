import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

// check if the user is an admin
export const isUserAdmin = async (req, res, next) => {
    try {
        const { id } = req.body
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        if (user && user.role === 'ADMIN') {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
        }
    } catch (error) {
        console.error('ERROR: An error occurred while checking if the user is an admin', error);
        res.status(500).json({ error: error.message });
    }
}