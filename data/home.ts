export type HomeTech = {
  name: string;
  icon: string;
  href: string;
  tone: string;
};

export const HOME_TECH: HomeTech[] = [
  { name: 'TypeScript', icon: '/tech/typescript.svg', href: 'https://www.typescriptlang.org/', tone: '#3178c6' },
  { name: 'Rust', icon: '/tech/rust.svg', href: 'https://www.rust-lang.org/', tone: '#a84e2a' },
  { name: 'Python', icon: '/tech/python.svg', href: 'https://www.python.org/', tone: '#3776ab' },
  { name: 'Go language', icon: '/tech/go.svg', href: 'https://go.dev/', tone: '#00add8' },
  { name: 'React', icon: '/tech/react.svg', href: 'https://react.dev/', tone: '#087ea4' },
  { name: 'Next.js', icon: '/tech/nextdotjs.svg', href: 'https://nextjs.org/', tone: '#3e3e46' },
  { name: 'Tailwind CSS', icon: '/tech/tailwindcss.svg', href: 'https://tailwindcss.com/', tone: '#0f766e' },
  { name: 'Node.js', icon: '/tech/nodedotjs.svg', href: 'https://nodejs.org/', tone: '#3c873a' },
  { name: 'Solana', icon: '/tech/solana.svg', href: 'https://solana.com/', tone: '#6d42b8' },
  { name: 'Ethereum', icon: '/tech/ethereum.svg', href: 'https://ethereum.org/', tone: '#5865a8' },
  { name: 'PostgreSQL', icon: '/tech/postgresql.svg', href: 'https://www.postgresql.org/', tone: '#336791' },
  { name: 'Redis', icon: '/tech/redis.svg', href: 'https://redis.io/', tone: '#a32929' },
  { name: 'Docker', icon: '/tech/docker.svg', href: 'https://www.docker.com/', tone: '#1666b5' },
  { name: 'Supabase', icon: '/tech/supabase.svg', href: 'https://supabase.com/', tone: '#1f8b62' },
  { name: 'GitHub', icon: '/tech/github.svg', href: 'https://github.com/', tone: '#34343c' },
  { name: 'Gemini', icon: '/tech/googlegemini.svg', href: 'https://ai.google.dev/', tone: '#635bba' },
];

export type HomeProject = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'BUILDING' | 'LIVE' | 'OPEN SOURCE';
  year: string;
  emoji: string;
  logo: string;
  image: string;
  video?: { src: string; poster: string; caption: string };
  tags: string[];
  metrics: { value: string; label: string }[];
  live?: string;
  repo?: string;
  caseStudy?: string;
  layout: 'flagship' | 'wide' | 'standard';
};

