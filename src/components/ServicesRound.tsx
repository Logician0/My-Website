"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, X, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { PremiumBackground } from '@/components/PremiumBackground';

/* ═══ TYPES ═══ */
type Ratio = "16/9" | "9/16";

interface VideoProject {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  ratio: Ratio;
  gridClass?: string;
  isCenterpiece?: boolean;
  w?: string;
  h?: string;
  showOn?: "desktop" | "mobile" | "all";
  customThumb?: string;
}

interface WebProject {
  id: string;
  title: string;
  tech: string;
  link: string;
  image: string;
  gridClass?: string;
  isCenterpiece?: boolean;
}

interface MobileVideoItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  ratio: Ratio;
  customThumb?: string;
}

interface MobileWebItem {
  id: string;
  title: string;
  tech: string;
  link: string;
  image: string;
}

/* ═══ YOUTUBE URLS ═══ */
const gridYtEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`;
const modalYtEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`;
const ytThumbMax = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/* ═══ LIGHTWEIGHT BACKGROUNDS ═══ */
// Removed heavy SVG turbulence and particle animations that cause scroll lag


/* ═══ DATA ═══ */
const trustedClients = [
  { name: "Dr Aditi Govitrikar", followers: "1.4M", image: "/images/aditi.webp" },
  { name: "Waryam Singh", followers: "53K", image: "/images/waryam_singh.webp" },
  { name: "MyPlixLife", followers: "1.5M", image: "/images/plix.webp" },
  { name: "Sahil Gambhir", followers: "5.9M", image: "/images/sahil_gambhir.webp" },
  { name: "LightLife by Dr Morepen", followers: "38.5K", image: "/images/lightlife.webp" },
  { name: "Ghar Soaps", followers: "1.8M", image: "/images/ghar_soaps.webp" },
  { name: "Jr.Hardik Pandya", followers: "971K", image: "/images/jr_hardik.webp" },
  { name: "Tiya Gambhir", followers: "315k", image: "/images/tiya_gambhir.webp" },
  { name: "The Real Estate Lawyer", followers: "94k", image: "/images/relawyer.jpg" },
  { name: "Palak Bharti", followers: "165k", image: "/images/palak_bharti.jpg" },
  { name: "Pete Z", followers: "296k", image: "/images/pete_z.jpg" },
  { name: "Sharda University", followers: "80K", image: "/images/sharda.png" },
  { name: "Anuska Ghosh", followers: "1.3M", image: "/images/anuska.jpeg" },
];

import portfolioData from "@/data/portfolio.json";

/* Desktop grid videos */
const desktopVideos: VideoProject[] = portfolioData.servicesRound.desktopVideos as VideoProject[];

/* ═══ MOBILE VIDEO SWIPE DATA ═══ */
const mobileHorizontalVideos: MobileVideoItem[] = portfolioData.servicesRound.mobileHorizontalVideos as MobileVideoItem[];
const mobileVerticalVideos: MobileVideoItem[] = portfolioData.servicesRound.mobileVerticalVideos as MobileVideoItem[];

/* ═══ WEB DATA ═══ */
const webProjects: WebProject[] = portfolioData.servicesRound.webProjects as WebProject[];
const webCenterpiece: WebProject = portfolioData.servicesRound.webCenterpiece as WebProject;

/* ═══ MOBILE WEB SWIPE DATA ═══ */
const mobileWebItems: MobileWebItem[] = portfolioData.servicesRound.mobileWebItems;
const mobileAppItems: MobileWebItem[] = portfolioData.servicesRound.mobileAppItems;

