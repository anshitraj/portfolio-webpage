import { SHARPENING } from '@/data/skills';
import { stackGroups } from '@/lib/stack';
import { fetchLanguages, type LanguageBreakdown } from '@/lib/github';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';
import { LanguageBar } from './LanguageBar';

/**
 * The stack as a ledger rather than a diagram.
 *
 * This section used to be a node graph — connector curves, a pulsing core
 * circle, a "depth signal" legend. None of it encoded anything: the curves
 * joined nothing to nothing and the depth scale only ever applied to two
 * entries. It looked like information without being any.
 *
 * What is actually worth saying is which of these shipped, so every row carries
 * the count and the named projects behind it, derived from `data/projects.ts`.
 */
export async function TechStack() {
  // The section must render even when GitHub rate-limits or is unreachable.
  let languages: LanguageBreakdown | null = null;
  try {
    languages = await fetchLanguages();
  } catch {
    languages = null;
  }

  return (
    <Section id="stack">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Stack"
            title="What I build with, and what it shipped in."
            standfirst="No logo wall and no proficiency bars. Each row lists the tools and the products that went to production on them."
          />
        </Reveal>

        {languages ? (
          <Reveal className="mt-10">
            <LanguageBar data={languages} />
          </Reveal>
        ) : null}

        <Reveal className="mt-10 border-t border-rule" staggerChildren>
          {stackGroups.map((group, i) => (
            <RevealItem key={group.name}>
              <div className="grid gap-x-10 gap-y-4 border-b border-rule py-7 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] tabular-nums text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[17px] font-semibold tracking-tight text-ink">
                      {group.name}
                    </span>
                  </p>
                  <p className="mt-1.5 pl-[27px] font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    Shipped in {group.shippedIn.length}{' '}
                    {group.shippedIn.length === 1 ? 'product' : 'products'}
                  </p>
                </div>

                <div className="lg:col-span-9">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-[14.5px] leading-none text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {group.shippedIn.length > 0 ? (
                    <p className="mt-4 text-[13px] leading-relaxed text-muted">
                      {group.shippedIn.slice(0, 4).join(', ')}
                      {group.shippedIn.length > 4
                        ? ` and ${group.shippedIn.length - 4} more`
                        : ''}
                      .
                    </p>
                  ) : null}
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow">Currently sharpening</p>
            <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-muted">
              Moving from shipping features to designing the systems underneath them.
            </p>
          </div>
          <ul className="flex max-w-2xl flex-wrap gap-2 sm:justify-end">
            {SHARPENING.map((skill) => (
              <li
                key={skill}
                className="border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
