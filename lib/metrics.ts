import type { Metric } from '@/data/types';

/**
 * The one gate between the dataset and the page.
 *
 * Anything carrying `verified: false` stays in the data file for the record but
 * never renders — so an unconfirmed number cannot reach production by accident.
 */
export function visible<T extends { verified?: boolean }>(items: T[] | undefined): T[] {
  return (items ?? []).filter((i) => i.verified !== false);
}

/**
 * Splits a metric value into its animatable number and the surrounding text,
 * so "1,500+", "₹80,000+", "0 → 200K" and "$200K+" all count up correctly
 * without mangling their prefix or suffix.
 *
 * Returns `null` when there is no number to animate (e.g. "Listed").
 */
export function parseMetric(value: string): {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
} | null {
  // Use the LAST number in the string so "0 → 200K" animates to 200K.
  const matches = [...value.matchAll(/(\d[\d,]*\.?\d*)/g)];
  if (matches.length === 0) return null;

  const last = matches[matches.length - 1];
  const raw = last[1];
  const numeric = Number(raw.replace(/,/g, ''));
  if (!Number.isFinite(numeric)) return null;

  const start = last.index ?? 0;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;

  return {
    prefix: value.slice(0, start),
    target: numeric,
    suffix: value.slice(start + raw.length),
    decimals,
  };
}

export function formatMetricNumber(n: number, decimals: number, sample: string): string {
  const fixed = n.toFixed(decimals);
  // Only re-introduce thousands separators if the source value had them.
  if (!sample.includes(',')) return fixed;
  const [int, dec] = fixed.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec ? `${grouped}.${dec}` : grouped;
}

export type { Metric };
