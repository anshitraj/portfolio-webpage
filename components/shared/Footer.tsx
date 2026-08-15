import Link from 'next/link';
import { SITE } from '@/data/site';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {SITE.initials} — {SITE.location}
          </p>
          <p className="mt-1.5 text-[13px] text-muted">
            © {YEAR} {SITE.name}. Built and shipped by hand.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          <Link href="/gallery" className="link-underline text-muted hover:text-ink">
            Gallery
          </Link>
          <Link href="/blog" className="link-underline text-muted hover:text-ink">
            Writing
          </Link>
          <Link href="/playground" className="link-underline text-muted hover:text-ink">
            Playground
          </Link>
          <a
            href={SITE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-muted hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-muted hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={SITE.socials.x}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-muted hover:text-ink"
          >
            X
          </a>
        </nav>
      </div>
    </footer>
  );
}
