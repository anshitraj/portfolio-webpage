export type ResumeOption = {
  code: string;
  title: string;
  label: string;
  description: string;
  href: string;
};

export type ResumeTrack = {
  id: 'engineering' | 'operator' | 'commercial';
  eyebrow: string;
  title: string;
  description: string;
  glyph: string;
  resumes: ResumeOption[];
};

export const RESUME_TRACKS: ResumeTrack[] = [
  {
    id: 'engineering',
    eyebrow: 'Build & Ship',
    title: 'Engineering',
    description: 'For teams hiring hands-on product, payments or growth engineering talent.',
    glyph: '⌘',
    resumes: [
      {
        code: 'ENG-01',
        title: 'Software Development',
        label: 'Technical CV',
        description: 'Product engineering, full-stack systems and shipped software.',
        href: 'https://drive.google.com/file/d/1JoQyqU6rkQ98vizKbT2JlnZFqgOIJGQX/view?usp=drivesdk',
      },
      {
        code: 'ENG-02',
        title: 'Stablecoin Engineer',
        label: 'ATS CV',
        description: 'Stablecoin rails, payment APIs and blockchain infrastructure.',
        href: 'https://drive.google.com/file/d/1MH99te3wpBJBteqjKYk2__lO7KWQRlsv/view?usp=drivesdk',
      },
      {
        code: 'ENG-03',
        title: 'Growth Engineer',
        label: 'Hybrid CV',
        description: 'Technical growth systems, experiments and product-led distribution.',
        href: 'https://drive.google.com/file/d/1eslmPDKC7eqT-3iknqV8wHlYdJTiqGnG/view?usp=drivesdk',
      },
    ],
  },
  {
    id: 'operator',
    eyebrow: 'Own & Execute',
    title: 'Founder’s Office',
    description: 'For high-context roles spanning product, strategy, partnerships and execution.',
    glyph: '↗',
    resumes: [
      {
        code: 'OPS-01',
        title: 'Founder’s Office',
        label: 'Generalist CV',
        description: 'Cross-functional startup execution from product to GTM.',
        href: 'https://drive.google.com/file/d/1ARaTaGafcNHtvnkQFA26OkwRZDIYepbr/view?usp=drivesdk',
      },
      {
        code: 'OPS-02',
        title: 'Stablecoin Founder’s Office',
        label: 'Payments CV',
        description: 'Operator profile tailored to stablecoin and fintech teams.',
        href: 'https://drive.google.com/file/d/1c1lcwMLIsekK3hiNyMja2M0dCkcT2ZcY/view?usp=drivesdk',
      },
    ],
  },
  {
    id: 'commercial',
    eyebrow: 'Grow & Support',
    title: 'Business & Customer',
    description: 'For revenue, partnerships and customer-facing roles in crypto and payments.',
    glyph: '◎',
    resumes: [
      {
        code: 'GTM-01',
        title: 'Business Development',
        label: 'ATS CV',
        description: 'Partnerships, pipeline, GTM execution and ecosystem growth.',
        href: 'https://drive.google.com/file/d/15lfviEsCS1hteQhKMuDqAJ4WZ6m8uMyk/view?usp=drivesdk',
      },
      {
        code: 'GTM-02',
        title: 'Business Development — Payments',
        label: 'Payments CV',
        description: 'Commercial partnerships and business development for payment products.',
        href: 'https://drive.google.com/file/d/1JAQ9oPtbpA5gIois90tpH610t1ol_8Fi/view?usp=drivesdk',
      },
      {
        code: 'CXS-01',
        title: 'Customer Service — Crypto',
        label: 'Customer CV',
        description: 'Crypto-native customer support, operations and issue resolution.',
        href: 'https://drive.google.com/file/d/1bBC5daYijzgq0YOSvQR9XxF8wvx8SS5y/view?usp=drivesdk',
      },
    ],
  },
];

/** Compatibility exports used by the alternate portfolio presentation. */
export const PRIMARY_RESUME: ResumeVariant = {
  id: 'software-development',
  label: 'Open Technical CV',
  description: 'Software development, product engineering and full-stack systems',
  href: RESUME_TRACKS[0].resumes[0].href,
};

export const TARGET_ROLES = RESUME_TRACKS.map((track) => ({
  label: track.title,
  description: track.description,
}));

export const RESUME_VARIANTS: ResumeVariant[] = RESUME_TRACKS.flatMap((track) =>
  track.resumes.map((resume) => ({
    id: resume.code.toLowerCase(),
    label: resume.title,
    description: resume.description,
    href: resume.href,
  })),
);
import type { ResumeVariant } from './types';
