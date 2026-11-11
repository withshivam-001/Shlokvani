import mongoose from 'mongoose';

const WordMeaningSchema = new mongoose.Schema({
  word: { type: String, required: true }, // Sanskrit word
  transliteration: { type: String }, // IAST
  hindi: { type: String }, // Hindi meaning
  english: { type: String }, // English meaning
  grammar: { type: String }, // Grammatical context
}, { _id: false });

const VerseSchema = new mongoose.Schema({
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
  slug: {
    type: String, // e.g. "chapter-2-verse-47"
    index: true,
  },
  text: {
    type: String, // Complete Sanskrit Devanagari
    required: true,
  },
  transliteration: {
    type: String, // IAST Roman script
    required: true,
  },
  word_meanings_text: {
    type: String, // Raw word meanings string
  },
  word_meanings: [WordMeaningSchema], // Structured array of Padartha
  translation_hi: {
    type: String, // Complete Hindi translation
    required: true,
  },
  translation_en: {
    type: String, // Complete English translation
    required: true,
  },
  explanation_hi: {
    type: String, // Detailed Hindi explanation
  },
  explanation_en: {
    type: String, // Detailed English explanation
  },
  spiritual_interpretation: {
    hi: String,
    en: String,
  },
  life_lessons: {
    hi: [String],
    en: [String],
  },
  audio_url: {
    type: String, // Direct recitation audio
  },
  topics: [{
    type: String,
    index: true,
  }],
  is_popular: {
    type: Boolean,
    default: false,
    index: true,
  },
}, {
  timestamps: true,
});

VerseSchema.index({ chapter_number: 1, verse_number: 1 }, { unique: true });
VerseSchema.index({ text: 'text', translation_en: 'text', translation_hi: 'text' });

export default mongoose.models.Verse || mongoose.model('Verse', VerseSchema);

