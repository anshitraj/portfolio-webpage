import type { Achievement } from './types';

export const achievements: Achievement[] = [
  {
    id: 'ledger-n3xt-build-show',
    title: 'Ledger N3XT Build & Show',
    result: '$100 USDC prize',
    year: '2026',
    category: 'TECH',
    description:
      'Submission accepted to Ledger’s N3XT Build & Show competition; the programme team confirmed a $100 USDC prize.',
    image: '/gallery/ledger-n3xt-acceptance.png',
    projectSlug: 'ledger-agent-firewall',
    galleryIds: ['ledger-n3xt-build-show'],
  },
  {
    id: 'agentic-commerce-hackathon',
    title: 'Agentic AI Commerce Hackathon',
    result: '1st place — Gemini track',
    year: '2025',
    category: 'TECH',
    description:
      'Won the Gemini track at Circle × Google DeepMind Agentic Commerce on Arc in San Francisco, against 221 teams and 1,201 participants. Shipped what became OmniClaw and led the frontend architecture.',
    image: '/gallery/agentic-commerce-sf.jpeg',
    projectSlug: 'omniclaw',
    galleryIds: [],
  },
  {
    id: 'minicast-launch',
    title: 'Mini Cast Store launch',
    result: '1,500+ signups in week one',
    year: '2025',
    category: 'STARTUP',
    description:
      'Launched a mini-app marketplace to 1,500+ signups in the first week with 25+ developers listing apps and 150 daily actives.',
    image: '/projects/mini-cast-store/cover.png',
    projectSlug: 'mini-cast-store',
  },
  {
    id: 'solana-bangalore',
    title: 'Solana Hackathon, Bangalore',
    result: 'Top 15 of 500+ teams',
    year: '2024',
    category: 'TECH',
    description: 'Placed in the top 15 teams out of a 500+ team field.',
    verified: false,
    note: 'From the brief; awaiting confirmation of the exact event name, year and placement wording.',
  },
  {
    id: 'badminton-state',
    title: 'Badminton — State Level',
    result: '',
    year: '',
    category: 'SPORT',
    description: '',
    verified: false,
    note: 'HOLD: phrasing must match the certificate exactly. Anshit is providing the proof — fill in `result`, `year` and `description` verbatim from it, then set verified: true.',
  },
];

export const visibleAchievements = achievements.filter((a) => a.verified !== false);
