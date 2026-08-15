'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectImage } from '@/components/shared/ProjectImage';
import { RevealItem } from '@/components/shared/Reveal';
import { fast } from '@/lib/motion';
import type { MediaProject } from '@/data/types';

export type BuildIndexEntry = MediaProject & {
  slug: string;
  oneLiner: string;
  tags: string[];
  year: string;
};

/**
 * A numbered project index rather than a card grid — rows carry the weight,
 * not borders. On desktop the right panel swaps to match whichever row is
 * hovered or focused; on mobile it's dropped entirely and the rows stand on
 * their own, since a tap there navigates immediately rather than previewing.
 */
export function BuildIndex({ entries }: { entries: BuildIndexEntry[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = entries[active];

  return (
    <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:gap-10">
      <ol className="lg:col-span-7">
        {entries.map((p, i) => (
          <RevealItem key={p.slug} as="li">
            <div className="border-b border-rule first:border-t">
              <Link
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center gap-4 py-4 transition-colors hover:bg-surface sm:gap-5 sm:px-2"
              >
                <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-muted sm:w-7">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="inline-block truncate text-[15px] font-semibold tracking-tight text-ink transition-transform duration-300 ease-editorial group-hover:translate-x-1.5 sm:text-[16px]">
                      {p.title}
                    </span>
                    <span className="hidden truncate font-mono text-[11px] uppercase tracking-[0.08em] text-muted sm:inline">
                      {p.tags.slice(0, 3).join(' · ')}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted sm:hidden">
                    {p.tags.slice(0, 2).join(' · ')} · {p.year}
                  </span>
                </span>

                <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-muted sm:inline">
                  {p.year}
                </span>

                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </div>
          </RevealItem>
        ))}
      </ol>

      {/* Large preview — desktop only, tracks whichever row is active. */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-24 overflow-hidden rounded-card border border-rule bg-surface">
          <div className="relative aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={fast}
                className="absolute inset-0"
              >
                <ProjectImage project={current} sizes="40vw" className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="border-t border-rule p-4">
            <p className="truncate text-[14px] font-semibold tracking-tight text-ink">
              {current.title}
            </p>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-muted">
              {current.oneLiner}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
