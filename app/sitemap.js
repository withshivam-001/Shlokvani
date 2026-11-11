import { getAllChapters, getPopularVerses } from '@/lib/gitaService';

export default async function sitemap() {
  const baseUrl = 'https://shlokvani.org';
  const chapters = await getAllChapters();
  const popular = await getPopularVerses(50);

  const staticRoutes = [
    '',
    '/bhagavad-gita',
    '/bhagavad-gita/chapters',
    '/wisdom',
    '/topics',
    '/daily-verse',
    '/bookmarks',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const chapterRoutes = chapters.map((ch) => ({
    url: `${baseUrl}/bhagavad-gita/chapter/${ch.chapter_number}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const popularVerseRoutes = popular.map((v) => ({
    url: `${baseUrl}/bhagavad-gita/chapter-${v.chapter_number}/verse-${v.verse_number}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...chapterRoutes, ...popularVerseRoutes];
}

