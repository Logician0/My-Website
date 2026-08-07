'use client';

import { motion } from 'framer-motion';
import { Bot, Video, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ServicesOrbit() {
  const navigate = useNavigate();

  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
            My Services
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
            A connected ecosystem of creative solutions
          </p>
        </motion.div>
      </div>

      {/* Orbital System Container */}
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-[400px] lg:h-[450px] max-w-3xl mx-auto">
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Gradient for the light beam */}
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 1)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines - Video Editing to Hub */}
            <path
              d="M 150 80 Q 200 150 300 200"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            
            {/* Connection Lines - Web Dev to Hub */}
            <path
              d="M 450 80 Q 400 150 300 200"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            
            {/* Connection Lines - AI Agents to Hub */}
            <path
              d="M 300 350 L 300 200"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />

            {/* Animated Light Beam Path */}
            <path
              id="lightPath"
              d="M 150 80 Q 200 150 300 200 Q 400 150 450 80 M 450 80 Q 400 150 300 200 L 300 350 M 300 350 L 300 200 Q 200 150 150 80"
              fill="none"
              stroke="transparent"
            />

            {/* The traveling light beam */}
            <circle r="6" fill="url(#beamGradient)" filter="url(#glow)">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M 150 80 Q 200 150 300 200 Q 400 150 450 80 Q 400 150 300 200 L 300 350 L 300 200 Q 200 150 150 80"
              />
            </circle>

            {/* Light trail effect */}
            <circle r="4" fill="rgba(6, 182, 212, 0.6)">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                begin="-0.15s"
                path="M 150 80 Q 200 150 300 200 Q 400 150 450 80 Q 400 150 300 200 L 300 350 L 300 200 Q 200 150 150 80"
              />
            </circle>
            <circle r="2" fill="rgba(6, 182, 212, 0.3)">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                begin="-0.3s"
                path="M 150 80 Q 200 150 300 200 Q 400 150 450 80 Q 400 150 300 200 L 300 350 L 300 200 Q 200 150 150 80"
              />
            </circle>
          </svg>

          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Outer glow rings */}
              <div className="absolute inset-0 w-16 h-16 -m-8 rounded-full bg-cyan-500/10 blur-xl" />
              <div className="absolute inset-0 w-12 h-12 -m-6 rounded-full bg-cyan-500/20 blur-md" />
              
              {/* Core hub */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white/80" />
              </div>
            </motion.div>
          </div>

          {/* Video Editing Node - Top Left */}
          <motion.div
            className="absolute"
            style={{ top: '8%', left: '15%' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.button
              onClick={() => navigate('/services/video-editing')}
              className="group relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 w-28 h-28 -m-2 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Circle node */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-1 group-hover:border-pink-500/60 group-hover:bg-pink-500/30 transition-all duration-300">
                <Video className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
                <span className="text-[10px] font-medium text-pink-300 group-hover:text-white text-center leading-tight">Video<br/>Editing</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Web Development Node - Top Right */}
          <motion.div
            className="absolute"
            style={{ top: '8%', right: '15%' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={() => navigate('/services/web-dev')}
              className="group relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 w-28 h-28 -m-2 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Circle node */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-1 group-hover:border-cyan-500/60 group-hover:bg-cyan-500/30 transition-all duration-300">
                <Globe className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                <span className="text-[10px] font-medium text-cyan-300 group-hover:text-white text-center leading-tight">Web<br/>Dev</span>
              </div>
            </motion.button>
          </motion.div>

          {/* AI Agents Node - Bottom Center */}
          <motion.div
            className="absolute"
            style={{ bottom: '5%', left: '50%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={() => navigate('/services/ai-agents')}
              className="group relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow effect - slightly larger for AI */}
              <div className="absolute inset-0 w-32 h-32 -m-2 rounded-full bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Circle node - slightly larger */}
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-1 group-hover:border-violet-500/60 group-hover:bg-violet-500/30 transition-all duration-300">
                <Bot className="w-7 h-7 text-violet-400 group-hover:text-violet-300" />
                <span className="text-[10px] font-medium text-violet-300 group-hover:text-white text-center leading-tight">AI<br/>Agents</span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative h-[320px] max-w-[280px] mx-auto">
          {/* SVG Connections for Mobile */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 320" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glowMobile" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection: Video Editing to Hub */}
            <path
              d="M 140 45 L 140 130"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            
            {/* Connection: Web Dev to Hub */}
            <path
              d="M 55 200 Q 100 165 140 150"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            
            {/* Connection: AI Agents to Hub */}
            <path
              d="M 225 200 Q 180 165 140 150"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />

            {/* Animated Light Beam - Mobile */}
            <circle r="5" fill="rgba(6, 182, 212, 1)" filter="url(#glowMobile)">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M 140 45 L 140 150 Q 100 165 55 200 Q 100 165 140 150 Q 180 165 225 200 Q 180 165 140 150 L 140 45"
              />
            </circle>
            <circle r="3" fill="rgba(6, 182, 212, 0.5)">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                begin="-0.2s"
                path="M 140 45 L 140 150 Q 100 165 55 200 Q 100 165 140 150 Q 180 165 225 200 Q 180 165 140 150 L 140 45"
              />
            </circle>
          </svg>

          {/* Central Hub - Mobile */}
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 w-10 h-10 -m-5 rounded-full bg-cyan-500/20 blur-lg" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </div>
            </motion.div>
          </div>

          {/* Video Editing Node - Top Center */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: '0%' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.button
              onClick={() => navigate('/services/video-editing')}
              className="group relative"
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-20 h-20 -m-1 rounded-full bg-pink-500/20 blur-lg opacity-0 group-active:opacity-100 transition-opacity" />
              <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5">
                <Video className="w-5 h-5 text-pink-400" />
                <span className="text-[8px] font-medium text-pink-300 text-center leading-tight">Video<br/>Editing</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Web Development Node - Bottom Left */}
          <motion.div
            className="absolute"
            style={{ bottom: '20%', left: '0%' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.button
              onClick={() => navigate('/services/web-dev')}
              className="group relative"
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-20 h-20 -m-1 rounded-full bg-cyan-500/20 blur-lg opacity-0 group-active:opacity-100 transition-opacity" />
              <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-[8px] font-medium text-cyan-300 text-center leading-tight">Web<br/>Dev</span>
              </div>
            </motion.button>
          </motion.div>

          {/* AI Agents Node - Bottom Right */}
          <motion.div
            className="absolute"
            style={{ bottom: '20%', right: '0%' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.button
              onClick={() => navigate('/services/ai-agents')}
              className="group relative"
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-24 h-24 -m-2 rounded-full bg-violet-500/20 blur-lg opacity-0 group-active:opacity-100 transition-opacity" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5">
                <Bot className="w-6 h-6 text-violet-400" />
                <span className="text-[9px] font-medium text-violet-300 text-center leading-tight">AI<br/>Agents</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Tap hint */}
          <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600">
            Tap to explore
          </p>
        </div>
      </div>
    </section>
  );
}