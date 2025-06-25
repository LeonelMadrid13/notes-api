import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';

const router = express.Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;