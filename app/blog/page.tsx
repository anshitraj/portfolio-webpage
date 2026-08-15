import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { writing } from '@/data/writing';
import { formatDate } from '@/lib/utils';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on payment infrastructure, AI agent authorisation, marketplaces and encrypted computation by Anshit Raj Yadav.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 sm:pt-32">
        <div className="shell pb-20">
          <Reveal>
            <p className="eyebrow">Writing</p>
            <h1 className="mt-4 max-w-[16ch] text-display font-semibold text-ink">
              Notes from inside the build.
            </h1>
            <p className="mt-6 max-w-prose text-lede text-muted">
              Things I only understood after shipping them.
            </p>
          </Reveal>

          <Reveal className="mt-14 border-t border-rule" staggerChildren>
            {writing.map((post) => (
              <RevealItem key={post.slug} as="article" className="border-b border-rule">
                <Link
                  href={post.externalUrl ?? `/blog/${post.slug}`}
                  target={post.externalUrl ? '_blank' : undefined}
                  rel={post.externalUrl ? 'noreferrer' : undefined}
                  className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-12"
                >
                  <time
                    dateTime={post.date}
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted sm:col-span-3"
                  >
                    {formatDate(post.date)}
                  </time>

                  <div className="sm:col-span-9">
                    <h2 className="flex items-start gap-1.5 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                      <span className="link-underline">{post.title}</span>
                      <ArrowUpRight
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </h2>
                    <p className="mt-2 max-w-prose text-[14.5px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-2.5 inline-block font-mono text-[11px] text-muted">
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
