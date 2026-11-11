'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Heart,
  Share2,
  X,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';

export default function FloatingAudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    pauseTrack,
    playbackSpeed, 
    setPlaybackSpeed, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute,
    isPlayerExpanded, 
    togglePlayerExpand,
    isPlayerVisible,
    playTrack,
    language,
    toggleBookmark,
    isBookmarked
  } = useStore();

  const t = getTranslation(language);
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  // Sync audio element with state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [playbackSpeed, volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play error, falling back to Web Speech recitation:', err);
          // If the network audio file is not playable, fallback to speech synthesis
          speakSanskritVerse();
        });
      }
    } else {
      audio.pause();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeechPlaying(false);
      }
    }
  }, [isPlaying, currentTrack]);

  // Speech synthesis fallback for Sanskrit recitation
  const speakSanskritVerse = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToSpeak = currentTrack.text || currentTrack.title;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed * 0.9;
    utterance.pitch = 1.0;

    // Try finding a Hindi or Sanskrit voice
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('sa') || v.name.includes('Hindi'));
    if (hiVoice) utterance.voice = hiVoice;

    utterance.onstart = () => setIsSpeechPlaying(true);
    utterance.onend = () => {
      setIsSpeechPlaying(false);
      pauseTrack();
    };
    utterance.onerror = () => {
      setIsSpeechPlaying(false);
      pauseTrack();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    audioRef.current.currentTime = newTime;
    setProgress(pos * 100);
  };

  const formatTime = (sec) => {
    if (isNaN(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNext = () => {
    const nextVerse = (currentTrack.verseNumber || 1) + 1;
    const ch = currentTrack.chapterNumber || 2;
    playTrack({
      chapterNumber: ch,
      verseNumber: nextVerse,
      subtitle: `भगवद्गीता • अध्याय ${ch}, श्लोक ${nextVerse}`,
      title: `अध्याय ${ch}, श्लोक ${nextVerse} पाठ`
    });
  };

  const handlePrev = () => {
    const prevVerse = Math.max(1, (currentTrack.verseNumber || 1) - 1);
    const ch = currentTrack.chapterNumber || 2;
    playTrack({
      chapterNumber: ch,
      verseNumber: prevVerse,
      subtitle: `भगवद्गीता • अध्याय ${ch}, श्लोक ${prevVerse}`,
      title: `अध्याय ${ch}, श्लोक ${prevVerse} पाठ`
    });
  };

  if (!isPlayerVisible) return null;

  const bookmarked = currentTrack.chapterNumber && isBookmarked(currentTrack.chapterNumber, currentTrack.verseNumber);

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        preload="metadata"
      />

      <div
        id="sticky-audio-bar"
        className={`fixed bottom-4 left-4 right-4 max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-floating-player rounded-2xl z-40 transition-all duration-300 ${
          isPlayerExpanded ? 'p-5' : 'p-3'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          
          {/* TRACK INFO LEFT */}
          <div className="flex items-center space-x-3 w-1/3 min-w-0">
            <Link
              href={currentTrack.chapterNumber ? `/bhagavad-gita/chapter-${currentTrack.chapterNumber}/verse-${currentTrack.verseNumber}` : '/'}
              className="w-10 h-10 rounded-xl bg-saffron-50 text-saffron-600 flex-shrink-0 flex items-center justify-center font-bold shadow-sm hover:scale-105 transition-transform"
            >
              <span className="text-xl font-devanagari select-none">ॐ</span>
            </Link>
            <div className="min-w-0">
              <h5 className="text-xs sm:text-sm font-semibold text-gray-900 truncate font-devanagari">
                {currentTrack.title}
              </h5>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                {currentTrack.subtitle}
              </p>
            </div>
          </div>

          {/* CENTER PLAYBACK CONTROLS */}
          <div className="flex flex-col items-center justify-center space-y-1 w-1/3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={handlePrev}
                className="text-gray-400 hover:text-gray-700 text-xs p-1 transition-colors"
                title={t.prev_verse}
              >
                <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-saffron-600 text-white flex items-center justify-center hover:bg-saffron-700 transition-all shadow-md hover:scale-105 active:scale-95"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="text-gray-400 hover:text-gray-700 text-xs p-1 transition-colors"
                title={t.next_verse}
              >
                <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Progress Bar & Timing */}
            <div className="w-full max-w-xs flex items-center space-x-2">
              <span className="text-[9px] text-gray-400 hidden sm:inline">
                {formatTime(currentTime)}
              </span>
              <div
                onClick={handleSeek}
                className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden cursor-pointer relative group"
              >
                <div
                  className="bg-saffron-600 h-full rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[9px] text-gray-400 hidden sm:inline">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* RIGHT ACTIONS: VOLUME, SPEED, BOOKMARK */}
          <div className="flex items-center justify-end space-x-1 sm:space-x-2 w-1/3 text-gray-500">
            {/* Speed menu */}
            <div className="relative">
              <button
                onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
                className="px-2 py-1 rounded-full text-[11px] font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-1"
                title="Playback Speed"
              >
                <span>{playbackSpeed}x</span>
              </button>
              {speedMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-50 text-xs flex flex-col space-y-1">
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setPlaybackSpeed(s);
                        setSpeedMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded-lg text-left ${
                        playbackSpeed === s ? 'bg-saffron-50 text-saffron-600 font-bold' : 'hover:bg-gray-50'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sanskrit Recitation Voice Button */}
            <button
              onClick={speakSanskritVerse}
              className={`p-1.5 rounded-full transition-colors hidden sm:inline-block ${
                isSpeechPlaying ? 'text-saffron-600 bg-saffron-50' : 'hover:text-gray-800'
              }`}
              title="Sanskrit Pronunciation Recitation"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* Volume Toggle */}
            <button
              onClick={toggleMute}
              className="p-1.5 hover:text-gray-800 text-xs hidden sm:inline-block transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-500" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Bookmark */}
            {currentTrack.chapterNumber && (
              <button
                onClick={() => {
                  toggleBookmark({
                    chapter_number: currentTrack.chapterNumber,
                    verse_number: currentTrack.verseNumber,
                    text: currentTrack.text || currentTrack.title
                  });
                }}
                className={`p-1.5 transition-colors ${
                  bookmarked ? 'text-saffron-600' : 'hover:text-saffron-600 text-gray-400'
                }`}
                title={bookmarked ? t.bookmarked : t.bookmark}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            )}

            {/* View Full Verse Link */}
            {currentTrack.chapterNumber && (
              <Link
                href={`/bhagavad-gita/chapter-${currentTrack.chapterNumber}/verse-${currentTrack.verseNumber}`}
                className="p-1.5 hover:text-saffron-600 text-gray-400 transition-colors hidden sm:inline-block"
                title="Open Verse Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* EXPANDED LYRICS / SHLOKA DISPLAY */}
        {isPlayerExpanded && currentTrack.text && (
          <div className="mt-4 pt-4 border-t border-gray-100 text-center font-devanagari">
            <blockquote className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
              "{currentTrack.text}"
            </blockquote>
          </div>
        )}
      </div>
    </>
  );
}

