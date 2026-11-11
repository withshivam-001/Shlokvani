import React from 'react';
import { getAllChapters } from '@/lib/gitaService';
import ChaptersClient from './ChaptersClient';

export const metadata = {
  title: 'श्रीमद्भगवद्गीता के सभी 18 अध्याय – Shlokvani',
  description: 'श्रीमद्भगवद्गीता के 18 अध्याय: अर्जुनविषादयोग से मोक्षसंन्यासयोग तक सम्पूर्ण 700 श्लोक।',
};

export default async function ChaptersPage() {
  const chapters = await getAllChapters();

  return (
    <ChaptersClient chapters={chapters} />
  );
}

