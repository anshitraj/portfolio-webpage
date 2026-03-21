import { Layout } from '@/components/Layout';
import { useRoute, Link } from 'wouter';
import { blogPosts } from '@/content/blog';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const post = blogPosts.find(p => p.slug === params?.slug);

  if (!post) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-4xl font-bold text-zinc-950 dark:text-white mb-4">Log Not Found</h1>
          <Link href="/blog" className="text-sky-400 hover:underline">
            Return to Logs
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.article 
        className="max-w-3xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blog"
          className="magnet-target inline-flex w-fit items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Logs
        </Link>

        <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-8 md:p-12">
          <div className="mb-8 flex items-center gap-4 border-b border-zinc-200/80 dark:border-white/10 pb-8 font-mono text-sm text-zinc-600 dark:text-zinc-500">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="text-zinc-600 dark:text-zinc-400">{post.readTime}</span>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200 prose-code:text-sky-600 dark:prose-code:text-sky-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.article>
    </Layout>
  );
}
