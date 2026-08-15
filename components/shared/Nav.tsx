'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { NAV_LINKS, SECTION_IDS, SITE } from '@/data/site';
import { ModeSwitch } from './ModeSwitch';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: 'GitHub', href: SITE.socials.github, Icon: Github },
  { label: 'LinkedIn', href: SITE.socials.linkedin, Icon: Linkedin },
  { label: 'X', href: SITE.socials.x, Icon: XIcon },
];

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently occupying the upper viewport.
  useEffect(() => {
    if (!onHome) {
      setActive('');
      return;
    }
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -65% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  function isActive(href: string) {
    if (href.startsWith('/#')) return onHome && active === href.slice(2);
    return pathname === href;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-card focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled ? 'border-b border-rule bg-paper/85 backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Primary">
          <Link
            href="/"
            className="-ml-1 inline-flex min-h-[40px] shrink-0 items-center px-1 font-mono text-[13px] font-medium tracking-[0.16em] text-ink"
            aria-label={`${SITE.name} — home`}
          >
            {SITE.initials}
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const on = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={on ? 'page' : undefined}
                    className={cn(
                      'relative block px-2.5 py-1.5 text-[13.5px] transition-colors',
                      on ? 'text-ink' : 'text-muted hover:text-ink'
                    )}
                  >
                    {link.label}
                    {on && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2.5 -bottom-0.5 h-px bg-accent"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 400, damping: 32 }
                        }
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* min-w-0 lets this cluster shrink instead of pushing the menu
              button past the right edge on narrow phones. */}
          <div className="flex min-w-0 items-center gap-1 sm:gap-1.5">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-pill border border-rule px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink/25 hover:text-ink xl:inline-flex"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              Open to work
            </a>

            {/* Visible at every width — the mode switch is the one control that
                must never be buried behind a menu. */}
            <ModeSwitch />

            <div className="ml-1 hidden items-center gap-0.5 lg:flex">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-pill text-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-[55] bg-paper lg:hidden">
          <div className="shell flex h-16 items-center justify-between">
            <span className="font-mono text-[13px] tracking-[0.16em] text-ink">{SITE.initials}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-ink"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="shell flex h-[calc(100dvh-4rem)] flex-col">
            <ul className="flex-1 divide-y divide-rule overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[56px] items-center text-[22px] tracking-tight text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="flex items-center gap-2 border-t border-rule pt-5 text-[13px] text-muted">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              {SITE.availability}
            </p>

            <div className="flex items-center justify-between gap-3 py-5">
              <div className="flex items-center gap-1">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-rule text-muted"
                  >
                    <Icon className="h-[15px] w-[15px]" />
                  </a>
                ))}
              </div>
              <ModeSwitch id="mobile" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
