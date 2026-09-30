
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the note'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content for the note'],
    },
    category: {
      type: String,
      default: 'General',
      enum: ['General', 'Architecture', 'Design', 'Backend', 'Personal'],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // এটি স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt যোগ করে
  }
);

module.exports = mongoose.model('Note', noteSchema);