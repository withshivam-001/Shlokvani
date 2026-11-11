'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Sparkles, BookOpen } from 'lucide-react';

export default function WordMeaningModal({ wordData, onClose }) {
  if (!wordData) return null;

  const speakWord = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(wordData.word || wordData.transliteration);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          {/* Subtle golden ambient glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-gold-200/50 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-500" />
              पदार्थ (Word Breakdown)
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Word & Pronunciation */}
          <div className="py-4 text-center">
            <h3 className="text-3xl font-bold font-devanagari text-gray-900 tracking-wide mb-1">
              {wordData.word}
            </h3>
            <p className="text-sm font-medium text-saffron-600 italic">
              /{wordData.transliteration || wordData.word}/
            </p>

            <button
              onClick={speakWord}
              className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-100 hover:bg-saffron-50 text-gray-700 hover:text-saffron-700 text-xs font-medium transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>उच्चारण सुनें (Listen)</span>
            </button>
          </div>

          {/* Meanings */}
          <div className="space-y-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                English Meaning
              </span>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {wordData.english || 'In context of the verse'}
              </p>
            </div>

            {wordData.hindi && (
              <div className="pt-2 border-t border-gray-200/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  हिन्दी अर्थ
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 font-devanagari">
                  {wordData.hindi}
                </p>
              </div>
            )}

            {wordData.grammar && (
              <div className="pt-2 border-t border-gray-200/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  व्याकरण संदर्भ (Grammar)
                </span>
                <p className="text-xs text-gray-600 mt-0.5">
                  {wordData.grammar}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="w-full py-2 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-medium transition-colors"
            >
              बंद करें (Close)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

