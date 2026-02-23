export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'designing-on-chain-payment-flows',
    title: 'Designing non-custodial payment flows on-chain',
    excerpt: 'Key considerations for building robust and secure on-chain payment infrastructure.',
    date: '2024-05-15',
    readTime: '6 min read',
    content: `
# Designing non-custodial payment flows on-chain

Building payment systems in Web3 requires a different mindset than traditional FinTech. In a non-custodial world, the user remains in control of their funds, which introduces unique challenges and opportunities.

## Key Principles

1. **Idempotency**: Ensuring that the same transaction isn't processed twice.
2. **On-chain Verification**: Using smart contracts to verify payment status rather than relying on centralized APIs.
3. **User Experience**: Making the complex world of gas fees and signatures invisible to the end user.

The work on ARCPay and OmniAgentPay has been focused on these exact problems—creating Stripe-like experiences for the decentralized web.
    `
  },
  {
    slug: 'fhe-on-chain-apps',
    title: 'What FHE changes for on-chain apps (beginner friendly)',
    excerpt: 'Exploring how Fully Homomorphic Encryption enables true privacy on public ledgers.',
    date: '2024-04-20',
    readTime: '8 min read',
    content: `
# What FHE changes for on-chain apps

Fully Homomorphic Encryption (FHE) is the holy grail of cryptography. It allows us to perform computations on encrypted data without ever decrypting it.

## Why it matters for Web3

Public blockchains are, by default, public. This is a deal-breaker for many enterprise applications. FHEVMs (like Zama) allow us to build:

- **Private Ledgers**: Balance and transaction amounts are hidden.
- **Blind Auctions**: Bids are secret even from the contract owner.
- **Confidential Voting**: Your vote is private but the tally is verifiable.

My work on the Private Ledger Flow demonstrates these primitives in action on the Zama FHEVM.
    `
  },
  {
    slug: 'marketplace-workflows',
    title: 'Building marketplace workflows (submission → review → listing)',
    excerpt: 'Architecting scalable submission and review pipelines for digital marketplaces.',
    date: '2024-03-10',
    readTime: '5 min read',
    content: `
# Building marketplace workflows

A marketplace is only as good as its supply. Efficiently onboarding developers and reviewing their contributions is critical for growth.

## The Mini Cast Store Pipeline

For the Mini Cast Store, we built a three-stage pipeline:

1. **Submission**: Developers provide metadata and app links.
2. **Review**: Automated and manual checks for security and quality.
3. **Listing**: On-chain registration and front-end surfacing.

This process allowed us to list 25+ developers and handle 1,500+ signups in the first week.
    `
  },
  {
    slug: 'policy-controls-ai-payments',
    title: 'Policy controls for AI agent payments',
    excerpt: 'How to manage risk when allowing AI agents to handle real-world transactions.',
    date: '2024-02-05',
    readTime: '7 min read',
    content: `
# Policy controls for AI agent payments

If an AI agent is going to transact on your behalf, you need guardrails.

## Control Layers

- **Spend Limits**: Maximum amount per transaction or per day.
- **Recipient Validation**: Restricting agents to approved contract addresses.
- **Rate Limiting**: Preventing high-frequency transaction loops.

OmniAgentPay implements these controls at the execution layer, ensuring that AI-driven commerce is both autonomous and secure.
    `
  }
];
