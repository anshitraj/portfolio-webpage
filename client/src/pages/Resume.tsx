import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ResumeTerminal } from '@/components/ResumeTerminal';

export default function Resume() {
  const [isResumeVaultOpen, setIsResumeVaultOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500">// Resume</p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">Experience &amp; CV</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Real roles and systems built by Anshit Raj Yadav across engineering, GTM, business development, agentic AI,
            stablecoin payments, and infra.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-200/80 dark:border-white/10 pb-2">Experience</h2>
            
            <div className="relative pl-6 border-l border-zinc-200/80 dark:border-white/10 space-y-8">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-white" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Founding Team — Ecosystem, Partnerships, Infra &amp; Growth{' '}
                  <span className="text-sky-400">@ Webcoin Labs</span>
                </h3>
                <div className="mb-2 font-mono text-xs text-zinc-600 dark:text-zinc-500">2022 – 2025</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Built Webcoin Labs as a founder–builder ecosystem connecting startups with builders, launchpads, VCs, and
                  partners. Connected 100+ startups with the right ecosystems, managed a 1,500+ influencer/KOL network, grew
                  community reach from ~1K to 21K+, and supported fundraising initiatives contributing to $50K+ raised across
                  early-stage projects.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-zinc-600" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Protocol Contributor <span className="text-sky-400">@ Raydium Protocol</span>
                </h3>
                <div className="mb-2 font-mono text-xs text-zinc-600 dark:text-zinc-500">May 2023 – July 2023</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Contributed to Solana AMM protocol tooling, SDK usage, and liquidity pool integrations (web3.js, Anchor).
                  Supported documentation and examples for developers; tested and validated pool creation and swap flows
                  across multiple pool types and fee tiers. Collaborated with core contributors on concentrated liquidity UX.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-zinc-600" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  SDE Intern <span className="text-sky-400">@ ALTAVA GROUP</span>
                </h3>
                <div className="mb-2 font-mono text-xs text-zinc-600 dark:text-zinc-500">Jun 2022 – Sep 2022</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Remote internship: blockchain product work with Next.js and on-chain integrations. Shipped features,
                  participated in reviews and testing, and supported incremental product improvements.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-zinc-700" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Influencer Marketing Manager <span className="text-sky-400">@ Acid Rainbow</span>
                </h3>
                <div className="mb-2 font-mono text-xs text-zinc-600 dark:text-zinc-500">Mar 2022 – Apr 2022</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Coordinated creator outreach and campaign execution for brand growth. Supported planning, messaging, and
                  reporting for short-cycle launches alongside product and community goals.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-950 dark:text-white">
                <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-400" /> Open Resume Hub
              </h3>
              <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
                View focused resume variants (technical, business, founder) and download the version that best fits your use case.
              </p>
              <Dialog open={isResumeVaultOpen} onOpenChange={setIsResumeVaultOpen}>
                <button
                  onClick={() => setIsResumeVaultOpen(true)}
                  className="magnet-target flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-semibold text-black transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-200"
                >
                  Open Resume Hub <Download className="w-4 h-4" />
                </button>
                <DialogContent className="w-[96vw] max-w-4xl border-0 bg-transparent p-0 sm:rounded-2xl [&>button]:hidden">
                  <ResumeTerminal onClose={() => setIsResumeVaultOpen(false)} />
                  <DialogHeader className="hidden">
                    <DialogTitle className="font-mono text-sm tracking-[0.3em] text-secondary">
                      /resumes
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Select the profile you want to download.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/95 dark:bg-zinc-950/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-zinc-950 dark:text-white">Core Competencies</h3>
              <ul className="space-y-3">
                {[
                  'Languages: Rust, Solidity, TypeScript, JavaScript, Python, Java, C++',
                  'Frontend: React, Next.js, TailwindCSS, Vite',
                  'Backend & Data: Node.js, Express, Supabase, PostgreSQL, MongoDB, Firebase',
                  'Web3 & Protocols: Solana, Ethereum, Ethers.js, Hardhat, Foundry, OpenZeppelin, IPFS',
                  'DevOps & Infra: Git, Docker, Linux, Nginx, Vercel, Render',
                  'AI / Agentic: LLM workflows, agentic AI systems, AI-native automation, stablecoin payment rails',
                  'GTM / BD: partnerships, ecosystem growth, launch and distribution, pipeline and fundraising support'
                ].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
