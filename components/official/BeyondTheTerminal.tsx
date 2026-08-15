import { Boxes, Code2, Dumbbell, Trophy, Users, Zap } from 'lucide-react';
import { beyond } from '@/data/beyond';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { Section, SectionHeader } from '@/components/shared/SectionHeader';

/** One mark per entry so the list scans as cards rather than a wall of prose. */
const ICONS = [Trophy, Dumbbell, Zap, Users, Code2, Boxes];

export function BeyondTheTerminal() {
  return (
    <Section>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Beyond the terminal"
            title="The parts that don’t compile."
            standfirst="Most of what I know about shipping under pressure I learned somewhere other than an editor."
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3" staggerChildren>
          {beyond.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <RevealItem key={b.title} className="group bg-paper p-6 transition-colors hover:bg-surface">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-card border border-rule text-accent">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{b.detail}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
