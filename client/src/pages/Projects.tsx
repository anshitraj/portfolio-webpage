import React, { Suspense, useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { projects } from '@/content/projects';
import { Link } from 'wouter';
import { ArrowRight, LayoutGrid, Box } from 'lucide-react';

const Constellation = React.lazy(() => import('@/components/ProjectConstellation'));

export default function Projects() {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setViewMode('grid');
      } else {
        setIsMobile(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Deployments</h1>
            <p className="text-muted-foreground">Systems, protocols, and architectures I've built.</p>
          </div>
          
          {!isMobile && (
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setViewMode('3d')}
                className={`p-2 rounded-md transition-colors magnet-target ${viewMode === '3d' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                <Box className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors magnet-target ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          )}
        </header>

        {viewMode === '3d' && !isMobile ? (
          <Suspense fallback={
            <div className="w-full h-[600px] glass-panel rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Constellation />
          </Suspense>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col group hover:border-secondary/50 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/5 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{p.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
                  {p.metrics.map(m => (
                    <div key={m.label}>
                      <div className="text-lg font-bold text-white">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{m.label}</div>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href={`/projects/${p.slug}`}
                  className="mt-auto px-4 py-3 rounded-xl bg-white/5 text-sm font-bold text-center hover:bg-primary hover:text-white transition-colors magnet-target flex justify-center items-center gap-2"
                >
                  Inspect <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
