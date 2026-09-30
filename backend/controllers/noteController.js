
const Note = require('../models/Note');

// @desc    Get all notes / Search notes
// @route   GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // লাইভ সার্চ ফিল্টারিং (Title বা Content দিয়ে সার্চ)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // ক্যাটাগরি ফিল্টারিং
    if (category && category !== 'All') {
      query.category = category;
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get single note (Dynamic route implementation)
// @route   GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid Note ID or Server Error' });
  }
};

// @desc    Create new note
// @route   POST /api/notes
exports.createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const newNote = await Note.create({
      title,
      content,
      category: category || 'General',
      isPinned: isPinned || false,
    });

    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create note', error: error.message });
  }
};

// @desc    Update existing note
// @route   PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update note' });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    await note.deleteOne();
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete note' });
  }
};