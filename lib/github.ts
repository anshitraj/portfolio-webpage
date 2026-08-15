/**
 * GitHub proxies. Ported from the old Vercel serverless functions.
 * Set GITHUB_TOKEN for 5,000 req/h; unauthenticated is 60/h.
 */
const UA = 'anshitraj-portfolio/2.0 (anshitraj)';
const GRAPHQL = 'https://api.github.com/graphql';

export const DEFAULT_USER = 'anshitraj';

function headers(json = false): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': UA,
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export type GithubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export type GithubEvent = {
  id: string;
  type: string;
  repo: string;
  created_at: string;
};

export type GithubActivity = {
  user: {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    html_url: string;
  };
  events: GithubEvent[];
  repos: GithubRepo[];
};

export async function fetchActivity(
  username = DEFAULT_USER,
  revalidate = 300
): Promise<GithubActivity> {
  const opts = { headers: headers(), next: { revalidate } };

  const [userRes, eventsRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, opts),
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=12`, opts),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12&type=owner`,
      opts
    ),
  ]);

  if (!userRes.ok) throw new Error(`GitHub user request failed: ${userRes.status}`);

  const user = await userRes.json();
  const events = eventsRes.ok ? await eventsRes.json() : [];
  const repos = reposRes.ok ? await reposRes.json() : [];

  return {
    user: {
      login: user.login,
      public_repos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    },
    events: (Array.isArray(events) ? events : []).map((e: Record<string, unknown>) => ({
      id: String(e.id),
      type: String(e.type),
      repo: (e.repo as { name?: string })?.name ?? '',
      created_at: String(e.created_at),
    })),
    repos: (Array.isArray(repos) ? repos : []).map((r: Record<string, unknown>) => ({
      name: String(r.name),
      full_name: String(r.full_name),
      html_url: String(r.html_url),
      description: (r.description as string) ?? null,
      stargazers_count: Number(r.stargazers_count ?? 0),
      forks_count: Number(r.forks_count ?? 0),
      language: (r.language as string) ?? null,
      updated_at: String(r.updated_at),
    })),
  };
}

export type LanguageSlice = {
  name: string;
  /** Bytes of source across every counted repository. */
  bytes: number;
  /** Percentage of the counted total, 0–100. */
  share: number;
};

export type LanguageBreakdown = {
  languages: LanguageSlice[];
  totalBytes: number;
  repoCount: number;
};

/**
 * Real language byte counts across public repositories — the same measure
 * GitHub's own language bar uses, aggregated over every repo instead of one.
 *
 * Forks are excluded: they would report code someone else wrote. Anything under
 * half a percent is folded into "Other" rather than rendered as an invisible
 * sliver.
 */
export async function fetchLanguages(
  username = DEFAULT_USER,
  revalidate = 3600
): Promise<LanguageBreakdown> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(
          first: 100
          isFork: false
          ownerAffiliations: OWNER
          privacy: PUBLIC
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            languages(first: 12, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name } }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate },
  });

  const data = await res.json();
  if (data?.errors?.length) throw new Error(data.errors[0]?.message ?? 'GraphQL error');

  const nodes = data?.data?.user?.repositories?.nodes;
  if (!Array.isArray(nodes) || nodes.length === 0) throw new Error('No repository data');

  const totals = new Map<string, number>();
  let repoCount = 0;

  for (const repo of nodes) {
    const edges = repo?.languages?.edges;
    if (!Array.isArray(edges) || edges.length === 0) continue;
    repoCount += 1;
    for (const edge of edges) {
      const name = edge?.node?.name;
      const size = Number(edge?.size ?? 0);
      if (!name || !Number.isFinite(size) || size <= 0) continue;
      totals.set(name, (totals.get(name) ?? 0) + size);
    }
  }

  const totalBytes = [...totals.values()].reduce((sum, n) => sum + n, 0);
  if (totalBytes === 0) throw new Error('No language data');

  const ranked = [...totals.entries()]
    .map(([name, bytes]) => ({ name, bytes, share: (bytes / totalBytes) * 100 }))
    .sort((a, b) => b.bytes - a.bytes);

  const major = ranked.filter((l) => l.share >= 0.5);
  const minorBytes = ranked
    .filter((l) => l.share < 0.5)
    .reduce((sum, l) => sum + l.bytes, 0);

  const languages =
    minorBytes > 0
      ? [...major, { name: 'Other', bytes: minorBytes, share: (minorBytes / totalBytes) * 100 }]
      : major;

  return { languages, totalBytes, repoCount };
}

export type ContributionCalendar = {
  weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
  totalContributions: number;
};

export async function fetchContributions(
  username = DEFAULT_USER,
  revalidate = 3600
): Promise<ContributionCalendar> {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({
      query,
      variables: { username, from: from.toISOString(), to: to.toISOString() },
    }),
    next: { revalidate },
  });

  const data = await res.json();
  if (data?.errors?.length) throw new Error(data.errors[0]?.message ?? 'GraphQL error');

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar?.weeks?.length) throw new Error('No contribution data');

  return { weeks: calendar.weeks, totalContributions: calendar.totalContributions ?? 0 };
}
