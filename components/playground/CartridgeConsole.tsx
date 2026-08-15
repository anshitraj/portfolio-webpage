'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { projects } from '@/data/projects';
import { visible } from '@/lib/metrics';
import { Panel, BenchLabel } from './bench';
import { cn } from '@/lib/utils';

/**
 * Handheld console. Cartridges are projects; the screen previews the selected
 * one and A loads its case study.
 *
 * Everything is reachable without the device chrome too — the cartridge list
 * below is a plain button list, so keyboard and screen-reader users are not
 * dependent on the D-pad working the way it looks.
 */
export function CartridgeConsole() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [booting, setBooting] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const current = projects[index];
  const metrics = visible(current.metrics).slice(0, 3);

  const move = useCallback((delta: number) => {
    setIndex((i) => (i + delta + projects.length) % projects.length);
  }, []);

  const load = useCallback(() => {
    setBooting(true);
    window.setTimeout(() => router.push(`/projects/${projects[index].slug}`), 420);
  }, [index, router]);

  // Arrow keys / Enter work while focus is anywhere inside the console.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    function onKey(e: KeyboardEvent) {
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        move(1);
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'Enter') {
        load();
      }
    }
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [move, load]);

  return (
    <section aria-labelledby="bench-console">
      <BenchLabel index="05" title="Cartridge console" hint={`${projects.length} CARTRIDGES`} />
      <p id="bench-console" className="sr-only">
        Projects
      </p>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* ── The device ── */}
        <div ref={frameRef} className="lg:col-span-5">
          <Panel className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--bench-dim))]">
                ARY-01 Handheld
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--live))]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgb(var(--live))]" aria-hidden />
                Power
              </span>
            </div>

            {/* Screen */}
            <div
              className="relative overflow-hidden rounded-[4px] border border-[rgb(var(--bench-edge))] bg-[#0C0C0C] p-4"
              aria-live="polite"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, rgba(255,255,255,.10) 0 1px, transparent 1px 3px)',
                }}
                aria-hidden
              />
              {booting ? (
                <p className="relative font-mono text-[12px] text-[rgb(var(--live))]">
                  LOADING {current.title.toUpperCase()}
                  <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-[rgb(var(--live))] align-middle" />
                </p>
              ) : (
                <div className="relative min-h-[168px]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--live))]/70">
                    {String(index + 1).padStart(2, '0')} / {projects.length} · {current.tier}
                  </p>
                  <h3 className="mt-2 font-mono text-[17px] leading-tight text-[rgb(var(--live))]">
                    {current.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[rgb(var(--live))]/60">
                    {current.subtitle}
                  </p>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-[rgb(var(--live))]/75">
                    {current.oneLiner.length > 120
                      ? `${current.oneLiner.slice(0, 117)}…`
                      : current.oneLiner}
                  </p>
                  {metrics.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {metrics.map((m) => (
                        <li key={m.label} className="font-mono text-[11px] text-[rgb(var(--live))]/70">
                          {m.value} {m.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center justify-between">
              {/* D-pad */}
              <div className="grid grid-cols-3 grid-rows-3 gap-1">
                <span />
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous cartridge"
                  className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))] active:scale-95"
                >
                  <ChevronUp className="h-4 w-4" aria-hidden />
                </button>
                <span />
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous cartridge"
                  className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))] active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </button>
                <span className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[rgb(var(--bench-edge))]" aria-hidden />
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next cartridge"
                  className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))] active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
                <span />
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next cartridge"
                  className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))] active:scale-95"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
                <span />
              </div>

              {/* A / B */}
              <div className="flex items-end gap-3">
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="B — next cartridge"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--bench-edge))] font-mono text-[12px] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))] active:scale-95"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={load}
                  aria-label={`A — load ${current.title} case study`}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--signal))] font-mono text-[13px] text-[rgb(var(--signal))] transition-colors hover:bg-[rgb(var(--signal))]/15 active:scale-95"
                >
                  A
                </button>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))]">
              [A] load · [B] next · arrow keys work
            </p>
          </Panel>
        </div>

        {/* ── Cartridge rack ── */}
        <div className="lg:col-span-7">
          <Panel className="h-full p-4 sm:p-5" screws={false}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--bench-dim))]">
              Rack — select a cartridge
            </p>
            <ul className="grid max-h-[420px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {projects.map((p, i) => {
                const on = i === index;
                return (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      onDoubleClick={load}
                      aria-current={on ? 'true' : undefined}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-[4px] border px-3 py-2.5 text-left transition-colors',
                        on
                          ? 'border-[rgb(var(--signal))] bg-[rgb(var(--signal))]/10'
                          : 'border-[rgb(var(--bench-edge))] hover:border-[rgb(var(--bench-dim))]'
                      )}
                    >
                      {/* Cartridge shell */}
                      <span
                        className={cn(
                          'flex h-9 w-7 shrink-0 flex-col justify-end rounded-[2px] border p-[3px]',
                          on ? 'border-[rgb(var(--signal))]' : 'border-[rgb(var(--bench-edge))]'
                        )}
                        aria-hidden
                      >
                        <span
                          className={cn(
                            'h-[3px] w-full',
                            on ? 'bg-[rgb(var(--signal))]' : 'bg-[rgb(var(--bench-edge))]'
                          )}
                        />
                        <span
                          className={cn(
                            'mt-[2px] h-[3px] w-2/3',
                            on ? 'bg-[rgb(var(--signal))]/60' : 'bg-[rgb(var(--bench-edge))]'
                          )}
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate font-mono text-[12.5px] text-[rgb(var(--bench-text))]">
                          {p.title}
                        </span>
                        <span className="block truncate font-mono text-[11px] uppercase tracking-[0.1em] text-[rgb(var(--bench-dim))]">
                          {p.status} · {p.year}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </section>
  );
}
