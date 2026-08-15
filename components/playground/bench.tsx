import { cn } from '@/lib/utils';

/** Mounted panel with corner screws — the base surface for every bench module. */
export function Panel({
  children,
  className,
  screws = true,
}: {
  children: React.ReactNode;
  className?: string;
  screws?: boolean;
}) {
  return (
    <div className={cn('bench-panel relative rounded-[5px]', className)}>
      {screws ? (
        <>
          <span className="bench-screw left-2 top-2" aria-hidden />
          <span className="bench-screw right-2 top-2" aria-hidden />
          <span className="bench-screw bottom-2 left-2" aria-hidden />
          <span className="bench-screw bottom-2 right-2" aria-hidden />
        </>
      ) : null}
      {children}
    </div>
  );
}

/** Section label: an engraved strip across the bench. */
export function BenchLabel({
  index,
  title,
  hint,
}: {
  index: string;
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[rgb(var(--bench-edge))] pb-3">
      <span className="font-mono text-[11px] tabular-nums text-[rgb(var(--signal))]">{index}</span>
      <h2 className="font-mono text-[13px] uppercase tracking-[0.22em] text-[rgb(var(--bench-text))]">
        {title}
      </h2>
      {hint ? (
        <span className="ml-auto font-mono text-[11px] text-[rgb(var(--bench-dim))]">{hint}</span>
      ) : null}
    </div>
  );
}

export function Dim({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('text-[rgb(var(--bench-dim))]', className)}>{children}</span>;
}
