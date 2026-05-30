'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MessageSquare, User, Send, Loader2 } from 'lucide-react';

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    if (form.current) {
      emailjs.sendForm(
        'service_s7yikyc',    // Your Service ID
        'template_nfvwwoo',   // Your Template ID
        form.current,
        'GQ4FbqViDpRQZkMu1'   // Your Public Key
      )
      .then(() => {
        setLoading(false);
        setStatus('Message sent! I will get back to you soon.');
        if (form.current) form.current.reset();
      }, (error) => {
        setLoading(false);
        setStatus('Failed to send. Please try again.');
        console.error(error);
      });
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4 w-full max-w-md mx-auto">
      
      {/* Name Input */}
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
        <input 
          type="text" 
          name="from_name" 
          placeholder="Your Name" 
          required 
          className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all shadow-sm"
        />
      </div>

      {/* Email Input */}
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
        <input 
          type="email" 
          name="from_email" 
          placeholder="Your Email" 
          required 
          className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all shadow-sm"
        />
      </div>

      {/* Message Input */}
      <div className="relative group">
        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
        <textarea 
          name="message" 
          placeholder="Tell me about your project..." 
          required 
          className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all min-h-[140px] resize-none shadow-sm"
        />
      </div>

      {/* Submit Button (Liquid Glass) */}
      <button 
        type="submit" 
        disabled={loading}
        className="relative overflow-hidden w-full px-4 py-4 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 text-cyan-50 text-sm font-bold tracking-wide transition-all hover:bg-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 mt-2"
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </span>
      </button>

      {/* Status Message */}
      {status && (
        <p className={`text-center text-xs sm:text-sm mt-4 font-bold tracking-wide animate-in fade-in slide-in-from-bottom-2 ${status.includes('sent') ? 'text-white drop-shadow-md' : 'text-red-400'}`}>
          {status}
        </p>
      )}
    </form>
  );
}