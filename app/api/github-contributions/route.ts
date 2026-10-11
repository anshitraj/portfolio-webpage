import { NextResponse } from 'next/server';
import { fetchContributions, DEFAULT_USER } from '@/lib/github';

export const revalidate = 3600;

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get('username') ?? DEFAULT_USER;
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username)) {
    return NextResponse.json({ error: 'Invalid GitHub username' }, { status: 400 });
  }

  try {
    const data = await fetchContributions(username, revalidate);
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch {
    return NextResponse.json(
      { error: 'GitHub contributions are temporarily unavailable' },
      { status: 502 }
    );
  }
}
