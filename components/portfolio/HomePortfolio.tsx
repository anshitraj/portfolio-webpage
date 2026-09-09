import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Github,
  Linkedin,
  Mail,
  Play,
  Radio,
  Sparkles,
} from 'lucide-react';
import { visibleAchievements } from '@/data/achievements';
import { experience } from '@/data/experience';
import { HOME_PROJECTS, HOME_TECH, MORE_PROJECT_SLUGS, type HomeProject } from '@/data/home';
import { ECOSYSTEM_WORK, IMPACT_METRICS } from '@/data/metrics';
import { projects } from '@/data/projects';
import { ABOUT, SITE } from '@/data/site';
import { writing } from '@/data/writing';
import { visible } from '@/lib/metrics';
import { ProjectMedia } from '@/components/shared/ProjectMedia';
import { BannerClock, CommandPalette, PaletteTrigger, PortfolioNavigation, ThemeButton } from './ClientControls';
import styles from './HomePortfolio.module.css';

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const socials = [
  { label: 'GitHub', href: SITE.socials.github, Icon: Github },
  { label: 'LinkedIn', href: SITE.socials.linkedin, Icon: Linkedin },
  { label: 'X / Twitter', href: SITE.socials.x, Icon: XIcon },
  { label: 'Resume', href: SITE.resume, Icon: FileText },
] as const;

const moreProjects = MORE_PROJECT_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(
  (project): project is NonNullable<typeof project> => Boolean(project),
);

function SectionHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <header className={styles.sectionHeading}>
      <span>{index}</span>
      <div>
        <h2>{title}</h2>
        {note ? <p>{note}</p> : null}
      </div>
      <i aria-hidden />
    </header>
  );
}

function ProjectLinks({ project }: { project: HomeProject }) {
  return (
    <div className={styles.projectLinks}>
      {project.caseStudy ? (
        <Link href={project.caseStudy}>Case study <ArrowUpRight aria-hidden /></Link>
      ) : null}
      {project.repo ? (
        <a href={project.repo} target="_blank" rel="noreferrer">Source <Github aria-hidden /></a>
      ) : null}
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer">View project <ArrowUpRight aria-hidden /></a>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }: { project: HomeProject }) {
  const mediaProject = {
    title: project.title,
    subtitle: project.subtitle,
    image: project.image,
    hasRealImage: true,
    video: project.video,
  };

  return (
    <article id={`project-${project.slug}`} className={`${styles.projectCard} ${styles[project.layout]}`}>
      <div className={styles.projectMediaShell}>
        <div className={styles.projectMediaTopline}>
          <span>{project.emoji} {project.tags[0]}</span>
          <span>{project.video ? <><Play aria-hidden /> WALKTHROUGH</> : 'LIVE PRODUCT'}</span>
        </div>
        <ProjectMedia
          project={mediaProject}
          sizes={project.layout === 'flagship' ? '(max-width: 760px) 100vw, 760px' : '(max-width: 760px) 100vw, 560px'}
          priority={project.slug === 'unipayscan'}
          className={styles.projectMedia}
          imgClassName={styles.projectMediaImage}
        />
      </div>

      <div className={styles.projectContent}>
        <header className={styles.projectTitleRow}>
          <div className={styles.projectIdentity}>
            <Image src={project.logo} alt="" width={42} height={42} className={styles.projectLogo} />
            <div>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          </div>
          <span className={styles.projectStatus}><i aria-hidden />{project.status}</span>
        </header>

        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.projectMetrics} aria-label={`${project.title} proof points`}>
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        <footer className={styles.projectFooter}>
          <ul aria-label={`${project.title} technology stack`}>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <ProjectLinks project={project} />
        </footer>
      </div>
    </article>
  );
}

