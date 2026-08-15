'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE_EDITORIAL, viewportOnce } from '@/lib/motion';
import type { LanguageBreakdown } from '@/lib/github';

/*
  GitHub gives every language its own colour. This page is near-monochrome with
  a single accent, so a rainbow bar would be the loudest thing on the screen by
  a wide margin. The leader takes the accent and everything after it steps down
  through ink — same information, same shape, without breaking the palette.
*/
const TONES = [
  'rgb(var(--accent))',
  'rgb(var(--ink) / 0.75)',
  'rgb(var(--ink) / 0.55)',
  'rgb(var(--ink) / 0.40)',
  'rgb(var(--ink) / 0.29)',
  'rgb(var(--ink) / 0.21)',
  'rgb(var(--ink) / 0.15)',
  'rgb(var(--ink) / 0.10)',
];

const toneAt = (i: number) => TONES[Math.min(i, TONES.length - 1)];

/** 18,797,103 → "18.8M" */
function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)}M`;
  if (bytes >= 1_000) return `${Math.round(bytes / 1_000)}K`;
  return String(bytes);
}

/**
 * Real language distribution across public repositories, measured in bytes of
 * source — the same thing GitHub's own language bar counts, aggregated across
 * every repo rather than shown one at a time.
 *
 * The segments grow from zero when the bar first scrolls into view.
 */
export function LanguageBar({ data }: { data: LanguageBreakdown }) {
  const reduced = useReducedMotion();
  const { languages, totalBytes, repoCount } = data;

  return (
    <figure className="rounded-card border border-rule p-5 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Languages by volume
        </p>
        <p className="font-mono text-[11px] tabular-nums text-muted">
          {formatBytes(totalBytes)} across {repoCount} public repos
        </p>
      </figcaption>

      {/* The bar. Percentages are on the legend below, so this is decorative. */}
      <motion.div
        className="mt-4 flex h-2.5 w-full gap-[2px] overflow-hidden rounded-pill"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.05 } } }}
        aria-hidden
      >
        {languages.map((lang, i) => (
          <motion.span
            key={lang.name}
            className="h-full origin-left first:rounded-l-pill last:rounded-r-pill"
            style={{ backgroundColor: toneAt(i), width: `${lang.share}%` }}
            variants={{
              hidden: { scaleX: reduced ? 1 : 0 },
              visible: {
                scaleX: 1,
                transition: { duration: reduced ? 0 : 0.85, ease: EASE_EDITORIAL },
              },
            }}
            /* Grow from the left so the bar reads as filling, not expanding. */
            transformTemplate={({ scaleX }) => `scaleX(${scaleX})`}
          />
        ))}
      </motion.div>

      <motion.ul
        className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.04 } } }}
      >
        {languages.map((lang, i) => (
          <motion.li
            key={lang.name}
            className="flex items-baseline gap-2"
            variants={{
              hidden: { opacity: reduced ? 1 : 0 },
              visible: { opacity: 1, transition: { duration: 0.3 } },
            }}
          >
            <span
              className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
              style={{ backgroundColor: toneAt(i) }}
              aria-hidden
            />
            <span className="min-w-0 truncate text-[13px] text-ink">{lang.name}</span>
            <span className="tnum ml-auto shrink-0 font-mono text-[11.5px] text-muted">
              {lang.share.toFixed(1)}%
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </figure>
  );
}
