'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Sliders, 
  HelpCircle,
  FileText,
  Lightbulb,
  Heart,
  Save,
  Compass
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import WordMeaningModal from '@/components/WordMeaningModal';

export default function VerseReaderClient({ verse, chapter, prevVerse, nextVerse, totalInChapter }) {
  const router = useRouter();
  const { 
    language, 
    playTrack, 
    togglePlay, 
    isPlaying, 
    currentTrack, 
    toggleBookmark, 
    isBookmarked,
    recordHistory,
    saveNote,
    personalNotes,
    fontSize,
    setFontSize
  } = useStore();

  const t = getTranslation(language);

  const [activeWord, setActiveWord] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('explanation'); // explanation | commentary | authors

  const chNum = verse.chapter_number;
  const vNum = verse.verse_number;
  const noteKey = `${chNum}.${vNum}`;

  // Record history on visit
  useEffect(() => {
    recordHistory(chNum, vNum, verse.text);
    if (personalNotes[noteKey]) {
      setNoteText(personalNotes[noteKey]);
    } else {
      setNoteText('');
    }
  }, [chNum, vNum, recordHistory, personalNotes, noteKey, verse.text]);

  // Keyboard navigation (Arrow keys for prev/next verse)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && prevVerse) {
        router.push(`/bhagavad-gita/chapter/${chNum}/verse/${prevVerse}`);
      } else if (e.key === 'ArrowRight' && nextVerse) {
        router.push(`/bhagavad-gita/chapter/${chNum}/verse/${nextVerse}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, chNum, prevVerse, nextVerse]);

  const isThisPlaying = isPlaying && currentTrack.chapterNumber === chNum && currentTrack.verseNumber === vNum;
  const bookmarked = isBookmarked(chNum, vNum);

  const handlePlayToggle = () => {
    if (isThisPlaying) {
      togglePlay();
    } else {
      playTrack({
        title: verse.text.split('\n')[0],
        subtitle: `भगवद्गीता • अध्याय ${chNum}, श्लोक ${vNum}`,
        audioUrl: verse.audio_url,
        chapterNumber: chNum,
        verseNumber: vNum,
        text: verse.text
      });
    }
  };

  const handleCopy = () => {
    const textToCopy = `${verse.text}\n\n${verse.transliteration}\n\n[Hindi]: ${verse.translation_hi}\n\n[English]: ${verse.translation_en}\n\n- Shrimad Bhagavad Gita (${chNum}.${vNum})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareData = {
      title: `Bhagavad Gita ${chNum}.${vNum}`,
      text: `${verse.text}\n\n${language === 'en' ? verse.translation_en : verse.translation_hi}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleSaveNote = () => {
    saveNote(chNum, vNum, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-xl sm:text-2xl';
      case 'lg': return 'text-2xl sm:text-3xl';
      case 'xl': return 'text-3xl sm:text-4xl';
      default: return 'text-2xl sm:text-3xl';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* ================= BREADCRUMBS & CHAPTER CONTEXT ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-saffron-600 transition-colors">
            {t.nav_home}
          </Link>
          <span>/</span>
          <Link href="/bhagavad-gita/chapters" className="hover:text-saffron-600 transition-colors">
            {t.nav_chapters}
          </Link>
          <span>/</span>
          <Link href={`/bhagavad-gita/chapter/${chNum}`} className="hover:text-saffron-600 transition-colors font-devanagari">
            अध्याय {chNum}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold font-devanagari">
            श्लोक {vNum}
          </span>
        </nav>

        {/* Font size adjuster */}
        <div className="flex items-center space-x-2 self-start sm:self-auto text-xs text-gray-500">
          <span className="text-[11px] font-semibold text-gray-400">फ़ॉन्ट आकार:</span>
          {['sm', 'md', 'lg', 'xl'].map((sz) => (
            <button
              key={sz}
              onClick={() => setFontSize(sz)}
              className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs transition-colors ${
                fontSize === sz ? 'bg-saffron-100 text-saffron-700 font-black' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
            </button>
          ))}
        </div>
      </div>

      {/* ================= VERSE CARD CONTAINER ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 relative mb-10 overflow-hidden">
        
        {/* Soft Ambient Background Highlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-saffron-50/60 to-transparent rounded-bl-full pointer-events-none" />

        {/* Top Control Bar: Chapter Tag, Bookmark, Audio & Share */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
              अध्याय {chNum}: {chapter.name} ({chapter.name_translated})
            </span>
            <span className="ml-2 text-xs font-semibold text-gray-400">
              श्लोक {vNum} of {totalInChapter}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Play Audio Recitation Button */}
            <button
              onClick={handlePlayToggle}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isThisPlaying 
                  ? 'bg-saffron-600 text-white shadow-md' 
                  : 'bg-saffron-50 text-saffron-700 hover:bg-saffron-100'
              }`}
            >
              {isThisPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="hidden sm:inline">{isThisPlaying ? 'पॉज करें' : t.listen_audio}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(verse)}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                bookmarked ? 'text-saffron-600' : 'text-gray-400 hover:text-gray-700'
              }`}
              title={bookmarked ? t.bookmarked : t.bookmark}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title={t.copy_verse}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title={t.share}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 1. ORIGINAL SANSKRIT SHLOKA ================= */}
        <div className="text-center py-6 sm:py-8 px-2 sm:px-6 relative z-10">
          <div className="w-10 h-10 rounded-full bg-saffron-50 text-saffron-600 mx-auto flex items-center justify-center font-bold mb-4 shadow-sm">
            <span className="text-xl font-devanagari select-none">ॐ</span>
          </div>

          {/* Sanskrit Text */}
          <blockquote className={`shloka-text font-serifDeva font-bold text-gray-900 leading-[2] tracking-wide ${getFontSizeClass()}`}>
            {verse.text.split('\n').map((line, idx) => (
              line.trim() ? (
                <div key={idx} className="my-1">
                  {line.trim()}
                </div>
              ) : null
            ))}
          </blockquote>

          {/* Optional Roman Transliteration */}
          {showTransliteration && verse.transliteration && (
            <div className="mt-6 pt-4 border-t border-dashed border-amber-200/80 max-w-xl mx-auto">
              <p className="text-xs sm:text-sm font-medium text-amber-900/70 italic tracking-wider leading-relaxed">
                {verse.transliteration}
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className="text-[11px] font-medium text-gray-400 hover:text-saffron-600 transition-colors"
            >
              {showTransliteration ? 'रोमन लिप्यंतरण छिपाएं (Hide Transliteration)' : 'रोमन लिप्यंतरण दिखाएं (Show Transliteration)'}
            </button>
          </div>
        </div>

      </div>

      {/* ================= 2. WORD-BY-WORD MEANINGS (PADARTHA) ================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-google border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-saffron-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-devanagari">
                {t.word_meanings}
              </h3>
              <p className="text-[11px] text-gray-400">
                प्रत्येक शब्द का प्रामाणिक अर्थ जानने के लिए किसी भी शब्द पर क्लिक करें
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Word Badges Grid */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {verse.word_meanings && verse.word_meanings.length > 0 ? (
            verse.word_meanings.map((wm, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWord(wm)}
                className="group inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-saffron-50 border border-gray-200 hover:border-saffron-300 text-left transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <div>
                  <span className="text-sm font-bold font-devanagari text-gray-900 group-hover:text-saffron-700">
                    {wm.word}
                  </span>
                  <div className="text-[11px] text-gray-500 group-hover:text-saffron-600">
                    {wm.english || wm.hindi}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-500 font-devanagari italic">
              {verse.word_meanings_text || 'पदार्थ व्याख्या उपलब्ध है।'}
            </p>
          )}
        </div>
      </section>

      {/* ================= 3 & 4. COMPLETE TRANSLATIONS (HINDI & ENGLISH) ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Hindi Translation Card */}
        <div className="bg-white rounded-3xl p-6 shadow-google border border-gray-100 relative overflow-hidden">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-saffron-700">
              सम्पूर्ण हिन्दी अनुवाद
            </h4>
          </div>
          <p className="text-sm sm:text-base text-gray-800 font-devanagari leading-relaxed">
            {verse.translation_hi}
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
            स्रोत: स्वामी रामसुखदास / स्वामी तेजोमयानंद प्रामाणिक व्याख्या
          </div>
        </div>

        {/* English Translation Card */}
        <div className="bg-white rounded-3xl p-6 shadow-google border border-gray-100 relative overflow-hidden">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Complete English Translation
            </h4>
          </div>
          <p className="text-sm sm:text-base text-gray-800 font-sans leading-relaxed">
            {verse.translation_en}
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
            Source: Swami Sivananda Divine Life Society Scholarly Translation
          </div>
        </div>

      </section>

      {/* ================= 5 & 6. DETAILED EXPLANATION & COMMENTARIES ================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-google border border-gray-100 mb-8">
        
        {/* Tabs */}
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              activeTab === 'explanation' ? 'text-saffron-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.detailed_explanation}
            {activeTab === 'explanation' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('commentary')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              activeTab === 'commentary' ? 'text-saffron-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.spiritual_interpretation}
            {activeTab === 'commentary' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Content based on tab */}
        {activeTab === 'explanation' && (
          <div className="space-y-4">
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed font-devanagari space-y-3">
              <p>{verse.explanation_hi}</p>
              {language === 'en' && (
                <p className="font-sans text-gray-700 mt-3 pt-3 border-t border-gray-100">
                  {verse.explanation_en}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'commentary' && (
          <div className="space-y-4">
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                गूढ़ आध्यात्मिक रहस्य (Inner Philosophical Essence)
              </h5>
              <p className="text-sm text-gray-800 font-devanagari leading-relaxed">
                {verse.spiritual_interpretation?.hi}
              </p>
              <p className="text-xs text-gray-600 mt-3 pt-3 border-t border-amber-200/50">
                {verse.spiritual_interpretation?.en}
              </p>
            </div>
          </div>
        )}

      </section>

      {/* ================= 7. PRACTICAL LIFE LESSONS (PERSONAL & PROFESSIONAL) ================= */}
      <section className="bg-gradient-to-br from-saffron-50/70 via-white to-amber-50/60 rounded-3xl p-6 sm:p-8 shadow-google border border-saffron-100 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-saffron-600 text-white flex items-center justify-center shadow-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-devanagari">
              {t.life_lessons}
            </h3>
            <p className="text-[11px] text-gray-500">
              दैनिक जीवन और कार्यक्षेत्र में इस श्लोक की व्यावहारिक सीख
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2">
          {(verse.life_lessons?.hi || []).map((lesson, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-saffron-100 text-saffron-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-800 font-devanagari font-medium">
                  {lesson}
                </p>
                {verse.life_lessons?.en?.[idx] && (
                  <p className="text-xs text-gray-500 mt-1">
                    {verse.life_lessons.en[idx]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PERSONAL NOTES SECTION ================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-google border border-gray-100 mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-900 font-devanagari flex items-center gap-2">
            <FileText className="w-4 h-4 text-saffron-600" />
            {t.personal_notes}
          </h3>
          {noteSaved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              सहेजा गया!
            </span>
          )}
        </div>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={t.note_placeholder}
          rows={3}
          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-saffron-500 font-devanagari"
        />

        <div className="mt-2.5 flex justify-end">
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.save_note}</span>
          </button>
        </div>
      </section>

      {/* ================= 9. PREVIOUS AND NEXT VERSE NAVIGATION ================= */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        {prevVerse ? (
          <Link
            href={`/bhagavad-gita/chapter/${chNum}/verse/${prevVerse}`}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 transition-all shadow-sm hover:border-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>पिछला श्लोक ({chNum}.{prevVerse})</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/bhagavad-gita/chapter/${chNum}`}
          className="text-xs font-semibold text-saffron-600 hover:underline"
        >
          अध्याय {chNum} की सूची
        </Link>

        {nextVerse ? (
          <Link
            href={`/bhagavad-gita/chapter/${chNum}/verse/${nextVerse}`}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <span>अगला श्लोक ({chNum}.{nextVerse})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Word Meaning Modal Popup on click */}
      <WordMeaningModal
        wordData={activeWord}
        onClose={() => setActiveWord(null)}
      />

    </div>
  );
}

