import { PrismaClient } from "../generated/prisma/index.js";
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient();

export const createNote = async (req, res) => {
    try {
        const { title, content, userId, tags } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: 'Title, content, and userId are required' });
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId, // Assuming user is passed in the request body
                tags
            }
        });
        res.status(201).json(note);
    } catch (error) {
        new handleError(res, error, 'Create Note Error');
    }
}

export const getAllNotes = async (req, res) => {
    const { id } = req.headers;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const userId = id.split(' ')[1];
    try {
        const allNotes = await prisma.note.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json(allNotes);
    } catch (error) {
        new handleError(res, error, 'Get All Notes Error');
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Note ID is required' });
        }

        const note = await prisma.note.findUnique({
            where: { id },
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        new handleError(res, error, 'Get Note By ID Error');
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!id || !title || !content) {
            return res.status(400).json({ error: 'Note ID, title, and content are required' });
        }
        // Check if the note exists before updating
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const note = await prisma.note.update({
            where: { id },
            data: {
                title,
                content
            }
        });
        res.status(200).json(note);
    } catch (error) {
        new handleError(res, error, 'Update Note Error');
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Note ID is required' });
        }
        // Check if the note exists before deleting
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await prisma.note.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        new handleError(res, error, 'Delete Note Error');
    }
}