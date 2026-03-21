import { GitBranch, BookOpen, Users, UserPlus, Activity } from 'lucide-react';
import { GitHubContributionsHeatmap } from '@/components/github/GitHubContributionsHeatmap';
import { useGitHubActivity } from '@/hooks/use-github-activity';
import { describeGitHubEvent, formatRelativeTime } from '@/lib/githubActivityFormat';
import { GITHUB_BLURB, SITE } from '@/content/siteProfile';

export function GitHubActivitySection() {
  const { user, events, repos, loading, error } = useGitHubActivity(SITE.handle);

  return (
    <section className="space-y-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500">// GitHub activity</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">Open source & commits</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{GITHUB_BLURB}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: 'repos',
            value: loading ? '—' : String(user?.public_repos ?? '—'),
            icon: BookOpen,
          },
          {
            label: 'followers',
            value: loading ? '—' : String(user?.followers ?? '—'),
            icon: Users,
          },
          {
            label: 'following',
            value: loading ? '—' : String(user?.following ?? '—'),
            icon: UserPlus,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 px-5 py-4"
          >
            <s.icon className="h-8 w-8 text-zinc-600 dark:text-zinc-500" />
            <div>
              <div className="text-2xl font-bold text-zinc-950 dark:text-white">{s.value}</div>
              <div className="text-xs lowercase text-zinc-600 dark:text-zinc-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-xs text-amber-500/90">
          Live GitHub stats unavailable (rate limit or network). Contribution graph may still load separately.
        </p>
      )}

      {/* Contribution graph */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <GitBranch className="h-4 w-4 text-zinc-600 dark:text-zinc-500" />
          Contribution graph
        </div>
        <GitHubContributionsHeatmap />
        <div className="mt-4 flex flex-col gap-2 text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Last 12 months</span>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="h-3 w-3 rounded-sm bg-zinc-800" />
              <span className="h-3 w-3 rounded-sm bg-emerald-900/80" />
              <span className="h-3 w-3 rounded-sm bg-emerald-600" />
              <span className="h-3 w-3 rounded-sm bg-emerald-400" />
              <span className="h-3 w-3 rounded-sm bg-emerald-300" />
            </div>
            <span>More</span>
          </div>
        </div>
        <a
          href={SITE.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-medium text-sky-400 hover:text-sky-300"
        >
          View profile on GitHub →
        </a>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent activity feed */}
        <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <Activity className="h-4 w-4 text-emerald-500" />
            Recent activity
          </div>
          {loading ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-500">Loading events…</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-500">No recent public events to show.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((e) => (
                <li key={String(e.id)} className="flex gap-3 text-sm">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <div>
                    <span className="font-medium text-zinc-950 dark:text-white">
                      {describeGitHubEvent(e.type, e.repo, e.payload)}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-500"> · {formatRelativeTime(e.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent repositories */}
        <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <GitBranch className="h-4 w-4 text-zinc-600 dark:text-zinc-500" />
            Recent repositories
          </div>
          {loading ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-500">Loading repos…</p>
          ) : repos.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-500">No repositories loaded.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {repos.map((r) => (
                <li key={r.full_name}>
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-zinc-200/80 dark:border-white/5 bg-zinc-200/60 dark:bg-black/40 p-3 transition-colors hover:border-zinc-300 dark:border-white/15"
                  >
                    <div className="font-semibold text-zinc-950 dark:text-white">{r.name}</div>
                    <div className="mt-1 flex gap-3 text-xs text-zinc-600 dark:text-zinc-500">
                      <span>★ {r.stargazers_count}</span>
                      <span>⑂ {r.forks_count}</span>
                      {r.language ? <span>{r.language}</span> : null}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
