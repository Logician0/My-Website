'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, Layout, Link as LinkIcon, Play } from 'lucide-react';

// ==========================================
// 1. YOUR COMPLETE SEED DATA
// ==========================================
const services: any[] = [
  {
    id: 'svc-ai-agents',
    slug: 'ai-agents',
    title: 'AI Agents',
    description: 'Intelligent automation solutions that transform customer interactions.',
    icon: 'Bot',
    color: 'violet',
    characterImg: '/images/char-ai.webp', 
    glow: 'drop-shadow-[0_0_40px_rgba(139,92,246,0.6)]',
    categories: [
      {
        id: 'cat-chatbots',
        title: 'Chatbots',
        items: [
          {
            id: 'ai-1', title: 'Support Bot', description: 'Intelligent customer support that resolves 80% of queries automatically with sentiment analysis.',
            thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=80',
            tags: ['NLP', '24/7', 'Multi-language'],
            metadata: { type: 'ai', features: ['Sentiment Analysis', 'CRM Sync', 'Handoff to Human'], platform: 'Web & Mobile', aspect: '16/9' }
          },
          {
            id: 'ai-2', title: 'Sales Assistant', description: 'AI-powered lead qualification and nurturing that works around the clock to grow your pipeline.',
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
            tags: ['Lead Gen', 'CRM', 'Qualification'],
            metadata: { type: 'ai', features: ['Lead Scoring', 'Calendar Integration', 'Follow-up Automation'], platform: 'Slack & Web', aspect: '16/9' }
          }
        ]
      },
      {
        id: 'cat-automation',
        title: 'Workflow Automation',
        items: [
          {
            id: 'auto-1', title: 'Doc Processor', description: 'Automated document processing with OCR, data extraction, and intelligent routing.',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
            tags: ['OCR', 'Parsing', 'PDF'],
            metadata: { type: 'ai', features: ['OCR Recognition', 'Auto-classification', 'API Integration'], integrations: ['Zapier', 'Make', 'n8n'], aspect: '16/9' }
          }
        ]
      }
    ]
  },
  {
    id: 'svc-video-editing',
    slug: 'video-editing',
    title: 'Video Editing',
    description: 'Cinematic storytelling that captivates audiences and drives engagement.',
    icon: 'Film',
    color: 'pink',
    characterImg: '/images/char-video.webp', 
    glow: 'drop-shadow-[0_0_40px_rgba(236,72,153,0.6)]',
    categories: [
      // FIX: Added Showreel Category as the first item
      {
        id: 'cat-showreel',
        title: 'Showreel',
        items: [
          {
            id: 'showreel-1', 
            title: 'Video Editing Showreel', 
            description: 'A dynamic compilation of my best video editing and filmmaking work.',
            thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80', // Replace with your showreel thumbnail
            tags: ['Showreel', 'Cinematic', 'Portfolio'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/dbqkbgol3/video/upload/v1772526668/final_low_imemnx.mp4', aspect: '16/9' } // Replace with your Cloudinary link
          }
        ]
      },
      {
        id: 'cat-shorts',
        title: 'Shorts & Reels',
        items: [
          {
            id: '1', title: 'Filmmaking Episode 1', description: 'Fast-paced, hook-driven product reveals designed to stop thumbs and drive action.',
            thumbnail: 'https://res.cloudinary.com/dbqkbgol3/video/upload/v1772526643/What_filmmaking_actually_means__1080p_y3dyle.mp4',
            tags: ['Vertical', 'Fast Paced', 'Hooks'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/dbqkbgol3/video/upload/v1772526643/What_filmmaking_actually_means__1080p_y3dyle.mp4', aspect: '9/16' }
          },
          {
            id: '2', title: 'Filmmaking Episode 2', description: 'Authentic, engaging lifestyle content that builds genuine audience connection.',
            thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
            tags: ['Authentic', 'Storytelling', 'Engaging'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/dbqkbgol3/video/upload/v1772526669/Ep2_uzakzn.mp4', aspect: '9/16' }
          },
          {
            id: '3', title: 'Filmmaking Episode 3', description: 'User-generated style content that converts with authentic appeal.',
            thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
            tags: ['UGC', 'Conversion', 'Authentic'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/dbqkbgol3/video/upload/v1772526641/It_s_Not_Just_The_Direction___Filmmaking_Series_Ep_3_cinematography_filmmaking_editing_1080p_bj1qmp.mp4', aspect: '9/16' }
          }
        ]
      },
      {
        id: 'cat-promo',
        title: 'Promo Videos',
        items: [
          {
            id: 'promo-1', title: 'Zar App Promo', description: 'Vertical product promos designed for social media feeds and stories.',
            thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'App', 'Social'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '9/16' }
          },
          {
            id: 'promo-2', title: 'Ghar Soap Promo', description: 'Widescreen brand campaigns for YouTube and streaming platforms.',
            thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
            tags: ['Widescreen', 'Product', 'Campaign'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '16/9' }
          }
        ]
      },
      {
        id: 'cat-podcasts',
        title: 'Podcasts',
        items: [
          {
            id: 'pod-1', title: 'Full Episode Edit', description: 'Complete podcast episode with multi-camera editing and graphics.',
            thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80',
            tags: ['Full Episode', 'Multi-cam', 'Graphics'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '16/9' }
          },
          {
            id: 'pod-2', title: 'Viral Clip (Vertical)', description: 'Attention-grabbing vertical clips optimized for TikTok and Reels.',
            thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&auto=format&fit=crop&q=80',
            tags: ['Clip', 'Vertical', 'Viral'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '9/16' }
          }
        ]
      },
      {
        id: 'cat-ai-videos',
        title: 'AI Videos',
        items: [
          {
            id: 'item-ai-avatar', title: 'AI Avatar (Vertical)', description: 'AI-generated spokesperson videos for social media and ads.',
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
            tags: ['AI Avatar', 'Vertical', 'Spokesperson'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/dbqkbgol3/video/upload/v1772526668/final_low_imemnx.mp4', aspect: '16/9' }
          },
          {
            id: 'item-ai-explainer', title: 'AI Explainer', description: 'Horizontal AI-generated explainer videos with custom visuals.',
            thumbnail: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&auto=format&fit=crop&q=80',
            tags: ['AI', 'Explainer', 'Horizontal'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '16/9' }
          }
        ]
      },
      {
        id: 'cat-travel-cinematic',
        title: 'Travel & Cinematic',
        items: [
          {
            id: 'item-travel-diary', title: 'Travel Diary', description: '4K color-graded travel content with cinematic transitions and storytelling.',
            thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&auto=format&fit=crop&q=80',
            tags: ['4K', 'Color Graded', 'Cinematic'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '16/9' }
          },
          {
            id: 'item-destination-reel', title: 'Destination Reel', description: 'Vertical destination showcases perfect for travel brands.',
            thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'Destination', 'Travel'],
            metadata: { type: 'video', videoUrl: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1234/your-video.mp4', aspect: '9/16' }
          }
        ]
      }
    ]
  },
  {
    id: 'svc-web-dev',
    slug: 'web-dev',
    title: 'Web Development',
    description: 'Blazing-fast, conversion-optimized digital experiences.',
    icon: 'Code2',
    color: 'cyan',
    characterImg: '/images/char-web.webp', 
    glow: 'drop-shadow-[0_0_40px_rgba(6,182,212,0.6)]',
    categories: [
      {
        id: 'cat-corporate',
        title: 'Corporate & Business',
        items: [
          {
            id: 'web-1', title: 'Shree Ram Properties', description: 'A premium real estate platform featuring dynamic property listings and seamless lead capture.',
            thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
            tags: ['Real Estate', 'Next.js', 'Corporate'],
            metadata: { type: 'web', url: 'https://yourdomain.com', stack: 'Next.js + Tailwind + Framer Motion', features: ['Property Search', 'Lead Generation', 'Admin Dashboard'], aspect: '16/9' }
          },
          {
            id: 'web-2', title: 'Aditya General Store', description: 'A modern digital storefront streamlining inventory and customer engagement for local business.',
            thumbnail: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=800&auto=format&fit=crop&q=80',
            tags: ['E-commerce', 'Local Business', 'Retail'],
            metadata: { type: 'web', url: 'https://yourdomain.com', stack: 'React + Node.js', features: ['Inventory Sync', 'WhatsApp Integration', 'Digital Catalog'], aspect: '16/9' }
          }
        ]
      },
      {
        id: 'cat-landing-pages',
        title: 'Landing Pages',
        items: [
          {
            id: 'land-1', title: 'High-Conversion SaaS Landing', description: 'Optimized for lead generation with interactive elements and lightning-fast performance.',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
            tags: ['Marketing', 'Framer Motion', 'Conversion'],
            metadata: { type: 'web', url: 'https://yourdomain.com', stack: 'Next.js + Framer Motion', features: ['A/B Tested', 'Mobile First', 'Heatmap Ready'], aspect: '16/9' }
          }
        ]
      }
    ]
  }
];

// ==========================================
// 2. LIGHTWEIGHT SPRING PHYSICS
// ==========================================
const premiumSpring: any = { type: "spring", stiffness: 250, damping: 25, mass: 0.5 };

const swipeVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200, 
    opacity: 0, 
    scale: 0.9, 
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: { 
    zIndex: 1, 
    x: 0, 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0, 
    x: direction < 0 ? 200 : -200, 
    opacity: 0, 
    scale: 0.9, 
    rotateY: direction < 0 ? 15 : -15,
  }),
};

const textVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 20 : -20, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 20 : -20, opacity: 0 })
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export function InteractivePortfolio() {
  const [uiActiveId, setUiActiveId] = useState<string | null>(null); 
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null); 
  const [activeCatId, setActiveCatId] = useState<string | null>(null); 
  const [mediaIndex, setMediaIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const currentService = services.find((s: any) => s.id === activeServiceId) || null;
  const currentCategory = currentService?.categories.find((c: any) => c.id === activeCatId) || currentService?.categories[0] || null;
  const items = currentCategory?.items || [];
  const currentItem = items[mediaIndex] || null;

  const handleCharSelect = (serviceId: string) => {
    const service = services.find((s: any) => s.id === serviceId);
    if (!service || uiActiveId === serviceId) return;
    
    setUiActiveId(serviceId);

    setTimeout(() => {
      setActiveServiceId(serviceId);
      setActiveCatId(service.categories[0].id);
      setMediaIndex(0);
      setDirection(1);
      setPlayingVideoId(null); 
    }, 50);
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setMediaIndex((prev) => (prev + newDirection + items.length) % items.length);
    setPlayingVideoId(null); 
  };

  const handleFullscreen = (e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const elem = document.getElementById('media-container');
    if (!elem) return;
    
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if ((elem as any).webkitRequestFullscreen) (elem as any).webkitRequestFullscreen();
      else if ((elem as any).msRequestFullscreen) (elem as any).msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
      else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen();
    }
  };

  const isVertical = currentItem?.metadata?.aspect === '9/16';
  
  const playerContainerClass = isVertical 
    ? "w-full max-w-[240px] sm:max-w-[260px] md:max-w-[320px] aspect-[9/16]" 
    : "w-full max-w-[94vw] sm:max-w-[85vw] md:max-w-[900px] aspect-video";

  const glowColors: Record<string, string> = {
    pink: 'bg-pink-600/15', cyan: 'bg-cyan-600/15', violet: 'bg-violet-600/15'
  };

  const uiService = services.find((s: any) => s.id === uiActiveId) || null;
  const activeGlow = uiService ? glowColors[uiService.color] : 'bg-white/5';

  return (
    <section 
      id="portfolio" 
      className={`relative w-full bg-[#030303] px-4 md:px-8 overflow-hidden font-sans flex flex-col items-center transition-all duration-700 ease-in-out ${uiActiveId ? 'min-h-screen py-24' : 'min-h-[40vh] py-16'}`}
    >
      {/* Background Ambient Glow */}
      <div 
        style={{ willChange: 'background-color' }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] blur-[150px] rounded-full pointer-events-none transition-colors duration-1000 ${activeGlow}`} 
      />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        <h2 className="text-4xl md:text-6xl font-bold text-center text-white tracking-tight mb-10 md:mb-16">
          What are you <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 italic pr-2">interested in?</span>
        </h2>

        {/* 1. CARTOON CHARACTERS */}
        <div className={`flex flex-row items-end justify-center w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] h-[170px] sm:h-[180px] md:h-[260px] mb-8 md:mb-16
          ${uiActiveId === null ? 'gap-2 sm:gap-6 md:gap-16' : '-space-x-3 sm:space-x-4 md:space-x-16'}
        `}>
          {services.map((service: any) => {
            const isNoneSelected = uiActiveId === null;
            const isActive = uiActiveId === service.id;
            const isVideoEditing = service.id === 'svc-video-editing';

            return (
              <button
                key={service.id} onClick={() => handleCharSelect(service.id)}
                className={`relative group flex flex-col items-center justify-end flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom
                  ${isNoneSelected ? 'max-w-[100px] sm:max-w-[160px] md:max-w-[220px]' : 'max-w-[120px] sm:max-w-[160px] md:max-w-[220px]'}
                  ${isActive ? `scale-110 md:scale-125 z-20` : isNoneSelected ? `scale-100 hover:scale-105 z-10` : `scale-90 md:scale-95 opacity-40 hover:opacity-80 z-0`}
                  ${isVideoEditing && !isNoneSelected ? 'translate-x-2 md:translate-x-0' : ''}
                `}
              >
                <img 
                  src={service.characterImg} alt={service.title} loading="lazy" decoding="async"
                  className={`object-contain w-full h-[120px] sm:h-[150px] md:h-[220px] transition-all duration-700 
                    ${isActive ? service.glow : isNoneSelected ? 'hover:scale-105 ' + service.glow : 'grayscale hover:grayscale-0'}
                  `}
                />
                <div className={`mt-3 md:mt-5 px-2 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-full backdrop-blur-xl border transition-all duration-500 w-full flex items-center justify-center
                  ${isActive ? 'bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : isNoneSelected ? 'bg-zinc-900/50 border-white/5 text-zinc-300' : 'bg-transparent border-transparent text-transparent group-hover:text-zinc-500'}
                `}>
                  <span className={`font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 whitespace-normal text-center leading-[1.2]
                    ${isNoneSelected ? 'text-[9px] sm:text-[10px] md:text-xs' : 'text-[9px] md:text-xs'}
                  `}>
                    {service.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* ANIMATED EXPANDING SECTION (Only renders after a category is clicked)     */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {currentService && items.length > 0 && currentItem && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ opacity: { duration: 0.3 }, height: premiumSpring }}
              className="w-full flex flex-col items-center overflow-hidden"
            >
              
              {/* 2. CATEGORY PILL NAVIGATION */}
              <div className="min-h-[60px] flex items-center justify-center w-full mb-6 md:mb-8 relative">
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 transition-colors duration-300">
                  {currentService.categories.map((cat: any) => {
                    const isActive = activeCatId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { 
                          setActiveCatId(cat.id); 
                          setMediaIndex(0); 
                          setDirection(1); 
                          setPlayingVideoId(null); 
                        }}
                        className={`relative px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-sm font-bold tracking-wide transition-colors duration-300
                          ${isActive ? 'text-black' : 'text-zinc-400 border border-white/5 bg-zinc-900/50 hover:bg-white/10 hover:text-white'}
                        `}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="activeCategoryPill" 
                            className="absolute inset-0 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                            transition={premiumSpring}
                          />
                        )}
                        <span className="relative z-10">{cat.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. DYNAMIC METADATA PLAYER */}
              <div className="w-full flex flex-col items-center">
                
                <div className="w-full flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-12 px-2 sm:px-4">
                  
                  {/* Vertical Video Prev Button */}
                  {isVertical && items.length > 1 ? (
                    <button onClick={() => paginate(-1)} className="flex-shrink-0 flex w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-90 z-40 shadow-xl">
                      <ChevronLeft size={24} />
                    </button>
                  ) : isVertical ? (
                    <div className="flex-shrink-0 w-10 md:w-14" /> 
                  ) : null}

                  <div className={`relative flex-1 shrink w-full mx-auto transition-all duration-700 ease-in-out ${playerContainerClass}`}>
                    <div id="media-container" className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative perspective-1000 group will-change-transform">
                      <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                          key={currentItem.id} custom={direction} variants={swipeVariants} initial="enter" animate="center" exit="exit" transition={premiumSpring}
                          style={{ willChange: "transform, opacity" }}
                          className="absolute inset-0 w-full h-full transform-style-3d bg-zinc-900"
                          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                          onDragEnd={(e: any, { offset }: any) => { if (offset.x < -40) paginate(1); else if (offset.x > 40) paginate(-1); }}
                        >
                          
                          {/* EDGE SWIPE / FULLSCREEN DOUBLE TAP ZONES */}
                          <div 
                            onDoubleClick={handleFullscreen}
                            className="absolute top-[15%] bottom-[25%] left-0 w-[15%] z-30 md:hidden touch-pan-y cursor-pointer" 
                          />
                          <div 
                            onDoubleClick={handleFullscreen}
                            className="absolute top-[15%] bottom-[25%] right-0 w-[15%] z-30 md:hidden touch-pan-y cursor-pointer" 
                          />

                          {/* LIGHTWEIGHT VIDEO FACADE */}
                          {currentItem.metadata?.type === 'video' ? (
                            playingVideoId === currentItem.id ? (
                              <video
                                src={currentItem.metadata.videoUrl}
                                autoPlay
                                controls
                                playsInline
                                className="w-full h-full object-cover pointer-events-auto bg-black"
                                style={{ outline: 'none', border: 'none' }}
                              />
                            ) : (
                              <div 
                                className="relative w-full h-full cursor-pointer group"
                                onClick={() => setPlayingVideoId(currentItem.id)}
                              >
                                <img src={currentItem.thumbnail} alt={currentItem.title} loading="lazy" decoding="async" className="w-full h-full object-cover md:object-contain bg-zinc-950 transition-transform duration-700 group-hover:scale-105" />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors duration-500 z-20">
                                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                    <Play size={28} className="ml-1" fill="currentColor" />
                                  </div>
                                </div>
                              </div>
                            )
                          ) : (
                            <img src={currentItem.thumbnail} alt={currentItem.title} loading="lazy" decoding="async" className="w-full h-full object-contain bg-zinc-950 transition-transform duration-700 group-hover:scale-105" />
                          )}

                        </motion.div>
                      </AnimatePresence>
                      
                      {currentItem.metadata?.type !== 'video' && currentItem.metadata?.url && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-30 pointer-events-none md:pointer-events-auto">
                          <a href={currentItem.metadata.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            Visit Live Site <ExternalLink size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vertical Video Next Button */}
                  {isVertical && items.length > 1 ? (
                    <button onClick={() => paginate(1)} className="flex-shrink-0 flex w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-90 z-40 shadow-xl">
                      <ChevronRight size={24} />
                    </button>
                  ) : isVertical ? (
                    <div className="flex-shrink-0 w-10 md:w-14" /> 
                  ) : null}

                </div>

                {/* Horizontal Video Navigation Buttons */}
                {!isVertical && items.length > 1 && (
                  <div className="flex flex-row items-center justify-center gap-6 mt-6 md:mt-8 w-full z-20">
                    <button 
                      onClick={() => paginate(-1)} 
                      className="flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-90 shadow-xl"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => paginate(1)} 
                      className="flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-90 shadow-xl"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}

                {/* INFO AREA */}
                <div className="w-full max-w-4xl mx-auto mt-6 z-10 px-4 relative min-h-[300px] md:min-h-[220px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`info-${currentItem.id}`} custom={direction} variants={textVariants} initial="enter" animate="center" exit="exit" transition={premiumSpring}
                      style={{ willChange: "transform, opacity" }}
                      drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                      onDragEnd={(e: any, { offset }: any) => { if (offset.x < -40) paginate(1); else if (offset.x > 40) paginate(-1); }}
                      className="w-full flex flex-col items-center md:items-start text-center md:text-left touch-pan-y"
                    >
                      <div className="flex flex-col md:flex-row justify-between w-full items-start gap-4">
                        <div className="w-full flex flex-col items-center md:items-start">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentItem.title}</h3>
                          <p className="text-zinc-400 text-sm md:text-base mb-4 max-w-xl">{currentItem.description}</p>
                        </div>
                      </div>

                      {currentItem.metadata?.type !== 'video' && (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 bg-zinc-900/40 p-4 md:p-6 rounded-2xl border border-white/5 text-left">
                          <div className="space-y-3">
                            {currentItem.metadata?.stack && <div className="flex items-center gap-2 text-[11px] md:text-xs text-zinc-300"><Layout size={14} className="text-cyan-400"/> <span className="font-semibold text-white">Stack:</span> {currentItem.metadata.stack}</div>}
                            {currentItem.metadata?.platform && <div className="flex items-center gap-2 text-[11px] md:text-xs text-zinc-300"><Layout size={14} className="text-violet-400"/> <span className="font-semibold text-white">Platform:</span> {currentItem.metadata.platform}</div>}
                            {currentItem.metadata?.integrations && <div className="flex items-center gap-2 text-[11px] md:text-xs text-zinc-300"><LinkIcon size={14} className="text-pink-400"/> <span className="font-semibold text-white">Integrations:</span> {currentItem.metadata.integrations.join(', ')}</div>}
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 block">Key Features</span>
                            {currentItem.metadata?.features?.map((feature: string) => (
                              <div key={feature} className="flex items-start gap-2 text-[11px] md:text-xs text-zinc-200">
                                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" /> <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        {currentItem.tags?.map((tag: string) => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10 text-zinc-300">{tag}</span>
                        ))}
                      </div>

                      {currentItem.metadata?.type !== 'video' && currentItem.metadata?.url && (
                        <a href={currentItem.metadata.url} target="_blank" rel="noopener noreferrer" className="mt-6 md:hidden flex justify-center w-full items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold active:scale-95 transition-all">
                          Visit Live Site <ExternalLink size={16} />
                        </a>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {items.length > 1 && (
                  <div className="mt-8 flex gap-2">
                    {items.map((_: any, i: number) => (
                      <div key={i} onClick={() => { setDirection(i > mediaIndex ? 1 : -1); setMediaIndex(i); }} className="relative h-2 rounded-full cursor-pointer transition-all duration-300 w-8 bg-white/20 hover:bg-white/40">
                        {i === mediaIndex && (
                          <motion.div layoutId="activeDot" className="absolute inset-0 bg-white rounded-full shadow-[0_0_10px_white]" transition={premiumSpring} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}