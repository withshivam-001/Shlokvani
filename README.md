# Shlokvani (श्लोकवाणी) – Complete Bhagavad Gita & Spiritual Knowledge Platform

> **"Ancient Wisdom. Timeless Guidance."**  
> *यतो धर्मस्ततो जयः • जहाँ धर्म है, वहीं विजय है*

A digital sanctuary and modern spiritual knowledge platform for exploring the complete **Shrimad Bhagavad Gita** — including all **18 chapters and 701 original Sanskrit shlokas**, with interactive word-by-word meanings (Padartha), multi-scholar translations, in-depth philosophical commentary, audio recitations, personal sanctuary features, and 16-language multilingual translation.

---

## 🌟 Highlights & Key Features

### 1. Complete Bhagavad Gita Library (All 18 Chapters & 701 Verses)
- **Zero placeholder text:** Verified dataset containing complete Sanskrit Devanagari text, Roman transliteration (IAST), and verse-by-verse data.
- **Word-by-word Breakdown (Padartha):** Interactive word chips for every Sanskrit term. Click any Sanskrit word to view a dedicated modal showing pronunciation, English meaning, Hindi meaning, and grammatical context.
- **Multi-scholar Translations:**
  - **Hindi Translations:** Swami Ramsukhdas, Swami Tejomayananda
  - **English Translations:** Swami Sivananda, Swami Gambhirananda, Swami Adidevananda, Shri Purohit Swami
- **In-depth Commentaries:**
  - Swami Chinmayananda (Hindi)
  - Swami Sivananda (English)
- **Spiritual Interpretations & Life Lessons:** Practical takeaways for modern everyday and professional challenges.

### 2. Design & Aesthetics (Inspired by `shlokvani_modern_hindi_ui.html`)
- **Centered Navbar Logo:** Perfectly centered Shlokvani branding with saffron Om medallion and Google-inspired minimal clean pill navigation.
- **Warm Spiritual Theme:** Pure off-white background (`#FAFAFA`), vibrant saffron accents (`#EA580C`, `#F97316`), subtle gold highlights (`#CA8A04`), and refined typography.
- **Bilingual & Multilingual Typography:** Noto Serif Devanagari for sacred Sanskrit verses, Noto Sans Devanagari for Hindi explanations, and Plus Jakarta Sans for English clarity.

### 3. Cinematic Website Opening Experience
- Full-screen Mahabharata dawn atmosphere with divine golden light rays and floating particles.
- Subtle silhouette of Lord Krishna guiding Arjuna on the chariot (Ratha).
- Sacred Om ripple animation, brand title reveal, and tagline: *"Discover the Wisdom of Bhagavad Gita"*.
- Session-aware (shows once per session with "Skip Intro" and a "Replay Intro" button).
- Branded loading indicator with liquid shimmer Devanagari calligraphy for page navigations.

### 4. Floating Audio Player & Real Recitation
- Persistent bottom audio player with track title, chapter/verse reference, playback controls, progress seeker, and speed switcher (0.75x, 1.0x, 1.25x, 1.5x, 2.0x).
- Streams authentic Sanskrit recitations (e.g. T.S. Ranganathan archive) alongside high-fidelity Web Speech recitation fallback for any specific verse.

### 5. Floating Verse of the Day Widget
- Elegant bottom-right floating card that updates deterministically by calendar date.
- Minimizable, expandable, with audio playback, bookmarking, and native Web Share API integration.

### 6. Multilingual Translation System (16 Languages)
- Fully dynamic multilingual switching across **16 languages**:
  1. हिन्दी (Hindi)
  2. English
  3. संस्कृतम् (Sanskrit)
  4. বাংলা (Bengali)
  5. தமிழ் (Tamil)
  6. తెలుగు (Telugu)
  7. मराठी (Marathi)
  8. ગુજરાતી (Gujarati)
  9. ಕನ್ನಡ (Kannada)
  10. മലയാളം (Malayalam)
  11. ਪੰਜਾਬੀ (Punjabi)
  12. Français (French)
  13. Deutsch (German)
  14. Español (Spanish)
  15. العربية (Arabic)
  16. 日本語 (Japanese)
- Seamless interface updates with scholar-reviewed source references.

### 7. Global Search
- Instant lookup by Sanskrit text, Hindi meaning, English keyword, topic, or reference code (e.g. `2.47`, `Karma Yoga`, `मन की शांति`, `कर्मण्येवाधिकारस्ते`).
- Chapter filters and quick suggestion tags.

### 8. Dedicated Topics Collections (13 Life Themes)
Dedicated collections with targeted verses, interpretations, and practical solutions:
- **Karma & Duty**
- **Dharma & Righteous Living**
- **Bhakti & Divine Love**
- **Moksha & Liberation**
- **Meditation & Dhyana**
- **Anger Management**
- **Stress Management & Mental Peace**
- **Self-Control & Sense Mastery**
- **Leadership & Ethical Guidance**
- **True Happiness & Joy**
- **Spiritual Knowledge & Wisdom**
- **Discipline & Noble Conduct**
- **Peace of Mind (Shanti)**

