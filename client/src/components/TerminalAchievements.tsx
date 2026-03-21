import { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

type AchievementCard = {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  /** External link (e.g. live product) */
  primary?: { href: string; label: string };
  /** Internal project or page */
  detailHref?: string;
  detailLabel?: string;
};

const achievementCards: AchievementCard[] = [
  {
    id: 'hackathon',
    title: 'Agentic Commerce Hackathon',
    year: '2025',
    description:
      'First place in the Gemini track at Circle × Google DeepMind Agentic Commerce on Arc (San Francisco), among 1,201 participants and 221 teams. Shipped OmniAgentPay and led frontend architecture and UI.',
    image: '/agentichackathon.jpeg',
    tags: ['Hackathon', 'Agentic AI', 'Payments'],
    primary: { href: 'https://ai-agent-dashboard-two.vercel.app', label: 'Live product' },
    detailHref: '/projects/omniagentpay',
  },
  {
    id: 'webcoin',
    title: 'Webcoin Labs ecosystem',
    year: '2022 – 2025',
    description:
      'Scaled community reach from about 1K to 21K+, connected 100+ startups with builders and investors, supported $50K+ in early fundraising, and ran campaigns with a 1,500+ creator and KOL network.',
    image: '/webcoinlabsecosystem.png',
    tags: ['GTM', 'Partnerships', 'Growth'],
    detailHref: '/experience',
    detailLabel: 'Experience',
  },
  {
    id: 'minicast',
    title: 'Mini Cast Store',
    year: '2025',
    description:
      'Mini-app marketplace on Base and Farcaster: 1,500+ users in the first week and 25+ developers listing apps, with onboarding, review flows, and discovery built for shipping fast.',
    image: '/minicaststore.png',
    tags: ['Marketplace', 'Base', 'Farcaster'],
    primary: { href: 'https://minicast.store', label: 'Website' },
    detailHref: '/projects/mini-cast-store',
  },
  {
    id: 'artyug-verifier',
    title: 'Artyug Verifier',
    year: '2025',
    description:
      'Verifies artwork purchased from Artyug and checks via NFC and QR who is the owner on the Solana blockchain.',
    image: '/artyugverifier.png',
    tags: ['Solana', 'NFC', 'QR', 'Verification'],
    detailHref: '/projects/artyuga',
  },
  {
    id: 'surface',
    title: 'Shipped product surface',
    year: '2023 – Present',
    description:
      '10+ production-grade systems across payments, agentic AI, GTM, and dashboards—including ARCPay, OmniAgentPay, DCA Vault, Mini Cast Store, and more—built end to end, not slide decks.',
    image: '/privateledger.png',
    tags: ['Full-stack', 'Shipping', 'Product'],
    detailHref: '/projects',
    detailLabel: 'All projects',
  },
];

export function TerminalAchievements({ variant = 'neon' }: { variant?: 'neon' | 'minimal' }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const minimal = variant === 'minimal';

  return (
    <section ref={sectionRef} className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          {minimal ? (
            <span className="inline-block rounded-full border border-zinc-300/90 dark:border-white/20 bg-white px-3 py-1 text-xs font-semibold text-black">
              Achievements
            </span>
          ) : (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500">// Achievements</p>
          )}
          <h2
            className={
              minimal
                ? 'mt-4 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl'
                : 'mt-2 font-mono text-xl font-bold tracking-[0.12em] text-zinc-950 dark:text-white sm:text-2xl md:text-3xl'
            }
          >
            Recent achievements
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Proof of work across shipped products, ecosystem growth, users, and capital—same card layout as projects, easier
            to scan.
          </p>
        </div>
        <Link
          href="/experience"
          className="inline-flex items-center text-sm font-semibold text-zinc-950 dark:text-white hover:text-zinc-700 dark:text-zinc-300"
        >
          Full story <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievementCards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: reducedMotion ? 0.12 : 0.3,
              delay: reducedMotion ? 0 : index * 0.06,
            }}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-950/40 transition-colors hover:border-zinc-300/90 dark:border-white/20"
          >
            <div className="aspect-[2/1] max-h-[140px] shrink-0 overflow-hidden bg-zinc-200/90 dark:bg-zinc-900 sm:max-h-[160px]">
              <img
                src={card.image}
                alt=""
                className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <div>
                <h3 className="text-base font-bold leading-snug text-zinc-950 dark:text-white">{card.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-500">{card.year}</p>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">{card.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-zinc-300/80 bg-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-800 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {card.primary ? (
                  <a
                    href={card.primary.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-zinc-300/90 dark:border-white/20 px-3 py-1.5 text-[11px] font-semibold text-zinc-950 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-200/80 dark:hover:bg-white/10"
                  >
                    <Globe className="h-3 w-3" />
                    {card.primary.label}
                  </a>
                ) : null}
                {card.detailHref ? (
                  <Link
                    href={card.detailHref}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-zinc-300 dark:hover:bg-zinc-200"
                  >
                    {card.detailLabel ?? 'Details'}
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
