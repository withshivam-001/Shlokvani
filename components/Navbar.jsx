'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Globe, 
  Menu, 
  X, 
  Bookmark, 
  Sun, 
  Moon, 
  Play, 
  Sparkles,
  BookOpen,
  Share2,
  Sliders,
  Check
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { LANGUAGES, getTranslation } from '@/lib/i18n';
import Logo from '@/components/Logo';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    language, 
    setLanguage, 
    openSearch, 
    bookmarks, 
    playTrack,
    replayIntro 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = getTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav_home },
    { href: '/bhagavad-gita', label: t.nav_gita },
    { href: '/bhagavad-gita/chapters', label: t.nav_chapters },
    { href: '/wisdom', label: t.nav_wisdom },
    { href: '/topics', label: t.nav_topics },
    { href: '/about', label: t.nav_about },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm' 
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          
          {/* LEFT NAVIGATION ITEMS (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-saffron-600 bg-saffron-50 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* MOBILE HAMBURGER BUTTON (Left on Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* EXACT CENTERED LOGO (Preserved layout from reference) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 cursor-pointer select-none">
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo />
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-1 sm:space-x-2.5">
            {/* Global Search Button */}
            <button
              onClick={openSearch}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title={t.search_title}
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* Bookmarks Link with counter badge */}
            <Link
              href="/bookmarks"
              className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title={t.nav_bookmarks}
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              {bookmarks && bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-saffron-600 text-[10px] text-white flex items-center justify-center font-bold">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Language Selector Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-2.5 py-1 text-xs font-semibold rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-1"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span className="uppercase">{language}</span>
              </button>

              {/* Language Selection Modal Dropdown */}
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 divide-y divide-gray-50"
                  >
                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Select Language / भाषा चुनें
                    </div>
                    <div className="py-1">
                      {LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setLangMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                              isSelected 
                                ? 'bg-saffron-50 text-saffron-700 font-semibold' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span>{lang.flag}</span>
                              <span className="font-medium">{lang.name}</span>
                              <span className="text-gray-400 text-[11px]">({lang.englishName})</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-saffron-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Listen Button (Google minimal pill) */}
            <button
              onClick={() => {
                playTrack({
                  title: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
                  subtitle: 'श्रीमद्भगवद्गीता • अध्याय 2, श्लोक 47',
                  audioUrl: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/03%20Sankhya%20Yogam.mp3',
                  chapterNumber: 2,
                  verseNumber: 47,
                  text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥'
                });
              }}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.start_listening}</span>
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                      isActive 
                        ? 'text-saffron-600 bg-saffron-50 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/bookmarks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-saffron-600" />
                    {t.nav_bookmarks}
                  </span>
                  {bookmarks.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-saffron-100 text-saffron-700 text-xs font-bold">
                      {bookmarks.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    replayIntro();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 text-left flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  {t.replay_intro}
                </button>

                <button
                  onClick={() => {
                    playTrack({
                      title: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
                      subtitle: 'श्रीमद्भगवद्गीता • अध्याय 2, श्लोक 47',
                      audioUrl: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/03%20Sankhya%20Yogam.mp3',
                      chapterNumber: 2,
                      verseNumber: 47,
                    });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2.5 rounded-full bg-saffron-600 text-white font-medium text-sm flex items-center justify-center space-x-2 mt-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.start_listening}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