### 9. Personal Reading Sanctuary
- Bookmark favorite shlokas.
- Reading streak counter.
- Reading history with timestamps.
- Personal notes saved per verse.
- Font size customization (`A-`, `A`, `A+`, `A++`).

### 10. Admin Dashboard (`/admin`)
- Platform analytics: 701 verses, 18 chapters, 1,402 commentaries, 4,907 translations.
- Multilingual translation completion tracker across all 16 languages.
- Interactive verse editor (edit Devanagari text, transliteration, audio URLs, meanings).
- Bulk JSON/CSV import with validation.
- Daily verse scheduler.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14+ (App Router, JavaScript)
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Motion & Animations:** Framer Motion, GSAP
- **Icons:** Lucide React
- **State Management:** Zustand (with localStorage persistence)
- **Database:** MongoDB & Mongoose (with dual-engine fallback to local JSON data layer)
- **Audio:** HTML5 Audio API + Web Speech API (Sanskrit phonetics)
- **SEO:** Dynamic OpenGraph metadata, XML sitemap (`/sitemap.xml`), robots.txt (`/robots.txt`)

---

## 🚀 Getting Started

### 1. Installation
All dependencies are already installed in `node_modules`. If needed:
```bash
npm install
```

### 2. Development Server
To run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

### 4. Optional MongoDB Seeding
If you have a local or cloud MongoDB instance running:
```bash
# In .env.local
MONGODB_URI=mongodb://127.0.0.1:27017/shlokvani

# Run seed script
npm run db:seed
```
*Note: Shlokvani is pre-packaged with verified JSON datasets in `data/`, so it works 100% reliably out of the box even without a live MongoDB connection!*

---

## 📂 Project Architecture

```
c:\Shlokvani
├── app/
│   ├── layout.jsx                                      # Root layout with providers & metadata
│   ├── globals.css                                     # Tailwind & custom Sanskrit fonts
│   ├── page.jsx & HomeClient.jsx                       # Homepage with Hero, Verse of Day, Chapters & Wisdom
│   ├── bhagavad-gita/
│   │   ├── page.jsx                                    # Bhagavad Gita introduction & pillars
│   │   ├── chapters/                                   # All 18 chapters grid with filters
│   │   └── chapter/[chapterNumber]/
│   │       ├── page.jsx & ChapterClient.jsx            # Chapter details & verse listing
│   │       └── verse/[verseNumber]/
│   │           ├── page.jsx & VerseReaderClient.jsx    # Complete Verse Reading Experience
│   ├── daily-verse/                                    # Dedicated Verse of the Day page
│   ├── wisdom/                                         # Spiritual wisdom, Q&A and life teachings
│   ├── topics/                                         # 13 dedicated topic collections
│   ├── bookmarks/                                      # Personal reading sanctuary & streak
│   ├── search/                                         # Global search results page
│   ├── about/                                          # About Shlokvani
│   ├── contact/                                        # Contact form
│   ├── privacy-policy/                                 # Privacy policy
│   ├── terms/                                          # Terms of service
│   ├── admin/                                          # Full Admin Dashboard
│   ├── sitemap.js & robots.js                          # Dynamic SEO sitemap and robots
│   └── api/                                            # REST API endpoints
├── components/
│   ├── Navbar.jsx                                      # Sticky navbar with centered logo
│   ├── Footer.jsx                                      # Google minimal clean footer
│   ├── FloatingAudioPlayer.jsx                         # Sticky bottom player with speed/controls
│   ├── VerseOfDayWidget.jsx                            # Floating daily verse card
│   ├── WordMeaningModal.jsx                            # Interactive Sanskrit padartha popup
│   ├── BrandedLoader.jsx                               # Branded typography loading animation
│   ├── CinematicIntro.jsx                              # Fullscreen Mahabharata dawn intro
│   └── ClientProviders.jsx                             # Client state initializer
├── data/
│   ├── chapters.json                                   # 18 chapters verified metadata
│   ├── verses.json                                     # Complete 701 verses with Padartha & commentaries
│   ├── topics.json                                     # 13 topic collections
│   └── daily-verses.json                               # 365 daily verse schedule
├── lib/
│   ├── gitaService.js                                  # Unified service layer with caching
│   ├── i18n.js                                         # 16-language dictionaries
│   └── mongodb.js                                      # Mongoose connection with fallback
├── models/                                             # Mongoose schemas (Chapter, Verse, Translation, User, DailyVerse)
├── store/
│   └── useStore.js                                     # Zustand state store
└── tailwind.config.js                                  # Custom saffron, gold & google palette
```

---

## 🕊️ License & Sacred Attribution
*Dedicated to the timeless wisdom of Maharshi Vedavyasa and the lineage of spiritual masters.*  
Open for study, contemplation, and spiritual elevation.

#   S h l o k v a n i  
 