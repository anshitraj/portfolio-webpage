'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RESUME_VARIANTS } from '@/data/resumes';
import { cn } from '@/lib/utils';

/**
 * Disclosure for the role-specific resume variants.
 *
 * Deliberately hand-rolled rather than pulling in a menu library: this is a
 * list of four links, and the dependency cost more than the behaviour is worth.
 * Escape closes, outside-click closes, focus returns to the trigger.
 */
export function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="resume-variants"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-card border border-rule px-5 text-[14px] font-medium text-ink transition-colors hover:bg-ink/[0.04]"
      >
        Role-specific versions
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <ul
        id="resume-variants"
        hidden={!open}
        className="absolute left-0 top-[calc(100%+8px)] z-40 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-card border border-rule bg-paper shadow-lg"
      >
        {RESUME_VARIANTS.map((v) => (
          <li key={v.id} className="border-b border-rule last:border-b-0">
            {v.href ? (
              <a
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-surface focus-visible:bg-surface"
              >
                <span className="text-[13.5px] font-medium text-ink">{v.label}</span>
                <span className="text-[12px] text-muted">{v.description}</span>
              </a>
            ) : (
              <div className="flex cursor-not-allowed flex-col gap-0.5 px-4 py-3 opacity-55">
                <span className="flex items-center justify-between gap-2 text-[13.5px] font-medium text-ink">
                  {v.label}
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    On request
                  </span>
                </span>
                <span className="text-[12px] text-muted">{v.description}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
