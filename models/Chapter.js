import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
  chapter_number: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String, // Sanskrit Devanagari e.g. "अर्जुनविषादयोग"
    required: true,
  },
  name_transliterated: {
    type: String, // e.g. "Arjuna Viṣāda Yoga"
    required: true,
  },
  name_translated: {
    type: String, // English e.g. "Arjuna's Dilemma"
    required: true,
  },
  name_hindi: {
    type: String, // Hindi e.g. "अर्जुन विषाद योग"
    required: true,
  },
  verses_count: {
    type: Number,
    required: true,
  },
  chapter_summary: {
    type: String,
    required: true,
  },
  chapter_summary_hindi: {
    type: String,
    required: true,
  },
  meaning: {
    en: String,
    hi: String,
  },
  topics: [{
    type: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);

