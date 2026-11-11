import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Lightbulb, Heart, Shield, Compass, HelpCircle } from 'lucide-react';
import { getPopularVerses } from '@/lib/gitaService';

export const metadata = {
  title: 'दैनिक ज्ञान एवं आध्यात्मिक विचार – Shlokvani Wisdom',
  description: 'श्रीमद्भगवद्गीता के अनमोल उपदेश, जीवन दर्शन, सुविचार और आध्यात्मिक मार्गदर्शन।',
};

export default async function WisdomPage() {
  const popular = await getPopularVerses(6);

  const gitaQnA = [
    {
      q: "जब मन अत्यधिक अशांत और विचलित हो, तो क्या करना चाहिए?",
      a: "भगवान श्रीकृष्ण अध्याय 6, श्लोक 35 में कहते हैं: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्। अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥' मन निसंदेह चंचल है, परन्तु निरंतर अभ्यास और वैराग्य (अनासक्ति) द्वारा इसे पूर्णतः वश में किया जा सकता है।",
      ref: "अध्याय 6, श्लोक 35"
    },
    {
      q: "कर्म का फल हमारे हाथ में क्यों नहीं है?",
      a: "अध्याय 2, श्लोक 47 में श्रीकृष्ण सिखाते हैं कि भविष्य और परिणाम असंख्य प्राकृतिक एवं बाह्य कारकों पर निर्भर करते हैं, जिन पर हमारा नियंत्रण नहीं हो सकता। हमारा पूर्ण नियंत्रण केवल अपने प्रयास, समर्पण और वर्तमान कर्म पर है। अतः फल की चिंता किए बिना कर्म करना ही वास्तविक शांति देता है।",
      ref: "अध्याय 2, श्लोक 47"
    },
    {
      q: "क्रोध और अवसाद से कैसे बचा जाए?",
      a: "अध्याय 2, श्लोक 62-63 के अनुसार कामना और आसक्ति से क्रोध का जन्म होता है। क्रोध से सम्मोह (बुद्धि का भ्रम) होता है और बुद्धि नष्ट होने से मनुष्य का पतन हो जाता है। अतः अपनी अपेक्षाओं को सीमित रखना और समत्व भाव अपनाना ही क्रोध का अंत करता है।",
      ref: "अध्याय 2, श्लोक 62-63"
    },
    {
      q: "जीवन में सच्चा सुख कहाँ है?",
      a: "अध्याय 5, श्लोक 21 में श्रीकृष्ण कहते हैं कि जो पुरुष बाह्य विषयों में अनासक्त होकर अपनी अंतरात्मा में ही सुख का अनुभव करता है, वह ब्रह्मयोग में स्थित होकर अक्षय आनंद को प्राप्त होता है।",
      ref: "अध्याय 5, श्लोक 21"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-100">
          दैनिक सुविचार एवं जीवन दर्शन
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-devanagari text-gray-900 tracking-tight mt-4">
          भगवद्गीता के अमर जीवनोपदेश
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-4 font-devanagari leading-relaxed">
          आधुनिक जीवन की उलझनों के लिए भगवान श्रीकृष्ण के कालजयी सूत्र
        </p>
      </div>

      {/* Daily Thought Featured Card */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-saffron-50 rounded-3xl p-6 sm:p-10 shadow-google border border-amber-100 mb-12 relative overflow-hidden">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-100/60 px-3 py-1 rounded-full">
          आज का प्रेरक विचार
        </span>

        <blockquote className="text-xl sm:text-3xl font-semibold font-serifDeva text-gray-900 leading-snug mt-4 mb-3">
          "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।<br />
          न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥"
        </blockquote>

        <p className="text-sm sm:text-base text-gray-700 font-devanagari leading-relaxed max-w-2xl">
          <strong>मर्म:</strong> आत्मा को न शस्त्र काट सकते हैं, न आग जला सकती है, न जल गला सकता है और न वायु सुखा सकती है। जब आप अपनी अविनाशी आत्मा को पहचान लेते हैं, तब कोई भी सांसारिक भय आपको पराजित नहीं कर सकता।
        </p>

        <div className="mt-6 flex items-center space-x-3 text-xs font-semibold text-saffron-700">
          <span>श्रीमद्भगवद्गीता • अध्याय 2, श्लोक 23</span>
          <Link href="/bhagavad-gita/chapter-2/verse-23" className="hover:underline flex items-center">
            पढ़ें →
          </Link>
        </div>
      </div>

      {/* Gita Questions & Answers Section */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold font-devanagari text-gray-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-saffron-600" />
          जीवन की प्रमुख जिज्ञासाएं और गीता के उत्तर
        </h2>

        <div className="space-y-4">
          {gitaQnA.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-base font-bold font-devanagari text-gray-900 mb-2">
                प्र. {item.q}
              </h4>
              <p className="text-sm text-gray-600 font-devanagari leading-relaxed">
                {item.a}
              </p>
              <div className="mt-3 text-xs font-semibold text-saffron-600">
                {item.ref}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

