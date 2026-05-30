'use client';

import { motion } from 'framer-motion';
import { Youtube, Twitter, Instagram, Linkedin, Github, Sparkles, FileText, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Data Arrays
const serviceShortcuts = [
  { title: 'Video Editing', href: '/services/video-editing' },
  { title: 'AI Agents', href: '/services/ai-agents' },
  { title: 'Web Development', href: '/services/web-dev' },
];

const socialLinks = [
  { Icon: Youtube, href: 'https://youtube.com/@logiciancreatives', label: 'YouTube' },
  { Icon: Twitter, href: 'https://x.com/Suraj_cix', label: 'X' },
  { Icon: Instagram, href: 'https://www.instagram.com/logiciancreatives/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/suraj-kumar0/', label: 'LinkedIn' },
  { Icon: Github, href: 'https://github.com/Logician0', label: 'GitHub' },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (sectionId: string) => {
    const isHome = location.pathname === '/';
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <footer className="relative z-50 border-t border-white/5 bg-black" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ==================================================================
            📱 MOBILE FOOTER (Ultra Compact & Fixed)
           ================================================================== */}
        <div className="block md:hidden py-6">
          <div className="flex flex-col gap-5">
            
            {/* 1. Header Row: Brand Left, Socials Right */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               {/* Brand */}
               <Link to="/" className="flex items-center gap-2" onClick={scrollToTop}>
                  <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                  <span className="text-sm font-bold text-white">Logician</span>
               </Link>

               {/* Social Icons (Flex Wrap to show all) */}
               <div className="flex items-center gap-1.5 flex-wrap justify-end max-w-[50%]">
                {socialLinks.map(({ Icon, href }) => (
                  <a 
                    key={href} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Compact Link Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Services Column */}
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Services</h4>
                <ul className="space-y-1.5">
                  {serviceShortcuts.map((service) => (
                    <li key={service.href}>
                      <Link to={service.href} className="text-[11px] text-zinc-300 block hover:text-white" onClick={scrollToTop}>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Company</h4>
                <ul className="space-y-1.5">
                  <li><button onClick={() => handleNav('about')} className="text-[11px] text-zinc-300 text-left w-full hover:text-white">About</button></li>
                  <li><button onClick={() => handleNav('process')} className="text-[11px] text-zinc-300 text-left w-full hover:text-white">Process</button></li>
                  <li><Link to="/careers" className="text-[11px] text-zinc-300 block hover:text-white" onClick={scrollToTop}>Careers</Link></li>
                  <li><button onClick={() => handleNav('contact')} className="text-[11px] text-zinc-300 text-left w-full hover:text-white">Contact</button></li>
                </ul>
              </div>
            </div>

            {/* 3. Legal & Copyright (Centered) */}
            <div className="pt-4 border-t border-white/5 flex flex-col gap-3 items-center text-center">
               <div className="flex gap-4 justify-center w-full">
                 <Link to="/privacy" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 text-[10px] text-zinc-400 hover:text-white transition-colors" onClick={scrollToTop}>
                    <Shield className="w-3 h-3" /> Privacy
                 </Link>
                 <Link to="/terms" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 text-[10px] text-zinc-400 hover:text-white transition-colors" onClick={scrollToTop}>
                    <FileText className="w-3 h-3" /> Terms
                 </Link>
               </div>
               <p className="text-[9px] text-zinc-600">© {new Date().getFullYear()} Logician Creatives</p>
            </div>
          </div>
        </div>

        {/* ==================================================================
            💻 DESKTOP FOOTER (Unchanged)
           ================================================================== */}
        <div className="hidden md:block py-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 pr-8">
              <Link to="/" className="flex items-center gap-2 mb-4 group" onClick={scrollToTop}>
                <motion.img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" whileHover={{ scale: 1.1, rotate: 10 }} />
                <span className="text-base font-bold text-white tracking-tight">Logician</span>
              </Link>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                We build digital ecosystems that dominate. From AI automation to cinematic storytelling, we are the architects of your growth.
              </p>
              <motion.button 
                onClick={() => handleNav('contact')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-3 h-3" />
                Start Project
              </motion.button>
            </div>

            <div className="col-span-3 border-l border-white/5 pl-8">
              <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2.5">
                {serviceShortcuts.map((service) => (
                  <li key={service.href}>
                    <Link to={service.href} className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group" onClick={scrollToTop}>
                      <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-purple-500 transition-colors" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 border-l border-white/5 pl-8">
              <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                <li><button onClick={() => handleNav('about')} className="text-xs text-zinc-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={() => handleNav('process')} className="text-xs text-zinc-400 hover:text-white transition-colors text-left">Process</button></li>
                <li><Link to="/careers" className="text-xs text-zinc-400 hover:text-white transition-colors" onClick={scrollToTop}>Careers</Link></li>
                <li><button onClick={() => handleNav('faq')} className="text-xs text-zinc-400 hover:text-white transition-colors text-left">FAQ</button></li>
              </ul>
            </div>

            <div className="col-span-3 border-l border-white/5 pl-8 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Connect</h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ Icon, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/5">
                 <div className="flex gap-4 mb-2">
                    <Link to="/privacy" className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                       <Shield className="w-3 h-3" /> Privacy
                    </Link>
                    <Link to="/terms" className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                       <FileText className="w-3 h-3" /> Terms
                    </Link>
                 </div>
                 <p className="text-[10px] text-zinc-600">© {new Date().getFullYear()} Logician Creatives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}