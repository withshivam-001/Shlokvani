import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Language & i18n
  language: 'hi',
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shlokvani_lang', lang);
    }
    set({ language: lang });
  },

  // Audio Player State
  currentTrack: {
    title: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
    subtitle: 'श्रीमद्भगवद्गीता • अध्याय 2, श्लोक 47',
    audioUrl: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/03%20Sankhya%20Yogam.mp3',
    chapterNumber: 2,
    verseNumber: 47,
    text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥'
  },
  isPlaying: false,
  playbackSpeed: 1.0,
  volume: 0.85,
  isMuted: false,
  isPlayerExpanded: false,
  isPlayerVisible: true,

  playTrack: (track) => {
    set({
      currentTrack: {
        ...get().currentTrack,
        ...track
      },
      isPlaying: true,
      isPlayerVisible: true,
    });
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },

  pauseTrack: () => {
    set({ isPlaying: false });
  },

  setPlaybackSpeed: (speed) => {
    set({ playbackSpeed: speed });
  },

  setVolume: (vol) => {
    set({ volume: vol, isMuted: vol === 0 });
  },

  toggleMute: () => {
    set({ isMuted: !get().isMuted });
  },

  togglePlayerExpand: () => {
    set({ isPlayerExpanded: !get().isPlayerExpanded });
  },

  // User Reading Preferences & History
  bookmarks: [],
  readingHistory: [],
  lastRead: null,
  readingStreak: 1,
  personalNotes: {},
  fontSize: 'md', // sm, md, lg, xl

  initUserData: () => {
    if (typeof window === 'undefined') return;
    try {
      const savedLang = localStorage.getItem('shlokvani_lang');
      const savedBookmarks = JSON.parse(localStorage.getItem('shlokvani_bookmarks') || '[]');
      const savedHistory = JSON.parse(localStorage.getItem('shlokvani_history') || '[]');
      const savedLastRead = JSON.parse(localStorage.getItem('shlokvani_last_read') || 'null');
      const savedNotes = JSON.parse(localStorage.getItem('shlokvani_notes') || '{}');
      const savedStreak = parseInt(localStorage.getItem('shlokvani_streak') || '1', 10);
      const savedIntro = sessionStorage.getItem('shlokvani_seen_intro') === 'true';

      set({
        language: savedLang || 'hi',
        bookmarks: savedBookmarks,
        readingHistory: savedHistory,
        lastRead: savedLastRead || { chapter: 2, verse: 47, title: 'सांख्य योग' },
        personalNotes: savedNotes,
        readingStreak: savedStreak,
        showIntro: !savedIntro,
      });
    } catch (e) {
      console.warn('Could not initialize local storage user data:', e);
    }
  },

  toggleBookmark: (verse) => {
    const { bookmarks } = get();
    const id = `${verse.chapter_number}.${verse.verse_number}`;
    const exists = bookmarks.some(b => `${b.chapter_number}.${b.verse_number}` === id);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => `${b.chapter_number}.${b.verse_number}` !== id);
    } else {
      updated = [{
        chapter_number: verse.chapter_number,
        verse_number: verse.verse_number,
        text: verse.text,
        transliteration: verse.transliteration,
        translation_hi: verse.translation_hi,
        translation_en: verse.translation_en,
        saved_at: new Date().toISOString()
      }, ...bookmarks];
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('shlokvani_bookmarks', JSON.stringify(updated));
    }
    set({ bookmarks: updated });
    return !exists;
  },

  isBookmarked: (chapterNum, verseNum) => {
    const id = `${chapterNum}.${verseNum}`;
    return get().bookmarks.some(b => `${b.chapter_number}.${b.verse_number}` === id);
  },

  recordHistory: (chapterNum, verseNum, text = '') => {
    const history = get().readingHistory;
    const entry = {
      chapter_number: chapterNum,
      verse_number: verseNum,
      text: text.slice(0, 80),
      timestamp: new Date().toISOString()
    };
    const updated = [entry, ...history.filter(h => !(h.chapter_number === chapterNum && h.verse_number === verseNum))].slice(0, 30);
    const lastRead = { chapter: chapterNum, verse: verseNum, timestamp: new Date().toISOString() };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('shlokvani_history', JSON.stringify(updated));
      localStorage.setItem('shlokvani_last_read', JSON.stringify(lastRead));
    }
    set({ readingHistory: updated, lastRead });
  },

  saveNote: (chapterNum, verseNum, note) => {
    const key = `${chapterNum}.${verseNum}`;
    const notes = { ...get().personalNotes, [key]: note };
    if (typeof window !== 'undefined') {
      localStorage.setItem('shlokvani_notes', JSON.stringify(notes));
    }
    set({ personalNotes: notes });
  },

  setFontSize: (size) => set({ fontSize: size }),

  // Cinematic Intro
  showIntro: false,
  skipIntro: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('shlokvani_seen_intro', 'true');
    }
    set({ showIntro: false });
  },
  replayIntro: () => {
    set({ showIntro: true });
  },

  // Search Modal
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  // Floating Verse of Day Widget
  isVODMinimized: false,
  toggleVODMinimized: () => set({ isVODMinimized: !get().isVODMinimized }),
}));

