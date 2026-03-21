/** Human-readable lines for GitHub public events API payloads. */

export function formatRelativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString();
}

type Payload = Record<string, unknown>;

export function describeGitHubEvent(type: string, repo: string, payload: Payload | undefined): string {
  const p = payload ?? {};
  switch (type) {
    case 'PushEvent': {
      const commits = (p.commits as unknown[])?.length ?? (p.size as number) ?? 0;
      return `Pushed ${commits} commit${commits === 1 ? '' : 's'} to ${repo}`;
    }
    case 'PullRequestEvent': {
      const action = String(p.action ?? 'updated');
      return `${action.charAt(0).toUpperCase() + action.slice(1)} pull request · ${repo}`;
    }
    case 'IssuesEvent': {
      const action = String(p.action ?? 'updated');
      return `${action.charAt(0).toUpperCase() + action.slice(1)} issue · ${repo}`;
    }
    case 'CreateEvent': {
      const refType = String(p.ref_type ?? 'ref');
      return `Created ${refType} · ${repo}`;
    }
    case 'DeleteEvent': {
      const refType = String(p.ref_type ?? 'ref');
      return `Deleted ${refType} · ${repo}`;
    }
    case 'ForkEvent': {
      const forkee = p.forkee as { full_name?: string } | undefined;
      return `Forked ${forkee?.full_name ?? repo}`;
    }
    case 'WatchEvent': {
      return `Starred ${repo}`;
    }
    case 'ReleaseEvent': {
      const release = p.release as { name?: string; tag_name?: string } | undefined;
      return `Released ${release?.name || release?.tag_name || 'version'} · ${repo}`;
    }
    case 'PublicEvent': {
      return `Open-sourced ${repo}`;
    }
    default:
      return `${type.replace('Event', '')} · ${repo}`;
  }
}
