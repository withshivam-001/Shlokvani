import mongoose from 'mongoose';

const TranslationSchema = new mongoose.Schema({
  chapter_number: {
    type: Number,
    required: true,
    index: true,
  },
  verse_number: {
    type: Number,
    required: true,
    index: true,
  },
  language_code: {
    type: String, // 'hi', 'en', 'sa', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'fr', 'de', 'es', 'ar', 'ja'
    required: true,
    index: true,
  },
  language_name: {
    type: String,
  },
  translation: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
  word_meanings: [{
    word: String,
    meaning: String,
  }],
  status: {
    type: String,
    enum: ['verified', 'draft', 'in_review', 'pending'],
    default: 'verified',
    index: true,
  },
  author_or_source: {
    type: String,
    default: 'Shlokvani Scholarly Archive',
  },
}, {
  timestamps: true,
});

TranslationSchema.index({ chapter_number: 1, verse_number: 1, language_code: 1 }, { unique: true });

export default mongoose.models.Translation || mongoose.model('Translation', TranslationSchema);

