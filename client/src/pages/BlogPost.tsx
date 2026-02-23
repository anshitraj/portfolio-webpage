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
          <h1 className="text-4xl font-bold text-white mb-4">Log Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">Return to Logs</Link>
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
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors magnet-target w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Logs
        </Link>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl">
          <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 pb-8 border-b border-white/10">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="text-secondary">{post.readTime}</span>
          </div>
          
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-muted-foreground prose-strong:text-secondary prose-code:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.article>
    </Layout>
  );
}
