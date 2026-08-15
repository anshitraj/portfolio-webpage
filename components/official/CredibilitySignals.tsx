import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { visibleSignals } from '@/data/signals';
import { BrandMark } from '@/components/shared/BrandMark';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

function SignalLink({ href, label }: { href: string; label: string }) {
  const className =
    'link-underline tap-pad inline-flex items-center gap-1 text-[12.5px] font-medium text-ink';
  const content = (
    <>
      {label}
      <ArrowUpRight className="h-3 w-3" aria-hidden />
    </>
  );

  return href.startsWith('/') ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  );
}

export function CredibilitySignals() {
  if (visibleSignals.length === 0) return null;

  return (
    <Section id="signals">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Selected signals"
            title="Proof that doesn’t belong in a trophy cabinet."
            standfirst="Ecosystem recognition, published thinking, fellowships, invitations and rooms where the work earned a place."
          />
        </Reveal>

        <Reveal className="mt-12 border-y border-rule" staggerChildren>
          {visibleSignals.map((signal, index) => (
            <RevealItem
              key={signal.id}
              as="article"
              className="group relative grid gap-5 border-b border-rule py-6 last:border-b-0 sm:grid-cols-12 sm:items-center sm:gap-8"
            >
              <span
                className="absolute inset-y-0 left-0 w-[2px] origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-y-100"
                aria-hidden
              />

              <div className="flex items-center gap-3 sm:col-span-3 sm:pl-4">
                <BrandMark src={signal.logo} name={signal.organization} size="md" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    SIG-{String(index + 1).padStart(2, '0')} / {signal.kind}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {signal.year}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-4">
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-ink">
                  {signal.title}
                </h3>
                <p className="mt-1 text-[12.5px] text-muted">{signal.organization}</p>
              </div>

              <div className="sm:col-span-5">
                <p className="max-w-prose text-[13.5px] leading-relaxed text-muted">{signal.detail}</p>
                {signal.href ? (
                  <div className="mt-3">
                    <SignalLink href={signal.href.url} label={signal.href.label} />
                  </div>
                ) : null}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
