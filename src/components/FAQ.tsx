'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

const faqs = [
  {
    question: "What makes Logician Creatives different?",
    answer: "I don't just build websites or edit videos; I build ecosystems. My unique blend of AI automation, high-end motion design, and performance engineering ensures your brand doesn't just look good—it dominates."
  },
  {
    question: "How does your subscription model work?",
    answer: "I offer flexible monthly retainers for continuous growth. You get priority support and a set amount of hours/deliverables per month. Pause or cancel anytime with transparent pricing."
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely. I love ambitious founders. I have specific packages designed to get startups from zero to one, focusing on MVP development, pitch decks, and launch content."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "For video edits, typically 24-48 hours. For web projects, a landing page takes 1-2 weeks, while full platforms take 4-8 weeks depending on complexity. I move fast without breaking things."
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm shadow-sm"
          >
            <span className="text-[9px] md:text-[11px] font-bold text-white/50 tracking-[0.2em] uppercase">Support</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Questions</span>
          </motion.h2>
          <p className="text-white/50 font-light tracking-[0.1em] uppercase text-xs sm:text-sm">
            Everything you need to know about my process.
          </p>
        </div>

        {/* --- ACCORDION --- */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  isActive 
                    ? "bg-white/[0.06] border-white/20" 
                    : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/10"
                )}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
                >
                  <span className={cn(
                    "text-sm md:text-lg font-bold transition-colors duration-300",
                    isActive ? "text-white" : "text-white/70 group-hover:text-white"
                  )}>
                    {faq.question}
                  </span>
                  
                  {/* Animated Icon Container */}
                  <div className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ml-4",
                    isActive 
                      ? "bg-white text-black border-white rotate-45 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      : "bg-transparent text-white/50 border-white/20 group-hover:border-white/40 group-hover:text-white"
                  )}>
                    <Plus size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* --- CTA FOOTER --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12 text-white/40 text-xs tracking-[0.1em] uppercase font-light"
        >
          Still have questions? <a href="#contact" className="text-white hover:text-white/80 border-b border-white/20 hover:border-white/80 transition-colors pb-0.5 font-bold">Contact Support</a>
        </motion.div>

      </div>
    </section>
  );
}