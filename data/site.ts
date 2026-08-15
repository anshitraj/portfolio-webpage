export const SITE = {
  name: 'Anshit Raj Yadav',
  shortName: 'Anshit Raj Yadav',
  initials: 'ARY',
  role: 'Founding Engineer · Full-Stack · GTM, Partnerships & Operations',
  /** Hero headline. Kept short enough to hold one line on desktop. */
  headline: 'I build infrastructure and products people actually use.',
  /** Hero supporting line. */
  sub: 'Founding engineer and full-stack builder with hands-on GTM, business development and operator experience across AI agents, stablecoin payments and developer infrastructure.',
  availability: 'Open to founding engineering, full-stack, GTM, business development and operator roles',
  location: 'Bengaluru · Open to relocate anytime',
  email: 'anshitraj7@gmail.com',
  url: 'https://anshitraj.me',
  handle: 'anshitraj',
  socials: {
    github: 'https://github.com/anshitraj',
    linkedin: 'https://linkedin.com/in/anshitraj',
    x: 'https://x.com/solrishu',
  },
} as const;

/** Anchor targets on the Official page + the one real sub-route in the nav. */
export const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Outcomes', href: '/#achievements' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resume', href: '/#resume' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Section ids the scroll-spy watches, in document order. */
export const SECTION_IDS = [
  'about',
  'work',
  'experience',
  'numbers',
  'achievements',
  'gallery',
  'resume',
  'contact',
] as const;

export const PHILOSOPHY = [
  { left: 'Shipping', right: 'Talking' },
  { left: 'Building', right: 'Tutorials' },
  { left: 'Products', right: 'Toy projects' },
  { left: 'Execution', right: 'Ideas' },
] as const;

/**
 * About — narrative, not a bullet list. Metrics deliberately live in the
 * Numbers section instead so this reads like a person, not a CV.
 */
export const ABOUT = {
  eyebrow: 'About',
  heading: 'I like working where engineering, product and business overlap.',
  body: [
    `I started out writing code for blockchain products because it was the fastest way to see something I built end up in someone else's hands. That pulled me sideways into the founder side of the table — sitting in fundraising conversations, wiring up partnerships, running growth for teams who had a good product and no distribution. I learned more about what makes software matter from those rooms than from any codebase.`,
    `What I kept noticing was that the interesting problem was never the app. It was the layer underneath: how money actually moves, how an agent proves it's allowed to spend, how a founder finds the right builder without sending two hundred cold DMs. So I moved toward infrastructure — AI agents, stablecoin rails, developer tools — and started building the parts that were missing.`,
    `The work I enjoy most has a shape to it. Take a problem nobody has framed properly yet, figure out what people actually need rather than what they said they wanted, build the first version fast, put it in front of real users, and let their behaviour tell you what to fix. Most of what I've shipped got meaningfully better only after the third contact with reality.`,
  ],
  pullQuote: `I'd rather ship something useful than spend months polishing something nobody needs.`,
} as const;

export const CONTACT = {
  heading: 'Building something difficult? I’m interested.',
  sub: 'Open to high-ownership startup roles across engineering, product, GTM, business development, partnerships and founder’s office.',
} as const;

export const SEO = {
  title: 'Anshit Raj Yadav — Founding Engineer, Full-Stack & GTM',
  description:
    'Anshit Raj Yadav is a founding and full-stack engineer with GTM, business-development and business-operations experience across AI agents, stablecoin payments and developer infrastructure.',
  keywords: [
    'Anshit Raj Yadav',
    'Full-Stack Engineer',
    'AI Payments',
    'Stablecoin Infrastructure',
    'Agentic AI',
    'Startup Operator',
    "Founder's Office",
    'Product Engineer',
    'Founding Engineer',
    'GTM Engineer',
    'Business Operations',
    'Web3',
    'Fintech APIs',
    'Developer Tools',
  ],
} as const;
