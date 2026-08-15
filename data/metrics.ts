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
  { label: 'Raised at Webcoin Labs', value: '$100K' },
  { label: 'MRR across my products', value: '$1K' },
  { label: 'Startups I’ve connected', value: '275+' },
];

/** The full "Numbers are better than adjectives" grid. */
export const IMPACT_METRICS: Metric[] = [
  { label: 'Products shipped end to end', value: '10+' },
  { label: 'Raised at Webcoin Labs', value: '$100K' },
  { label: 'MRR across my products', value: '$1K' },
  { label: 'Startups I’ve connected and supported', value: '275+' },
  { label: 'Investors I’ve built relationships with', value: '50+' },
  { label: 'Creators I run campaigns with', value: '1,500+' },
  { label: 'Community I grew from zero', value: '200K' },
  { label: 'Daily actives at peak', value: '3,000+' },
  { label: 'Users in Mini Cast’s first week', value: '1,500+' },
  { label: 'Developers I onboarded', value: '25+' },
  { label: 'Agent payments I test-ran', value: '100+' },
  { label: 'Views on the Ledger firewall', value: '12K+' },
  { label: 'Early cashflow from Artyug', value: '₹80,000+' },
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
