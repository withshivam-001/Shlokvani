import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, Heart, Shield, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'हमारे बारे में – Shlokvani (श्लोकवाणी)',
  description: 'श्लोकवाणी का उद्देश्य सम्पूर्ण श्रीमद्भगवद्गीता और वैदिक ज्ञान को आधुनिक तकनीक और शुद्ध सौंदर्य के साथ जन-जन तक पहुँचाना है।',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
          हमारा संकल्प एवं उद्देश्य
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-devanagari text-gray-900 mt-3">
          श्लोकवाणी (Shlokvani) के बारे में
        </h1>
        <p className="text-base text-gray-600 mt-3 font-devanagari">
          प्राचीन ज्ञान। शाश्वत मार्गदर्शन। (Ancient Wisdom. Timeless Guidance.)
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 space-y-6 text-gray-700 font-devanagari text-sm sm:text-base leading-relaxed mb-12">
        <h2 className="text-2xl font-bold text-gray-900">
          हमारा विज़न (Our Vision)
        </h2>
        <p>
          श्लोकवाणी का ध्येय श्रीमद्भगवद्गीता के सभी 18 अध्यायों और 700 मूल संस्कृत श्लोकों को एक अत्यंत निर्मल, शांत, आधुनिक और विज्ञापन-मुक्त डिजिटल अनुभव में प्रस्तुत करना है।
        </p>
        <p>
          हमने प्रत्येक श्लोक का मूल संस्कृत पाठ, शुद्ध अन्वय, पदच्छेद (शब्दार्थ), सरल हिन्दी अनुवाद, अंग्रेजी अनुवाद, स्वामी चिन्मयानंद व स्वामी शिवानन्द की दार्शनिक व्याख्या, तथा आधुनिक जीवन में उपयोगी व्यावहारिक सीख (Practical Life Lessons) को एक स्थान पर संकलित किया है।
        </p>

        <h3 className="text-xl font-bold text-gray-900 pt-4">
          हमारी प्रमुख विशेषताएं (Key Features)
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
            <span><strong>सम्पूर्ण 700 श्लोक:</strong> कोई अधूरा या प्रतिनिधि नमूना नहीं, बल्कि आदि से अंत तक संपूर्ण प्रामाणिक ग्रंथ।</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
            <span><strong>इंटरैक्टिव पदार्थ (Word-by-word breakdown):</strong> किसी भी संस्कृत शब्द पर क्लिक करके उसका व्याकरण, उच्चारण और बहुभाषिक अर्थ जानें।</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
            <span><strong>16 भाषाओं में समर्थन:</strong> हिन्दी, अंग्रेजी, संस्कृत, बांग्ला, तमिल, तेलुगु, मराठी, गुजराती, कन्नड़, मलयालम, पंजाबी, फ्रेंच, जर्मन, स्पैनिश, अरबी व जापानी।</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
            <span><strong>वास्तविक ऑडियो पाठ:</strong> बिना किसी कृत्रिम ऑसिलेटर के प्रामाणिक वैदिक संस्कृत पाठ एवं वाचन।</span>
          </li>
        </ul>
      </div>

    </div>
  );
}