export const HOME_PROJECTS: HomeProject[] = [
  {
    slug: 'unipayscan',
    title: 'UniPayScan',
    subtitle: 'Universal payment-intent parser',
    description:
      'Detects, validates and normalizes payment QRs, wallet addresses and payment links across fiat and crypto—with the core parser making zero network calls.',
    status: 'OPEN SOURCE',
    year: '2026',
    emoji: '🔎',
    logo: '/projects/unipayscan/logo.svg',
    image: '/projects/unipayscan/cover.png',
    tags: ['Rust', 'Payments', 'WASM', 'SDKs'],
    metrics: [
      { value: '46', label: 'payment schemes' },
      { value: '25+', label: 'countries' },
      { value: '8', label: 'SDKs' },
    ],
    live: 'https://universal-payment-scanner.vercel.app/',
    repo: 'https://github.com/anshitraj/Universal-Payment-Scanner',
    layout: 'flagship',
  },
  {
    slug: 'railor',
    title: 'Railor',
    subtitle: 'Financial infrastructure, mapped',
    description:
      'A source-backed intelligence and orchestration layer for comparing stablecoin, banking, card and compliance infrastructure before teams integrate.',
    status: 'BUILDING',
    year: '2026',
    emoji: '🛤️',
    logo: '/projects/railor/logo.svg',
    image: '/projects/railor/cover.png',
    tags: ['Stablecoins', 'Payments', 'APIs', 'Infrastructure'],
    metrics: [
      { value: '4', label: 'rail categories' },
      { value: 'Live', label: 'change feed' },
    ],
    live: 'https://railor.xyz/',
    repo: 'https://github.com/anshitraj/railor',
    layout: 'standard',
  },
  {
    slug: 'cryptodapp',
    title: 'CryptoDapp.lol',
    subtitle: 'On-chain product leaderboard',
    description:
      'A live bidding leaderboard where crypto products compete for placement by paying directly from a wallet in USDC or USDT.',
    status: 'LIVE',
    year: '2026',
    emoji: '📈',
    logo: '/projects/cryptodapp/logo.png',
    image: '/projects/cryptodapp/cover.png',
    tags: ['Next.js', 'Stablecoins', 'Multi-chain', 'Marketplace'],
    metrics: [
      { value: '5', label: 'supported chains' },
      { value: '2', label: 'stablecoins' },
    ],
    live: 'https://www.cryptodapp.lol/',
    layout: 'standard',
  },
  {
    slug: 'omniclaw',
    title: 'OmniClaw',
    subtitle: 'Payments infrastructure for AI agents',
    description:
      'Lets autonomous agents transact without unrestricted wallet access by enforcing spend limits, recipients and policy outside the model.',
    status: 'OPEN SOURCE',
    year: '2025',
    emoji: '🤖',
    logo: '/logos/omniclaw.jpg',
    image: '/projects/omniclaw/cover.png',
    video: {
      src: '/projects/omniclaw/walkthrough.mp4',
      poster: '/projects/omniclaw/poster.jpg',
      caption: 'An agent negotiates and settles a paid API call through OmniClaw.',
    },
    tags: ['AI Agents', 'x402', 'CCTP', 'MCP'],
    metrics: [
      { value: '1st', label: 'Gemini track' },
      { value: '221', label: 'teams' },
      { value: '100+', label: 'test payments' },
    ],
    live: 'https://omniclaw.ai/',
    caseStudy: '/projects/omniclaw',
    layout: 'wide',
  },
  {
    slug: 'ledger-agent-firewall',
    title: 'Ledger Agent Firewall',
    subtitle: 'AI transaction security',
    description:
      'A deterministic signing gate that catches prompt-injected payment instructions before a transaction reaches a hardware wallet.',
    status: 'LIVE',
    year: '2026',
    emoji: '🛡️',
    logo: '/logos/ledger.jpg',
    image: '/projects/ledger-agent-firewall/cover.png',
    video: {
      src: '/projects/ledger-agent-firewall/walkthrough.mp4',
      poster: '/projects/ledger-agent-firewall/poster.jpg',
      caption: 'A poisoned invoice is stopped before hardware-wallet signing.',
    },
    tags: ['Security', 'Ledger', 'Gemini', 'Payments'],
    metrics: [
      { value: '12K+', label: 'project views' },
      { value: '$100', label: 'N3XT prize' },
    ],
    live: 'https://hardware-firewall.vercel.app/',
    repo: 'https://github.com/anshitraj/Ledger-FailSafe',
    caseStudy: '/projects/ledger-agent-firewall',
    layout: 'standard',
  },
  {
    slug: 'artyug',
    title: 'Artyug',
    subtitle: 'NFC-verified art marketplace',
    description:
      'A Flutter marketplace where an NFC tag on physical artwork resolves to on-chain provenance and ownership on Solana.',
    status: 'LIVE',
    year: '2026',
    emoji: '🎨',
    logo: '/logos/Artyug.png',
    image: '/projects/artyug/cover.png',
    tags: ['Flutter', 'Solana', 'NFC', 'Marketplace'],
    metrics: [
      { value: '₹80K+', label: 'early cashflow' },
      { value: '20+', label: 'artists' },
      { value: '200+', label: 'users' },
    ],
    live: 'https://artyug.art/',
    caseStudy: '/projects/artyug',
    layout: 'wide',
  },
];

/** Existing projects whose media and full case studies remain available below the primary grid. */
export const MORE_PROJECT_SLUGS = [
  'webcoin-labs',
  'arc-pass',
  'arcpay',
  'agentic-api-economy',
  'mini-cast-store',
] as const;
