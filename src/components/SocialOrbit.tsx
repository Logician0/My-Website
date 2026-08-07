'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { config } from '../config/templateConfig';

const socialIcons = [
  { Icon: Youtube, label: 'YouTube', href: config.socials.youtube },
  { Icon: Twitter, label: 'Twitter', href: config.socials.twitter },
  { Icon: Instagram, label: 'Instagram', href: config.socials.instagram },
  { Icon: Linkedin, label: 'LinkedIn', href: config.socials.linkedin },
  { Icon: Github, label: 'GitHub', href: config.socials.github },
];



const getIconPositions = (radius: number) => {
  return socialIcons.map((_, index) => {
    const angle = (index * (360 / socialIcons.length) - 90) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });
};

function BreathingIcon({
  Icon,
  label,
  href,
  position,
  index,
  isVisible
}: {
  Icon: React.ElementType;
  label: string;
  href: string;
  position: { x: number; y: number };
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow me on ${label}`}
      className="absolute z-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        willChange: 'transform',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? {
        x: [`calc(-50% + ${position.x}px)`, `calc(-50% + ${position.x + 4}px)`, `calc(-50% + ${position.x - 2}px)`, `calc(-50% + ${position.x}px)`],
        y: [`calc(-50% + ${position.y}px)`, `calc(-50% + ${position.y - 3}px)`, `calc(-50% + ${position.y + 2}px)`, `calc(-50% + ${position.y}px)`],
        scale: 1,
        opacity: 1,
      } : {}}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        x: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 120, damping: 14, delay: index * 0.05 },
        opacity: { duration: 0.2 }
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center rounded-full bg-cyan-950/30 backdrop-blur-sm border border-cyan-500/20 shadow-md"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent" />
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 relative z-10" aria-hidden="true" />
      </motion.div>
    </motion.a>
  );
}

export function SocialOrbit() {
  const [iconsVisible, setIconsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(135);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 640) setRadius(135);
      else if (width < 768) setRadius(160);
      else if (width < 1024) setRadius(190);
      else setRadius(220);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const iconPositions = useMemo(() => getIconPositions(radius), [radius]);

  return (
    <section id="about" className="pt-24 pb-12 sm:pt-20 sm:pb-16 md:py-16 relative overflow-hidden font-sans" aria-label="About Logician Creatives">
      {/* Cinematic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-3 uppercase text-white drop-shadow-xl">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Me</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light tracking-[0.1em] uppercase">
            The creative mind behind your digital success
          </p>
        </motion.div>

        {/* Orbit & Info */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="relative flex-shrink-0">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: isMobile ? '340px' : '480px',
                height: isMobile ? '340px' : '480px',
              }}
            >
              <AnimatePresence>
                {iconsVisible && socialIcons.map((social, index) => (
                  <BreathingIcon
                    key={social.label}
                    Icon={social.Icon}
                    label={social.label}
                    href={social.href}
                    position={iconPositions[index]}
                    index={index}
                    isVisible={iconsVisible}
                  />
                ))}
              </AnimatePresence>

              <motion.button
                onClick={() => setIconsVisible(!iconsVisible)}
                aria-expanded={iconsVisible}
                aria-label={iconsVisible ? "Close social connections" : "Open social connections"}
                className="relative z-10 rounded-full focus:outline-none group"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  animate={{
                    boxShadow: iconsVisible
                      ? '0 0 30px rgba(6, 182, 212, 0.15)'
                      : '0 0 0px rgba(6, 182, 212, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-[#050505] border border-cyan-500/20 shadow-lg">
                  {/* Gloss Overlay */}
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none" />
                  <img
                    src={config.personal.pfpUrl}
                    alt={`${config.personal.name} - ${config.personal.role}`}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale-[20%]"
                    loading="eager"
                  />
                </div>
              </motion.button>
            </div>

            <div className="text-center -mt-16 sm:-mt-20 relative z-20 pointer-events-none">
              <div className="inline-block p-4 pointer-events-auto">
                <button
                  onClick={() => setIconsVisible(!iconsVisible)}
                  className="py-1 px-3 text-[10px] sm:text-xs text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold mb-2 border border-white/10 rounded-full bg-[#050505] shadow-lg"
                >
                  {iconsVisible ? 'Close Orbit' : 'Tap to Connect'}
                </button>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase leading-none mt-1">{config.personal.name}</h3>
                <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest mt-2 font-bold">{config.personal.role}</p>
              </div>
            </div>
          </div>

          <motion.div
            className="flex-1 text-center lg:text-left max-w-lg px-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter leading-tight drop-shadow-md">
              Crafting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Excellence</span>
            </h3>
            <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                At <span className="text-white font-bold">{config.brand.fullName}</span>, {config.personal.bio}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10">
              {config.personal.stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tighter">{stat.value}</div>
                  <div className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>



      </div>
    </section>
  );
}