import { getPrismaClient } from '../lib/prisma.js';
import { handleError } from '../utils/handleError.js';

const createNote = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { title, content, userId, tags } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: 'Title, content, and userId are required' });
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId,
                tags
            }
        });
        res.status(201).json(note);
    } catch (error) {
        handleError(res, error, 'Create Note Error');
    }
}

const getAllNotes = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.headers;
        if (!id || !id.startsWith('id ')) {
            return res.status(400).json({ error: 'Invalid or missing user ID' });
        }
        const userId = id.split(' ')[1];
        const allNotes = await prisma.note.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json(allNotes);
    } catch (error) {
        handleError(res, error, 'Get All Notes Error');
    }
}

const getNoteById = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
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
        handleError(res, error, 'Get Note By ID Error');
    }
}

const updateNote = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.params;
        const { title, content, tags } = req.body;

        if (!id || !title || !content) {
            return res.status(400).json({ error: 'Note ID, title, and content are required' });
        }

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
                content,
                tags
            }
        });
        res.status(200).json(note);
    } catch (error) {
        handleError(res, error, 'Update Note Error');
    }
}

const deleteNote = async (req, res) => {
    try {
        const prisma = await getPrismaClient();
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Note ID is required' });
        }

        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await prisma.note.delete({
            where: { id }
        });
        res.status(200).json({ message: `Note with ID ${id} deleted successfully` });
    } catch (error) {
        handleError(res, error, 'Delete Note Error');
    }
}

export {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};