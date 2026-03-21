import { Layout } from '@/components/Layout';
import { projects } from '@/content/projects';
import { Link } from 'wouter';
import { ArrowRight, Github, Globe } from 'lucide-react';

export default function Projects() {
  return (
    <Layout>
      <div className="space-y-10 pb-8">
        <div>
          <span className="inline-block rounded-full border border-zinc-300/90 dark:border-white/20 bg-white px-3 py-1 text-xs font-semibold text-black">
            My projects
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">All deployments</h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Systems, products, GTM, and infra across payments, agentic AI, dashboards, and blockchain — same catalog as
            before, refreshed layout.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-950/40 transition-colors hover:border-zinc-300/90 dark:border-white/20"
            >
              <div className="aspect-[2/1] max-h-[140px] shrink-0 overflow-hidden bg-zinc-200/90 dark:bg-zinc-900 sm:max-h-[160px]">
                <img
                  src={p.image}
                  alt=""
                  className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div>
                  <h2 className="text-base font-bold leading-snug text-zinc-950 dark:text-white">{p.title}</h2>
                  {p.year ? <p className="text-xs text-zinc-600 dark:text-zinc-500">{p.year}</p> : null}
                </div>
                <p className="line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-700 dark:text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-zinc-200/80 dark:border-white/5 pt-3">
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-zinc-300/90 dark:border-white/20 px-3 py-1.5 text-[11px] font-semibold text-zinc-950 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-200/80 dark:hover:bg-white/10"
                    >
                      <Globe className="h-3 w-3" />
                      Website
                    </a>
                  ) : null}
                  {p.repoUrl ? (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-zinc-300/90 dark:border-white/20 px-3 py-1.5 text-[11px] font-semibold text-zinc-950 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-200/80 dark:hover:bg-white/10"
                    >
                      <Github className="h-3 w-3" />
                      Source
                    </a>
                  ) : null}
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-zinc-300 dark:hover:bg-zinc-200"
                  >
                    Case study
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
