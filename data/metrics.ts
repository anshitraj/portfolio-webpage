import type { Metric } from './types';

/**
 * Wording rule: these are *Anshit's* numbers, so every label is written from
 * his side of the work — what he shipped, who he worked with, what he grew.
 * Avoid fund/portfolio phrasing ("collaborations", "relationships", "network
 * size"); it reads like a VC firm's website rather than a builder's resume.
 */

/** Hero proof strip — four numbers, nothing more. */
export const HERO_METRICS: Metric[] = [
  { label: 'Products shipped', value: '10+' },
  { label: 'Generated for clients through Webcoin Labs', value: '$100K' },
  { label: 'MRR across my products', value: '$1K' },
  { label: 'Startups I’ve connected', value: '275+' },
];

/** The full "Numbers are better than adjectives" grid. */
export const IMPACT_METRICS: Metric[] = [
  { id: 'shipped', group: 'engineering', shortLabel: 'Products shipped', context: 'End to end', label: 'Products shipped end to end', value: '10+' },
  { id: 'clients', group: 'commercial', shortLabel: 'Generated for clients', context: 'Webcoin Labs', label: 'Generated for clients through Webcoin Labs', value: '$100K' },
  { id: 'mrr', group: 'commercial', shortLabel: 'Product MRR', context: 'Recurring revenue', label: 'MRR across my products', value: '$1K' },
  { id: 'startups', group: 'growth', shortLabel: 'Startups supported', context: 'Connections & launch', label: 'Startups I’ve connected and supported', value: '275+' },
  { id: 'investors', group: 'growth', shortLabel: 'Investor relationships', context: 'Founder network', label: 'Investors I’ve built relationships with', value: '50+' },
  { id: 'creators', group: 'growth', shortLabel: 'Creator network', context: 'Campaign partners', label: 'Creators I run campaigns with', value: '1,500+' },
  { id: 'community', group: 'growth', shortLabel: 'Community grown', context: 'Built from zero', label: 'Community I grew from zero', value: '200K' },
  { id: 'active', group: 'growth', shortLabel: 'Daily active users', context: 'At peak', label: 'Daily actives at peak', value: '3,000+' },
  { id: 'minicast', group: 'growth', shortLabel: 'Week-one users', context: 'Mini Cast', label: 'Users in Mini Cast’s first week', value: '1,500+' },
  { id: 'developers', group: 'engineering', shortLabel: 'Developers onboarded', context: 'Developer adoption', label: 'Developers I onboarded', value: '25+' },
  { id: 'payments', group: 'engineering', shortLabel: 'Agent payments', context: 'Test transactions', label: 'Agent payments I test-ran', value: '100+' },
  { id: 'ledger', group: 'engineering', shortLabel: 'Project views', context: 'Ledger firewall', label: 'Views on the Ledger firewall', value: '12K+' },
  { id: 'artyug', group: 'commercial', shortLabel: 'Revenue generated', context: 'Artyug · INR', label: 'Revenue generated through Artyug', value: '₹80,000' },
  { id: 'zama', group: 'commercial', shortLabel: 'Bounty earned', context: 'Zama FHEVM', label: 'Zama FHEVM bounty earned', value: '$1,500' },
  { id: 'cloud', group: 'commercial', shortLabel: 'Cloud credits won', context: 'OmniClaw · Google Cloud', label: 'Google Cloud credits won with OmniClaw', value: '$20,000' },
  {
    label: 'People using what I’ve built',
    value: '2,500+',
    verified: false,
    note: 'Aggregate across products — needs a stated basis before it ships.',
  },
  {
    label: 'Ecosystem reach',
    value: '300K+',
    verified: false,
    note: 'Needs a stated basis.',
  },
  {
    label: 'Followers on X',
    value: '98K+',
    verified: false,
    note: 'Publicly checkable and the old site claimed 21.4K. Confirm the live number before shipping.',
  },
];

export const IMPACT_GROUPS = [
  { id: 'commercial', title: 'Revenue & recognition', note: 'Revenue · bounty · non-cash credits' },
  { id: 'growth', title: 'Growth & relationships', note: 'GTM, community and product adoption' },
  { id: 'engineering', title: 'Build & ship', note: 'Products, developers and test payments' },
] as const;

/** Named outcomes — qualitative proof that sits beside the numbers. */
export const ECOSYSTEM_WORK = [
  {
    org: 'ALTAVA',
    outcome: 'Grew the community from 0 to 5K',
    logo: '/logos/altava.jpg',
    monogram: 'A',
  },
  { org: 'Monsterra', outcome: 'Took the community from 30K to 60K', monogram: 'M' },
  { org: 'Corite', outcome: 'Ran one event that added 5,000+ followers', monogram: 'C' },
  {
    org: 'DAO Maker',
    outcome: 'Sourced 100+ influencer contacts',
    logo: '/logos/daomaker.jpg',
  },
  {
    org: 'Binance',
    outcome: 'Ran collaboration work with their team',
    logo: '/logos/binance.jpg',
  },
  {
    org: 'MEXC · Gate.io',
    outcome: 'Ran collaboration work with their teams',
    monogram: 'M+',
  },
  {
    org: 'Huma Finance',
    outcome: 'Supported their fundraising process',
    logo: '/logos/huma.png',
  },
  {
    org: 'Solv Protocol',
    outcome: 'Supported their fundraising process',
    monogram: 'SP',
  },
] as const;
