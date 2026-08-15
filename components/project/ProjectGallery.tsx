'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Lightbox, type LightboxItem } from '@/components/shared/Lightbox';

/**
 * Screenshot strip for a case study. Mobile app shots are tall, so they get a
 * narrower column than landscape captures.
 */
export function ProjectGallery({
  screenshots,
  title,
}: {
  screenshots: string[];
  title: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const items: LightboxItem[] = screenshots.map((src, i) => ({
    id: `${title}-${i}`,
    src,
    width: 1170,
    height: 2532,
    caption: `${title} — screen ${i + 1} of ${screenshots.length}`,
  }));

  return (
    <>
      <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {screenshots.map((src, i) => (
          <li key={src} className="w-[140px] shrink-0 snap-start sm:w-auto">
            <motion.button
              type="button"
              onClick={() => setIndex(i)}
              layoutId={reduced ? undefined : `gallery-${title}-${i}`}
              className="group relative block aspect-[9/19] w-full overflow-hidden rounded-card border border-rule bg-surface"
              aria-label={`Open screenshot ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 30vw, 16vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
              />
            </motion.button>
          </li>
        ))}
      </ul>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
