'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, RefreshCw } from 'lucide-react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import ContributionSkyline, { type ContributionDay } from '@/components/ui/contribution-skyline';
import { SITE } from '@/data/site';
import styles from './HomePortfolio.module.css';

export function GitHubContributions() {
  const root = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [progress, setProgress] = useState(0);
  const [manualView, setManualView] = useState<'2d' | '3d' | null>(null);
  const manualScrollStart = useRef(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start 82%', 'start 38%'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(value);
    // A deliberate view selection stays put until the visitor continues scrolling.
    if (Math.abs(window.scrollY - manualScrollStart.current) > 64) setManualView(null);
  });

  const cameraProgress = reducedMotion ? (progress >= 0.5 ? 1 : 0) : progress;
  const view = manualView ?? (cameraProgress >= 0.5 ? '3d' : '2d');

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
        <span><i aria-hidden /> {data ? 'Live activity · updated hourly' : 'GitHub activity'}</span>
      </div>
      {data ? (
        <ContributionSkyline
          data={data}
          defaultView="2d"
          view={view}
          scrollProgress={manualView ? undefined : cameraProgress}
          scrollMorph
          onViewChange={(next) => { manualScrollStart.current = window.scrollY; setManualView(next); }}
          palette="github"
          duration={200}
          className={styles.githubSkyline}
        />
      ) : (
        <div className={styles.githubPlaceholder} role="status" aria-live="polite">
          <Github aria-hidden />
          <strong>{error ? 'GitHub is taking a moment.' : 'Loading my contribution skyline…'}</strong>
          <p>{error ? 'You can still explore my repositories on GitHub.' : 'Fetching real daily activity from the last year.'}</p>
          {error ? <button type="button" onClick={() => { setError(false); setAttempt((value) => value + 1); }}><RefreshCw aria-hidden /> Try again</button> : null}
        </div>
      )}
      <p className={styles.githubFootnote}>Scroll to raise the skyline. Hover for daily counts. Use the view switch any time.</p>
    </div>
  );
}
