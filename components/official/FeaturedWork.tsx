import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { featuredProjects, toMedia } from '@/data/projects';
import { visible } from '@/lib/metrics';
import { StatusPill } from '@/components/shared/StatusPill';
import { ProjectMedia } from '@/components/shared/ProjectMedia';
import { BrandMark } from '@/components/shared/BrandMark';
import { Reveal } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

export function FeaturedWork() {
  return (
    <Section id="work">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Featured builds"
            title="Seven products, shipped and in front of users."
            standfirst="Each one exists because a specific thing was broken. Full case studies cover the problem, what I personally did, and what happened after launch."
          />
        </Reveal>

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20">
          {featuredProjects.map((p, i) => {
            const metrics = visible(p.metrics).slice(0, 4);
            const flipped = i % 2 === 1;

            return (
              <Reveal key={p.slug} as="article" className="group">
                <div
                  className={cn(
                    'grid items-center gap-7 lg:grid-cols-12 lg:gap-12',
                    flipped && 'lg:[&>*:first-child]:order-2'
                  )}
                >
                  {/* Media */}
                  <Link
                    href={`/projects/${p.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="relative block aspect-[16/9] overflow-hidden rounded-card border border-rule bg-surface lg:col-span-7"
                  >
                    <ProjectMedia
                      project={toMedia(p)}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority={i === 0}
                      imgClassName="transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.025]"
                    />
                  </Link>

                  {/* Copy */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-6 bg-rule" aria-hidden />
                      <StatusPill status={p.status} pulse />
                    </div>

                    <div className="mt-4 flex items-start gap-3.5">
                      <BrandMark src={p.logo} name={p.title} size="lg" className="mt-1" />
                      <div className="min-w-0">
                        <h3 className="text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[30px]">
                          <Link href={`/projects/${p.slug}`} className="link-underline">
                            {p.title}
                          </Link>
                        </h3>
                        <p className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-accent">
                          {p.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 max-w-prose text-[14.5px] leading-relaxed text-muted">
                      {p.oneLiner}
                    </p>

                    {metrics.length > 0 ? (
                      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5">
                        {metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="text-[11.5px] leading-snug text-muted">{m.label}</dt>
                            <dd className="tnum mt-0.5 font-mono text-[16px] font-medium text-ink">
                              {m.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13.5px]">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="link-underline tap-pad inline-flex items-center gap-1 font-medium text-ink"
                      >
                        Read case study
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                      {p.links.live ? (
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline tap-pad inline-flex items-center gap-1 text-muted hover:text-ink"
                        >
                          Visit site
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      ) : null}
                      {p.links.repo ? (
                        <a
                          href={p.links.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline tap-pad inline-flex items-center gap-1.5 text-muted hover:text-ink"
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden />
                          Source
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
