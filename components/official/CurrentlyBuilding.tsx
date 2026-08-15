import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CURRENTLY_BUILDING, getProject } from '@/data/projects';
import { StatusPill } from '@/components/shared/StatusPill';
import { BrandMark } from '@/components/shared/BrandMark';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export function CurrentlyBuilding() {
  const items = CURRENTLY_BUILDING.map((slug) => getProject(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  if (items.length === 0) return null;

  return (
    <section className="py-14 sm:py-16">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Currently building</p>
        </Reveal>

        <Reveal className="mt-6 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2" staggerChildren>
          {items.map((p) => (
            <RevealItem key={p.slug} as="article" className="group bg-paper">
              <Link
                href={`/projects/${p.slug}`}
                className="flex h-full flex-col gap-3 p-5 transition-colors hover:bg-surface sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <StatusPill status={p.status} pulse />
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {p.year}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <BrandMark src={p.logo} name={p.title} size="md" className="mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-1.5 text-[19px] font-semibold tracking-tight text-ink">
                      {p.title}
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                        aria-hidden
                      />
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                      {p.subtitle}
                    </p>
                  </div>
                </div>

                <p className="max-w-prose text-[14px] leading-relaxed text-muted">{p.oneLiner}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
