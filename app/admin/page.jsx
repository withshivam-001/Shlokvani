import React from 'react';
import { getTranslationStats, getAllChapters, getPopularVerses } from '@/lib/gitaService';
import AdminClient from './AdminClient';

export const metadata = {
  title: 'एडमिन डैशबोर्ड – Shlokvani Platform Controls',
  description: 'श्लोकवाणी प्रबंधन, अनुवाद स्थिति, 700 श्लोक सम्पादन एवं डेटा इम्पोर्ट।',
};

export default async function AdminPage() {
  const stats = await getTranslationStats();
  const chapters = await getAllChapters();
  const sampleVerses = await getPopularVerses(15);

  return (
    <AdminClient
      stats={stats}
      chapters={chapters}
      initialVerses={sampleVerses}
    />
  );
}

