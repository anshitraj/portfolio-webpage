import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { writing } from '@/data/writing';
import { tweets } from '@/data/tweets';
import { formatDate } from '@/lib/utils';
import { SITE } from '@/data/site';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

export function Writing() {
  const posts = writing.slice(0, 4);
  if (posts.length === 0 && tweets.length === 0) return null;

  return (
    <Section>
      <div className="shell">
        {posts.length > 0 ? (
          <>
            <Reveal>
              <SectionHeader
                eyebrow="Writing"
                title="Notes from inside the build."
                action={writing.length > 4 ? { label: 'All posts', href: '/blog' } : undefined}
              />
            </Reveal>

            <Reveal className="mt-12 border-t border-rule" staggerChildren>
              {posts.map((post) => (
                <RevealItem key={post.slug} as="article" className="border-b border-rule">
                  <Link
                    href={post.externalUrl ?? `/blog/${post.slug}`}
                    target={post.externalUrl ? '_blank' : undefined}
                    rel={post.externalUrl ? 'noreferrer' : undefined}
                    className="group grid gap-x-8 gap-y-2 py-6 sm:grid-cols-12"
                  >
                    <div className="flex items-baseline gap-3 sm:col-span-3">
                      <time
                        dateTime={post.date}
                        className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>

                    <div className="sm:col-span-9">
                      <h3 className="flex items-start gap-1.5 text-[17px] font-semibold leading-snug tracking-tight text-ink">
                        <span className="link-underline">{post.title}</span>
                        <ArrowUpRight
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          aria-hidden
                        />
                      </h3>
                      <p className="mt-1.5 max-w-prose text-[14px] leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <span className="mt-2 inline-block font-mono text-[11px] text-muted">
                        {post.readTime}
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </Reveal>
          </>
        ) : null}

        {/* Tweets — static cards, no third-party embed script. */}
        {tweets.length > 0 ? (
          <Reveal className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">From X</p>
                <h2 className="mt-3 text-title font-semibold text-ink">Shorter thoughts.</h2>
              </div>
              <a
                href={SITE.socials.x}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex shrink-0 items-center gap-1 text-[13.5px] font-medium text-ink"
              >
                Follow
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tweets.map((t) => (
                <li key={t.id}>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col rounded-card border border-rule bg-surface p-5 transition-colors hover:border-ink/25"
                  >
                    <p className="text-[14px] leading-relaxed text-ink">{t.text}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <span className="font-mono text-[11px] text-muted">
                        {formatDate(t.date)}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
