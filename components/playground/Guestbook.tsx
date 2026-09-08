'use client';

import { useEffect, useState } from 'react';
import { Panel, BenchLabel } from './bench';
import { cn } from '@/lib/utils';

const STAMPS = ['SHIPPED IT', 'RESPECT', 'LEGEND', 'CLEAN BUILD', 'SHIP FASTER', 'JEALOUS'] as const;
const KEY = 'ary-benchbook';
const MAX = 120;

type Note = { id: string; name: string; text: string; stamp: string; date: string };

const TILT = [-2.5, 1.8, -1.2, 2.4, -2, 1.4];

/**
 * Visitor notes pinned to the bench.
 *
 * There is no server behind this site, so notes are stored in localStorage and
 * the UI says so plainly rather than implying other people can see them.
 */
export function Guestbook() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [stamp, setStamp] = useState<string>(STAMPS[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setNotes(JSON.parse(raw));
      } catch {
        /* corrupt or unavailable storage — start empty */
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function persist(next: Note[]) {
    setNotes(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* private mode — the note still shows for this session */
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    persist([
      {
        id: `${Date.now()}`,
        name: name.trim() || 'Visitor',
        text: body.slice(0, MAX),
        stamp,
        date: new Date().toISOString(),
      },
      ...notes,
    ]);
    setName('');
    setText('');
  }

  return (
    <section aria-labelledby="bench-book">
      <BenchLabel index="09" title="Bench book" hint={loaded ? `${notes.length} PINNED` : ''} />
      <p id="bench-book" className="sr-only">
        Visitor notes
      </p>

      <Panel className="p-5 sm:p-7" screws={false}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Form */}
          <form onSubmit={submit} className="lg:col-span-5">
            <p className="text-[14px] leading-relaxed text-[rgb(var(--bench-dim))]">
              Leave a mark on the bench. Pick a stamp.
            </p>

            <label className="mt-5 block">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--bench-dim))]">
                Name — optional
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={32}
                placeholder="Anything you like"
                className="mt-1.5 w-full rounded-[3px] border border-[rgb(var(--bench-edge))] bg-[rgb(var(--bench))] px-3 py-2.5 text-[14px] text-[rgb(var(--bench-text))] placeholder:text-[rgb(var(--bench-dim))]/60"
              />
            </label>

            <label className="mt-4 block">
              <span className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--bench-dim))]">
                Note
                <span className="tabular-nums">
                  {text.length} / {MAX}
                </span>
              </span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX))}
                rows={3}
                required
                placeholder="Say something."
                className="mt-1.5 w-full resize-none rounded-[3px] border border-[rgb(var(--bench-edge))] bg-[rgb(var(--bench))] px-3 py-2.5 text-[14px] text-[rgb(var(--bench-text))] placeholder:text-[rgb(var(--bench-dim))]/60"
              />
            </label>

            <fieldset className="mt-4">
              <legend className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--bench-dim))]">
                Pick a stamp
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {STAMPS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStamp(s)}
                    aria-pressed={s === stamp}
                    className={cn(
                      'rounded-[3px] border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors',
                      s === stamp
                        ? 'border-[rgb(var(--signal))] text-[rgb(var(--signal))]'
                        : 'border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))] hover:text-[rgb(var(--bench-text))]'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-[44px] items-center rounded-[3px] border border-[rgb(var(--signal))] px-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[rgb(var(--signal))] transition-colors hover:bg-[rgb(var(--signal))]/12"
            >
              Pin to bench
            </button>

            <p className="mt-3 text-[11.5px] leading-relaxed text-[rgb(var(--bench-dim))]">
              This site has no server — your note is saved in this browser only, so it&apos;s yours
              alone. Nothing is sent anywhere.
            </p>
          </form>

          {/* Board */}
          <div className="lg:col-span-7">
            {loaded && notes.length === 0 ? (
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-[4px] border border-dashed border-[rgb(var(--bench-edge))] p-6">
                <p className="text-center font-mono text-[12px] text-[rgb(var(--bench-dim))]">
                  Board&apos;s empty. Yours would be first.
                </p>
              </div>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {notes.slice(0, 8).map((n, i) => (
                  <li
                    key={n.id}
                    className="relative rounded-[3px] border border-[rgb(var(--bench-edge))] bg-[#171717] p-4"
                    style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
                  >
                    <span
                      className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[rgb(var(--bench))] bg-[rgb(var(--signal))]"
                      aria-hidden
                    />
                    <p className="text-[13px] leading-relaxed text-[rgb(var(--bench-text))]">
                      “{n.text}”
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-mono text-[11px] text-[rgb(var(--bench-text))]">
                          {n.name}
                        </p>
                        <time
                          dateTime={n.date}
                          className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--bench-dim))]"
                        >
                          {new Date(n.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <span className="shrink-0 -rotate-[6deg] rounded-[2px] border border-[rgb(var(--live))] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--live))]">
                        {n.stamp}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {notes.length > 0 ? (
              <button
                type="button"
                onClick={() => persist([])}
                className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))]"
              >
                Clear board
              </button>
            ) : null}
          </div>
        </div>
      </Panel>
    </section>
  );
}
