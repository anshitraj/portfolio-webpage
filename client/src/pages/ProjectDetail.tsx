import { Layout } from '@/components/Layout';
import { useRoute, Link } from 'wouter';
import { projects } from '@/content/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:slug');
  const project = projects.find(p => p.slug === params?.slug);

  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-4xl font-bold text-white mb-4">404: Protocol Not Found</h1>
          <Link href="/projects" className="text-primary hover:underline">Return to Deployments</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors magnet-target w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Deployments
        </Link>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full mix-blend-screen"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(t => (
                <span key={t} className="text-xs uppercase font-mono px-3 py-1.5 rounded-md bg-white/10 text-white border border-white/5">
                  {t}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              {project.longDescription}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-black/40 border border-white/5 mb-10">
              {project.metrics.map(m => (
                <div key={m.label}>
                  <div className="text-2xl font-black text-glow-cyan text-white">{m.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{m.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all flex items-center gap-2 magnet-target"
                >
                  Live System <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => window.alert('Live demo link coming soon.')}
                  className="px-6 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all flex items-center gap-2 magnet-target"
                >
                  Live System <ExternalLink className="w-4 h-4" />
                </button>
              )}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 magnet-target"
                >
                  Repository <Github className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => window.alert('Source code is not publicly available.')}
                  className="px-6 py-3 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 magnet-target"
                >
                  Repository <Github className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
