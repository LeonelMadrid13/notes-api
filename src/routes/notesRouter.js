import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';
import { checkToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', checkToken, createNote);
router.get('/', checkToken, getAllNotes);
router.get('/:id', checkToken, getNoteById);
router.put('/:id', checkToken, updateNote);
router.delete('/:id', checkToken, deleteNote);

export default router;