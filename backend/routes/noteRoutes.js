
const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

// Main routes for notes API
router.route('/')
  .get(getNotes)       // GET all notes / search
  .post(createNote);    // POST new note

router.route('/:id')
  .get(getNoteById)     // Dynamic route: GET single note details
  .put(updateNote)      // Dynamic route: UPDATE note
  .delete(deleteNote);  // Dynamic route: DELETE note

module.exports = router;