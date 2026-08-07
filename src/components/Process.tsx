'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Palette, Code, Rocket } from 'lucide-react';
import { PremiumBackground } from '@/components/PremiumBackground';

const steps = [
  { id: 1, title: 'Discovery', Icon: MessageSquare, desc: 'I dive deep into your brand, audience, and goals to lay a solid foundation.' },
  { id: 2, title: 'Strategy', Icon: Lightbulb, desc: 'Crafting a customized blueprint and timeline to guarantee project success.' },
  { id: 3, title: 'Design', Icon: Palette, desc: 'Creating stunning, user-centric visual interfaces that captivate and convert.' },
  { id: 4, title: 'Develop', Icon: Code, desc: 'Writing clean, scalable, and high-performance code to bring the vision to life.' },
  { id: 5, title: 'Launch', Icon: Rocket, desc: 'Rigorous testing, optimization, and deploying your product to the world.' },
];

const aiTools = [
  { name: "ChatGPT", logo: "/images/chatgpt.jpg" },
  { name: "Claude", logo: "/images/claude.webp" },
  { name: "Gemini", logo: "/images/gemini.webp" },
  { name: "HeyGen", logo: "/images/heygen.jpg" },
  { name: "ElevenLabs", logo: "/images/elevenlabs.png" },
  { name: "Notion", logo: "/images/notion.png" },
  { name: "Midjourney", logo: "/images/midjurney.png" },
  { name: "Grok", logo: "/images/grok.avif" },
  { name: "Higgs Field", logo: "/images/higgsfield.jpeg" },
  { name: "Creative Cloud", logo: "/images/cc.jpg" },
  { name: "Audacity", logo: "/images/audacity.png" },
  { name: "DaVinci Resolve", logo: "/images/dr.png" }
];
const aiToolsRow1 = aiTools.slice(0, 6);
const aiToolsRow2 = aiTools.slice(6, 12);

