import React from 'react';
import BookmarksClient from './BookmarksClient';

export const metadata = {
  title: 'मेरे पसंदीदा श्लोक एवं अध्ययन इतिहास – Shlokvani Bookmarks',
  description: 'आपके द्वारा सहेजे गए पसंदीदा श्लोक, व्यक्तिगत नोट्स और पठन इतिहास।',
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}

