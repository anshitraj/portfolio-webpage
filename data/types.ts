/**
 * Shared shapes for the portfolio dataset.
 *
 * Both Official (`/`) and Playground (`/playground`) render from these files —
 * nothing is duplicated per mode.
 *
 * `verified: false` means the number is not confirmed yet. It stays in the data
 * for the record but `visible()` in lib/metrics.ts strips it before render, so
 * unconfirmed claims never reach production.
 */

export type Metric = {
  label: string;
  value: string;
  /** Omit or `true` to render. `false` keeps it in the file but hides it. */
  verified?: boolean;
  /** Why it's unverified / what would confirm it. Never rendered. */
  note?: string;
};

export type ProjectTier = 'featured' | 'selected' | 'experiment';

export type ProjectStatus = 'BUILDING' | 'LIVE' | 'BETA' | 'OPEN SOURCE' | 'ARCHIVED';

export type CredentialTier = {
  name: string;
  requirement: string;
};

export type Project = {
  slug: string;
  tier: ProjectTier;
  title: string;
  /** Positioning line shown under the title, e.g. "Stablecoin Payment Infrastructure" */
  subtitle: string;
  status: ProjectStatus;
  year: string;
  /** One sentence. Used on cards and in meta descriptions. */
  oneLiner: string;

  // Case study
  problem?: string;
  whyIBuiltIt?: string;
  whatIBuilt?: string;
  myRole?: string[];
  /** Rendered as a numbered flow diagram on the case study page. */
  flow?: string[];
  /** Rendered as a labelled credential grid (Arc Pass). */
  credentials?: { name: string; description: string; points: string[] }[];
  credentialTiers?: CredentialTier[];
  challenges?: string;
  learned?: string;

  tech: string[];
  tags: string[];
  metrics: Metric[];

  image: string;
  /** Set when `image` is a real product screenshot rather than a monogram tile. */
  hasRealImage?: boolean;
  /** Square brand mark under /public/logos. Falls back to a monogram. */
  logo?: string;
  screenshots?: string[];
  /** Demo video. Drop files into /public/videos and reference here. */
  video?: { src: string; poster?: string; caption?: string };

  links: {
    live?: string;
    repo?: string;
    extra?: { label: string; href: string }[];
  };
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  /** `primary` entries get metrics + full bullets; `secondary` renders compact. */
  weight: 'primary' | 'secondary';
  logoSrc?: string;
  /** Stands in for a logo where there isn't one to show (e.g. a stealth company). */
  logoEmoji?: string;
  summary: string;
  bullets: string[];
  metrics: Metric[];
  href?: string;
};

export type AchievementCategory = 'TECH' | 'STARTUP' | 'SPORT' | 'OPEN SOURCE';

export type Achievement = {
  id: string;
  title: string;
  /** Short result line, e.g. "1st place — Gemini track" */
  result: string;
  year: string;
  category: AchievementCategory;
  description: string;
  image?: string;
  /** Links into /gallery filtered to these images. */
  galleryIds?: string[];
  /** Links to an internal case study. */
  projectSlug?: string;
  href?: { label: string; url: string };
  verified?: boolean;
  note?: string;
};

export type GalleryCategory =
  | 'HACKATHONS'
  | 'BUILDING'
  | 'STARTUPS'
  | 'EVENTS'
  | 'SPORT'
  | 'COMMUNITY';

export type GalleryImage = {
  src: string;
  /** Real pixel dimensions — the masonry flow and the optimiser both need them. */
  width: number;
  height: number;
  /** Per-shot line, shown in the lightbox when a moment has several images. */
  caption?: string;
};

/**
 * One *moment*, not one photograph.
 *
 * A hackathon that produced four shots is a single entry with four images
 * inside it — listing them as four sibling cards made one win read as four
 * unrelated ones.
 */
export type GalleryItem = {
  id: string;
  /** First image is the cover. The rest open inside the same entry. */
  images: GalleryImage[];
  caption: string;
  /** ISO date or a coarse label like "2025" */
  date: string;
  category: GalleryCategory;
  projectSlug?: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type WritingPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  /** External link instead of a hosted post. */
  externalUrl?: string;
};

export type Tweet = {
  id: string;
  text: string;
  date: string;
  url: string;
  context?: string;
};

export type ResumeVariant = {
  id: string;
  label: string;
  description: string;
  /** Local path under /public/resumes, or an external URL. Empty = not ready. */
  href?: string;
};

/**
 * The slice of a project the media components actually render.
 *
 * They are client components, so whatever they receive is serialized into the
 * page's RSC payload. Passing the whole `Project` shipped unverified metric
 * values and their internal `note` fields into the HTML source — narrowing the
 * prop keeps them out of the response entirely.
 */
export type MediaProject = Pick<
  Project,
  'title' | 'subtitle' | 'image' | 'hasRealImage' | 'video'
>;
