'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Github,
  Home,
  Mail,
  Moon,
  Search,
  Send,
  Sun,
  TerminalSquare,
  UserRound,
  X,
} from 'lucide-react';
import { SITE } from '@/data/site';

const sections = [
  { label: 'Home', href: '#home', id: 'home', Icon: Home },
  { label: 'Projects', href: '#projects', id: 'projects', Icon: TerminalSquare },
  { label: 'Experience', href: '#experience', id: 'experience', Icon: BriefcaseBusiness },
  { label: 'Proof', href: '#proof', id: 'proof', Icon: BarChart3 },
  { label: 'Writing', href: '#writing', id: 'writing', Icon: FileText },
] as const;

const commands = [
  { label: 'Go to Home', detail: 'Section', href: '#home', Icon: Home },
  { label: 'Go to Projects', detail: 'Section', href: '#projects', Icon: TerminalSquare },
  { label: 'Go to Experience', detail: 'Section', href: '#experience', Icon: BriefcaseBusiness },
  { label: 'Go to Proof', detail: 'Section', href: '#proof', Icon: BarChart3 },
  { label: 'Go to Writing', detail: 'Section', href: '#writing', Icon: FileText },
  { label: 'Open GitHub', detail: 'External', href: SITE.socials.github, Icon: Github },
  { label: 'Open LinkedIn', detail: 'External', href: SITE.socials.linkedin, Icon: UserRound },
  { label: 'Open X / Twitter', detail: 'External', href: SITE.socials.x, Icon: Send },
  { label: 'Open Resume', detail: 'External', href: SITE.resume, Icon: FileText },
  { label: 'Email Anshit', detail: 'Contact', href: `mailto:${SITE.email}`, Icon: Mail },
  {
    label: 'Book a call',
    detail: 'Contact',
    href: SITE.calendar,
    Icon: BriefcaseBusiness,
  },
] as const;

export function BannerClock() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time className="portfolio-clock tnum" aria-label={`Local time ${time}`}>
      {time}
    </time>
  );
}

export function ThemeButton() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setDark(document.documentElement.classList.contains('dark')));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('ary-theme', next ? 'dark' : 'light');
  }

  return (
    <button type="button" className="portfolio-icon-button" onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>
      {dark ? <Moon aria-hidden /> : <Sun aria-hidden />}
    </button>
  );
}

export function PaletteTrigger({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      className={compact ? 'portfolio-social-button' : 'portfolio-command-trigger'}
      onClick={() => window.dispatchEvent(new Event('portfolio:command'))}
      aria-label={compact ? 'More options — open command palette' : 'Open command palette'}
    >
      {compact ? <><Search aria-hidden /> More</> : <><Search aria-hidden /><span className="command-label">Command</span><kbd>⌘ K</kbd></>}
    </button>
  );
}

export function PortfolioNavigation() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const nodes = sections.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -68% 0px' }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="portfolio-side-nav" aria-label="Section navigation">
        {sections.map(({ label, href, id, Icon }) => (
          <a key={id} href={href} className={active === id ? 'is-active' : ''} aria-label={label} aria-current={active === id ? 'location' : undefined} data-tooltip={label}>
            <Icon aria-hidden />
          </a>
        ))}
        <span aria-hidden />
        <a href={SITE.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-tooltip="GitHub">
          <Github aria-hidden />
        </a>
      </nav>

      <nav className="portfolio-mobile-nav" aria-label="Mobile section navigation">
        {sections.map(({ label, href, id, Icon }) => (
          <a key={id} href={href} className={active === id ? 'is-active' : ''} aria-label={label} aria-current={active === id ? 'location' : undefined}>
            <Icon aria-hidden />
            <small>{label}</small>
          </a>
        ))}
      </nav>
    </>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('portfolio:command', show);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('portfolio:command', show);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    const commandNodes = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[data-command]')
    );

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = commandNodes.indexOf(document.activeElement as HTMLElement);
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = current === -1 ? (step === 1 ? 0 : commandNodes.length - 1) : (current + step + commandNodes.length) % commandNodes.length;
      commandNodes[next]?.focus();
    }

    if (event.key === 'Tab') {
      const focusable = Array.from(
        event.currentTarget.querySelectorAll<HTMLElement>('input, button, [href]')
      ).filter((node) => !node.hasAttribute('disabled'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }

  if (!open) return null;

  return (
    <div className="portfolio-palette-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="portfolio-palette" role="dialog" aria-modal="true" aria-labelledby={dialogId} onKeyDown={handleDialogKeyDown}>
        <header>
          <Search aria-hidden />
          <h2 id={dialogId} className="sr-only">Command palette</h2>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a command…" aria-label="Search commands" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette"><X aria-hidden /></button>
        </header>
        <div className="portfolio-command-list">
          {filtered.map(({ label, detail, href, Icon }) => (
            <a data-command key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} onClick={() => setOpen(false)}>
              <Icon aria-hidden />
              <span>{label}<small>{detail}</small></span>
              <kbd>↵</kbd>
            </a>
          ))}
          {filtered.length === 0 && <p>No matching commands.</p>}
        </div>
        <footer><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>esc</kbd> close</span></footer>
      </section>
    </div>
  );
}
