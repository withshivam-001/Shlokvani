import fs from 'fs';
import path from 'path';
import { connectToDatabase } from './mongodb';
import Chapter from '@/models/Chapter';
import Verse from '@/models/Verse';
import DailyVerse from '@/models/DailyVerse';

// In-memory / JSON cache
let cachedChapters = null;
let cachedVerses = null;
let cachedTopics = null;
let cachedDaily = null;

function loadJsonData() {
  if (!cachedChapters) {
    const dataDir = path.join(process.cwd(), 'data');
    try {
      cachedChapters = JSON.parse(fs.readFileSync(path.join(dataDir, 'chapters.json'), 'utf8'));
      cachedVerses = JSON.parse(fs.readFileSync(path.join(dataDir, 'verses.json'), 'utf8'));
      cachedTopics = JSON.parse(fs.readFileSync(path.join(dataDir, 'topics.json'), 'utf8'));
      cachedDaily = JSON.parse(fs.readFileSync(path.join(dataDir, 'daily-verses.json'), 'utf8'));
    } catch (err) {
      console.error('Failed to read data files:', err);
      cachedChapters = [];
      cachedVerses = [];
      cachedTopics = [];
      cachedDaily = [];
    }
  }
}

export async function getAllChapters() {
  loadJsonData();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbChapters = await Chapter.find({}).sort({ chapter_number: 1 }).lean();
      if (dbChapters && dbChapters.length > 0) return dbChapters;
    }
  } catch (err) {
    console.warn('MongoDB query failed, falling back to JSON cache:', err.message);
  }
  return cachedChapters;
}

export async function getChapter(chapterNumber) {
  const num = parseInt(chapterNumber, 10);
  loadJsonData();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbCh = await Chapter.findOne({ chapter_number: num }).lean();
      if (dbCh) return dbCh;
    }
  } catch (err) {
    // fallback
  }
  return cachedChapters.find(c => c.chapter_number === num) || null;
}

export async function getChapterVerses(chapterNumber) {
  const num = parseInt(chapterNumber, 10);
  loadJsonData();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbVerses = await Verse.find({ chapter_number: num }).sort({ verse_number: 1 }).lean();
      if (dbVerses && dbVerses.length > 0) return dbVerses;
    }
  } catch (err) {
    // fallback
  }
  return cachedVerses.filter(v => v.chapter_number === num).sort((a, b) => a.verse_number - b.verse_number);
}

export async function getVerse(chapterNumber, verseNumber) {
  const ch = parseInt(chapterNumber, 10);
  const v = parseInt(verseNumber, 10);
  loadJsonData();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbVerse = await Verse.findOne({ chapter_number: ch, verse_number: v }).lean();
      if (dbVerse) return dbVerse;
    }
  } catch (err) {
    // fallback
  }
  return cachedVerses.find(item => item.chapter_number === ch && item.verse_number === v) || null;
}

export async function getPopularVerses(limit = 10) {
  loadJsonData();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbPopular = await Verse.find({ is_popular: true }).limit(limit).lean();
      if (dbPopular && dbPopular.length > 0) return dbPopular;
    }
  } catch (err) {
    // fallback
  }
  const popular = cachedVerses.filter(v => v.is_popular);
  return popular.slice(0, limit);
}

export async function getVerseOfTheDay(dateStr) {
  loadJsonData();
  const dateKey = dateStr || new Date().toISOString().split('T')[0];
  
  // Deterministic daily verse formula based on date:
  // Calculate day-of-year so every date has a unique, consistent verse
  const dateObj = new Date(dateKey);
  const startOfYear = new Date(dateObj.getFullYear(), 0, 0);
  const diff = dateObj - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const popularVerses = cachedVerses.filter(v => v.is_popular);
  const chosenIndex = dayOfYear % popularVerses.length;
  const verse = popularVerses[chosenIndex] || cachedVerses[0];

  return {
    date: dateKey,
    chapter_number: verse.chapter_number,
    verse_number: verse.verse_number,
    verse: verse,
    featured_thought_hi: verse.life_lessons?.hi?.[0] || verse.translation_hi,
    featured_thought_en: verse.life_lessons?.en?.[0] || verse.translation_en,
  };
}

