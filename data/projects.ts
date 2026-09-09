import type { Project } from './types';

/**
 * Three tiers so the work reads as a hierarchy rather than 13 identical cards:
 *   featured    → full case study, large card
 *   selected    → compact row with links
 *   experiment  → one-line entry
 *
 * Metrics marked `verified: false` are hidden at render time (lib/metrics.ts).
 */
export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────── FEATURED ──
  {
    slug: 'webcoin-labs',
    tier: 'featured',
    title: 'Webcoin Labs',
    subtitle: 'Founder Operating System',
    status: 'BUILDING',
    year: '2022 — Present',
    oneLiner:
      'An operating layer for early-stage founders: identity, builder discovery, investor access, and launch support in one place instead of across fifteen tabs.',

    problem: `Early-stage founders run their company across scattered tools — cold DMs, spreadsheets of investors, three community group chats, and introductions that depend entirely on who they happened to meet. The work that decides whether a startup survives (finding the right builder, reaching the right investor, getting distribution at launch) is the least systematised part of the job. Everyone rebuilds the same broken process from zero.`,

    whyIBuiltIt: `I spent three years on the founder side of that mess — making introductions, running partnership loops, helping teams fundraise and launch. The same requests came in every week, and I was solving them manually each time with a contact list and a lot of messages. That is a product, not a personality trait.`,

    whatIBuilt: `A founder operating layer that brings the workflows together: founder and builder profiles that mean something, a searchable directory, investor and advisor introductions, deck and tokenomics support, credentials that reflect real participation, and launch plus distribution support at the point founders actually need it.`,

    myRole: [
      'Product direction and roadmap',
      'Founder support and ecosystem operations',
      'Partnerships and business development',
      'Go-to-market and distribution',
      'Fundraising support for portfolio teams',
      'Technical and product development',
    ],

    challenges: `Network products are worthless when empty and defensible when full, so the sequencing matters more than the feature set. The hard part was resisting the urge to ship a directory before there was anything worth listing — the network had to be real first, and the software had to earn its place by removing work I was otherwise doing by hand.`,

    learned: `Distribution is a product problem, not a marketing one. The introductions that worked were never the ones with the best copy; they were the ones where both sides had legible proof of what they had actually done. That insight is what became Arc Pass.`,

    tech: [
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'REST APIs',
      'Arc',
      'Vercel',
    ],
    tags: ['Founder Tools', 'Network', 'Product', 'GTM'],

    metrics: [
      { label: 'Generated for clients', value: '$100K' },
      { label: 'Startups connected and supported', value: '275+' },
      { label: 'Investors I built relationships with', value: '50+' },
      { label: 'Creators I ran campaigns with', value: '1,500+' },
      { label: 'Community grown from zero', value: '200K' },
      { label: 'Daily actives at peak', value: '3,000+' },
      {
        label: 'Ecosystem reach',
        value: '300K+',
        verified: false,
        note: 'Aggregate across channels — needs a stated basis.',
      },
    ],

    image: '/projects/webcoin-labs/cover.png',
    hasRealImage: true,
    logo: '/logos/webcoinlabs.jpg',
    video: {
      src: '/projects/webcoin-labs/walkthrough.mp4',
      poster: '/projects/webcoin-labs/poster.jpg',
      caption: 'The founder onboarding flow — role, verification and early-access waitlist.',
    },
    links: {
      live: 'https://webcoinlabs.com',
    },
  },

  {
    slug: 'arc-pass',
    tier: 'featured',
    title: 'Arc Pass',
    subtitle: 'Proof-Based Founder & Builder Identity',
    status: 'BUILDING',
    year: '2025 — Present',
    oneLiner:
      'A credential layer for the Arc ecosystem where access is earned from verifiable building history, not from claiming a title.',

    problem: `Every ecosystem directory is self-reported. Anyone can write "founder" or "senior engineer" in a bio, which means the signal is worth roughly nothing and everyone falls back on warm introductions anyway. The passes and NFTs that tried to fix this mostly just moved the same unverified claim on-chain.`,

    whyIBuiltIt: `Running founder introductions at Webcoin Labs, the bottleneck was never willingness — it was trust. I could vouch for people I had personally worked with and nobody else. Proof of building is the thing that scales past what one person can vouch for.`,

    whatIBuilt: `Two credentials built on evidence rather than assertion. Founder Pass is invite-based and carries founder identity, ecosystem access and a credibility layer that travels with you. Builder Pass is earned: it reads real ecosystem participation — contract activity, shipped projects, GitHub history — and resolves to a tier that reflects what you have actually built.`,

    credentials: [
      {
        name: 'Founder Pass',
        description: 'Invite-based founder identity and access.',
        points: [
          'Founder identity and ecosystem access',
          'Startup credibility layer that travels between platforms',
          'Access to founder-only ecosystem benefits',
          'Gateway into investor and advisor introductions',
        ],
      },
      {
        name: 'Builder Pass',
        description: 'Earned from verifiable building history.',
        points: [
          'Reads on-chain contract activity',
          'Checks shipped projects and ecosystem participation',
          'Verifies GitHub and public building proof',
          'Resolves to a tier that reflects real work',
        ],
      },
    ],

    credentialTiers: [
      { name: 'Bronze', requirement: 'Verified entry — first proven contributions' },
      { name: 'Silver', requirement: 'Consistent shipping across multiple projects' },
      { name: 'Gold', requirement: 'Sustained ecosystem activity and depth' },
      { name: 'Platinum', requirement: 'Significant, sustained public building record' },
      { name: 'Diamond', requirement: 'Top-tier verified builder standing' },
    ],

    myRole: [
      'Product design and credential model',
      'Tier and verification logic',
      'Ecosystem integration with Webcoin Labs',
      'Go-to-market',
    ],

    challenges: `Making a credential that resists gaming without becoming impossible to earn. Weighted too far toward on-chain activity and it rewards whoever deploys the most throwaway contracts; weighted too far toward manual review and it does not scale past a few hundred people.`,

    learned: `The credential is only as valuable as what it unlocks. Building the verification was the easy half — the work that matters is making the pass actually gate something people want.`,

    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Arc', 'Smart Contracts'],
    tags: ['Identity', 'Credentials', 'Arc', 'Founder Tools'],

    metrics: [],

    image: '/projects/arc-pass/cover.png',
    hasRealImage: true,
    logo: '/logos/ArcPass.png',
    video: {
      src: '/projects/arc-pass/walkthrough.mp4',
      poster: '/projects/arc-pass/poster.jpg',
      caption:
        'Claiming a pass: username check, eligibility against real onchain activity, then the issued Founder Pass credential.',
    },
    links: {
      live: 'https://arc.webcoinlabs.com',
      extra: [{ label: 'Webcoin Labs', href: 'https://webcoinlabs.com' }],
    },
  },

  {
    slug: 'arcpay',
    tier: 'featured',
    title: 'ArcPay',
    subtitle: 'Stablecoin Payment Infrastructure',
    status: 'LIVE',
    year: '2025',
    oneLiner:
      'Developer-first stablecoin payment infrastructure for merchants and applications — payment links, verification, settlement tracking and receipts behind one API.',

    problem: `Accepting stablecoins sounds simple until you build it. You need to watch chains for confirmations, handle a customer paying twice or paying the wrong amount, produce a receipt someone's accountant will accept, reconcile settlement, and expose all of it to a merchant who does not want to think about any of it. Most teams rebuild that whole stack badly, in-house.`,

    whyIBuiltIt: `I wanted to understand payment infrastructure properly, and reading about it does not work. Building the boring parts — idempotency, verification, reconciliation — is what actually teaches you why payment systems are shaped the way they are.`,

    whatIBuilt: `A payment gateway with the developer surface a payments product needs: idempotent APIs so a retried request never charges twice, on-chain transaction verification, settlement tracking, payment receipts, payment links and QR flows, and a merchant dashboard that makes the state of every payment legible.`,

    flow: [
      'Merchant creates a payment intent',
      'Customer pays via link, QR or direct transfer',
      'On-chain verification confirms amount and recipient',
      'Idempotency key resolves duplicates and retries',
      'Settlement tracked and receipt issued',
      'Merchant dashboard reflects final state',
    ],

    myRole: [
      'End-to-end product and engineering',
      'API design — idempotency and verification model',
      'Merchant dashboard',
      'Circle ecosystem integration and listing',
    ],

    challenges: `Idempotency is the whole game and it is deceptively hard. A network retry, a double-submitted form and a genuine second purchase look nearly identical at the API boundary, and getting that wrong in a payments system is the one bug you cannot apologise your way out of.`,

    learned: `Payment infrastructure is mostly about what happens when things go wrong. The happy path took a fraction of the time; the rest was retries, partial payments, wrong amounts, chain reorgs and reconciliation — which is exactly why the category is defensible.`,

    tech: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
      'REST APIs',
      'Arc',
      'Tempo testnet',
      'x402',
      'CCTP',
      'Circle',
      'Stablecoins',
    ],
    tags: ['Stablecoins', 'Payments', 'Infrastructure', 'Circle'],

    metrics: [
      { label: 'Circle Alliance Directory', value: 'Listed' },
      { label: 'Categories', value: 'Bridge SDKs · Fintech · Payments' },
      {
        label: 'Early users',
        value: '250+',
        verified: false,
        note: 'From the brief; not corroborated elsewhere yet.',
      },
    ],

    image: '/projects/arcpay/cover.png',
    hasRealImage: true,
    logo: '/logos/ArcPay.jpg',
    video: {
      src: '/projects/arcpay/walkthrough.mp4',
      poster: '/projects/arcpay/poster.jpg',
      caption: 'A payment link created, paid and verified on-chain, then settled through the merchant dashboard.',
    },
    links: {
      live: 'https://www.arcpay.systems',
      repo: 'https://github.com/anshitraj/arc-pay-public',
    },
  },

  {
    slug: 'omniclaw',
    tier: 'featured',
    title: 'OmniClaw',
    subtitle: 'Payments Infrastructure for AI Agents',
    status: 'OPEN SOURCE',
    year: '2025',
    oneLiner:
      'Open-source infrastructure that lets autonomous agents pay for things without ever holding unrestricted access to a wallet.',

    problem: `To let an AI agent buy something, you currently hand it wallet access. That is the entire security model, and it is indefensible — one prompt injection, one hallucinated recipient, one loop that retries a transfer forty times, and the money is gone. Agents need to be able to spend without being trusted.`,

    whyIBuiltIt: `Agent commerce is going to happen whether or not the safety layer exists. I would rather the layer exist. Built it into a first-place finish at the Circle × Google DeepMind Agentic Commerce hackathon on Arc, and kept going after.`,

    whatIBuilt: `A payment execution layer that sits between the agent and the money. Policies are enforced outside the model: spending limits, recipient allowlists and validation, rate limits, agent identity, and transaction policies the agent cannot talk its way past. The agent expresses intent; the infrastructure decides whether that intent is permitted.`,

    flow: [
      'Agent expresses a payment intent',
      'Agent identity resolved and authenticated',
      'Transaction policy evaluated — limits, rate, recipient',
      'Recipient validated against allowlist',
      'Payment routed via x402 / CCTP',
      'Execution through developer-controlled wallet',
      'Result returned to the agent with an audit trail',
    ],

    myRole: [
      'Payment execution architecture',
      'Policy and guardrail design',
      'Frontend architecture and dashboard UI',
      'MCP server integration',
      'Open-source maintenance and developer support',
    ],

    challenges: `Guardrails have to be deterministic. Anything enforced by prompting the model is not a guardrail, it is a suggestion — so every limit lives outside the agent, in code that cannot be argued with.`,

    learned: `The interesting constraint in agent payments is not cryptographic, it is authorisation design. "What is this agent allowed to do, on whose behalf, up to what limit, for how long" is the whole product.`,

    tech: [
      'x402',
      'CCTP',
      'Circle Developer Controlled Wallets',
      'MCP',
      'TypeScript',
      'React',
      'Node.js',
      'AI Agents',
    ],
    tags: ['Agentic AI', 'Payments', 'Infrastructure', 'Open Source'],

    metrics: [
      { label: 'Test transactions', value: '100+' },
      { label: 'Developer feedback', value: '50+' },
      { label: 'Google Cloud credits won', value: '$20,000' },
      {
        label: 'GitHub stars',
        value: '500+',
        verified: false,
        note: 'Publicly checkable — confirm against the repo before shipping.',
      },
      {
        label: 'Usage',
        value: '3,000+',
        verified: false,
        note: 'Brief cited both 3,000+ and 5,000+. Needs one source.',
      },
    ],

    image: '/projects/omniclaw/cover.png',
    hasRealImage: true,
    logo: '/logos/omniclaw.jpg',
    video: {
      src: '/projects/omniclaw/walkthrough.mp4',
      poster: '/projects/omniclaw/poster.jpg',
      caption:
        'An agent negotiating and settling a paid API call over Telegram — price, endpoint and spend policy set from chat, executed through OmniClaw.',
    },
    links: {
      live: 'https://omniclaw.ai',
      extra: [{ label: 'Hackathon build', href: 'https://ai-agent-dashboard-two.vercel.app' }],
    },
  },

  {
    slug: 'ledger-agent-firewall',
    tier: 'featured',
    title: 'Ledger Agent Firewall',
    subtitle: 'AI Transaction Security',
    status: 'LIVE',
    year: '2026',
    oneLiner:
      'A deterministic security layer that catches prompt-injected payment instructions before they ever reach a hardware wallet for signing.',

    problem: `An AI agent processing an invoice will read whatever is in that invoice — including instructions hidden inside it. A poisoned document can redirect a payment to an attacker's address, and the agent will produce a perfectly well-formed transaction for it. The model is the vulnerability, so the model cannot also be the check.`,

    whyIBuiltIt: `Treasury agents are being deployed right now on the assumption that the model will behave. That assumption fails on the first adversarial invoice. The fix has to sit outside the model, at the hardware boundary.`,

    whatIBuilt: `A verification gate between agent output and hardware signing. The user's stated intent is captured first. The invoice is scanned separately. The AI-produced transaction is then compared deterministically against the original intent — not by another model, by code — and the difference drives a risk decision. Only transactions that survive that comparison reach the Ledger signing gate, where the device's trusted display shows the user what they are actually signing.`,

    flow: [
      'User intent captured',
      'Invoice scanned',
      'AI produces a transaction',
      'Deterministic comparison against original intent',
      'Risk decision',
      'Ledger signing gate — trusted display confirms',
    ],

    myRole: [
      'Security architecture and threat model',
      'Deterministic comparison engine',
      'Ledger DMK and Speculos integration',
      'API design with OpenAPI and Zod validation',
      'Full frontend',
    ],

    challenges: `The comparison layer cannot use an LLM — that would reintroduce the exact vulnerability it exists to close. Everything had to reduce to deterministic checks over structured transaction fields, which means the parsing has to be exhaustive rather than clever.`,

    learned: `Hardware wallets already solve this problem; the industry just stopped routing decisions through them. The trusted display is the last surface an attacker cannot reach, and any agent architecture that bypasses it is trusting the wrong component.`,

    tech: [
      'Gemini',
      'Ledger DMK',
      'Speculos',
      'TypeScript',
      'React',
      'Vite',
      'Express',
      'OpenAPI',
      'Zod',
    ],
    tags: ['Security', 'Agentic AI', 'Ledger', 'Hardware Wallet'],

    metrics: [
      { label: 'Project views', value: '12K+' },
      { label: 'Recognition', value: 'Engagement from Ledger leadership' },
    ],

    image: '/projects/ledger-agent-firewall/cover.png',
    hasRealImage: true,
    logo: '/logos/ledger.jpg',
    video: {
      src: '/projects/ledger-agent-firewall/walkthrough.mp4',
      poster: '/projects/ledger-agent-firewall/poster.jpg',
      caption: 'A poisoned invoice caught before the transaction it produces ever reaches the Ledger signing gate.',
    },
    links: {
      live: 'https://hardware-firewall.vercel.app',
      repo: 'https://github.com/anshitraj/Ledger-FailSafe',
      extra: [{ label: 'SignScope', href: 'https://github.com/anshitraj/ledger-signscope' }],
    },
  },

  {
    slug: 'agentic-api-economy',
    tier: 'featured',
    title: 'Agentic API Economy',
    subtitle: 'Machine-to-Machine Micropayments for AI Agents',
    status: 'LIVE',
    year: '2026',
    oneLiner:
      'A full-stack agentic economy demo that makes machine-to-machine micropayments feel like a conversation — type a request, and an agent plans, pays and answers autonomously.',

    problem: `Traditional on-chain gas fees (~$0.005/tx) would consume 40%+ of a sub-cent API call, which makes per-action pricing economically impossible. Without a way to make each nanopayment cheap enough, AI agents can't pay for API access one call at a time — they're stuck with flat subscriptions instead of paying only for what they use.`,

    whyIBuiltIt: `Nanopayments are the only viable pricing model for per-action AI commerce, and I wanted to prove it end to end rather than argue it in the abstract. Built this at the second lablab.ai hackathon I took part in, on the Agent Builder / Internet of Agents track.`,

    whatIBuilt: `A user types a natural-language request — "get the latest tweets from @elonmusk" or "compare ETH and BTC this week" — and the system does the rest autonomously: an LLM planner routes the request to the right paid API skill, OmniClaw's policy engine enforces spending guards (budget, rate limit, recipient allowlist), the selected endpoint is inspected for its x402 payment requirements, Circle Gateway signs an EIP-3009 off-chain authorization and settles the nanopayment on Arc, and the raw API response is streamed back through an LLM that formats it into a clean, readable answer. Every step is visualised in a real-time execution trace in the UI. Circle Gateway batches EIP-3009 authorizations into amortised on-chain settlements, cutting effective per-payment overhead to under $0.0001 and unlocking genuine per-query pricing at scale. Skills supported at launch: Twitter Autopilot, Multi-Source Search, YouTube SERP, Crypto Market Data, Prediction Markets, and MarketPulse — all monetised at the API level via x402 on Arc Testnet.`,

    flow: [
      'User types a natural-language request',
      'LLM planner routes it to the right paid API skill',
      "OmniClaw's policy engine enforces spending guards — budget, rate limit, recipient allowlist",
      'Endpoint inspected for its x402 payment requirements',
      'Circle Gateway signs an EIP-3009 off-chain authorization',
      'Nanopayment settles on Arc',
      'Raw API response streamed back through an LLM and formatted into a clean answer',
    ],

    myRole: [
      'Built with a teammate at the lablab.ai Agent Builder hackathon',
      'Payment policy and nanopayment integration — OmniClaw, Circle Gateway, x402, Arc',
      'Real-time execution trace UI',
    ],

    challenges: `Making per-action pricing real, not just plausible. Gas fees alone would eat almost half of a sub-cent API call, so the whole design has to route through Circle Gateway's batched EIP-3009 authorizations instead of naive per-call settlement, or the economics never work.`,

    learned: `The interesting part isn't the LLM planning — it's the payment layer underneath it. Per-action AI commerce lives or dies on whether the settlement cost is negligible next to the price of the action itself.`,

    tech: [
      'Next.js 15',
      'React',
      'TypeScript',
      'TailwindCSS',
      'shadcn/ui',
      'Featherless',
      'Qwen3',
      'OmniClaw',
      'Circle Gateway',
      'x402',
      'Arc',
      'EIP-3009',
    ],
    tags: ['Agentic AI', 'Payments', 'Hackathon', 'Infrastructure'],

    metrics: [
      { label: 'Hackathon', value: 'lablab.ai — Agent Builder track' },
      { label: 'Track', value: 'The Internet of Agents' },
    ],

    image: '/projects/agentic-api-economy/cover.png',
    hasRealImage: true,
    video: {
      src: '/projects/agentic-api-economy/walkthrough.mp4',
      poster: '/projects/agentic-api-economy/poster.jpg',
      caption:
        'A natural-language request planned, paid for via Circle Gateway and x402, and answered — with the full execution trace visible.',
    },
    links: {
      live: 'https://arc-agentic-economy-hackathon.vercel.app/',
      extra: [
        {
          label: 'Presentation',
          href: 'https://storage.googleapis.com/lablab-static-eu/presentations/submissions/b7tezjt9rksl2crcj6creg2n/b7tezjt9rksl2crcj6creg2n-1777164514431_j5pck1usbbq488az6xpsmebu.pdf',
        },
        { label: 'Team repo (GitHub)', href: 'https://github.com/ahmadghoniem/arc-agentic-economy-hackathon' },
      ],
    },
  },

  {
    slug: 'mini-cast-store',
    tier: 'featured',
    title: 'Mini Cast Store',
    subtitle: 'Mini-App Marketplace',
    status: 'LIVE',
    year: '2025',
    oneLiner:
      'A marketplace for Base and Farcaster mini-apps — developer submission, review, moderation and discovery, shipped end to end.',

    problem: `Mini-apps had developers building them and users who wanted them, and no reliable place where those two met. Discovery happened through whichever post got traction that day, which is a terrible distribution mechanism for the developer and a worse one for the user.`,

    whyIBuiltIt: `A marketplace is one of the few products where you can test the whole loop quickly: get developers to submit, review what comes in, make it findable, see if anyone returns. It answers real questions about supply and demand within a week.`,

    whatIBuilt: `The full marketplace loop — developer submission flow, an app review queue with moderation, a discovery surface, and the marketplace itself. Launched to 1,500+ signups in the first week with 25+ developers listing apps.`,

    flow: [
      'Developer submits a mini-app',
      'Submission enters the review queue',
      'Moderation and approval',
      'App published to discovery',
      'Users browse, install and return',
    ],

    myRole: [
      'End-to-end product and engineering',
      'Developer onboarding flow',
      'Review and moderation tooling',
      'Launch and growth',
    ],

    challenges: `Cold-start on both sides at once. Developers will not submit to an empty marketplace and users will not browse an empty catalogue, so the first two weeks were almost entirely manual developer outreach rather than product work.`,

    learned: `Retention exposed the real problem immediately: signups were easy and coming back was not. 1,500 signups against 150 daily actives is the number that tells you what to build next.`,

    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Base', 'Farcaster'],
    tags: ['Marketplace', 'Base', 'Farcaster', 'Consumer'],

    metrics: [
      { label: 'Signups, week one', value: '1,500+' },
      { label: 'Daily active users', value: '150' },
      { label: 'Developers onboarded', value: '25+' },
    ],

    image: '/projects/mini-cast-store/cover.png',
    hasRealImage: true,
    logo: '/logos/minicast.jpg',
    links: {
      live: 'https://www.minicast.store',
      repo: 'https://github.com/anshitraj/farcaster-base-hub',
    },
  },

  {
    slug: 'artyug',
    tier: 'featured',
    title: 'Artyug',
    subtitle: 'NFC-Verified Art Marketplace',
    status: 'LIVE',
    year: '2026',
    oneLiner:
      'Physical artwork with digital provenance — a Flutter marketplace where an NFC tag on the canvas resolves to on-chain proof of who owns it.',

    problem: `Provenance for physical art is paperwork. A certificate of authenticity is a piece of card that can be forged, lost, or separated from the work it describes, and once a piece changes hands twice the chain of ownership is usually just somebody's word.`,

    whyIBuiltIt: `I wanted to prove I could build a consumer product that takes real money from real people, not only infrastructure other developers consume. Art was a good test because the verification problem is genuine rather than invented.`,

    whatIBuilt: `A mobile-first marketplace in Flutter with an NFC tag embedded in the physical piece. Tapping it resolves ownership against Solana, so provenance stays attached to the artwork itself rather than to a document. Artists list work, buyers pay with real money, and ownership transfers are verifiable after the sale.`,

    myRole: [
      'Flutter mobile application',
      'NFC verification flow',
      'Solana ownership verification',
      'Artist onboarding and listings',
      'Real-money payment integration',
    ],

    challenges: `NFC behaves differently across Android devices and the failure modes are all physical — tag placement, read range, what happens when the tag is damaged. None of that shows up until you are holding an actual canvas.`,

    learned: `Consumer products live or die on the first thirty seconds. Artists did not care about Solana at all; they cared whether listing a piece took two minutes or twenty. The verification was the point of the product and never the reason anyone used it.`,

    tech: ['Flutter', 'Dart', 'NFC', 'Solana', 'Node.js', 'PostgreSQL'],
    tags: ['Consumer', 'Marketplace', 'NFC', 'Solana'],

    metrics: [
      { label: 'Revenue generated', value: '₹80,000' },
      { label: 'Artists onboarded', value: '20+' },
      { label: 'Students / users', value: '200+' },
      { label: 'Platform', value: 'Android + Web' },
    ],

    image: '/projects/artyug/cover.png',
    hasRealImage: true,
    logo: '/logos/Artyug.png',
    screenshots: [
      '/projects/artyug/screens/s1.jpeg',
      '/projects/artyug/screens/s2.jpeg',
      '/projects/artyug/screens/s3.jpeg',
      '/projects/artyug/screens/s4.jpeg',
      '/projects/artyug/screens/s5.jpeg',
      '/projects/artyug/screens/s6.jpeg',
    ],
    links: {
      live: 'https://artyug.art',
    },
  },

  // ─────────────────────────────────────────────────────────── SELECTED ──
  {
    slug: 'for-you',
    tier: 'selected',
    title: 'For You',
    subtitle: 'Time-Locked Birthday Scrapbook',
    status: 'LIVE',
    year: '2026',
    oneLiner:
      'A handmade vintage scrapbook that stays sealed until midnight in her timezone, then opens into a page-turning book of photographs, letters and hidden notes.',

    problem: `I wanted to build something for one person that felt made rather than generated — and put the source on GitHub without putting her name, her birthday or her photographs on GitHub with it.`,

    whatIBuilt: `A page-turning scrapbook with a wax seal that will not break before the moment it is supposed to. Spreads hold polaroids you can turn over, a timeline, a quiz, "open when…" letters and notes hidden in the margins. Every word, photo path and caption lives in one data file, so the whole book can be rewritten without touching a component.`,

    myRole: [
      'Full design and build',
      'Time-lock and timezone logic',
      'Privacy model — public repo, private contents',
      'Page-turn interactions and layout',
    ],

    challenges: `Keeping a public repository genuinely free of anything identifying. Her name, the date and the endearment come from environment variables with neutral fallbacks, and every photo and voice note is git-ignored by directory rather than by filename pattern — a glob that "should" match is one careless filename away from leaking. A fresh clone with no \`.env\` still builds and runs.`,

    learned: `The midnight unlock had to fire at *her* midnight, not the visitor's. Computing it against an IANA timezone rather than the browser's clock is a two-line difference that decides whether the thing works at all when someone opens it from another country.`,

    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    tags: ['Consumer', 'Craft', 'Interaction Design'],
    metrics: [{ label: 'Unlocks at', value: 'Midnight, her timezone' }],

    image: '/projects/girlfriend-birthday/cover.png',
    hasRealImage: true,
    links: {
      repo: 'https://github.com/anshitraj/girlfriend-birthday',
    },
  },

  {
    slug: 'riddlepay',
    tier: 'selected',
    title: 'RiddlePay',
    subtitle: 'Gamified Rewards Platform',
    status: 'LIVE',
    year: '2025',
    oneLiner:
      'A rewards platform built to test growth loops — challenges, referrals and retention experiments layered on crypto incentives.',
    problem: `Reward products acquire users cheaply and lose them just as fast. The interesting question is not how to get someone to claim a reward once, it is what brings them back on day seven.`,
    whatIBuilt: `A challenge-and-reward loop with referrals, built specifically so the growth mechanics could be measured and iterated rather than assumed.`,
    myRole: ['Product and engineering', 'Growth loop design', 'Retention experiments'],
    learned: `Referral loops only compound when the reward is worth less than the effort of gaming them. Most of the tuning was on that boundary.`,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Solana'],
    tags: ['Gamification', 'Growth', 'Consumer'],
    metrics: [
      {
        label: 'Users',
        value: '500+',
        verified: false,
        note: 'Awaiting confirmation.',
      },
      {
        label: 'Engagement improvement',
        value: '40%',
        verified: false,
        note: 'Awaiting confirmation of baseline and measurement window.',
      },
    ],
    image: '/projects/riddlepay/cover.png',
    hasRealImage: true,
    links: { live: 'https://www.riddlepay.tech' },
  },

  {
    slug: 'artyug-verifier',
    tier: 'selected',
    title: 'Artyug Verifier',
    subtitle: 'NFC & QR Ownership Verification',
    status: 'LIVE',
    year: '2025',
    oneLiner:
      'The verification companion to Artyug — scan NFC or QR on a physical piece and confirm which wallet holds it on Solana.',
    whatIBuilt: `A standalone scanner so galleries and buyers can verify provenance without needing an Artyug account.`,
    myRole: ['Product and engineering', 'NFC and QR resolution', 'Solana ownership lookup'],
    tech: ['Solana', 'NFC', 'QR', 'React'],
    tags: ['Solana', 'NFC', 'Verification'],
    metrics: [{ label: 'Verification', value: 'NFC + QR + on-chain' }],
    image: '/projects/artyug-verifier/cover.png',
    hasRealImage: true,
    links: {
      live: 'https://artyuga-verifier.vercel.app',
      repo: 'https://github.com/anshitraj/artyuga-verifier',
    },
  },

  {
    slug: 'private-ledger-flow',
    tier: 'selected',
    title: 'Private Ledger Flow',
    subtitle: 'Encrypted Ledger on Zama FHEVM',
    status: 'ARCHIVED',
    year: '2025',
    oneLiner:
      'A financial ledger built on fully homomorphic encryption — compute over balances without ever decrypting them.',
    whatIBuilt: `An experiment in encrypted computation for financial state: balances and flows stay encrypted while remaining computable.`,
    myRole: ['Product and engineering', 'FHE integration'],
    learned: `FHE is real but the performance envelope decides the use case. Ledger state is a good fit; anything latency-sensitive is not.`,
    tech: ['Zama FHEVM', 'Solidity', 'React', 'TypeScript'],
    tags: ['FHE', 'Privacy', 'Cryptography'],
    metrics: [{ label: 'Focus', value: 'Encrypted computation' }],
    image: '/projects/private-ledger-flow/cover.png',
    hasRealImage: true,
    links: { live: 'https://private-ledger-steel.vercel.app' },
  },

  {
    slug: 'dca-vault',
    tier: 'selected',
    title: 'DCA Vault',
    subtitle: 'Automated On-Chain Strategy',
    status: 'ARCHIVED',
    year: '2024',
    oneLiner:
      'Intent-level recurring allocation — set a strategy once and let the vault execute it on schedule under fixed constraints.',
    whatIBuilt: `A vault that turns a stated allocation strategy into scheduled on-chain execution with explicit limits.`,
    myRole: ['Product and engineering', 'Strategy execution logic'],
    tech: ['Solidity', 'React', 'Ethereum', 'Stablecoins'],
    tags: ['DeFi', 'Automation', 'Stablecoins'],
    metrics: [{ label: 'Strategy', value: 'Recurring DCA' }],
    image: '',
    hasRealImage: false,
    links: {},
  },

  {
    slug: 'kreatorboard',
    tier: 'selected',
    title: 'Kreatorboard',
    subtitle: 'Creator Analytics Dashboard',
    status: 'ARCHIVED',
    year: '2024',
    oneLiner:
      'Campaign and collaboration tracking for creator networks — built because I was running a 1,500-person KOL network out of spreadsheets.',
    whatIBuilt: `A dashboard for tracking campaigns, creator relationships and performance across an ecosystem network.`,
    myRole: ['Product and engineering', 'Analytics model'],
    tech: ['React', 'Node.js', 'PostgreSQL'],
    tags: ['Analytics', 'Creators', 'Dashboards'],
    metrics: [{ label: 'Built for', value: '1,500+ creator network' }],
    image: '',
    hasRealImage: false,
    links: {
      repo: 'https://github.com/anshitraj/Kreatorboard-draft',
      extra: [{ label: 'Demo build', href: 'https://github.com/anshitraj/Kreatorboard-Demo' }],
    },
  },

  {
    slug: 'solmint',
    tier: 'selected',
    title: 'SolMint',
    subtitle: 'Solana Token Launchpad',
    status: 'OPEN SOURCE',
    year: '2025',
    oneLiner:
      'A launchpad that mints an SPL token with full metadata from the browser — no CLI, no separate metadata upload.',
    problem: `Minting an SPL token with proper metadata meant stitching together CLI commands, a metadata upload and a separate Metaplex call. Every guide skipped a step, and the failure mode was a live token with no name and no image.`,
    whatIBuilt: `A browser launchpad that takes the whole path — mint, metadata, upload, authority handling — and makes it one form.`,
    myRole: ['Product and engineering', 'Metaplex metadata integration', 'Wallet flow'],
    learned: `The metadata step is where everyone gives up, so that is the step worth owning. Most of what this repo got came from being the version that actually finishes the job.`,
    tech: ['React', 'Solana', 'Web3.js', 'Metaplex', 'JavaScript'],
    tags: ['Solana', 'Developer Tools', 'Open Source'],
    metrics: [{ label: 'GitHub stars', value: '8' }],
    image: '',
    hasRealImage: false,
    links: {
      repo: 'https://github.com/anshitraj/Solana-Token-Launchpad-With-MetaData',
      extra: [
        { label: 'Minimal version', href: 'https://github.com/anshitraj/Solana-Token-Launchpad' },
      ],
    },
  },

  {
    slug: 'arcguild',
    tier: 'selected',
    title: 'ArcGuild',
    subtitle: 'Guild & Campaign Engine for Arc',
    status: 'BUILDING',
    year: '2026',
    oneLiner:
      'A guild and marketing-programme generator for teams building on Arc — campaigns, quests and contributor tracking in one place.',
    whatIBuilt: `The campaign layer under ecosystem growth work: generate a programme, track contributors, and measure what the campaign actually moved.`,
    myRole: ['Product and engineering', 'Campaign mechanics'],
    tech: ['TypeScript', 'React', 'Arc'],
    tags: ['Growth', 'Arc', 'Community'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: { repo: 'https://github.com/anshitraj/arcguild' },
  },

  // ────────────────────── EXPERIMENTS ──
  {
    slug: 'fhe-donation-pot',
    tier: 'experiment',
    title: 'FHE Donation Pot',
    subtitle: 'Privacy-preserving donations',
    status: 'LIVE',
    year: '2025',
    oneLiner:
      'A donation pot where individual amounts stay encrypted on Zama FHEVM while the total stays verifiable.',
    tech: ['Zama FHEVM', 'TFHE', 'Next.js', 'Hardhat', 'Solidity'],
    tags: ['FHE', 'Privacy'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: {
      live: 'https://fhe-doantion-pot.vercel.app',
      repo: 'https://github.com/anshitraj/fhe-doantion-pot',
    },
  },

  {
    slug: 'base-developer-gpt',
    tier: 'experiment',
    title: 'Base Developer GPT',
    subtitle: 'LLM reference for Base & Farcaster mini-apps',
    status: 'OPEN SOURCE',
    year: '2025',
    oneLiner:
      'A curated reference for building Base and Farcaster mini-apps, published as a custom GPT after explaining the same setup one time too many.',
    tech: ['LLMs', 'Base', 'Farcaster'],
    tags: ['Developer Tools', 'AI'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: {
      repo: 'https://github.com/anshitraj/Base-GPT-llms',
      extra: [
        {
          label: 'Custom GPT',
          href: 'https://chatgpt.com/g/g-692490df4ccc81918ac08b91d1da95af-base-developer-gpt',
        },
      ],
    },
  },

  {
    slug: 'solana-devnet-faucet',
    tier: 'experiment',
    title: 'Solana Devnet Faucet',
    subtitle: 'Devnet SOL without the hunt',
    status: 'OPEN SOURCE',
    year: '2025',
    oneLiner: 'A small faucet for requesting devnet SOL, built because the public ones kept failing.',
    tech: ['TypeScript', 'Solana', 'React'],
    tags: ['Solana', 'Developer Tools'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: { repo: 'https://github.com/anshitraj/Solana-Devnet-Faucet' },
  },

  {
    slug: 'ai-accountant',
    tier: 'experiment',
    title: 'AI Accountant',
    subtitle: 'Bookkeeping assistant',
    status: 'ARCHIVED',
    year: '2026',
    oneLiner: 'An assistant that reads transactions and does the categorising nobody wants to do.',
    tech: ['TypeScript', 'LLMs'],
    tags: ['AI', 'Fintech'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: { repo: 'https://github.com/anshitraj/ai-accountant' },
  },

  {
    slug: 'arcgpt',
    tier: 'experiment',
    title: 'ArcGPT',
    subtitle: 'Assistant for Arc workflows',
    status: 'ARCHIVED',
    year: '2025',
    oneLiner: 'An agent-style assistant that surfaces Arc workflows and payment context conversationally.',
    tech: ['LLMs', 'React', 'Node.js'],
    tags: ['Agentic AI', 'Developer Tools'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: {},
  },

  {
    slug: 'email-multi-sender',
    tier: 'experiment',
    title: 'Email Multi Sender',
    subtitle: 'Outreach automation utility',
    status: 'ARCHIVED',
    year: '2024',
    oneLiner: 'A bulk outreach tool built for founder intros and campaign follow-ups without fighting a CRM.',
    tech: ['Node.js', 'React'],
    tags: ['Automation', 'Operator Tooling'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: {},
  },

  {
    slug: 'gh-timeline',
    tier: 'experiment',
    title: 'GH Timeline',
    subtitle: 'GitHub activity helper',
    status: 'ARCHIVED',
    year: '2024',
    oneLiner: 'An opinionated view of GitHub activity across repos, minus the default notification noise.',
    tech: ['TypeScript', 'GitHub API'],
    tags: ['Developer Tools', 'GitHub'],
    metrics: [],
    image: '',
    hasRealImage: false,
    links: {},
  },
];

export const featuredProjects = projects.filter((p) => p.tier === 'featured');
export const selectedProjects = projects.filter((p) => p.tier === 'selected');
export const experimentProjects = projects.filter((p) => p.tier === 'experiment');

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Shown in the "Currently Building" strip directly under the hero. */
export const CURRENTLY_BUILDING = ['webcoin-labs', 'arc-pass'] as const;

/**
 * Narrow a project down to the fields the media components render.
 *
 * They are client components, so anything handed to them lands in the page's
 * RSC payload. Passing the full project put unverified metric values and their
 * internal notes into the HTML source; this keeps them server-side.
 */
export function toMedia(p: Project) {
  return {
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    hasRealImage: p.hasRealImage,
    video: p.video,
  };
}
