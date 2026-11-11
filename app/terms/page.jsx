import React from 'react';

export const metadata = {
  title: 'नियम व शर्तें (Terms & Conditions) – Shlokvani',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-3xl font-bold font-devanagari text-gray-900 mb-6">
        नियम व शर्तें (Terms of Service)
      </h1>
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 text-sm text-gray-700 font-devanagari leading-relaxed space-y-4">
        <p>श्लोकवाणी (Shlokvani) एक निःशुल्क, गैर-व्यावसायिक एवं शैक्षणिक आध्यात्मिक मंच है।</p>
        <h3 className="text-base font-bold text-gray-900 pt-2">सामग्री का उपयोग</h3>
        <p>श्रीमद्भगवद्गीता के सभी संस्कृत श्लोक एवं पारंपरिक भाष्य सार्वजनिक डोमेन एवं विद्वानों के सान्निध्य में जनहितार्थ अध्ययन के लिए उपलब्ध हैं।</p>
        <p>आप इन श्लोकों को व्यक्तिगत अध्ययन, शोध एवं गैर-व्यावसायिक आध्यात्मिक प्रसार हेतु साझा कर सकते हैं।</p>
      </div>
    </div>
  );
}

