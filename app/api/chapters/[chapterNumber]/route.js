import { NextResponse } from 'next/server';
import { getChapter, getChapterVerses } from '@/lib/gitaService';

export async function GET(request, { params }) {
  try {
    const chNum = parseInt(params.chapterNumber, 10);
    const chapter = await getChapter(chNum);
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 });
    }
    const verses = await getChapterVerses(chNum);
    return NextResponse.json({ success: true, chapter, verses });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

