'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ArrowRight, X } from 'lucide-react';
import logo from './logo.svg';

/**
 * Simple modern motion-graphics intro
 * White canvas + saffron blend, logo revealed with a saffron wipe.
 *
 * Put these files in /public:
 *   /public/kolam-corner.png  (optional corner ornaments)
 */

// Next.js static import returns an object ({ src, width, height }), not a string
const logoSrc = typeof logo === 'string' ? logo : logo?.src;

const SAFFRON = '#FF9933';
const EASE = [0.22, 1, 0.36, 1];
const DURATION_MS = 5000;

export default function CinematicIntro() {
  const { showIntro, skipIntro } = useStore();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!showIntro) return;
    const t = setTimeout(skipIntro, reduce ? 2500 : DURATION_MS);
    return () => clearTimeout(t);
  }, [showIntro, skipIntro, reduce]);

  if (!showIntro) return null;

  const d = (s) => (reduce ? 0 : s); // collapse motion if user prefers reduced

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex select-none flex-col items-center justify-center overflow-hidden bg-white"
      >
        {/* ── Saffron blend background ───────────────────────── */}
        <motion.div
          aria-hidden
          initial={{ x: -80, y: 60, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: d(2.4), ease: EASE }}
          className="pointer-events-none absolute -left-40 -bottom-40 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${SAFFRON}66, transparent 70%)` }}
        />
        <motion.div
          aria-hidden
          initial={{ x: 80, y: -60, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: d(2.4), ease: EASE, delay: 0.2 }}
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, #FFB36655, transparent 70%)` }}
        />
        {/* slow saffron wash rising from the bottom */}
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: d(3), ease: EASE }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 origin-bottom"
          style={{ background: `linear-gradient(to top, ${SAFFRON}26, transparent)` }}
        />

        {/* ── Kolam corners draw in ──────────────────────────── */}
        <motion.img
          src="/kolam-corner.png"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 0.6, x: -30, y: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: d(1.2), ease: EASE, delay: 0.1 }}
          className="pointer-events-none absolute left-4 top-4 w-24 origin-top-left mix-blend-multiply sm:left-8 sm:top-8 sm:w-40"
        />
        <motion.img
          src="/kolam-corner.png"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 0.6, x: 30, y: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: d(1.2), ease: EASE, delay: 0.25 }}
          className="pointer-events-none absolute bottom-4 right-4 w-24 origin-bottom-right rotate-180 mix-blend-multiply sm:bottom-8 sm:right-8 sm:w-40"
        />

        {/* ── Logo: saffron wipe reveal ──────────────────────── */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <div className="relative w-[min(82vw,640px)]">
            {/* saffron glow behind the logo */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: d(1.6), delay: 0.4, ease: EASE }}
              className="absolute inset-0 -z-10 rounded-full blur-[70px]"
              style={{ background: `${SAFFRON}33` }}
            />

            <motion.img
              src={logoSrc}
              alt="श्लोकवाणी – Shlokvani"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: d(1.7), delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="block w-full mix-blend-multiply"
              draggable={false}
            />

            {/* sweeping saffron light bar that leads the wipe */}
            {!reduce && (
              <motion.div
                aria-hidden
                initial={{ left: '0%', opacity: 1 }}
                animate={{ left: '100%', opacity: [1, 1, 0] }}
                transition={{ duration: 1.7, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute top-[8%] h-[84%] w-[3px] -translate-x-1/2 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${SAFFRON}, transparent)`,
                  boxShadow: `0 0 28px 8px ${SAFFRON}88`,
                }}
              />
            )}
          </div>

          {/* underline that draws out from the centre */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: d(0.9), delay: 2.1, ease: EASE }}
            className="mt-2 h-[2px] w-40 origin-center rounded-full sm:w-56"
            style={{ background: `linear-gradient(to right, transparent, ${SAFFRON}, transparent)` }}
          />

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.8), delay: 2.4, ease: EASE }}
            className="mt-5 text-lg italic text-neutral-800 sm:text-2xl"
          >
            Discover the Wisdom of Bhagavad Gita
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: d(0.8), delay: 2.7 }}
            className="mt-2 font-devanagari text-sm text-[#C2570C] sm:text-base"
          >
            यतो धर्मस्ततो जयः • जहाँ धर्म है, वहीं विजय है
          </motion.p>

          {/* enter button */}
          <motion.button
            onClick={skipIntro}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.7), delay: 3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-9 inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_-8px_rgba(255,153,51,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] focus-visible:ring-offset-2"
            style={{ background: `linear-gradient(90deg, #FF8A1F, ${SAFFRON})` }}
          >
            <span>प्रवेश करें (Enter)</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* skip */}
        <button
          onClick={skipIntro}
          className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/70 px-3.5 py-1.5 text-xs text-neutral-600 backdrop-blur transition hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] sm:right-8 sm:top-8"
        >
          <span>Skip</span>
          <X className="h-3.5 w-3.5" />
        </button>

        {/* thin progress line */}
        {!reduce && (
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
            style={{ background: SAFFRON }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
