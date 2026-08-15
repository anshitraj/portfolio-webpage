import type { Tweet } from './types';

/**
 * Static tweet cards — deliberately not the X embed widget, which loads
 * third-party JS and would cost the page its performance budget.
 *
 * TO ADD: paste the text, the permalink and the date. Nothing else needed.
 * The section hides itself when this array is empty.
 *
 *   { id: 't1', text: '…', date: '2026-02-14', url: 'https://x.com/solrishu/status/…' }
 */
export const tweets: Tweet[] = [];
