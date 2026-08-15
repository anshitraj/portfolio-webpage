import { selectedProjects, experimentProjects } from '@/data/projects';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/SectionHeader';
import { BuildIndex, type BuildIndexEntry } from './BuildIndex';

const moreProjects = [...selectedProjects, ...experimentProjects];

const entries: BuildIndexEntry[] = moreProjects.map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  image: p.image,
  hasRealImage: p.hasRealImage,
  video: p.video,
  oneLiner: p.oneLiner,
  tags: p.tags,
  year: p.year,
}));

export function MoreWork() {
  return (
    <Section>
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Build archive</p>
              <h2 className="mt-3 text-title font-semibold text-ink">The build archive.</h2>
              <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">
                Experiments, utilities and products that didn&apos;t need a full case study.
              </p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {entries.length} builds
            </p>
          </div>
        </Reveal>

        <Reveal staggerChildren>
          <BuildIndex entries={entries} />
        </Reveal>
      </div>
    </Section>
  );
}
