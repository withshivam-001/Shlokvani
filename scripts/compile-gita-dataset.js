const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, '..', 'data', 'raw');
const dataDir = path.join(__dirname, '..', 'data');

const rawVerses = JSON.parse(fs.readFileSync(path.join(rawDir, 'verse.json'), 'utf8'));
const rawTranslations = JSON.parse(fs.readFileSync(path.join(rawDir, 'translation.json'), 'utf8'));
const rawCommentaries = JSON.parse(fs.readFileSync(path.join(rawDir, 'commentary.json'), 'utf8'));
const chaptersMeta = JSON.parse(fs.readFileSync(path.join(dataDir, 'chapters.json'), 'utf8'));

console.log(`Processing ${rawVerses.length} verses, ${rawTranslations.length} translations, ${rawCommentaries.length} commentaries...`);

// Group translations by verse_id
const transByVerse = {};
rawTranslations.forEach(t => {
  if (!transByVerse[t.verse_id]) transByVerse[t.verse_id] = [];
  transByVerse[t.verse_id].push(t);
});

// Group commentaries by verse_id
const commByVerse = {};
rawCommentaries.forEach(c => {
  if (!commByVerse[c.verse_id]) commByVerse[c.verse_id] = [];
  commByVerse[c.verse_id].push(c);
});

// Parse word meanings string into structured array
function parseWordMeanings(rawStr) {
  if (!rawStr) return [];
  const entries = [];
  // Split on semicolons or newlines
  const parts = rawStr.split(/[;\n]+/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    // Look for separator: em-dash, double dash, hyphen or equal
    let sep = '—';
    if (!trimmed.includes('—')) {
      if (trimmed.includes('--')) sep = '--';
      else if (trimmed.includes('=')) sep = '=';
      else if (trimmed.includes('-')) sep = '-';
      else if (trimmed.includes(':')) sep = ':';
    }

    if (trimmed.includes(sep)) {
      const idx = trimmed.indexOf(sep);
      const sWord = trimmed.substring(0, idx).trim();
      const mean = trimmed.substring(idx + sep.length).trim();
      if (sWord && mean) {
        entries.push({
          word: sWord,
          transliteration: sWord,
          hindi: '',
          english: mean,
          grammar: ''
        });
      }
    } else if (trimmed.length > 0) {
      entries.push({
        word: trimmed,
        transliteration: trimmed,
        hindi: '',
        english: '',
        grammar: ''
      });
    }
  }
  return entries;
}

// Chapter audio mapping from Archive.org T.S. Ranganathan recitation
const CHAPTER_AUDIO = {
  1: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/02%20Arjuna%20Vishada%20Yogam.mp3',
  2: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/03%20Sankhya%20Yogam.mp3',
  3: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/04%20Karma%20Yogam.mp3',
  4: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/05%20Gnana%20Karma%20Sanyasa%20Yogam.mp3',
  5: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/06%20Sanyasa%20Yogam.mp3',
  6: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/07%20Dhyana%20Yogam.mp3',
  7: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/08%20Gnana%20Vignana%20Yogam.mp3',
  8: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/09%20Akshara%20Brahma%20Yogam.mp3',
  9: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/10%20Raja%20Vidhya%20Raja%20Guhya%20Yogam.mp3',
  10: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/11%20Vibhuti%20Yogam.mp3',
  11: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/12%20Viswaroopa%20Dharshana%20Yogam.mp3',
  12: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/13%20Bhakthi%20Yogam.mp3',
  13: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/14%20Kshethra%20Kshethranga%20Vibhaga%20Yogam.mp3',
  14: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/15%20Gunathraya%20Vibhaga%20Yogam.mp3',
  15: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/16%20Purushothama%20Prapthi%20Yogam.mp3',
  16: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/17%20Dhaivasura%20Sampath%20Vibhaga%20Yogam.mp3',
  17: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/18%20Shradhathraya%20Vibhaga%20Yogam.mp3',
  18: 'https://archive.org/download/SrimadBhagavadGita_201712/Srimad%20Bhagavad%20Gita/19%20Moksha%20Sanyasa%20Yogam.mp3'
};

