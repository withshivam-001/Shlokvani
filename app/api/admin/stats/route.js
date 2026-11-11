import { NextResponse } from 'next/server';
import { getTranslationStats, getAllChapters } from '@/lib/gitaService';
import { isDbConnected } from '@/lib/mongodb';

export async function GET() {
  try {
    const stats = await getTranslationStats();
    const chapters = await getAllChapters();
    return NextResponse.json({
      success: true,
      stats,
      chaptersCount: chapters.length,
      isDbConnected: isDbConnected(),
      totalVerses: 701,
      totalCommentaries: 1402,
      totalTranslations: 4907,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

