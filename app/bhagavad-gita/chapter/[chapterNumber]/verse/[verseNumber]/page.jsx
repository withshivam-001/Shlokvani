import React from 'react';
import { notFound } from 'next/navigation';
import { getVerse, getChapter, getChapterVerses } from '@/lib/gitaService';
import VerseReaderClient from './VerseReaderClient';

export async function generateMetadata({ params }) {
  const ch = parseInt(params.chapterNumber, 10);
  const v = parseInt(params.verseNumber, 10);
  const verse = await getVerse(ch, v);
  const chapter = await getChapter(ch);

  if (!verse || !chapter) {
    return {
      title: 'Verse Not Found – Shlokvani',
    };
  }

  const shortTrans = verse.translation_en ? verse.translation_en.slice(0, 150) : '';

  return {
    title: `भगवद्गीता ${ch}.${v} – ${chapter.name} | Shlokvani`,
    description: `श्रीमद्भगवद्गीता अध्याय ${ch}, श्लोक ${v} (${chapter.name}): "${verse.text.split('\n')[0]}". ${shortTrans}`,
    openGraph: {
      title: `Bhagavad Gita ${ch}.${v} – Sanskrit Shloka & Translation`,
      description: verse.translation_en,
    },
  };
}

export default async function VersePage({ params }) {
  const ch = parseInt(params.chapterNumber, 10);
  const v = parseInt(params.verseNumber, 10);

  const verse = await getVerse(ch, v);
  const chapter = await getChapter(ch);

  if (!verse || !chapter) {
    notFound();
  }

  // Pre-fetch verses count in chapter to determine prev/next
  const totalInChapter = chapter.verses_count;
  const prevVerse = v > 1 ? v - 1 : (ch > 1 ? null : null);
  const nextVerse = v < totalInChapter ? v + 1 : (ch < 18 ? null : null);

  return (
    <VerseReaderClient
      verse={verse}
      chapter={chapter}
      prevVerse={prevVerse}
      nextVerse={nextVerse}
      totalInChapter={totalInChapter}
    />
  );
}