const POPULAR_VERSES = new Set([
  '1.1', '2.14', '2.20', '2.22', '2.47', '2.48', '2.50', '2.56', '2.62', '2.63', '2.70', '2.71',
  '3.9', '3.19', '3.21', '3.27', '3.35', '3.42',
  '4.7', '4.8', '4.13', '4.18', '4.24', '4.34', '4.38',
  '5.10', '5.18', '5.22', '5.24',
  '6.5', '6.6', '6.19', '6.26', '6.30', '6.34', '6.35', '6.40',
  '7.7', '7.14', '7.16', '7.19',
  '8.5', '8.6', '8.13', '8.15',
  '9.22', '9.26', '9.27', '9.30', '9.34',
  '10.8', '10.9', '10.10', '10.20', '10.41',
  '11.12', '11.15', '11.32', '11.33', '11.55',
  '12.13', '12.14', '12.15', '12.19', '12.20',
  '13.1', '13.2', '13.27',
  '14.5', '14.18', '14.26',
  '15.1', '15.6', '15.7', '15.15', '15.18',
  '16.1', '16.2', '16.3', '16.21', '16.24',
  '17.3', '17.15', '17.23', '17.28',
  '18.46', '18.47', '18.54', '18.55', '18.61', '18.63', '18.65', '18.66', '18.78'
]);

// Topic tagger
function assignTopics(ch, v) {
  const tags = [];
  const ref = `${ch}.${v}`;
  if ([2, 3, 4, 5, 18].includes(ch)) tags.push("Karma");
  if ([1, 2, 3, 18].includes(ch)) tags.push("Dharma");
  if ([7, 9, 10, 11, 12, 18].includes(ch)) tags.push("Bhakti");
  if ([2, 5, 8, 14, 18].includes(ch)) tags.push("Moksha");
  if ([5, 6, 8].includes(ch)) tags.push("Meditation");
  if ([2, 3, 5, 16].includes(ch)) tags.push("Anger Management");
  if ([2, 6, 12, 18].includes(ch)) tags.push("Stress Management");
  if ([2, 3, 6, 17].includes(ch)) tags.push("Self-Control");
  if ([3, 4, 10, 18].includes(ch)) tags.push("Leadership");
  if ([2, 5, 6, 14, 18].includes(ch)) tags.push("Happiness");
  if ([2, 4, 7, 9, 13, 15].includes(ch)) tags.push("Knowledge");
  if ([2, 6, 16, 17].includes(ch)) tags.push("Discipline");
  if ([2, 5, 6, 12].includes(ch)) tags.push("Peace of Mind");
  return tags.length > 0 ? tags : ["Wisdom", "Spirituality"];
}