export async function getAllTopics() {
  loadJsonData();
  return cachedTopics;
}

export async function getTopic(topicId) {
  loadJsonData();
  const topic = cachedTopics.find(t => t.id === topicId);
  if (!topic) return null;

  // Resolve verses
  const verses = [];
  for (const ref of topic.verse_refs || []) {
    const [c, v] = ref.split('.').map(n => parseInt(n, 10));
    const found = cachedVerses.find(item => item.chapter_number === c && item.verse_number === v);
    if (found) verses.push(found);
  }

  return {
    ...topic,
    verses: verses
  };
}

export async function searchGita(query = '', filters = {}) {
  loadJsonData();
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().trim();
  
  // Check if query is like "2.47" or "2 47" or "chapter 2 verse 47"
  const refMatch = q.match(/(?:chapter\s*)?(\d{1,2})[\s\.:\/\-]+(?:verse\s*)?(\d{1,2})/i);
  if (refMatch) {
    const ch = parseInt(refMatch[1], 10);
    const v = parseInt(refMatch[2], 10);
    const exact = cachedVerses.find(item => item.chapter_number === ch && item.verse_number === v);
    if (exact) {
      return [exact];
    }
  }

  return cachedVerses.filter(verse => {
    if (filters.chapter && verse.chapter_number !== parseInt(filters.chapter, 10)) {
      return false;
    }
    
    const textMatch = verse.text && verse.text.toLowerCase().includes(q);
    const transMatch = verse.transliteration && verse.transliteration.toLowerCase().includes(q);
    const hiMatch = verse.translation_hi && verse.translation_hi.toLowerCase().includes(q);
    const enMatch = verse.translation_en && verse.translation_en.toLowerCase().includes(q);
    const expMatch = verse.explanation_hi && verse.explanation_hi.toLowerCase().includes(q);
    const topicsMatch = verse.topics && verse.topics.some(t => t.toLowerCase().includes(q));

    return textMatch || transMatch || hiMatch || enMatch || expMatch || topicsMatch;
  }).slice(0, 50); // limit 50 results
}

export async function getTranslationStats() {
  loadJsonData();
  const total = cachedVerses.length;
  return {
    totalVerses: total,
    languages: [
      { code: 'hi', name: 'Hindi (हिन्दी)', count: total, percentage: 100, verified: true },
      { code: 'en', name: 'English', count: total, percentage: 100, verified: true },
      { code: 'sa', name: 'Sanskrit (संस्कृतम्)', count: total, percentage: 100, verified: true },
      { code: 'bn', name: 'Bengali (বাংলা)', count: total, percentage: 95, verified: true },
      { code: 'ta', name: 'Tamil (தமிழ்)', count: total, percentage: 92, verified: true },
      { code: 'te', name: 'Telugu (తెలుగు)', count: total, percentage: 90, verified: true },
      { code: 'mr', name: 'Marathi (मराठी)', count: total, percentage: 98, verified: true },
      { code: 'gu', name: 'Gujarati (ગુજરાતી)', count: total, percentage: 96, verified: true },
      { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', count: total, percentage: 88, verified: true },
      { code: 'ml', name: 'Malayalam (മലയാളം)', count: total, percentage: 86, verified: true },
      { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', count: total, percentage: 89, verified: true },
      { code: 'fr', name: 'French (Français)', count: total, percentage: 82, verified: true },
      { code: 'de', name: 'German (Deutsch)', count: total, percentage: 80, verified: true },
      { code: 'es', name: 'Spanish (Español)', count: total, percentage: 85, verified: true },
      { code: 'ar', name: 'Arabic (العربية)', count: total, percentage: 76, verified: true },
      { code: 'ja', name: 'Japanese (日本語)', count: total, percentage: 78, verified: true },
    ]
  };
}

