'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  const { language } = useStore();
  const t = getTranslation(language);

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Footer Logo & Brand */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="w-8 h-8" textClassName="text-xl font-bold text-gray-900 font-devanagari" />
            </Link>
            <p className="text-xs text-gray-500 max-w-sm text-center md:text-left mt-1 font-devanagari">
              {t.footer_desc}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-600">
            <Link href="/bhagavad-gita" className="hover:text-saffron-600 transition-colors">
              {t.nav_gita}
            </Link>
            <Link href="/bhagavad-gita/chapters" className="hover:text-saffron-600 transition-colors">
              {t.nav_chapters}
            </Link>
            <Link href="/wisdom" className="hover:text-saffron-600 transition-colors">
              {t.nav_wisdom}
            </Link>
            <Link href="/topics" className="hover:text-saffron-600 transition-colors">
              {t.nav_topics}
            </Link>
            <Link href="/bookmarks" className="hover:text-saffron-600 transition-colors">
              {t.nav_bookmarks}
            </Link>
            <Link href="/about" className="hover:text-saffron-600 transition-colors">
              {t.footer_about}
            </Link>
            <Link href="/contact" className="hover:text-saffron-600 transition-colors">
              {t.footer_contact}
            </Link>
            <Link href="/admin" className="hover:text-saffron-600 transition-colors text-saffron-600 font-semibold">
              {t.nav_admin}
            </Link>
          </div>

          {/* Copyright & Dharma motto */}
          <div className="text-center md:text-right text-xs text-gray-400">
            <p>© {new Date().getFullYear()} श्लोकवाणी (Shlokvani). {t.footer_rights}</p>
            <p className="text-[11px] text-gray-400 mt-1 flex items-center justify-center md:justify-end gap-1">
              <span>यतो धर्मस्ततो जयः</span>
              <span>•</span>
              <span>Dedicated to universal wisdom</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

