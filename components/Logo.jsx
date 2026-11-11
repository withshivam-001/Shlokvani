
'use client';

import React from 'react';
import Image from 'next/image';
import logo from './logo.svg';

/**
 * Shlokvani Logo Component
 *
 * SVG Logo Location: components/logo.svg
 */
export default function Logo({
  className = "w-9 h-9",
  showText = true,
  textClassName = "h-14 w-auto object-contain"
}) {
  return (
    <div className="flex items-center space-x-2.5 group">

      {/* CUSTOM SVG LOGO */}
      {showText && (
        <Image
          src={logo}
          alt="Shlokvani Logo"
          width={280}
          height={80}
          priority
          className={`${textClassName} group-hover:scale-105 transition-transform duration-300`}
        />
      )}

    </div>
  );
}
