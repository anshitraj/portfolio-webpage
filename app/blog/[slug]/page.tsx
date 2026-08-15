import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { writing, getPost } from '@/data/writing';
import { formatDate } from '@/lib/utils';
import { SITE } from '@/data/site';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { Reveal } from '@/components/shared/Reveal';

export function generateStaticParams() {
  return writing.filter((p) => !p.externalUrl).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — ${SITE.name}`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main id="main" className="pt-28 sm:pt-32">
        <article className="shell pb-20">
          <Reveal>
            <Link
              href="/blog"
              className="link-underline inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All writing
            </Link>
          </Reveal>

          <Reveal className="mt-8 max-w-prose">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="h-px w-4 bg-rule" aria-hidden />
              <span>{post.readTime}</span>
            </p>
            <h1 className="mt-5 text-title font-semibold text-ink">{post.title}</h1>
            <p className="mt-4 text-lede text-muted">{post.excerpt}</p>
          </Reveal>

          <Reveal className="prose-editorial mt-12 max-w-prose border-t border-rule pt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
