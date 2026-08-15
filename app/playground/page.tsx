import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { SITE } from '@/data/site';
import { BenchHero, Principles } from '@/components/playground/BenchHero';
import { StackReveal } from '@/components/playground/StackReveal';
import { AccessBadges } from '@/components/playground/AccessBadges';
import { CartridgeConsole } from '@/components/playground/CartridgeConsole';
import { CredentialCards } from '@/components/playground/CredentialCards';
import { BuilderLicence } from '@/components/playground/BuilderLicence';
import { PolaroidStack } from '@/components/playground/PolaroidStack';
import { Guestbook } from '@/components/playground/Guestbook';

export const metadata: Metadata = {
  title: 'Playground — The Workbench',
  description:
    'The same portfolio data, rebuilt as things you can pick up: flip-open access badges, a cartridge console of projects, a filed credential drawer and a builder licence.',
  alternates: { canonical: '/playground' },
  openGraph: {
    title: `Playground — The Workbench — ${SITE.name}`,
    description: 'Anshit Raj Yadav’s portfolio, rebuilt as a hardware bench you can interact with.',
    url: '/playground',
  },
};

export default function PlaygroundPage() {
  return (
    // `.workbench` remaps the shared design tokens, so the Nav and everything
    // below share the bench palette regardless of the visitor's theme.
    <div className="workbench min-h-screen">
      <Nav />

      <main id="main" className="pt-24 sm:pt-28">
        {/* pb clears the floating mobile dock below `lg`. */}
        <div className="shell space-y-16 pb-32 sm:space-y-20 lg:pb-20">
          <BenchHero />
          <StackReveal />
          <Principles />
          <AccessBadges />
          <CartridgeConsole />
          <CredentialCards />
          <BuilderLicence />
          <PolaroidStack />
          <Guestbook />

          {/* Exit */}
          <footer className="border-t border-[rgb(var(--bench-edge))] pt-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--bench-dim))]">
                  End of bench
                </p>
                <p className="mt-2 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--bench-dim))]">
                  The official site has the case studies, the numbers and the writing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[3px] border border-[rgb(var(--signal))] px-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[rgb(var(--signal))] transition-colors hover:bg-[rgb(var(--signal))]/12"
                >
                  Back to work
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-[44px] items-center rounded-[3px] border border-[rgb(var(--bench-edge))] px-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[rgb(var(--bench-dim))] transition-colors hover:text-[rgb(var(--bench-text))]"
                >
                  Email me
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
