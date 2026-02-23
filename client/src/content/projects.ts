export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  position: [number, number, number];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'omniagentpay',
    title: 'OmniAgentPay',
    description: 'AI-Driven Commerce & Payments Infrastructure',
    longDescription: 'Secure payment execution layer for AI agents with policy-based controls (spend limits, rate limiting, recipient validation). Built using Circle programmable wallets, MCP, and LangChain. Processed 100+ test transactions with feedback from 50+ developers.',
    tags: ['AI', 'Payments', 'Web3', 'Circle'],
    metrics: [{ label: 'Transactions', value: '100+' }, { label: 'Dev Feedback', value: '50+' }],
    position: [0, 0, 0],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'arcpay',
    title: 'ARCPay',
    description: 'Stablecoin Payment Gateway on ARC',
    longDescription: 'Stripe-like crypto payment system with on-chain verification, merchant dashboards, QR payments, and idempotent APIs. Tested with 100+ transactions for real merchant workflows.',
    tags: ['Stablecoins', 'Gateway', 'ARC', 'API'],
    metrics: [{ label: 'Transactions', value: '100+' }, { label: 'Verification', value: 'On-chain' }],
    position: [2.5, 1.5, -2],
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'private-ledger-flow',
    title: 'Private Ledger Flow',
    description: 'Encrypted Ledger System on Zama FHEVM',
    longDescription: 'Fully homomorphic encrypted ledger with 5+ encrypted smart contract functions and 50+ tested entries. Enables privacy-first on-chain computation.',
    tags: ['FHE', 'Privacy', 'Cryptography', 'Zama'],
    metrics: [{ label: 'Functions', value: '5+' }, { label: 'Entries', value: '50+' }],
    position: [-2, -1.5, -1],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'mini-cast-store',
    title: 'Mini Cast Store',
    description: 'Mini-App Marketplace (Base / Farcaster)',
    longDescription: 'Marketplace for mini apps with developer onboarding and admin review. 25+ developers listed apps, 1,500+ signups in first week, and ~150 DAU.',
    tags: ['Marketplace', 'Base', 'Farcaster', 'Social'],
    metrics: [{ label: 'Signups', value: '1,500+' }, { label: 'DAU', value: '~150' }],
    position: [1.5, -2, 1.5],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'riddlepay',
    title: 'RiddlePay',
    description: 'Gamified Crypto Rewards Platform',
    longDescription: 'Airdrops unlocked by solving riddles with referral-based growth loops. Improved engagement by 40% with consumer-facing, playful UX.',
    tags: ['Gamification', 'Rewards', 'Growth', 'UX'],
    metrics: [{ label: 'Engagement', value: '+40%' }, { label: 'Type', value: 'Consumer' }],
    position: [-1.5, 2, 1],
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800'
  }
];
