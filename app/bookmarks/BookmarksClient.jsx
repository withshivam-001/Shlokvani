'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Trash2, 
  Play, 
  ArrowRight, 
  Clock, 
  Flame, 
  FileText, 
  Share2, 
  BookOpen,
  Check
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function BookmarksClient() {
  const { 
    bookmarks, 
    readingHistory, 
    personalNotes, 
    readingStreak, 
    lastRead, 
    toggleBookmark, 
    playTrack,
    language 
  } = useStore();

  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState('bookmarks'); // bookmarks | history | notes

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Banner with Reading Streak */}
      <div className="bg-gradient-to-r from-saffron-50 via-white to-amber-50 rounded-3xl p-6 sm:p-8 border border-saffron-100 shadow-sm mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-white px-3 py-1 rounded-full border border-saffron-200">
            व्यक्तिगत स्वाध्याय कक्ष (Personal Sanctuary)
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-devanagari text-gray-900 mt-2">
            मेरी आध्यात्मिक डायरी
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-devanagari">
            सहेजे गए श्लोक, विचार और आपकी नियमित पठन प्रगति
          </p>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shrink-0">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-saffron-600 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-saffron-500 text-saffron-500 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 leading-none">
              {readingStreak} <span className="text-sm font-semibold text-gray-500">{t.days}</span>
            </div>
            <div className="text-xs text-saffron-600 font-semibold mt-1">
              {t.reading_streak}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-3 mb-8">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-2 text-sm font-bold flex items-center gap-1.5 transition-colors relative ${
            activeTab === 'bookmarks' ? 'text-saffron-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>पसंदीदा श्लोक ({bookmarks.length})</span>
          {activeTab === 'bookmarks' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-2 text-sm font-bold flex items-center gap-1.5 transition-colors relative ${
            activeTab === 'history' ? 'text-saffron-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>हाल ही में पढ़े गए ({readingHistory.length})</span>
          {activeTab === 'history' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-2 text-sm font-bold flex items-center gap-1.5 transition-colors relative ${
            activeTab === 'notes' ? 'text-saffron-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>व्यक्तिगत नोट्स ({Object.keys(personalNotes).length})</span>
          {activeTab === 'notes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron-600 rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div>
          {bookmarks.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 font-devanagari">
                कोई पसंदीदा श्लोक सहेजा नहीं गया है
              </h3>
              <p className="text-xs text-gray-500 mt-1 mb-5">
                अध्ययन करते समय बुकमार्क आइकन पर क्लिक करके अपने प्रिय श्लोक यहाँ सहेजें।
              </p>
              <Link
                href="/bhagavad-gita/chapters"
                className="px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold shadow-sm inline-flex items-center space-x-1"
              >
                <span>भगवद्गीता पढ़ना शुरू करें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookmarks.map((b) => (
                <div
                  key={`${b.chapter_number}.${b.verse_number}`}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-0.5 rounded-md">
                        अध्याय {b.chapter_number}, श्लोक {b.verse_number}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {new Date(b.saved_at).toLocaleDateString()}
                      </span>
                    </div>

                    <blockquote className="text-base font-bold font-devanagari text-gray-900 line-clamp-1">
                      "{b.text?.split('\n')[0]}"
                    </blockquote>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 font-devanagari">
                      {language === 'en' ? b.translation_en : b.translation_hi}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => toggleBookmark(b)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/bhagavad-gita/chapter-${b.chapter_number}/verse-${b.verse_number}`}
                      className="px-4 py-2 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold transition-all inline-flex items-center space-x-1 shadow-sm"
                    >
                      <span>श्लोक पढ़ें</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: READING HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {readingHistory.length === 0 ? (
            <p className="text-center py-10 text-xs text-gray-400">
              अभी कोई पठन इतिहास उपलब्ध नहीं है।
            </p>
          ) : (
            readingHistory.map((h, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs">
                    {h.chapter_number}.{h.verse_number}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800 font-devanagari line-clamp-1">
                      {h.text || `अध्याय ${h.chapter_number}, श्लोक ${h.verse_number}`}
                    </h5>
                    <span className="text-[10px] text-gray-400">
                      {new Date(h.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/bhagavad-gita/chapter-${h.chapter_number}/verse-${h.verse_number}`}
                  className="text-xs text-saffron-600 hover:underline font-semibold"
                >
                  फिर से पढ़ें →
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: PERSONAL NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {Object.keys(personalNotes).length === 0 ? (
            <p className="text-center py-10 text-xs text-gray-400">
              आपने अभी तक किसी श्लोक पर व्यक्तिगत नोट नहीं जोड़ा है। श्लोक पृष्ठ पर जाकर नोट लिखें।
            </p>
          ) : (
            Object.entries(personalNotes).map(([key, note]) => {
              const [c, v] = key.split('.');
              return (
                <div key={key} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-0.5 rounded">
                      अध्याय {c}, श्लोक {v} पर मेरा चिंतन
                    </span>
                    <Link
                      href={`/bhagavad-gita/chapter-${c}/verse-${v}`}
                      className="text-xs text-saffron-600 hover:underline"
                    >
                      श्लोक देखें →
                    </Link>
                  </div>
                  <p className="text-sm text-gray-700 font-devanagari leading-relaxed">
                    "{note}"
                  </p>
                </div>
              );
            })
          )}
        </div>
      )}

    </div>
  );
}

