'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, RefreshCw } from 'lucide-react';
import ContributionSkyline, { type ContributionDay } from '@/components/ui/contribution-skyline';
import { SITE } from '@/data/site';
import styles from './HomePortfolio.module.css';

export function GitHubContributions() {
  const root = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let started = false;
    async function load() {
      if (started) return;
      started = true;
      try {
        const response = await fetch('/api/github-contributions', { signal: controller.signal });
        if (!response.ok) throw new Error('GitHub unavailable');
        const calendar = await response.json();
        const days: ContributionDay[] = calendar.weeks.flatMap((week: { contributionDays: { date: string; contributionCount: number }[] }) =>
          week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
        );
        if (!days.length || days.some((day) => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(day.count) || day.count < 0)) {
          throw new Error('Invalid calendar');
        }
        if (!controller.signal.aborted) setData(days);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        void load();
        observer.disconnect();
      }
    }, { rootMargin: '400px' });
    if (root.current) observer.observe(root.current);
    return () => { controller.abort(); observer.disconnect(); };
  }, [attempt]);

  return (
    <div ref={root} className={styles.githubPanel}>
      <div className={styles.githubTopline}>
        <a href={SITE.socials.github} target="_blank" rel="noreferrer"><Github aria-hidden /> @anshitraj <ArrowUpRight aria-hidden /></a>
        <span><i aria-hidden /> Live GitHub data · refreshed hourly</span>
      </div>
      {data ? (
        <ContributionSkyline data={data} defaultView="3d" palette="github" duration={900} className={styles.githubSkyline} />
      ) : (
        <div className={styles.githubPlaceholder} role="status" aria-live="polite">
          <Github aria-hidden />
          <strong>{error ? 'GitHub is taking a moment.' : 'Loading my contribution skyline…'}</strong>
          <p>{error ? 'You can still explore my repositories on GitHub.' : 'Fetching real daily activity from the last year.'}</p>
          {error ? <button type="button" onClick={() => { setError(false); setAttempt((value) => value + 1); }}><RefreshCw aria-hidden /> Try again</button> : null}
        </div>
      )}
      <p className={styles.githubFootnote}>Commits, pull requests, issues and reviews recorded by GitHub. Hover a day for its count, or switch between the heat map and skyline.</p>
    </div>
  );
}