function ArchiveProjectCard({ project }: { project: (typeof projects)[number] }) {
  const metrics = visible(project.metrics).slice(0, 3);

  return (
    <article className={styles.archiveCard}>
      <div className={styles.archiveMedia}>
        <ProjectMedia
          project={project}
          sizes="(max-width: 760px) 100vw, 540px"
          className={styles.projectMedia}
          imgClassName={styles.projectMediaImage}
        />
      </div>
      <div className={styles.archiveBody}>
        <header>
          <div className={styles.projectIdentity}>
            {project.logo ? <Image src={project.logo} alt="" width={38} height={38} className={styles.projectLogo} /> : null}
            <div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
          </div>
          <span className={styles.projectStatus}><i aria-hidden />{project.status}</span>
        </header>
        <p>{project.oneLiner}</p>
        {metrics.length ? (
          <div className={styles.archiveMetrics}>
            {metrics.map((metric) => <span key={metric.label}><strong>{metric.value}</strong> {metric.label}</span>)}
          </div>
        ) : null}
        <footer>
          <Link href={`/projects/${project.slug}`}>Read case study <ArrowUpRight aria-hidden /></Link>
          {project.links.live ? <a href={project.links.live} target="_blank" rel="noreferrer">Live <ArrowUpRight aria-hidden /></a> : null}
          {project.links.repo ? <a href={project.links.repo} target="_blank" rel="noreferrer">Source <Github aria-hidden /></a> : null}
        </footer>
      </div>
    </article>
  );
}

