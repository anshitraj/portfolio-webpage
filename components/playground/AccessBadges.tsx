'use client';

import { useState } from 'react';
import Image from 'next/image';
import { experience } from '@/data/experience';
import { visible } from '@/lib/metrics';
import { Panel, BenchLabel } from './bench';
import { cn } from '@/lib/utils';

/** Stable per-role credential id, e.g. WEBCOIN·DEC22. */
function badgeId(company: string, period: string) {
  const org = company.replace(/[^A-Za-z]/g, '').slice(0, 7).toUpperCase();
  const start = period.split('—')[0].trim().replace(/\s+/g, '').replace(/20/, '').toUpperCase();
  return `${org}·${start}`;
}

function Badge({ job }: { job: (typeof experience)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const metrics = visible(job.metrics);
  const id = badgeId(job.company, job.period);

  return (
    <div className="flip h-[330px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        aria-label={`${job.company} — ${flipped ? 'show front' : 'show details'}`}
        className={cn('flip block h-full w-full text-left', flipped && 'is-flipped')}
      >
        <div className="flip-inner">
          {/* ── Front: the pass itself ── */}
          <div className="flip-face rounded-[5px] border border-[rgb(var(--bench-edge))] bg-[rgb(var(--bench-panel))]">
            {/* Lanyard slot */}
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-14 rounded-full bg-[rgb(var(--bench-edge))]" aria-hidden />
            </div>

            <div className="flex h-[calc(100%-1.5rem)] flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                {job.logoSrc ? (
                  <Image
                    src={job.logoSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-[3px] border border-[rgb(var(--bench-edge))] object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[rgb(var(--bench-edge))] font-mono text-[12px] text-[rgb(var(--bench-dim))]">
                    {job.logoEmoji ? (
                      <span className="text-[18px] leading-none">{job.logoEmoji}</span>
                    ) : (
                      job.company.slice(0, 2).toUpperCase()
                    )}
                  </span>
                )}
                {job.weight === 'primary' ? (
                  <span className="rounded-[3px] border border-[rgb(var(--live))] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--live))]">
                    Full access
                  </span>
                ) : (
                  <span className="rounded-[3px] border border-[rgb(var(--bench-edge))] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))]">
                    Visitor
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-mono text-[16px] leading-tight text-[rgb(var(--bench-text))]">
                {job.company}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-snug text-[rgb(var(--bench-dim))]">
                {job.role}
              </p>

              <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--bench-dim))]">
                {job.period}
              </p>

              {/* Barcode */}
              <div className="mt-3 flex h-7 items-end gap-[2px]" aria-hidden>
                {Array.from({ length: 34 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 bg-[rgb(var(--bench-edge))]"
                    style={{ height: `${((i * 37) % 5) * 18 + 28}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[rgb(var(--bench-dim))]">
                <span>{id}</span>
                <span className="text-[rgb(var(--signal))]">TAP TO FLIP →</span>
              </div>
            </div>
          </div>

          {/* ── Back: what the access was actually used for ── */}
          <div className="flip-face flip-back overflow-y-auto rounded-[5px] border border-[rgb(var(--bench-edge))] bg-[rgb(var(--bench-panel))] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--signal))]">
              {id}
            </p>
            <h3 className="mt-1.5 font-mono text-[14px] text-[rgb(var(--bench-text))]">
              {job.company}
            </h3>

            <ul className="mt-3 space-y-2">
              {job.bullets.slice(0, 4).map((b) => (
                <li
                  key={b}
                  className="relative pl-3 text-[11.5px] leading-relaxed text-[rgb(var(--bench-dim))]"
                >
                  <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-[rgb(var(--signal))]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            {metrics.length > 0 ? (
              <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[rgb(var(--bench-edge))] pt-3">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-mono text-[13px] text-[rgb(var(--bench-text))]">{m.value}</dd>
                    <dt className="text-[11px] text-[rgb(var(--bench-dim))]">{m.label}</dt>
                  </div>
                ))}
              </dl>
            ) : null}

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--signal))]">
              ← Tap to flip back
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

export function AccessBadges() {
  return (
    <section aria-labelledby="bench-access">
      <BenchLabel index="04" title="Access badges" hint={`${experience.length} ISSUED`} />
      <p id="bench-access" className="sr-only">
        Work experience
      </p>

      <Panel className="p-4 sm:p-6" screws={false}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`}>
              <Badge job={job} />
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  );
}
