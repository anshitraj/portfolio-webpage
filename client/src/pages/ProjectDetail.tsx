import { Layout } from '@/components/Layout';
import { useRoute, Link } from 'wouter';
import { projects } from '@/content/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, X, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:slug');
  const project = projects.find(p => p.slug === params?.slug);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const goPrev = useCallback(() => {
    if (lightboxIdx === null || !project?.screenshots) return;
    setLightboxIdx((lightboxIdx - 1 + project.screenshots.length) % project.screenshots.length);
  }, [lightboxIdx, project?.screenshots]);
  const goNext = useCallback(() => {
    if (lightboxIdx === null || !project?.screenshots) return;
    setLightboxIdx((lightboxIdx + 1) % project.screenshots.length);
  }, [lightboxIdx, project?.screenshots]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx, closeLightbox, goPrev, goNext]);

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

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

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

          {/* Screenshots gallery */}
          {hasScreenshots && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="h-4 w-4 text-zinc-500" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-500">
                  App Screenshots
                </h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {project.screenshots!.map((src, i) => (
                  <motion.button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIdx(i)}
                    className="group relative flex-none snap-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    {/* Phone frame mockup */}
                    <div className="relative w-[160px] sm:w-[180px] md:w-[200px] rounded-[24px] border-[3px] border-zinc-300 dark:border-zinc-600 bg-black p-[3px] shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-sky-500/10 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 group-hover:-translate-y-1">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[6px] bg-zinc-300 dark:bg-zinc-600 rounded-b-lg z-10" />
                      <div className="overflow-hidden rounded-[20px]">
                        <img
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    {/* Label */}
                    <p className="mt-2 text-center text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-600">
                      s{i + 1}
                    </p>
                  </motion.button>
                ))}
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-600">
                Click any screenshot to view full size
              </p>
            </div>
          )}

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

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxIdx !== null && hasScreenshots && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 rounded-full bg-zinc-900/80 p-2 text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-50 rounded-full bg-zinc-900/80 p-3 text-white hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              className="relative max-h-[85vh] max-w-[90vw] sm:max-w-[400px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-[28px] border-[4px] border-zinc-700 bg-black p-[4px] shadow-2xl shadow-sky-500/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[7px] bg-zinc-700 rounded-b-lg z-10" />
                <img
                  src={project.screenshots![lightboxIdx]}
                  alt={`${project.title} screenshot ${lightboxIdx + 1}`}
                  className="w-full h-auto rounded-[24px]"
                />
              </div>
              <p className="mt-3 text-center text-xs font-mono text-zinc-400">
                {lightboxIdx + 1} / {project.screenshots!.length}
              </p>
            </motion.div>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-50 rounded-full bg-zinc-900/80 p-3 text-white hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
