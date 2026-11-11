import { NextResponse } from 'next/server';
import { getAllChapters } from '@/lib/gitaService';

export async function GET() {
  try {
    const chapters = await getAllChapters();
    return NextResponse.json({ success: true, chapters });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

