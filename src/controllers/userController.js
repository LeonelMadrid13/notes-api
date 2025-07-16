// src/controllers/userController.js

import { getPrismaClient } from '../lib/prisma.js';
import { handleError } from '../utils/handleError.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'privatekey';

const createUser = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'User with this email already exists' });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 10),
            },
        });

        const [token, refreshToken] = await Promise.all([
                    jwt.sign({ id: user.id, isAdmin: user.isAdmin }, key, { expiresIn: '1h' }),
                    jwt.sign({ id: user.id, isAdmin: user.isAdmin }, key, { expiresIn: '7d' }),
                ]);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,         // Use HTTPS in production!
            sameSite: 'none',     // Required for cross-domain
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie('authorization', token, {
            httpOnly: true,
            secure: true,         // Use HTTPS in production!
            sameSite: 'none',     // Required for cross-domain
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.cookie('id', user.id, {
            httpOnly: true,
            secure: true,         // Use HTTPS in production!
            sameSite: 'none'     // Required for cross-domain
        });

        return res.status(201).json({
            success: true,
            data: { 
                id: user.id 
            },
        });
    } catch (error) {
        handleError(res, error, 'Create User Error');
    }
};

const deleteUser = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, error: 'User ID is required' });
        }

        const userExists = await prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ success: false, error: `User with ID ${id} not found` });
        }

        await prisma.user.delete({ where: { id } });

        return res.status(200).json({
            success: true,
            data: { message: `User with ID ${id} deleted successfully` },
        });
    } catch (error) {
        handleError(res, error, 'Delete User Error');
    }
};

const getUserById = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, error: 'User ID is required' });
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
            },
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        handleError(res, error, 'Get User By ID Error');
    }
};

const updateUser = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, error: 'User ID is required' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, error: 'No data provided for update' });
        }

        const userExists = await prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ success: false, error: `User with ID ${id} not found` });
        }

        if ('isAdmin' in req.body && !req.user.isAdmin) {
            return res.status(403).json({ success: false, error: 'Only admins can modify admin status' });
        }

        const updateData = {};
        const { email, name } = req.body;
        if (email) updateData.email = email;
        if (name) updateData.name = name;

        if (req.user.isAdmin && req.body.isAdmin !== undefined) {
            updateData.isAdmin = req.body.isAdmin;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, error: 'At least one valid field must be provided' });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        handleError(res, error, 'Update User Error');
    }
};

const getUserByEmail = async (email) => {
    try {
        const prisma = await getPrismaClient();
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.error('Get User By Email Error:', error);
        throw error;
    }
};

export {
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    getUserByEmail,
};
