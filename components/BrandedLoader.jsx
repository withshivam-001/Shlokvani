'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BrandedLoader({ message = 'ज्ञान का प्रकाश उद्घाटित हो रहा है...', fullScreen = false }) {
  const letters = ['श्', 'लो', 'क', 'वा', 'णी'];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 15, scale: 0.8 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center p-8 select-none">
      {/* Sacred Om Golden Emblem with Pulse Ring */}
      <div className="relative flex items-center justify-center mb-6">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-saffron-300 via-gold-400 to-saffron-500 blur-xl opacity-50"
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-16 rounded-full border border-dashed border-saffron-300/60"
        />

        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center text-white shadow-lg shadow-saffron-500/30"
        >
          <span className="text-2xl font-bold font-devanagari select-none">ॐ</span>
        </motion.div>
      </div>

      {/* Typography Reveal for Brand Name */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex items-center space-x-1.5 text-2xl sm:text-3xl font-extrabold font-devanagari tracking-wider mb-2"
      >
        {letters.map((char, idx) => (
          <motion.span
            key={idx}
            variants={letterVariants}
            className={idx >= 3 ? "text-saffron-600 drop-shadow-sm" : "text-gray-900"}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          variants={letterVariants}
          className="text-xs font-sans uppercase font-bold text-saffron-500 tracking-widest ml-2 bg-saffron-50 px-2 py-0.5 rounded-full border border-saffron-100"
        >
          Gita
        </motion.span>
      </motion.div>

      {/* Subtle Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-xs text-gray-500 font-devanagari tracking-wide text-center"
      >
        {message}
      </motion.p>

      {/* Shimmering Progress Bar */}
      <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-4 relative">
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1/2 h-full bg-gradient-to-r from-saffron-400 via-gold-500 to-saffron-600 rounded-full"
        />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
}

