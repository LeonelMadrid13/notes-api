import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
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
        await prisma.user.delete({
            where: { id: id }
        });
        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(200).json(allUsers);
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
