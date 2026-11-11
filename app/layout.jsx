import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import { getVerseOfTheDay } from '@/lib/gitaService';

export const metadata = {
  title: 'श्लोकवाणी (Shlokvani) – सम्पूर्ण श्रीमद्भगवद्गीता एवं सनातन ज्ञान',
  description: 'श्रीमद्भगवद्गीता के सभी 18 अध्याय और 700 मूल संस्कृत श्लोक, पदच्छेद, शब्दार्थ, हिन्दी एवं अंग्रेजी अनुवाद, विस्तृत व्याख्या और व्यावहारिक जीवन संदेश। Ancient Wisdom. Timeless Guidance.',
  keywords: 'Bhagavad Gita, Shlokvani, श्लोकवाणी, Sanskrit Shlokas, Gita 700 verses, Karma Yoga, Dharma, Moksha, Meditation, Lord Krishna',
  authors: [{ name: 'Shlokvani Team' }],
  metadataBase: new URL('https://shlokvani.org'),
  openGraph: {
    title: 'श्लोकवाणी (Shlokvani) – सम्पूर्ण श्रीमद्भगवद्गीता डिजिटल पुस्तकालय',
    description: 'Explore the eternal wisdom of all 700 Bhagavad Gita shlokas with word-by-word Sanskrit meaning, translations and life lessons.',
    type: 'website',
    locale: 'hi_IN',
    siteName: 'Shlokvani',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'श्लोकवाणी (Shlokvani) – Bhagavad Gita & Spiritual Knowledge Platform',
    description: 'All 18 chapters and 700 Sanskrit shlokas with authentic translations and audio recitations.',
  },
};

export const viewport = {
  themeColor: '#EA580C',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const daily = await getVerseOfTheDay();

  return (
    <html lang="hi" className="h-full bg-gray-50">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕉️</text></svg>" />
      </head>
      <body className="flex flex-col min-h-screen text-gray-800 antialiased pb-28">
        <ClientProviders initialDailyVerse={daily?.verse}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

