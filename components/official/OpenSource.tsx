import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { projects } from '@/data/projects';
import { SITE } from '@/data/site';
import { fetchActivity, type GithubActivity } from '@/lib/github';
import { formatDate } from '@/lib/utils';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

const EVENT_LABEL: Record<string, string> = {
  PushEvent: 'Pushed to',
  CreateEvent: 'Created',
  PullRequestEvent: 'Pull request on',
  IssuesEvent: 'Issue on',
  WatchEvent: 'Starred',
  ForkEvent: 'Forked',
  ReleaseEvent: 'Released',
};

/** Projects that have a public repository — the curated half of this section. */
const featuredRepos = projects.filter((p) => Boolean(p.links.repo));

export async function OpenSource() {
  // The page must render even when GitHub rate-limits or is unreachable.
  let activity: GithubActivity | null = null;
  try {
    activity = await fetchActivity();
  } catch {
    activity = null;
  }

  const events = (activity?.events ?? [])
    .filter((e) => EVENT_LABEL[e.type])
    .slice(0, 6);

  return (
    <Section>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Open source & engineering"
            title="The code that’s public."
            standfirst="Infrastructure nobody can read isn’t infrastructure. These are the repositories worth your time, not a repository count."
            action={{ label: 'GitHub profile', href: SITE.socials.github }}
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/*
            Featured repositories.

            `min-w-0` is load-bearing: a grid item defaults to min-width:auto,
            so the longest repo name — which `truncate` renders as nowrap — set
            the column's minimum and widened the whole page on mobile.
          */}
          <Reveal className="min-w-0 lg:col-span-7" staggerChildren>
            <p className="eyebrow">Featured repositories</p>
            <ul className="mt-5 border-t border-rule">
              {featuredRepos.map((p) => (
                <RevealItem key={p.slug} as="li" className="border-b border-rule">
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-6 py-5"
                  >
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-1.5 font-mono text-[14px] text-ink">
                        <span className="link-underline min-w-0 truncate">
                          {p.links.repo?.replace('https://github.com/', '')}
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </h3>
                      <p className="mt-1.5 max-w-prose text-[13.5px] leading-relaxed text-muted">
                        {p.oneLiner}
                      </p>
                      <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                        {p.tech.slice(0, 4).map((t) => (
                          <li key={t} className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </ul>
          </Reveal>

          {/* Live signal */}
          <Reveal className="lg:col-span-5" delay={0.08}>
            {activity ? (
              <>
                <p className="eyebrow">Profile</p>
                <dl className="mt-5 grid grid-cols-3 gap-px border border-rule bg-rule">
                  <div className="bg-paper p-4">
                    <dd className="tnum font-mono text-[20px] font-medium text-ink">
                      {activity.user.public_repos}
                    </dd>
                    <dt className="mt-1 text-[11.5px] text-muted">Public repos</dt>
                  </div>
                  <div className="bg-paper p-4">
                    <dd className="tnum font-mono text-[20px] font-medium text-ink">
                      {activity.user.followers}
                    </dd>
                    <dt className="mt-1 text-[11.5px] text-muted">Followers</dt>
                  </div>
                  <div className="bg-paper p-4">
                    <dd className="tnum font-mono text-[20px] font-medium text-ink">
                      {activity.repos.reduce((sum, r) => sum + r.stargazers_count, 0)}
                    </dd>
                    <dt className="mt-1 text-[11.5px] text-muted">Recent stars</dt>
                  </div>
                </dl>

                {events.length > 0 ? (
                  <>
                    <p className="eyebrow mt-9">Recent activity</p>
                    <ul className="mt-4 space-y-3">
                      {events.map((e) => (
                        <li key={e.id} className="flex items-baseline justify-between gap-4">
                          <span className="min-w-0 truncate text-[13px] text-muted">
                            <span className="text-ink">{EVENT_LABEL[e.type]}</span>{' '}
                            {e.repo.replace(`${SITE.handle}/`, '')}
                          </span>
                          <time
                            dateTime={e.created_at}
                            className="shrink-0 font-mono text-[11px] text-muted"
                          >
                            {formatDate(e.created_at)}
                          </time>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {activity.repos.length > 0 ? (
                  <>
                    <p className="eyebrow mt-9">Recently pushed</p>
                    <ul className="mt-4 space-y-3">
                      {activity.repos.slice(0, 5).map((r) => (
                        <li key={r.full_name}>
                          <a
                            href={r.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-baseline justify-between gap-4"
                          >
                            <span className="link-underline min-w-0 truncate font-mono text-[13px] text-ink">
                              {r.name}
                            </span>
                            <span className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-muted">
                              {r.language ? <span>{r.language}</span> : null}
                              <span className="inline-flex items-center gap-1">
                                <Star className="h-3 w-3" aria-hidden />
                                {r.stargazers_count}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <GitFork className="h-3 w-3" aria-hidden />
                                {r.forks_count}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </>
            ) : (
              <div className="rounded-card border border-rule bg-surface p-5">
                <p className="text-[13.5px] leading-relaxed text-muted">
                  Live GitHub data is unavailable right now.{' '}
                  <a
                    href={SITE.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-ink"
                  >
                    View the profile directly
                  </a>
                  .
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
