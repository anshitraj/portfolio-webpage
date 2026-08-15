import type { Project } from '@/data/types';
import { Reveal } from '@/components/shared/Reveal';

/** A titled prose block. Renders nothing when the field is empty. */
export function Block({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <Reveal className="border-t border-rule py-8 sm:py-10">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
        <h2 className="eyebrow lg:col-span-3 lg:pt-1">{label}</h2>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </Reveal>
  );
}

export function Prose({ children }: { children: string }) {
  return <p className="max-w-prose text-[15.5px] leading-[1.7] text-muted">{children}</p>;
}

/** Numbered flow — the architecture/product path through the system. */
export function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3.5 bg-paper p-4">
          <span
            className="mt-px shrink-0 font-mono text-[11px] tabular-nums text-accent"
            aria-hidden
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-[14px] leading-snug text-ink">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function RoleList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((r) => (
        <li key={r} className="relative border-b border-rule py-2.5 pl-4 text-[14.5px] text-ink">
          <span className="absolute left-0 top-[1.15em] h-1 w-1 rounded-full bg-accent" aria-hidden />
          {r}
        </li>
      ))}
    </ul>
  );
}

export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-pill border border-rule px-2.5 py-1 font-mono text-[11.5px] text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Arc Pass — the two credentials and their tier ladder. */
export function Credentials({ project }: { project: Project }) {
  if (!project.credentials?.length) return null;

  return (
    <div className="space-y-8">
      <div className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
        {project.credentials.map((c) => (
          <div key={c.name} className="bg-paper p-5">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              {c.name}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink">{c.description}</p>
            <ul className="mt-4 space-y-1.5">
              {c.points.map((p) => (
                <li key={p} className="relative pl-4 text-[13.5px] leading-snug text-muted">
                  <span
                    className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-rule"
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {project.credentialTiers?.length ? (
        <div>
          <p className="eyebrow">Builder Pass tiers</p>
          <ol className="mt-4 border-t border-rule">
            {project.credentialTiers.map((t, i) => (
              <li
                key={t.name}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule py-3"
              >
                <span className="font-mono text-[11px] tabular-nums text-muted" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="w-20 font-mono text-[12.5px] uppercase tracking-[0.1em] text-ink">
                  {t.name}
                </span>
                <span className="flex-1 text-[13.5px] text-muted">{t.requirement}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
