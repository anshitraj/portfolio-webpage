import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'Webcoin Labs',
      role: 'Business Development & Ecosystem Growth Lead',
      period: '2022 – 2024',
      description: [
        'Led partnerships with 50+ Web3 startups',
        'Managed 1,500+ influencers (KOLs) across X, Telegram, Discord',
        'Supported $20,000+ fundraising via product demos & investor coordination',
        'Drove GTM strategies increasing project visibility by 200%',
        'Worked closely with founders, VCs, launchpads (DAO Maker, Seedify, Poolz)'
      ],
      icon: TrendingUp,
      metrics: [
        { label: 'Partnerships', value: '50+', icon: Users },
        { label: 'Funding', value: '$20K+', icon: DollarSign }
      ]
    },
    {
      company: 'Titan DEX',
      role: 'SDE Intern / Contributor',
      period: '2024',
      description: [
        'Improved DEX UI workflows used by 500+ test users',
        'Stress-tested swap flows with 100+ traders',
        'Validated frontend ↔ backend interactions with live liquidity',
        'Worked on real trading interfaces'
      ],
      icon: Briefcase,
      metrics: [
        { label: 'Test Users', value: '500+', icon: Users },
        { label: 'Traders', value: '100+', icon: TrendingUp }
      ]
    }
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
