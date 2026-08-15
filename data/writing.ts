import type { WritingPost } from './types';

/**
 * Hosted posts render at /blog/[slug]. To link out instead of hosting,
 * set `externalUrl` and leave `content` empty.
 */
export const writing: WritingPost[] = [
  {
    slug: 'policy-controls-ai-payments',
    title: 'Policy controls for AI agent payments',
    excerpt:
      'If an agent is going to move money on your behalf, the guardrails cannot live inside the model.',
    date: '2025-11-04',
    readTime: '7 min read',
    content: `Letting an AI agent transact is not a prompting problem. It is an authorisation problem, and the difference matters because one of those is enforceable and the other is a suggestion.

## Why prompting is not a guardrail

If your spending limit exists as a sentence in a system prompt, it is not a limit. It is a preference the model will usually respect and occasionally will not — under adversarial input, under an unusual tool response, under a long enough context. A control you cannot prove holds is not a control.

Every constraint that matters has to be evaluated outside the model, in code the agent cannot address.

## The control layers

- **Spend limits** — maximum per transaction, per day, per counterparty. Checked at execution, not requested at inference.
- **Recipient validation** — an allowlist, resolved before routing. An agent that hallucinates an address hits a rejection, not a transfer.
- **Rate limits** — the defence against loops. An agent stuck retrying is the most expensive failure mode in agent commerce, and it looks like normal traffic until the balance is gone.
- **Agent identity** — which agent, acting for whom, under what mandate, expiring when.

## What this looks like in practice

OmniClaw implements these at the execution layer. The agent produces an intent; the infrastructure decides whether that intent is permitted, and the wallet is never handed to the model at all.

The useful reframe is that you are not securing an AI. You are designing an authorisation system that happens to have a non-deterministic client.`,
  },
  {
    slug: 'idempotency-is-the-whole-job',
    title: 'Idempotency is most of what a payments API is',
    excerpt:
      'The happy path in a payment system takes a fraction of the time. Everything else is retries, duplicates and reconciliation.',
    date: '2025-08-19',
    readTime: '6 min read',
    content: `Building ArcPay taught me that the interesting part of a payments API is not accepting a payment. It is deciding what to do the second time you see the same one.

## Three identical requests, three different meanings

A network retry, a double-clicked submit button, and a customer genuinely buying the same thing twice arrive at your API looking nearly identical. Guess wrong in one direction and you charge someone twice. Guess wrong in the other and you silently drop revenue.

The only way out is for the client to tell you which is which — an idempotency key, generated per logical operation, stored with the result.

## What that forces

Once you commit to idempotency, a lot follows:

1. **Results must be durable.** Returning the cached response to a retry means storing the response, not just the outcome.
2. **Keys need scope and expiry.** Forever is a storage problem; too short reintroduces the duplicate.
3. **Concurrent retries need locking.** Two copies of the same request arriving simultaneously is the normal case under a flaky connection, not the edge case.

## On-chain adds its own version

Chain confirmations are asynchronous and occasionally reorganise. A payment that verified can un-verify. Settlement tracking therefore has to be a state machine with explicit transitions rather than a boolean, or you will eventually issue a receipt for a payment that no longer exists.

None of this is glamorous. It is also why payment infrastructure is a real category and not a weekend project.`,
  },
  {
    slug: 'marketplace-workflows',
    title: 'Building marketplace workflows: submission → review → listing',
    excerpt:
      'A marketplace is only as good as its supply, and supply arrives through a pipeline you have to build before anyone shows up.',
    date: '2025-06-12',
    readTime: '5 min read',
    content: `Mini Cast Store went from nothing to 1,500+ signups in its first week, and almost none of that was the marketplace UI. It was the pipeline behind it.

## Three stages

1. **Submission** — developers provide metadata, links and proof the app works. The friction here directly determines your supply, so every field you add costs you listings.
2. **Review** — automated checks for the mechanical failures, manual review for quality. This stage is the product. It is the only thing separating a marketplace from a link dump.
3. **Listing** — publication and surfacing into discovery.

## The cold-start reality

Nobody tells you that the first two weeks of a marketplace are not engineering. Developers will not submit to an empty catalogue and users will not browse one, so the opening move is manual outreach until there is enough supply to be worth looking at.

25+ developers listed in that first push. The pipeline mattered afterwards, when submissions started arriving faster than I could look at them by hand.

## The number that mattered

1,500 signups against 150 daily actives. Acquisition was never the problem. That gap is the entire roadmap.`,
  },
  {
    slug: 'fhe-on-chain-apps',
    title: 'What FHE changes for on-chain apps',
    excerpt:
      'Fully homomorphic encryption lets you compute over data you never decrypt. Here is what that actually unlocks on a public ledger.',
    date: '2025-03-22',
    readTime: '8 min read',
    content: `Public blockchains are public by construction, which rules out most applications where the amounts are the sensitive part. Fully homomorphic encryption changes the constraint: you can compute over encrypted values without decrypting them.

## What becomes possible

- **Private ledgers** — balances and transfer amounts stay hidden while remaining computable.
- **Blind auctions** — bids are secret from other bidders *and* from the contract owner.
- **Confidential voting** — individual votes stay private while the tally stays verifiable.

## The catch is performance

FHE is real, and it is slow. That is not a temporary problem to engineer around — it is the current shape of the technology, and it decides which use cases are viable.

Ledger state is a good fit: writes are infrequent, correctness matters more than latency, and the privacy is the entire point. Anything interactive is not, at least not yet.

Private Ledger Flow was my attempt to find where that line sits by building on Zama's FHEVM rather than reading about it. The line is further along than I expected, and still well short of where most demos imply.`,
  },
];

export function getPost(slug: string): WritingPost | undefined {
  return writing.find((p) => p.slug === slug);
}
