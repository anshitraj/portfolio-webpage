## Anshit Raj Yadav — Portfolio

This is the source for **Anshit Raj Yadav’s** interactive portfolio site, built with:

- **Client**: React, TypeScript, Tailwind CSS, shadcn UI, Framer Motion
- **Routing**: `wouter`
- **Server**: Node/Express (API & storage)

The design leans into a **SYS_ADMIN / control-panel aesthetic** with dark purple glow, animated background, and gamified navigation.

---

### Features

- **Hero / Home**
  - System-status styled hero with SYS_ADMIN identity
  - Primary CTA to explore projects and open terminal-style contact
  - **Action bar** with:
    - Download Resume (modal with multiple profile PDFs)
    - LinkedIn and GitHub icon buttons
  - Metrics strip (users, X followers, project signups)
  - **GitHub Contributions** section:
    - 7×52 contribution heatmap (static local dataset)
    - “553 contributions in the last year” summary
    - Legend from “Less” → “More”
    - Clickable to open the GitHub profile

- **Sections**
  - Experience timeline
  - Projects grid and individual project case studies
  - Achievements / badges (gamification layer)
  - Blog / logs
  - Contact “terminal”

---

### Local Development

Prerequisites:

- Node.js 18+ and npm

Install dependencies:

```bash
npm install
```

Run the dev servers (client + server via scripts defined in `package.json`):

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:3000` or similar, depending on your setup).

> If you change ports or server scripts, update the `README` accordingly.

---

### Resumes

PDFs are served from `public/resumes/` and wired into the **Download Resume** modal on the home page:

- `anshit-raj-yadav-technical.pdf`
- `anshit-raj-yadav-founder.pdf`
- `anshit-raj-yadav-business-bd.pdf`

To swap in updated resumes, just replace these files with new PDFs using the same filenames.

---

### GitHub Contribution Heatmap

The GitHub-style contribution grid is **purely UI** and does **not** call the GitHub API:

- Dataset: `client/src/content/githubContrib.ts`
- Component: `client/src/components/github/GitHubContributionsHeatmap.tsx`

You can tweak the appearance by:

- Adjusting intensity levels in `githubContribMatrix`
- Changing colors in `levelToClassName` inside the component

---

### Deployment

You can deploy this repo to any Node/React-friendly platform (e.g. Vercel, Netlify, Render):

1. Push changes to `main` on GitHub.
2. Connect the `anshitraj/portfolio-webpage` repo to your hosting provider.
3. Use the default build command (`npm run build`) and start command (`npm start` or as defined in `package.json`).

---

### License

This portfolio is personal to **Anshit Raj Yadav**. Please do not reuse the branding, copy, or design without permission.

