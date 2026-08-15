import { ImageResponse } from 'next/og';
import { geistFonts } from '@/lib/og-fonts';
import { projects, getProject } from '@/data/projects';
import { visible } from '@/lib/metrics';
import { SITE } from '@/data/site';

export const alt = 'Project case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const PAPER = '#FCFCFD';
const INK = '#0D0D0F';
const MUTED = '#6E6F75';
const RULE = '#E2E2E6';
const ACCENT = '#0D0D0F';

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: PAPER,
            fontSize: 48,
            color: INK,
          }}
        >
          {SITE.name}
        </div>
      ),
      { ...size, fonts: await geistFonts() }
    );
  }

  const metrics = visible(project.metrics).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: 64,
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
              fontSize: 17,
              letterSpacing: 2.5,
              padding: '6px 12px',
              borderRadius: 4,
            }}
          >
            {project.status}
          </div>
          <div style={{ fontSize: 18, color: MUTED, letterSpacing: 2 }}>{project.year}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1,
              letterSpacing: -1.5,
              color: INK,
              fontWeight: 600,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: ACCENT,
            }}
          >
            {project.subtitle}
          </div>
          {/* Trimmed so satori renders it without a ragged soft-wrap gap. */}
          <div style={{ display: 'flex', fontSize: 24, lineHeight: 1.4, color: MUTED, maxWidth: 980 }}>
            {project.oneLiner.length > 150
              ? `${project.oneLiner.slice(0, 147).trimEnd()}…`
              : project.oneLiner}
          </div>
        </div>

        <div style={{ display: 'flex', borderTop: `1px solid ${RULE}`, paddingTop: 26 }}>
          {metrics.length > 0 ? (
            metrics.map((m, i) => (
              <div
                key={m.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  flex: 1,
                  paddingLeft: i === 0 ? 0 : 28,
                  borderLeft: i === 0 ? 'none' : `1px solid ${RULE}`,
                }}
              >
                <div
                  style={{
                    fontSize: m.value.length > 18 ? 19 : m.value.length > 10 ? 24 : 30,
                    lineHeight: 1.15,
                    color: INK,
                    fontWeight: 600,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: 17, color: MUTED }}>{m.label}</div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 20, color: MUTED }}>{SITE.name}</div>
          )}
        </div>
      </div>
    ),
    { ...size, fonts: await geistFonts() }
  );
}
