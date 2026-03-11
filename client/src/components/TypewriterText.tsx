import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TypewriterTextProps = {
  text: string;
  start: boolean;
  delayMs?: number;
  speedMs?: number;
  className?: string;
  showCursor?: boolean;
};

export function TypewriterText({
  text,
  start,
  delayMs = 0,
  speedMs = 22,
  className,
  showCursor = true,
}: TypewriterTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!start) {
      setOutput('');
      return;
    }

    if (shouldReduceMotion) {
      setOutput(text);
      return;
    }

    let index = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setOutput(text.slice(0, index));

        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, speedMs);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, start, delayMs, speedMs, shouldReduceMotion]);

  return (
    <p className={cn('whitespace-pre-wrap', className)}>
      {output}
      {showCursor && start ? <span className="terminal-cursor text-[#00ff9c]">_</span> : null}
    </p>
  );
}
