import { Link, useLocation } from 'wouter';
import {
  Home,
  LayoutGrid,
  Briefcase,
  BookOpen,
  FileText,
  Terminal,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { SITE } from '@/content/siteProfile';

const dockItems: {
  type: 'route' | 'external';
  path: string;
  label: string;
  icon: typeof Home;
}[] = [
  { type: 'route', path: '/', label: 'Home', icon: Home },
  { type: 'route', path: '/projects', label: 'Projects', icon: LayoutGrid },
  { type: 'route', path: '/experience', label: 'Experience', icon: Briefcase },
  { type: 'route', path: '/blog', label: 'Logs', icon: BookOpen },
  { type: 'route', path: '/resume', label: 'Resume', icon: FileText },
  { type: 'route', path: '/contact', label: 'Contact', icon: Terminal },
  { type: 'external', path: SITE.githubUrl, label: 'GitHub', icon: Github },
  { type: 'external', path: SITE.linkedinUrl, label: 'LinkedIn', icon: Linkedin },
  { type: 'external', path: SITE.xUrl, label: 'X', icon: Twitter },
];

export function FloatingDock() {
  const [location] = useLocation();

  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="pointer-events-auto flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-1 overflow-x-auto rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/90 px-2 py-2 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-md dark:bg-zinc-950/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] sm:max-w-none sm:flex-nowrap sm:gap-1.5 sm:px-3"
        aria-label="Primary navigation"
      >
        {dockItems.map((item) => {
          const active = item.type === 'route' && location === item.path;
          const Icon = item.icon;
          const base =
            'flex h-11 w-11 items-center justify-center rounded-full transition-colors sm:h-12 sm:w-12';
          const cls = active
            ? `${base} bg-zinc-900 text-white dark:bg-white dark:text-black`
            : `${base} text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/90 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white`;

          if (item.type === 'external') {
            return (
              <a
                key={item.label}
                href={item.path}
                target="_blank"
                rel="noreferrer"
                className={cls}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          }

          return (
            <Link key={item.path} href={item.path} className={cls} aria-label={item.label}>
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
