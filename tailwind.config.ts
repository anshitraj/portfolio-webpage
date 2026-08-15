import type { Config } from 'tailwindcss';

/**
 * Design system: warm paper / near-black ink / single burnt-sienna accent.
 * All colors are CSS vars so the same utility works in both themes.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-editorial)', 'ui-serif', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '6px',
        pill: '4px',
      },
      fontSize: {
        // Editorial scale — tight display sizes, comfortable body.
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        display: ['clamp(2.5rem, 7vw, 4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        title: ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        lede: ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        shell: '1180px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1.1s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
