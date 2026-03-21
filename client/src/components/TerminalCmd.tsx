import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGamification } from '@/hooks/use-gamification';
import { projects } from '@/content/projects';
import { motion } from 'framer-motion';

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export function TerminalCmd() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', content: 'INITIALIZING TERMINAL v2.4.1...' },
    { type: 'system', content: 'AUTHENTICATION BYPASS: SUCCESS' },
    { type: 'output', content: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const [, setLocation] = useLocation();
  const { trackOperator, solveRiddle, riddleSolved, badgesUnlocked } = useGamification();

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (type: LogEntry['type'], content: string) => {
    setLogs(prev => [...prev, { type, content }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    addLog('input', trimmed);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);
    trackOperator(); // Operator badge for using terminal

    const args = trimmed.toLowerCase().split(' ');
    const main = args[0];

    switch (main) {
      case 'help':
        addLog('output', 'AVAILABLE COMMANDS:');
        addLog('output', '  help      - Show this menu');
        addLog('output', '  about     - View profile summary');
        addLog('output', '  experience- View professional history');
        addLog('output', '  projects  - List active deployments');
        addLog('output', '  open      - Open a project (e.g. open arcpay)');
        addLog('output', '  funding   - View Webcoin Labs funding details');
        addLog('output', '  webcoin   - View ecosystem & growth work');
        addLog('output', '  altava    - View ALTAVA GROUP internship details');
        addLog('output', '  raydium   - View Raydium Protocol contributions');
        addLog('output', '  stack     - View technical stack');
        addLog('output', '  focus     - View current build focus');
        addLog('output', '  achievements - View headline outcomes');
        addLog('output', '  badges    - View unlocked achievements');
        addLog('output', '  riddle    - Initiate security override protocol');
        addLog('output', '  download resume - Show resume options');
        addLog('output', '  clear     - Clear terminal history');
        break;
      case 'about':
        addLog('output', 'IDENTITY: Anshit Raj Yadav');
        addLog('output', 'ROLE: Builder / Operator — engineering, GTM, and business development');
        addLog('output', 'SPECIALTIES: Agentic AI, stablecoin payments, blockchain infra, partnerships, full-stack product.');
        addLog(
          'output',
          'TRACTION: 100+ startups connected; ~1K→21K+ community reach; 1,500+ KOL network; $50K+ fundraising supported; Mini Cast 1,500+ users w1 / 25+ devs.'
        );
        addLog('output', 'STATUS: Shipping systems with quantified distribution for founders and operators.');
        break;
      case 'experience':
        addLog('system', 'FETCHING PROFESSIONAL HISTORY...');
        addLog('output', 'Webcoin Labs | 2022–2025 | Founding Team — Ecosystem, Partnerships, Infra & Growth');
        addLog('output', 'Raydium Protocol | May 2023–July 2023 | Protocol Contributor');
        addLog('output', 'ALTAVA GROUP | Jun 2022–Sep 2022 | SDE Intern');
        addLog('output', 'Acid Rainbow | Mar 2022–Apr 2022 | Influencer Marketing Manager');
        addLog('output', 'Type "webcoin", "altava", "raydium", or "achievements" for more details.');
        break;
      case 'funding':
      case 'webcoin':
        addLog(
          'output',
          'Webcoin Labs — Connected 100+ startups, grew community reach from ~1K to 21K+, managed a 1,500+ KOL network, and supported $50K+ in fundraising initiatives.'
        );
        break;
      case 'altava':
        addLog(
          'output',
          'ALTAVA GROUP — Remote SDE internship: blockchain product work with Next.js and on-chain integrations; feature delivery, testing, and collaboration with the engineering team.'
        );
        break;
      case 'raydium':
        addLog('output', 'Raydium Protocol — Solana AMM tooling, SDK, and pool integrations; 50+ developers supported; validated 20+ pool types and fee tiers; concentrated liquidity UX.');
        break;
      case 'projects':
        addLog('output', 'DEPLOYED SYSTEMS:');
        projects.forEach(p => addLog('output', `  > ${p.slug.padEnd(20)} [${p.title}]`));
        break;
      case 'open':
        if (!args[1]) {
          addLog('error', 'USAGE: open <project_slug>');
        } else {
          const p = projects.find(proj => proj.slug === args[1]);
          if (p) {
            addLog('system', `ROUTING TO ${p.slug.toUpperCase()}...`);
            setTimeout(() => setLocation(`/projects/${p.slug}`), 500);
          } else {
            addLog('error', `PROJECT NOT FOUND: ${args[1]}`);
          }
        }
        break;
      case 'download':
        if (args[1] === 'resume') {
          addLog('output', 'SELECT RESUME TYPE:');
          addLog('output', '  > download resume technical');
          addLog('output', '  > download resume business');
          addLog('output', '  > download resume founder');
        } else {
          addLog('error', 'USAGE: download resume <type>');
        }
        break;
      case 'stack':
        addLog('system', 'PRINTING TECH STACK...');
        addLog(
          'output',
          'Languages: Rust, Solidity, TypeScript, JavaScript, Python, Java, C++'
        );
        addLog(
          'output',
          'Frontend: React, Next.js, TailwindCSS, Vite'
        );
        addLog(
          'output',
          'Backend & Data: Node.js, Express, Supabase, PostgreSQL, MongoDB, Firebase'
        );
        addLog(
          'output',
          'Web3 & Protocols: Solana, Ethereum, Ethers.js, Hardhat, Foundry, OpenZeppelin, IPFS'
        );
        addLog(
          'output',
          'DevOps & Infra: Git, Docker, Linux, Nginx, Vercel, Render'
        );
        addLog(
          'output',
          'AI / Agentic: LLM workflows, agentic AI systems, AI-native automation, stablecoin payment rails'
        );
        addLog(
          'output',
          'GTM / BD: partnerships, launch playbooks, ecosystem growth, quantified distribution'
        );
        break;
      case 'focus':
        addLog('system', 'CURRENT FOCUS:');
        addLog(
          'output',
          'Ship product with measurable traction — agentic systems that move money safely, GTM/partnership loops with KPIs.'
        );
        addLog(
          'output',
          'Stablecoin rails, DCA/vault strategies, dashboards for founders, tooling ecosystems can adopt with confidence.'
        );
        break;
      case 'achievements':
        addLog('system', 'HEADLINE ACHIEVEMENTS:');
        addLog('output', '- Grew Webcoin Labs social/community from ~1K to 21K+ reach.');
        addLog('output', '- Connected 100+ startups with builders, partners, and investors.');
        addLog('output', '- Supported fundraising initiatives contributing to $50K+ raised.');
        addLog('output', '- Managed a 1,500+ influencer / KOL network for campaigns.');
        addLog('output', '- Mini Cast Store reached 1,500+ users in its first week with 25+ developers listing apps.');
        addLog('output', '- ALTAVA GROUP internship: remote SDE work across Next.js and blockchain product flows.');
        addLog('output', '- Built multiple production-style products across payments, AI, dashboards, and infra.');
        break;
      case 'badges':
        if (badgesUnlocked.length === 0) {
          addLog('output', 'No badges unlocked yet. Keep exploring.');
        } else {
          addLog('output', 'UNLOCKED ACHIEVEMENTS:');
          badgesUnlocked.forEach(b => addLog('output', `  [*] ${b}`));
        }
        break;
      case 'riddle':
        if (riddleSolved) {
          addLog('output', 'Riddle already solved. Classified area unlocked.');
          addLog('system', 'ROUTING TO /private...');
          setTimeout(() => setLocation('/private'), 800);
        } else {
          addLog('system', 'INITIATING SECURITY OVERRIDE PROTOCOL...');
          addLog('output', 'RIDDLE: I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?');
          addLog('output', "To answer, type: 'answer <your_guess>'");
        }
        break;
      case 'answer':
        if (!args[1]) {
          addLog('error', 'USAGE: answer <your_guess>');
        } else if (args[1] === 'echo') {
          addLog('system', 'OVERRIDE ACCEPTED.');
          solveRiddle();
          addLog('output', 'Access to /private has been granted.');
        } else {
          addLog('error', 'INCORRECT. SECURITY LOCK REMAINS.');
        }
        break;
      case 'clear':
        setLogs([]);
        break;
      default:
        addLog('error', `COMMAND NOT FOUND: ${main}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic autocomplete for open command
      if (input.startsWith('open ')) {
        const partial = input.split(' ')[1];
        const match = projects.find(p => p.slug.startsWith(partial));
        if (match) setInput(`open ${match.slug}`);
      }
    }
  };

  return (
    <motion.div 
      className="glass-panel rounded-xl h-[400px] md:h-[500px] flex flex-col overflow-hidden font-mono text-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-zinc-200/60 dark:bg-black/40 px-4 py-2 border-b border-zinc-200/80 dark:border-white/10 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="ml-2 text-xs text-muted-foreground">guest@sys_admin:~</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 terminal-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className="mb-1">
            {log.type === 'input' && (
              <div className="flex gap-2 text-zinc-950 dark:text-white">
                <span className="text-secondary">❯</span>
                <span>{log.content}</span>
              </div>
            )}
            {log.type === 'output' && (
              <div className="text-muted-foreground whitespace-pre-wrap">{log.content}</div>
            )}
            {log.type === 'error' && (
              <div className="text-destructive">{log.content}</div>
            )}
            {log.type === 'system' && (
              <div className="text-primary italic">{log.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-black/20 flex items-center gap-2 border-t border-zinc-200/80 dark:border-white/5">
        <span className="text-secondary font-bold animate-pulse">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-zinc-950 dark:text-white font-mono placeholder:text-muted-foreground/30 magnet-target"
          placeholder="Enter command..."
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </motion.div>
  );
}
