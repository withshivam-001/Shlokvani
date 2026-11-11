'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Search, Sparkles, Filter } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function ChaptersClient({ chapters }) {
  const { language } = useStore();
  const t = getTranslation(language);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, karma (1-6), bhakti (7-12), jnana (13-18)

  const filteredChapters = chapters.filter(ch => {
    // Topic category filter
    if (filterType === 'karma' && ch.chapter_number > 6) return false;
    if (filterType === 'bhakti' && (ch.chapter_number < 7 || ch.chapter_number > 12)) return false;
    if (filterType === 'jnana' && ch.chapter_number < 13) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      String(ch.chapter_number) === q ||
      ch.name.toLowerCase().includes(q) ||
      ch.name_translated.toLowerCase().includes(q) ||
      ch.name_hindi.toLowerCase().includes(q) ||
      ch.chapter_summary.toLowerCase().includes(q) ||
      ch.chapter_summary_hindi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
          श्रीमद्भगवद्गीता ज्ञानकोष
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-devanagari text-gray-900 tracking-tight mt-3">
          {t.chapters_title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 font-devanagari">
          {t.chapters_sub} • कर्मयोग, भक्तियोग और ज्ञानयोग का दिव्य त्रिवेणी संगम
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto text-xs font-medium">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterType === 'all' ? 'bg-saffron-600 text-white font-bold shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            सभी 18 अध्याय
          </button>
          <button
            onClick={() => setFilterType('karma')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterType === 'karma' ? 'bg-saffron-600 text-white font-bold shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            कर्म षट्क (अध्याय 1-6)
          </button>
          <button
            onClick={() => setFilterType('bhakti')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterType === 'bhakti' ? 'bg-saffron-600 text-white font-bold shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            भक्ति षट्क (अध्याय 7-12)
          </button>
          <button
            onClick={() => setFilterType('jnana')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              filterType === 'jnana' ? 'bg-saffron-600 text-white font-bold shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ज्ञान षट्क (अध्याय 13-18)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="अध्याय का नाम या विषय खोजें..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:border-saffron-500"
          />
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((ch) => (
          <div
            key={ch.chapter_number}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-google-hover transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-md">
                  अध्याय {ch.chapter_number}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {ch.verses_count} {t.verses}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 group-hover:text-saffron-600 transition-colors font-devanagari mb-1">
                {ch.name}
              </h3>

              <p className="text-xs font-semibold text-saffron-700 mb-3">
                {ch.name_translated} • {ch.name_hindi}
              </p>

              <p className="text-xs text-gray-600 leading-relaxed font-devanagari line-clamp-3 mb-4">
                {language === 'en' ? ch.chapter_summary : ch.chapter_summary_hindi}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                {ch.topics ? ch.topics.slice(0, 2).join(' • ') : 'योग'}
              </span>
              <Link
                href={`/bhagavad-gita/chapter/${ch.chapter_number}`}
                className="text-xs font-semibold text-saffron-600 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
              >
                <span>{t.explore_chapter}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

