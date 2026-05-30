'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { services } from '@/lib/data';
import { cn } from '@/utils/cn';

export function VideoCategoryPage() {
  const { categoryId } = useParams();
  
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  
  // 1. Find Data
  const videoService = services.find(s => s.slug === 'video-editing');
  const category = videoService?.categories.find(c => c.id === categoryId);
  const videos = category?.items.filter(item => item.metadata.type === 'video') || [];
  
  const horizontalVideos = videos.filter(v => v.metadata?.aspect !== '9/16');
  const verticalVideos = videos.filter(v => v.metadata?.aspect === '9/16');
  const sortedVideos = [...horizontalVideos, ...verticalVideos];

  useEffect(() => {
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [videos, currentVideo]);

  if (!category || !videoService) return <div className="min-h-screen bg-[#030303]" />;

  const handleVideoClick = (video: any) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isVertical = currentVideo?.metadata?.aspect === '9/16';

  // Helper component
  const VideoCard = ({ video, className }: { video: any, className?: string }) => {
    const isCardVertical = video.metadata?.aspect === '9/16';
    const isPlaying = currentVideo?.id === video.id;

    return (
      <button
        onClick={() => handleVideoClick(video)}
        aria-label={`Play video: ${video.title}`}
        className={cn(
          "group flex flex-col p-2 sm:p-3 rounded-[1.5rem] transition-all text-left bg-transparent border-none cursor-pointer flex-none will-change-transform",
          !isPlaying && "hover:bg-white/5 active:scale-95",
          isPlaying && "bg-white/[0.03] backdrop-blur-md border border-white/5 shadow-inner",
          className
        )}
      >
        {/* THUMBNAIL */}
        <div className={cn(
            "relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-3 sm:mb-4 shadow-lg",
            "h-24 w-auto lg:h-auto lg:w-full",
            isCardVertical ? "aspect-[9/16]" : "aspect-video"
        )}>
           {/* Top Gloss Highlight */}
           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
           
           <img 
              src={video.thumbnail} 
              alt="" 
              loading="lazy"
              className={cn(
                "w-full h-full object-cover transition-all duration-700 ease-out",
                isPlaying ? "opacity-40 scale-100 filter grayscale-[50%]" : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
              )}
           />
           
           {isPlaying && (
             <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                 <span className="text-white font-bold uppercase tracking-widest text-[8px] sm:text-[9px]">
                   Playing
                 </span>
               </div>
             </div>
           )}

           {!isPlaying && (
             <>
               <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                     <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                 </div>
               </div>
             </>
           )}
        </div>

        {/* TEXT */}
        <div className={cn(
          "flex flex-col min-w-0 px-1",
          isCardVertical ? "max-w-[70px] sm:max-w-[100px] lg:max-w-none" : "max-w-[180px] lg:max-w-none"
        )}>
           <h3 className={cn(
             "text-[10px] sm:text-xs font-bold line-clamp-2 leading-snug uppercase tracking-tight transition-colors",
             isPlaying ? "text-white/40" : "text-white/80 group-hover:text-white"
           )}>
              {video.title}
           </h3>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 pb-12 px-4 md:px-8 font-sans relative overflow-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#90a0b2]/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {currentVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-6 lg:gap-10">
            
            {/* LEFT COLUMN: PLAYER & INFO */}
            <div className={cn(
              "transition-all duration-700 ease-[0.16,1,0.3,1]",
              isVertical ? "lg:col-span-5 xl:col-span-4" : "lg:col-span-8 xl:col-span-9"
            )}>
              
              {/* VIDEO INFO HEADER */}
              <div className="text-center md:text-left mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded border border-white/10 bg-white/5 backdrop-blur-md mb-4 shadow-sm">
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{category.title}</span>
                </div>
                <h1 className="font-black text-2xl sm:text-3xl md:text-5xl leading-none tracking-tighter uppercase drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                  {currentVideo.title}
                </h1>
              </div>

              {/* VIDEO PLAYER (Liquid Glass Container) */}
              <div className="relative flex justify-center w-full">
                <div className={cn(
                  "relative bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 rounded-[1.5rem] sm:rounded-[2.5rem] p-2 sm:p-4 w-full",
                  isVertical 
                    ? "mx-auto max-w-[380px]" 
                    : ""
                )}>
                  {/* Top Gloss Highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 opacity-50" />
                  
                  <div className={cn(
                    "relative overflow-hidden rounded-xl sm:rounded-3xl bg-zinc-950 border border-black shadow-inner",
                    isVertical ? "aspect-[9/16] w-full" : "aspect-video w-full"
                  )}>
                    {currentVideo.metadata.youtubeId ? (
                      <iframe
                        key={currentVideo.metadata.youtubeId}
                        src={`https://www.youtube.com/embed/${currentVideo.metadata.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={`Video player: ${currentVideo.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/30 bg-[#0a0a0a] uppercase tracking-widest text-xs font-bold">
                        <Play className="w-8 h-8 mb-4 opacity-50" />
                        Source Missing
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR PLAYLIST */}
            <div className={cn(
              "transition-all duration-700 ease-[0.16,1,0.3,1]",
              isVertical ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-4 xl:col-span-3"
            )}>
              <div className="sticky top-28 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-4 sm:p-6 shadow-2xl">
                 
                 <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                   <h2 className="text-xs font-bold text-white uppercase tracking-widest">Up Next</h2>
                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full border border-white/5">
                     {sortedVideos.length} Videos
                   </span>
                 </div>

                 {/* LIST CONTAINER (CSS Scroll Snap) */}
                 <div className={cn(
                   "flex overflow-x-auto gap-3 sm:gap-4 no-scrollbar snap-x items-start overscroll-x-contain pb-4 lg:pb-0",
                   isVertical ? "lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:overflow-y-auto lg:max-h-[70vh]" : "lg:flex lg:flex-col lg:overflow-y-auto lg:max-h-[70vh] lg:pr-2"
                 )}>
                    {sortedVideos.map((video) => (
                       <VideoCard 
                          key={video.id} 
                          video={video} 
                          className="snap-start"
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