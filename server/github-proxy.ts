/** Shared GitHub API logic for Express (local + production Node server). */

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const UA = "portfolio-website/1.0 (anshitraj)";

function graphqlHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    "Content-Type": "application/json",
    "User-Agent": UA,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function restHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": UA,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchGithubContributions(username: string) {
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

  const response = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: graphqlHeaders(),
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  const data = (await response.json()) as {
    errors?: { message?: string }[];
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions?: number;
            weeks?: { contributionDays: { date: string; contributionCount: number }[] }[];
          };
        };
      };
    };
  };

  if (data?.errors?.length) {
    throw Object.assign(new Error(data.errors[0]?.message || "GraphQL error"), {
      status: 400,
    });
  }

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar?.weeks?.length) {
    throw Object.assign(new Error("No contribution data"), { status: 404 });
  }

  return {
    weeks: calendar.weeks,
    totalContributions: calendar.totalContributions ?? 0,
  };
}

export async function fetchGithubActivity(username: string) {
  const [userRes, eventsRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: restHeaders(),
    }),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=12`,
      { headers: restHeaders() },
    ),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=8&type=owner`,
      { headers: restHeaders() },
    ),
  ]);

  if (!userRes.ok) {
    throw Object.assign(new Error("Failed to load GitHub user"), {
      status: userRes.status,
    });
  }

  const user = (await userRes.json()) as Record<string, unknown>;
  const events = eventsRes.ok ? await eventsRes.json() : [];
  const repos = reposRes.ok ? await reposRes.json() : [];

  const formattedEvents = (Array.isArray(events) ? events : []).map(
    (e: Record<string, unknown>) => ({
      id: e.id,
      type: e.type,
      repo: (e.repo as { name?: string })?.name ?? "",
      created_at: e.created_at,
      payload: e.payload,
    }),
  );

  const formattedRepos = (Array.isArray(repos) ? repos : []).map(
    (r: Record<string, unknown>) => ({
      name: r.name,
      full_name: r.full_name,
      html_url: r.html_url,
      description: r.description,
      stargazers_count: r.stargazers_count ?? 0,
      forks_count: r.forks_count ?? 0,
      language: r.language,
      updated_at: r.updated_at,
    }),
  );

  return {
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
  };
}
