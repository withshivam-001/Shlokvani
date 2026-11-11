'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Bookmark, 
  Sparkles,
  Search,
  Sliders
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function ChapterClient({ chapter, verses }) {
  const { 
    language, 
    playTrack, 
    togglePlay, 
    isPlaying, 
    currentTrack, 
    toggleBookmark, 
    isBookmarked 
  } = useStore();

  const t = getTranslation(language);
  const [filterText, setFilterText] = useState('');

  const chNum = chapter.chapter_number;
  const isChapterPlaying = isPlaying && currentTrack.chapterNumber === chNum;

  const filteredVerses = verses.filter(v => {
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    const vMatch = String(v.verse_number) === q;
    const textMatch = v.text.toLowerCase().includes(q);
    const hiMatch = v.translation_hi.toLowerCase().includes(q);
    const enMatch = v.translation_en.toLowerCase().includes(q);
    return vMatch || textMatch || hiMatch || enMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 font-medium mb-6">
        <Link href="/" className="hover:text-saffron-600 transition-colors">
          {t.nav_home}
        </Link>
        <span>/</span>
        <Link href="/bhagavad-gita/chapters" className="hover:text-saffron-600 transition-colors">
          {t.nav_chapters}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold font-devanagari">
          अध्याय {chNum}
        </span>
      </nav>

      {/* Chapter Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 relative overflow-hidden mb-12">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-saffron-100/70 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
              अध्याय {chNum}
            </span>
            <span className="text-xs font-semibold text-gray-400">
              {chapter.verses_count} {t.verses}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-devanagari text-gray-900 tracking-tight mb-2">
            {chapter.name}
          </h1>

          <p className="text-base sm:text-lg font-semibold text-saffron-700 mb-4">
            {chapter.name_translated} • {chapter.name_hindi}
          </p>

          <p className="text-sm sm:text-base text-gray-600 font-devanagari leading-relaxed mb-6">
            {language === 'en' ? chapter.chapter_summary : chapter.chapter_summary_hindi}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const firstVerse = verses[0];
                playTrack({
                  title: `${chapter.name} - सम्पूर्ण अध्याय पाठ`,
                  subtitle: `श्रीमद्भगवद्गीता • अध्याय ${chNum}`,
                  audioUrl: firstVerse?.audio_url || '',
                  chapterNumber: chNum,
                  verseNumber: 1,
                });
              }}
              className="px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shadow-md active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>सम्पूर्ण अध्याय सुनें (Full Chapter Audio)</span>
            </button>

            <Link
              href={`/bhagavad-gita/chapter/${chNum}/verse/1`}
              className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all"
            >
              <BookOpen className="w-4 h-4 text-gray-600" />
              <span>प्रथम श्लोक से पढ़ना शुरू करें</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Verses List Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-devanagari">
            अध्याय {chNum} के सभी {chapter.verses_count} श्लोक
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            किसी भी श्लोक पर क्लिक कर उसका पदच्छेद, शब्दार्थ व विस्तृत व्याख्या पढ़ें
          </p>
        </div>

        {/* Filter input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="श्लोक संख्या या शब्द खोजें..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:border-saffron-500"
          />
        </div>
      </div>

      {/* Verses Grid / List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVerses.map((v) => {
          const isThisPlaying = isPlaying && currentTrack.chapterNumber === chNum && currentTrack.verseNumber === v.verse_number;
          const bookmarked = isBookmarked(chNum, v.verse_number);

          return (
            <div
              key={v.verse_number}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-google-hover transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-4">
                <span className="w-9 h-9 rounded-xl bg-saffron-50 text-saffron-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                  {v.verse_number}
                </span>

                <div>
                  <h4 className="text-base font-bold font-devanagari text-gray-900 group-hover:text-saffron-600 transition-colors line-clamp-1">
                    "{v.text.split('\n')[0]}"
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 font-devanagari">
                    {language === 'en' ? v.translation_en : v.translation_hi}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => {
                    playTrack({
                      title: v.text.split('\n')[0],
                      subtitle: `भगवद्गीता • अध्याय ${chNum}, श्लोक ${v.verse_number}`,
                      audioUrl: v.audio_url,
                      chapterNumber: chNum,
                      verseNumber: v.verse_number,
                      text: v.text
                    });
                  }}
                  className="p-2 rounded-full text-gray-400 hover:text-saffron-600 hover:bg-saffron-50 transition-colors"
                  title={t.listen_audio}
                >
                  {isThisPlaying ? (
                    <Pause className="w-4 h-4 fill-current text-saffron-600" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <button
                  onClick={() => toggleBookmark(v)}
                  className="p-2 rounded-full text-gray-400 hover:text-saffron-600 hover:bg-saffron-50 transition-colors"
                  title={bookmarked ? t.bookmarked : t.bookmark}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-saffron-600 text-saffron-600' : ''}`} />
                </button>

                <Link
                  href={`/bhagavad-gita/chapter/${chNum}/verse/${v.verse_number}`}
                  className="px-4 py-2 rounded-full bg-gray-50 group-hover:bg-saffron-600 group-hover:text-white text-gray-700 text-xs font-semibold transition-all inline-flex items-center space-x-1"
                >
                  <span>{t.read_verse}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Chapter Switcher */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
        {chNum > 1 ? (
          <Link
            href={`/bhagavad-gita/chapter/${chNum - 1}`}
            className="px-4 py-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 inline-flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>अध्याय {chNum - 1}</span>
          </Link>
        ) : <div />}

        <Link
          href="/bhagavad-gita/chapters"
          className="text-xs font-bold text-saffron-600 hover:underline"
        >
          समस्त अध्याय सूची
        </Link>

        {chNum < 18 ? (
          <Link
            href={`/bhagavad-gita/chapter/${chNum + 1}`}
            className="px-4 py-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 inline-flex items-center space-x-1"
          >
            <span>अध्याय {chNum + 1}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>

    </div>
  );
}

