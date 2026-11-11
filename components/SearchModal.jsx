'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, ArrowRight, Sparkles, Filter, Play } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, language, playTrack } = useStore();
  const t = getTranslation(language);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('all');
  const inputRef = useRef(null);

  const quickTags = [
    'कर्मण्येवाधिकारस्ते',
    'यदा यदा हि धर्मस्य',
    'Karma Yoga',
    'Dharma',
    'Moksha',
    'मन की शांति',
    'Chapter 2 Verse 47',
    'आत्मसंयम'
  ];

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&chapter=${selectedChapter}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error('Search query failed:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, selectedChapter]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-gray-100 transform transition-all mb-16"
        >
          {/* Search Header Input */}
          <div className="flex items-center border-b border-gray-200 pb-3 px-1">
            <Search className="w-5 h-5 text-saffron-600 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full text-base sm:text-lg focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent font-devanagari"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter options */}
          <div className="flex items-center justify-between py-3 px-1 text-xs text-gray-500 border-b border-gray-100">
            <span className="flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-saffron-600" />
              <span>{t.filter_by_chapter}:</span>
            </span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-700 focus:outline-none focus:border-saffron-500"
            >
              <option value="all">सभी 18 अध्याय (All Chapters)</option>
              {[...Array(18)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  अध्याय {i + 1} (Chapter {i + 1})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Suggestions when empty query */}
          {!query.trim() && (
            <div className="py-4 px-1">
              <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>{t.search_popular}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-gray-50 hover:bg-saffron-50 border border-gray-200 hover:border-saffron-200 text-xs font-medium text-gray-700 hover:text-saffron-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="py-8 text-center text-xs text-gray-400 flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-saffron-500 border-t-transparent animate-spin" />
              <span>खोज जारी है... (Searching sacred verses...)</span>
            </div>
          )}

          {/* Search Results Display */}
          {query.trim() && !isLoading && (
            <div className="py-2 max-h-96 overflow-y-auto divide-y divide-gray-100">
              {results.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  {t.no_results}
                </div>
              ) : (
                results.map((verse) => (
                  <div
                    key={`${verse.chapter_number}.${verse.verse_number}`}
                    className="py-3 px-2 hover:bg-gray-50 rounded-xl transition-colors group flex items-start justify-between"
                  >
                    <Link
                      href={`/bhagavad-gita/chapter-${verse.chapter_number}/verse-${verse.verse_number}`}
                      onClick={closeSearch}
                      className="flex-1 pr-3"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded-md">
                          अध्याय {verse.chapter_number}, श्लोक {verse.verse_number}
                        </span>
                        {verse.is_popular && (
                          <span className="text-[10px] bg-gold-50 text-gold-700 px-1.5 py-0.5 rounded border border-gold-200">
                            लोकप्रिय
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold font-devanagari text-gray-900 group-hover:text-saffron-600 transition-colors line-clamp-1">
                        {verse.text}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {language === 'en' ? verse.translation_en : verse.translation_hi}
                      </p>
                    </Link>

                    <div className="flex items-center space-x-1 shrink-0 self-center">
                      <button
                        onClick={() => {
                          playTrack({
                            title: verse.text.split('\n')[0],
                            subtitle: `भगवद्गीता • अध्याय ${verse.chapter_number}, श्लोक ${verse.verse_number}`,
                            audioUrl: verse.audio_url,
                            chapterNumber: verse.chapter_number,
                            verseNumber: verse.verse_number,
                          });
                        }}
                        className="p-2 rounded-full text-gray-400 hover:text-saffron-600 hover:bg-saffron-50 transition-colors"
                        title={t.listen_audio}
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                      <Link
                        href={`/bhagavad-gita/chapter-${verse.chapter_number}/verse-${verse.verse_number}`}
                        onClick={closeSearch}
                        className="p-2 text-gray-400 hover:text-saffron-600"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

