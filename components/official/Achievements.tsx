import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { achievements } from '@/data/achievements';
import { gallery } from '@/data/gallery';
import { visible } from '@/lib/metrics';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

export function Achievements() {
  const items = visible(achievements);
  if (items.length === 0) return null;

  return (
    <Section id="achievements" tone="dark">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Selected outcomes"
            title="Results with receipts."
            standfirst="A short scoreboard of things that shipped, placed or moved a measurable number."
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2" staggerChildren>
          {items.map((achievement, index) => {
            const hasMoment =
              (achievement.galleryIds ?? []).length > 0 ||
              gallery.some(
                (item) => item.projectSlug && item.projectSlug === achievement.projectSlug
              );

            return (
              <RevealItem
                key={achievement.id}
                as="article"
                className="group flex min-h-[300px] flex-col bg-paper p-6 transition-colors hover:bg-surface sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    OUT-{String(index + 1).padStart(2, '0')} / {achievement.category}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{achievement.year}</span>
                </div>

                <p className="mt-8 max-w-[16ch] font-mono text-[clamp(1.65rem,3.5vw,2.6rem)] font-medium leading-[1.02] tracking-tight text-accent">
                  {achievement.result}
                </p>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">
                  {achievement.title}
                </h3>
                <p className="mt-2 max-w-prose text-[13.5px] leading-relaxed text-muted">
                  {achievement.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-7 text-[12.5px]">
                  {achievement.projectSlug ? (
                    <Link
                      href={`/projects/${achievement.projectSlug}`}
                      className="link-underline tap-pad inline-flex items-center gap-1 font-medium text-ink"
                    >
                      View build
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Link>
                  ) : null}
                  {hasMoment ? (
                    <Link
                      href="/gallery"
                      className="link-underline tap-pad inline-flex items-center gap-1 text-muted hover:text-ink"
                    >
                      View proof
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Link>
                  ) : null}
                  {achievement.href ? (
                    <a
                      href={achievement.href.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline tap-pad inline-flex items-center gap-1 text-muted hover:text-ink"
                    >
                      {achievement.href.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
