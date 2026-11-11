'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function ShareImageModal({ verse, chapter, isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !verse) return null;

  const downloadImage = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1080;

    // Background Warm Spiritual Cream
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    bgGradient.addColorStop(0, '#FFFBF5');
    bgGradient.addColorStop(0.5, '#FFF7ED');
    bgGradient.addColorStop(1, '#FEF3C7');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative Borders
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#EA580C';
    ctx.strokeRect(36, 36, 1008, 1008);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FDBA74';
    ctx.strokeRect(52, 52, 976, 976);

    // Sacred Om Emblem Header
    ctx.fillStyle = '#EA580C';
    ctx.beginPath();
    ctx.arc(540, 150, 48, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px "Noto Sans Devanagari", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ॐ', 540, 168);

    // Header Title
    ctx.fillStyle = '#7C2D12';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SHLOKVANI • श्रीमद्भगवद्गीता', 540, 240);

    // Chapter and Verse Badge
    ctx.fillStyle = '#C2410C';
    ctx.font = '600 24px "Noto Sans Devanagari", sans-serif';
    ctx.fillText(`अध्याय ${verse.chapter_number}: ${chapter?.name || ''} • श्लोक ${verse.verse_number}`, 540, 280);

    // Divider Line
    ctx.strokeStyle = '#FED7AA';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(340, 320);
    ctx.lineTo(740, 320);
    ctx.stroke();

    // Sanskrit Shloka Lines
    ctx.fillStyle = '#18181B';
    ctx.font = 'bold 36px "Noto Serif Devanagari", serif';
    const lines = verse.text.split('\n').filter(l => l.trim());
    let startY = 430;
    lines.forEach((line) => {
      ctx.fillText(line.trim(), 540, startY);
      startY += 65;
    });

    // Translation Box
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FED7AA';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(100, startY + 40, 880, 260, [24]);
    ctx.fill();
    ctx.stroke();

    // Translation Title
    ctx.fillStyle = '#EA580C';
    ctx.font = 'bold 22px "Noto Sans Devanagari", sans-serif';
    ctx.fillText('सरल हिन्दी अर्थ', 540, startY + 90);

    // Wrap Translation text
    ctx.fillStyle = '#374151';
    ctx.font = '24px "Noto Sans Devanagari", sans-serif';
    const transText = verse.translation_hi || verse.translation_en || '';
    const words = transText.split(' ');
    let currentLine = '';
    let transY = startY + 140;

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 800 && n > 0) {
        ctx.fillText(currentLine, 540, transY);
        currentLine = words[n] + ' ';
        transY += 40;
        if (transY > startY + 260) break;
      } else {
        currentLine = testLine;
      }
    }
    ctx.fillText(currentLine, 540, transY);

    // Footer Watermark
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('shlokvani.org • Ancient Wisdom. Timeless Guidance.', 540, 1020);

    // Export as PNG
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `shlokvani-gita-${verse.chapter_number}-${verse.verse_number}.png`;
    a.click();
    setIsGenerating(false);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100"
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              श्लोक कार्ड साझा करें (Share Image Card)
            </span>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Preview */}
          <div className="my-5 p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-saffron-50 border border-saffron-200 text-center shadow-inner">
            <div className="w-10 h-10 rounded-full bg-saffron-600 text-white mx-auto flex items-center justify-center text-xl font-devanagari font-bold mb-2">
              ॐ
            </div>
            <span className="text-xs font-bold text-saffron-700">
              अध्याय {verse.chapter_number}, श्लोक {verse.verse_number}
            </span>
            <blockquote className="text-base font-bold font-serifDeva text-gray-900 my-3 leading-relaxed">
              "{verse.text}"
            </blockquote>
            <p className="text-xs text-gray-600 font-devanagari line-clamp-3">
              {verse.translation_hi}
            </p>
            <div className="mt-3 text-[10px] text-gray-400 font-medium">
              shlokvani.org
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
            >
              रद्द करें
            </button>
            <button
              onClick={downloadImage}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'तैयार हो रहा है...' : 'चित्र डाउनलोड करें (Download PNG)'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

