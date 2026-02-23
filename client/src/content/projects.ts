export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  position: [number, number, number]; // 3D coordinates
}

export const projects: Project[] = [
  {
    slug: 'omniagentpay',
    title: 'OmniAgentPay',
    description: 'Decentralized autonomous payment agent network.',
    longDescription: 'A revolutionary platform allowing AI agents to transact autonomously using smart contracts, completely bypassing traditional financial rails while maintaining full auditability.',
    tags: ['Web3', 'AI', 'Solidity', 'React'],
    metrics: [{ label: 'Tx/Sec', value: '1.2k' }, { label: 'Volume', value: '$2M+' }],
    position: [0, 0, 0],
  },
  {
    slug: 'arcpay',
    title: 'ARCPay',
    description: 'Next-gen biometric payment gateway.',
    longDescription: 'Seamlessly integrate facial and palm recognition into retail point-of-sale systems, reducing checkout times by 84% while enhancing security through liveness detection.',
    tags: ['Computer Vision', 'FinTech', 'Python', 'React Native'],
    metrics: [{ label: 'Accuracy', value: '99.9%' }, { label: 'Latency', value: '<200ms' }],
    position: [2.5, 1.5, -2],
  },
  {
    slug: 'private-ledger-flow',
    title: 'Private Ledger Flow',
    description: 'Zero-knowledge enterprise accounting.',
    longDescription: 'Allows enterprise clients to prove financial reserves and compliance to auditors without revealing underlying transaction data or counterparty identities.',
    tags: ['ZK-Rollups', 'Cryptography', 'Rust', 'Next.js'],
    metrics: [{ label: 'Enterprises', value: '15+' }, { label: 'Proofs', value: '100k+' }],
    position: [-2, -1.5, -1],
  },
  {
    slug: 'mini-cast-store',
    title: 'Mini Cast Store',
    description: 'Micro-credential marketplace for creators.',
    longDescription: 'A platform for digital creators to mint, sell, and trade verifiable micro-credentials and exclusive content access passes directly to their audience.',
    tags: ['Creator Economy', 'Node.js', 'PostgreSQL', 'Stripe'],
    metrics: [{ label: 'Creators', value: '500+' }, { label: 'Sales', value: '50k+' }],
    position: [1.5, -2, 1.5],
  },
  {
    slug: 'titan-dex',
    title: 'Titan Dex',
    description: 'High-frequency decentralized exchange.',
    longDescription: 'Leveraging an off-chain matching engine with on-chain settlement to provide CEX-like performance with DEX-level self-custody.',
    tags: ['DeFi', 'Go', 'TypeScript', 'WebSockets'],
    metrics: [{ label: 'Liquidity', value: '$15M' }, { label: 'Pairs', value: '42' }],
    position: [-1.5, 2, 1],
  }
];
