import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { experience } from '@/data/experience';
import { visible } from '@/lib/metrics';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

function Logo({ src, emoji, company }: { src?: string; emoji?: string; company: string }) {
  if (!src) {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-rule bg-surface font-mono text-[12px] text-muted"
        aria-hidden
      >
        {emoji ? <span className="text-[18px] leading-none">{emoji}</span> : company.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-pill border border-rule object-cover"
    />
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Experience"
            title="Three years on the founder side, and the engineering that came out of it."
          />
        </Reveal>

        {/* Continuous rail behind the entries, so the run of roles reads as one
            timeline rather than five unrelated rows. */}
        <Reveal className="relative mt-12 border-t border-rule" staggerChildren>
          <span
            className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-rule sm:block"
            aria-hidden
          />

          {experience.map((job) => {
            const primary = job.weight === 'primary';
            const metrics = visible(job.metrics);

            return (
              <RevealItem
                key={`${job.company}-${job.period}`}
                as="article"
                className={cn('relative border-b border-rule', primary ? 'py-9' : 'py-6')}
              >
                {/* Node on the rail — filled for the roles that carry weight. */}
                <span
                  className={cn(
                    'absolute left-[15px] top-[42px] hidden h-2 w-2 rounded-full ring-4 ring-paper sm:block',
                    primary ? 'bg-accent' : 'bg-rule'
                  )}
                  aria-hidden
                />

                <div className="grid gap-5 sm:pl-12 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-3.5">
                      <Logo src={job.logoSrc} emoji={job.logoEmoji} company={job.company} />
                      <div className="min-w-0">
                        <h3
                          className={cn(
                            'font-semibold tracking-tight text-ink',
                            primary ? 'text-[19px]' : 'text-[16px]'
                          )}
                        >
                          {job.href ? (
                            <a
                              href={job.href}
                              target="_blank"
                              rel="noreferrer"
                              className="link-underline inline-flex items-center gap-1"
                            >
                              {job.company}
                              <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden />
                            </a>
                          ) : (
                            job.company
                          )}
                        </h3>
                        <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{job.role}</p>
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                          {job.period}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <p className={cn('max-w-prose leading-relaxed text-ink', primary ? 'text-[15px]' : 'text-[14px] text-muted')}>
                      {job.summary}
                    </p>

                    {primary ? (
                      <>
                        <ul className="mt-4 space-y-2">
                          {job.bullets.map((b) => (
                            <li
                              key={b}
                              className="relative max-w-prose pl-4 text-[14px] leading-relaxed text-muted"
                            >
                              <span
                                className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-rule"
                                aria-hidden
                              />
                              {b}
                            </li>
                          ))}
                        </ul>

                        {metrics.length > 0 ? (
                          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-5">
                            {metrics.map((m) => (
                              <div key={m.label}>
                                <dd className="tnum font-mono text-[18px] font-medium text-ink">
                                  {m.value}
                                </dd>
                                <dt className="mt-0.5 text-[11.5px] text-muted">{m.label}</dt>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
