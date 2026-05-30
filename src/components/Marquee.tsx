"use client";

import { motion } from "framer-motion";

export function Marquee() {
  const technologies = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Next.js",
    "Vite",
    "Three.js",
    "GSAP",
    "Node.js",
    "PostgreSQL",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-black via-black to-black py-8 md:py-12">
      <div className="absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1024] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...technologies, ...technologies].map((tech, idx) => (
          <span
            key={idx}
            className="text-sm md:text-base font-semibold text-white/60 hover:text-white/100 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
