import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createNote = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId // Assuming user is passed in the request body
            }
        });
        res.status(201).json(note);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
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
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await prisma.note.findUnique({
            where: { id },
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await prisma.note.update({
            where: { id },
            data: {
                title,
                content
            }
        });
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.note.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}