import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  Activity,
  Users,
  Star,
  Code,
  Terminal,
  Briefcase,
  Linkedin,
  Github,
  Download,
} from 'lucide-react';
import { projects } from '@/content/projects';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GitHubContributionsHeatmap } from '@/components/github/GitHubContributionsHeatmap';
import { ResumeTerminal } from '@/components/ResumeTerminal';
import { TerminalAchievements } from '@/components/TerminalAchievements';

export default function Home() {
  const [isResumeVaultOpen, setIsResumeVaultOpen] = useState(false);

  const metrics = [
    { label: 'Startups Connected', value: '100+', icon: Users },
    { label: 'Community Reach', value: '21K+', icon: Star },
    { label: 'Product Users', value: '1,500+', icon: Activity },
    { label: 'Fundraising Supported', value: '$50K+', icon: Briefcase },
  ];

  return (
    <Layout>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-16 md:gap-24">
        
        {/* Hero Section */}
        <section className="mx-auto mt-8 w-full max-w-4xl space-y-6 px-1 text-center md:mt-12">
          <div className="flex flex-col items-center gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex max-w-full items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:px-4 sm:text-xs"
            >
              SYSTEM STATUS: ONLINE | USER: anshit.raj.yadav
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Anshit Raj Yadav
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-secondary sm:text-2xl md:text-3xl">
              Builder of Agentic AI, Stablecoin Rails & Product Systems
            </h2>
          </motion.div>
          
          <motion.p 
            className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build real systems around agentic AI, LLM workflows, stablecoin payment rails, and blockchain infrastructure — from encrypted ledgers and DEX tooling to dashboards, automations, and consumer-facing experiments.
          </motion.p>
          
          <motion.div
            className="flex w-full flex-col items-stretch justify-center gap-3 pt-6 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/projects"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-primary/40 magnet-target sm:w-auto"
            >
              Explore My Work <Code className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 magnet-target sm:w-auto"
            >
              Open Terminal <Terminal className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mx-auto inline-flex w-full max-w-xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/40 px-4 py-3 backdrop-blur-md shadow-[0_0_30px_rgba(88,28,135,0.35)]">
              <Dialog open={isResumeVaultOpen} onOpenChange={setIsResumeVaultOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 font-mono text-xs uppercase tracking-[0.2em] bg-primary text-white hover:bg-primary/90 magnet-target">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[96vw] max-w-4xl border-0 bg-transparent p-0 sm:rounded-2xl [&>button]:hidden">
                  <ResumeTerminal onClose={() => setIsResumeVaultOpen(false)} />
                  <DialogHeader className="hidden">
                    <DialogTitle className="font-mono text-sm tracking-[0.3em] text-secondary">
                      /resumes
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Select the profile you want to download.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 hidden grid gap-3">
                    <a
                      href="/resumes/anshit-raj-yadav-technical.pdf"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-primary/60 hover:bg-primary/10 transition-all"
                      download
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Technical Resume
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Systems, infra, full-stack engineering
                        </p>
                      </div>
                      <Download className="w-4 h-4 text-primary" />
                    </a>
                    <a
                      href="/resumes/anshit-raj-yadav-founder.pdf"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-primary/60 hover:bg-primary/10 transition-all"
                      download
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Founder / Builder Resume
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Company-building, 0→1 products, growth
                        </p>
                      </div>
                      <Download className="w-4 h-4 text-primary" />
                    </a>
                    <a
                      href="/resumes/anshit-raj-yadav-business-bd.pdf"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-primary/60 hover:bg-primary/10 transition-all"
                      download
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Business / BD Resume
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Strategy, GTM, partnerships & ops
                        </p>
                      </div>
                      <Download className="w-4 h-4 text-primary" />
                    </a>
                  </div>
                </DialogContent>
              </Dialog>

              <a
                href="https://linkedin.com/in/anshitraj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-white/10 hover:text-white transition-all magnet-target"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>

              <a
                href="https://github.com/anshitraj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-white/10 hover:text-white transition-all magnet-target"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="pt-8 font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase"
          >
            ROLE: BUILDER / FOUNDER / ENGINEER
          </motion.div>
        </section>

        {/* Impact Metrics Strip */}
        <motion.section 
          className="w-full glass-panel rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Impact at a Glance
              </h2>
              <p className="text-muted-foreground font-mono text-xs md:text-sm mt-1">
                Ecosystem, users, and capital touched by my work.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0 text-center px-2"
              >
                <m.icon className="w-6 h-6 text-secondary mb-3 opacity-70" />
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">
                  {m.value}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recent Achievements */}
        <TerminalAchievements />

        {/* Featured Projects preview */}
        <section className="w-full space-y-10 mb-16">
          <div className="flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Recent Deployments</h2>
              <p className="text-muted-foreground font-mono text-sm mt-1">Proof of work / Production products</p>
            </div>
            <Link href="/projects" className="text-primary hover:text-white transition-colors flex items-center gap-2 font-bold magnet-target">
              View All Systems <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 hover:border-primary/50 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex gap-2 mb-3">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md bg-white/10 text-white backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 max-w-md">{p.description}</p>
                  <Link 
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors magnet-target"
                  >
                    Open Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GitHub Contributions */}
        <section className="w-full space-y-6 mb-20">
          <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                GitHub Contributions
              </h2>
              <p className="text-muted-foreground font-mono text-xs md:text-sm mt-1">
                Contribution snapshot across systems, experiments, and infra work.
              </p>
              <p className="text-muted-foreground font-mono text-[10px] md:text-xs mt-1">
                60+ repositories touching payments, dashboards, automation, blockchain infra, and side projects.
              </p>
            </div>
            <a
              href="https://github.com/anshitraj"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-white transition-colors magnet-target"
            >
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="glass-panel rounded-3xl p-4 md:p-6 border border-white/5 bg-black/40">
            <GitHubContributionsHeatmap />
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <span className="font-mono tracking-[0.2em] uppercase">
                Activity Log &mdash; Last 12 Months
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  Less
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-muted-foreground/10" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-900/60" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-700" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-300" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  More
                </span>
              </div>
            </div>
            <a
              href="https://github.com/anshitraj"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex sm:hidden items-center gap-2 text-xs font-bold text-primary hover:text-white transition-colors magnet-target"
            >
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="w-full space-y-8">
          <div className="flex items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
                Tech Stack
              </h2>
              <p className="text-muted-foreground font-mono text-xs md:text-sm mt-1">
                Languages, protocols, and tools I reach for in production.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Solidity', 'TypeScript', 'JavaScript', 'Python', 'Java'].map(item => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TailwindCSS', 'Vite'].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                Backend & Databases
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'MongoDB', 'Firebase'].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                Web3 & Protocols
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Solana', 'Ethereum', 'Ethers.js', 'Hardhat', 'Foundry', 'OpenZeppelin', 'IPFS'].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                DevOps & Tooling
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'Docker', 'Linux', 'Nginx', 'Vercel', 'Render'].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                AI / LLM / Agentic Focus
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'LLM workflows',
                  'Agentic AI systems',
                  'Programmable payment rails',
                  'AI-native automation',
                ].map(item => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-secondary mb-3">
                Currently Learning
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Rust'].map(item => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section className="w-full space-y-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
                Current Focus
              </h2>
              <p className="text-muted-foreground font-mono text-xs md:text-sm mt-1">
                What I'm actively building and thinking about right now.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 bg-black/40">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              I&apos;m focused on agentic AI systems that can safely move money, coordinate people, and interact
              with on-chain infrastructure. That means LLM-powered workflows, stablecoin payment rails, DCA and vault
              strategies, dashboards for founders and operators, and the tooling that lets ecosystems plug into this
              with confidence.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
