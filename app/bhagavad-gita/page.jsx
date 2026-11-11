import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, Play, Heart, Award, Shield } from 'lucide-react';

export const metadata = {
  title: 'श्रीमद्भगवद्गीता परिचय एवं दर्शन – Shlokvani',
  description: 'श्रीमद्भगवद्गीता का सम्पूर्ण परिचय, ऐतिहासिक पृष्ठभूमि, और आधुनिक जीवन में इसकी शाश्वत प्रासंगिकता।',
};

export default function BhagavadGitaIntroPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Hero Badge & Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-100">
          सनातन ज्ञान दर्शन
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-devanagari text-gray-900 tracking-tight mt-4">
          श्रीमद्भगवद्गीता का दिव्य दर्शन
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-4 font-devanagari leading-relaxed">
          जीवन, कर्तव्य और मुक्ति का संपूर्ण विज्ञान — कुरुक्षेत्र की रणभूमि में भगवान श्रीकृष्ण द्वारा अर्जुन को दिया गया अमर उपदेश।
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/bhagavad-gita/chapter/1/verse/1"
            className="px-6 py-3 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <span>प्रथम श्लोक से पठन आरंभ करें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/bhagavad-gita/chapters"
            className="px-6 py-3 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold text-sm transition-all"
          >
            सभी 18 अध्याय देखें
          </Link>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 mb-12 space-y-6 text-gray-700 font-devanagari leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-bold text-gray-900">
          गीता क्या है? (What is Bhagavad Gita?)
        </h2>
        <p>
          श्रीमद्भगवद्गीता महाभारत के भीष्मपर्व का अंग है। इसमें कुल 18 अध्याय और 700 श्लोक हैं। यह केवल एक धार्मिक ग्रंथ नहीं, अपितु मानव मनोविज्ञान, कर्तव्यशास्त्र और आत्म-साक्षात्कार का सार्वभौमिक संविधान है।
        </p>
        <p>
          कुरुक्षेत्र के युद्धक्षेत्र में जब महारथी अर्जुन अपनों के प्रति मोह, विषाद और संशय से घिरकर गाण्डीव रख देते हैं, तब योगेश्वर भगवान श्रीकृष्ण उनके सखा और गुरु बनकर आत्मा की अमरता, कर्मयोग का रहस्य और जीवन का सर्वोच्च लक्ष्य स्पष्ट करते हैं।
        </p>
      </div>

      {/* The 3 Pillars (Three Shatkas) */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 font-devanagari text-center mb-8">
          गीता के तीन स्तम्भ (The 3 Shatkas of Gita)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-saffron-700 font-bold flex items-center justify-center text-sm mb-4">
              १
            </span>
            <h4 className="text-lg font-bold text-gray-900 font-devanagari mb-2">
              कर्म षट्क (अध्याय 1 से 6)
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-devanagari leading-relaxed">
              निष्काम कर्म, स्वधर्म का पालन और मन का आत्मसंयम। यह भाग व्यक्ति को दैनिक कर्तव्य में निष्काम होने की कला सिखाता है।
            </p>
            <Link href="/bhagavad-gita/chapter/3" className="inline-block mt-4 text-xs font-semibold text-saffron-600 hover:underline">
              कर्मयोग पढ़ें →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm mb-4">
              २
            </span>
            <h4 className="text-lg font-bold text-gray-900 font-devanagari mb-2">
              भक्ति षट्क (अध्याय 7 से 12)
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-devanagari leading-relaxed">
              ईश्वर का विराट स्वरूप, अनन्य प्रेम, पूर्ण समर्पण और भगवत्कृपा की प्राप्ति। ज्ञान को प्रेम में परिणत करने का पावन मार्ग।
            </p>
            <Link href="/bhagavad-gita/chapter/12" className="inline-block mt-4 text-xs font-semibold text-saffron-600 hover:underline">
              भक्तियोग पढ़ें →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
              ३
            </span>
            <h4 className="text-lg font-bold text-gray-900 font-devanagari mb-2">
              ज्ञान षट्क (अध्याय 13 से 18)
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-devanagari leading-relaxed">
              क्षेत्र-क्षेत्रज्ञ का विवेक, प्रकृति के तीन गुण, पुरुषोत्तम स्वरूप और परम संन्यास तथा मोक्ष का अंतिम साक्षात्कार।
            </p>
            <Link href="/bhagavad-gita/chapter/18" className="inline-block mt-4 text-xs font-semibold text-saffron-600 hover:underline">
              मोक्षसंन्यासयोग पढ़ें →
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

