'use client';

import { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Film, Code2, Sparkles, X, Globe, Terminal, Timer, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getServiceBySlug } from '@/lib/data';
import type { Item, Category } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = { Bot, Film, Code2 };

// --- ITEM MODAL (Liquid Glass) ---
interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: true }, '');
      const handlePopState = () => onClose();
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('popstate', handlePopState);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose, handleKeyDown]);

  if (!item) return null;
  
  const url = item.metadata && 'url' in item.metadata ? (item.metadata.url as string) : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-md" onClick={onClose} />
          
          <motion.div 
            className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto font-sans no-scrollbar rounded-[2rem] bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 rounded-full text-white transition-all shadow-lg active:scale-90">
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex flex-col">
              {/* Image Container with Top Highlight */}
              <div className="aspect-video relative bg-zinc-900 w-full">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
                <img src={item.thumbnail} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
              </div>
              
              {/* Content Container */}
              <div className="p-6 sm:p-8 -mt-10 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/60 mb-6 leading-relaxed font-light">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 text-[10px] sm:text-xs uppercase tracking-widest font-bold shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {url && (
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all hover:bg-white/20 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,0,0,0.3)] saturate-150"
                  >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80" />
                    <span className="relative z-10">Launch Project</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- MAIN PAGE ---
export function ServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug || '');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  if (!service) return <div className="min-h-screen bg-[#030303]" />;

  const Icon = iconMap[service.icon] || Bot;
  const isVideoService = service.slug === 'video-editing';
  const isLocked = service.slug === 'ai-agents';

  const handleCategoryClick = (category: Category) => { 
    if (isVideoService) {
      navigate(`/services/video-editing/${category.id}`); 
    }
  };
  
  const handleItemClick = (item: Item) => {
    const itemUrl = item.metadata && 'url' in item.metadata ? (item.metadata.url as string) : null;
    
    if (item.metadata.type === 'web' && itemUrl) {
      window.open(itemUrl, '_blank', 'noopener,noreferrer');
    } else { 
      setSelectedItem(item); 
      setIsItemModalOpen(true); 
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#030303] pt-24 pb-16 px-4 sm:px-8 font-sans relative overflow-hidden">
        
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#90a0b2]/10 blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* HEADER SECTION */}
          <div className="mb-12 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg w-max">
                 <Icon className="w-4 h-4 text-white" />
                 <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">
                   {service.title === 'Web Development' ? 'Web Engineering' : service.title}
                 </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-xl max-w-3xl leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Elevate</span> your brand
              </h1>
              <p className="text-xs sm:text-sm text-white/50 font-light tracking-[0.1em] uppercase max-w-xl">
                {service.description}
              </p>
            </motion.div>
          </div>

          {/* MOBILE CAPABILITIES SCROLL */}
          <div className="lg:hidden mb-10 -mx-4 px-4 overflow-x-auto no-scrollbar flex gap-2">
            <div className="flex-shrink-0 px-4 py-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md flex items-center gap-2">
               <Sparkles className="w-3.5 h-3.5 text-white" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-white">Capabilities</span>
            </div>
            {["Rapid Delivery", "24/7 Support", "Enterprise Scale", "Custom Built"].map((item, i) => (
               <div key={i} className="flex-shrink-0 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm text-[10px] text-white/60 font-bold uppercase tracking-wider whitespace-nowrap">
                  {item}
               </div>
            ))}
          </div>

          {/* MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
               <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl sticky top-28">
                  <h2 className="font-bold text-white mb-6 text-[10px] uppercase tracking-widest">Core Capabilities</h2>
                  <ul className="space-y-4">
                     {["Rapid Delivery", "24/7 Support", "Enterprise Scale", "Custom Built"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/60 tracking-wide uppercase">
                           <CheckCircle2 className="w-4 h-4 text-white/80" /> {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* CONTENT AREA */}
            <div className="lg:col-span-9">
              {isLocked ? (
                <div className="flex flex-col items-center justify-center py-32 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-center">
                  <Timer className="w-8 h-8 text-white/40 mb-6" />
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Encrypted Data</h2>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Case studies pending release.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  
                  {/* --- VIDEO SERVICE (CATEGORIES) --- */}
                  {isVideoService && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {service.categories.map((category, idx) => (
                        <motion.div
                           key={category.id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                           onClick={() => handleCategoryClick(category)}
                           className="group relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer shadow-2xl will-change-transform"
                        >
                           <img src={category.image} alt={category.title} loading="lazy" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
                           
                           {/* Glass Highlight Edge */}
                           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
                           
                           <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                             <div className="inline-block px-2 py-1 rounded bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white mb-3 uppercase tracking-widest">
                               {category.items.length} Projects
                             </div>
                             <h3 className="text-base sm:text-lg font-black text-white leading-tight uppercase tracking-tighter drop-shadow-md">
                               {category.title}
                             </h3>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* --- WEB/AI SERVICE (PROJECTS) --- */}
                  {!isVideoService && service.categories.map((category, sectionIdx) => (
                    <motion.div 
                      key={category.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIdx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-2xl"
                    >
                      {/* Section Header */}
                      <div className="flex items-center gap-4 mb-8">
                         <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">{category.title}</h2>
                         <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                      </div>
                      
                      {/* Project Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {category.items.map((item) => (
                           <div 
                             key={item.id} 
                             onClick={() => handleItemClick(item)}
                             className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] overflow-hidden cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-lg"
                           >
                             <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                                <img src={item.thumbnail} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                                <div className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                   {item.metadata.type === 'web' ? <Globe className="w-3 h-3 text-white" /> : <Terminal className="w-3 h-3 text-white" />}
                                </div>
                             </div>
                             
                             <div className="p-4 sm:p-5">
                                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-300 group-hover:to-zinc-500 transition-all leading-tight mb-3">
                                  {item.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 overflow-hidden">
                                   {item.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 text-[9px] font-bold text-white/50 uppercase tracking-widest">
                                        {tag}
                                      </span>
                                   ))}
                                </div>
                             </div>
                           </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
      <ItemModal item={selectedItem} isOpen={isItemModalOpen} onClose={() => { setIsItemModalOpen(false); setSelectedItem(null); }} />
    </>
  );
}