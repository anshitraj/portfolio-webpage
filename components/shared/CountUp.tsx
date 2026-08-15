'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { parseMetric, formatMetricNumber } from '@/lib/metrics';

/**
 * Counts a metric up the first time it enters the viewport.
 *
 * Handles the awkward shapes in the dataset — "1,500+", "₹80,000+", "0 → 200K",
 * "$200K+" — by animating only the trailing number and leaving its prefix and
 * suffix intact. Values with no number ("Listed") render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(() => {
    if (!parsed || reduced) return value;
    return `${parsed.prefix}${formatMetricNumber(0, parsed.decimals, value)}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed || reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const duration = 900;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, settles precisely on the target.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(
        `${parsed.prefix}${formatMetricNumber(parsed.target * eased, parsed.decimals, value)}${parsed.suffix}`
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `parsed` is derived from `value`; tracking value alone is correct.
  }, [inView, value, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
