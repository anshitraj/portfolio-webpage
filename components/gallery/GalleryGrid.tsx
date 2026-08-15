'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Images } from 'lucide-react';
import { gallery, activeCategories, coverOf } from '@/data/gallery';
import { Lightbox, type LightboxItem } from '@/components/shared/Lightbox';
import { cn } from '@/lib/utils';

export function GalleryGrid() {
  const [category, setCategory] = useState('ALL');
  const [index, setIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const categories = useMemo(() => activeCategories(), []);
  const items = useMemo(
    () => (category === 'ALL' ? gallery : gallery.filter((g) => g.category === category)),
    [category]
  );

  /*
    The grid shows one card per moment, but the lightbox pages through every
    photograph — so a four-shot hackathon opens on its own cover and continues
    through its other three before moving on.
  */
  const { lightboxItems, openAt } = useMemo(() => {
    const flat: LightboxItem[] = [];
    const starts: number[] = [];

    items.forEach((moment) => {
      starts.push(flat.length);
      moment.images.forEach((image, i) => {
        const shot = moment.images.length > 1 ? ` · Shot ${i + 1} of ${moment.images.length}` : '';
        flat.push({
          id: `${moment.id}-${i}`,
          src: image.src,
          width: image.width,
          height: image.height,
          caption: image.caption ?? moment.caption,
          meta: `${moment.category} · ${moment.date}${shot}`,
        });
      });
    });

    return { lightboxItems: flat, openAt: starts };
  }, [items]);

  if (gallery.length === 0) {
    return <p className="mt-12 max-w-prose text-[15px] leading-relaxed text-muted">Nothing here yet.</p>;
  }

  return (
    <>
      {categories.length > 2 ? (
        <div
          className="no-scrollbar mask-fade-r -mx-5 mt-10 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((c) => {
            const on = c === category;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setCategory(c);
                  setIndex(null);
                }}
                className={cn(
                  'shrink-0 rounded-pill border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors',
                  on
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule text-muted hover:border-ink/30 hover:text-ink'
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* CSS columns give a true masonry flow without a layout library. */}
      <div className="mt-8 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
        {items.map((item, i) => {
          const cover = coverOf(item);
          const extra = item.images.length - 1;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setIndex(openAt[i])}
              layoutId={reduced ? undefined : `gallery-${item.id}-0`}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-card border border-rule bg-surface text-left"
              aria-label={
                extra > 0
                  ? `Open: ${item.caption} (${item.images.length} images)`
                  : `Open: ${item.caption}`
              }
            >
              <div className="relative overflow-hidden">
                <Image
                  src={cover.src}
                  alt={item.caption}
                  width={cover.width}
                  height={cover.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 3 ? 'eager' : 'lazy'}
                  className="w-full transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.03]"
                />
                {extra > 0 ? (
                  <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-ink/80 px-2 py-1 font-mono text-[11px] tabular-nums text-paper backdrop-blur-sm">
                    <Images className="h-3 w-3" aria-hidden />
                    {item.images.length}
                  </span>
                ) : null}
              </div>
              <div className="border-t border-rule p-4">
                <p className="text-[13.5px] leading-snug text-ink">{item.caption}</p>
                <p className="mt-2 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  <span>{item.category}</span>
                  <span className="h-px w-3 bg-rule" aria-hidden />
                  <span>{item.date}</span>
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
