'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  Bookmark, 
  Compass, 
  Heart, 
  Shield, 
  Flame, 
  Wind, 
  Eye, 
  Crown, 
  Sun, 
  BookOpen, 
  Award, 
  Feather 
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function TopicsClient({ topics }) {
  const { language, playTrack, toggleBookmark, isBookmarked } = useStore();
  const t = getTranslation(language);
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 'karma');

  const activeTopic = topics.find(tp => tp.id === selectedTopicId) || topics[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
          विषय-आधारित अध्ययन (Topic Collections)
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-devanagari text-gray-900 tracking-tight mt-3">
          जीवन की चुनौतियों के लिए गीता मार्गदर्शन
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 font-devanagari">
          क्रोध, तनाव, संशय, नेतृत्व और आंतरिक शांति से जुड़े प्रासंगिक श्लोक एवं व्यावहारिक समाधान।
        </p>
      </div>

      {/* Topics Horizontal Switcher Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {topics.map((tp) => {
          const isSelected = tp.id === selectedTopicId;
          return (
            <button
              key={tp.id}
              onClick={() => setSelectedTopicId(tp.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                isSelected 
                  ? 'bg-saffron-600 text-white shadow-md scale-105' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {language === 'en' ? tp.title_en : tp.title_hi}
            </button>
          );
        })}
      </div>

      {/* Selected Topic Detailed Overview */}
      {activeTopic && (
        <div id={activeTopic.id} className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 mb-10">
          
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-3 py-1 rounded-md">
              {activeTopic.verse_refs?.length || 0} चयनित श्लोक
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-gray-900 mt-2">
              {language === 'en' ? activeTopic.title_en : activeTopic.title_hi}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-devanagari mt-2 leading-relaxed">
              {language === 'en' ? activeTopic.description_en : activeTopic.description_hi}
            </p>
          </div>

          {/* Verses inside this topic */}
          <div className="space-y-4">
            {(activeTopic.verses || []).map((v) => {
              const bookmarked = isBookmarked(v.chapter_number, v.verse_number);
              return (
                <div
                  key={`${v.chapter_number}.${v.verse_number}`}
                  className="bg-gray-50/70 hover:bg-gray-50 rounded-2xl p-5 border border-gray-100 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-bold text-saffron-700 bg-white px-2.5 py-0.5 rounded-full border border-saffron-200 shadow-sm">
                          अध्याय {v.chapter_number}, श्लोक {v.verse_number}
                        </span>
                      </div>

                      <blockquote className="text-base sm:text-lg font-bold font-devanagari text-gray-900 group-hover:text-saffron-700 transition-colors">
                        "{v.text.split('\n')[0]}"
                      </blockquote>

                      <p className="text-xs sm:text-sm text-gray-600 mt-2 font-devanagari leading-relaxed">
                        {language === 'en' ? v.translation_en : v.translation_hi}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
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
                        className="p-2 rounded-full text-gray-500 hover:text-saffron-600 hover:bg-white transition-colors"
                        title={t.listen_audio}
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => toggleBookmark(v)}
                        className="p-2 rounded-full text-gray-500 hover:text-saffron-600 hover:bg-white transition-colors"
                        title={bookmarked ? t.bookmarked : t.bookmark}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-saffron-600 text-saffron-600' : ''}`} />
                      </button>

                      <Link
                        href={`/bhagavad-gita/chapter-${v.chapter_number}/verse-${v.verse_number}`}
                        className="px-3.5 py-1.5 rounded-full bg-white group-hover:bg-saffron-600 group-hover:text-white border border-gray-200 group-hover:border-saffron-600 text-xs font-semibold text-gray-700 transition-all inline-flex items-center space-x-1"
                      >
                        <span>{t.read_verse}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}

