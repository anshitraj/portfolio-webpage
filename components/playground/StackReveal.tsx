'use client';

import { useState } from 'react';
import { skillGroups } from '@/data/skills';
import { Panel, BenchLabel } from './bench';
import { cn } from '@/lib/utils';

const ALL = skillGroups.flatMap((g) => g.items.map((item) => ({ item, group: g.name })));

/**
 * Tools start unpowered and light up as you touch them.
 *
 * Deliberately not a canvas scratch-off: pointer-painting is unusable with a
 * keyboard and awkward on touch. Hovering, tapping or tabbing energises a chip,
 * and one button powers the whole board.
 */
export function StackReveal() {
  const [lit, setLit] = useState<Set<string>>(new Set());
  const all = lit.size >= ALL.length;

  function light(item: string) {
    setLit((prev) => (prev.has(item) ? prev : new Set(prev).add(item)));
  }

  return (
    <section aria-labelledby="bench-stack">
      <BenchLabel
        index="02"
        title="Tool wall"
        hint={all ? 'ALL POWERED' : `${lit.size} / ${ALL.length} POWERED`}
      />

      <Panel className="p-5 sm:p-7">
        <p id="bench-stack" className="sr-only">
          Technologies used
        </p>
        <p className="mb-5 font-mono text-[11.5px] text-[rgb(var(--bench-dim))]">
          Hover, tap or tab a tool to power it on.
        </p>

        <ul className="flex flex-wrap gap-2">
          {ALL.map(({ item, group }) => {
            const on = lit.has(item);
            return (
              <li key={item}>
                <button
                  type="button"
                  onMouseEnter={() => light(item)}
                  onFocus={() => light(item)}
                  onClick={() => light(item)}
                  title={group}
                  className={cn(
                    'rounded-[3px] border px-2.5 py-1.5 font-mono text-[12px] transition-all duration-300',
                    on
                      ? 'border-[rgb(var(--signal))] bg-[rgb(var(--signal))]/12 text-[rgb(var(--bench-text))]'
                      : 'border-[rgb(var(--bench-edge))] text-[rgb(var(--bench-dim))]'
                  )}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[rgb(var(--bench-edge))] pt-4">
          <button
            type="button"
            onClick={() => setLit(new Set(ALL.map((a) => a.item)))}
            disabled={all}
            className="rounded-[3px] border border-[rgb(var(--signal))] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--signal))] transition-colors hover:bg-[rgb(var(--signal))]/12 disabled:opacity-35"
          >
            {all ? 'Board fully powered' : 'Power everything'}
          </button>
          {lit.size > 0 ? (
            <button
              type="button"
              onClick={() => setLit(new Set())}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))]"
            >
              Reset
            </button>
          ) : null}
        </div>
      </Panel>
    </section>
  );
}