// --- UNIVERSAL PROCESS LOOP ---
function ProcessLoop({ onStepChange }: { onStepChange: (step: number) => void }) {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const duration = 8000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) % duration;
      setProgress(elapsed / duration);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Geometry (Fixed Reference System: 340x240)
  const lineLen = 220;
  const arcLen = Math.PI * 30;
  const totalLen = (lineLen * 2) + (arcLen * 2);
  const p1 = lineLen / totalLen;
  const p2 = p1 + (arcLen / totalLen);
  const p3 = p2 + (lineLen / totalLen);

  // Memoize light position to prevent unnecessary recalculations
  const light = useMemo(() => {
    if (progress < p1) {
      const t = progress / p1;
      return { x: 60 + t * lineLen, y: 90 };
    } else if (progress < p2) {
      const t = (progress - p1) / (p2 - p1);
      const angle = -Math.PI / 2 + t * Math.PI;
      return { x: 280 + Math.cos(angle) * 30, y: 120 + Math.sin(angle) * 30 };
    } else if (progress < p3) {
      const t = (progress - p2) / (p3 - p2);
      return { x: 280 - t * lineLen, y: 150 };
    } else {
      const t = (progress - p3) / (1 - p3);
      const angle = Math.PI / 2 + t * Math.PI;
      return { x: 60 + Math.cos(angle) * 30, y: 120 + Math.sin(angle) * 30 };
    }
  }, [progress, p1, p2, p3, lineLen]);

  // Active Logic
  const activeStep = useMemo(() => {
    if (progress > 0.98) return 0; 
    if (progress > 0.73) return 5;
    if (progress > 0.57) return 4;
    if (progress > 0.33) return 3;
    if (progress > 0.16) return 2;
    return 1;
  }, [progress]);
  
  useEffect(() => {
    onStepChange(activeStep);
  }, [activeStep, onStepChange]);
  
  const isLineActive = (stepId: number) => stepId <= activeStep;

  // Colors for theme
  const ACTIVE_COLOR = "#06b6d4";
  const ACTIVE_GLOW = "#22d3ee";
  const INACTIVE_COLOR = "rgba(255,255,255,0.15)";
  const TRACK_COLOR = "rgba(255,255,255,0.05)";

  return (
    <div 
      className="relative w-[340px] h-[240px] mx-auto my-8 transform scale-100 sm:scale-125 md:scale-150 lg:scale-[1.35] xl:scale-[1.6] origin-center select-none"
      style={{ willChange: 'contents' }}
    >
      
      {/* --- CARDS --- */}
      <div className="absolute top-0 left-[60px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[0]} isActive={isLineActive(1)} />
      </div>
      <div className="absolute top-0 left-[170px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[1]} isActive={isLineActive(2)} />
      </div>
      <div className="absolute top-0 left-[280px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[2]} isActive={isLineActive(3)} />
      </div>
      <div className="absolute bottom-0 left-[220px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[3]} isActive={isLineActive(4)} />
      </div>
      <div className="absolute bottom-0 left-[120px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[4]} isActive={isLineActive(5)} />
      </div>

      {/* --- SVG LAYER --- */}
      <svg className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none" aria-hidden="true">
         {/* Vertical Pipes */}
         <line x1="60" y1="65" x2="60" y2="90" stroke={isLineActive(1) ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="170" y1="65" x2="170" y2="90" stroke={isLineActive(2) ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="280" y1="65" x2="280" y2="90" stroke={isLineActive(3) ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="220" y1="175" x2="220" y2="150" stroke={isLineActive(4) ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="120" y1="175" x2="120" y2="150" stroke={isLineActive(5) ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" className="transition-colors duration-200" />

         {/* Empty Track */}
         <path 
           d="M 60,90 L 280,90 A 30,30 0 0 1 280,150 L 60,150 A 30,30 0 0 1 60,90"
           fill="none"
           stroke={TRACK_COLOR}
           strokeWidth="4"
           strokeLinecap="round"
         />

         {/* Filling Light Beam */}
         <path 
           d="M 60,90 L 280,90 A 30,30 0 0 1 280,150 L 60,150 A 30,30 0 0 1 60,90"
           fill="none"
           stroke={ACTIVE_COLOR}
           strokeWidth="4"
           strokeLinecap="round"
           strokeDasharray={totalLen} 
           strokeDashoffset={totalLen * (1 - progress)}
           style={{ willChange: 'stroke-dashoffset' }} // Optimization
         />

         {/* Junction Dots */}
         <circle cx="60" cy="90" r="3" fill={isLineActive(1) ? ACTIVE_COLOR : INACTIVE_COLOR} className="transition-colors duration-200" />
         <circle cx="170" cy="90" r="3" fill={isLineActive(2) ? ACTIVE_COLOR : INACTIVE_COLOR} className="transition-colors duration-200" />
         <circle cx="280" cy="90" r="3" fill={isLineActive(3) ? ACTIVE_COLOR : INACTIVE_COLOR} className="transition-colors duration-200" />
         <circle cx="220" cy="150" r="3" fill={isLineActive(4) ? ACTIVE_COLOR : INACTIVE_COLOR} className="transition-colors duration-200" />
         <circle cx="120" cy="150" r="3" fill={isLineActive(5) ? ACTIVE_COLOR : INACTIVE_COLOR} className="transition-colors duration-200" />

         {/* Ball / Photon */}
         <g style={{ willChange: 'transform' }}>
            <circle cx={light.x} cy={light.y} r="6" fill={ACTIVE_GLOW} fillOpacity="0.8" />
            <circle cx={light.x} cy={light.y} r="3" fill="#ffffff" />
         </g>
      </svg>
    </div>
  );
}

// PERFORMANCE: Wrapped in React.memo to stop 60FPS re-renders
const ProcessCard = React.memo(({ step, isActive }: { step: typeof steps[0], isActive: boolean }) => {
  return (
    <motion.div
      className={`relative w-[64px] h-[64px] rounded-2xl flex flex-col items-center justify-center border backdrop-blur-sm transition-all duration-300 z-10 ${
        isActive 
          ? 'bg-cyan-900/30 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-110' 
          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
      }`}
    >
      <step.Icon size={18} className={`mb-1 transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} aria-hidden="true" />
      
      <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
        {step.title}
      </span>
      
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border transition-colors duration-300 shadow-sm ${
         isActive ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-zinc-900 text-white/40 border-white/[0.08]'
      }`}>
        {step.id}
      </div>
    </motion.div>
  );
});

export function Process() {
  const [activeStepId, setActiveStepId] = useState(1);

  return (
    <section id="process" className="py-16 md:py-32 relative overflow-hidden flex flex-col items-center justify-center font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl px-4 lg:px-8 mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
            <span className="text-[9px] md:text-[11px] font-bold text-white/50 tracking-[0.2em] uppercase">
              Methodology
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter uppercase drop-shadow-xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Process</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light tracking-[0.1em] uppercase">
            A proven path to digital dominance.
          </p>
        </motion.div>

        {/* Layout: Diagram Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-24">
          
          {/* Left Column: Animation */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center h-[300px] sm:h-[400px]">
            <ProcessLoop onStepChange={(step) => setActiveStepId(step || 1)} />
          </div>

          {/* Right Column: Static List of Descriptions */}
          <div className="hidden lg:flex w-full lg:w-1/2 flex-col gap-2.5 max-w-lg mx-auto lg:mx-0">
             {steps.map((step) => (
               <div 
                 key={step.id} 
                 className={`flex gap-3.5 p-3 md:p-4 rounded-xl border transition-all duration-500 transform-gpu ${
                   activeStepId === step.id 
                     ? 'bg-cyan-900/20 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.02] md:scale-105 z-10' 
                     : 'bg-white/[0.02] border-white/[0.05] opacity-50 scale-100 z-0'
                 }`}
               >
                 <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors duration-500 ${
                   activeStepId === step.id 
                     ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' 
                     : 'bg-white/5 border-white/10 text-white/40'
                 }`}>
                    <step.Icon size={12} />
                 </div>
                 <div>
                    <h3 className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-0.5 transition-colors duration-500 ${
                      activeStepId === step.id ? 'text-white' : 'text-white/60'
                    }`}>
                      0{step.id}. {step.title}
                    </h3>
                    <p className={`text-[10px] md:text-xs leading-relaxed transition-colors duration-500 ${
                      activeStepId === step.id ? 'text-white/80' : 'text-white/40'
                    }`}>
                      {step.desc}
                    </p>
                 </div>
               </div>
             ))}
          </div>

        </div>

        {/* --- TOOLS WE USE MARQUEE --- */}
        <div className="relative pt-12 mt-12 border-t border-white/5 overflow-hidden">
          <div className="flex flex-col items-center justify-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
              Tools I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-600">Use</span>
            </h3>
          </div>

          <div className="relative flex flex-col gap-4 overflow-x-hidden w-full group py-4">
            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Desktop: Single Row */}
            <div className="hidden md:flex whitespace-nowrap items-center gap-4 sm:gap-6 px-4 w-max marquee" style={{ willChange: "transform" }}>
              {[...aiTools, ...aiTools, ...aiTools].map((tool, index) => (
                <div key={`${tool.name}-${index}`} className="flex flex-col items-center justify-center gap-3 w-[80px] sm:w-[110px] transition-transform duration-300 hover:scale-110 cursor-default">
                  <img src={tool.logo} alt={`${tool.name} logo`} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-2xl shadow-inner border border-white/10" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-widest text-center leading-tight px-1 line-clamp-2">{tool.name}</span>
                </div>
              ))}
            </div>

            {/* Mobile: Two Rows */}
            <div className="md:hidden flex flex-col gap-8">
              {/* Row 1: Left to Right */}
              <div className="flex whitespace-nowrap items-center gap-4 px-4 w-max marquee" style={{ willChange: "transform", animationDirection: "reverse" }}>
                {[...aiToolsRow1, ...aiToolsRow1, ...aiToolsRow1, ...aiToolsRow1].map((tool, index) => (
                  <div key={`${tool.name}-r1-${index}`} className="flex flex-col items-center justify-center gap-3 w-[80px] transition-transform duration-300">
                    <img src={tool.logo} alt={tool.name} className="w-12 h-12 object-cover rounded-2xl shadow-inner border border-white/10" />
                    <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest text-center leading-tight px-1 line-clamp-2">{tool.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Row 2: Right to Left */}
              <div className="flex whitespace-nowrap items-center gap-4 px-4 w-max marquee" style={{ willChange: "transform" }}>
                {[...aiToolsRow2, ...aiToolsRow2, ...aiToolsRow2, ...aiToolsRow2].map((tool, index) => (
                  <div key={`${tool.name}-r2-${index}`} className="flex flex-col items-center justify-center gap-3 w-[80px] transition-transform duration-300">
                    <img src={tool.logo} alt={tool.name} className="w-12 h-12 object-cover rounded-2xl shadow-inner border border-white/10" />
                    <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest text-center leading-tight px-1 line-clamp-2">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}