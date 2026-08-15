import Image from 'next/image';
import { cn } from '@/lib/utils';

const SIZES = {
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-9 w-9 text-[11px]',
  lg: 'h-11 w-11 text-[13px]',
} as const;

const PX = { sm: 28, md: 36, lg: 44 } as const;

/**
 * Square brand mark for a project or company.
 *
 * Falls back to an initials monogram when no logo file exists, so a missing
 * asset degrades to something deliberate rather than a broken image.
 */
export function BrandMark({
  src,
  name,
  monogram,
  size = 'md',
  className,
}: {
  src?: string;
  name: string;
  monogram?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const initials =
    monogram ??
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  if (!src) {
    return (
      <span
        aria-hidden
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-pill border border-rule bg-surface font-mono font-medium text-muted',
          SIZES[size],
          className
        )}
      >
        {initials}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={PX[size]}
      height={PX[size]}
      className={cn(
        'shrink-0 rounded-pill border border-rule object-cover',
        SIZES[size].split(' ').slice(0, 2).join(' '),
        className
      )}
    />
  );
}
