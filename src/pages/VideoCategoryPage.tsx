'use client';

import { useState, useEffect } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesRound } from '@/lib/data';
import { cn } from '@/utils/cn';

// Extract and format all video data (standard and AI videos)
const extractRoundVideos = () => {
  const desktop = (servicesRound?.desktopVideos || []) as any[];
  const desktopAi = (servicesRound?.desktopAiVideos || []) as any[];
  const allH = (servicesRound?.allHorizontalVideos || []) as any[];
  const allV = (servicesRound?.allVerticalVideos || []) as any[];
  const mobHAi = (servicesRound?.mobileHorizontalAiVideos || []) as any[];
  const mobVAi = (servicesRound?.mobileVerticalAiVideos || []) as any[];
  const allAi = (servicesRound?.allAiVideos || []) as any[];

  const formatItem = (v: any, forceAi = false) => {
    const isAi = forceAi || v.isAi || v.id?.startsWith('ai-') || v.category?.toLowerCase().includes('ai') || false;
    const aspect = v.ratio || (v.aspect === '9/16' || (v.gridClass && (v.gridClass.includes('col-span-1') || v.gridClass.includes('row-span-2'))) ? '9/16' : '16/9');
    
    let defaultDesc = "Professional video production crafted with cinematic color grading, immersive sound design, and frame-accurate pacing.";
    if (isAi) {
      defaultDesc = "AI-generated video concept powered by neural motion generation, synthetic visual synthesis, and dynamic AI storytelling.";
    } else if (v.category === 'Podcast') {
      defaultDesc = "High-engagement podcast episode featuring multi-cam editing, crisp sound engineering, and motion graphics.";
    } else if (v.category === 'Promo' || v.category === 'Ad') {
      defaultDesc = "Conversion-focused promotional visual designed to capture viewer attention and drive high social media engagement.";
    } else if (v.category === 'Color Grade') {
      defaultDesc = "Cinematic 4K color-graded visual edit with custom LUT profiles and rich atmosphere.";
    }

    return {
      id: v.id || v.youtubeId || Math.random().toString(),
      title: v.title,
      description: v.description || defaultDesc,
      category: v.category || (isAi ? 'AI Video' : 'Video Editing'),
      youtubeId: v.youtubeId || '',
      videoUrl: v.videoUrl || '',
      isAi,
      aspect,
      thumbnail: v.customThumb || (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : '')
    };
  };

  const horizontalList: any[] = [];
  const verticalList: any[] = [];
  const seenMap = new Map<string, any>();

  const pushItem = (v: any, forceAi = false) => {
    const item = formatItem(v, forceAi);
    const key = item.youtubeId || item.videoUrl || item.title;
    if (!key) return;

    if (seenMap.has(key)) {
      const existing = seenMap.get(key);
      if (forceAi || item.isAi) {
        existing.isAi = true;
      }
      return;
    }

    seenMap.set(key, item);
    if (item.aspect === '9/16') {
      verticalList.push(item);
    } else {
      horizontalList.push(item);
    }
  };

  // Add AI videos first so their AI metadata takes precedence
  allAi.forEach(v => pushItem(v, true));
  desktopAi.forEach(v => pushItem(v, true));
  mobHAi.forEach(v => pushItem(v, true));
  mobVAi.forEach(v => pushItem(v, true));

  // Add standard videos
  allH.forEach(v => pushItem(v, false));
  desktop.forEach(v => pushItem(v, false));
  allV.forEach(v => pushItem(v, false));

  return { horizontalList, verticalList };
};

const { horizontalList: horizontalVideos, verticalList: verticalVideos } = extractRoundVideos();

