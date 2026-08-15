import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/types';

/**
 * Monochrome by design — status is carried by fill weight, not hue.
 *
 *   BUILDING     solid ink      the loudest thing: actively being worked on
 *   LIVE         outlined ink   shipped and running
 *   BETA / OSS   hairline rule  real, but quieter
 *   ARCHIVED     muted text     present for the record
 */
const STYLES: Record<ProjectStatus, string> = {
  BUILDING: 'border-ink bg-ink text-paper',
  LIVE: 'border-ink text-ink',
  BETA: 'border-rule bg-ink/[0.04] text-ink',
  'OPEN SOURCE': 'border-rule bg-ink/[0.04] text-ink',
  ARCHIVED: 'border-transparent text-muted',
};

export function StatusPill({
  status,
  className,
  pulse = false,
}: {
  status: ProjectStatus;
  className?: string;
  pulse?: boolean;
}) {
  const live = status === 'BUILDING' || status === 'LIVE';
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-pill border px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.12em]',
        STYLES[status],
        className
      )}
    >
      {pulse && live ? (
        // Uses currentColor so it reads on both the filled and outlined pill.
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      ) : null}
      {status}
    </span>
  );
}
