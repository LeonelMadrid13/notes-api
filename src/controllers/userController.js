import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
    try {
        const { ...rest } = req.body;
        const { password } = req.body;
        const user = await prisma.user.create({
            data: {
                ...rest,
                password: await bcrypt.hash(password, 10)
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Check if the user exists before attempting to delete
        const userExists = await prisma.user.findUnique({
            where: { id: id }
        });
        if (!userExists) {
            return res.status(404).json({ error: `User with ID ${id} not found` });
        }

        // Delete the user
        await prisma.user.delete({
            where: { id: id }
        });
        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: req.body
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    } catch (error) {
        console.error('ERROR: An error occurred while fetching the user by email', error);
        throw error;
    }
}

export const isUserAdmin = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        return user && user.role === 'admin';
    } catch (error) {
        console.error('ERROR: An error occurred while checking if the user is an admin', error);
        throw error;
    }
}