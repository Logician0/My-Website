'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { services, servicesRound } from '@/lib/data';
import { cn } from '@/utils/cn';

// 1. Gather & Format Data from the dedicated watch lists in portfolio.json
const getRoundVideos = (arr: any[]) => arr.map(v => ({
  id: v.id,
  title: v.title,
  youtubeId: v.youtubeId,
  aspect: v.ratio || '16/9',
  thumbnail: v.customThumb || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`
}));

const horizontalVideos = getRoundVideos(servicesRound?.allHorizontalVideos || []);
const verticalVideos = getRoundVideos(servicesRound?.allVerticalVideos || []);

export function VideoCategoryPage() {
  const [videoType, setVideoType] = useState<'long' | 'shorts'>('long');
  const [currentVideo, setCurrentVideo] = useState<any>(horizontalVideos[0] || null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

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

  const handleVideoClick = (video: any) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeChange = (type: 'long' | 'shorts') => {
    setVideoType(type);
  };

  const isVertical = currentVideo?.aspect === '9/16';
  
  // Recommendations strictly match the active category tab
  const displayedVideos = videoType === 'long' ? horizontalVideos : verticalVideos;

  // Helper component (YouTube style watch card)
  const VideoCard = ({ video, className }: { video: any, className?: string }) => {
    const isCardVertical = video.aspect === '9/16';
    const isPlaying = currentVideo?.youtubeId === video.youtubeId;
    
    // Set YouTube hqdefault thumbnail as primary (most reliable)
    const primaryThumb = video.youtubeId 
      ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` 
      : video.thumbnail;
      
    const [imgSrc, setImgSrc] = useState(primaryThumb);

    return (
      <button
        onClick={() => handleVideoClick(video)}
        aria-label={`Play video: ${video.title}`}
        className={cn(
          "group flex flex-col rounded-xl transition-all text-left bg-transparent border-none cursor-pointer w-full gap-2 p-1.5 select-none",
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
              src={imgSrc} 
              alt="" 
              loading="lazy"
              className={cn(
                "w-full h-full object-cover transition-all duration-300 ease-out",
                isPlaying ? "opacity-50 scale-100" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
              )}
           />
           
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
             {isCardVertical ? 'Short' : 'Video'}
           </span>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-4 sm:pt-6 pb-12 px-4 md:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Fully expanded container to fill the screen width completely */}
      <div className="w-full max-w-none mx-auto relative z-10">
        
        {currentVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-6 xl:gap-8">
            
            {/* LEFT COLUMN: WATCH PLAYER & DETAILS */}
            <div className={cn(
              "transition-all duration-500 ease-in-out w-full",
              isVertical ? "lg:col-span-6 xl:col-span-5" : "lg:col-span-8 xl:col-span-8"
            )}>
              
              {/* WATCH PLAYER (Clean borderless screen, just like YouTube watch page) */}
              <div className={cn(
                "w-full",
                !isVertical && "sticky top-0 z-50 lg:relative lg:z-auto bg-[#0a0a0a] pt-2 pb-1 lg:py-0"
              )}>
                <div className={cn(
                  "relative mx-auto rounded-xl overflow-hidden bg-black transition-all duration-500 ease-in-out shadow-2xl",
                  isVertical ? "max-w-[300px] sm:max-w-[340px] lg:max-w-[320px] xl:max-w-[360px] aspect-[9/16]" : "w-full aspect-video"
                )}>
                  {currentVideo.youtubeId ? (
                    iframeLoaded ? (
                      <iframe
                        key={currentVideo.youtubeId}
                        src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={`Video player: ${currentVideo.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
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
                </div>
              </div>

              {/* VIDEO DESCRIPTION AREA BELOW PLAYER */}
              <div className="mt-5 px-1 sm:px-2">
                <span className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-semibold text-white/50 uppercase tracking-wider mb-2">
                  12K Views
                </span>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                  {currentVideo?.title}
                </h1>
              </div>
            </div>

            {/* RIGHT COLUMN: UP NEXT LIST */}
            <div className={cn(
              "transition-all duration-500 ease-in-out w-full",
              isVertical ? "lg:col-span-6 xl:col-span-7" : "lg:col-span-4 xl:col-span-4"
            )}>
              {/* Flat, borderless sidebar column just like YouTube watch page */}
              <div className="lg:sticky lg:top-24">
                  {/* Relocated Long/Short Category Switcher */}
                  <div className="mb-5 flex justify-center lg:justify-start">
                    <div className="relative flex items-center p-1 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-full w-max shadow-2xl">
                      <motion.div
                        className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-white/10 to-white/[0.06] border border-white/15"
                        animate={{ left: videoType === 'long' ? "4px" : "50%", width: "calc(50% - 4px)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                      <button
                        onClick={() => handleTypeChange('long')}
                        className={cn(
                          "relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase transition-all duration-300",
                          videoType === 'long' 
                            ? "text-white" 
                            : "text-white/35 hover:text-white/70"
                        )}
                      >
                        Long Videos
                      </button>
                      <button
                        onClick={() => handleTypeChange('shorts')}
                        className={cn(
                          "relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase transition-all duration-300",
                          videoType === 'shorts' 
                            ? "text-white" 
                            : "text-white/35 hover:text-white/70"
                        )}
                      >
                        Shorts & Reels
                      </button>
                    </div>
                  </div>

                 <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                   <h2 className="text-sm font-semibold text-white">Up Next</h2>
                   <span className="text-xs font-medium text-white/40">
                     {displayedVideos.length} Videos
                   </span>
                 </div>

                 {/* RESPONSIVE SCROLL CONTAINER */}
                 <div className={cn(
                   "lg:overflow-y-auto lg:max-h-[70vh] lg:pr-1",
                   videoType === 'shorts' 
                     // Multi-column grid for vertical videos
                     ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2" 
                     // Double column grid for horizontal videos
                     : "grid grid-cols-2 gap-x-4 gap-y-6"
                 )}>
                    {displayedVideos.map((video) => (
                       <VideoCard 
                          key={video.youtubeId} 
                          video={video} 
                       />
                    ))}
                 </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}