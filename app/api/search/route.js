import { NextResponse } from 'next/server';
import { searchGita } from '@/lib/gitaService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const chapter = searchParams.get('chapter') || 'all';

    const filters = {};
    if (chapter !== 'all') {
      filters.chapter = chapter;
    }

    const results = await searchGita(q, filters);
    return NextResponse.json({ success: true, count: results.length, results });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

