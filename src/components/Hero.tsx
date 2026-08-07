'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full h-[100svh] bg-gradient-to-b from-[#90a0b2] via-[#4a5868] to-[#030303] overflow-hidden selection:bg-white/30 font-sans flex flex-col items-center">
      
      {/* --- BACKGROUND TYPOGRAPHY --- */}
      <div className="absolute top-[18%] md:top-[22%] w-full flex flex-col items-center justify-center z-10 pointer-events-none px-4">
        
        {/* MOBILE ONLY TEXT ("LOGICIAN CREATIVES") */}
        <motion.h1 
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden text-[17vw] leading-[0.85] font-black tracking-tighter text-white text-center uppercase drop-shadow-2xl"
        >
          LOGICIAN<br />CREATIVES
        </motion.h1>

        {/* DESKTOP ONLY TEXT ("SURAJ") */}
        <motion.h1 
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block text-[22vw] lg:text-[18rem] leading-none font-black tracking-tighter text-white text-center uppercase drop-shadow-2xl whitespace-nowrap"
        >
          SURAJ
        </motion.h1>

      </div>

      {/* --- CENTER PNG IMAGE (SOLID SLIDE-IN) --- */}
      <motion.div 
        initial={{ y: "30vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        className="absolute bottom-[28vh] md:bottom-[5vh] z-20 w-full h-[90vh] md:h-[90vh] max-w-3xl mx-auto flex justify-center pointer-events-none"
      >
        {/* INNER WRAPPER: Handles your exact scale and position separately to fix lag without moving the image */}
        <div className="w-full h-full flex justify-center origin-bottom scale-[1.45] md:scale-[1.35] -translate-x-8 md:translate-x-0 transform-gpu will-change-transform">
          <img 
            src="/suraj-cutout.png" 
            alt="Suraj Kumar" 
            className="object-contain object-bottom w-full h-full drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* --- STATIC BLACK STRIP BELOW FADE --- */}
      <div className="absolute bottom-0 z-30 w-full h-[12vh] md:h-[4vh] bg-[#030303] pointer-events-none" />

      {/* --- BLACK FADE TO HIDE EDGES --- */}
      <div className="absolute bottom-[12vh] md:bottom-[4vh] z-30 w-full h-[30vh] md:h-[40vh] bg-gradient-to-t from-[#030303] via-[#030303]/95 md:via-[#030303]/40 to-transparent md:to-[#030303]/0 pointer-events-none" />

      {/* --- FLOATING LABELS (DESKTOP ONLY) --- */}
      <div className="hidden md:block absolute top-[45%] left-[2%] lg:left-[5%] z-40 -translate-y-1/2">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="text-white/70 text-lg lg:text-xl font-light tracking-[0.2em] uppercase drop-shadow-lg"
        >
          Video Editor
        </motion.span>
      </div>
      
      <div className="hidden md:block absolute top-[45%] right-[2%] lg:right-[5%] z-40 -translate-y-1/2">
        <motion.span 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
          className="text-white/70 text-lg lg:text-xl font-light tracking-[0.2em] uppercase drop-shadow-lg"
        >
          Software Developer
        </motion.span>
      </div>

      {/* --- MOBILE ONLY TEXT (NAME & TITLE) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden absolute bottom-[18vh] z-40 flex flex-col items-center w-full px-5 space-y-1"
      >
        <h2 className="text-white text-2xl font-semibold tracking-wide">Suraj Kumar</h2>
        <p className="text-white/60 text-xs font-light tracking-[0.15em] uppercase text-center">
          Video Editor <span className="text-white/30 mx-1">|</span> Software Developer
        </p>
      </motion.div>

      {/* --- BOTTOM SECTION (CTA ONLY) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 md:bottom-12 z-40 flex flex-col items-center w-full px-5 pt-6 pb-6 md:pt-0 md:pb-0 gap-4 md:gap-6"
      >
        
        <div className="flex items-center justify-center w-[80%] max-w-[240px] md:w-full md:max-w-sm gap-2 md:gap-4 mt-1">
          {/* BUTTON: View Work */}
          <a 
            href="#portfolio" 
            onClick={(e) => scrollToSection(e, '#portfolio')}
            className="relative overflow-hidden flex-1 text-center px-2 py-2 md:px-4 md:py-3.5 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 text-white text-[11px] md:text-sm font-bold tracking-wide transition-all hover:bg-cyan-500/20 active:scale-95 shadow-sm"
          >
            <span className="relative z-10 text-cyan-50">View Work</span>
          </a>
          
          {/* BUTTON: Contact */}
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, '#contact')}
            className="relative overflow-hidden flex-1 text-center px-2 py-2 md:px-4 md:py-3.5 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white text-[11px] md:text-sm font-bold tracking-wide transition-all hover:bg-white/[0.06] hover:border-white/20 active:scale-95 shadow-sm"
          >
            <span className="relative z-10">Contact</span>
          </a>
        </div>

        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 mt-2 text-white/50"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium hidden md:block">Scroll Down</span>
        </motion.div>
      </motion.div>

    </section>
  );
}