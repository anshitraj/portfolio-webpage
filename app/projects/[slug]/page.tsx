import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { projects, getProject, toMedia } from '@/data/projects';
import { visible } from '@/lib/metrics';
import { cn } from '@/lib/utils';
import { SITE } from '@/data/site';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { StatusPill } from '@/components/shared/StatusPill';
// The case study keeps a still hero — it has a full player with sound further
// down, and autoplaying the same clip twice on one page is just noise.
import { ProjectImage } from '@/components/shared/ProjectImage';
import { Reveal } from '@/components/shared/Reveal';
import { CountUp } from '@/components/shared/CountUp';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import {
  Block,
  Prose,
  FlowDiagram,
  RoleList,
  TechList,
  Credentials,
} from '@/components/project/CaseStudyBlocks';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.subtitle}`;
  return {
    title,
    description: project.oneLiner,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description: project.oneLiner,
      url: `/projects/${project.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${SITE.name}`,
      description: project.oneLiner,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const metrics = visible(project.metrics);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main id="main" className="pt-28 sm:pt-32">
        <article className="shell">
          <Reveal>
            <Link
              href="/#work"
              className="link-underline inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All work
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status={project.status} pulse />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {project.year}
              </span>
            </div>

            <h1 className="mt-5 text-display font-semibold text-ink">{project.title}</h1>
            <p className="mt-3 font-mono text-[12.5px] uppercase tracking-[0.12em] text-accent">
              {project.subtitle}
            </p>
            <p className="mt-6 max-w-prose text-lede text-muted">{project.oneLiner}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[14px]">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-card bg-ink px-5 font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Visit {project.title}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
              {project.links.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-card border border-rule px-5 font-medium text-ink transition-colors hover:bg-ink/[0.04]"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  Source
                </a>
              ) : null}
              {project.links.extra?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-muted hover:text-ink"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Hero media */}
          <Reveal className="mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-rule bg-surface">
              <ProjectImage project={toMedia(project)} sizes="(max-width: 1180px) 100vw, 1180px" priority />
            </div>
          </Reveal>

          {/* Traction */}
          {metrics.length > 0 ? (
            <Reveal className="mt-12">
              {/*
                Column count follows the metric count. A fixed 4-up grid leaves
                the rule-coloured background showing through empty cells when a
                project has one or two numbers.
              */}
              <dl
                className={cn(
                  'grid gap-px border border-rule bg-rule',
                  metrics.length === 1 && 'grid-cols-1',
                  metrics.length === 2 && 'grid-cols-2',
                  metrics.length === 3 && 'grid-cols-1 sm:grid-cols-3',
                  metrics.length >= 4 && 'grid-cols-2 sm:grid-cols-4'
                )}
              >
                {metrics.map((m) => (
                  <div key={m.label} className="bg-paper p-5">
                    <dd className="tnum font-mono text-[22px] font-medium tracking-tight text-ink">
                      <CountUp value={m.value} />
                    </dd>
                    <dt className="mt-1.5 text-[12px] leading-snug text-muted">{m.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}

          {/* Demo video — rendered only when one exists in the data. */}
          {project.video ? (
            <Reveal className="mt-12">
              <p className="eyebrow">Demo</p>
              <video
                className="mt-4 w-full rounded-card border border-rule bg-surface"
                controls
                preload="none"
                poster={project.video.poster}
                playsInline
              >
                <source src={project.video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {project.video.caption ? (
                <p className="mt-3 text-[13px] text-muted">{project.video.caption}</p>
              ) : null}
            </Reveal>
          ) : null}

          {/* Case study */}
          <div className="mt-16">
            <Block label="Problem">{project.problem ? <Prose>{project.problem}</Prose> : null}</Block>
            <Block label="Why I built it">
              {project.whyIBuiltIt ? <Prose>{project.whyIBuiltIt}</Prose> : null}
            </Block>
            <Block label="What I built">
              {project.whatIBuilt ? <Prose>{project.whatIBuilt}</Prose> : null}
            </Block>

            {project.credentials?.length ? (
              <Block label="Credentials">
                <Credentials project={project} />
              </Block>
            ) : null}

            {project.flow?.length ? (
              <Block label="How it works">
                <FlowDiagram steps={project.flow} />
              </Block>
            ) : null}

            {project.myRole?.length ? (
              <Block label="What I did">
                <RoleList items={project.myRole} />
              </Block>
            ) : null}

            {project.screenshots?.length ? (
              <Block label="Screens">
                <ProjectGallery screenshots={project.screenshots} title={project.title} />
              </Block>
            ) : null}

            <Block label="Technology">
              <TechList items={project.tech} />
            </Block>

            <Block label="Challenges">
              {project.challenges ? <Prose>{project.challenges}</Prose> : null}
            </Block>

            <Block label="What I learned">
              {project.learned ? <Prose>{project.learned}</Prose> : null}
            </Block>
          </div>

          {/* Next project */}
          <Reveal className="mt-8 border-t border-rule py-10">
            <Link href={`/projects/${next.slug}`} className="group flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Next project</p>
                <p className="mt-2 text-[24px] font-semibold tracking-tight text-ink sm:text-[28px]">
                  <span className="link-underline">{next.title}</span>
                </p>
                <p className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">
                  {next.subtitle}
                </p>
              </div>
              <ArrowUpRight
                className="mb-2 h-6 w-6 shrink-0 text-muted transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink"
                aria-hidden
              />
            </Link>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
