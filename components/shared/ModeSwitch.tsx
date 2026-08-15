'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const MODES = [
  { label: 'Work', href: '/' },
  { label: 'Playground', href: '/playground' },
] as const;

/**
 * Official ↔ Playground. Official is always the default landing experience;
 * this is a link, not a persisted preference.
 */
export function ModeSwitch({ className, id = 'nav' }: { className?: string; id?: string }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const activeIndex = pathname?.startsWith('/playground') ? 1 : 0;

  return (
    <div
      className={cn(
          'relative inline-flex shrink-0 items-center rounded-pill border border-rule bg-surface p-[3px]',
        className
      )}
    >
      {MODES.map((mode, i) => {
        const active = i === activeIndex;
        return (
          <Link
            key={mode.href}
            href={mode.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              // Tap target: 32px tall on touch, comfortably wide. The pill is a
              // primary control and must not be a 20px sliver on a phone.
              'relative z-10 inline-flex min-h-[32px] items-center rounded-[3px] px-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200',
              active ? 'text-paper' : 'text-muted hover:text-ink'
            )}
          >
            {active && (
              <motion.span
                layoutId={`mode-switch-${id}`}
                className="absolute inset-0 -z-10 rounded-[3px] bg-ink"
                transition={
                  reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                }
              />
            )}
            {mode.label}
          </Link>
        );
      })}
    </div>
  );
}
