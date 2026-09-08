export const HOME_TECH = [
  { name: 'TypeScript', mark: 'TS' },
  { name: 'Rust', mark: 'RS' },
  { name: 'Python', mark: 'PY' },
  { name: 'Go', mark: 'GO' },
  { name: 'React', mark: 'RE' },
  { name: 'Next.js', mark: 'N' },
  { name: 'Tailwind', mark: 'TW' },
  { name: 'Node.js', mark: 'ND' },
  { name: 'Solana', mark: 'SOL' },
  { name: 'Ethereum', mark: 'ETH' },
  { name: 'PostgreSQL', mark: 'PG' },
  { name: 'Redis', mark: 'RD' },
  { name: 'Docker', mark: 'DK' },
  { name: 'Supabase', mark: 'SB' },
  { name: 'MCP', mark: 'MCP' },
  { name: 'Gemini', mark: 'AI' },
] as const;

export const HOME_PROJECTS = [
  {
    index: '01',
    name: 'UniPayScan',
    description:
      'Universal payment-QR intelligence that parses and normalizes payment intents across countries, wallets and crypto networks.',
    tags: ['Rust', 'Payments', 'WASM', 'Fintech'],
    status: 'Open source',
    proof: '36 schemes · 25+ countries',
    live: 'https://universal-payment-scanner.vercel.app/',
    repo: 'https://github.com/anshitraj/Universal-Payment-Scanner',
  },
  {
    index: '02',
    name: 'Railor',
    description:
      'A control and orchestration layer for stablecoin payment infrastructure, designed to sit across providers and payment rails.',
    tags: ['Stablecoins', 'Payments', 'APIs', 'Infrastructure'],
    status: 'Building',
    proof: 'Policy-first routing',
    live: 'https://railor.xyz/',
    repo: 'https://github.com/anshitraj/railor',
  },
  {
    index: '03',
    name: 'CryptoDapp.lol',
    description:
      'A live bidding leaderboard where crypto products compete for placement using USDC or USDT across five chains.',
    tags: ['Next.js', 'Stablecoins', 'Multi-chain', 'Marketplace'],
    status: 'Live',
    proof: '5 payment networks',
    live: 'https://cryptodapp.lol/',
  },
  {
    index: '04',
    name: 'OmniClaw',
    description:
      'Policy and payment infrastructure that lets AI agents transact without unrestricted access to a wallet.',
    tags: ['AI Agents', 'Payments', 'x402', 'CCTP'],
    status: 'Open source',
    proof: '1st · Gemini track',
    live: 'https://omniclaw.ai/',
    caseStudy: '/projects/omniclaw',
  },
  {
    index: '05',
    name: 'Ledger / SignScope',
    description:
      'An AI transaction firewall that verifies payment intent before a transaction reaches hardware-wallet signing.',
    tags: ['Security', 'Ledger', 'AI', 'Payments'],
    status: 'Live',
    proof: '12K+ project views',
    live: 'https://hardware-firewall.vercel.app/',
    repo: 'https://github.com/anshitraj/Ledger-FailSafe',
    caseStudy: '/projects/ledger-agent-firewall',
  },
  {
    index: '06',
    name: 'Artyug',
    description:
      'A cross-chain artwork marketplace with NFC-backed authenticity and on-chain ownership verification.',
    tags: ['Flutter', 'Solana', 'NFC', 'Marketplace'],
    status: 'Live',
    proof: '₹80K+ early cashflow',
    live: 'https://artyug.art/',
    caseStudy: '/projects/artyug',
  },
] as const;

export const HOME_EXPERIENCE = [
  {
    company: 'Webcoin Labs',
    role: 'Founder · Product & Growth',
    period: 'Dec 2022 — Dec 2025',
    description:
      'Built founder-facing products and the operating network around them—fundraising, partnerships, launch and distribution.',
    proof: '275+ startups · 50+ investors · 1,500+ creators',
    href: 'https://webcoinlabs.com/',
  },
  {
    company: 'Stealth Startup',
    role: 'SDE Intern',
    period: 'Jun 2025 — Aug 2025',
    description: 'Backend reliability, concurrency handling and load behavior under stress testing.',
  },
  {
    company: 'ALTAVA GROUP',
    role: 'SDE Intern',
    period: 'Oct 2024 — Dec 2024',
    description: 'Blockchain product work with Next.js and on-chain integrations.',
  },
  {
    company: 'Raydium Protocol',
    role: 'Protocol Contributor',
    period: 'May 2023 — Jul 2023',
    description: 'Solana AMM tooling, SDK usage and liquidity-pool integrations.',
  },
] as const;

export const HOME_METRICS = [
  { value: '275+', label: 'Startups supported' },
  { value: '50+', label: 'Investor relationships' },
  { value: '$100K', label: 'Fundraising supported' },
  { value: '1,500+', label: 'Creators coordinated' },
  { value: '12K+', label: 'Ledger project views' },
] as const;
