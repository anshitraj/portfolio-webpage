import { NextResponse } from 'next/server';
import { fetchContributions, DEFAULT_USER } from '@/lib/github';

export const revalidate = 3600;

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get('username') ?? DEFAULT_USER;

  try {
    const data = await fetchContributions(username, revalidate);
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch' },
      { status: 502 }
    );
  }
}
