export type SignalKind =
  | 'ECOSYSTEM'
  | 'RECOGNITION'
  | 'RESEARCH'
  | 'FELLOWSHIP'
  | 'INVITATION'
  | 'EVENT';

export type CredibilitySignal = {
  id: string;
  kind: SignalKind;
  title: string;
  organization: string;
  year: string;
  detail: string;
  logo?: string;
  href?: { label: string; url: string };
  verified?: boolean;
  note?: string;
};

/**
 * Credibility that matters but is not an "achievement".
 *
 * Add confirmed fellowships, invitations, research leadership and attended
 * events here. Keep future plans out until the invitation or attendance is
 * real; unverified records stay in the file but never render.
 */
export const credibilitySignals: CredibilitySignal[] = [
  {
    id: 'circle-alliance',
    kind: 'ECOSYSTEM',
    title: 'Listed in the Circle Alliance Directory',
    organization: 'ArcPay × Circle',
    year: '2025',
    detail:
      'ArcPay is listed in Circle’s vetted ecosystem under Bridge SDKs, Fintechs and Payments.',
    logo: '/logos/ArcPay.jpg',
    href: { label: 'View ArcPay', url: 'https://www.arcpay.systems' },
  },
  {
    id: 'ledger-recognition',
    kind: 'RECOGNITION',
    title: 'Work noticed by Ledger leadership',
    organization: 'Ledger Agent Firewall',
    year: '2026',
    detail:
      'The deterministic signing gate for AI agents reached 12K+ project views and received public engagement from Ledger leadership.',
    logo: '/logos/ledger.jpg',
    href: { label: 'View project', url: '/projects/ledger-agent-firewall' },
  },
  {
    id: 'circle-bridge-kit-feedback',
    kind: 'RECOGNITION',
    title: 'Product feedback shipped in Circle Bridge Kit 1.3.0',
    organization: 'Circle · Bridge Kit',
    year: '2026',
    detail:
      'The Circle team acknowledged feedback on error handling and shipped supporting helpers and constants in the 1.3.0 update.',
    href: { label: 'See the proof trail', url: '/gallery' },
  },
  {
    id: 'ai-payments-research',
    kind: 'RESEARCH',
    title: 'Published a working thesis on agent payment controls',
    organization: 'Independent research note',
    year: '2025',
    detail:
      'A technical argument for keeping spending limits, recipient validation and authorization outside the model.',
    href: { label: 'Read the note', url: '/blog/policy-controls-ai-payments' },
  },
];

export const visibleSignals = credibilitySignals.filter((signal) => signal.verified !== false);
