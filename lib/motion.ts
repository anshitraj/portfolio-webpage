import type { Transition, Variants } from 'motion/react';

/**
 * The complete motion vocabulary for the site. Nothing animates outside this
 * file — it exists so the page stays restrained and consistent rather than
 * accumulating one-off transitions.
 */

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = {
  duration: 0.5,
  ease: EASE_EDITORIAL,
};

export const fast: Transition = {
  duration: 0.22,
  ease: EASE_EDITORIAL,
};

/** Section entrance — 12px rise + fade, once. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition },
};

/** Parent for staggered children (cards, metric tiles, list rows). */
export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren },
  },
});

/** Image reveal — a clip wipe rather than a fade, so it reads as intentional. */
export const wipeIn: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_EDITORIAL },
  },
};

/** Page-level crossfade between routes. */
export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** Shared viewport config so every section triggers at the same threshold. */
export const viewportOnce = { once: true, amount: 0.15 } as const;
