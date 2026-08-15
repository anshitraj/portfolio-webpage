'use client';

import { useEffect, useState } from 'react';
import { SITE, PHILOSOPHY } from '@/data/site';
import { projects } from '@/data/projects';
import { Panel, BenchLabel } from './bench';

const BOOT = [
  'workbench v2 — powering rails',
  `cartridges mounted ......... ${projects.length}`,
  'credential drawer .......... ok',
  'bench book ................. local',
  'ready',
];

function Boot() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= BOOT.length) return;
    const t = window.setTimeout(() => setN((v) => v + 1), n === 0 ? 200 : 150);
    return () => window.clearTimeout(t);
  }, [n]);

  return (
    <div className="font-mono text-[11.5px] leading-[1.9]">
      {BOOT.slice(0, n).map((line, i) => (
        <p key={line} className={i === BOOT.length - 1 ? 'text-[rgb(var(--live))]' : 'text-[rgb(var(--bench-dim))]'}>
          <span className="text-[rgb(var(--signal))]">›</span> {line}
        </p>
      ))}
      {n < BOOT.length ? (
        <span className="inline-block h-3 w-1.5 animate-blink bg-[rgb(var(--signal))] align-middle" aria-hidden />
      ) : null}
    </div>
  );
}

export function BenchHero() {
  return (
    <header className="pt-4">
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Nameplate */}
        <div className="lg:col-span-7">
          <Panel className="h-full p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[rgb(var(--signal))]">
              The workbench
            </p>
            <h1 className="mt-4 font-mono text-[clamp(1.9rem,5.5vw,3.1rem)] font-medium leading-[1.03] tracking-tight text-[rgb(var(--bench-text))]">
              Same work.
              <br />
              Take it apart.
            </h1>
            <p className="mt-5 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--bench-dim))]">
              Everything on the official site, rebuilt as things you can pick up — badges that flip,
              cartridges that load, a licence that catches the light. Same data underneath, no
              second version of the truth.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[rgb(var(--bench-edge))] pt-4">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--live))]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgb(var(--live))]" aria-hidden />
                Bench live
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--bench-dim))]">
                {SITE.location}
              </span>
            </div>
          </Panel>
        </div>

        {/* Boot readout */}
        <div className="lg:col-span-5">
          <Panel className="h-full p-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--bench-dim))]">
              Diagnostics
            </p>
            <Boot />
          </Panel>
        </div>
      </div>
    </header>
  );
}

/** Philosophy as three index cards clipped to the bench. */
export function Principles() {
  return (
    <section aria-labelledby="bench-principles">
      <BenchLabel index="03" title="Pinned rules" hint={`${PHILOSOPHY.length} CARDS`} />
      <p id="bench-principles" className="sr-only">
        Working principles
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PHILOSOPHY.map((p, i) => (
          <li
            key={p.left}
            className="relative rounded-[3px] border border-[rgb(var(--bench-edge))] bg-[#171717] p-5"
            style={{ transform: `rotate(${[-1.4, 1, -0.8, 1.6][i]}deg)` }}
          >
            <span
              className="absolute -top-1.5 left-5 h-3 w-3 rounded-full border border-[rgb(var(--bench))] bg-[rgb(var(--signal))]"
              aria-hidden
            />
            <p className="font-mono text-[17px] leading-tight text-[rgb(var(--bench-text))]">
              {p.left}
            </p>
            <p className="mt-1.5 font-mono text-[12px] text-[rgb(var(--signal))]">over</p>
            <p className="mt-1.5 font-mono text-[15px] text-[rgb(var(--bench-dim))] line-through decoration-[rgb(var(--bench-edge))]">
              {p.right}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
