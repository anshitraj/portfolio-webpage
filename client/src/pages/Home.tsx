import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Download, Globe, Github } from 'lucide-react';
import { projects } from '@/content/projects';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ResumeTerminal } from '@/components/ResumeTerminal';
import { TerminalAchievements } from '@/components/TerminalAchievements';
import { GitHubActivitySection } from '@/components/GitHubActivitySection';
import {
  SITE,
  WHAT_I_DO,
  WORK_EXPERIENCE,
  SKILLS,
  IMPACT_METRICS,
  CURRENT_FOCUS,
} from '@/content/siteProfile';

export default function Home() {
  const [isResumeVaultOpen, setIsResumeVaultOpen] = useState(false);
  const featured = projects.slice(0, 6);

  return (
    <Layout>
      <div className="space-y-20 md:space-y-28">
        {/* Hero */}
        <section className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Hi, I&apos;m {SITE.name.split(' ')[0]} 👋
            </h1>
            <p className="text-lg text-zinc-400 sm:text-xl">{SITE.tagline}</p>
            <p className="text-sm leading-relaxed text-zinc-500 sm:text-base">{SITE.bio}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Dialog open={isResumeVaultOpen} onOpenChange={setIsResumeVaultOpen}>
                <Button
                  onClick={() => setIsResumeVaultOpen(true)}
                  className="rounded-full bg-white px-6 py-6 text-sm font-semibold text-black hover:bg-zinc-200"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download resume
                </Button>
                <DialogContent className="w-[96vw] max-w-4xl border-0 bg-transparent p-0 sm:rounded-2xl [&>button]:hidden">
                  <ResumeTerminal onClose={() => setIsResumeVaultOpen(false)} />
                  <DialogHeader className="hidden">
                    <DialogTitle>/resumes</DialogTitle>
                    <DialogDescription>Resume vault</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 justify-center md:justify-end">
            <div className="h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-zinc-900 sm:h-32 sm:w-32">
              <img
                src={`https://github.com/${SITE.handle}.png`}
                alt=""
                className="h-full w-full object-cover"
                width={128}
                height={128}
              />
            </div>
          </div>
        </section>

        {/* Availability */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 sm:px-5">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm text-zinc-300">{SITE.availability}</p>
        </div>

        {/* About */}
        <section className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">// About</p>
          <h2 className="text-3xl font-bold text-white">What I do</h2>
          <p className="max-w-3xl text-zinc-400">{WHAT_I_DO}</p>
          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {IMPACT_METRICS.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-zinc-950/50 p-4">
                <div className="text-2xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-zinc-500">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Work */}
        <section className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">// Work</p>
          <h2 className="text-3xl font-bold text-white">Experience</h2>
          <div className="space-y-0 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/40">
            {WORK_EXPERIENCE.map((job) => (
              <div
                key={job.company + job.period}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-5"
              >
                <div className="flex gap-4">
                  {job.logoSrc ? (
                    <img
                      src={job.logoSrc}
                      alt=""
                      className="mt-1 h-12 w-12 shrink-0 rounded-full border border-white/10 bg-zinc-900 object-cover"
                    />
                  ) : (
                    <div className="mt-1 h-12 w-12 shrink-0 rounded-full border border-white/10 bg-zinc-900" />
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white">{job.company}</span>
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-300">
                        {job.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">{job.role}</p>
                    <p className="mt-2 text-sm text-zinc-400">{job.summary}</p>
                  </div>
                </div>
                <div className="shrink-0 text-sm text-zinc-500 sm:text-right">{job.period}</div>
              </div>
            ))}
          </div>
          <Link href="/experience" className="inline-flex text-sm font-medium text-sky-400 hover:text-sky-300">
            Full experience & metrics →
          </Link>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">// Skills</p>
          <h2 className="text-3xl font-bold text-white">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white px-3 py-1.5 text-xs font-medium text-black"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs text-zinc-600">
            Also: Java, C++, Tailwind, MongoDB, Firebase, Hardhat, Vite, IPFS, Nginx, Render, and more — see{' '}
            <Link href="/resume" className="text-zinc-400 underline hover:text-white">
              resume
            </Link>
            .
          </p>
        </section>

        {/* Featured projects */}
        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-block rounded-full border border-white/20 bg-white px-3 py-1 text-xs font-semibold text-black">
                My projects
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Check out my latest work</h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-400">
                Payments, GTM, agentic AI, marketplaces, and infra — from stablecoin gateways to Farcaster mini-apps.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-semibold text-white hover:text-zinc-300"
            >
              All projects <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/40 transition-colors hover:border-white/20"
              >
                <div className="aspect-[2/1] max-h-[140px] shrink-0 overflow-hidden bg-zinc-900 sm:max-h-[160px]">
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <div>
                    <h3 className="text-base font-bold leading-snug text-white">{p.title}</h3>
                    {p.year ? <p className="text-xs text-zinc-500">{p.year}</p> : null}
                  </div>
                  <p className="line-clamp-3 text-xs leading-relaxed text-zinc-400">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10"
                      >
                        <Globe className="h-3 w-3" />
                        Website
                      </a>
                    ) : null}
                    {p.repoUrl ? (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10"
                      >
                        <Github className="h-3 w-3" />
                        Source
                      </a>
                    ) : null}
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-zinc-200"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <TerminalAchievements variant="minimal" />

        <GitHubActivitySection />

        {/* Current focus */}
        <section className="space-y-4 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">// Focus</p>
          <h2 className="text-3xl font-bold text-white">Current focus</h2>
          <p className="max-w-3xl text-zinc-400">{CURRENT_FOCUS}</p>
        </section>
      </div>
    </Layout>
  );
}