export function VideoCategoryPage() {
  const [videoType, setVideoType] = useState<'long' | 'shorts'>('long');
  const [aiFilter, setAiFilter] = useState<'all' | 'no-ai' | 'ai-only'>('all');
  const [currentVideo, setCurrentVideo] = useState<any>(horizontalVideos[0] || null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Active video list strictly matches current format selection
  const activeCategoryList = videoType === 'long' ? horizontalVideos : verticalVideos;
  
  const displayedVideos = activeCategoryList.filter((v: any) => {
    if (aiFilter === 'ai-only') return v.isAi;
    if (aiFilter === 'no-ai') return !v.isAi;
    return true;
  });

  // Handle clicking a video card from Up Next
  const handleVideoClick = (video: any) => {
    setCurrentVideo(video);
    // Sync videoType format to ensure Up Next list always matches current video orientation
    if (video.aspect === '9/16' && videoType !== 'shorts') {
      setVideoType('shorts');
    } else if (video.aspect !== '9/16' && videoType !== 'long') {
      setVideoType('long');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Format Toggle (Horizontal vs Reels)
  const handleFormatChange = (type: 'long' | 'shorts') => {
    setVideoType(type);
    const targetList = type === 'long' ? horizontalVideos : verticalVideos;
    const filtered = targetList.filter((v: any) => {
      if (aiFilter === 'ai-only') return v.isAi;
      if (aiFilter === 'no-ai') return !v.isAi;
      return true;
    });
    if (filtered.length > 0) {
      setCurrentVideo(filtered[0]);
    }
  };

  // Handle AI Filter Toggle (All vs Without AI vs AI Videos)
  const handleFilterChange = (filter: 'all' | 'no-ai' | 'ai-only') => {
    setAiFilter(filter);
    const targetList = videoType === 'long' ? horizontalVideos : verticalVideos;
    const filtered = targetList.filter((v: any) => {
      if (filter === 'ai-only') return v.isAi;
      if (filter === 'no-ai') return !v.isAi;
      return true;
    });
    if (filtered.length > 0) {
      const exists = filtered.some(
        v => (v.youtubeId && v.youtubeId === currentVideo?.youtubeId) ||
             (v.videoUrl && v.videoUrl === currentVideo?.videoUrl) ||
             v.id === currentVideo?.id
      );
      if (!exists) {
        setCurrentVideo(filtered[0]);
      }
    }
  };

  // Defer iframe load to prevent blocking page transitions
  useEffect(() => {
    setIframeLoaded(false);
    const timer = setTimeout(() => setIframeLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [currentVideo]);

  // Hide the navbar when this page mounts
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.add('hidden');
    return () => {
      if (nav) nav.classList.remove('hidden');
    };
  }, []);

  if (!servicesRound) return <div className="min-h-screen bg-[#030303]" />;

  const isVertical = currentVideo?.aspect === '9/16';

  // Helper component (YouTube style watch card)
  const VideoCard = ({ video, className }: { video: any, className?: string }) => {
    const isCardVertical = video.aspect === '9/16';
    const isPlaying = (currentVideo?.youtubeId && currentVideo.youtubeId === video.youtubeId) ||
                      (currentVideo?.videoUrl && currentVideo.videoUrl === video.videoUrl) ||
                      currentVideo?.id === video.id;
    
    const primaryThumb = video.thumbnail || (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : '');

    return (
      <button
        onClick={() => handleVideoClick(video)}
        aria-label={`Play video: ${video.title}`}
        className={cn(
          "group flex flex-col rounded-xl transition-all text-left bg-transparent border-none cursor-pointer w-full gap-2 p-1.5 select-none transform-gpu",
          !isPlaying && "hover:bg-white/5 active:scale-95",
          isPlaying && "bg-white/[0.05]",
          className
        )}
      >
        {/* THUMBNAIL */}
        <div className={cn(
            "relative rounded-lg overflow-hidden bg-zinc-900 w-full shadow-sm",
            isCardVertical ? "aspect-[9/16]" : "aspect-video"
        )}>
           <img 
              src={primaryThumb} 
              alt="" 
              loading="lazy"
              className={cn(
                "w-full h-full object-cover transition-all duration-300 ease-out",
                isPlaying ? "opacity-50 scale-100" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
              )}
           />
           
           {/* AI Badge on Card */}
           {video.isAi && (
             <div className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-cyan-500/30 flex items-center gap-1 shadow-md">
               <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
               <span className="text-[7.5px] font-bold text-cyan-300 uppercase tracking-wider">AI</span>
             </div>
           )}

           {isPlaying && (
             <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1">
                 <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                 <span className="text-white font-medium uppercase tracking-wider text-[8px]">
                   Playing
                 </span>
               </div>
             </div>
           )}

           {!isPlaying && (
             <>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                     <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                 </div>
               </div>
             </>
           )}
        </div>

        {/* TEXT */}
        <div className="flex flex-col min-w-0 px-1 py-0.5">
           <h3 className={cn(
             "text-xs sm:text-sm font-medium line-clamp-2 leading-snug transition-colors",
             isPlaying ? "text-white" : "text-white/70 group-hover:text-white"
           )}>
              {video.title}
           </h3>
           <span className="text-[9px] text-white/30 mt-0.5 font-normal uppercase tracking-wider">
             {video.isAi ? 'AI Video' : (isCardVertical ? 'Short' : 'Video')}
           </span>
        </div>
      </button>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0a0a0a] text-white pt-4 sm:pt-6 md:pt-8 pb-12 px-4 md:px-6 lg:px-8 font-sans relative overflow-hidden transform-gpu will-change-transform"
    >
      
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Fully expanded container to fill the screen width completely */}
      <div className="w-full max-w-none mx-auto relative z-10">
        
        {currentVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-6 xl:gap-8 pt-1 sm:pt-2">
            
            {/* LEFT COLUMN: WATCH PLAYER & DETAILS */}
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              className={cn(
                "w-full transform-gpu will-change-transform",
                isVertical ? "lg:col-span-6 xl:col-span-5" : "lg:col-span-8 xl:col-span-8"
              )}
            >
              
              {/* WATCH PLAYER (Positioned comfortably near top with Apple spring morph) */}
              <div className={cn(
                "w-full",
                !isVertical && "sticky top-2 lg:relative lg:top-auto z-40 bg-[#0a0a0a] py-1 lg:py-0"
              )}>
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                  className={cn(
                    "relative mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 transform-gpu will-change-[width,height,transform]",
                    isVertical ? "max-w-[290px] sm:max-w-[330px] lg:max-w-[320px] xl:max-w-[360px] aspect-[9/16]" : "w-full aspect-video"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentVideo.videoUrl || currentVideo.youtubeId || currentVideo.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full bg-black/0"
                    >
                      {currentVideo.videoUrl ? (
                        <video
                          src={currentVideo.videoUrl}
                          autoPlay
                          controls
                          playsInline
                          className="w-full h-full object-contain"
                        />
                      ) : currentVideo.youtubeId ? (
                        iframeLoaded ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                            title={`Video player: ${currentVideo.title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full border-none"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex items-center justify-center">
                             <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
                          </div>
                        )
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/30 bg-[#0a0a0a] text-sm font-medium">
                          <Play className="w-8 h-8 mb-4 opacity-30" />
                          Video Source Missing
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* VIDEO DETAILS & DESCRIPTION BELOW PLAYER */}
              <motion.div layout className="mt-4 px-1 sm:px-2">
                {currentVideo.isAi ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-2 shadow-sm">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    AI Generated Video
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">
                    {currentVideo?.category || 'Video Editing'}
                  </span>
                )}
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                  {currentVideo?.title}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-normal max-w-3xl">
                  {currentVideo?.description}
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: FILTER CONTROLS & UP NEXT LIST */}
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
              className={cn(
                "w-full transform-gpu",
                isVertical ? "lg:col-span-6 xl:col-span-7" : "lg:col-span-4 xl:col-span-4"
              )}
            >
              {/* Sidebar Column */}
              <div className="lg:sticky lg:top-16">
                  {/* Apple UI Single-Row Control Bar */}
                  <div className="mb-4 p-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-2xl flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                    
                    {/* Format Switcher (Horizontal vs Reels) */}
                    <div className="relative flex items-center p-0.5 bg-black/40 rounded-full border border-white/5">
                      <button
                        onClick={() => handleFormatChange('long')}
                        className={cn(
                          "relative z-10 px-3.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 select-none",
                          videoType === 'long' ? "text-white" : "text-white/40 hover:text-white/80"
                        )}
                      >
                        {videoType === 'long' && (
                          <motion.div
                            layoutId="active-format-pill"
                            className="absolute inset-0 rounded-full bg-white/15 border border-white/10 shadow-sm z-[-1]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        Horizontal
                      </button>
                      <button
                        onClick={() => handleFormatChange('shorts')}
                        className={cn(
                          "relative z-10 px-3.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 select-none",
                          videoType === 'shorts' ? "text-white" : "text-white/40 hover:text-white/80"
                        )}
                      >
                        {videoType === 'shorts' && (
                          <motion.div
                            layoutId="active-format-pill"
                            className="absolute inset-0 rounded-full bg-white/15 border border-white/10 shadow-sm z-[-1]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        Reels
                      </button>
                    </div>

                    <div className="hidden sm:block w-px h-4 bg-white/10" />

                    {/* AI Filter Switcher (All | Without AI | AI Videos) */}
                    <div className="relative flex items-center p-0.5 bg-black/40 rounded-full border border-white/5 gap-0.5">
                      <button
                        onClick={() => handleFilterChange('all')}
                        className={cn(
                          "relative z-10 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 select-none",
                          aiFilter === 'all' ? "text-white" : "text-white/40 hover:text-white/80"
                        )}
                      >
                        {aiFilter === 'all' && (
                          <motion.div
                            layoutId="active-ai-pill"
                            className="absolute inset-0 rounded-full bg-white/15 border border-white/10 shadow-sm z-[-1]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        All
                      </button>
                      <button
                        onClick={() => handleFilterChange('no-ai')}
                        className={cn(
                          "relative z-10 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 select-none",
                          aiFilter === 'no-ai' ? "text-white" : "text-white/40 hover:text-white/80"
                        )}
                      >
                        {aiFilter === 'no-ai' && (
                          <motion.div
                            layoutId="active-ai-pill"
                            className="absolute inset-0 rounded-full bg-white/15 border border-white/10 shadow-sm z-[-1]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        Without AI
                      </button>
                      <button
                        onClick={() => handleFilterChange('ai-only')}
                        className={cn(
                          "relative z-10 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 flex items-center gap-1 select-none",
                          aiFilter === 'ai-only' ? "text-cyan-300" : "text-white/40 hover:text-cyan-400"
                        )}
                      >
                        {aiFilter === 'ai-only' && (
                          <motion.div
                            layoutId="active-ai-pill"
                            className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-500/30 shadow-sm z-[-1]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                        AI Videos
                      </button>
                    </div>
                  </div>

                 <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5 px-1">
                   <h2 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">Up Next</h2>
                   <span className="text-[11px] font-medium text-white/40">
                     {displayedVideos.length} Videos
                   </span>
                 </div>

                 {/* RESPONSIVE SCROLL CONTAINER */}
                 {displayedVideos.length === 0 ? (
                   <div className="py-12 text-center text-white/40 text-xs font-medium">
                     No videos found for selected filters.
                   </div>
                 ) : (
                   <motion.div 
                     layout
                     className={cn(
                       "lg:overflow-y-auto lg:max-h-[70vh] lg:pr-1 transform-gpu",
                       videoType === 'shorts' 
                         ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2" 
                         : "grid grid-cols-2 gap-x-4 gap-y-5"
                     )}
                   >
                      {displayedVideos.map((video) => (
                         <VideoCard 
                            key={video.id || video.youtubeId || video.videoUrl} 
                            video={video} 
                         />
                      ))}
                   </motion.div>
                 )}
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </motion.div>
  );
}