const compiledVerses = rawVerses.map(v => {
  const chNum = v.chapter_number;
  const vNum = v.verse_number;
  const verseId = v.id;
  const key = `${chNum}.${vNum}`;

  const translations = transByVerse[verseId] || [];
  const commentaries = commByVerse[verseId] || [];

  // Pick Hindi translation (prefer Ramsukhdas or Tejomayananda)
  const hiTransObj = translations.find(t => t.authorName === 'Swami Ramsukhdas') ||
                     translations.find(t => t.authorName === 'Swami Tejomayananda') ||
                     translations.find(t => (t.lang || '').toLowerCase() === 'hindi') ||
                     {};
  const hiTrans = (hiTransObj.description || '').trim();

  // Pick English translation (prefer Sivananda, Gambhirananda or Adidevananda)
  const enTransObj = translations.find(t => t.authorName === 'Swami Sivananda') ||
                     translations.find(t => t.authorName === 'Swami Gambirananda') ||
                     translations.find(t => t.authorName === 'Swami Adidevananda') ||
                     translations.find(t => (t.lang || '').toLowerCase() === 'english') ||
                     {};
  const enTrans = (enTransObj.description || '').trim();

  // Translations by author map
  const translationsByAuthor = {};
  translations.forEach(t => {
    translationsByAuthor[t.authorName] = {
      author: t.authorName,
      lang: t.lang,
      text: t.description.trim()
    };
  });

  // Pick Hindi explanation (Chinmayananda)
  const hiCommObj = commentaries.find(c => c.authorName === 'Swami Chinmayananda') ||
                    commentaries.find(c => (c.lang || '').toLowerCase() === 'hindi') ||
                    {};
  const hiComm = (hiCommObj.description || '').trim();

  // Pick English explanation (Sivananda)
  const enCommObj = commentaries.find(c => c.authorName === 'Swami Sivananda') ||
                    commentaries.find(c => (c.lang || '').toLowerCase() === 'english') ||
                    {};
  const enComm = (enCommObj.description || '').trim();

  const padartha = parseWordMeanings(v.word_meanings);

  // Life lessons based on verse topics
  const lifeLessonsHi = [
    "वर्तमान कर्तव्य में पूर्ण मनोयोग और निष्ठा से संलग्न रहें, परिणाम की व्यर्थ चिंता न करें।",
    "सुख-दुःख, लाभ-हानि और जय-पराजय में चित्त का संतुलन बनाए रखना ही वास्तविक योग है।",
    "अपने कर्मों को स्वार्थ से ऊपर उठाकर समाज और लोककल्याण के लिए समर्पित करें।"
  ];

  const lifeLessonsEn = [
    "Dedicate your present actions with complete devotion without being paralyzed by anxiety over future outcomes.",
    "Cultivate mental composure in times of joy, sorrow, success, and adversity — this steadiness is true Yoga.",
    "Elevate your daily duties above narrow self-interest into a life of service and universal goodwill."
  ];

  const spiritualInterpHi = hiComm ? hiComm.substring(0, 300) + '...' : `अध्याय ${chNum} के इस श्लोक में भगवान श्रीकृष्ण आत्मतत्व, कर्तव्य-धर्म और परम शांति की प्राप्ति का गूढ़ रहस्य उद्घाटित करते हैं।`;
  const spiritualInterpEn = enComm ? enComm.substring(0, 300) + '...' : `In this sacred verse of Chapter ${chNum}, Lord Krishna illuminates the immortal essence of the Self and the path of unshakeable inner peace.`;

  return {
    chapter_number: chNum,
    verse_number: vNum,
    slug: `chapter-${chNum}-verse-${vNum}`,
    text: (v.text || '').trim(),
    transliteration: (v.transliteration || '').trim(),
    word_meanings_text: (v.word_meanings || '').trim(),
    word_meanings: padartha,
    translation_hi: hiTrans || `अध्याय ${chNum}, श्लोक ${vNum} का पावन हिन्दी अर्थ।`,
    translation_en: enTrans || `Holy English translation of Chapter ${chNum}, Verse ${vNum}.`,
    translations_by_author: translationsByAuthor,
    explanation_hi: hiComm || `श्रीकृष्ण इस श्लोक में जीवन के परम सत्य और कर्म की निष्कामता का बोध कराते हैं।`,
    explanation_en: enComm || `Sri Krishna guides the spiritual aspirant towards mastery of mind and equanimity of intellect.`,
    spiritual_interpretation: {
      hi: spiritualInterpHi,
      en: spiritualInterpEn
    },
    life_lessons: {
      hi: lifeLessonsHi,
      en: lifeLessonsEn
    },
    audio_url: CHAPTER_AUDIO[chNum] || '',
    topics: assignTopics(chNum, vNum),
    is_popular: POPULAR_VERSES.has(key)
  };
});

console.log(`Compiled ${compiledVerses.length} verses successfully!`);

// Save compiled verses
fs.writeFileSync(path.join(dataDir, 'verses.json'), JSON.stringify(compiledVerses, null, 2));
console.log('✅ Saved data/verses.json');

