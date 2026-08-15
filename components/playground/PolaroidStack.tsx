'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gallery } from '@/data/gallery';
import { Panel, BenchLabel } from './bench';

// Fixed per-index rotations so the scatter is identical on server and client.
const TILT = [-4, 3, -2, 5, -3, 2, -5, 4];

/**
 * A pile holds prints, not moments — so a four-shot hackathon contributes four
 * prints here rather than one, even though the log lists it as one entry.
 */
const prints = gallery.flatMap((moment) =>
  moment.images.map((image, i) => ({
    id: `${moment.id}-${i}`,
    src: image.src,
    caption: image.caption ?? moment.caption,
    category: moment.category,
    date: moment.date,
  }))
);

/**
 * Build moments as a physical stack of prints. Clicking the top print sends it
 * to the back of the pile. Hidden entirely until there are photos to show.
 */
export function PolaroidStack() {
  const [order, setOrder] = useState(() => prints.map((_, i) => i));

  if (prints.length === 0) return null;

  function cycle() {
    setOrder(([first, ...rest]) => [...rest, first]);
  }

  const top = prints[order[0]];

  return (
    <section aria-labelledby="bench-memories">
      <BenchLabel index="08" title="Print pile" hint={`${prints.length} PRINTS`} />
      <p id="bench-memories" className="sr-only">
        Build moments
      </p>

      <Panel className="p-5 sm:p-8" screws={false}>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
          {/* The pile */}
          <div className="relative h-[300px] w-[240px] shrink-0 sm:h-[340px] sm:w-[270px]">
            {order.map((printIndex, stackPos) => {
              const item = prints[printIndex];
              const isTop = stackPos === 0;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={isTop ? cycle : undefined}
                  tabIndex={isTop ? 0 : -1}
                  aria-hidden={!isTop}
                  aria-label={isTop ? `${item.caption} — click for next print` : undefined}
                  className="absolute inset-0 origin-bottom cursor-pointer bg-[#EDEDED] p-3 pb-10 shadow-xl transition-transform duration-500 ease-editorial"
                  style={{
                    transform: `rotate(${TILT[printIndex % TILT.length]}deg) translateY(${stackPos * 5}px) scale(${1 - stackPos * 0.025})`,
                    zIndex: prints.length - stackPos,
                    opacity: stackPos > 3 ? 0 : 1,
                  }}
                >
                  <span className="relative block aspect-square w-full overflow-hidden bg-[#0A0A0A]">
                    <Image
                      src={item.src}
                      alt={isTop ? item.caption : ''}
                      fill
                      sizes="270px"
                      loading={stackPos === 0 ? 'eager' : 'lazy'}
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-2.5 block truncate text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#555555]">
                    {item.category} · {item.date}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Caption for whatever is on top */}
          <div className="min-w-0 flex-1 text-center lg:text-left" aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--signal))]">
              {top.category} · {top.date}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[rgb(var(--bench-text))]">
              {top.caption}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={cycle}
                className="inline-flex min-h-[40px] items-center rounded-[3px] border border-[rgb(var(--signal))] px-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--signal))] transition-colors hover:bg-[rgb(var(--signal))]/12"
              >
                Next print
              </button>
              <Link
                href="/gallery"
                className="inline-flex min-h-[40px] items-center rounded-[3px] border border-[rgb(var(--bench-edge))] px-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))]"
              >
                Full build log
              </Link>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}
