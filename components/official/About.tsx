import Image from 'next/image';
import { ABOUT, PHILOSOPHY, SITE } from '@/data/site';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/SectionHeader';
import { ShipLoop } from './ShipLoop';

function Philosophy() {
  return (
    <ul className="space-y-2.5">
      {PHILOSOPHY.map((p) => (
        <li key={p.left} className="flex items-baseline gap-2.5 font-mono text-[12.5px]">
          <span className="text-ink">{p.left}</span>
          <span className="text-accent" aria-label="over">
            &gt;
          </span>
          <span className="text-muted line-through decoration-rule">{p.right}</span>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait + philosophy */}
          <div className="lg:col-span-4">
            <Reveal>
              {/* Square because the source avatar is square — a 4:5 frame would
                  only upscale and crop it. Served locally rather than hotlinked
                  from GitHub, which failed to load and is a needless dependency. */}
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-card border border-rule bg-surface">
                <Image
                  src="/Portrait.png"
                  alt={SITE.name}
                  width={460}
                  height={460}
                  sizes="(max-width: 1024px) 60vw, 280px"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {SITE.name} · {SITE.location}
              </p>
            </Reveal>

            <Reveal className="mt-9 border-t border-rule pt-6" delay={0.1}>
              <Philosophy />
            </Reveal>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">{ABOUT.eyebrow}</p>
              <h2 className="mt-3 max-w-[20ch] text-title font-semibold text-ink">
                {ABOUT.heading}
              </h2>
            </Reveal>

            <Reveal className="mt-8 space-y-5" staggerChildren>
              {ABOUT.body.map((para) => (
                <p key={para.slice(0, 40)} className="max-w-prose text-[15.5px] leading-[1.7] text-muted">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-10 border-l-2 border-accent pl-6" delay={0.05}>
              <p className="font-serif text-[26px] leading-snug text-ink sm:text-[30px]">
                “{ABOUT.pullQuote}”
              </p>
            </Reveal>
          </div>
        </div>

        {/* The loop, drawn */}
        <Reveal className="mt-16 border-t border-rule pt-10">
          <p className="eyebrow">How the work actually goes</p>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[620px]">
              <ShipLoop />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
