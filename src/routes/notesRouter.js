// File: src/routes/notesRouter.js

import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';
import { checkToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(checkToken);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;