'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { achievements } from '@/data/achievements';
import { visible } from '@/lib/metrics';
import { Panel, BenchLabel } from './bench';
import { cn } from '@/lib/utils';

const CATEGORIES = ['ALL', 'TECH', 'STARTUP', 'OPEN SOURCE', 'SPORT'] as const;

/**
 * Achievements as filed credential cards — punched index cards pulled from a
 * drawer, each stamped VERIFIED. Held-back achievements never enter the drawer,
 * so the count on the card is always the count of things that are confirmed.
 */
export function CredentialCards() {
  const all = useMemo(() => visible(achievements), []);
  const [category, setCategory] = useState<string>('ALL');
  const [i, setI] = useState(0);

  const cards = useMemo(
    () => (category === 'ALL' ? all : all.filter((a) => a.category === category)),
    [all, category]
  );

  // Only offer filters that actually have cards behind them.
  const available = useMemo(
    () => CATEGORIES.filter((c) => c === 'ALL' || all.some((a) => a.category === c)),
    [all]
  );

  if (cards.length === 0) return null;
  const card = cards[Math.min(i, cards.length - 1)];
  const step = (d: number) => setI((n) => (n + d + cards.length) % cards.length);

  return (
    <section aria-labelledby="bench-credentials">
      <BenchLabel index="06" title="Credential drawer" hint={`${all.length} FILED`} />
      <p id="bench-credentials" className="sr-only">
        Achievements
      </p>

      <Panel className="p-4 sm:p-6" screws={false}>
        {/* Drawer tabs */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {available.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setI(0);
              }}
              className={cn(
                'rounded-t-[3px] border-x border-t px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                c === category
                  ? 'border-[rgb(var(--signal))] text-[rgb(var(--signal))]'
                  : 'border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))] hover:text-[rgb(var(--bench-text))]'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* The card */}
        <article
          className="relative overflow-hidden rounded-[4px] border border-[rgb(var(--bench-edge))] bg-[#141414]"
          aria-live="polite"
        >
          {/* Punch holes down the left edge */}
          <div className="absolute inset-y-0 left-0 flex w-6 flex-col items-center justify-around border-r border-dashed border-[rgb(var(--bench-edge))] py-4" aria-hidden>
            {Array.from({ length: 8 }).map((_, n) => (
              <span key={n} className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--bench))]" />
            ))}
          </div>

          <div className="py-6 pl-10 pr-5 sm:pr-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--signal))]">
                  {card.category}
                </p>
                <h3 className="mt-2 font-mono text-[19px] leading-tight text-[rgb(var(--bench-text))] sm:text-[22px]">
                  {card.title}
                </h3>
                {card.result ? (
                  <p className="mt-1.5 text-[13px] text-[rgb(var(--bench-dim))]">{card.result}</p>
                ) : null}
              </div>

              {/* Stamp */}
              <span
                className="shrink-0 -rotate-[8deg] rounded-[3px] border-2 border-[rgb(var(--live))] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--live))]"
                aria-label="Verified"
              >
                Verified
              </span>
            </div>

            <p className="mt-4 max-w-prose text-[13px] leading-relaxed text-[rgb(var(--bench-dim))]">
              {card.description}
            </p>

            <dl className="mt-5 grid gap-x-8 gap-y-3 border-t border-[rgb(var(--bench-edge))] pt-4 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))]">
                  Issued
                </dt>
                <dd className="mt-0.5 font-mono text-[12.5px] text-[rgb(var(--bench-text))]">
                  {card.year}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))]">
                  Record ID
                </dt>
                <dd className="mt-0.5 font-mono text-[12.5px] uppercase text-[rgb(var(--bench-text))]">
                  {card.id.replace(/-/g, '').slice(0, 12)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))]">
                  Evidence
                </dt>
                <dd className="mt-0.5 flex flex-wrap gap-x-3 font-mono text-[12.5px]">
                  {card.projectSlug ? (
                    <Link
                      href={`/projects/${card.projectSlug}`}
                      className="text-[rgb(var(--signal))] underline underline-offset-4"
                    >
                      Case study
                    </Link>
                  ) : null}
                  {card.href ? (
                    <a
                      href={card.href.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[rgb(var(--signal))] underline underline-offset-4"
                    >
                      {card.href.label}
                    </a>
                  ) : null}
                  {!card.projectSlug && !card.href ? (
                    <span className="text-[rgb(var(--bench-dim))]">On file</span>
                  ) : null}
                </dd>
              </div>
            </dl>
          </div>
        </article>

        {/* Drawer controls */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[3px] border border-[rgb(var(--bench-edge))] px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))]"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            Prev
          </button>

          <span className="font-mono text-[11px] tabular-nums text-[rgb(var(--bench-dim))]">
            CARD {Math.min(i, cards.length - 1) + 1} OF {cards.length}
          </span>

          <button
            type="button"
            onClick={() => step(1)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[3px] border border-[rgb(var(--bench-edge))] px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))]"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </Panel>
    </section>
  );
}
