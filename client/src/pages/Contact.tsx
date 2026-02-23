import { Layout } from '@/components/Layout';
import { TerminalCmd } from '@/components/TerminalCmd';
import { useSubmitContact } from '@/hooks/use-contact';
import { useGamification } from '@/hooks/use-gamification';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const { trackCloser } = useGamification();
  const contactMutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCloser();
    contactMutation.mutate({ name, email, message });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        
        {/* Left Side: Terminal */}
        <div className="space-y-6">
          <header>
            <h1 className="text-4xl font-bold text-white mb-2">Interface</h1>
            <p className="text-muted-foreground">Use the terminal for direct system access.</p>
          </header>
          <TerminalCmd />
        </div>

        {/* Right Side: Form */}
        <div className="space-y-6 lg:mt-[4.5rem]">
          <motion.div 
            className="glass-panel p-8 rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Standard Transmission</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">ID / Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all magnet-target"
                  placeholder="Enter designator"
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Comms Link / Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all magnet-target"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Payload / Message</label>
                <textarea
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none magnet-target"
                  placeholder="Enter your message"
                />
              </div>
              
              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 magnet-target mt-4"
              >
                {contactMutation.isPending ? 'Encrypting...' : 'Transmit Payload'} 
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </Layout>
  );
}
