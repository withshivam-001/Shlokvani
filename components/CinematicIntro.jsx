'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Sparkles, ArrowRight, Volume2, X } from 'lucide-react';

export default function CinematicIntro() {
  const { showIntro, skipIntro } = useStore();
  const [phase, setPhase] = useState(1); // 1: atmosphere, 2: silhouette & light, 3: logo & tagline

  useEffect(() => {
    if (!showIntro) return;

    const timer1 = setTimeout(() => setPhase(2), 1000);
    const timer2 = setTimeout(() => setPhase(3), 2200);
    const timer3 = setTimeout(() => {
      skipIntro();
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [showIntro, skipIntro]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center bg-[#0d0907] text-white select-none"
      >
        {/* Deep Atmospheric Mahabharata Battlefield Dawn Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180e07] via-[#0e0a08] to-[#050302] opacity-90" />

        {/* Divine Golden Light Radiance Center */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1.1],
            opacity: [0.3, 0.7, 0.5],
          }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-saffron-600/40 via-gold-500/30 to-amber-300/20 blur-[130px] pointer-events-none"
        />

        {/* Ambient Subtle Sunbeams */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-80" />

        {/* Floating Particles Simulation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 1000 - 500,
                y: Math.random() * 400 + 200,
                opacity: 0,
                scale: Math.random() * 0.8 + 0.4
              }}
              animate={{
                y: -300,
                opacity: [0, 0.8, 0],
                x: `+=${(Math.random() - 0.5) * 80}`
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-gold-300 blur-[0.5px] shadow-[0_0_8px_#facc15]"
            />
          ))}
        </div>

        {/* Subtle Silhouette of Lord Krishna and Chariot on Kurukshetra */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: phase >= 2 ? 0.35 : 0, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute bottom-16 sm:bottom-24 w-full flex justify-center pointer-events-none"
        >
          <svg className="w-80 sm:w-[480px] h-32 opacity-40 text-amber-200" viewBox="0 0 500 120" fill="currentColor">
            {/* Chariot base and silhouettes */}
            <path d="M120,105 L380,105 C360,95 330,85 280,85 C240,85 200,90 170,95 Z" opacity="0.8"/>
            {/* Chariot Wheel */}
            <circle cx="210" cy="100" r="16" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="210" cy="100" r="4" fill="currentColor"/>
            <circle cx="290" cy="100" r="16" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="290" cy="100" r="4" fill="currentColor"/>
            {/* Lord Krishna Silhouette with Feather Crown (Mayur Pankh) */}
            <path d="M250,75 C250,65 258,58 262,50 C264,46 266,42 268,36 C270,30 266,28 264,28 C262,28 260,32 258,35 C256,40 252,48 248,54 C244,60 242,68 242,75 Z"/>
            {/* Peacock Feather arc */}
            <path d="M268,36 C272,30 276,22 280,18 C283,22 278,28 274,32 Z" opacity="0.9"/>
            {/* Chariot Banner / Flag (Kapi Dhwaja) */}
            <path d="M230,80 L230,25 L195,40 L230,55 Z" opacity="0.7"/>
            {/* Ground Horizon line */}
            <path d="M0,115 Q250,110 500,115 L500,120 L0,120 Z" fill="#000" opacity="0.9"/>
          </svg>
        </motion.div>

        {/* Central Logo & Brand Typography */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl">
          {/* Sacred Om Emblem */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-saffron-600 to-gold-500 p-0.5 shadow-[0_0_40px_rgba(249,115,22,0.6)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#150d08] flex items-center justify-center border border-amber-500/30">
                <span className="text-4xl sm:text-5xl font-devanagari font-bold bg-gradient-to-b from-amber-100 via-gold-300 to-saffron-500 bg-clip-text text-transparent">
                  ॐ
                </span>
              </div>
            </div>
          </motion.div>

          {/* Brand Name Animation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 25 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center space-x-2"
          >
            <h1 className="text-4xl sm:text-6xl font-bold font-devanagari tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              श्लोक<span className="text-saffron-500">वाणी</span>
            </h1>
          </motion.div>

          {/* Subtitle / Sanskrit Phrase */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.8 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-200/80 font-medium mt-3"
          >
            SHLOKVANI • BHAGAVAD GITA
          </motion.p>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 15 }}
            transition={{ duration: 0.9 }}
            className="mt-6"
          >
            <p className="text-lg sm:text-2xl text-amber-100 font-light font-serifDeva italic drop-shadow-md">
              "Discover the Wisdom of Bhagavad Gita"
            </p>
            <p className="text-xs sm:text-sm text-amber-300/60 font-devanagari mt-2">
              यतो धर्मस्ततो जयः • जहाँ धर्म है, वहीं विजय है
            </p>
          </motion.div>

          {/* Enter / Skip action button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={skipIntro}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-medium text-sm shadow-[0_0_25px_rgba(234,88,12,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <span>प्रवेश करें (Enter)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        </div>

        {/* Skip button at top right */}
        <button
          onClick={skipIntro}
          className="absolute top-6 right-6 z-20 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-xs text-amber-100/80 transition-all hover:text-white"
        >
          <span>Skip Intro</span>
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Subtle audio indicator disclaimer */}
        <div className="absolute bottom-6 left-6 text-[11px] text-amber-200/40 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>प्राचीन ज्ञान • शाश्वत मार्गदर्शन</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

