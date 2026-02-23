import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export default function Resume() {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.alert('Download initiated. (Demo only)');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold text-white mb-2">Curriculum Vitae</h1>
          <p className="text-muted-foreground">My professional operating history.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Experience</h2>
            
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-primary rounded-full box-glow"></div>
                <h3 className="text-lg font-bold text-white">Lead Architect <span className="text-primary">@ OmniCorp</span></h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">2022 - PRESENT</div>
                <p className="text-sm text-muted-foreground">Designed and deployed high-throughput decentralized systems handling millions in daily volume.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/20 rounded-full"></div>
                <h3 className="text-lg font-bold text-white">Senior Engineer <span className="text-primary">@ StartUpX</span></h3>
                <div className="text-xs font-mono text-muted-foreground mb-2">2019 - 2022</div>
                <p className="text-sm text-muted-foreground">Led the frontend transition to React/Next.js, improving load times by 40% and conversion by 15%.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" /> Download PDF
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Get the full, detailed version of my CV formatted for ATS and human readers alike.
              </p>
              <button 
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 magnet-target"
              >
                Download Resume <Download className="w-4 h-4" />
              </button>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Core Competencies</h3>
              <ul className="space-y-3">
                {['TypeScript & React', 'Node.js & Go', 'Web3 & Smart Contracts', 'System Architecture'].map(skill => (
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
