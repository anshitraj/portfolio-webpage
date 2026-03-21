/**
 * Vercel serverless proxy for GitHub contribution calendar.
 * Set GITHUB_TOKEN in Vercel project env for 5,000 req/h (optional; unauthenticated = 60/h).
 */
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

type Req = { query?: Record<string, string | string[] | undefined> };
type Res = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => Res;
  json: (body: unknown) => void;
};

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  const username = (typeof req.query?.username === 'string' ? req.query.username : 'anshitraj') || 'anshitraj';

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

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-website/1.0 (anshitraj)',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    });

    const data = await response.json();

    if (data?.errors?.length) {
      res.status(400).json({ error: data.errors[0]?.message || 'GraphQL error' });
      return;
    }

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar?.weeks?.length) {
      res.status(404).json({ error: 'No contribution data' });
      return;
    }

    res.status(200).json({
      weeks: calendar.weeks,
      totalContributions: calendar.totalContributions ?? 0,
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to fetch' });
  }
}
