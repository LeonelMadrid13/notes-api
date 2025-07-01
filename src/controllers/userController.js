import bcrypt from 'bcrypt';

import { PrismaClient } from '../generated/prisma/index.js'
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
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
        new handleError(res, error, 'Create User Error');
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
        new handleError(res, error, 'Delete User Error');
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        res.status(200).json(user);
    } catch (error) {
        new handleError(res, error, 'Get User By ID Error');
    }
}

export const updateUser = async (req, res) => {
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
        new handleError(res, error, 'Update User Error');
    }
}

export const getUserByEmail = async (email) => {

    if (!email) {
        throw new Error('Email is required to get user by email');
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    } catch (error) {
        new handleError(null, error, 'Get User By Email Error');
    }
}

export const isUserAdmin = async (id) => {
    try {

        if (!id) {
            throw new Error('User ID is required to check admin status');
        }

        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        return user && user.role === 'admin';
    } catch (error) {
        new handleError(null, error, 'Check User Admin Status Error');
        return false; // Default to false if there's an error
    }
}