'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { BUILDER_LICENSE } from '@/data/education';
import { Panel, BenchLabel } from './bench';

/**
 * Education as a laminated builder licence rather than a transcript row.
 * Tilts toward the cursor with a holographic sheen that tracks the same point.
 */
export function BuilderLicence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * 11,
      ry: (px - 0.5) * 14,
      mx: px * 100,
      my: py * 100,
      active: true,
    });
  }

  return (
    <section aria-labelledby="bench-licence">
      <BenchLabel index="07" title="Builder licence" hint="CLASS B.TECH" />
      <p id="bench-licence" className="sr-only">
        Education
      </p>

      <Panel className="p-5 sm:p-8" screws={false}>
        <div className="mx-auto max-w-[520px]" style={{ perspective: '1100px' }}>
          <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setT({ rx: 0, ry: 0, mx: 50, my: 50, active: false })}
            className="relative overflow-hidden rounded-[8px] border border-[rgb(var(--bench-edge))] bg-gradient-to-br from-[#1E1E1E] to-[#141414] p-5 transition-transform duration-200 ease-out sm:p-6"
            style={{
              transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Holographic sheen */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: t.active ? 0.5 : 0,
                // A white sheen rather than a tinted one — the card catches
                // light without introducing a hue.
                background: `radial-gradient(420px circle at ${t.mx}% ${t.my}%, rgba(255,255,255,.16), transparent 60%)`,
              }}
              aria-hidden
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-dashed border-[rgb(var(--bench-edge))] pb-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(var(--bench-dim))]">
                  Builder licence
                </p>
                <p className="mt-1.5 font-mono text-[16px] tracking-tight text-[rgb(var(--bench-text))] sm:text-[18px]">
                  {BUILDER_LICENSE.holder}
                </p>
              </div>
              <span className="shrink-0 rounded-[3px] border border-[rgb(var(--live))] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--live))]">
                Active
              </span>
            </div>

            <dl className="relative mt-4 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {[
                ['Class', BUILDER_LICENSE.class],
                ['Issuer', BUILDER_LICENSE.issuer],
                ['Validity', BUILDER_LICENSE.validity],
                ['Rating', BUILDER_LICENSE.rating],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--bench-dim))]">
                    {k}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[12px] leading-snug text-[rgb(var(--bench-text))]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="relative mt-5 border-t border-dashed border-[rgb(var(--bench-edge))] pt-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--bench-dim))]">
                Endorsements
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {BUILDER_LICENSE.endorsements.map((e) => (
                  <li
                    key={e}
                    className="rounded-[3px] border border-[rgb(var(--bench-edge))] px-2 py-0.5 font-mono text-[11px] text-[rgb(var(--bench-text))]"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* Magnetic strip */}
            <div className="relative mt-5 h-6 rounded-[2px] bg-[rgb(var(--bench-edge))]/70" aria-hidden />
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] text-[rgb(var(--bench-dim))]">
          Move your cursor across the card.
        </p>
      </Panel>
    </section>
  );
}
