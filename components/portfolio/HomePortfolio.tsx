import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  FileText,
  Github,
  Linkedin,
  Mail,
  Radio,
} from 'lucide-react';
import { HOME_EXPERIENCE, HOME_METRICS, HOME_PROJECTS, HOME_TECH } from '@/data/home';
import { SITE } from '@/data/site';
import { writing } from '@/data/writing';
import { BannerClock, CommandPalette, PaletteTrigger, PortfolioNavigation, ThemeButton } from './ClientControls';

function XIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
}

const socials = [
  { label: 'GitHub', href: SITE.socials.github, Icon: Github },
  { label: 'LinkedIn', href: SITE.socials.linkedin, Icon: Linkedin },
  { label: 'X / Twitter', href: SITE.socials.x, Icon: XIcon },
  { label: 'Resume', href: SITE.resume, Icon: FileText },
] as const;

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="portfolio-section-label"><span>{index}</span><h2>{children}</h2><i aria-hidden /></div>;
}

function ProjectRow({ project }: { project: (typeof HOME_PROJECTS)[number] }) {
  return (
    <article className="portfolio-project-row">
      <div className="project-index">{project.index}</div>
      <div className="project-body">
        <div className="project-heading">
          <div>
            <h3>{project.name}</h3>
            <span className="status"><i aria-hidden />{project.status}</span>
          </div>
          <p className="project-proof">{project.proof}</p>
        </div>
        <p>{project.description}</p>
        <div className="project-footer">
          <ul aria-label={`${project.name} technologies`}>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <div className="project-links">
            {'caseStudy' in project && project.caseStudy && <Link href={project.caseStudy}>Case study <ArrowUpRight aria-hidden /></Link>}
            {'repo' in project && project.repo && <a href={project.repo} target="_blank" rel="noreferrer">GitHub <Github aria-hidden /></a>}
            <a href={project.live} target="_blank" rel="noreferrer">Live <ArrowUpRight aria-hidden /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HomePortfolio() {
  return (
    <div className="portfolio-page">
      <a className="portfolio-skip" href="#main">Skip to content</a>
      <PortfolioNavigation />
      <CommandPalette />

      <div className="portfolio-shell">
        <main id="main">
          <section className="portfolio-hero" id="home" aria-labelledby="profile-name">
            <div className="portfolio-banner">
              <Image
                src="/payment-rails-banner.webp"
                alt="A moonlit financial city connected by luminous global payment rails"
                fill
                sizes="(max-width: 1280px) 100vw, 1180px"
                preload
              />
              <div className="banner-grid" aria-hidden />
              <div className="banner-caption"><Radio aria-hidden /> GLOBAL SETTLEMENT / 18°N</div>
              <BannerClock />
            </div>

            <div className="portfolio-profile">
              <div className="profile-topline">
                <Image className="profile-avatar" src="/Portrait.png" alt="Anshit Raj" width={124} height={124} preload />
                <div className="profile-identity">
                  <div className="profile-name-row">
                    <h1 id="profile-name">Anshit Raj</h1>
                    <span className="verified" aria-hidden="true"><Check /></span>
                  </div>
                  <p>Founding Engineer</p>
                  <small>AI × Payments × Fintech</small>
                </div>
                <div className="profile-controls"><PaletteTrigger /><ThemeButton /></div>
              </div>

              <ul className="profile-points">
                <li>I build <strong>payment infrastructure</strong>, <strong>agentic systems</strong> and zero-to-one fintech products.</li>
                <li>Currently building <a href="https://universal-payment-scanner.vercel.app/" target="_blank" rel="noreferrer">UniPayScan</a> and <a href="https://railor.xyz/" target="_blank" rel="noreferrer">Railor</a>.</li>
              </ul>

              <div className="profile-actions">
                <a className="primary-action" href={`mailto:${SITE.email}?subject=${encodeURIComponent('Let’s build something')}`}><CalendarDays aria-hidden /> Let&apos;s talk</a>
                <a href={`mailto:${SITE.email}`}><Mail aria-hidden /> Email me</a>
              </div>

              <p className="socials-intro">Here are my <strong>socials</strong> and resume</p>
              <div className="portfolio-socials">
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"><Icon aria-hidden />{label}</a>
                ))}
                <PaletteTrigger compact />
              </div>
            </div>
          </section>

          <section className="portfolio-section portfolio-stack" aria-labelledby="tech-stack-title">
            <SectionLabel index="01"><span id="tech-stack-title">Tech stack</span></SectionLabel>
            <div className="tech-grid">
              {HOME_TECH.map((tech) => (
                <div key={tech.name} className="tech-item" title={tech.name}>
                  <span>{tech.mark}</span><small>{tech.name}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="portfolio-section" id="projects" aria-labelledby="projects-title">
            <SectionLabel index="02"><span id="projects-title">Projects</span></SectionLabel>
            <div className="projects-list">{HOME_PROJECTS.map((project) => <ProjectRow key={project.name} project={project} />)}</div>
            <Link className="portfolio-text-link section-end-link" href="/projects/webcoin-labs">Browse the case-study archive <ArrowUpRight aria-hidden /></Link>
          </section>

          <section className="portfolio-section" id="experience" aria-labelledby="experience-title">
            <SectionLabel index="03"><span id="experience-title">Experience</span></SectionLabel>
            <div className="experience-list">
              {HOME_EXPERIENCE.map((item, index) => (
                <article key={item.company} className="experience-row">
                  <div className="experience-rail"><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden /></div>
                  <div>
                    <div className="experience-heading">
                      <div><h3>{item.company}</h3><p>{item.role}</p></div>
                      <time>{item.period}</time>
                    </div>
                    <p className="experience-description">{item.description}</p>
                    {'proof' in item && item.proof && <small className="experience-proof">{item.proof}</small>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="portfolio-metrics-section" aria-labelledby="gtm-proof-title">
            <p id="gtm-proof-title">GTM &amp; OPERATOR PROOF</p>
            <div className="portfolio-metrics">
              {HOME_METRICS.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
            </div>
          </section>

          <section className="portfolio-section" id="writing" aria-labelledby="writing-title">
            <SectionLabel index="04"><span id="writing-title">Writing</span></SectionLabel>
            <div className="writing-list">
              {writing.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <time dateTime={post.date}>{new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${post.date}T12:00:00`))}</time>
                  <span><strong>{post.title}</strong><small>{post.readTime}</small></span>
                  <ArrowUpRight aria-hidden />
                </Link>
              ))}
            </div>
            <Link className="portfolio-text-link section-end-link" href="/blog">View all writing <ArrowUpRight aria-hidden /></Link>
          </section>

          <section className="portfolio-contact" id="contact" aria-labelledby="contact-title">
            <p>AVAILABLE FOR THE RIGHT PROBLEM</p>
            <h2 id="contact-title">Building infrastructure that has to work?</h2>
            <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Founding engineer opportunity')}`}>Let&apos;s talk <ArrowUpRight aria-hidden /></a>
          </section>
        </main>

        <footer className="portfolio-footer">
          <p>Built by Anshit Raj <span>·</span> India <span>·</span> Open to remote</p>
          <nav aria-label="Footer links">
            <a href={SITE.socials.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={SITE.socials.x} target="_blank" rel="noreferrer">X</a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${SITE.email}`}>Email</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
