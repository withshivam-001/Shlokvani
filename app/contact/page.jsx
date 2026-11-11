'use client';

import React, { useState } from 'react';
import { Mail, Send, Check, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-100">
          सम्पर्क एवं सुझाव
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-devanagari text-gray-900 mt-2">
          हमसे सम्पर्क करें (Contact Us)
        </h1>
        <p className="text-sm text-gray-600 mt-2 font-devanagari">
          श्लोकवाणी पर आपके विचार, सुझाव या विद्वान समीक्षा का सादर स्वागत है।
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-gray-100 max-w-xl mx-auto">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-devanagari">
              संदेश सफलतापूर्वक प्राप्त हुआ!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              धन्यवाद। हमारी टीम शीघ्र ही आपसे सम्पर्क करेगी।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                नाम (Name)
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="आपका नाम..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-saffron-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                ईमेल (Email)
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@domain.com"
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-saffron-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                संदेश (Message)
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="आपका संदेश, प्रश्न या अनुवाद सुधार..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-saffron-500 font-devanagari"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>संदेश भेजें</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

