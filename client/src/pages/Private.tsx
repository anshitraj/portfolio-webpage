import { Layout } from '@/components/Layout';
import { useGamification } from '@/hooks/use-gamification';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ShieldAlert, Unlock } from 'lucide-react';

export default function Private() {
  const { riddleSolved } = useGamification();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto text-center">
        {!riddleSolved ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 rounded-3xl w-full border-destructive/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-destructive/5 pointer-events-none"></div>
            <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-6 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">ACCESS DENIED</h1>
            <p className="text-muted-foreground text-lg mb-8">
              This sector is restricted. Security override required.
            </p>
            <div className="bg-black/60 p-4 rounded-lg font-mono text-sm text-left mb-8 border border-white/5 text-muted-foreground">
              {">"} STATUS: LOCKED<br/>
              {">"} HINT: Access the <span className="text-primary">Terminal</span>.<br/>
              {">"} HINT: Initiate the <span className="text-secondary">riddle</span> protocol.
            </div>
            <Link 
              href="/contact"
              className="px-8 py-3 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-all magnet-target inline-block"
            >
              Go to Terminal
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 rounded-3xl w-full border-secondary/30 relative overflow-hidden box-glow"
          >
            <div className="absolute inset-0 bg-secondary/5 pointer-events-none"></div>
            <Unlock className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter text-glow-cyan">ACCESS GRANTED</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Welcome to the classified sector.
            </p>
            
            <div className="space-y-4 text-left">
              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <h3 className="text-primary font-bold mb-2">Secret Document Alpha</h3>
                <p className="text-sm text-muted-foreground">The architecture for an unreleased protocol lies here. But for now, take pride in solving the puzzle.</p>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <h3 className="text-secondary font-bold mb-2">Developer's Note</h3>
                <p className="text-sm text-muted-foreground">Building experiences that reward curiosity is what makes the web beautiful.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
