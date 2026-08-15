import { ImageResponse } from 'next/og';
import { geistFonts } from '@/lib/og-fonts';
import { SITE } from '@/data/site';
import { HERO_METRICS } from '@/data/metrics';
import { visible } from '@/lib/metrics';

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#FCFCFD';
const INK = '#0D0D0F';
const MUTED = '#6E6F75';
const RULE = '#E2E2E6';
const ACCENT = '#0D0D0F';

export default async function OpengraphImage() {
  const metrics = visible(HERO_METRICS).slice(0, 4);

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
        {/* Top rule + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 3, background: ACCENT }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: MUTED,
            }}
          >
            {SITE.name}
          </div>
        </div>

        {/*
          Lines are split explicitly: satori inserts a visibly wide space at
          soft-wrap opportunities, so letting it wrap produces uneven gaps.
          One div per line means it never has to choose a break point.
        */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {['I build infrastructure and', 'products people actually use.'].map((line) => (
            <div
              key={line}
              style={{
                display: 'flex',
                // nowrap + a size that fits the 1072px content box: satori
                // leaves a visibly wide space wherever it has to soft-wrap.
                whiteSpace: 'nowrap',
                fontSize: 60,
                lineHeight: 1.16,
                color: INK,
                fontWeight: 600,
              }}
            >
              {line}
            </div>
          ))}
          <div style={{ display: 'flex', fontSize: 25, color: MUTED, marginTop: 6 }}>
            AI agents · Stablecoin payments · Developer infrastructure
          </div>
        </div>

        {/* Proof strip */}
        <div
          style={{
            display: 'flex',
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                flex: 1,
                paddingLeft: i === 0 ? 0 : 28,
                borderLeft: i === 0 ? 'none' : `1px solid ${RULE}`,
              }}
            >
              <div style={{ fontSize: 34, color: INK, fontWeight: 600 }}>
                {m.value}
              </div>
              <div style={{ fontSize: 18, color: MUTED }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: await geistFonts() }
  );
}
