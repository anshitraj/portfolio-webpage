import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export default function Resume() {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/resume';
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold text-white mb-2">Experience</h1>
          <p className="text-muted-foreground">Real roles and work from Anshit Raj Yadav.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Experience</h2>
            
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-primary rounded-full box-glow"></div>
                <h3 className="text-lg font-bold text-white">
                  Business Development &amp; Ecosystem Growth Lead <span className="text-primary">@ Webcoin Labs</span>
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">2022 – 2025</div>
                <p className="text-sm text-muted-foreground">
                  Partnered with 50+ Web3 startups, managed 1,500+ influencers/KOLs across X, Telegram, and Discord, and supported
                  $20K+ fundraising efforts through investor coordination, pitches, and demos. Executed GTM campaigns that improved
                  project visibility and user adoption by ~200%.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/20 rounded-full"></div>
                <h3 className="text-lg font-bold text-white">
                  SDE Intern / Protocol Contributor <span className="text-primary">@ Titan Dex Protocol</span>
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">Jan 2023 – Apr 2023, Sep 2024 – Dec 2024</div>
                <p className="text-sm text-muted-foreground">
                  Tested DEX UI workflows and swap flows used by 500+ test users, collaborating with engineers to debug UI and
                  transaction edge cases and supporting stress testing with real trader feedback.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/10 rounded-full"></div>
                <h3 className="text-lg font-bold text-white">
                  Independent Web3 Developer / Contributor
                </h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">2023 – Present</div>
                <p className="text-sm text-muted-foreground">
                  Built and shipped multiple production-grade Web3 applications and dashboards, deploying smart contracts and
                  full-stack apps and shipping them to public demos.
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
              <button 
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 magnet-target"
              >
                Open Resume Hub <Download className="w-4 h-4" />
              </button>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Core Competencies</h3>
              <ul className="space-y-3">
                {[
                  'Full-stack (React/Next.js, Node/Express)',
                  'Systems + Payments (APIs, dashboards, verification flows)',
                  'Web3 Engineering (Solana/EVM, smart contracts, integrations)',
                  'Data/Automation (Python, scripting, tooling)'
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
