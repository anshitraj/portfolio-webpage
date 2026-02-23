import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { blogPosts } from '@/content/blog';

export default function Blog() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold text-white mb-2">System Logs</h1>
          <p className="text-muted-foreground">Thoughts on architecture, Web3, and the future.</p>
        </header>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-panel p-6 md:p-8 rounded-2xl group hover:bg-card/60 transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block magnet-target">
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span className="text-secondary">{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors mb-3">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground">
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
