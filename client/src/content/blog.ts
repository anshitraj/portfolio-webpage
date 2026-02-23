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
    slug: 'future-of-autonomous-agents',
    title: 'The Future of Autonomous Agents in FinTech',
    excerpt: 'How AI agents transacting on behalf of humans will reshape our financial systems.',
    date: '2024-05-12',
    readTime: '5 min read',
    content: `
# The Future of Autonomous Agents in FinTech

We are standing at the precipice of a massive shift in how value moves across the internet. For the last twenty years, humans have been the primary initiators of digital transactions. In the next five, **AI agents will take over**.

## The Shift

Imagine an AI assistant that doesn't just find the cheapest flight, but actively negotiates with the airline's API, holds funds in escrow, and executes the transaction when conditions are met. This requires:

1. **Programmable Money**: Traditional banking APIs are too slow and restrictive.
2. **Verifiable Identity**: How do we know which agent represents which human?
3. **Smart Contracts**: Trustless execution environments.

### Code Example: Agent Authorization

\`\`\`typescript
const agent = new AutonomousAgent({
  ownerId: "0x...",
  spendingLimit: ethers.utils.parseEther("1.0"),
  protocols: [Uniswap, Aave]
});

await agent.executeStrategy(YieldFarmingStrategy);
\`\`\`

The infrastructure we build today will define the economic realities of tomorrow.
    `
  },
  {
    slug: 'building-zero-knowledge-ledgers',
    title: 'Building Zero-Knowledge Ledgers',
    excerpt: 'A practical guide to implementing ZK-proofs for enterprise accounting.',
    date: '2024-04-28',
    readTime: '8 min read',
    content: `
# Building Zero-Knowledge Ledgers

Privacy and auditability have historically been at odds. You either have a public ledger where everyone sees everything, or a private database that requires absolute trust in the operator. **Zero-Knowledge Proofs (ZKPs)** break this dichotomy.

## Why Enterprises Care

Enterprises need to prove compliance (e.g., reserve ratios, tax liabilities) without exposing their suppliers, clients, or exact margins. 

By utilizing ZK-Rollups, we can submit cryptographic proofs to a public chain stating: *"I have computed these private transactions correctly according to the rules, and the final state is X."*

This changes everything.
    `
  },
  {
    slug: 'designing-for-the-terminal',
    title: 'Designing for the Terminal',
    excerpt: 'Why command-line interfaces are making a comeback in web design.',
    date: '2024-04-10',
    readTime: '4 min read',
    content: `
# Designing for the Terminal

There's a reason developers love the CLI. It's fast, unambiguous, and extremely powerful. As web applications become more complex, clicking through deeply nested menus becomes a chore.

## The Web CLI

Integrating command palettes (like cmd+K interfaces) is step one. Step two is providing a full terminal-like experience for power users. 

* Speed over discoverability
* Keyboard over mouse
* Text over icons

Expect to see more "Pro" modes featuring terminal emulators directly in the browser.
    `
  },
  {
    slug: 'optimizing-react-three-fiber',
    title: 'Optimizing React Three Fiber Experiences',
    excerpt: 'Techniques for maintaining 60fps in browser-based 3D applications.',
    date: '2024-03-22',
    readTime: '6 min read',
    content: `
# Optimizing React Three Fiber Experiences

Building 3D on the web is easier than ever thanks to \`@react-three/fiber\`, but performance can quickly degrade if you aren't careful.

## Top 3 Optimization Techniques

1. **InstancedMesh**: If you're rendering hundreds of identical objects (like stars in a constellation), never map over \`<mesh>\`. Use \`<InstancedMesh>\`.
2. **Compress Textures**: Use \`KTX2\` or \`WebP\` formats. A 5MB PNG can cripple a mobile device.
3. **Lazy Loading**: Don't load the 3D canvas until it's needed. Wrap it in a React \`<Suspense>\` boundary and load it asynchronously.

Keep your draw calls low and your users happy!
    `
  }
];
