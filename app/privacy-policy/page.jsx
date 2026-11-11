import React from 'react';

export const metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) – Shlokvani',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-3xl font-bold font-devanagari text-gray-900 mb-6">
        गोपनीयता नीति (Privacy Policy)
      </h1>
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 text-sm text-gray-700 font-devanagari leading-relaxed space-y-4">
        <p>श्लोकवाणी (Shlokvani) उपयोगकर्ता की निजता और शांतिपूर्ण पठन अनुभव का पूर्ण सम्मान करती है।</p>
        <h3 className="text-base font-bold text-gray-900 pt-2">डेटा संग्रहण एवं उपयोग</h3>
        <p>हम किसी भी प्रकार का अनधिकृत डेटा, ट्रैकिंग या विज्ञापन विश्लेषण एकत्र नहीं करते हैं। आपके बुकमार्क्स, पठन इतिहास और नोट्स आपके ब्राउज़र के स्थानीय संग्रहण (Local Storage) में सुरक्षित रहते हैं।</p>
        <h3 className="text-base font-bold text-gray-900 pt-2">कुकीज़ (Cookies)</h3>
        <p>श्लोकवाणी केवल भाषा चयन एवं ऑडियो स्थिति को याद रखने के लिए आवश्यक सत्र कुकीज़ का उपयोग करती है।</p>
      </div>
    </div>
  );
}

