'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('loading');
    
    // ✅ Restored the Real Backend Logic
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTeaVRbmbLLXNg8yRzb-ayEN8Ex6hX9DSIbWSmJUHIRZbba6Rl1CJ3NtcDhuxBTzI/exec";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      setStatus('success');
      
      // Reset after success
      setTimeout(() => {
        setEmail('');
        setStatus('idle');
      }, 4000);

    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden border-t border-white/[0.05] bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,transparent_60%)] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 mb-4 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 tracking-tighter uppercase text-white drop-shadow-xl">
            Stay in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Loop</span>
          </h2>
          
          <p className="text-white/50 text-xs sm:text-sm mb-6 sm:mb-8 font-light tracking-[0.1em] uppercase">
            Insights, updates, and creative inspiration.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm tracking-wide">You're in! Check your inbox.</span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={status === 'loading'}
                      className={cn(
                        'w-full px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-full',
                        'bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] shadow-sm',
                        'text-white placeholder:text-white/30 text-sm font-medium',
                        'focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06]',
                        'transition-all duration-300',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === 'loading' || !email.includes('@')}
                    className={cn(
                      'relative overflow-hidden px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm tracking-wide',
                      'bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 shadow-sm text-cyan-50',
                      'flex items-center justify-center gap-2',
                      'hover:bg-cyan-500/20 active:scale-95 transition-all',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="hidden sm:inline">Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {[
              'No spam, ever',
              'Unsubscribe anytime',
              '10K+ subscribers'
            ].map((text) => (
              <span key={text} className="flex items-center gap-2 text-[10px] sm:text-xs text-white/40 font-medium uppercase tracking-widest">
                <span className="w-1 h-1 rounded-full bg-white/50" />
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}