'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, CheckCircle2, AlertCircle, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const terms = [
    {
      icon: CheckCircle2,
      title: "1. Acceptance of Terms",
      content: "By accessing and using our website and services, you accept and agree to be bound by these terms. Usage of specific services (Video, AI) may be subject to additional contracts."
    },
    {
      icon: Scale,
      title: "2. Intellectual Property",
      content: "Content on this site is property of Logician Creatives. However, upon full payment, full ownership of client projects (final exports, code) is transferred to the client."
    },
    {
      icon: Ban,
      title: "3. Prohibited Conduct",
      content: "You agree not to use our services for any unlawful purpose. We reserve the right to refuse projects that violate ethical guidelines or promote hate speech."
    },
    {
      icon: AlertCircle,
      title: "4. Limitation of Liability",
      content: "Logician Creatives is not liable for indirect damages or loss of profits. Our liability is limited to the amount paid for the specific service rendered."
    }
  ];

  return (
    <div className="bg-black text-zinc-400 font-sans selection:bg-pink-500/30 w-full overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-900/20 blur-[100px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-32">
        
        {/* Navigation & Header */}
        <div className="max-w-2xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8 group py-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
              <FileText className="w-3 h-3" />
              Agreements
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Clear rules for clear results. These terms define the professional relationship between you and Logician Creatives.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {terms.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-xs text-zinc-600 border-t border-white/5 pt-8"
        >
          By using our services, you acknowledge that you have read and understood these terms.
          <br className="hidden sm:block" />
          Last updated: February 2026
        </motion.div>

      </div>
    </div>
  );
}