import Image from 'next/image';
import Link from 'next/link';
import { Images } from 'lucide-react';
import { gallery, coverOf } from '@/data/gallery';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

/** Hidden entirely when there are no photos — no placeholder tiles. */
export function BuildLogPreview() {
  const items = gallery.slice(0, 6);
  if (items.length === 0) return null;

  return (
    <Section id="gallery">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Field log"
            title="In the room, not just in the repo."
            standfirst="Hackathons, launches, teams and future events — documentary proof of where the work happened."
            action={{ label: 'Open the full log', href: '/gallery' }}
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren>
          {items.map((item) => {
            const cover = coverOf(item);
            const extra = item.images.length - 1;

            return (
              <RevealItem key={item.id}>
                <Link
                  href="/gallery"
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-rule bg-surface transition-colors hover:border-ink/25"
                >
                  {/*
                    These are screenshots and phone shots, not a photo set — they
                    run from 2:1 landscape to 9:20 portrait. Cropping them to a
                    single ratio cut the subject out of every one, so they are
                    contained on the surface instead, the same way project covers
                    are handled.
                  */}
                  <div className="relative aspect-[4/3] overflow-hidden p-2">
                    <Image
                      src={cover.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-contain object-center transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.03]"
                    />
                    {extra > 0 ? (
                      <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-ink/80 px-2 py-1 font-mono text-[11px] tabular-nums text-paper backdrop-blur-sm">
                        <Images className="h-3 w-3" aria-hidden />
                        {item.images.length}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-auto flex items-start justify-between gap-3 border-t border-rule p-4">
                    <p className="text-[13px] leading-snug text-muted">{item.caption}</p>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      {item.category}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
