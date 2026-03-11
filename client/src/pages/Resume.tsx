import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
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
        <header>
          <h1 className="text-4xl font-bold text-white mb-2">Experience</h1>
          <p className="text-muted-foreground">
            Real roles and systems built by Anshit Raj Yadav across agentic AI, stablecoin payments, and infra.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Experience</h2>
            
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-primary rounded-full box-glow"></div>
                <h3 className="text-lg font-bold text-white">
                  Founding Team — Ecosystem, Partnerships, Infra &amp; Growth{' '}
                  <span className="text-primary">@ Webcoin Labs</span>
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">2022 – 2025</div>
                <p className="text-sm text-muted-foreground">
                  Built Webcoin Labs as a founder–builder ecosystem connecting startups with builders, launchpads, VCs, and
                  partners. Connected 100+ startups with the right ecosystems, managed a 1,500+ influencer/KOL network, grew
                  community reach from ~1K to 21K+, and supported fundraising initiatives contributing to $50K+ raised across
                  early-stage projects.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/20 rounded-full"></div>
                <h3 className="text-lg font-bold text-white">
                  SDE Intern <span className="text-primary">@ Titan Exchange</span>
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">Sep 2024 – Dec 2024</div>
                <p className="text-sm text-muted-foreground">
                  Worked on DEX workflows, tooling, and product infrastructure. Tested and improved swap flows used by 500+
                  test users, supported iteration with feedback from 100+ traders, and collaborated with remote protocol and
                  product teams to make trading UX safer and more understandable.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/20 rounded-full"></div>
                <h3 className="text-lg font-bold text-white">
                  Protocol Contributor <span className="text-primary">@ Raydium Protocol</span>
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">May 2024 – July 2024</div>
                <p className="text-sm text-muted-foreground">
                  Contributed to Solana AMM protocol tooling, SDK usage, and liquidity pool integrations. Supported
                  documentation and examples for 50+ developers; tested and validated pool creation and swap flows across
                  20+ pool types and fee tiers. Collaborated with core contributors on concentrated liquidity UX.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/10 rounded-full"></div>
                <h3 className="text-lg font-bold text-white">
                  Independent Contributor
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">2023 – Present</div>
                <p className="text-sm text-muted-foreground">
                  Built and shipped multiple production-style applications and dashboards across payments, AI agents, creator
                  tools, and blockchain infra — including ARCPay, OmniAgentPay, Mini Cast Store, DCA Vault, and internal
                  utilities for outreach and analytics.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" /> Open Resume Hub
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                View focused resume variants (technical, business, founder) and download the version that best fits your use case.
              </p>
              <Dialog open={isResumeVaultOpen} onOpenChange={setIsResumeVaultOpen}>
                <button
                  onClick={() => setIsResumeVaultOpen(true)}
                  className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 magnet-target"
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
            
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Core Competencies</h3>
              <ul className="space-y-3">
                {[
                  'Languages: Rust, Solidity, TypeScript, JavaScript, Python, Java, C++',
                  'Frontend: React, Next.js, TailwindCSS, Vite',
                  'Backend & Data: Node.js, Express, Supabase, PostgreSQL, MongoDB, Firebase',
                  'Web3 & Protocols: Solana, Ethereum, Ethers.js, Hardhat, Foundry, OpenZeppelin, IPFS',
                  'DevOps & Infra: Git, Docker, Linux, Nginx, Vercel, Render',
                  'AI / Agentic: LLM workflows, agentic AI systems, AI-native automation, stablecoin payment rails'
                ].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {skill}
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
