import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Every section opens the same way: a mono eyebrow, a title, an optional
 * standfirst, and an optional action on the right. The repetition is the point —
 * it's what makes a long page scannable.
 */
export function SectionHeader({
  eyebrow,
  title,
  standfirst,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-title font-semibold text-ink">{title}</h2>
        {standfirst ? <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">{standfirst}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="link-underline group inline-flex shrink-0 items-center gap-1 text-[13.5px] font-medium text-ink"
        >
          {action.label}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      ) : null}
    </div>
  );
}

/**
 * Standard vertical rhythm + hairline separator between sections.
 *
 * `tone="dark"` makes the section a full-bleed inverted band. It remaps the
 * design tokens for everything inside, so children need no dark-mode variants
 * of their own.
 */
export function Section({
  id,
  children,
  className,
  divider = true,
  tone = 'default',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  tone?: 'default' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-16 sm:py-20 lg:py-24',
        dark ? 'tone-dark' : divider && 'border-t border-rule',
        className
      )}
    >
      {children}
    </section>
  );
}
