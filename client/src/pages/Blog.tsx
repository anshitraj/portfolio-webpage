import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { blogPosts } from '@/content/blog';

export default function Blog() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500">// Logs</p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">System logs</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Thoughts on architecture, Web3, and the future.</p>
        </header>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-6 transition-colors hover:border-zinc-300/90 dark:border-white/20 md:p-8"
            >
              <Link href={`/blog/${post.slug}`} className="block magnet-target">
                <div className="mb-4 flex items-center gap-4 font-mono text-xs text-zinc-600 dark:text-zinc-500">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-600" />
                  <span className="text-zinc-600 dark:text-zinc-400">{post.readTime}</span>
                </div>

                <h2 className="mb-3 text-2xl font-bold text-zinc-950 dark:text-white transition-colors group-hover:text-sky-400">
                  {post.title}
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
