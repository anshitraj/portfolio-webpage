import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  DollarSign,
  FileText,
  Github,
  Handshake,
  Linkedin,
  Mail,
  Megaphone,
  Network,
  Palette,
  Play,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { visibleAchievements } from '@/data/achievements';
import { experience } from '@/data/experience';
import { HOME_PROJECTS, HOME_TECH, MORE_PROJECT_SLUGS, type HomeProject } from '@/data/home';
import { ECOSYSTEM_WORK, IMPACT_GROUPS, IMPACT_METRICS } from '@/data/metrics';
import { projects } from '@/data/projects';
import { RESUME_TRACKS } from '@/data/resumes';
import { ABOUT, SITE } from '@/data/site';
import { writing } from '@/data/writing';
import { visible } from '@/lib/metrics';
import { ProjectMedia } from '@/components/shared/ProjectMedia';
import { GitHubContributions } from './GitHubContributions';
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
  { label: 'CVs', href: '#resumes', Icon: FileText },
] as const;

const moreProjects = MORE_PROJECT_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(
  (project): project is NonNullable<typeof project> => Boolean(project),
);
const topProjects = HOME_PROJECTS.filter((project) => project.tier === 'top');
const secondaryProjects = HOME_PROJECTS.filter((project) => project.tier === 'secondary');
const archiveVideoCount = moreProjects.filter((project) => project.video).length;
const metricIcons: Record<string, typeof Boxes> = {
  shipped: Boxes, clients: DollarSign, mrr: TrendingUp, startups: Handshake,
  investors: Network, creators: Megaphone, community: Users, active: Activity,
  minicast: Rocket, developers: Code2, payments: Bot, ledger: ShieldCheck,
  artyug: Palette, zama: Trophy, cloud: Cloud,
};

