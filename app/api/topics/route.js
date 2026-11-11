import { NextResponse } from 'next/server';
import { getAllTopics, getTopic } from '@/lib/gitaService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const topic = await getTopic(id);
      if (!topic) {
        return NextResponse.json({ success: false, error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, topic });
    }

    const topics = await getAllTopics();
    return NextResponse.json({ success: true, topics });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

