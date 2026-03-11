import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, Eye, X } from 'lucide-react';

type LineType = 'input' | 'output' | 'error' | 'system' | 'success';

interface TerminalLine {
  id: number;
  type: LineType;
  content: string;
}

interface ResumeItem {
  id: string;
  label: string;
  subtitle: string;
  path: string;
}

interface ResumeTerminalProps {
  onClose: () => void;
}

const SECRET_KEY = 'anshit';
const STORAGE_KEY = 'resume_vault_unlocked';

const WEB2_RESUMES: ResumeItem[] = [
  {
    id: '1',
    label: 'Technical CV',
    subtitle: 'Web2 systems, engineering, and infrastructure',
    path: '/resumes/web2-technical.pdf',
  },
  {
    id: '2',
    label: "Founder's Office CV",
    subtitle: 'Operations, strategy, and founder support',
    path: '/resumes/web2-founder-office.pdf',
  },
  {
    id: '3',
    label: 'Business / GTM CV',
    subtitle: 'Business development, growth, and GTM execution',
    path: '/resumes/web2-bdm-gtm.pdf',
  },
];

const WEB3_RESUMES: ResumeItem[] = [
  {
    id: 'w1',
    label: 'Web3 Technical CV',
    subtitle: 'Smart contracts, protocol tooling, and infra',
    path: '/resumes/web3-technical.pdf',
  },
  {
    id: 'w2',
    label: "Web3 Founder's Office CV",
    subtitle: 'Ecosystem building, partnerships, and execution',
    path: '/resumes/web3-founder-office.pdf',
  },
  {
    id: 'w3',
    label: 'Web3 Business / GTM CV',
    subtitle: 'Token growth, community, and partnerships',
    path: '/resumes/web3-bdm-gtm.pdf',
  },
];

