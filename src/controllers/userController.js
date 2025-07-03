const { PrismaClient } = require('../generated/prisma/index.js');
const { handleError } = require('../utils/handleError.js');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
        const { ...rest } = req.body;
        const { password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email: rest.email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        if (!rest.email || !rest.name) {
            return res.status(400).json({ error: 'Email and name are required' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const user = await prisma.user.create({
            data: {
                ...rest,
                password: await bcrypt.hash(password, 10)
            }
        });
        res.status(201).json(user);
    } catch (error) {
        handleError(res, error, 'Create User Error');
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const userExists = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!userExists) {
            return res.status(404).json({ error: `User with ID ${id} not found` });
        }

        await prisma.user.delete({
            where: { id: id }
        });
        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        handleError(res, error, 'Delete User Error');
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        const username = { username: user.name };
        res.status(200).json(username);
    } catch (error) {
        handleError(res, error, 'Get User By ID Error');
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: req.body
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        handleError(res, error, 'Update User Error');
    }
}

module.exports = {
    createUser,
    deleteUser,
    getUserById,
    updateUser
};