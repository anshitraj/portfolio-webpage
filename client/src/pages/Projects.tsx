import React from 'react';
import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { projects } from '@/content/projects';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-white mb-2">Deployments</h1>
          <p className="text-muted-foreground">
            Systems, products, and infra across payments, agentic AI, dashboards, and blockchain.
          </p>
        </header>

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
      </div>
    </Layout>
  );
}
