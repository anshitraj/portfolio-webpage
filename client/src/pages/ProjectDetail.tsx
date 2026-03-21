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
          <h1 className="mb-4 text-4xl font-bold text-zinc-950 dark:text-white">Project not found</h1>
          <Link href="/projects" className="text-sky-400 hover:underline">
            Back to projects
          </Link>
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
        <Link
          href="/projects"
          className="magnet-target inline-flex w-fit items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-8 md:p-12">
          <div className="mb-6 aspect-video overflow-hidden rounded-xl border border-zinc-200/80 dark:border-white/10 bg-zinc-200/90 dark:bg-zinc-900">
            <img src={project.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-zinc-200/80 dark:border-white/10 bg-zinc-200/90 dark:bg-zinc-900 px-3 py-1.5 font-mono text-xs uppercase text-zinc-700 dark:text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mb-2 mt-6 text-4xl font-bold tracking-tight text-zinc-950 dark:text-white md:text-5xl">{project.title}</h1>
          {project.year ? <p className="text-sm text-zinc-600 dark:text-zinc-500">{project.year}</p> : null}

          <div className="mb-10 mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-500">What it does</h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">{project.description}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-500">How I built it</h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">{project.longDescription}</p>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-6 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-200/60 dark:bg-black/40 p-6 md:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-bold text-zinc-950 dark:text-white">{m.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-500">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="magnet-target inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-300 dark:hover:bg-zinc-200"
              >
                Live site <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => window.alert('Live demo link coming soon.')}
                className="rounded-full border border-zinc-300/90 dark:border-white/20 px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400"
              >
                Live site (soon)
              </button>
            )}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="magnet-target inline-flex items-center gap-2 rounded-full border border-zinc-300/90 dark:border-white/20 px-6 py-3 text-sm font-semibold text-zinc-950 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-200/80 dark:hover:bg-white/10"
              >
                Source <Github className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => window.alert('Source code is not publicly available.')}
                className="rounded-full border border-zinc-300/90 dark:border-white/20 px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400"
              >
                Source (private)
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
