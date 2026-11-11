'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAudioPlayer from '@/components/FloatingAudioPlayer';
import VerseOfDayWidget from '@/components/VerseOfDayWidget';
import SearchModal from '@/components/SearchModal';
import CinematicIntro from '@/components/CinematicIntro';

export default function ClientProviders({ children, initialDailyVerse }) {
  const { initUserData } = useStore();

  useEffect(() => {
    initUserData();
  }, [initUserData]);

  return (
    <>
      <CinematicIntro />
      <Navbar />
      <main className="flex-grow min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingAudioPlayer />
      <VerseOfDayWidget initialVerse={initialDailyVerse} />
      <SearchModal />
    </>
  );
}

