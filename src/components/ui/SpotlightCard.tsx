'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlow?: boolean;
}

export function SpotlightCard({ 
  children, 
  className, 
  spotlightColor = 'rgba(255, 255, 255, 0.06)',
  borderGlow = true 
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]',
        'backdrop-blur-xl transition-all duration-500',
        'hover:border-white/20',
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`
            : 'transparent',
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Border Glow */}
      {borderGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 40px -10px ${spotlightColor}`
              : 'inset 0 0 0 1px transparent',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Reusable Glow Card variant
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ 
  children, 
  className,
  glowColor = 'rgba(139, 92, 246, 0.2)'
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]',
        'backdrop-blur-xl transition-all duration-500',
        'hover:border-white/20',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-2xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `0 0 60px 20px ${glowColor}`,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
