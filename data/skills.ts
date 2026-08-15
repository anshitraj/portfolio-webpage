import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Flutter', 'Tailwind CSS', 'TypeScript'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Go', 'REST APIs', 'PostgreSQL', 'Supabase'],
  },
  {
    name: 'AI',
    items: ['AI Agents', 'RAG', 'MCP', 'LangChain', 'Gemini', 'Claude', 'LLM integrations'],
  },
  {
    name: 'Payments',
    items: [
      'x402',
      'CCTP',
      'Circle Wallets',
      'Arc',
      'Tempo',
      'Stablecoins',
      'Payment routing',
      'Webhooks',
      'Idempotent APIs',
    ],
  },
  {
    name: 'Blockchain',
    items: ['Solana', 'Ethereum', 'Base', 'Solidity', 'Foundry', 'Alchemy', 'Helius'],
  },
  {
    name: 'Infrastructure',
    items: ['Docker', 'Cloudflare', 'GCP', 'Railway', 'Vercel', 'GitHub', 'CI/CD'],
  },
];

/** "Currently sharpening" — deliberately no proficiency bars. */
export const SHARPENING = [
  'Go',
  'Distributed Systems',
  'System Design',
  'Payment Infrastructure',
  'Stablecoins',
  'AI Infrastructure',
  'Rust · Beginner',
] as const;
