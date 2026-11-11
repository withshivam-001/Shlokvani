'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Bookmark, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Check, 
  X 
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function VerseOfDayWidget({ initialVerse }) {
  const { 
    language, 
    playTrack, 
    toggleBookmark, 
    isBookmarked,
    isVODMinimized,
    toggleVODMinimized 
  } = useStore();

  const t = getTranslation(language);
  const [verse, setVerse] = useState(initialVerse || null);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!initialVerse) {
      fetch('/api/daily-verse')
        .then(res => res.json())
        .then(data => {
          if (data.verse) setVerse(data.verse);
        })
        .catch(err => console.error('Error fetching VOD:', err));
    }
  }, [initialVerse]);

  if (!verse || !isVisible) return null;

  const bookmarked = isBookmarked(verse.chapter_number, verse.verse_number);

  const handleShare = () => {
    const shareText = `🕉️ Shlokvani - Verse of the Day (${verse.chapter_number}.${verse.verse_number})\n\n${verse.text}\n\n${verse.translation_hi}\n\nExplore at: ${window.location.origin}/bhagavad-gita/chapter-${verse.chapter_number}/verse-${verse.verse_number}`;
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita Verse ${verse.chapter_number}.${verse.verse_number}`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed bottom-24 right-4 sm:right-6 z-30 max-w-sm w-full select-none"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/90 shadow-google hover:shadow-google-hover transition-all duration-300 overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-saffron-50/80 via-white to-amber-50/60 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-500" />
              {t.verse_of_the_day}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={toggleVODMinimized}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title={isVODMinimized ? "Expand" : "Minimize"}
            >
              {isVODMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Close Widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <AnimatePresence>
          {!isVODMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 space-y-3"
            >
              {/* Reference */}
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>भगवद्गीता • अध्याय {verse.chapter_number}, श्लोक {verse.verse_number}</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => toggleBookmark(verse)}
                    className={`p-1 rounded hover:bg-gray-50 transition-colors ${
                      bookmarked ? 'text-saffron-600' : 'text-gray-400'
                    }`}
                    title={bookmarked ? t.bookmarked : t.bookmark}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-1 rounded text-gray-400 hover:text-saffron-600 hover:bg-gray-50 transition-colors"
                    title={t.share}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Shloka Quote */}
              <blockquote className="text-sm font-semibold font-devanagari text-gray-900 leading-snug line-clamp-3 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/60">
                "{verse.text}"
              </blockquote>

              {/* Translation snippet */}
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                <strong>{t.simple_meaning}: </strong>
                {language === 'en' ? verse.translation_en : verse.translation_hi}
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center justify-between border-t border-gray-100">
                <button
                  onClick={() => {
                    playTrack({
                      title: verse.text.split('\n')[0],
                      subtitle: `भगवद्गीता • अध्याय ${verse.chapter_number}, श्लोक ${verse.verse_number}`,
                      audioUrl: verse.audio_url,
                      chapterNumber: verse.chapter_number,
                      verseNumber: verse.verse_number,
                      text: verse.text
                    });
                  }}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-medium transition-all shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{t.listen_audio}</span>
                </button>

                <Link
                  href={`/bhagavad-gita/chapter-${verse.chapter_number}/verse-${verse.verse_number}`}
                  className="text-xs font-semibold text-saffron-600 hover:text-saffron-700 flex items-center space-x-1 group"
                >
                  <span>{t.read_verse}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized Bar Summary */}
        {isVODMinimized && (
          <div
            onClick={toggleVODMinimized}
            className="px-4 py-2 flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold truncate pr-2">
              अध्याय {verse.chapter_number}, श्लोक {verse.verse_number}
            </span>
            <span className="text-[10px] text-saffron-600 font-bold shrink-0">विस्तार करें ↑</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

