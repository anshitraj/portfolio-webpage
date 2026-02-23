import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useGamification } from '@/hooks/use-gamification';
import { CustomCursor } from './CustomCursor';
import { AnimatedBackground } from './AnimatedBackground';
import { Terminal, Code, User, BookOpen, Trophy, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { progress, visitSection, badgesUnlocked } = useGamification();
  const { toast } = useToast();

  useEffect(() => {
    visitSection(location);
  }, [location, visitSection]);

  useEffect(() => {
    const handleBadge = (e: Event) => {
      const badge = (e as CustomEvent).detail;
      toast({
        title: "Achievement Unlocked! 🏆",
        description: `You earned the [${badge}] badge.`,
        className: "bg-card border-primary text-primary-foreground",
      });
    };
    window.addEventListener('badge-unlocked', handleBadge);
    return () => window.removeEventListener('badge-unlocked', handleBadge);
  }, [toast]);

  const navItems = [
    { path: '/', label: 'Index', icon: <User className="w-4 h-4" /> },
    { path: '/experience', label: 'Experience', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { path: '/blog', label: 'Logs', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/achievements', label: 'Badges', icon: <Trophy className="w-4 h-4" /> },
    { path: '/contact', label: 'Terminal', icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <>
      <CustomCursor />
      <AnimatedBackground />
      
      <div className="flex flex-col min-h-screen">
        {/* Top Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_10px_rgba(138,43,226,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-8 glass-panel border-b-0 border-t-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-mono font-bold text-xl tracking-tighter text-glow-cyan text-white magnet-target">
              Anshit Raj Yadav <span className="text-primary">— SYS_ADMIN</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors magnet-target ${
                    location === item.path ? 'text-primary text-glow' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-muted-foreground hidden sm:block">
                X Followers: <span className="text-secondary">21.4k</span>
              </div>
              <Link 
                href="/resume" 
                className="px-4 py-2 text-sm font-bold rounded-lg bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all box-glow magnet-target"
              >
                RESUME
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Nav Bar (Bottom) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-b-0 flex justify-around p-4 pb-safe">
           {navItems.slice(0, 5).map(item => (
             <Link 
               key={item.path} 
               href={item.path}
               className={`flex flex-col items-center gap-1 ${
                 location === item.path ? 'text-primary' : 'text-muted-foreground'
               }`}
             >
               {item.icon}
               <span className="text-[10px]">{item.label}</span>
             </Link>
           ))}
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-24 pb-20 md:pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </>
  );
}
