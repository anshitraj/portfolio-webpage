import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users, TrendingUp, DollarSign, Megaphone, Code2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'Webcoin Labs',
      role: 'Founding Team — Ecosystem, Partnerships, Infra & Growth',
      period: '2022 – 2025',
      logoSrc: '/webcoinlabs.jpg',
      description: [
        'Built Webcoin Labs as a founder–builder ecosystem connecting startups with builders, launchpads, VCs, and partners.',
        'Connected 100+ startups with builders, investors, and ecosystem partners for launches and growth.',
        'Managed a 1,500+ influencer / KOL network across X, Telegram, and Discord for campaigns.',
        'Supported fundraising initiatives that contributed to $50K+ raised across early-stage projects.',
        'Ran campaigns and partnership support for 10+ projects, growing social/community reach from ~1K to 21K+.',
      ],
      icon: TrendingUp,
      metrics: [
        { label: 'Startups Connected', value: '100+', icon: Users },
        { label: 'Community Reach', value: '21K+', icon: TrendingUp },
        { label: 'Fundraising Supported', value: '$50K+', icon: DollarSign },
        { label: 'KOL Network', value: '1,500+', icon: Users },
      ],
    },
    {
      company: 'Raydium Protocol',
      role: 'Protocol Contributor',
      period: 'May 2023 – July 2023',
      logoSrc: '/raydium.jpg',
      description: [
        'Contributed to Solana AMM protocol tooling, SDK usage, and liquidity pool integrations (web3.js, Anchor).',
        'Supported documentation and examples used by developers building on Raydium.',
        'Tested and validated pool creation and swap flows across multiple pool types and fee tiers.',
        'Collaborated with core contributors on edge cases and UX for concentrated liquidity features.',
      ],
      icon: Briefcase,
      metrics: [
        { label: 'Developers Supported', value: '50+', icon: Users },
        { label: 'Pool Types Validated', value: '20+', icon: TrendingUp },
      ],
    },
    {
      company: 'ALTAVA GROUP',
      role: 'SDE Intern',
      period: 'Jun 2022 – Sep 2022',
      logoSrc: '/altava.jpg',
      description: [
        'Remote SDE internship focused on blockchain product work and full-stack delivery.',
        'Built and iterated on features with Next.js and modern frontend patterns.',
        'Worked with on-chain integrations and product flows alongside the engineering team.',
        'Participated in code review, testing, and shipping incremental improvements.',
      ],
      icon: Code2,
      metrics: [
        { label: 'Stack', value: 'Next.js, Blockchain', icon: Code2 },
        { label: 'Format', value: 'Remote', icon: Users },
      ],
    },
    {
      company: 'Acid Rainbow',
      role: 'Influencer Marketing Manager',
      period: 'Mar 2022 – Apr 2022',
      logoSrc: '/acid.jpg',
      description: [
        'Coordinated influencer and creator outreach for brand and growth campaigns.',
        'Supported campaign planning, messaging, and reporting for short-cycle launches.',
        'Worked cross-functionally to align creators with product and community goals.',
      ],
      icon: Megaphone,
      metrics: [
        { label: 'Role', value: 'Marketing', icon: Megaphone },
        { label: 'Format', value: 'Remote', icon: Users },
      ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500">// Experience</p>
          <h1 className="text-4xl font-bold text-zinc-950 dark:text-white tracking-tight">Full experience</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Professional history, metrics, and ecosystem contributions.</p>
        </header>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200/80 dark:border-white/10 bg-zinc-200/90 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                      {exp.logoSrc ? (
                        <img src={exp.logoSrc} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <exp.icon className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">{exp.company}</h2>
                      <p className="font-mono text-sm text-zinc-600 dark:text-zinc-500">{exp.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 font-mono text-sm text-zinc-600 dark:text-zinc-500">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                        <span className="mt-1.5 text-zinc-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 md:w-64">
                  {exp.metrics.map((metric, j) => (
                    <div key={j} className="rounded-xl border border-zinc-200/80 dark:border-white/10 bg-zinc-200/60 dark:bg-black/40 p-4 text-center">
                      <metric.icon className="mx-auto mb-2 h-5 w-5 text-zinc-600 dark:text-zinc-500" />
                      <div className="text-lg font-bold text-zinc-950 dark:text-white">{metric.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-500">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
