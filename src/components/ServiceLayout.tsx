'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceFeature {
  title: string;
  description: string;
  icon: any;
}

interface ServiceLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  color: 'cyan' | 'pink' | 'violet';
  features: ServiceFeature[];
}

export function ServiceLayout({ title, subtitle, description, color, features }: ServiceLayoutProps) {
  
  // Theme configuration based on the color prop
  const theme = {
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'group-hover:border-cyan-500/50', gradient: 'from-cyan-500 to-blue-500' },
    pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'group-hover:border-pink-500/50', gradient: 'from-pink-500 to-rose-500' },
    violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'group-hover:border-violet-500/50', gradient: 'from-violet-500 to-purple-500' },
  }[color];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
        <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back home
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white/10 ${theme.bg} ${theme.text}`}>
            {subtitle}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">{description}</p>
        </motion.div>
      </div>

      {/* Grid: 2 Columns on Mobile (grid-cols-2), 4 on Desktop (lg:grid-cols-4) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative p-3 sm:p-5 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-900 transition-all h-full flex flex-col ${theme.border}`}
            >
              {/* Small Icon */}
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${theme.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.text}`} />
              </div>

              {/* Compact Title */}
              <h3 className="text-xs sm:text-base font-bold text-white mb-1 leading-tight">
                {feature.title}
              </h3>

              {/* Compact Description */}
              <p className="text-[10px] sm:text-xs text-zinc-500 leading-relaxed line-clamp-4">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-20 text-center">
        <Link 
          to="/#contact" 
          className={`inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r ${theme.gradient} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
        >
          Start Project
        </Link>
      </div>
    </div>
  );
}