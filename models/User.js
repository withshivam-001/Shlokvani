import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password_hash: {
    type: String,
  },
  preferred_language: {
    type: String,
    default: 'hi',
  },
  bookmarks: [{
    chapter_number: Number,
    verse_number: Number,
    saved_at: {
      type: Date,
      default: Date.now,
    },
    note: String,
  }],
  reading_history: [{
    chapter_number: Number,
    verse_number: Number,
    read_at: {
      type: Date,
      default: Date.now,
    },
  }],
  personal_notes: [{
    chapter_number: Number,
    verse_number: Number,
    note: String,
    updated_at: {
      type: Date,
      default: Date.now,
    },
  }],
  streak: {
    type: Number,
    default: 1,
  },
  last_active_date: {
    type: String, // YYYY-MM-DD
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

