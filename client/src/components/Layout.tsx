import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useGamification } from '@/hooks/use-gamification';
import { CustomCursor } from './CustomCursor';
import { AnimatedBackground } from './AnimatedBackground';
import {
  Terminal,
  Code,
  User,
  BookOpen,
  Trophy,
  Linkedin,
  Github,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { progress, visitSection } = useGamification();
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
        className: 'bg-card border-primary text-primary-foreground',
      });
    };

    window.addEventListener('badge-unlocked', handleBadge);
    return () => window.removeEventListener('badge-unlocked', handleBadge);
  }, [toast]);

  const navItems = [
    { path: '/', label: 'Index', icon: <User className="h-4 w-4" /> },
    { path: '/experience', label: 'Experience', icon: <BookOpen className="h-4 w-4" /> },
    { path: '/projects', label: 'Projects', icon: <Code className="h-4 w-4" /> },
    { path: '/blog', label: 'Logs', icon: <BookOpen className="h-4 w-4" /> },
    { path: '/achievements', label: 'Badges', icon: <Trophy className="h-4 w-4" /> },
    { path: '/contact', label: 'Terminal', icon: <Terminal className="h-4 w-4" /> },
  ];

  return (
    <>
      <CustomCursor />
      <AnimatedBackground />

      <div className="flex min-h-screen flex-col">
        {/* Top Progress Bar */}
        <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_10px_rgba(138,43,226,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Navigation */}
        <header className="fixed left-0 right-0 top-0 z-40 border-b-0 border-t-0 px-4 py-3 glass-panel md:px-6 md:py-4 xl:px-8">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5">
            <Link href="/" className="min-w-0 magnet-target">
              <span className="block truncate font-mono text-base font-bold tracking-tight text-glow-cyan text-white sm:text-lg">
                Anshit Raj Yadav
              </span>
              <span className="block font-mono text-[10px] font-semibold tracking-[0.25em] text-primary sm:text-xs">
                SYS_ADMIN
              </span>
            </Link>

            <nav className="hidden min-w-0 items-center justify-center gap-1 lg:flex xl:gap-4">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-label={item.label}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium transition-colors magnet-target xl:gap-2 ${
                    location === item.path ? 'text-primary text-glow' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-2">
              <div className="hidden whitespace-nowrap font-mono text-xs text-muted-foreground 2xl:block">
                X Followers: <span className="text-secondary">21.4k</span>
              </div>

              <a
                href="https://linkedin.com/in/anshitraj"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-white magnet-target xl:inline-flex"
              >
                <Linkedin className="h-3 w-3" />
                <span className="hidden 2xl:inline">LinkedIn</span>
              </a>

              <a
                href="https://github.com/anshitraj"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-white magnet-target xl:inline-flex"
              >
                <Github className="h-3 w-3" />
                <span className="hidden 2xl:inline">GitHub</span>
              </a>

              <Link
                href="/resume"
                className="inline-flex whitespace-nowrap rounded-lg border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white box-glow magnet-target md:px-4 md:py-2 md:text-sm"
              >
                RESUME
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Nav Bar (Bottom) */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-b-0 p-4 pb-safe glass-panel lg:hidden">
          {navItems.slice(0, 5).map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 ${
                location === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-24 md:px-8 md:pb-8">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </>
  );
}
