import React from 'react';
import Link from 'next/link';
import { getVerseOfTheDay, getChapter } from '@/lib/gitaService';
import VerseReaderClient from '@/app/bhagavad-gita/chapter/[chapterNumber]/verse/[verseNumber]/VerseReaderClient';

export const metadata = {
  title: 'आज का श्लोक (Verse of the Day) – Shlokvani',
  description: 'प्रतिदिन एक पावन श्लोक का अध्ययन करें और अपने जीवन को सकारात्मक व शांतिपूर्ण बनाएं।',
};

export default async function DailyVersePage() {
  const daily = await getVerseOfTheDay();
  const verse = daily.verse;
  const chapter = await getChapter(verse.chapter_number);

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 mb-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
          दैनिक प्रेरणा • {daily.date}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-devanagari text-gray-900 mt-2">
          आज का पावन श्लोक
        </h1>
      </div>

      <VerseReaderClient
        verse={verse}
        chapter={chapter}
        prevVerse={null}
        nextVerse={null}
        totalInChapter={chapter.verses_count}
      />
    </div>
  );
}

