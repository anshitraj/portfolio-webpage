/** Shared copy for the portfolio (single source of truth for hero / about / work). */

export const SITE = {
  name: 'Anshit Raj Yadav',
  handle: 'anshitraj',
  tagline: 'Full-stack product builder focused on AI systems, blockchain infrastructure, and stablecoin payments',
  bio: `I ship full-stack product and own the business side: go-to-market, partnerships, and BD alongside agentic AI, LLM workflows, stablecoin rails, and blockchain infrastructure. Recent numbers I lean on: 100+ startups connected via Webcoin Labs; X from ~1K to 21K+ followers (21.4K+ today); a 1,500+ KOL network; $50K+ in fundraising supported; and launches like Mini Cast Store with 1,500+ users in week one and 25+ developers listing apps.`,
  availability:
    'Available — collaborations, founder-led builds, GTM / BD partnerships, and high-impact product or infra roles.',
  xFollowers: '21.4k',
  xUrl: 'https://x.com/solrishu',
  linkedinUrl: 'https://linkedin.com/in/anshitraj',
  githubUrl: 'https://github.com/anshitraj',
};

/** Home About — hire-me framing; metrics stay in IMPACT_METRICS below on the page. */
export const WHAT_I_DO = `I build and ship real products. While many developers spend years solving theoretical problems or preparing only for interviews, I focus on building systems that people can actually use. I work across engineering, product strategy, and go-to-market—turning ideas into working software and usable platforms.

My work spans AI-driven workflows, fintech infrastructure, stablecoin payment systems, and automation platforms where software can execute real financial actions. I've built production systems such as the ARCPay payment gateway, agentic payment infrastructure like OmniAgentPay, and developer platforms like Mini Cast Store.

I'm comfortable moving from backend systems and infrastructure to product design, integrations, and launch. My focus is simple: build useful systems, ship them fast, and iterate based on real usage—not just theory.`;

export type WorkEntry = {
  company: string;
  role: string;
  badge: string;
  period: string;
  /** Short line for compact list */
  summary: string;
  /** Logo in /public (e.g. /webcoinlabs.jpg) */
  logoSrc?: string;
};

export const WORK_EXPERIENCE: WorkEntry[] = [
  {
    company: 'Webcoin Labs',
    role: 'Founding Team — Ecosystem, Partnerships, Infra & Growth',
    badge: 'Founding',
    period: '2022 – 2025',
    summary:
      'Founder–builder ecosystem: 100+ startups, 1,500+ KOL network, ~1K→21K+ reach, $50K+ fundraising supported.',
    logoSrc: '/webcoinlabs.jpg',
  },
  {
    company: 'Raydium Protocol',
    role: 'Protocol Contributor',
    badge: 'Internship',
    period: 'May 2023 – Jul 2023',
    summary:
      'Solana AMM protocol work: tooling, SDK & pool integrations; web3.js & Anchor; docs and examples for builders.',
    logoSrc: '/raydium.jpg',
  },
  {
    company: 'ALTAVA GROUP',
    role: 'SDE Intern',
    badge: 'Internship',
    period: 'Jun 2022 – Sep 2022',
    summary: 'Remote internship: blockchain product work with Next.js and on-chain integrations.',
    logoSrc: '/altava.jpg',
  },
  {
    company: 'Acid Rainbow',
    role: 'Influencer Marketing Manager',
    badge: 'Internship',
    period: 'Mar 2022 – Apr 2022',
    summary: 'Campaign coordination, creator outreach, and growth support for brand and community initiatives.',
    logoSrc: '/acid.jpg',
  },
];

export const IMPACT_METRICS = [
  { label: 'Startups connected', value: '100+' },
  { label: 'Community reach', value: '21K+' },
  { label: 'Product users (Mini Cast w1)', value: '1,500+' },
  { label: 'Fundraising supported', value: '$50K+' },
];

export const SKILLS = [
  'Rust',
  'Solidity',
  'TypeScript',
  'JavaScript',
  'Python',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Solana',
  'Foundry',
  'Docker',
  'Vercel',
  'LLM workflows',
  'Agentic AI',
  'Stablecoin rails',
  'GTM',
  'Partnerships',
  'Business development',
];

export const CURRENT_FOCUS = `I'm focused on systems that ship with measurable traction — agentic AI that can move money safely, GTM and partnership loops with clear KPIs, stablecoin payment rails, DCA and vault strategies, and dashboards founders can run day to day.`;

export const GITHUB_BLURB =
  '60+ repositories touching payments, dashboards, automation, blockchain infra, and side projects.';
