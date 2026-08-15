import { Download } from 'lucide-react';
import { PRIMARY_RESUME, TARGET_ROLES } from '@/data/resumes';
import { Magnetic } from '@/components/shared/Magnetic';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/SectionHeader';
import { ResumeMenu } from './ResumeMenu';

export function Resume() {
  return (
    <Section id="resume">
      <div className="shell">
        {/* Resume */}
        <Reveal className="max-w-5xl">
          <p className="eyebrow">Resume</p>
          <h2 className="mt-3 max-w-[18ch] text-title font-semibold text-ink">
            Different seats. Same operating system.
          </h2>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">
            Engineering is the core. Product judgment, distribution and founder-side execution
            are the leverage around it. The same work can be read through several hiring lenses.
          </p>

          <ul className="mt-7 grid gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-3">
            {TARGET_ROLES.map((role) => (
              <li key={role.label} className="bg-paper p-4">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                  {role.label}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  {role.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-start gap-2.5">
            <Magnetic>
              <a
                href={PRIMARY_RESUME.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-card bg-ink px-5 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" aria-hidden />
                {PRIMARY_RESUME.label}
              </a>
            </Magnetic>

            <ResumeMenu />
          </div>
        </Reveal>

      </div>
    </Section>
  );
}