export function HomePortfolio() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <PortfolioNavigation />
      <CommandPalette />

      <div className={styles.shell}>
        <main id="main">
          <section className={styles.hero} id="home" aria-labelledby="profile-name">
            <div className={styles.banner}>
              <Image
                src="/payment-rails-banner.webp"
                alt="A moonlit financial city connected by global payment rails"
                fill
                sizes="(max-width: 1280px) 100vw, 1180px"
                fetchPriority="high"
                loading="eager"
              />
              <div className={styles.bannerShade} aria-hidden />
              <div className={styles.bannerCaption}><Radio aria-hidden /> PAYMENT RAILS / 18°N</div>
              <BannerClock />
            </div>

            <div className={styles.profile}>
              <div className={styles.profileTopline}>
                <Image className={styles.avatar} src="/Portrait.png" alt="Anshit Raj" width={126} height={126} loading="eager" />
                <div className={styles.identity}>
                  <div className={styles.nameRow}>
                    <h1 id="profile-name">Anshit Raj</h1>
                    <span className={styles.verified} role="img" aria-label="Verified profile"><Check aria-hidden /></span>
                  </div>
                  <p>Founding Engineer</p>
                  <small>AI × Payments × Fintech</small>
                  <span className={styles.quickProof}>10+ products shipped · $100K raised · 275+ startups supported</span>
                </div>
                <div className={styles.profileControls}><PaletteTrigger /><ThemeButton /></div>
              </div>

              <ul className={styles.profilePoints}>
                <li><span aria-hidden>⚡</span><p>I build <strong>payment infrastructure</strong>, <strong>agentic systems</strong> and zero-to-one fintech products.</p></li>
                <li><span aria-hidden>🧭</span><p>Currently building <a href="https://universal-payment-scanner.vercel.app/" target="_blank" rel="noreferrer">UniPayScan</a> and <a href="https://railor.xyz/" target="_blank" rel="noreferrer">Railor</a>.</p></li>
              </ul>

              <div className={styles.profileActions}>
                <a className={styles.primaryAction} href={`mailto:${SITE.email}?subject=${encodeURIComponent('Let’s build something')}`}><CalendarDays aria-hidden /> Let&apos;s talk</a>
                <a href={`mailto:${SITE.email}`}><Mail aria-hidden /> Email me</a>
              </div>

              <p className={styles.socialIntro}>Here are my <strong>socials</strong> and resume</p>
              <div className={styles.socials}>
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"><Icon aria-hidden />{label}</a>
                ))}
                <PaletteTrigger compact />
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="tech-stack-title">
            <SectionHeading index="01" title="Tech stack" note="The tools behind shipped products—not a proficiency chart." />
            <div className={styles.techGrid}>
              {HOME_TECH.map((tech) => (
                <a key={tech.name} href={tech.href} target="_blank" rel="noreferrer" aria-label={`${tech.name} website`}>
                  <span style={{ backgroundColor: tech.tone }}><Image src={tech.icon} alt="" width={28} height={28} /></span>
                  <small>{tech.name}</small>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.section} id="projects" aria-labelledby="projects-title">
            <SectionHeading index="02" title="Projects" note="Products, infrastructure and experiments running in the real world." />
            <div className={styles.projectGrid}>
              {HOME_PROJECTS.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>

            <details className={styles.archiveDisclosure} open>
              <summary><span>More shipped work</span><small>5 projects · 4 running demos</small><ChevronDown aria-hidden /></summary>
              <div className={styles.archiveGrid}>
                {moreProjects.map((project) => <ArchiveProjectCard key={project.slug} project={project} />)}
              </div>
            </details>
          </section>

          <section className={`${styles.section} ${styles.aboutSection}`} id="about" aria-labelledby="about-title">
            <SectionHeading index="03" title="How I work" note="Engineering is the core. Product judgment and distribution are the leverage." />
            <div className={styles.aboutGrid}>
              <div>
                <p className={styles.aboutLead}>{ABOUT.heading}</p>
                {ABOUT.body.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
              </div>
              <aside>
                <Sparkles aria-hidden />
                <blockquote>“{ABOUT.pullQuote}”</blockquote>
                <span>BUILD → SHIP → LEARN → REPEAT</span>
              </aside>
            </div>
          </section>

          <section className={styles.section} id="experience" aria-labelledby="experience-title">
            <SectionHeading index="04" title="Experience" note="Engineering, founder-side operations, partnerships and product delivery." />
            <div className={styles.experienceList}>
              {experience.map((item, index) => {
                const metrics = visible(item.metrics);
                return (
                  <article key={`${item.company}-${item.period}`} className={styles.experienceRow}>
                    <div className={styles.experienceIndex}>{String(index + 1).padStart(2, '0')}</div>
                    <div className={styles.companyMark}>
                      {item.logoSrc ? <Image src={item.logoSrc} alt="" width={46} height={46} /> : <span>{item.logoEmoji ?? item.company[0]}</span>}
                    </div>
                    <div className={styles.experienceBody}>
                      <header>
                        <div><h3>{item.company}</h3><p>{item.role}</p></div>
                        <time>{item.period}</time>
                      </header>
                      <p>{item.summary}</p>
                      {metrics.length ? (
                        <div className={styles.experienceMetrics}>
                          {metrics.map((metric) => <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>)}
                        </div>
                      ) : null}
                      <details className={styles.roleDetails} open={index === 0}>
                        <summary>What I did <ChevronDown aria-hidden /></summary>
                        <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                      </details>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={`${styles.section} ${styles.proofSection}`} id="proof" aria-labelledby="proof-title">
            <SectionHeading index="05" title="Proof in numbers" note="The quantifiable product, engineering and GTM outcomes behind the work." />
            <div className={styles.metricsGrid}>
              {visible(IMPACT_METRICS).map((metric, index) => (
                <div key={metric.label}>
                  <span aria-hidden>{['⚙️', '💸', '📊', '🤝', '🧭', '📣', '🌐', '⚡', '🚀', '🧑‍💻', '🤖', '🛡️', '🎨'][index]}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.proofSplit}>
              <div>
                <h3>GTM execution receipts</h3>
                <div className={styles.ecosystemList}>
                  {ECOSYSTEM_WORK.map((item) => (
                    <div key={item.org}>
                      {'logo' in item && item.logo ? <Image src={item.logo} alt="" width={34} height={34} /> : <span>{item.monogram}</span>}
                      <p><strong>{item.org}</strong>{item.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3>Selected outcomes</h3>
                <div className={styles.outcomes}>
                  {visibleAchievements.map((achievement) => (
                    <Link key={achievement.id} href={achievement.projectSlug ? `/projects/${achievement.projectSlug}` : '/gallery'}>
                      {achievement.image ? <Image src={achievement.image} alt="" width={96} height={72} /> : null}
                      <span><small>{achievement.year} · {achievement.category}</small><strong>{achievement.result}</strong><b>{achievement.title}</b></span>
                      <ArrowUpRight aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section} id="writing" aria-labelledby="writing-title">
            <SectionHeading index="06" title="Writing" note="Notes from inside payments, marketplaces and agent infrastructure." />
            <div className={styles.writingList}>
              {writing.slice(0, 3).map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <time dateTime={post.date}>{new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${post.date}T12:00:00`))}</time>
                  <div><strong>{post.title}</strong><p>{post.excerpt}</p><small>{post.readTime}</small></div>
                  <ArrowUpRight aria-hidden />
                </Link>
              ))}
            </div>
            <Link className={styles.textLink} href="/blog">View all writing <ArrowRight aria-hidden /></Link>
          </section>

          <section className={styles.contact} id="contact" aria-labelledby="contact-title">
            <p>AVAILABLE FOR THE RIGHT PROBLEM</p>
            <h2 id="contact-title">Building infrastructure that has to work?</h2>
            <span>Payments, agent systems, developer tools—or the zero-to-one product around them.</span>
            <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Founding engineer opportunity')}`}>Let&apos;s talk <ArrowUpRight aria-hidden /></a>
          </section>
        </main>

        <footer className={styles.footer}>
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
