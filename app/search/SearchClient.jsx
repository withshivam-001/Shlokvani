'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, Play, ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function SearchClient({ initialQuery, initialChapter, initialResults }) {
  const router = useRouter();
  const { language, playTrack, toggleBookmark, isBookmarked } = useStore();
  const t = getTranslation(language);

  const [query, setQuery] = useState(initialQuery || '');
  const [chapter, setChapter] = useState(initialChapter || 'all');
  const [results, setResults] = useState(initialResults || []);
  const [loading, setLoading] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&chapter=${chapter}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
          वैदिक खोज केंद्र
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-devanagari text-gray-900 mt-2">
          श्लोक व दर्शन खोज
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          संस्कृत शब्द, हिन्दी भाव, अंग्रेजी अनुवाद या श्लोक संख्या द्वारा खोजें
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-google mb-10">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="खोजें (उदा: कर्मण्येवाधिकारस्ते, शांति, 2.47, Karma Yoga)..."
              className="w-full text-sm sm:text-base pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-saffron-500 font-devanagari"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-saffron-500 shrink-0"
            >
              <option value="all">सभी 18 अध्याय</option>
              {[...Array(18)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  अध्याय {i + 1}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white text-sm font-semibold shadow-md active:scale-95 transition-all shrink-0"
            >
              खोजें
            </button>
          </div>
        </div>
      </form>

      {/* Results List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 font-devanagari">
            {loading ? 'खोज जारी है...' : `${results.length} परिणाम प्राप्त हुए`}
          </h3>
        </div>

        {results.length === 0 && !loading && query && (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
            <p className="text-sm text-gray-500 font-devanagari">
              कोई श्लोक नहीं मिला। कृपया वर्तनी जांचें अथवा भिन्न शब्द प्रयोग करें।
            </p>
          </div>
        )}

        <div className="space-y-4">
          {results.map((v) => {
            const bookmarked = isBookmarked(v.chapter_number, v.verse_number);
            return (
              <div
                key={`${v.chapter_number}.${v.verse_number}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-0.5 rounded-md">
                        अध्याय {v.chapter_number}, श्लोक {v.verse_number}
                      </span>
                    </div>

                    <blockquote className="text-base font-bold font-devanagari text-gray-900 mb-1">
                      "{v.text.split('\n')[0]}"
                    </blockquote>

                    <p className="text-xs sm:text-sm text-gray-600 font-devanagari line-clamp-2 mt-1">
                      {language === 'en' ? v.translation_en : v.translation_hi}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => {
                        playTrack({
                          title: v.text.split('\n')[0],
                          subtitle: `भगवद्गीता • अध्याय ${v.chapter_number}, श्लोक ${v.verse_number}`,
                          audioUrl: v.audio_url,
                          chapterNumber: v.chapter_number,
                          verseNumber: v.verse_number,
                          text: v.text
                        });
                      }}
                      className="p-2 rounded-full text-gray-400 hover:text-saffron-600 hover:bg-saffron-50 transition-colors"
                      title={t.listen_audio}
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => toggleBookmark(v)}
                      className="p-2 rounded-full text-gray-400 hover:text-saffron-600 hover:bg-saffron-50 transition-colors"
                      title={bookmarked ? t.bookmarked : t.bookmark}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-saffron-600 text-saffron-600' : ''}`} />
                    </button>

                    <Link
                      href={`/bhagavad-gita/chapter-${v.chapter_number}/verse-${v.verse_number}`}
                      className="px-4 py-2 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold shadow-sm inline-flex items-center space-x-1"
                    >
                      <span>श्लोक पढ़ें</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

