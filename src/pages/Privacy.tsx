'use client';

import { motion } from 'framer-motion';
import { 
  ArrowLeft, Shield, Lock, Eye, Server, Mail, 
  Cookie, Share2, UserCog, FileCode, Cpu, HardDrive 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: "Beyond basic contact details, we collect 'Project Assets' such as raw video footage, brand guidelines, and specific inputs required for configuring AI agents."
    },
    {
      icon: FileCode,
      title: "2. Handling of Assets",
      content: "We treat your intellectual property (raw footage, source code) as strictly confidential. Assets are stored on encrypted local and cloud servers."
    },
    {
      icon: Cpu,
      title: "3. AI & Automation Data",
      content: "For AI services, we process data to configure models. We do not use your proprietary business data to train public foundation models without consent."
    },
    {
      icon: Server,
      title: "4. How We Use Data",
      content: "We use your info strictly to deliver services (video production, web dev), process payments, and communicate. We do not use project data for marketing."
    },
    {
      icon: Share2,
      title: "5. Third-Party Sharing",
      content: "We partner with trusted providers (Vercel, Frame.io, OpenAI). Data is shared only to the extent necessary to fulfill the service."
    },
    {
      icon: Lock,
      title: "6. Security Measures",
      content: "We employ AES-256 encryption and TLS. We enforce strict access controls and Non-Disclosure Agreements (NDAs) with all team members."
    },
    {
      icon: HardDrive,
      title: "7. Data Retention",
      content: "Raw video assets are typically purged 90 days after project completion unless a retainer agreement is in place."
    },
    {
      icon: Cookie,
      title: "8. Cookies & Analytics",
      content: "We use cookies to understand how visitors interact with our portfolio. You can manage your cookie preferences through your browser settings."
    },
  ];

  return (
    <div className="bg-black text-zinc-400 font-sans selection:bg-purple-500/30 w-full relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* ✅ FIX: Changed pb-10 to pb-0 to remove space before the footer */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-0">
        
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Shield className="w-3 h-3" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Trust is the foundation of creativity. Here is how we protect your data, your code, and your footage at Logician Creatives.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="group p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <section.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Contact - Added mb-0 just to be safe */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 pb-12 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-white font-bold mb-1">Questions regarding your assets?</h3>
            <p className="text-sm text-zinc-500">We are happy to provide specific security details.</p>
          </div>
          <a 
            href="mailto:privacy@logician.com" 
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact DPO
          </a>
        </motion.div>

      </div>
    </div>
  );
}