import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useGamification } from '@/hooks/use-gamification';
import { useToast } from '@/hooks/use-toast';
import { FloatingDock } from '@/components/FloatingDock';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SITE } from '@/content/siteProfile';

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { visitSection } = useGamification();
  const { toast } = useToast();

  useEffect(() => {
    visitSection(location);
  }, [location, visitSection]);

  useEffect(() => {
    const handleBadge = (e: Event) => {
      const badge = (e as CustomEvent).detail;
      toast({
        title: 'Achievement Unlocked!',
        description: `You earned the [${badge}] badge.`,
        className: 'bg-zinc-200/90 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 text-zinc-950 dark:text-white',
      });
    };

    window.addEventListener('badge-unlocked', handleBadge);
    return () => window.removeEventListener('badge-unlocked', handleBadge);
  }, [toast]);

  return (
    <div className="portfolio-root min-h-screen bg-zinc-50 text-zinc-950 selection:bg-zinc-300/35 dark:bg-black dark:text-white dark:selection:bg-white/20">
      {/* Subtle grid — light vs dark */}
      <div
        className="pointer-events-none fixed inset-0 z-0 block opacity-[0.45] dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden opacity-[0.35] dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-zinc-200/80 dark:border-white/5 bg-white/85 backdrop-blur-md dark:bg-black/80">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 md:px-8">
            <Link href="/" className="min-w-0">
              <span className="block truncate text-base font-semibold tracking-tight text-zinc-950 dark:text-white md:text-lg">
                {SITE.name}
              </span>
              <span className="block truncate text-xs text-zinc-600 dark:text-zinc-500">{SITE.tagline}</span>
            </Link>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <span className="hidden text-xs text-zinc-600 dark:text-zinc-500 sm:inline">
                X <span className="text-zinc-700 dark:text-zinc-300">{SITE.xFollowers}</span>
              </span>
              <Link
                href="/resume"
                className="rounded-full border border-zinc-300 dark:border-white/15 bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-200"
              >
                Resume
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-32 pt-8 md:px-8 md:pb-36 md:pt-12">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>

        <FloatingDock />
      </div>
    </div>
  );
}
