import type { ResumeVariant } from './types';

/**
 * One primary download plus role-specific variants behind a dropdown —
 * never eight buttons.
 *
 * Drop PDFs into /public/resumes/ and set `href`. Variants without an `href`
 * render disabled rather than 404-ing.
 */
export const PRIMARY_RESUME: ResumeVariant = {
  id: 'general',
  label: 'Download Resume',
  description: 'General — engineering and product',
  href: 'https://drive.google.com/file/d/1D8VL0zKJF4zwugeQKcJtoITRAGGSdqbK/view?usp=sharing',
};

export const TARGET_ROLES = [
  {
    label: 'Founding Engineer',
    description: 'Zero-to-one product, architecture and ownership beyond the codebase.',
  },
  {
    label: 'Full-stack / Product Engineer',
    description: 'React-led product work backed by APIs, data and production systems.',
  },
  {
    label: 'GTM Engineer',
    description: 'Technical product work joined directly to distribution, growth and partnerships.',
  },
  {
    label: 'Business Development & Partnerships',
    description: 'Founder-facing deal flow, ecosystem partnerships, launch support and distribution.',
  },
  {
    label: "Business Operator / Founder’s Office",
    description: 'Fundraising support, partnerships, execution and founder-side operating work.',
  },
  {
    label: 'AI & Payments Engineer',
    description: 'Agent infrastructure, policy controls, stablecoin rails and developer tooling.',
  },
] as const;

export const RESUME_VARIANTS: ResumeVariant[] = [
  {
    id: 'engineering',
    label: 'Founding / Full-stack Engineering',
    description: 'Zero-to-one product, infrastructure and systems',
    href: undefined, // → /resumes/anshit-raj-yadav-engineering.pdf
  },
  {
    id: 'founders-office',
    label: "Business Operations / Founder’s Office",
    description: 'Product, fundraising, operations and founder support',
    href: undefined, // → /resumes/anshit-raj-yadav-founders-office.pdf
  },
  {
    id: 'payments',
    label: 'AI & Payments Infrastructure',
    description: 'Agent controls, payment infrastructure and stablecoin rails',
    href: undefined, // → /resumes/anshit-raj-yadav-payments.pdf
  },
  {
    id: 'growth',
    label: 'GTM Engineering & Partnerships',
    description: 'Technical GTM, growth systems, partnerships and ecosystem',
    href: undefined, // → /resumes/anshit-raj-yadav-growth.pdf
  },
];
