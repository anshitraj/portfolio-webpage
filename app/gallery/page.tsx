import type { Metadata } from 'next';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { Reveal } from '@/components/shared/Reveal';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Build Log',
  description:
    'Moments behind the work — hackathons, launches, teams and ecosystem building by Anshit Raj Yadav.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 sm:pt-32">
        <div className="shell pb-20">
          <Reveal>
            <p className="eyebrow">Build log</p>
            <h1 className="mt-4 max-w-[18ch] text-display font-semibold text-ink">
              Moments behind the work.
            </h1>
            <p className="mt-6 max-w-prose text-lede text-muted">
              Hackathon rooms, launch days, teams, and the occasional certificate. Proof of the
              journey rather than a highlight reel.
            </p>
          </Reveal>

          <GalleryGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
