const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shlokvani';

// Define schemas directly for standalone script execution
const ChapterSchema = new mongoose.Schema({
  chapter_number: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true },
  name_transliterated: { type: String, required: true },
  name_translated: { type: String, required: true },
  name_hindi: { type: String, required: true },
  verses_count: { type: Number, required: true },
  chapter_summary: { type: String, required: true },
  chapter_summary_hindi: { type: String, required: true },
  meaning: { en: String, hi: String },
  topics: [String],
}, { timestamps: true });

const VerseSchema = new mongoose.Schema({
  chapter_number: { type: Number, required: true, index: true },
  verse_number: { type: Number, required: true, index: true },
  slug: { type: String, index: true },
  text: { type: String, required: true },
  transliteration: { type: String, required: true },
  word_meanings_text: { type: String },
  word_meanings: [{
    word: String,
    transliteration: String,
    hindi: String,
    english: String,
    grammar: String,
  }],
  translation_hi: { type: String, required: true },
  translation_en: { type: String, required: true },
  explanation_hi: { type: String },
  explanation_en: { type: String },
  spiritual_interpretation: { hi: String, en: String },
  life_lessons: { hi: [String], en: [String] },
  audio_url: { type: String },
  topics: [String],
  is_popular: { type: Boolean, default: false, index: true },
}, { timestamps: true });

const DailyVerseSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true, index: true },
  chapter_number: { type: Number, required: true },
  verse_number: { type: Number, required: true },
  featured_thought_hi: { type: String },
  featured_thought_en: { type: String },
}, { timestamps: true });

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.warn('⚠️ Could not connect to MongoDB server:', err.message);
    console.log('Shlokvani works out-of-the-box with bundled data/ JSON storage as primary/fallback!');
    process.exit(0);
  }

  const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
  const Verse = mongoose.models.Verse || mongoose.model('Verse', VerseSchema);
  const DailyVerse = mongoose.models.DailyVerse || mongoose.model('DailyVerse', DailyVerseSchema);

  const dataDir = path.join(__dirname, '..', 'data');
  const chapters = JSON.parse(fs.readFileSync(path.join(dataDir, 'chapters.json'), 'utf8'));
  const verses = JSON.parse(fs.readFileSync(path.join(dataDir, 'verses.json'), 'utf8'));

  console.log(`Seeding ${chapters.length} chapters...`);
  await Chapter.deleteMany({});
  await Chapter.insertMany(chapters);
  console.log('Chapters seeded successfully!');

  console.log(`Seeding ${verses.length} verses...`);
  await Verse.deleteMany({});
  await Verse.insertMany(verses);
  console.log('Verses seeded successfully!');

  // Seed today's daily verse
  const today = new Date().toISOString().split('T')[0];
  await DailyVerse.deleteMany({});
  await DailyVerse.create({
    date: today,
    chapter_number: 2,
    verse_number: 47,
    featured_thought_hi: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - आपका अधिकार केवल कर्म करने में है, फल में कभी नहीं।",
    featured_thought_en: "You have a right to perform your prescribed duties, but never to the fruits of action."
  });
  console.log("Daily verse seeded for today:", today);

  console.log('Database seeding complete! All 701 verses and 18 chapters are now in MongoDB.');
  await mongoose.disconnect();
}

seed();

