'use client';

import { useRef, useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Bot, Film, Code2, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { services } from '@/lib/data';
import { cn } from '@/utils/cn';

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Film,
  Code2,
};

const colorMap: Record<string, string> = {
  violet: 'from-violet-500 via-purple-500 to-indigo-500',
  pink: 'from-pink-500 via-rose-500 to-red-500',
  cyan: 'from-cyan-500 via-teal-500 to-emerald-500',
};

// Get services in correct order: Video (pink), Web (cyan), AI (violet)
const videoService = services.find(s => s.slug === 'video-editing')!;
const webService = services.find(s => s.slug === 'web-dev')!;
const aiService = services.find(s => s.slug === 'ai-agents')!;

export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightProgress, setLightProgress] = useState(0);
  
  // Animate light through connections
  useEffect(() => {
    const duration = 8000;
    const startTime = Date.now();
    let animationFrame: number;
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) % duration;
      setLightProgress(elapsed / duration);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header - Compact */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <span className="inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-zinc-400 mb-3">
            What I Build
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            <span className="text-white">Three Pillars of </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
            Combined to create digital experiences that drive real growth.
          </p>
        </motion.div>

        {/* Hub Diagram Layout */}
        <div ref={containerRef} className="relative">
          
          {/* Desktop Layout - Triangle/Hub Structure */}
          <div className="hidden lg:block relative">
            {/* SVG Connections */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 800 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                  <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Video Editing (left) to Hub */}
              <path
                d="M 180,120 L 400,220"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              
              {/* Web Dev (right) to Hub */}
              <path
                d="M 620,120 L 400,220"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              
              {/* Hub to AI Agents */}
              <path
                d="M 400,220 L 400,320"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              
              {/* Light flow from AI to Hub and outward */}
              <circle
                r="4"
                fill="white"
                filter="url(#glow)"
                opacity={lightProgress < 0.33 ? 1 : 0.3}
              >
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path="M 400,420 L 400,220 L 180,120"
                />
              </circle>
              <circle
                r="4"
                fill="white"
                filter="url(#glow)"
                opacity={lightProgress > 0.33 && lightProgress < 0.66 ? 1 : 0.3}
              >
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path="M 400,420 L 400,220 L 620,120"
                  begin="2.67s"
                />
              </circle>
            </svg>

            {/* Central Hub Node */}
            <motion.div
              className="absolute left-1/2 top-[180px] -translate-x-1/2 z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                {/* Pulsing outer ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-cyan-500/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Core node */}
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 shadow-lg shadow-pink-500/30" />
              </div>
            </motion.div>

            {/* Top Row: Video Editing (left) & Web Dev (right) */}
            <div className="flex justify-between gap-8 mb-6">
              {/* Video Editing Card */}
              <ServiceCard service={videoService} index={0} />
              
              {/* Web Dev Card */}
              <ServiceCard service={webService} index={1} />
            </div>

            {/* Bottom: AI Agents (centered below hub) */}
            <div className="flex justify-center pt-16">
              <div className="w-full max-w-md">
                <ServiceCard service={aiService} index={2} isCenter />
              </div>
            </div>
          </div>

          {/* Mobile Layout - Vertical with connections */}
          <div className="lg:hidden relative">
            {/* Vertical connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500/30 via-cyan-500/30 to-violet-500/30 -translate-x-1/2 z-0" />
            
            {/* Light traveling down */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50 z-10"
              animate={{ 
                top: ['5%', '95%', '5%'],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            
            {/* Connection nodes */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 z-10"
                style={{ top: `${15 + i * 35}%` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
            
            {/* Cards stacked vertically */}
            <div className="relative z-20 space-y-3">
              <ServiceCard service={videoService} index={0} isMobile />
              <ServiceCard service={webService} index={1} isMobile />
              <ServiceCard service={aiService} index={2} isMobile />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ 
  service, 
  index, 
  isCenter = false,
  isMobile = false 
}: { 
  service: typeof services[0]; 
  index: number;
  isCenter?: boolean;
  isMobile?: boolean;
}) {
  const Icon = iconMap[service.icon] || Bot;
  const gradient = colorMap[service.color] || colorMap.violet;
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link to={`/services/${service.slug}`} className={cn("block", isCenter ? "w-full" : "flex-1")}>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative group rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02]",
          "backdrop-blur-xl overflow-hidden transition-all duration-300",
          "hover:border-white/20",
          isMobile ? "p-3 ml-8" : "p-4 sm:p-5"
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          delay: index * 0.1,
          type: 'spring', 
          stiffness: 300, 
          damping: 30 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        {/* Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: isHovered
              ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${
                  service.color === 'violet' ? 'rgba(139,92,246,0.15)' :
                  service.color === 'pink' ? 'rgba(236,72,153,0.15)' :
                  'rgba(34,211,238,0.15)'
                }, transparent 60%)`
              : 'transparent',
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Background gradient on hover */}
        <div className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
          `bg-gradient-to-br ${gradient}`
        )} />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={cn(
              'rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3',
              `bg-gradient-to-br ${gradient}`,
              isMobile ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'
            )}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Icon className={cn("text-white", isMobile ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6")} />
          </motion.div>

          {/* Title */}
          <h3 className={cn(
            "font-bold text-white mb-1 tracking-tight",
            isMobile ? "text-sm" : "text-base sm:text-lg"
          )}>
            {service.title}
          </h3>

          {/* Description */}
          <p className={cn(
            "text-zinc-400 leading-relaxed mb-2 sm:mb-3",
            isMobile ? "text-[10px] line-clamp-2" : "text-xs sm:text-sm line-clamp-2"
          )}>
            {service.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {service.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className={cn(
                  "rounded-full font-medium bg-white/5 text-zinc-300 border border-white/10",
                  isMobile ? "px-1.5 py-0.5 text-[8px]" : "px-2 py-0.5 text-[10px] sm:text-xs"
                )}
              >
                {cat.title}
              </span>
            ))}
            {service.categories.length > 2 && (
              <span className={cn(
                "text-zinc-500",
                isMobile ? "text-[8px]" : "text-[10px]"
              )}>
                +{service.categories.length - 2}
              </span>
            )}
          </div>

          {/* CTA */}
          <motion.div
            className={cn(
              "flex items-center gap-1 font-medium text-white group/btn",
              isMobile ? "text-[10px]" : "text-xs"
            )}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            Explore
            <ArrowUpRight className={cn(
              "transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
              isMobile ? "w-2.5 h-2.5" : "w-3 h-3"
            )} />
          </motion.div>
        </div>

        {/* Decorative blur */}
        <div className={cn(
          'absolute -bottom-16 -right-16 rounded-full blur-2xl',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          `bg-gradient-to-br ${gradient}`,
          isMobile ? 'w-24 h-24' : 'w-32 h-32'
        )} />
      </motion.div>
    </Link>
  );
}