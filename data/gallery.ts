import type { GalleryItem } from './types';

/**
 * Build Log — proof of the journey, not an Instagram feed.
 *
 * TO ADD PHOTOS:
 *   1. Drop the file into /public/gallery/
 *   2. Add an entry below with the real pixel width/height of each image (the
 *      masonry layout and Next's image optimiser both need them to avoid
 *      layout shift).
 *
 * One entry = one moment. If a single hackathon produced four photographs,
 * they belong in that entry's `images` array — not as four sibling cards, which
 * made one win look like four separate ones.
 *
 * Categories with zero entries are removed from the filter bar automatically,
 * and the whole section hides if this array is empty — no placeholder tiles.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'ledger-n3xt-build-show',
    images: [
      { src: '/gallery/ledger-n3xt-acceptance.png', width: 1174, height: 646 },
    ],
    caption:
      'Ledger N3XT Build & Show submission accepted — $100 USDC prize confirmed by the programme team.',
    date: 'Aug 2026',
    category: 'HACKATHONS',
    projectSlug: 'ledger-agent-firewall',
  },
  {
    id: 'agentic-commerce-sf',
    images: [
      {
        src: '/gallery/agentic-commerce-sf.jpeg',
        width: 864,
        height: 423,
        caption: 'Circle × Google DeepMind Agentic Commerce on Arc — San Francisco.',
      },
      {
        src: '/gallery/agentic-commerce-winners.jpeg',
        width: 826,
        height: 628,
        caption: 'At the winners announcement.',
      },
      {
        src: '/gallery/agentic-commerce-livestream.jpeg',
        width: 720,
        height: 1599,
        caption: 'The win featured on the LabLab AI winners livestream.',
      },
      {
        src: '/gallery/agentic-commerce-community.jpeg',
        width: 720,
        height: 1599,
        caption: 'The team community reacting to the result.',
      },
    ],
    caption:
      'Won the Gemini track at Circle × Google DeepMind Agentic Commerce on Arc — San Francisco, 1,201 participants across 221 teams.',
    date: '2025',
    category: 'HACKATHONS',
    projectSlug: 'omniclaw',
  },
  {
    id: 'base-trading-ux-research',
    images: [
      { src: '/gallery/base-trading-ux-research.png', width: 1899, height: 897 },
    ],
    caption:
      'Paid UX research for a Base App perpetuals trading flow — review session and interface feedback.',
    date: 'Apr 2026',
    category: 'BUILDING',
  },
  {
    id: 'circle-bridge-kit-feedback',
    images: [
      {
        src: '/gallery/circle-bridge-kit-feedback.jpeg',
        width: 720,
        height: 1599,
      },
    ],
    caption:
      'Circle acknowledged my error-handling feedback in the Bridge Kit 1.3.0 release notes and helpers.',
    date: 'Jan 2026',
    category: 'BUILDING',
    projectSlug: 'arcpay',
  },
  {
    id: 'circle-alliance-listing',
    images: [{ src: '/gallery/circle-alliance.png', width: 1301, height: 860 }],
    caption: 'ArcPay listed in the Circle Alliance Directory.',
    date: '2025',
    category: 'STARTUPS',
    projectSlug: 'arcpay',
  },
  {
    id: 'back-to-school-ai-weekends',
    images: [
      {
        src: '/gallery/ai-weekends-back-to-school.jpeg',
        width: 1080,
        height: 1080,
      },
    ],
    caption: 'AI & Weekends Back To School — registered to attend.',
    date: 'Aug 2026',
    category: 'EVENTS',
  },
  {
    id: 'webcoin-ecosystem',
    images: [{ src: '/projects/webcoin-labs/cover.png', width: 1385, height: 702 }],
    caption: 'The Webcoin Labs ecosystem map — founders, builders, investors and creators.',
    date: '2025',
    category: 'COMMUNITY',
    projectSlug: 'webcoin-labs',
  },
];

export const GALLERY_CATEGORIES = [
  'ALL',
  'HACKATHONS',
  'BUILDING',
  'STARTUPS',
  'EVENTS',
  'SPORT',
  'COMMUNITY',
] as const;

/** Only categories that actually have images, so the filter bar never lies. */
export function activeCategories(items: GalleryItem[] = gallery): string[] {
  const present = new Set(items.map((i) => i.category));
  return GALLERY_CATEGORIES.filter((c) => c === 'ALL' || present.has(c as GalleryItem['category']));
}

/** The shot that represents a moment in a grid. */
export function coverOf(item: GalleryItem) {
  return item.images[0];
}

/** Total photographs across every moment — what "N prints" actually counts. */
export const galleryImageCount = gallery.reduce((n, item) => n + item.images.length, 0);
