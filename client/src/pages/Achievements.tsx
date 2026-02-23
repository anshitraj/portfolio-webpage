import { Layout } from '@/components/Layout';
import { useGamification, type Badge } from '@/hooks/use-gamification';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

const ALL_BADGES: { id: Badge; desc: string; hint: string }[] = [
  { id: 'Explorer', desc: 'Visited all main system sectors.', hint: 'Check the navigation.' },
  { id: 'Operator', desc: 'Interfaced directly via terminal commands.', hint: 'Use the CLI.' },
  { id: 'Solver', desc: 'Bypassed the security riddle.', hint: 'Think critically in the terminal.' },
  { id: 'Reader', desc: 'Accessed the system logs.', hint: 'Knowledge is power.' },
  { id: 'Closer', desc: 'Initiated contact protocol.', hint: 'Send a transmission.' }
];

export default function Achievements() {
  const { badgesUnlocked, progress } = useGamification();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold text-white mb-2">User Profile</h1>
          <p className="text-muted-foreground">Track your interaction with this instance.</p>
        </header>

        <section className="glass-panel p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Synchronization Level</h2>
            <span className="text-2xl font-mono text-secondary">{progress}%</span>
          </div>
          <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-gradient-to-r from-secondary to-primary relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Unlock all badges and locate hidden overrides to reach 100%.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_BADGES.map((badge, i) => {
              const unlocked = badgesUnlocked.includes(badge.id);
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border ${unlocked ? 'bg-primary/10 border-primary/50 box-glow' : 'bg-black/40 border-white/5'} relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground'}`}>
                      {unlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 ${unlocked ? 'text-white text-glow' : 'text-muted-foreground'}`}>
                    {badge.id}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {unlocked ? badge.desc : `Hint: ${badge.hint}`}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
