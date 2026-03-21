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
  /** Display year on project cards */
  year?: string;
}

export const projects: Project[] = [
  {
    slug: 'omniagentpay',
    title: 'OmniAgentPay',
    description: 'Agentic payment execution layer for invoices, approvals, and automated stablecoin payouts.',
    longDescription:
      'OmniAgentPay is an AI-driven payment execution system that turns invoices and intents into safe, policy-bound transactions. It wraps programmable wallets and stablecoin rails behind guardrails like spend limits, rate limiting, and recipient validation so agents can execute payments without breaking treasury controls.',
    tags: ['Agentic AI', 'Payments', 'Stablecoins', 'Treasury'],
    metrics: [
      { label: 'Scope', value: 'Invoice → Intent → Execute' },
      { label: 'Focus', value: 'Policy-based safeguards' },
    ],
    position: [0, 0, 0],
    image: '/omnipay.png',
    liveUrl: 'https://ai-agent-dashboard-two.vercel.app',
    year: '2025',
  },
  {
    slug: 'arcpay',
    title: 'ARCPay Systems',
    description: 'Stablecoin payment gateway for builders and merchants on ARC.',
    longDescription:
      'ARCPay Systems is a Stripe-style stablecoin payment gateway for builders and merchants. It supports payment links, QR payments, on-chain verification, and merchant dashboards so operators can plug stablecoin rails into their products without rebuilding the entire stack.',
    tags: ['Stablecoins', 'Gateway', 'ARC', 'Dashboards'],
    metrics: [
      { label: 'Surface Area', value: 'Links, QR, Dashboards' },
      { label: 'Verification', value: 'On-chain' },
    ],
    position: [2.5, 1.5, -2],
    image: '/arcpay.png',
    liveUrl: 'https://arcpay.systems',
    repoUrl: 'https://github.com/anshitraj/arc-pay-public',
    year: '2025',
  },
  {
    slug: 'private-ledger-flow',
    title: 'Private Ledger Flow',
    description: 'Encrypted Ledger System on Zama FHEVM',
    longDescription:
      'Private Ledger Flow is a privacy-focused financial ledger built on fully homomorphic encryption. It experiments with encrypted computation for balances and flows, allowing teams to reason about financial state while keeping underlying values private.',
    tags: ['FHE', 'Privacy', 'Cryptography', 'Zama'],
    metrics: [
      { label: 'Focus', value: 'Encrypted computation' },
      { label: 'Layer', value: 'On-chain ledger' },
    ],
    position: [-2, -1.5, -1],
    image: '/privateledger.png',
    liveUrl: 'https://private-ledger-steel.vercel.app',
    year: '2025',
  },
  {
    slug: 'mini-cast-store',
    title: 'Mini Cast Store',
    description: 'Mini-App Marketplace (Base / Farcaster)',
    longDescription:
      'Mini Cast Store is a mini-app marketplace built around Base and Farcaster. It ships developer onboarding, admin review flows, and discovery for mini apps — with 25+ developers listing apps and 1,500+ users in the first week.',
    tags: ['Marketplace', 'Base', 'Farcaster', 'Social'],
    metrics: [
      { label: 'Users (week 1)', value: '1,500+' },
      { label: 'Developers', value: '25+' },
    ],
    position: [1.5, -2, 1.5],
    image: '/minicaststore.png',
    liveUrl: 'https://minicast.store',
    repoUrl: 'https://github.com/anshitraj/farcaster-base-hub',
    year: '2025',
  },
  {
    slug: 'riddlepay',
    title: 'RiddlePay',
    description: 'Gamified Crypto Rewards Platform',
    longDescription:
      'RiddlePay is a gamified crypto rewards experiment where users unlock rewards by solving on-chain riddles. It explores playful UX, referral loops, and consumer growth mechanics layered on top of crypto incentives.',
    tags: ['Gamification', 'Rewards', 'Growth', 'UX'],
    metrics: [
      { label: 'Theme', value: 'Gamified payouts' },
      { label: 'Surface', value: 'Consumer' },
    ],
    position: [-1.5, 2, 1],
    image: '/riddlepay.png',
    liveUrl: 'https://riddlepay.tech',
    year: '2025',
  },
  {
    slug: 'arcgpt',
    title: 'ArcGPT',
    description: 'Agent-style assistant for ARC workflows and developer support.',
    longDescription:
      'ArcGPT is an AI assistant that helps builders and operators working in ARC ecosystems. It surfaces workflows, documentation, and payment context in a conversational interface so developers can move faster without context-switching across dashboards and docs.',
    tags: ['Agentic AI', 'LLMs', 'Developer Tools'],
    metrics: [
      { label: 'Mode', value: 'Agent-style assistant' },
      { label: 'Focus', value: 'ARC workflows' },
    ],
    position: [3, 0.5, 2],
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800',
    year: '2025',
  },
  {
    slug: 'dca-vault',
    title: 'DCA Vault',
    description: 'Automated vault for recurring on-chain investment strategies.',
    longDescription:
      'DCA Vault is an automated strategy system for recurring on-chain allocations. It focuses on DeFi and stablecoin flows, letting users set intent-level strategies that the system executes over time under clear constraints.',
    tags: ['DeFi', 'Stablecoins', 'Automation'],
    metrics: [
      { label: 'Strategy', value: 'Recurring DCA' },
      { label: 'Angle', value: 'Stablecoin & DeFi' },
    ],
    position: [-3, 1.5, 2],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    year: '2024',
  },
  {
    slug: 'kreatorboard',
    title: 'Kreatorboard',
    description: 'Influencer analytics and creator collaboration dashboard.',
    longDescription:
      'Kreatorboard is a dashboard for creators, KOLs, and teams to track campaigns, performance, and collaborations. It brings analytics, funnels, and creator relationships into one interface so ecosystem and growth teams can see what is actually working.',
    tags: ['Analytics', 'Creators', 'Dashboards'],
    metrics: [
      { label: 'Network', value: 'KOL & creators' },
      { label: 'Surface', value: 'Analytics & collabs' },
    ],
    position: [0.5, 3, -1.5],
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&q=80&w=800',
    year: '2024',
  },
  {
    slug: 'email-multi-sender',
    title: 'Email Multi Sender',
    description: 'Bulk email and outreach automation utility.',
    longDescription:
      'Email Multi Sender is a bulk email and outreach tool for campaigns, intros, and follow-ups. It is built as a practical utility for founders and operators to coordinate outreach without fighting generic CRM tools.',
    tags: ['Automation', 'Email', 'Growth'],
    metrics: [
      { label: 'Use Case', value: 'Campaigns & intros' },
      { label: 'Angle', value: 'Operator tooling' },
    ],
    position: [-2.5, -2.5, 0.5],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800',
    year: '2024',
  },
  {
    slug: 'artyuga',
    title: 'Artyug Verifier',
    description:
      'Verifies artwork purchased from Artyug and checks via NFC and QR who is the owner on the Solana blockchain.',
    longDescription:
      'Artyug Verifier ties physical art to on-chain ownership: scan NFC or QR to confirm which wallet holds the piece on Solana, so buyers and galleries can trust provenance after purchase from Artyug.',
    tags: ['Solana', 'NFC', 'QR', 'Verification', 'Art'],
    metrics: [
      { label: 'Chain', value: 'Solana' },
      { label: 'Proof', value: 'NFC + QR' },
    ],
    position: [2, -3, -2],
    image: '/artyugverifier.png',
    year: '2025',
  },
  {
    slug: 'gh-timeline',
    title: 'GH Timeline',
    description: 'GitHub activity and notification helper.',
    longDescription:
      'GH Timeline is a small utility for tracking GitHub activity and notifications in a more opinionated way. It makes it easier to see real work across repos without drowning in default inbox noise.',
    tags: ['Developer Tools', 'GitHub', 'Automation'],
    metrics: [
      { label: 'Focus', value: 'Activity view' },
      { label: 'Use', value: 'Personal tooling' },
    ],
    position: [-3, 0, -2.5],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
    year: '2024',
  },
];
