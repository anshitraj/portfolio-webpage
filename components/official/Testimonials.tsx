import { ArrowUpRight } from 'lucide-react';
import { SITE } from '@/data/site';
import { visibleTestimonials } from '@/data/testimonials';
import { BrandMark } from '@/components/shared/BrandMark';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

const requestHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
  'Reference request for Anshit Raj Yadav'
)}`;

export function Testimonials() {
  return (
    <Section id="references">
      <div className="shell">
        {visibleTestimonials.length > 0 ? (
          <>
            <Reveal>
              <SectionHeader
                eyebrow="Testimonials"
                title="What people say after shipping together."
                standfirst="Approved words from founders, product partners and engineering teams I’ve worked beside."
              />
            </Reveal>

            <Reveal
              className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-3"
              staggerChildren
            >
              {visibleTestimonials.map((testimonial) => (
                <RevealItem
                  key={testimonial.id}
                  as="article"
                  className="flex min-h-[300px] flex-col bg-paper p-6"
                >
                  <span className="font-serif text-[54px] leading-none text-accent" aria-hidden>
                    “
                  </span>
                  <blockquote className="-mt-2 text-[16px] leading-relaxed text-ink">
                    {testimonial.quote}
                  </blockquote>

                  <footer className="mt-auto flex items-center gap-3 border-t border-rule pt-5">
                    <BrandMark
                      src={testimonial.logo}
                      name={testimonial.company}
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-ink">{testimonial.name}</p>
                      <p className="mt-0.5 text-[12px] text-muted">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>
                  </footer>
                </RevealItem>
              ))}
            </Reveal>
          </>
        ) : (
          <Reveal className="relative overflow-hidden border-y border-rule py-10 sm:py-12">
            <span
              className="pointer-events-none absolute -right-2 -top-8 font-serif text-[180px] leading-none text-accent/[0.08] sm:right-8"
              aria-hidden
            >
              “
            </span>

            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Testimonials & references</p>
                <h2 className="mt-3 max-w-[19ch] text-title font-semibold text-ink">
                  The work has people behind it, too.
                </h2>
                <p className="mt-4 max-w-prose text-[14px] leading-relaxed text-muted">
                  Founder, product and engineering references are available for serious hiring
                  conversations. Names and contact details stay private until requested.
                </p>
              </div>

              <div className="lg:col-span-5 lg:text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Founder-side · Product · Engineering · GTM
                </p>
                <a
                  href={requestHref}
                  className="group mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-card border border-rule px-5 text-[14px] font-medium text-ink transition-colors hover:bg-surface"
                >
                  Request references
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
