export const education = [
  {
    institution: 'Lovely Professional University',
    degree: 'B.Tech, Computer Science & Engineering',
    period: '2022 — 2026',
    detail: 'CGPA 7.5',
  },
] as const;

/**
 * Playground reframes education as system credentials rather than a transcript.
 * Same facts, different metaphor.
 */
export const BUILDER_LICENSE = {
  holder: 'ANSHIT RAJ YADAV',
  class: 'B.TECH / COMPUTER SCIENCE & ENGINEERING',
  issuer: 'LOVELY PROFESSIONAL UNIVERSITY',
  validity: '2022 — 2026',
  rating: 'CGPA 7.5',
  endorsements: ['PAYMENTS', 'AI AGENTS', 'BLOCKCHAIN', 'FULL-STACK'],
} as const;
