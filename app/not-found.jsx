import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Home } from 'lucide-react';

export const metadata = {
  title: 'पृष्ठ प्राप्त नहीं हुआ (404) – Shlokvani',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-saffron-50 text-saffron-600 flex items-center justify-center mb-6 shadow-sm">
        <span className="text-3xl font-devanagari font-bold select-none">ॐ</span>
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100 mb-3">
        404 • पृष्ठ प्राप्त नहीं हुआ
      </span>

      <h1 className="text-3xl sm:text-4xl font-bold font-devanagari text-gray-900 mb-3">
        अन्वेषण का मार्ग परिवर्तित करें
      </h1>

      <blockquote className="text-sm sm:text-base text-gray-600 font-devanagari italic max-w-md mx-auto mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        "नासतो विद्यते भावो नाभावो विद्यते सतः।<br />
        उभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥"<br />
        <span className="text-xs text-gray-400 not-italic block mt-1">— श्रीमद्भगवद्गीता २.१६</span>
      </blockquote>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs sm:text-sm font-semibold shadow-sm inline-flex items-center space-x-1.5 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर लौटें</span>
        </Link>

        <Link
          href="/bhagavad-gita/chapters"
          className="px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 inline-flex items-center space-x-1.5 transition-all"
        >
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span>सभी 18 अध्याय देखें</span>
        </Link>
      </div>
    </div>
  );
}

