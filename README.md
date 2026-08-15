# anshitraj.me

Personal site for Anshit Raj Yadav — product engineer working on AI agent infrastructure, stablecoin payments and developer tools.

Two modes, one dataset:

- **`/` — Official.** The default. Editorial, light-base, dense with proof. Built for founders, recruiters and engineering teams.
- **`/playground` — ANSHIT OS.** The same data reinterpreted as a builder operating system. Currently a working skeleton.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Motion · deployed on Vercel.

Everything is statically prerendered except two GitHub proxy routes, which use ISR.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run check    # tsc --noEmit
```

Optional env var: `GITHUB_TOKEN` raises the GitHub API rate limit from 60 to 5,000 req/h. The Open Source section renders a fallback without it.

## Content lives in `/data`

Both modes read the same files. Nothing about the portfolio is hardcoded in a component.

| File | Holds |
|---|---|
| `site.ts` | Name, headline, nav, about narrative, SEO defaults |
| `projects.ts` | All projects + full case studies, tiered `featured` / `selected` / `experiment` |
| `experience.ts` | Roles, bullets, per-role metrics |
| `achievements.ts` | Achievement cards by category |
| `metrics.ts` | Hero strip + the Numbers section |
| `gallery.ts` | Build Log images |
| `skills.ts` | Grouped stack + "currently sharpening" |
| `writing.ts` | Blog posts (markdown) |
| `tweets.ts` | Static tweet cards |
| `resumes.ts` | Primary resume + role-specific variants |
| `education.ts` `beyond.ts` | Education, and the non-engineering section |

### The `verified` flag

Every metric carries an optional `verified` field. Anything marked `verified: false` stays in the data file for the record but **never renders** — `visible()` in `lib/metrics.ts` strips it before the page is built.

This exists so an unconfirmed number can't reach production by accident. To ship one: confirm it, then delete the flag.

Currently held back pending confirmation:

- X follower count (data says 98K+, the previous site said 21.4K — publicly checkable)
- Fundraising figure (three competing numbers: $100K raised / $50K secured / $200K+ supported — needs one definition)
- Aggregate "product users" and "ecosystem reach" (need a stated basis)
- OmniClaw GitHub stars and usage count
- RiddlePay users and engagement lift
- ArcPay early-user count
- Solana Bangalore placement
- Stealth Startup test-user numbers
- **Badminton achievement** — held entirely until the certificate is available, so the wording matches it exactly

## Where media lives

One folder per project, so a project's assets stay together:

```
public/
  favicon.png
  logos/                       company + brand marks (webcoinlabs, raydium, altava, acid)
  gallery/                     Build Log photos
  projects/<slug>/
    cover.png                  card + case-study hero
    walkthrough.mp4            demo video (optional)
    poster.jpg                 video poster frame (optional)
    screens/                   phone screenshots (optional)
media-source/                  git-ignored: uncompressed originals, never deployed
```

`<slug>` matches the project's `slug` in `data/projects.ts`, so `webcoin-labs` → `public/projects/webcoin-labs/`. Folders already exist for `arc-pass` and the rest, waiting on assets.

## Adding content

**A walkthrough video** → compress it first, then drop it in and point the project at it:

```bash
ffmpeg -i raw.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k public/projects/<slug>/walkthrough.mp4
```

```bash
ffmpeg -ss 3 -i raw.mp4 -frames:v 1 -vf "scale=1280:-2" -q:v 4 public/projects/<slug>/poster.jpg
```

Then set `video: { src, poster, caption }` on the project. The block is omitted entirely when absent. Keep the original in `media-source/` — it is git-ignored, so it never ships. A raw 1080p screen recording is usually 40 MB+; the command above takes it under 4 MB with no visible loss at web size.

**Gallery photos** → drop files in `public/gallery/`, add entries to `data/gallery.ts` with real pixel dimensions. Categories with no images are removed from the filter bar automatically; the whole section hides if the array is empty.

**Resume variants** → put PDFs in `public/resumes/` and set `href` in `data/resumes.ts`. Variants without an `href` render disabled rather than 404.

**Logos** → square marks in `public/logos/`, referenced via a project's `logo` field or an experience entry's `logoSrc`. An entry can use `logoEmoji` instead where there is no logo to show (Stealth Startup uses 🥷). Missing logos fall back to an initials monogram.

**Project images** → projects with `hasRealImage: false` render a typographic monogram tile instead of a screenshot. Replace with a real screenshot and flip the flag.

## Design system

Warm off-white paper, near-black ink, one burnt-sienna accent used sparingly. Geist Sans and Geist Mono, with Instrument Serif for a single pull-quote. Thin rules, 6px radii, effectively no shadows.

Light is the default in both themes' absence — the toggle persists an explicit choice to `localStorage` under `ary-theme`.

All motion is defined in `lib/motion.ts` and guarded by `useReducedMotion()`, with a global `prefers-reduced-motion` CSS fallback.