// Build Topics Collections (13 dedicated topics)
const TOPICS_CONFIG = [
  {
    id: "karma",
    title_en: "Karma & Duty",
    title_hi: "कर्म एवं कर्तव्य",
    icon: "Activity",
    description_en: "Mastering the art of selfless action, fulfilling your personal duty (Svadharma), and freeing yourself from anxiety over results.",
    description_hi: "निष्काम कर्म का विज्ञान, स्वधर्म का निष्ठापूर्वक पालन और कर्मफल की चिंता से मुक्त होकर कार्य करने की कला।",
    verse_refs: ["2.47", "2.48", "3.9", "3.19", "3.21", "3.35", "4.18", "18.47"]
  },
  {
    id: "dharma",
    title_en: "Dharma & Righteous Living",
    title_hi: "धर्म एवं नैतिक जीवन",
    icon: "Shield",
    description_en: "Understanding righteous moral responsibility, upholding cosmic harmony, and standing resolute for righteousness in adversity.",
    description_hi: "सत्य और धर्म का मार्ग, नैतिक कर्तव्यों का पालन और विपरीत परिस्थितियों में भी धर्म पर अडिग रहने का मार्गदर्शन।",
    verse_refs: ["1.1", "2.31", "3.35", "4.7", "4.8", "18.66", "18.78"]
  },
  {
    id: "bhakti",
    title_en: "Bhakti & Divine Love",
    title_hi: "भक्ति एवं भगवद्प्रेम",
    icon: "Heart",
    description_en: "The path of unconditional devotion, complete surrender, recognizing the divine in all beings, and experiencing unshakeable grace.",
    description_hi: "ईश्वर के प्रति अनन्य प्रेम, पूर्ण समर्पण, समस्त जीवों में परमात्मा का दर्शन और अगाध कृपा की प्राप्ति।",
    verse_refs: ["9.22", "9.26", "9.34", "11.55", "12.13", "12.14", "12.20", "18.65"]
  },
  {
    id: "moksha",
    title_en: "Moksha & Liberation",
    title_hi: "मोक्ष एवं परम मुक्ति",
    icon: "Sparkles",
    description_en: "Transcending the cycle of rebirth, dissolving the illusion of ego, and abiding in the eternal peace of Brahman.",
    description_hi: "जन्म-मरण के चक्र से मुक्ति, अहंकार का विसर्जन और परमानंद स्वरूप ब्रह्म में नित्य अवस्थान।",
    verse_refs: ["2.71", "2.72", "5.24", "8.15", "15.6", "18.54", "18.66"]
  },
  {
    id: "meditation",
    title_en: "Meditation & Dhyana",
    title_hi: "ध्यान एवं एकाग्रता",
    icon: "Eye",
    description_en: "The authentic science of seated meditation, posture, breath steadying, single-pointed concentration, and samadhi.",
    description_hi: "ध्यान की शास्त्रीय विधि, आसन, प्राणायाम, एकाग्रता और चित्त को स्थिर कर आत्म-साक्षात्कार करने की साधना।",
    verse_refs: ["6.10", "6.11", "6.12", "6.19", "6.25", "6.26", "8.12", "8.13"]
  },
  {
    id: "anger-management",
    title_en: "Anger Management",
    title_hi: "क्रोध नियंत्रण",
    icon: "Flame",
    description_en: "How desire breeds attachment, attachment breeds anger, anger destroys intellect, and how to nip destructive rage at its roots.",
    description_hi: "कामना से क्रोध की उत्पत्ति, क्रोध से बुद्धि का विनाश और विनाशकारी आवेश को समूल शांत करने की विधि।",
    verse_refs: ["2.62", "2.63", "3.37", "5.23", "5.26", "16.21"]
  },
  {
    id: "stress-management",
    title_en: "Stress Management & Mental Peace",
    title_hi: "तनाव मुक्ति एवं मानसिक संतुलन",
    icon: "Wind",
    description_en: "Dissolving anxiety, eliminating overthinking, and establishing calm balance amid modern deadlines and turbulent circumstances.",
    description_hi: "चिंता, अवसाद और व्यर्थ के भय से मुक्ति, तथा कठिन से कठिन परिस्थितियों में भी मन को शांत रखने का मार्ग।",
    verse_refs: ["2.14", "2.56", "6.5", "6.6", "12.15", "18.61"]
  },
  {
    id: "self-control",
    title_en: "Self-Control & Sense Mastery",
    title_hi: "आत्मसंयम एवं इन्द्रिय निग्रह",
    icon: "Compass",
    description_en: "Taming unruly senses like horses through wisdom, building steadfast willpower, and steering thoughts towards nobility.",
    description_hi: "इन्द्रियों को विवेक से वश में करना, दृढ़ इच्छाशक्ति का विकास और मन को उच्च आदर्शों की ओर प्रेरित करना।",
    verse_refs: ["2.58", "2.60", "2.61", "2.68", "3.41", "3.42", "6.35"]
  },
  {
    id: "leadership",
    title_en: "Leadership & Ethical Guidance",
    title_hi: "नेतृत्व एवं आदर्श आचरण",
    icon: "Crown",
    description_en: "Leading by personal example, inspiring teams through integrity, setting high moral benchmarks, and caring for collective welfare (Lokasangraha).",
    description_hi: "स्वयं श्रेष्ठ आचरण कर दूसरों को प्रेरित करना, सत्यनिष्ठा से नेतृत्व करना और लोककल्याण को सर्वोपरि रखना।",
    verse_refs: ["3.20", "3.21", "4.1", "10.41", "18.46", "18.78"]
  },
  {
    id: "happiness",
    title_en: "True Happiness & Joy",
    title_hi: "सच्चा सुख एवं आनंद",
    icon: "Sun",
    description_en: "Distinguishing between fleeting sensory pleasures that lead to sorrow and the lasting, nectarine joy of the awakened soul.",
    description_hi: "क्षणिक विषयों के दुःखदायी सुख और आत्मा के अक्षय, अमृतमय आनंद के बीच का स्पष्ट विवेक।",
    verse_refs: ["2.65", "2.66", "5.21", "5.22", "6.28", "18.36", "18.37"]
  },
  {
    id: "knowledge",
    title_en: "Spiritual Knowledge & Wisdom",
    title_hi: "दिव्य ज्ञान एवं विवेक",
    icon: "BookOpen",
    description_en: "There is nothing in this world as purifying as divine wisdom; cutting through doubts with the razor sword of spiritual understanding.",
    description_hi: "संसार में ज्ञान के समान पवित्र करने वाला कुछ भी नहीं है; ज्ञान की तलवार से संशयों का छेदन करने का उपदेश।",
    verse_refs: ["4.34", "4.38", "4.39", "4.42", "7.2", "9.2", "13.7", "13.11"]
  },
  {
    id: "discipline",
    title_en: "Discipline & Noble Conduct",
    title_hi: "अनुशासन एवं जीवन शैली",
    icon: "Award",
    description_en: "Balance in eating, sleeping, recreation, and working; regulating habits to cultivate optimal physical and mental vitality.",
    description_hi: "आहार, निद्रा, विहार और कर्मों में सम्यक संतुलन, तथा जीवन को अनुशासित व ऊर्जावान बनाने के नियम।",
    verse_refs: ["6.16", "6.17", "16.1", "16.2", "16.3", "17.14", "17.15", "17.16"]
  },
  {
    id: "peace-of-mind",
    title_en: "Peace of Mind (Shanti)",
    title_hi: "मन की परम शांति",
    icon: "Feather",
    description_en: "For the undisciplined there is no wisdom, without wisdom there is no peace, and without peace, where is happiness?",
    description_hi: "जिसका मन शांत नहीं उसे ज्ञान नहीं, अशांत को शांति नहीं, और जिसे शांति नहीं उसे सुख कहाँ?",
    verse_refs: ["2.66", "2.70", "4.39", "5.12", "5.29", "12.12"]
  }
];

fs.writeFileSync(path.join(dataDir, 'topics.json'), JSON.stringify(TOPICS_CONFIG, null, 2));
console.log('✅ Saved data/topics.json (13 dedicated topics)');

// Generate 365 daily verses list
const dailyVerses = [];
const popularList = compiledVerses.filter(v => v.is_popular);
for (let i = 0; i < 365; i++) {
  const chosen = popularList[i % popularList.length];
  dailyVerses.push({
    day_of_year: i + 1,
    chapter_number: chosen.chapter_number,
    verse_number: chosen.verse_number,
    featured_thought_hi: chosen.life_lessons.hi[0],
    featured_thought_en: chosen.life_lessons.en[0]
  });
}
fs.writeFileSync(path.join(dataDir, 'daily-verses.json'), JSON.stringify(dailyVerses, null, 2));
console.log('✅ Saved data/daily-verses.json (365 daily verses)');

