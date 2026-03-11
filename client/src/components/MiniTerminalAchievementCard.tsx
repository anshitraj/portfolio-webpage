import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';

type CardLine = {
  label: string;
  value: string;
};

type MiniTerminalAchievementCardProps = {
  title: string;
  module: string;
  lines: CardLine[];
  index: number;
  isInView: boolean;
  reducedMotion: boolean;
};

export function MiniTerminalAchievementCard({
  title,
  module,
  lines,
  index,
  isInView,
  reducedMotion,
}: MiniTerminalAchievementCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: reducedMotion ? 0.12 : 0.32,
        delay: reducedMotion ? 0 : index * 0.08,
      }}
      whileHover={reducedMotion ? undefined : { y: -3, scale: 1.01 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#00ff9c]/25 bg-[#020907]/95 shadow-[0_0_22px_rgba(0,255,156,0.1)] transition-colors hover:border-[#00ff9c]/50 sm:rounded-2xl"
    >
      <div className="flex items-center gap-2 border-b border-[#00ff9c]/20 px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
        </div>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[#6fffc2] sm:text-[11px] sm:tracking-[0.16em]">
          {title}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.06] terminal-scanlines sm:opacity-[0.09]" />

      <div className="relative z-10 flex flex-1 flex-col gap-1 px-2.5 py-3 sm:gap-1.5 sm:px-4 sm:py-3.5">
        <p className="truncate font-mono text-[10px] text-[#7fffc8]/80 sm:text-[11px]">{`> module:${module}`}</p>
        <TypewriterText
          text="> status: VERIFIED"
          start={isInView}
          delayMs={reducedMotion ? 0 : index * 90}
          speedMs={reducedMotion ? 0 : 14}
          className="font-mono text-[10px] text-[#00ff9c] terminal-green-glow sm:text-xs"
          showCursor={false}
        />

        {lines.map(line => (
          <p
            key={`${module}-${line.label}`}
            className="break-words font-mono text-[10px] leading-relaxed text-[#b4ffd9] sm:text-xs"
          >
            <span className="text-[#00ff9c]">{`> ${line.label}: `}</span>
            <span>{line.value}</span>
          </p>
        ))}
      </div>
    </motion.article>
  );
}
