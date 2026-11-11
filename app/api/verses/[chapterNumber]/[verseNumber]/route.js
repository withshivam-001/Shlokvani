import { NextResponse } from 'next/server';
import { getVerse, getChapter } from '@/lib/gitaService';

export async function GET(request, { params }) {
  try {
    const ch = parseInt(params.chapterNumber, 10);
    const v = parseInt(params.verseNumber, 10);
    const verse = await getVerse(ch, v);
    if (!verse) {
      return NextResponse.json({ success: false, error: 'Verse not found' }, { status: 404 });
    }
    const chapter = await getChapter(ch);
    return NextResponse.json({ success: true, verse, chapter });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

