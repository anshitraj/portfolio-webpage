import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { MiniTerminalAchievementCard } from './MiniTerminalAchievementCard';

type AchievementModule = {
  title: string;
  module: string;
  lines: Array<{ label: string; value: string }>;
};

const achievementModules: AchievementModule[] = [
  {
    title: 'Agentic Commerce Hackathon',
    module: 'agentic_commerce_hackathon',
    lines: [
      { label: 'result', value: '1st place - Gemini category' },
      { label: 'event', value: 'Circle x Google DeepMind Agentic Commerce on Arc (SF)' },
      { label: 'scale', value: '1,201 participants, 221 teams' },
      { label: 'product', value: 'OmniAgentPay - payment infra for AI agents' },
      { label: 'role', value: 'led frontend architecture + UI implementation' },
    ],
  },
  {
    title: 'Webcoin Labs',
    module: 'webcoin_labs',
    lines: [
      { label: 'impact', value: '1K -> 21K+ reach' },
      { label: 'focus', value: 'ecosystem growth' },
      { label: 'note', value: 'campaigns across startups' },
    ],
  },
  {
    title: 'Startups / Fundraising',
    module: 'startups_fundraising',
    lines: [
      { label: 'startups_connected', value: '100+' },
      { label: 'capital_supported', value: '$50K+' },
      { label: 'focus', value: 'partner intros + dealflow' },
    ],
  },
  {
    title: 'Influencer Network',
    module: 'influencer_network',
    lines: [
      { label: 'network_size', value: '1,500+ KOLs' },
      { label: 'role', value: 'campaigns + announcements' },
    ],
  },
  {
    title: 'Mini Cast Store',
    module: 'mini_cast_store',
    lines: [
      { label: 'launch_result', value: '1,500+ users in week one' },
      { label: 'developers', value: '25+' },
      { label: 'type', value: 'mini-app marketplace' },
    ],
  },
  {
    title: 'Product Surface Area',
    module: 'product_surface_area',
    lines: [
      { label: 'shipped', value: '10+ production-grade systems' },
      { label: 'domains', value: 'payments / AI / dashboards / analytics' },
      { label: 'products', value: 'ARCPay, OmniAgentPay, DCA Vault, Mini Cast Store, +' },
    ],
  },
  {
    title: 'Agentic AI / LLM Focus',
    module: 'agentic_ai_llm',
    lines: [
      { label: 'focus', value: 'agentic AI + LLM systems' },
      { label: 'win', value: '1st place Gemini (1,201 participants, 221 teams)' },
      { label: 'areas', value: 'payment automation / intelligent tooling / agent infra' },
    ],
  },
  {
    title: 'Stablecoin Infra',
    module: 'stablecoin_infra',
    lines: [
      { label: 'focus', value: 'payment rails / merchant systems' },
      { label: 'products', value: 'ARCPay / OmniAgentPay (1st place hackathon)' },
      { label: 'stack', value: 'Circle USDC, CCTP v2, x402 protocol' },
    ],
  },
];

export function TerminalAchievements() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="w-full space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="space-y-1.5 border-b border-white/8 pb-3 sm:space-y-2 sm:pb-4"
      >
        <h2 className="font-mono text-lg font-bold tracking-[0.14em] text-white sm:text-2xl sm:tracking-[0.18em] md:text-3xl">
          RECENT ACHIEVEMENTS
        </h2>
        <p className="max-w-3xl font-mono text-[10px] leading-relaxed text-[#96c9b2] sm:text-xs md:text-sm">
          Verified proof of work across products, ecosystems, users, and capital.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {achievementModules.map((module, index) => (
          <MiniTerminalAchievementCard
            key={module.module}
            title={module.title}
            module={module.module}
            lines={module.lines}
            index={index}
            isInView={isInView}
            reducedMotion={Boolean(reducedMotion)}
          />
        ))}
      </div>
    </section>
  );
}
