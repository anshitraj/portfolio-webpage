import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Activity, Users, Star } from 'lucide-react';
import { projects } from '@/content/projects';

export default function Home() {
  const metrics = [
    { label: 'Active Users', value: '1,000+', icon: Users },
    { label: 'Followers', value: '21.4k', icon: Star },
    { label: 'System Uptime', value: '99.9%', icon: Activity },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-16 md:gap-24 items-center justify-center min-h-[80vh]">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-mono mb-4"
          >
            SYSTEM STATUS: ONLINE
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary text-glow">The Future</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build high-performance distributed systems, Web3 protocols, and immersive digital experiences. Explore my logs, inspect my architecture, or interface directly via the terminal.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/projects" 
              className="px-8 py-4 rounded-xl font-bold bg-primary text-white shadow-[0_0_20px_rgba(138,43,226,0.4)] hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] hover:-translate-y-1 transition-all flex items-center gap-2 magnet-target"
            >
              Initialize Sequence <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-xl font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all magnet-target"
            >
              Access Terminal
            </Link>
          </motion.div>
        </section>

        {/* Metrics Strip */}
        <motion.section 
          className="w-full glass-panel rounded-2xl p-6 md:p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
                <m.icon className="w-8 h-8 text-secondary mb-3 opacity-80" />
                <h3 className="text-4xl font-black text-white tracking-tighter text-glow-cyan">{m.value}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects preview */}
        <section className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Recent Deployments</h2>
            <Link href="/projects" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm magnet-target">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                className="glass-panel p-6 rounded-2xl group hover:border-primary/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{p.title}</h3>
                  <div className="flex gap-2">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded bg-white/5 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 line-clamp-2">{p.description}</p>
                <Link 
                  href={`/projects/${p.slug}`}
                  className="text-sm font-bold text-secondary flex items-center gap-2 hover:text-white transition-colors magnet-target w-fit"
                >
                  Access Protocol <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
