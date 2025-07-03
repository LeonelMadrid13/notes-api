// File: src/routes/notesRouter.js

const express = require('express');
const { createNote, getAllNotes, updateNote, deleteNote, getNoteById } = require('../controllers/notesController.js');
const { checkToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.use(checkToken);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;