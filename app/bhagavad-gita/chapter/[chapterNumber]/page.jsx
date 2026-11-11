import React from 'react';
import { notFound } from 'next/navigation';
import { getChapter, getChapterVerses } from '@/lib/gitaService';
import ChapterClient from './ChapterClient';

export async function generateMetadata({ params }) {
  const ch = parseInt(params.chapterNumber, 10);
  const chapter = await getChapter(ch);
  if (!chapter) {
    return { title: 'Chapter Not Found – Shlokvani' };
  }
  return {
    title: `अध्याय ${ch}: ${chapter.name} (${chapter.name_translated}) – Shlokvani`,
    description: `श्रीमद्भगवद्गीता अध्याय ${ch} - ${chapter.name}: ${chapter.chapter_summary_hindi}`,
  };
}

export default async function ChapterPage({ params }) {
  const ch = parseInt(params.chapterNumber, 10);
  const chapter = await getChapter(ch);
  if (!chapter) notFound();

  const verses = await getChapterVerses(ch);

  return (
    <ChapterClient
      chapter={chapter}
      verses={verses}
    />
  );
}

