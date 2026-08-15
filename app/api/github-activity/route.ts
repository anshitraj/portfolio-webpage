import { NextResponse } from 'next/server';
import { fetchActivity, DEFAULT_USER } from '@/lib/github';

export const revalidate = 300;

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get('username') ?? DEFAULT_USER;

  try {
    const data = await fetchActivity(username, revalidate);
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch' },
      { status: 502 }
    );
  }
}
