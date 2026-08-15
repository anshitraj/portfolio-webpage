import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react';
import { SITE } from '@/data/site';
import { HERO_METRICS } from '@/data/metrics';
import { PRIMARY_RESUME } from '@/data/resumes';
import { visible } from '@/lib/metrics';
import { CountUp } from '@/components/shared/CountUp';
import { Magnetic } from '@/components/shared/Magnetic';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export function Hero() {
  const metrics = visible(HERO_METRICS);

  return (
    <section className="pt-28 sm:pt-32 lg:pt-40">
      <div className="shell">
        <Reveal staggerChildren>
          <RevealItem>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {SITE.name}
            </p>
          </RevealItem>

          <RevealItem>
            <h1 className="mt-6 max-w-[19ch] text-display font-semibold text-ink">
              I build infrastructure and products people{' '}
              <span className="relative whitespace-nowrap">
                actually use
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[3px] bg-accent sm:-bottom-2"
                />
              </span>
              .
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-7 max-w-[52ch] text-lede text-muted">{SITE.sub}</p>
          </RevealItem>

          <RevealItem>
            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              <Magnetic>
                <Link
                  href="/#work"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-card bg-ink px-5 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
                >
                  View my work
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </Magnetic>

              <Magnetic>
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-card border border-rule px-5 text-[14px] font-medium text-ink transition-colors hover:bg-ink/[0.04]"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href={PRIMARY_RESUME.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-card border border-rule px-5 text-[14px] font-medium text-ink transition-colors hover:bg-ink/[0.04]"
                >
                  Resume
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </Magnetic>
            </div>
          </RevealItem>

          <RevealItem>
            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              {SITE.availability}
            </p>
          </RevealItem>
        </Reveal>
      </div>

      {/* Proof strip — full-bleed hairline row, four columns on desktop. */}
      <Reveal className="mt-16 border-y border-rule sm:mt-20" staggerChildren>
        <div className="shell grid grid-cols-2 sm:grid-cols-4">
          {metrics.map((m, i) => (
            <RevealItem
              key={m.label}
              className={[
                'py-6 sm:py-7',
                i % 2 === 1 ? 'border-l border-rule pl-5' : 'pr-5',
                'sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0',
                i < 2 ? 'border-b border-rule sm:border-b-0' : '',
              ].join(' ')}
            >
              <CountUp
                value={m.value}
                className="tnum block font-mono text-[26px] font-medium tracking-tight text-ink sm:text-[30px]"
              />
              <span className="mt-1.5 block text-[12.5px] leading-snug text-muted">{m.label}</span>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