export function ResumeTerminal({ onClose }: ResumeTerminalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [awaitingSecret, setAwaitingSecret] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [web3Unlocked, setWeb3Unlocked] = useState(false);
  const [selectedWeb2, setSelectedWeb2] = useState<string | null>(null);
  const [selectedWeb3, setSelectedWeb3] = useState<string | null>(null);
  const [readyForInput, setReadyForInput] = useState(false);

  const nextLineIdRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number[]>([]);
  const activeRef = useRef(true);

  useEffect(() => {
    return () => {
      activeRef.current = false;
      timeoutRef.current.forEach(window.clearTimeout);
      timeoutRef.current = [];
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [lines, prefersReducedMotion]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const sleep = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, ms);
      timeoutRef.current.push(timer);
    });
  }, []);

  const appendLine = useCallback((type: LineType, content: string) => {
    const lineId = nextLineIdRef.current;
    nextLineIdRef.current += 1;
    setLines((previous) => [...previous, { id: lineId, type, content }]);
  }, []);

  const appendTypedLine = useCallback(
    async (type: LineType, content: string, speed = 18) => {
      if (!activeRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        appendLine(type, content);
        return;
      }

      const lineId = nextLineIdRef.current;
      nextLineIdRef.current += 1;
      setLines((previous) => [...previous, { id: lineId, type, content: '' }]);

      for (let index = 0; index < content.length; index += 1) {
        if (!activeRef.current) {
          return;
        }

        const nextSlice = content.slice(0, index + 1);
        setLines((previous) =>
          previous.map((line) => (line.id === lineId ? { ...line, content: nextSlice } : line)),
        );
        await sleep(speed);
      }
    },
    [appendLine, prefersReducedMotion, sleep],
  );

  const showBaseAccessMessage = useCallback(async () => {
    await appendTypedLine('success', 'Access Granted.');
    await appendTypedLine('success', 'You cracked the code.');
    await appendTypedLine('output', 'Available candidate profiles detected.');
    await appendTypedLine('output', 'Which resume would you like to view?');
    await appendTypedLine('output', '1. Technical CV');
    await appendTypedLine('output', "2. Founder's Office CV");
    await appendTypedLine('output', '3. Business / GTM CV');
    await appendTypedLine('output', 'Would you like to see Web3-specific resumes of Anshit Raj?');
    await appendTypedLine('output', "Type 'yes' to unlock them.");
  }, [appendTypedLine]);

  const startDecodeSequence = useCallback(async () => {
    setIsDecoding(true);
    appendLine('system', 'Key accepted. Beginning secure decode.');

    const decodeLines = [
      'decrypting resume vault...',
      'verifying credentials...',
      'initializing candidate profile...',
      'decoding career tracks...',
    ];

    if (prefersReducedMotion) {
      decodeLines.forEach((line) => appendLine('system', line));
      await sleep(180);
    } else {
      for (const line of decodeLines) {
        await appendTypedLine('system', line, 20);
        await sleep(260);
      }
      await sleep(450);
    }

    if (!activeRef.current) {
      return;
    }

    setIsDecoding(false);
    setIsUnlocked(true);
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
    await showBaseAccessMessage();
  }, [appendLine, appendTypedLine, prefersReducedMotion, showBaseAccessMessage, sleep]);

  const unlockWeb3 = useCallback(async () => {
    if (web3Unlocked) {
      appendLine('output', 'Web3 resume profiles are already unlocked.');
      return;
    }

    setWeb3Unlocked(true);
    appendLine('success', 'Web3 profile vault unlocked.');
    await appendTypedLine('output', 'Web3 Technical CV -> type w1');
    await appendTypedLine('output', "Web3 Founder's Office CV -> type w2");
    await appendTypedLine('output', 'Web3 Business / GTM CV -> type w3');
  }, [appendLine, appendTypedLine, web3Unlocked]);

  const handleUnlockedInput = useCallback(
    async (command: string) => {
      if (command === '1' || command === '2' || command === '3') {
        setSelectedWeb2(command);
        const match = WEB2_RESUMES.find((resume) => resume.id === command);
        if (match) {
          appendLine('success', `Selected ${match.label}. Use View or Download.`);
        }
        return;
      }

      if (command === 'yes') {
        await unlockWeb3();
        return;
      }

      if (command === 'w1' || command === 'w2' || command === 'w3') {
        if (!web3Unlocked) {
          appendLine('error', "Web3 vault is locked. Type 'yes' first.");
          return;
        }

        setSelectedWeb3(command);
        const match = WEB3_RESUMES.find((resume) => resume.id === command);
        if (match) {
          appendLine('success', `Selected ${match.label}. Use View or Download.`);
        }
        return;
      }

      if (command === 'help') {
        appendLine('output', 'Commands: 1, 2, 3, yes, w1, w2, w3');
        return;
      }

      appendLine('error', "Invalid command. Use 1/2/3, type 'yes', or run 'help'.");
    },
    [appendLine, unlockWeb3, web3Unlocked],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isDecoding) {
      return;
    }

    appendLine('input', trimmedInput);
    setInput('');

    if (!isUnlocked) {
      if (!awaitingSecret) {
        appendLine('system', 'Boot sequence running. Please wait...');
        return;
      }

      if (trimmedInput.toLowerCase() === SECRET_KEY) {
        setAwaitingSecret(false);
        await startDecodeSequence();
      } else {
        appendLine('error', 'Access Denied.');
        appendLine('error', 'Incorrect key. Try again.');
      }
      return;
    }

    await handleUnlockedInput(trimmedInput.toLowerCase());
  };

  useEffect(() => {
    const initializeTerminal = async () => {
      setReadyForInput(false);
      await appendTypedLine('system', 'Secure Resume Vault Detected...');
      const previouslyUnlocked = window.sessionStorage.getItem(STORAGE_KEY) === 'true';

      if (previouslyUnlocked) {
        setIsUnlocked(true);
        await appendTypedLine('success', 'Session key recognized.');
        await showBaseAccessMessage();
      } else {
        await appendTypedLine('output', 'Enter the secret key Anshit Raj Yadav gave you:');
        setAwaitingSecret(true);
      }

      if (activeRef.current) {
        setReadyForInput(true);
      }
    };

    initializeTerminal();
  }, [appendTypedLine, showBaseAccessMessage]);

  const activeWeb2Resume = WEB2_RESUMES.find((resume) => resume.id === selectedWeb2);
  const activeWeb3Resume = WEB3_RESUMES.find((resume) => resume.id === selectedWeb3);
  const hackerMode = isDecoding || isUnlocked;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
      className={`relative h-[86vh] max-h-[760px] min-h-[480px] w-full overflow-hidden rounded-2xl border bg-black/95 font-mono ${
        hackerMode
          ? 'border-emerald-400/60 shadow-[0_0_45px_rgba(16,185,129,0.28)]'
          : 'border-primary/50 shadow-[0_0_45px_rgba(147,51,234,0.2)]'
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className={`text-[10px] uppercase tracking-[0.25em] ${hackerMode ? 'text-emerald-300' : 'text-secondary'}`}>
            secure-resume-vault@anshit
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-white/25 hover:text-white"
        >
          Close
          <X className="h-3 w-3" />
        </button>
      </div>

      <div className={`relative h-[calc(100%-110px)] overflow-y-auto p-4 text-xs sm:text-sm terminal-scrollbar ${isDecoding && !prefersReducedMotion ? 'resume-vault-scan' : ''}`}>
        {lines.map((line) => (
          <div key={line.id} className="mb-1.5 whitespace-pre-wrap break-words">
            {line.type === 'input' && (
              <div className="flex items-start gap-2 text-white">
                <span className={hackerMode ? 'text-emerald-400' : 'text-secondary'}>&gt;</span>
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && <div className={hackerMode ? 'text-emerald-200/90' : 'text-muted-foreground'}>{line.content}</div>}
            {line.type === 'system' && <div className={hackerMode ? 'text-emerald-400' : 'text-primary'}>{line.content}</div>}
            {line.type === 'success' && <div className="text-emerald-300">{line.content}</div>}
            {line.type === 'error' && <div className="text-destructive">{line.content}</div>}
          </div>
        ))}

        {isDecoding && (
          <div className="mt-2 text-emerald-300">
            processing...
            <span className="terminal-cursor">|</span>
          </div>
        )}

        {isUnlocked && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-300">Web2 Resume Profiles</div>
              <div className="grid gap-2">
                {WEB2_RESUMES.map((resume) => {
                  const isActive = activeWeb2Resume?.id === resume.id;
                  return (
                    <div
                      key={resume.id}
                      className={`rounded-xl border px-3 py-2 ${isActive ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/10 bg-white/5'}`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedWeb2(resume.id)}
                        className="w-full text-left"
                      >
                        <div className="text-sm font-semibold text-white">
                          {resume.id}. {resume.label}
                        </div>
                        <p className="text-[11px] text-muted-foreground">{resume.subtitle}</p>
                      </button>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a
                          href={resume.path}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-emerald-300/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-200 hover:bg-emerald-500/20"
                        >
                          <Eye className="h-3 w-3" />
                          View Resume
                        </a>
                        <a
                          href={resume.path}
                          download
                          className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white hover:bg-white/10"
                        >
                          <Download className="h-3 w-3" />
                          Download Resume
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {web3Unlocked && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-300">Web3 Resume Profiles</div>
                <div className="grid gap-2">
                  {WEB3_RESUMES.map((resume, index) => {
                    const command = `w${index + 1}`;
                    const isActive = activeWeb3Resume?.id === resume.id;
                    return (
                      <div
                        key={resume.id}
                        className={`rounded-xl border px-3 py-2 ${isActive ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/10 bg-white/5'}`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedWeb3(command)}
                          className="w-full text-left"
                        >
                          <div className="text-sm font-semibold text-white">{resume.label}</div>
                          <p className="text-[11px] text-muted-foreground">{resume.subtitle}</p>
                        </button>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <a
                            href={resume.path}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-emerald-300/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-200 hover:bg-emerald-500/20"
                          >
                            <Eye className="h-3 w-3" />
                            View Resume
                          </a>
                          <a
                            href={resume.path}
                            download
                            className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white hover:bg-white/10"
                          >
                            <Download className="h-3 w-3" />
                            Download Resume
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        className="flex items-center gap-2 border-t border-white/10 bg-black/80 px-4 py-3"
      >
        <span className={`text-sm ${hackerMode ? 'text-emerald-400' : 'text-secondary'}`}>
          &gt;
          <span className="terminal-cursor">|</span>
        </span>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={!readyForInput || isDecoding}
          className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-muted-foreground/50 sm:text-sm"
          placeholder={
            !readyForInput
              ? 'Initializing vault...'
              : isDecoding
                ? 'Decoding in progress...'
                : awaitingSecret && !isUnlocked
                  ? 'Enter secret key...'
                  : "Type 1/2/3, yes, or help..."
          }
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </motion.div>
  );
}
