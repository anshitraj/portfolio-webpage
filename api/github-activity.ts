/**
 * GitHub REST: profile stats, recent public events, recently pushed repos.
 * Requires User-Agent (GitHub API policy). Set GITHUB_TOKEN in Vercel for higher rate limits.
 */
const UA = 'portfolio-website/1.0 (anshitraj)';

type Req = { query?: Record<string, string | string[] | undefined> };
type Res = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => Res;
  json: (body: unknown) => void;
};

function ghHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': UA,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  const username = (typeof req.query?.username === 'string' ? req.query.username : 'anshitraj') || 'anshitraj';

  try {
    const [userRes, eventsRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers: ghHeaders() }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=12`,
        { headers: ghHeaders() }
      ),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=8&type=owner`,
        { headers: ghHeaders() }
      ),
    ]);

    if (!userRes.ok) {
      res.status(userRes.status).json({ error: 'Failed to load GitHub user' });
      return;
    }

    const user = await userRes.json();
    const events = eventsRes.ok ? await eventsRes.json() : [];
    const repos = reposRes.ok ? await reposRes.json() : [];

    const formattedEvents = (Array.isArray(events) ? events : []).map((e: Record<string, unknown>) => ({
      id: e.id,
      type: e.type,
      repo: (e.repo as { name?: string })?.name ?? '',
      created_at: e.created_at,
      payload: e.payload,
    }));

    const formattedRepos = (Array.isArray(repos) ? repos : []).map((r: Record<string, unknown>) => ({
      name: r.name,
      full_name: r.full_name,
      html_url: r.html_url,
      description: r.description,
      stargazers_count: r.stargazers_count ?? 0,
      forks_count: r.forks_count ?? 0,
      language: r.language,
      updated_at: r.updated_at,
    }));

    res.status(200).json({
      user: {
        login: user.login,
        public_repos: user.public_repos ?? 0,
        followers: user.followers ?? 0,
        following: user.following ?? 0,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      },
      events: formattedEvents,
      repos: formattedRepos,
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to fetch' });
  }
}
