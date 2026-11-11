import { NextResponse } from 'next/server';
import { getVerseOfTheDay } from '@/lib/gitaService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const daily = await getVerseOfTheDay(date);
    return NextResponse.json({ success: true, ...daily });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

