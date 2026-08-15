import { IMPACT_METRICS, ECOSYSTEM_WORK } from '@/data/metrics';
import { visible } from '@/lib/metrics';
import { CountUp } from '@/components/shared/CountUp';
import { BrandMark } from '@/components/shared/BrandMark';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/SectionHeader';

/**
 * The page's first dark band. The numbers are the graphic here — set large
 * enough to scan at a glance rather than read, which is the whole point of the
 * section title.
 */
export function Numbers() {
  const metrics = visible(IMPACT_METRICS);
  const [lead, ...rest] = metrics;

  return (
    <Section id="numbers">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Impact</p>
          <h2 className="mt-3 max-w-[18ch] text-title font-semibold text-ink">
            Numbers are better than adjectives.
          </h2>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
            Every figure here is one I can point at. Anything still unconfirmed sits in the data
            file marked unverified and never renders.
          </p>
        </Reveal>

        {/* Lead metric, oversized */}
        {lead ? (
          <Reveal className="mt-14 border-y border-rule py-10 sm:py-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <CountUp
                value={lead.value}
                className="tnum block font-mono text-[clamp(3.5rem,12vw,7rem)] font-medium leading-[0.9] tracking-tighter text-ink"
              />
              <p className="max-w-[22ch] text-[15px] leading-snug text-muted sm:text-right">
                {lead.label}
              </p>
            </div>
          </Reveal>
        ) : null}

        {/* The rest */}
        <Reveal className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-4" staggerChildren>
          {rest.map((m) => (
            <RevealItem key={m.label} className="bg-paper py-7 pr-4">
              <CountUp
                value={m.value}
                className="tnum block font-mono text-[clamp(1.5rem,3.5vw,2.125rem)] font-medium tracking-tight text-ink"
              />
              <span className="mt-2 block text-[12.5px] leading-snug text-muted">{m.label}</span>
            </RevealItem>
          ))}
        </Reveal>

        {/* Named outcomes */}
        <Reveal className="mt-14">
          <p className="eyebrow">Named outcomes</p>
          <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
            {ECOSYSTEM_WORK.map((e) => (
              <li
                key={e.org}
                className="flex items-center gap-3 border-b border-rule py-3.5"
              >
                <BrandMark
                  src={'logo' in e ? e.logo : undefined}
                  name={e.org}
                  monogram={'monogram' in e ? e.monogram : undefined}
                  size="sm"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[11.5px] uppercase tracking-[0.08em] text-accent">
                    {e.org}
                  </span>
                  <span className="mt-1 block text-[13.5px] text-muted">{e.outcome}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
