'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { cn } from '@/utils/cn';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden font-sans">
      {/* --- CINEMATIC DARK BACKGROUND --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm shadow-sm">
            <span className="text-[9px] md:text-[11px] font-bold text-white/50 tracking-[0.2em] uppercase">
              Client Feedback
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tighter text-white uppercase drop-shadow-xl">
            Words of <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600 pr-2">Trust</span>
          </h2>
          <p className="text-white/50 font-light tracking-[0.1em] uppercase text-xs sm:text-sm">
            Don't just take my word for it.
          </p>
        </motion.div>

        {/* --- TESTIMONIAL LIQUID GLASS CARD --- */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* LIQUID GLASS CONTAINER */}
              <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] p-6 sm:p-8 md:p-10 overflow-hidden group">
                
                {/* Glossy Top Highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
                
                {/* Subtle White Radial Glow behind content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,transparent_60%)] pointer-events-none" />

                <div className="flex justify-between items-start mb-6 sm:mb-8 relative z-10">
                  {/* Quote Icon */}
                  <motion.div 
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center shadow-sm"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                  >
                    <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400 fill-cyan-400" />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex gap-1 mt-2">
                    {[...Array(current.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white fill-white opacity-90" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <blockquote className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed mb-6 sm:mb-8">
                  "{current.content}"
                </blockquote>

                {/* Author Info */}
                <div className="relative z-10 flex items-center gap-3 sm:gap-4 border-t border-white/[0.05] pt-6 sm:pt-8">
                  <motion.img
                    src={current.avatar}
                    alt={current.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-cyan-500/20 shadow-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base md:text-lg tracking-tight">{current.name}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/50 font-medium uppercase tracking-wider">
                      {current.role} at <span className="text-white/80">{current.company}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- NAVIGATION CONTROLS --- */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 relative z-10">
            
            <motion.button
              onClick={() => paginate(-1)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-transparent bg-white/[0.03] flex items-center justify-center text-white/60 hover:bg-white/[0.08] hover:text-white transition-all backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* White Dots */}
            <div className="flex gap-2 sm:gap-3 items-center">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    'h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out',
                    i === currentIndex
                      ? 'w-6 sm:w-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                      : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                  )}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-transparent bg-white/[0.03] flex items-center justify-center text-white/60 hover:bg-white/[0.08] hover:text-white transition-all backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Auto-Play Progress Bar */}
          <div className="mt-6 sm:mt-8 mx-auto max-w-[150px] sm:max-w-[200px] relative z-10">
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                initial={{ width: '0%' }}
                animate={{ width: isAutoPlaying ? '100%' : '0%' }}
                transition={{ 
                  duration: isAutoPlaying ? 6 : 0,
                  ease: 'linear'
                }}
                key={`${currentIndex}-${isAutoPlaying}`}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}