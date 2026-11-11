import React from 'react';
import { searchGita } from '@/lib/gitaService';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'गीता ज्ञान खोज – Shlokvani Search',
  description: 'श्रीमद्भगवद्गीता के सभी 700 श्लोकों में से शब्द, विषय या भाव खोजें।',
};

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const chapter = searchParams?.chapter || 'all';

  const results = query ? await searchGita(query, { chapter: chapter === 'all' ? null : chapter }) : [];

  return (
    <SearchClient
      initialQuery={query}
      initialChapter={chapter}
      initialResults={results}
    />
  );
}

