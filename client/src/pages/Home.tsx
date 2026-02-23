import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Activity, Users, Star, Code, Terminal, Briefcase } from 'lucide-react';
import { projects } from '@/content/projects';

export default function Home() {
  const metrics = [
    { label: 'Cumulative Users', value: '1,000+', icon: Users },
    { label: 'X Followers', value: '21.4k', icon: Star },
    { label: 'Project Signups', value: '1,500+', icon: Activity },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-16 md:gap-24 items-center justify-center min-h-[80vh]">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto mt-12">
          <div className="flex flex-col items-center gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest"
            >
              SYSTEM STATUS: ONLINE | USER: anshit.raj.yadav
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2">
              Anshit Raj Yadav
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary tracking-tight">
              Builder of Systems, Products & Experiments
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build real products used by real users — from stablecoin payment infrastructure and encrypted ledgers to gamified consumer apps and AI-powered commerce systems.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/projects" 
              className="px-8 py-4 rounded-xl font-bold bg-primary text-white shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-2 magnet-target"
            >
              Explore My Work <Code className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-xl font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 magnet-target"
            >
              Open Terminal <Terminal className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="pt-8 font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase"
          >
            ROLE: BUILDER / FOUNDER / ENGINEER
          </motion.div>
        </section>

        {/* Metrics Strip */}
        <motion.section 
          className="w-full glass-panel rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
                <m.icon className="w-6 h-6 text-secondary mb-4 opacity-50" />
                <h3 className="text-5xl font-black text-white tracking-tighter mb-2">{m.value}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects preview */}
        <section className="w-full space-y-10 mb-20">
          <div className="flex items-end justify-between border-b border-white/5 pb-6">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Recent Deployments</h2>
              <p className="text-muted-foreground font-mono text-sm mt-1">Proof of work / Production products</p>
            </div>
            <Link href="/projects" className="text-primary hover:text-white transition-colors flex items-center gap-2 font-bold magnet-target">
              View All Systems <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 hover:border-primary/50 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex gap-2 mb-3">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md bg-white/10 text-white backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 max-w-md">{p.description}</p>
                  <Link 
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors magnet-target"
                  >
                    Open Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
