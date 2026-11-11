import React from 'react';
import Link from 'next/link';
import { 
  getAllChapters, 
  getVerseOfTheDay, 
  getPopularVerses, 
  getAllTopics 
} from '@/lib/gitaService';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const chapters = await getAllChapters();
  const daily = await getVerseOfTheDay();
  const popularVerses = await getPopularVerses(6);
  const topics = await getAllTopics();

  return (
    <HomeClient
      chapters={chapters}
      dailyVerse={daily?.verse}
      popularVerses={popularVerses}
      topics={topics}
    />
  );
}

