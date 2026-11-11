import mongoose from 'mongoose';

const DailyVerseSchema = new mongoose.Schema({
  date: {
    type: String, // 'YYYY-MM-DD'
    required: true,
    unique: true,
    index: true,
  },
  chapter_number: {
    type: Number,
    required: true,
  },
  verse_number: {
    type: Number,
    required: true,
  },
  featured_thought_hi: {
    type: String,
  },
  featured_thought_en: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.DailyVerse || mongoose.model('DailyVerse', DailyVerseSchema);

