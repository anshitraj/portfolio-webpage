import { useEffect, useState } from 'react';
import { GITHUB_WEEKS, GITHUB_DAYS } from '@/content/githubContrib';

const GITHUB_USER = 'anshitraj';

type ContributionDay = { date: string; contributionCount: number };
type Week = { contributionDays: ContributionDay[] };

/** Map raw count to heatmap level 0–4 (same scale as GitHub's colors). */
function countToLevel(count: number, maxCount: number): number {
  if (count <= 0) return 0;
  if (maxCount <= 0) return 0;
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

/** Build 52×7 matrix from GitHub API weeks (Sun–Sat per week). Uses last 52 weeks. */
export function buildContribMatrix(weeks: Week[]): number[][] {
  let maxCount = 0;
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > maxCount) maxCount = day.contributionCount;
    }
  }
  const max = Math.max(maxCount, 1);
  // Use last 52 weeks to match "last 12 months"
  const start = Math.max(0, weeks.length - GITHUB_WEEKS);
  const matrix: number[][] = [];
  for (let w = 0; w < GITHUB_WEEKS; w++) {
    const row: number[] = [];
    const week = weeks[start + w];
    const days = week?.contributionDays ?? [];
    for (let d = 0; d < GITHUB_DAYS; d++) {
      const day = days[d];
      const count = day?.contributionCount ?? 0;
      row.push(countToLevel(count, max));
    }
    matrix.push(row);
  }
  return matrix;
}

export function useGitHubContributions(): {
  matrix: number[][] | null;
  loading: boolean;
  error: boolean;
  totalContributions: number | null;
} {
  const [matrix, setMatrix] = useState<number[][] | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const to = new Date();
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USER,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.errors?.length) throw new Error(data.errors[0]?.message ?? 'GraphQL error');
        const user = data?.data?.user;
        const collection = user?.contributionsCollection;
        const calendar = collection?.contributionCalendar;
        if (!calendar?.weeks?.length) throw new Error('No contribution data');
        setTotalContributions(calendar.totalContributions ?? null);
        setMatrix(buildContribMatrix(calendar.weeks));
        setError(false);
      })
      .catch(() => {
        setError(true);
        setMatrix(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { matrix, loading, error, totalContributions };
}
