'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  BookOpen,
  Bookmark,
  Share2,
  ArrowRight,
  Sparkles,
  Flame,
  Compass,
  Heart,
  Check,
  Sliders,
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

// Background image: file public/Banner.png me honi chahiye
const BG_IMAGE = '/Banner.png';

export default function HomeClient({ chapters, dailyVerse, popularVerses, topics }) {
  const {
    language,
    playTrack,
    togglePlay,
    isPlaying,
    currentTrack,
    toggleBookmark,
    isBookmarked,
    lastRead,
    readingStreak
  } = useStore();

  const t = getTranslation(language);
  const [copied, setCopied] = useState(false);

  // Active hero verse (defaulting to Gita 2.47)
  const heroVerse = dailyVerse || {
    chapter_number: 2,
    verse_number: 47,
    text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation_hi: "आपका अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्मफल की इच्छा मत रखो और कर्म न करने में आसक्ति मत रखो।",
    translation_en: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
    audio_url: "https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/03%20Sankhya%20Yogam.mp3"
  };

  const isHeroPlaying = isPlaying && currentTrack.chapterNumber === heroVerse.chapter_number && currentTrack.verseNumber === heroVerse.verse_number;
  const isHeroBookmarked = isBookmarked(heroVerse.chapter_number, heroVerse.verse_number);

  const handleHeroPlay = () => {
    if (isHeroPlaying) {
      togglePlay();
    } else {
      playTrack({
        title: heroVerse.text.split('\n')[0],
        subtitle: `भगवद्गीता • अध्याय ${heroVerse.chapter_number}, श्लोक ${heroVerse.verse_number}`,
        audioUrl: heroVerse.audio_url,
        chapterNumber: heroVerse.chapter_number,
        verseNumber: heroVerse.verse_number,
        text: heroVerse.text
      });
    }
  };

  const handleShare = (verse) => {
    const text = `🕉️ ${verse.text}\n\n${language === 'en' ? verse.translation_en : verse.translation_hi}\n\n- श्रीमद्भगवद्गीता (${verse.chapter_number}.${verse.verse_number})`;
    if (navigator.share) {
      navigator.share({ title: 'Shlokvani', text }).catch(() => { });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const headingContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const headingWord = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* ================= PAGE BACKGROUND IMAGE ================= */}
      {/* <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url('${BG_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      /> */}
      {/* Halka white + saffron overlay taaki text padhne me aaye.
          Image zyada dikhani ho to /50 /40 /60 ko aur kam kijiye. */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/50 via-white/40 to-saffron-50/60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">

        {/* ================= SECTION A: HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">

          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-saffron-50 border border-saffron-100 text-saffron-700 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
              <span>{t.hero_badge}</span>
            </div>

            {/* Headline */}
            <motion.h1
              variants={headingContainer}
              initial="hidden"
              animate="show"
              className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2] font-devanagari"
            >
              <motion.span variants={headingWord} className="inline-block">प्राचीन</motion.span>{' '}
              <motion.span variants={headingWord} className="inline-block">ज्ञान</motion.span>{' '}
              <motion.span variants={headingWord} className="inline-block">और</motion.span>
              <br className="hidden sm:inline" />
              <motion.span
                variants={headingWord}
                className="inline-block text-saffron-600 decoration-saffron-200 decoration-wavy underline-offset-8"
              >
                आध्यात्मिक श्लोकों
              </motion.span>{' '}
              <motion.span variants={headingWord} className="inline-block">की</motion.span>{' '}
              <motion.span variants={headingWord} className="inline-block">वाणी</motion.span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl font-devanagari">
              {language === 'en' ? t.hero_desc : 'श्रीमद्भगवद्गीता के सभी 18 अध्याय और 700 मूल संस्कृत श्लोक, पदच्छेद, शब्दार्थ, सरल हिन्दी व अंग्रेजी व्याख्या और जीवनोपयोगी संदेश के साथ।'}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleHeroPlay}
                className="px-6 py-3.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isHeroPlaying ? 'श्लोक पॉज करें' : 'अभी श्लोक सुनें'}</span>
              </button>

              <Link
                href="/bhagavad-gita/chapters"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium text-sm transition-all text-center flex items-center justify-center space-x-2 hover:border-gray-400"
              >
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span>{t.explore_gita}</span>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="pt-6 border-t border-gray-200/80 flex items-center space-x-6 sm:space-x-8 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 text-base">700</span>
                <span>{t.stat_verses}</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 text-base">18</span>
                <span>सम्पूर्ण अध्याय</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <span className="font-bold text-emerald-600 text-base">100%</span>
                <span>निःशुल्क व प्रामाणिक</span>
              </div>
            </div>
          </div>

          {/* Right Hero Player Card (Elevated Design reference from HTML) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-google hover:shadow-google-hover transition-shadow duration-300 border border-gray-100 relative overflow-hidden">

              {/* Soft Ambient Glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-saffron-100 rounded-full blur-2xl opacity-70 pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-500" />
                  {t.verse_of_the_day}
                </span>
                <div className="flex items-center space-x-1.5 text-gray-400">
                  <button
                    onClick={() => toggleBookmark(heroVerse)}
                    className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${isHeroBookmarked ? 'text-saffron-600' : 'hover:text-saffron-600'
                      }`}
                    title={isHeroBookmarked ? t.bookmarked : t.bookmark}
                  >
                    <Bookmark className={`w-4 h-4 ${isHeroBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleShare(heroVerse)}
                    className="p-1.5 rounded-lg hover:bg-gray-50 hover:text-saffron-600 transition-colors"
                    title={t.share}
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Active Shlok Content */}
              <div className="space-y-4 mb-6">
                <div className="text-xs text-gray-500 font-medium tracking-wide">
                  भगवद्गीता • अध्याय {heroVerse.chapter_number}, श्लोक {heroVerse.verse_number}
                </div>

                <blockquote className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug font-devanagari tracking-wide">
                  "{heroVerse.text}"
                </blockquote>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100 font-devanagari">
                  <strong className="text-gray-900">{t.simple_meaning}: </strong>
                  {language === 'en' ? heroVerse.translation_en : heroVerse.translation_hi}
                </p>
              </div>

              {/* Animated Waveform Indicator */}
              <div className="flex items-center justify-center space-x-1.5 h-10 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 mb-6">
                <div className={`wave-bar w-1 bg-saffron-500 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-1' : 'h-1.5'}`} />
                <div className={`wave-bar w-1 bg-saffron-500 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-2' : 'h-1.5'}`} />
                <div className={`wave-bar w-1 bg-saffron-400 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-3' : 'h-1.5'}`} />
                <div className={`wave-bar w-1 bg-saffron-600 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-4' : 'h-1.5'}`} />
                <div className={`wave-bar w-1 bg-saffron-500 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-5' : 'h-1.5'}`} />
                <div className={`wave-bar w-1 bg-saffron-400 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-2' : 'h-1.5'}`} />
                <div className={`wave-bar w-1 bg-saffron-500 rounded-full transition-all duration-300 ${isHeroPlaying ? 'animate-wave-1' : 'h-1.5'}`} />
              </div>

              {/* Interactive Play Bar Controls */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-500 font-medium flex items-center space-x-1">
                  <Sliders className="w-3.5 h-3.5 text-gray-400" />
                  <span>गति: 1.0x</span>
                </span>

                <button
                  onClick={handleHeroPlay}
                  className="w-14 h-14 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none"
                  title={isHeroPlaying ? "Pause" : "Play"}
                >
                  {isHeroPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                <Link
                  href={`/bhagavad-gita/chapter-${heroVerse.chapter_number}/verse-${heroVerse.verse_number}`}
                  className="text-xs text-saffron-600 hover:underline font-semibold flex items-center space-x-1 group"
                >
                  <span>विस्तार से पढ़ें</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </section>

        {/* ================= SECTION F: CONTINUE READING BANNER ================= */}
        {lastRead && (
          <section className="mb-14">
            <div className="bg-gradient-to-r from-saffron-50 via-white to-amber-50 rounded-2xl p-4 sm:p-5 border border-saffron-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-saffron-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-700">
                    {t.continue_reading} • अध्याय {lastRead.chapter}, श्लोक {lastRead.verse}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium font-devanagari mt-0.5">
                    आपने यहाँ तक अध्ययन किया था। अपनी आध्यात्मिक यात्रा आगे बढ़ाएं।
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                  <Flame className="w-3.5 h-3.5 text-saffron-500" />
                  <span>{readingStreak} {t.days} Streak</span>
                </span>

                <Link
                  href={`/bhagavad-gita/chapter-${lastRead.chapter}/verse-${lastRead.verse}`}
                  className="px-4 py-2 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center space-x-1"
                >
                  <span>जारी रखें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ================= SECTION C: EXPLORE BHAGAVAD GITA (ALL 18 CHAPTERS) ================= */}
        <section id="chapters" className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-devanagari">
                {t.chapters_title}
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-devanagari">
                {t.chapters_sub}
              </p>
            </div>
            <Link
              href="/bhagavad-gita/chapters"
              className="text-xs sm:text-sm font-semibold text-saffron-600 hover:text-saffron-700 hover:underline flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>सभी 18 अध्याय देखें</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Chapters Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch) => (
              <div
                key={ch.chapter_number}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-google-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Chapter Number Badge & Verses Count */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-md">
                      अध्याय {ch.chapter_number}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {ch.verses_count} {t.verses}
                    </span>
                  </div>

                  {/* Sanskrit & English Names */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-saffron-600 transition-colors font-devanagari mb-1">
                    {ch.name}
                  </h3>
                  <p className="text-xs text-saffron-700 font-medium mb-3">
                    {ch.name_translated} • {ch.name_hindi}
                  </p>

                  {/* Summary */}
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4 font-devanagari">
                    {language === 'en' ? ch.chapter_summary : ch.chapter_summary_hindi}
                  </p>
                </div>

                {/* Bottom Explore Button */}
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
        </section>

        {/* ================= SECTION D: DAILY WISDOM & SPIRITUAL TEACHINGS ================= */}
        <section className="mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-amber-50/70 via-white to-saffron-50/60 rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-sm">

            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-100/60 px-3 py-1 rounded-full">
                {t.daily_wisdom}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-devanagari mt-3">
                {t.daily_wisdom_sub}
              </h2>
              <p className="text-sm text-gray-600 mt-2 font-devanagari">
                जीवन के हर संशय, भय और तनाव का समाधान भगवान श्रीकृष्ण के इन शाश्वत उपदेशों में समाहित है।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Wisdom Card 1: Karma & Dharma */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-saffron-600 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 font-devanagari mb-2">
                  कर्म और धर्म (Karma & Dharma)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-devanagari">
                  "कर्म में अधिकार है, फल में कभी नहीं।" अपने कर्तव्यों को पूरी निष्ठा से निभाएं, परिणाम की चिंता को ईश्वर पर छोड़ दें।
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-saffron-600 font-semibold">
                  अध्याय 2, श्लोक 47
                </div>
              </div>

              {/* Wisdom Card 2: Mind Control */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 font-devanagari mb-2">
                  मन का निग्रह (Mind Mastery)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-devanagari">
                  "अभ्यास और वैराग्य से चंचल मन भी वश में आ जाता है।" मन आपका सबसे सच्चा मित्र भी बन सकता है और सबसे बड़ा शत्रु भी।
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-saffron-600 font-semibold">
                  अध्याय 6, श्लोक 35
                </div>
              </div>

              {/* Wisdom Card 3: Peace & Equanimity */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 font-devanagari mb-2">
                  शांति और समत्व (Peace & Joy)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-devanagari">
                  "सुख-दुःख में समभाव ही योग है।" जो लाभ-हानि, मान-अपमान में संतुलित रहता है, वही सच्चा ज्ञानी और परमानंद का भागीदार है।
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-saffron-600 font-semibold">
                  अध्याय 2, श्लोक 48
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ================= SECTION E: POPULAR SHLOKAS ================= */}
        <section className="mb-16 sm:mb-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-devanagari">
                  {t.popular_shlokas}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-devanagari">
                  प्राचीन ऋषियों द्वारा पूजित सर्वाधिक प्रभावशाली श्लोक
                </p>
              </div>
              <Link
                href="/bhagavad-gita/chapters"
                className="text-xs sm:text-sm font-semibold text-saffron-600 hover:underline"
              >
                सभी 700 श्लोक देखें →
              </Link>
            </div>

            {/* List of Popular Shlokas */}
            <div className="divide-y divide-gray-100">
              {popularVerses.map((v) => {
                const isThisPlaying = isPlaying && currentTrack.chapterNumber === v.chapter_number && currentTrack.verseNumber === v.verse_number;
                return (
                  <div
                    key={`${v.chapter_number}.${v.verse_number}`}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 rounded-2xl px-3 sm:px-4 transition-colors group"
                  >
                    <div className="flex items-start sm:items-center space-x-4">
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
                        className="w-11 h-11 rounded-full bg-saffron-50 text-saffron-600 group-hover:bg-saffron-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-sm"
                        title={t.listen_audio}
                      >
                        {isThisPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[11px] font-bold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded">
                            अध्याय {v.chapter_number}, श्लोक {v.verse_number}
                          </span>
                        </div>
                        <h4 className="text-base font-bold font-devanagari text-gray-900 group-hover:text-saffron-600 transition-colors">
                          "{v.text.split('\n')[0]}"
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-devanagari">
                          {language === 'en' ? v.translation_en : v.translation_hi}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => toggleBookmark(v)}
                        className="p-2 text-gray-400 hover:text-saffron-600 transition-colors"
                        title={t.bookmark}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked(v.chapter_number, v.verse_number) ? 'fill-saffron-600 text-saffron-600' : ''}`} />
                      </button>
                      <Link
                        href={`/bhagavad-gita/chapter-${v.chapter_number}/verse-${v.verse_number}`}
                        className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-saffron-50 text-gray-700 hover:text-saffron-700 text-xs font-medium transition-colors inline-flex items-center space-x-1"
                      >
                        <span>{t.read_verse}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= TOPICS COLLECTION PREVIEW ================= */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-devanagari">
                {t.nav_topics}
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-devanagari">
                जीवन की प्रत्येक चुनौती के लिए गीता का विशेष मार्गदर्शन
              </p>
            </div>
            <Link
              href="/topics"
              className="text-xs sm:text-sm font-semibold text-saffron-600 hover:underline"
            >
              सभी विषय देखें →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {topics.slice(0, 8).map((topic) => (
              <Link
                key={topic.id}
                href={`/topics#${topic.id}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-google-hover transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-saffron-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 group-hover:text-saffron-600 transition-colors font-devanagari mb-1">
                    {language === 'en' ? topic.title_en : topic.title_hi}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-devanagari">
                    {language === 'en' ? topic.description_en : topic.description_hi}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-saffron-600 mt-3">
                  <span>{topic.verse_refs?.length || 5} श्लोक संग्रह</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
