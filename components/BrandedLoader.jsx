
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import logo from './logo.svg';

export default function BrandedLoader({ fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen
          ? 'fixed inset-0 z-[9999] bg-white'
          : 'w-full py-12'
      }`}
    >
      <div className="relative w-32 h-32 flex items-center justify-center">

        {/* Rotating Circular Border */}
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-gray-200"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-6 h-[5px] rounded-full bg-amber-500" />
        </motion.div>

        {/* Fixed Logo */}
        <div className="relative z-10 w-24 flex items-center justify-center">
          <Image
            src={logo}
            alt="Shlokvani"
            width={180}
            height={60}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}