function SectionHeading({ index, title, note, id }: { index: string; title: string; note?: string; id?: string }) {
  return (
    <header className={styles.sectionHeading}>
      <span>{index}</span>
      <div>
        <h2 id={id}>{title}</h2>
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
          sizes={project.layout === 'spotlight'
            ? '(max-width: 760px) 100vw, 1140px'
            : project.layout === 'flagship' || project.layout === 'wide'
              ? '(max-width: 760px) 100vw, 680px'
              : '(max-width: 760px) 100vw, 470px'}
          priority={project.slug === 'unipayscan'}
          className={`${styles.projectMedia} ${project.video ? styles.projectVideo : ''}`}
          imgClassName={styles.projectMediaImage}
        />
      </div>

      <div className={styles.projectContent}>
        <header className={styles.projectTitleRow}>
          <div className={styles.projectIdentity}>
            {project.logo ? (
              <Image src={project.logo} alt="" width={42} height={42} className={styles.projectLogo} />
            ) : (
              <span className={styles.projectEmojiMark} aria-hidden>{project.emoji}</span>
            )}
            <div>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          </div>
          <span className={styles.projectStatus}><i aria-hidden />{project.status}</span>
        </header>

        <p className={styles.projectDescription}>{project.shortDescription ?? project.description}</p>
        {project.shortDescription ? (
          <details className={styles.projectDetails}>
            <summary>Product details <ChevronDown aria-hidden /></summary>
            <p>{project.description}</p>
          </details>
        ) : null}

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
                  <div className={styles.quickProof}>
                    <span><strong>10+</strong> products shipped</span>
                    <span><strong>$100K</strong> for clients</span>
                    <span><strong>275+</strong> startups supported</span>
                  </div>
                </div>
                <div className={styles.profileControls}><PaletteTrigger /><ThemeButton /></div>
              </div>

              <ul className={styles.profilePoints}>
                <li><span aria-hidden>⚡</span><p>I build <strong>payment infrastructure</strong>, <strong>agentic systems</strong> and zero-to-one fintech products.</p></li>
                <li><span aria-hidden>🧭</span><p>Currently building <a href="https://universal-payment-scanner.vercel.app/" target="_blank" rel="noreferrer">UniPayScan</a> and <a href="https://railor.xyz/" target="_blank" rel="noreferrer">Railor</a>.</p></li>
              </ul>

              <div className={styles.profileActions}>
                <a className={styles.primaryAction} href={SITE.calendar} target="_blank" rel="noreferrer"><CalendarDays aria-hidden /> Let&apos;s talk</a>
                <a href={`mailto:${SITE.email}`}><Mail aria-hidden /> Email me</a>
              </div>

              <p className={styles.socialIntro}>Find me online · choose a CV</p>
              <div className={styles.socials}>
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <Icon aria-hidden />{label}
                  </a>
                ))}
                <PaletteTrigger compact />
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="tech-stack-title">
            <SectionHeading id="tech-stack-title" index="01" title="Tech stack" note="Tools I ship with." />
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
            <SectionHeading id="projects-title" index="02" title="Projects" note="Watch the demos. Explore the builds." />
            <div className={styles.projectTierHeading}>
              <div><span aria-hidden>◆</span><strong>Top products</strong></div>
              <small>05 / flagship builds</small>
            </div>
            <div className={styles.projectGrid}>
              {topProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>

            <div className={styles.projectTierHeading}>
              <div><span aria-hidden>◇</span><strong>More products</strong></div>
              <small>{String(secondaryProjects.length).padStart(2, '0')} / shipped &amp; building</small>
            </div>
            <div className={styles.projectGrid}>
              {secondaryProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>

            <details className={styles.archiveDisclosure} open>
              <summary>
                <span>More shipped work</span>
                <small>{moreProjects.length} project{moreProjects.length === 1 ? '' : 's'} · {archiveVideoCount} demo{archiveVideoCount === 1 ? '' : 's'}</small>
                <ChevronDown aria-hidden />
              </summary>
              <div className={styles.archiveGrid}>
                {moreProjects.map((project) => <ArchiveProjectCard key={project.slug} project={project} />)}
              </div>
            </details>
          </section>

          <section className={styles.section} id="github" aria-labelledby="github-title">
            <SectionHeading id="github-title" index="03" title="GitHub" note="From daily commits to a year of building." />
            <GitHubContributions />
          </section>

          <section className={`${styles.section} ${styles.aboutSection}`} id="about" aria-labelledby="about-title">
            <SectionHeading id="about-title" index="04" title="How I work" note="Engineering × product × distribution." />
            <div className={styles.aboutGrid}>
              <div>
                <p className={styles.aboutLead}>{ABOUT.heading}</p>
                <ol className={styles.workSteps}>
                  <li><span><Code2 aria-hidden /></span><div><strong>Build the missing layer</strong><p>Payment rails, agent permissions, developer tools.</p></div></li>
                  <li><span><Rocket aria-hidden /></span><div><strong>Ship to real users</strong><p>Fast first versions. Practical feedback.</p></div></li>
                  <li><span><TrendingUp aria-hidden /></span><div><strong>Turn usage into growth</strong><p>Product iteration, partnerships, distribution.</p></div></li>
                </ol>
                <details className={styles.aboutDetails}>
                  <summary>The longer story <ChevronDown aria-hidden /></summary>
                  {ABOUT.body.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
                </details>
              </div>
              <aside>
                <Sparkles aria-hidden />
                <blockquote>“{ABOUT.pullQuote}”</blockquote>
                <span>BUILD → SHIP → LEARN → REPEAT</span>
              </aside>
            </div>
          </section>

          <section className={styles.section} id="experience" aria-labelledby="experience-title">
            <SectionHeading id="experience-title" index="05" title="Experience" note="Engineering, partnerships and founder-side work." />
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
                      <details className={styles.roleDetails}>
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
            <SectionHeading id="proof-title" index="06" title="Proof in numbers" note="Revenue. Reach. Shipped work." />
            <div className={styles.metricGroups}>
              {IMPACT_GROUPS.map((group, groupIndex) => {
                const metrics = visible(IMPACT_METRICS).filter((metric) => metric.group === group.id);
                return (
                  <section key={group.id} className={styles.metricGroup} aria-labelledby={`metric-${group.id}`}>
                    <header><span>0{groupIndex + 1}</span><h3 id={`metric-${group.id}`}>{group.title}</h3><small>{group.note}</small></header>
                    <dl className={styles.metricsGrid} style={{ '--metric-columns': metrics.length } as React.CSSProperties}>
                      {metrics.map((metric) => {
                        const MetricIcon = metricIcons[metric.id ?? ''] ?? Sparkles;
                        return (
                          <div key={metric.id ?? metric.label} className={styles.metricCard}>
                            <span className={styles.metricIcon} aria-hidden><MetricIcon /></span>
                            <dt><strong aria-hidden>{metric.shortLabel ?? metric.label}</strong><span className="sr-only">{metric.label}</span><small>{metric.context}</small></dt>
                            <dd>{metric.value}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </section>
                );
              })}
            </div>

            <div className={styles.proofSplit}>
              <div>
                <h3>GTM in action</h3>
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
            <SectionHeading id="writing-title" index="07" title="Writing" note="Notes from the build." />
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

          <section className={`${styles.section} ${styles.resumeSection}`} id="resumes" aria-labelledby="resumes-title">
            <SectionHeading
              index="08"
              id="resumes-title"
              title="Role-Specific CVs"
              note="Pick the role. Open the right CV."
            />

            <div className={styles.resumeRouter}>
              <div className={styles.resumePrompt}>
                <span aria-hidden>↳</span>
                <div>
                  <small>RECRUITER ROUTER / 08 FILES</small>
                  <p>You&apos;re hiring for…</p>
                </div>
                <strong>Pick a track, then open the tailored CV.</strong>
              </div>

              <div className={styles.resumeBoard}>
                {RESUME_TRACKS.map((track, trackIndex) => (
                  <article key={track.id} className={styles.resumeTrack}>
                    <header>
                      <span aria-hidden>{track.glyph}</span>
                      <div>
                        <small>{String(trackIndex + 1).padStart(2, '0')} / {track.eyebrow}</small>
                        <h3>{track.title}</h3>
                        <p>{track.description}</p>
                      </div>
                      <b>{String(track.resumes.length).padStart(2, '0')}</b>
                    </header>

                    <ol>
                      {track.resumes.map((resume) => (
                        <li key={resume.code}>
                          <a href={resume.href} target="_blank" rel="noreferrer" aria-label={`Open ${resume.title} CV`}>
                            <span>{resume.code}</span>
                            <div>
                              <small>{resume.label}</small>
                              <strong>{resume.title}</strong>
                              <p>{resume.description}</p>
                            </div>
                            <ArrowUpRight aria-hidden />
                          </a>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.contact} id="contact" aria-labelledby="contact-title">
            <p>AVAILABLE FOR THE RIGHT PROBLEM</p>
            <h2 id="contact-title">Building infrastructure that has to work?</h2>
            <span>Payments · AI agents · Developer tools · Zero-to-one products</span>
            <a href={SITE.calendar} target="_blank" rel="noreferrer">Let&apos;s talk <ArrowUpRight aria-hidden /></a>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>Built by Anshit Raj <span>·</span> India <span>·</span> Open to remote</p>
          <nav aria-label="Footer links">
            <a href={SITE.socials.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={SITE.socials.x} target="_blank" rel="noreferrer">X</a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#resumes">CVs</a>
            <a href={`mailto:${SITE.email}`}>Email</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
