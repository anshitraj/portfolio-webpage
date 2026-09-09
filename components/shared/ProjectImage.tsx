import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { MediaProject } from '@/data/types';

/**
 * Product screenshot, or a typographic monogram tile when there isn't one.
 *
 * Screenshots are wide (≈2:1) and the card is 16:9, so they are *contained*
 * rather than cropped — cropping cut the left edge off every hero and made the
 * shots look broken. Contained on a surface background reads as a framed
 * product shot instead.
 *
 * The old site filled the gaps with Unsplash stock, which is filler. A plain
 * typographic tile is honest: it says "no screenshot" rather than pretending.
 */
export function ProjectImage({
  project,
  sizes,
  priority = false,
  className,
  imgClassName,
}: {
  project: MediaProject;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const hasImage = Boolean(project.image) && project.hasRealImage !== false;

  if (!hasImage) {
    return (
      <div
        className={cn(
          'relative flex h-full w-full flex-col justify-between overflow-hidden bg-surface p-5',
          className
        )}
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 9px)',
          }}
        />
        <span className="relative font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {project.subtitle}
        </span>
        <span className="relative font-mono text-4xl font-medium tracking-tight text-ink/25 sm:text-5xl">
          {project.title
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 3)
            .toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative h-full w-full bg-surface p-2 sm:p-3', className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[3px]">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          sizes={sizes}
          preload={priority}
          className={cn('object-contain object-center', imgClassName)}
        />
      </div>
    </div>
  );
}