/* ═══ DESKTOP VIDEO CARD — hover to play (UNCHANGED) ═══ */
function DesktopVideoCard({
  video,
  idx,
  onPlay,
}: {
  video: VideoProject;
  idx: number;
  onPlay: (v: VideoProject) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className={video.gridClass}>
      <motion.div
        layoutId={`video-wrapper-${video.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.03 }}
        onClick={() => onPlay(video)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full h-full group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-lg transform-gpu transition-all duration-300 hover:border-white/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <img
          src={video.customThumb || ytThumbMax(video.youtubeId)}
          alt={video.title}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500 ${video.ratio === "9/16" ? "scale-[1.15]" : ""
            } ${hovered && iframeLoaded ? "opacity-0" : "opacity-100"}`}
          style={{
            width: video.w || "100%",
            height: video.h || "100%",
          }}
          loading="lazy"
        />

        {hovered && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}>
            <iframe
              src={gridYtEmbed(video.youtubeId)}
              onLoad={() => setIframeLoaded(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: video.w || "150%",
                height: video.h || "150%",
                border: "none",
              }}
              allow="autoplay; muted; playsinline"
              title={video.title}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}



/* ═══ MOBILE VIDEO SWIPE ROW — CSS Scroll-Snap ═══ */
function MobileVideoSwipeRow({
  videos,
  label,
  cardWidth,
  aspectClass,
  onPlay,
}: {
  videos: MobileVideoItem[];
  label: string;
  cardWidth: string;
  aspectClass: string;
  onPlay: (v: VideoProject) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (!firstChild) return;
    const cardW = firstChild.offsetWidth;
    const gap = 12;
    const idx = Math.round(el.scrollLeft / (cardW + gap));
    setActiveIdx(Math.min(Math.max(idx, 0), videos.length - 1));
  }, [videos.length]);

  return (
    <div className="mb-5">
      <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 px-1">
        {label}
      </p>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto no-scrollbar px-1"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0"
            style={{ width: cardWidth, scrollSnapAlign: "start" }}
            onClick={() => onPlay({ ...video, gridClass: "", showOn: "mobile" })}
          >
            <motion.div
              layoutId={`video-wrapper-${video.id}`}
              className={`relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/[0.06] cursor-pointer active:scale-[0.97] transition-transform duration-200 ${aspectClass}`}
            >
              <img
                src={video.customThumb || ytThumbMax(video.youtubeId)}
                alt={video.title}
                className={`absolute inset-0 w-full h-full object-cover ${video.ratio === "9/16" ? "scale-[1.15]" : ""
                  }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <p className="text-cyan-400 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                  {video.category}
                </p>
                <h3 className="text-white text-[11px] font-bold leading-tight line-clamp-1">
                  {video.title}
                </h3>
              </div>
              <div className="absolute top-2 right-2 z-10">
                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {videos.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-white/80 w-4" : "bg-white/20 w-1.5"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══ MOBILE WEB SWIPE ROW ═══ */
function MobileWebSwipeRow({
  items,
  label,
}: {
  items: MobileWebItem[];
  label: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (!firstChild) return;
    const cardW = firstChild.offsetWidth;
    const gap = 12;
    const idx = Math.round(el.scrollLeft / (cardW + gap));
    setActiveIdx(Math.min(Math.max(idx, 0), items.length - 1));
  }, [items.length]);

  return (
    <div className="mb-5">
      <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 px-1">
        {label}
      </p>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto no-scrollbar px-1"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {items.map((web) => (
          <a
            key={web.id}
            href={web.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 block"
            style={{ width: "82vw", scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/[0.06] aspect-video active:scale-[0.97] transition-transform duration-200">
              <img
                src={web.image}
                alt={web.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <p className="text-white/50 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                  {web.tech}
                </p>
                <h3 className="text-white text-[11px] font-bold leading-tight line-clamp-1">
                  {web.title}
                </h3>
              </div>
              <div className="absolute top-2 right-2 z-10">
                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-white/80 w-4" : "bg-white/20 w-1.5"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══ VIDEO MODAL (REMOVED) ═══ */

/* ═══ MAIN LAYOUT ═══ */
export function ServicesRound() {
  const [activeTab, setActiveTab] = useState<"video" | "web">("video");
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridRef.current.style.setProperty("--mouse-x", `${x}px`);
    gridRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (activeVideo) closeVideo();
    };
    window.addEventListener("popstate", handlePopState);
    
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "unset";
    };
  }, [activeVideo]);

  const openVideo = useCallback((v: VideoProject) => {
    setActiveVideo(v);
    window.history.pushState({ isModalOpen: true }, "");
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    if (window.history.state?.isModalOpen) window.history.back();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full py-8 md:py-12 overflow-hidden font-sans"
    >
      <PremiumBackground />
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 text-center"
        >
          Worked With...
        </motion.h3>

        {/* Marquee — reduced from 4× to 3× duplication */}
        <div className="w-full max-w-7xl overflow-hidden mb-12 md:mb-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max marquee gap-4 md:gap-6">
            {[...trustedClients, ...trustedClients, ...trustedClients].map((client, idx) => (
              <div key={idx} className="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.04] rounded-full pr-5 pl-2 py-2 shadow-sm hover:bg-white/[0.06] transition-colors duration-300">
                <img src={client.image} alt={client.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-white/[0.1]" />
                <div className="flex flex-col">
                  <span className="text-white text-[10px] md:text-xs font-bold leading-tight">{client.name}</span>
                  <span className="text-white/40 text-[9px] md:text-[10px] font-medium leading-tight">{client.followers} followers</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Title + Tabs — UNCHANGED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-xl mb-6">
            Some{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Works</span>
          </h2>

          <div className="relative flex items-center p-1 md:p-1.5 mx-auto bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-full w-max shadow-2xl">
            <motion.div
              className="absolute top-1 md:top-1.5 bottom-1 md:bottom-1.5 rounded-full bg-gradient-to-r from-white/10 to-white/[0.06] border border-white/15"
              animate={{ left: activeTab === "video" ? "4px" : "50%", width: "calc(50% - 4px)" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab("video")}
              className={`relative z-10 px-5 md:px-8 py-2 md:py-2.5 text-[11px] md:text-sm font-bold uppercase transition-all duration-300 rounded-full ${activeTab === "video" ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
            >
              <span className="flex items-center gap-1.5">
                <Play size={12} className="md:w-[14px] md:h-[14px]" fill="currentColor" />
                Videos
              </span>
            </button>
            <button
              onClick={() => setActiveTab("web")}
              className={`relative z-10 px-5 md:px-8 py-2 md:py-2.5 text-[11px] md:text-sm font-bold uppercase transition-all duration-300 rounded-full ${activeTab === "web" ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
            >
              <span className="flex items-center gap-1.5">
                <ExternalLink size={12} className="md:w-[14px] md:h-[14px]" />
                Websites
              </span>
            </button>
          </div>
        </motion.div>

        {/* ═══ PORTFOLIO GRID ═══ */}
        <div 
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="relative w-full max-w-6xl mx-auto min-h-[300px] md:min-h-[500px] group"
        >
          {/* ZERO-LAG TEXTURE & HOVER EFFECTS BEHIND CARDS */}
          {/* 1. Static CSS Dot Grid Texture (Extremely Fast) */}
          <div className="absolute -inset-10 z-0 opacity-20 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
          
          {/* 2. Dynamic Spotlight Glow (Hardware Accelerated, tracks mouse via CSS vars) */}
          <div 
            className="hidden md:block absolute -inset-20 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform-gpu"
            style={{
              background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)',
              willChange: 'transform, opacity'
            }}
          />

          <AnimatePresence mode="wait">
            {/* ─── VIDEO TAB ─── */}
            {activeTab === "video" && (
              <motion.div
                key="video-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-full z-10"
              >
                {/* ═══ DESKTOP GRID — UNCHANGED ═══ */}
                <div className="hidden md:grid grid-cols-8 grid-flow-row-dense gap-4 auto-rows-[200px]">
                  {desktopVideos.map((video, idx) => (
                    <DesktopVideoCard key={video.id} video={video} idx={idx} onPlay={openVideo} />
                  ))}
                </div>


                {/* ═══ MOBILE — Swipe Carousels ═══ */}
                <div className="md:hidden flex flex-col gap-1">
                  <MobileVideoSwipeRow
                    videos={mobileHorizontalVideos}
                    label="Cinematic Edits"
                    cardWidth="82vw"
                    aspectClass="aspect-video"
                    onPlay={openVideo}
                  />
                  <MobileVideoSwipeRow
                    videos={mobileVerticalVideos}
                    label="Reels & Shorts"
                    cardWidth="38vw"
                    aspectClass="aspect-[9/16]"
                    onPlay={openVideo}
                  />
                </div>
              </motion.div>
            )}

            {/* ─── WEB TAB ─── */}
            {activeTab === "web" && (
              <motion.div
                key="web-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-full z-10"
              >
                {/* ═══ DESKTOP WEB GRID — UNCHANGED ═══ */}
                <div className="hidden md:grid grid-cols-8 grid-flow-row-dense gap-4 auto-rows-[200px]">
                  {webProjects.map((web, idx) => (
                    <a
                      key={web.id}
                      href={web.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block focus:outline-none ${web.gridClass}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="relative w-full h-full group overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-lg transform-gpu transition-all duration-500 hover:border-white/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                      >
                        <img
                          src={web.image}
                          alt={web.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-xs font-bold border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-500 mb-3 shadow-2xl">
                            Visit Site <ExternalLink size={16} />
                          </div>
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-4">
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">{web.tech}</p>
                            <h3 className="text-white text-sm font-bold leading-tight line-clamp-1">{web.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  ))}
                </div>

                {/* Desktop web centerpiece — UNCHANGED */}
                <div className="hidden md:block">
                  <a href={webCenterpiece.link} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%", rotate: 45 }}
                      animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%", rotate: 45 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                      className="absolute top-1/2 left-1/2 w-[320px] h-[320px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border-[6px] border-[#05070A] z-20 group cursor-pointer transform-gpu bg-zinc-900"
                    >
                      <img
                        src={webCenterpiece.image}
                        alt="Centerpiece"
                        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-45 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="-rotate-45 flex flex-col items-center">
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-xs font-bold border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-500 mb-3 shadow-2xl">
                            Hero Project <ExternalLink size={16} />
                          </div>
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-4">
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">{webCenterpiece.tech}</p>
                            <h3 className="text-white text-sm font-bold leading-tight line-clamp-1">{webCenterpiece.title}</h3>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </a>
                </div>

                {/* ═══ MOBILE WEB — Swipe Carousels ═══ */}
                <div className="md:hidden flex flex-col gap-1">
                  <MobileWebSwipeRow
                    items={mobileWebItems}
                    label="Web Projects"
                  />
                  <MobileWebSwipeRow
                    items={mobileAppItems}
                    label="Apps & Software"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA — UNCHANGED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 md:mt-24"
        >
          <Link
            to={activeTab === "video" ? "/services/video-editing" : "/services/web-dev"}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/15 text-white text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/40 shadow-2xl"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10">View Full Library</span>
            <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 md:w-4 md:h-4" />
          </Link>
        </motion.div>
      </div>

      {/* ═══ VIDEO MODAL ═══ */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {activeVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#050505]/95 z-[9999] flex items-center justify-center p-4"
              onClick={closeVideo}
            >
              <motion.div 
                layoutId={`video-wrapper-${activeVideo.id}`}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                className={`relative w-full ${
                  activeVideo.ratio === "16/9" ? "max-w-4xl aspect-video" : "max-w-[85vw] sm:max-w-sm aspect-[9/16]"
                } bg-zinc-900 rounded-2xl overflow-hidden border border-white/10`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Perfect Crossfade: Keep the exact same thumbnail during the flight animation */}
                <img
                  src={activeVideo.customThumb || ytThumbMax(activeVideo.youtubeId)}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <button
                  onClick={closeVideo}
                  className="absolute z-50 top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Render iframe immediately so browser doesn't block autoplay on a hidden element */}
                <div className="absolute inset-0 w-full h-full bg-black/0">
                  <iframe
                    src={modalYtEmbed(activeVideo.youtubeId)}
                    className="w-full h-full border-none"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee {
          animation: marquee 20s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}