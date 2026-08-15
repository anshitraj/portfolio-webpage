'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type LightboxItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  caption?: string;
  meta?: string;
};

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const reduced = useReducedMotion();
  const open = index !== null;
  const item = open ? items[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-paper/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption ?? 'Image viewer'}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-ink transition-colors hover:bg-ink/[0.06]"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-pill border border-rule bg-paper text-ink transition-colors hover:bg-ink/[0.06] sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
            ) : null}

            <motion.div
              key={item.id}
              layoutId={reduced ? undefined : `gallery-${item.id}`}
              className="relative max-h-full w-auto"
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 32 }}
            >
              <Image
                src={item.src}
                alt={item.caption ?? ''}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw, 90vw"
                className="max-h-[75vh] w-auto rounded-card border border-rule object-contain"
                priority
              />
            </motion.div>

            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-pill border border-rule bg-paper text-ink transition-colors hover:bg-ink/[0.06] sm:right-4"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            ) : null}
          </div>

          {item.caption ? (
            <div className="shrink-0 border-t border-rule px-4 py-4 sm:px-6">
              <p className="mx-auto max-w-prose text-[14px] leading-relaxed text-ink">{item.caption}</p>
              {item.meta ? (
                <p className="mx-auto mt-1 max-w-prose font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {item.meta}
                </p>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
