import { useEffect, useState } from 'react';

export type GitHubActivityUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url?: string;
  html_url?: string;
};

export type GitHubActivityEvent = {
  id: string | number;
  type: string;
  repo: string;
  created_at: string;
  payload?: Record<string, unknown>;
};

export type GitHubActivityRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export function useGitHubActivity(username = 'anshitraj'): {
  user: GitHubActivityUser | null;
  events: GitHubActivityEvent[];
  repos: GitHubActivityRepo[];
  loading: boolean;
  error: boolean;
} {
  const [user, setUser] = useState<GitHubActivityUser | null>(null);
  const [events, setEvents] = useState<GitHubActivityEvent[]>([]);
  const [repos, setRepos] = useState<GitHubActivityRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/github-activity?username=${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        setUser(data.user ?? null);
        setEvents(Array.isArray(data.events) ? data.events : []);
        setRepos(Array.isArray(data.repos) ? data.repos : []);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setUser(null);
        setEvents([]);
        setRepos([]);
      })
      .finally(() => setLoading(false));
  }, [username]);

  return { user, events, repos, loading, error };
}
