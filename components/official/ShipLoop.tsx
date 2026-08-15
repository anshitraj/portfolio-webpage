const STEPS = [
  { n: '01', label: 'Unclear problem' },
  { n: '02', label: 'First version' },
  { n: '03', label: 'Real users' },
  { n: '04', label: 'What actually breaks' },
];

/**
 * The working loop described in About, drawn rather than asserted.
 *
 * Line art on currentColor so it inherits the section's tone — it reads
 * correctly in the light page, the dark band and both themes without a second
 * copy. Labels are real text, not paths, so it stays selectable and legible
 * when the SVG is scaled down on mobile.
 */
export function ShipLoop() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 720 190"
        className="w-full text-ink"
        role="img"
        aria-label="How I work: an unclear problem becomes a first version, meets real users, and what breaks feeds back into the next version."
      >
        <defs>
          <marker
            id="ship-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {STEPS.map((s, i) => {
          const x = 16 + i * 176;
          return (
            <g key={s.n}>
              {/* node box */}
              <rect
                x={x}
                y={34}
                width={148}
                height={58}
                rx={5}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.28}
              />
              <text
                x={x + 14}
                y={57}
                className="fill-current font-mono"
                fontSize="10"
                letterSpacing="1.6"
                opacity={0.5}
              >
                {s.n}
              </text>
              <text x={x + 14} y={78} className="fill-current" fontSize="13.5" fontWeight="500">
                {s.label}
              </text>

              {/* connector to the next node */}
              {i < STEPS.length - 1 ? (
                <line
                  x1={x + 152}
                  y1={63}
                  x2={x + 170}
                  y2={63}
                  stroke="currentColor"
                  strokeOpacity={0.4}
                  markerEnd="url(#ship-arrow)"
                />
              ) : null}
            </g>
          );
        })}

        {/* return arc: what breaks goes back into the next version */}
        <path
          d="M 620 96 C 620 150, 400 150, 268 150 C 220 150, 190 150, 190 100"
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeDasharray="4 4"
          markerEnd="url(#ship-arrow)"
        />
        <text
          x={368}
          y={168}
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="10.5"
          letterSpacing="1.4"
          opacity={0.6}
        >
          AND AGAIN
        </text>
      </svg>
    </figure>
  );
}
