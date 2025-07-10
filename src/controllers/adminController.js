import { getPrismaClient } from '../lib/prisma.js';
import { handleError } from '../utils/handleError.js';


const getAllUsers = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const users = await prisma.user.findMany();

        console.log({ users })
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error, 'Get All Users Error');
    }
};

export {
    getAllUsers
};