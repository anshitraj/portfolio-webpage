import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'Webcoin Labs',
      role: 'Founding Team — Ecosystem, Partnerships, Infra & Growth',
      period: '2022 – 2025',
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
      company: 'Titan Exchange',
      role: 'SDE Intern',
      period: 'Sep 2024 – Dec 2024',
      description: [
        'Worked on DEX workflows, tooling, and product infrastructure for swap and liquidity flows.',
        'Improved reliability and usability across swap flows used by 500+ test users during beta.',
        'Supported testing and iteration with 100+ traders; feedback drove UX and safety improvements.',
        'Collaborated with remote protocol and product teams to make trading UX safer and more understandable.',
      ],
      icon: Briefcase,
      metrics: [
        { label: 'Test Users', value: '500+', icon: Users },
        { label: 'Traders in Loops', value: '100+', icon: TrendingUp },
      ],
    },
    {
      company: 'Raydium Protocol',
      role: 'Protocol Contributor',
      period: 'May 2024 – July 2024',
      description: [
        'Contributed to Solana AMM protocol tooling, SDK usage, and liquidity pool integrations.',
        'Supported documentation and examples used by 50+ developers building on Raydium.',
        'Tested and validated pool creation and swap flows across 20+ pool types and fee tiers.',
        'Collaborated with core contributors on edge cases and UX for concentrated liquidity features.',
      ],
      icon: Briefcase,
      metrics: [
        { label: 'Developers Supported', value: '50+', icon: Users },
        { label: 'Pool Types Validated', value: '20+', icon: TrendingUp },
      ],
    },
    {
      company: 'Independent',
      role: 'Contributor — Payments, AI & Infra',
      period: '2023 – Present',
      description: [
        'Built and shipped multiple production-style full-stack applications across payments, AI agents, dashboards, and blockchain infra.',
        'Designed and deployed systems like ARCPay, OmniAgentPay, Mini Cast Store, and DCA Vault.',
        'Experimented with agentic AI workflows for payments, outreach, and developer support.',
        'Maintains and iterates on a portfolio of systems rather than one-off demos.',
      ],
      icon: Briefcase,
      metrics: [
        { label: 'Products Shipped', value: '10+', icon: Briefcase },
        { label: 'Focus Areas', value: 'Payments, AI, Infra', icon: TrendingUp },
      ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-black text-white tracking-tighter">EXPERIENCE</h1>
          <p className="text-muted-foreground text-lg">Professional history and ecosystem contributions.</p>
        </header>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <exp.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{exp.company}</h2>
                      <p className="text-secondary font-mono text-sm">{exp.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 md:w-64">
                  {exp.metrics.map((metric, j) => (
                    <div key={j} className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                      <metric.icon className="w-5 h-5 text-secondary mx-auto mb-2 opacity-70" />
                      <div className="text-lg font-bold text-white">{metric.value}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</div>
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
