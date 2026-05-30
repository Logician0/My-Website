'use client';

import { motion } from 'framer-motion';
import { Search, ArrowLeft, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CareersPage() {
  // Empty array as requested. 
  // In the future, you can add job objects here like: { id: 1, title: 'Frontend Dev', ... }
  const jobs: any[] = [];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            We're building the future of digital experiences.
          </motion.p>
        </div>

        {/* Content Area */}
        <div className="max-w-3xl mx-auto">
          {jobs.length > 0 ? (
            <div className="grid gap-4">
              {/* Job list would render here */}
            </div>
          ) : (
            // "No Openings" State
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-24 px-6 text-center rounded-3xl border border-white/10 bg-white/[0.02]"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10 relative z-10">
                  <Briefcase className="w-8 h-8 text-zinc-500" />
                </div>
                {/* Subtle pulse behind icon */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-xl animate-pulse" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">No Openings Currently</h2>
              <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
                We don't have any active listings at the moment, but we are always growing. 
                Please check back later for new opportunities.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}