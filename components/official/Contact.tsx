import { ArrowUpRight } from 'lucide-react';
import { SITE, CONTACT } from '@/data/site';
import { Magnetic } from '@/components/shared/Magnetic';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/SectionHeader';

const LINKS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { label: 'LinkedIn', value: '/in/anshitraj', href: SITE.socials.linkedin },
  { label: 'GitHub', value: '@anshitraj', href: SITE.socials.github },
  { label: 'X', value: '@solrishu', href: SITE.socials.x },
];

export function Contact() {
  return (
    <Section id="contact" tone="dark" className="pb-20 sm:pb-24">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 max-w-[16ch] text-display font-semibold leading-[1.02] text-ink">
            {CONTACT.heading}
          </h2>
          <p className="mt-6 max-w-prose text-lede text-muted">{CONTACT.sub}</p>
        </Reveal>

        <Reveal className="mt-12">
          <Magnetic>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-card bg-ink px-6 text-[15px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              {SITE.email}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={l.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="group flex flex-col gap-1 bg-paper p-5 transition-colors hover:bg-surface"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {l.label}
              </span>
              <span className="flex items-center gap-1 truncate text-[14px] text-ink">
                <span className="truncate">{l.value}</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
