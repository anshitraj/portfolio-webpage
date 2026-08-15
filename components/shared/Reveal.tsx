'use client';

import { motion, useReducedMotion } from 'motion/react';
import { riseIn, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of animating as one block. */
  staggerChildren?: boolean;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'ul';
};

/**
 * Section entrance. Renders children unanimated when the user has asked for
 * reduced motion, so nothing depends on the animation completing.
 */
export function Reveal({
  children,
  className,
  staggerChildren = false,
  delay = 0,
  as = 'div',
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerChildren ? stagger(delay) : riseIn}
      transition={delay && !staggerChildren ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/** Child of a `staggerChildren` Reveal. */
export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={riseIn}>
      {children}
    </MotionTag>
  );
}
