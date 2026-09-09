import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    company: 'Webcoin Labs',
    role: 'Product, Partnerships & Founder Support',
    period: 'Dec 2022 — Dec 2025',
    weight: 'primary',
    logoSrc: '/logos/webcoinlabs.jpg',
    summary:
      'Built the founder-side infrastructure — network, introductions, launch support — then turned the parts that repeated into product.',
    bullets: [
      'Worked directly with 275+ startups on fundraising prep, partnerships, launch and distribution.',
      'Built relationships with 50+ investors and a 1,500+ creator network I run campaigns through.',
      'Grew the Webcoin community from zero to 200K, peaking at 3,000+ daily active members in 2021.',
      'Grew the ALTAVA community from zero to 5K, and supported Monsterra’s growth from 30K to 60K.',
      'Sourced 100+ influencer contacts for DAO Maker and ran an event campaign for Corite (the Alan Walker-backed project) that added 5,000+ followers.',
      'Ran collaboration work with the Binance, MEXC and Gate.io teams.',
      'Supported fundraising processes for ALTAVA, Huma Finance and Solv Protocol.',
      'Took the workflows that repeated every week — builder discovery, investor introductions, credentials — and built them into the Webcoin Labs platform and Arc Pass.',
    ],
    metrics: [
      { label: 'Generated for clients', value: '$100K' },
      { label: 'Startups connected', value: '275+' },
      { label: 'Investor relationships', value: '50+' },
      { label: 'Creators I work with', value: '1,500+' },
      { label: 'Community grown from zero', value: '200K' },
    ],
    href: 'https://webcoinlabs.com',
  },

  {
    company: 'Stealth Startup',
    role: 'SDE Intern',
    period: 'Jun 2025 — Aug 2025',
    weight: 'primary',
    logoSrc: '/logos/stealth.jpg',
    summary: 'Backend and systems work — concurrency handling and load behaviour under stress testing.',
    bullets: [
      'Worked on backend service reliability, including concurrency handling for simultaneous request paths.',
      'Ran stress testing against the platform to find where throughput degraded and what broke first under load.',
      'Supported the test-user programme and fed the resulting failure cases back into fixes.',
    ],
    metrics: [
      {
        label: 'Test users',
        value: '500+',
        verified: false,
        note: 'Anshit to confirm and refine this entry.',
      },
      {
        label: 'Concurrent stress-test users',
        value: '100+',
        verified: false,
        note: 'Anshit to confirm and refine this entry.',
      },
    ],
  },

  {
    company: 'HTX',
    role: 'Contractor',
    period: 'Jan 2025 — Feb 2025',
    weight: 'secondary',
    logoSrc: '/logos/htx.jpg',
    summary: 'Short remote engagement supporting exchange-side engineering work.',
    bullets: [
      'Contracted with the HTX team on discrete engineering tasks during a short remote engagement.',
    ],
    metrics: [],
  },

  {
    company: 'ALTAVA GROUP',
    role: 'SDE Intern',
    period: 'Oct 2024 — Dec 2024',
    weight: 'secondary',
    logoSrc: '/logos/altava.jpg',
    summary: 'Remote blockchain product work with Next.js and on-chain integrations.',
    bullets: [
      'Built and iterated on product features with Next.js.',
      'Worked on on-chain integrations alongside the engineering team.',
      'Participated in code review and incremental release cycles.',
    ],
    metrics: [],
  },

  {
    company: 'Raydium Protocol',
    role: 'Protocol Contributor',
    period: 'May 2023 — Jul 2023',
    weight: 'secondary',
    logoSrc: '/logos/raydium.jpg',
    summary: 'Solana AMM tooling, SDK usage and liquidity pool integrations.',
    bullets: [
      'Contributed to protocol tooling and SDK integration work using web3.js and Anchor.',
      'Validated pool creation and swap flows across multiple pool types and fee tiers.',
      'Supported documentation and examples used by developers building on the protocol.',
    ],
    metrics: [],
  },

  {
    company: 'Acid Rainbow',
    role: 'Influencer Marketing Manager',
    period: 'Mar 2022 — Apr 2022',
    weight: 'secondary',
    logoSrc: '/logos/acid.jpg',
    summary: 'Creator outreach and campaign coordination for brand and community launches.',
    bullets: [
      'Coordinated creator outreach for brand and growth campaigns.',
      'Supported campaign planning, messaging and reporting on short launch cycles.',
    ],
    metrics: [],
  },
];
