import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { SITE, SEO } from '@/data/site';
import './globals.css';

/*
  Served from next/font/google rather than the `geist` package: the package
  ships the full variable font (~70KB each), while these are subset to latin
  only. Same typefaces, roughly half the bytes.
*/
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

// One pull-quote in About. Upright only — no italic is used anywhere.
const editorial = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-editorial',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: `%s — ${SITE.name}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: SEO.title,
    description: SEO.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    creator: '@solrishu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFCFD' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
  ],
  width: 'device-width',
  initialScale: 1,
  // No maximum-scale — pinch-zoom must stay available.
};

/**
 * Applied before paint so the correct theme is on <html> with no flash.
 *
 * Dark is the portfolio's deliberate default. An explicit light choice always
 * wins and persists on future visits.
 */
const THEME_BOOTSTRAP = `
(function(){try{
  if(localStorage.getItem('ary-theme')!=='light')document.documentElement.classList.add('dark');
}catch(e){}})();
`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: 'Founding Engineer',
  description: SEO.description,
  sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.x],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Lovely Professional University',
  },
  knowsAbout: [
    'AI agent infrastructure',
    'Stablecoin payments',
    'Payment systems',
    'Developer tools',
    'Blockchain infrastructure',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
