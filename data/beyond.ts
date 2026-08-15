/**
 * "Beyond the Terminal" — deliberately not called co-curricular activities.
 * Official mode keeps this sophisticated; Valorant stays in Playground only.
 */
export const beyond = [
  {
    title: 'Badminton',
    // Deliberately makes no claim about level — the competitive record is
    // phrased from the certificate, and that copy lives in achievements.ts.
    detail: 'Competed through school and university. Still the fastest way I know to clear my head.',
    note: 'Achievement wording pending certificate — see achievements.ts `badminton-state`.',
  },
  {
    title: 'Basketball',
    detail: 'Played through school and university.',
  },
  {
    title: 'Hackathons',
    detail: 'Circle × Google DeepMind Agentic Commerce, Solana Bangalore, and others — most of what I ship starts in a 48-hour window.',
  },
  {
    title: 'Startup communities',
    detail: 'Three years inside founder communities, mostly on the side of making introductions rather than asking for them.',
  },
  {
    title: 'Open source',
    detail: 'OmniClaw and the Ledger Agent Firewall are public. Infrastructure that nobody can read is not infrastructure.',
  },
  {
    title: 'Ecosystem building',
    detail: 'Grew communities for ALTAVA, Monsterra and Corite — the unglamorous work of getting the first thousand people to care.',
  },
] as const;
