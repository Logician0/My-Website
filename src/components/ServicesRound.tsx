"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Play, ExternalLink, X, ArrowRight } from "lucide-react";

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

/* ═══ YOUTUBE URLS ═══ */
const gridYtEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0`;
const modalYtEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`;
const ytThumb = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytThumbMax = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/* ═══ ANIMATION CONFIG ═══ */
const appleSpring: Transition = { type: "spring", bounce: 0, duration: 0.35 };

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
];

/* Desktop grid videos — UNCHANGED */
const desktopVideos: VideoProject[] = [
  { id: "v1-desk", showOn: "desktop", title: "Desert Bloom", category: "Color Grade", youtubeId: "83WR-gPqV-k", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "120%", h: "120%", customThumb: "" },
  { id: "v2-desk", showOn: "desktop", title: "Fashion Clip", category: "Reels", youtubeId: "wyz9Ok6gDyA", ratio: "9/16", gridClass: "col-span-1 row-span-1", w: "150%", h: "150%", customThumb: "" },
  { id: "v3-desk", showOn: "desktop", title: "Motion ID-009", category: "CGI", youtubeId: "KasJHz8AbnE", ratio: "9/16", gridClass: "col-span-2 row-span-2", w: "120%", h: "120%", customThumb: "" },
  { id: "v4-desk", showOn: "desktop", title: "Neon City", category: "3D Art", youtubeId: "Adiz1O8JQig", ratio: "9/16", gridClass: "col-span-2 row-span-2", w: "120%", h: "120%", customThumb: "" },
  { id: "v5-desk", showOn: "desktop", title: "Tech Short", category: "Social", youtubeId: "c0v_SUjTg7Q", ratio: "9/16", gridClass: "col-span-1 row-span-1", w: "120%", h: "120%", customThumb: "public/vertical-v5.webp" },
  { id: "v6-desk", showOn: "desktop", title: "Automotive Ad", category: "Commercial", youtubeId: "-v31vBqMixw", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "120%", h: "120%", customThumb: "" },
  { id: "v7-desk", showOn: "desktop", title: "Travel Doc", category: "YouTube", youtubeId: "lsqQnlXeZ6Q", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "212%", h: "212%", customThumb: "" },
  { id: "v8-desk", showOn: "desktop", title: "Event B-Roll", category: "Highlight", youtubeId: "0Ph6MpGKq8I", ratio: "9/16", gridClass: "col-span-1 row-span-1", w: "120%", h: "120%", customThumb: "" },
  { id: "v9-desk", showOn: "desktop", title: "Fitness Promo", category: "Ad", youtubeId: "MxKeZvMf2TM", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "120%", h: "120%", customThumb: "" },
  { id: "v10-desk", showOn: "desktop", title: "Product Tease", category: "Promo", youtubeId: "hFGV4zHmXxY", ratio: "9/16", gridClass: "col-span-1 row-span-1", w: "120%", h: "120%", customThumb: "" },
];



/* ═══ MOBILE VIDEO SWIPE DATA ═══ */
interface MobileVideoItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  ratio: Ratio;
  customThumb?: string;
}

const mobileHorizontalVideos: MobileVideoItem[] = [
  { id: "mob-h1", title: "Desert Bloom", category: "Color Grade", youtubeId: "MxKeZvMf2TM", ratio: "16/9", customThumb: "" },
  { id: "mob-h2", title: "Automotive Ad", category: "Commercial", youtubeId: "83WR-gPqV-k", ratio: "16/9", customThumb: "" },
  { id: "mob-h3", title: "Travel Doc", category: "YouTube", youtubeId: "lsqQnlXeZ6Q", ratio: "16/9", customThumb: "" },
  { id: "mob-h4", title: "Event B-Roll", category: "Highlight", youtubeId: "-v31vBqMixw", ratio: "16/9", customThumb: "" },

];

const mobileVerticalVideos: MobileVideoItem[] = [
  { id: "mob-v1", title: "Tech Short", category: "Social", youtubeId: "KasJHz8AbnE", ratio: "9/16", customThumb: "" },
  { id: "mob-v2", title: "Fashion Clip", category: "Reels", youtubeId: "0Ph6MpGKq8I", ratio: "9/16", customThumb: "" },
  { id: "mob-v3", title: "Product Tease", category: "Promo", youtubeId: "hFGV4zHmXxY", ratio: "9/16", customThumb: "" },
  { id: "mob-v4", title: "Motion ID-009", category: "CGI", youtubeId: "Adiz1O8JQig", ratio: "9/16", customThumb: "" },
  { id: "mob-v5", title: "Neon City", category: "3D Art", youtubeId: "c0v_SUjTg7Q", ratio: "9/16", customThumb: "public/vertical-v5.webp" },
];

/* ═══ WEB DATA — UNCHANGED ═══ */
const webProjects: WebProject[] = [
  { id: "w1", title: "Fintech Dashboard", tech: "Next.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w2", title: "App UI", tech: "React Native", link: "https://example.com", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w3", title: "Creative Portfolio", tech: "Framer Motion", link: "https://example.com", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1964", gridClass: "col-span-2 row-span-2" },
  { id: "w4", title: "SaaS Landing Page", tech: "Webflow", link: "https://example.com", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015", gridClass: "col-span-2 row-span-2" },
  { id: "w5", title: "Crypto Exchange", tech: "Vue.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w6", title: "Real Estate Portal", tech: "Tailwind", link: "https://example.com", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w7", title: "E-Commerce", tech: "Shopify", link: "https://example.com", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w8", title: "Healthcare App", tech: "React", link: "https://example.com", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w9", title: "Travel Blog", tech: "Gatsby", link: "https://example.com", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w10", title: "Music Player", tech: "Svelte", link: "https://example.com", image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
];

const webCenterpiece: WebProject = {
  id: "w11", title: "Award Winning Agency", tech: "Three.js", link: "https://example.com",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064", isCenterpiece: true,
};

/* ═══ MOBILE WEB SWIPE DATA ═══ */
interface MobileWebItem {
  id: string;
  title: string;
  tech: string;
  link: string;
  image: string;
}

const mobileWebItems: MobileWebItem[] = [
  { id: "mw-1", title: "Fintech Dashboard", tech: "Next.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070" },
  { id: "mw-2", title: "Crypto Exchange", tech: "Vue.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1470" },
  { id: "mw-3", title: "Real Estate Portal", tech: "Tailwind", link: "https://example.com", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070" },
  { id: "mw-4", title: "Creative Portfolio", tech: "Framer Motion", link: "https://example.com", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1964" },
  { id: "mw-5", title: "E-Commerce", tech: "Shopify", link: "https://example.com", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2070" },
];

const mobileAppItems: MobileWebItem[] = [
  { id: "ma-1", title: "Healthcare App", tech: "React Native", link: "https://example.com", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470" },
  { id: "ma-2", title: "Music Player", tech: "Swift UI", link: "https://example.com", image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1470" },
  { id: "ma-3", title: "SaaS Dashboard", tech: "Electron", link: "https://example.com", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015" },
  { id: "ma-4", title: "Travel Companion", tech: "Flutter", link: "https://example.com", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2070" },
  { id: "ma-5", title: "Fitness Tracker", tech: "Kotlin", link: "https://example.com", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470" },
];

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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${video.ratio === "9/16" ? "scale-[1.15]" : ""
            } ${hovered && iframeLoaded ? "opacity-0" : "opacity-100"}`}
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
            <div
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
            </div>
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

/* ═══ VIDEO MODAL (UNCHANGED) ═══ */
function VideoModalContent({
  video,
  onClose,
  showIframe,
}: {
  video: VideoProject;
  onClose: () => void;
  showIframe: boolean;
}) {
  const isCenterpiece = video.isCenterpiece;

  const closeBtn = (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
      animate={{ opacity: 1, scale: 1, x: "-50%" }}
      exit={{ opacity: 0, scale: 0.8, x: "-50%" }}
      transition={{ delay: 0.15, duration: 0.2 }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="absolute top-3 md:top-5 left-1/2 z-[70] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/60 hover:bg-black/90 rounded-full transition-colors border border-white/20 backdrop-blur-md"
    >
      <X size={20} className="text-white" />
    </motion.button>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer pointer-events-auto"
      />

      {isCenterpiece ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={appleSpring}
          className={`relative z-10 bg-black overflow-hidden shadow-2xl rounded-2xl md:rounded-[32px] ring-1 ring-white/10 pointer-events-auto ${video.ratio === "16/9"
            ? "aspect-video max-w-[90vw] md:max-w-[1100px]"
            : "aspect-[9/16] max-w-[75vw] md:max-w-[500px]"
            } w-full`}
        >
          {showIframe ? (
            <iframe
              src={modalYtEmbed(video.youtubeId)}
              title={video.title}
              allowFullScreen
              allow="autoplay; fullscreen"
              className="w-full h-full relative z-10 bg-black"
            />
          ) : (
            <img src={video.customThumb || ytThumb(video.youtubeId)} alt="" className="w-full h-full object-cover" />
          )}
          {closeBtn}
        </motion.div>
      ) : (
        <motion.div
          layoutId={`video-wrapper-${video.id}`}
          transition={appleSpring}
          className={`relative z-10 w-full bg-black overflow-hidden shadow-2xl rounded-2xl md:rounded-[32px] ring-1 ring-white/10 pointer-events-auto ${video.ratio === "16/9"
            ? "aspect-video max-w-[1100px]"
            : "aspect-[9/16] max-w-[75vw] md:max-w-[450px]"
            }`}
        >
          {showIframe ? (
            <iframe
              src={modalYtEmbed(video.youtubeId)}
              title={video.title}
              allowFullScreen
              allow="autoplay; fullscreen"
              className="w-full h-full relative z-10 bg-black"
            />
          ) : (
            <img src={video.customThumb || ytThumb(video.youtubeId)} alt="" className="w-full h-full object-cover" />
          )}
          {closeBtn}
        </motion.div>
      )}
    </>
  );
}

/* ═══ MAIN LAYOUT ═══ */
export function ServicesRound() {
  const [activeTab, setActiveTab] = useState<"video" | "web">("video");
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [showIframe, setShowIframe] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePopState = () => {
      if (activeVideo) closeVideo();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeVideo]);

  const openVideo = useCallback((v: VideoProject) => {
    setActiveVideo(v);
    window.history.pushState({ isModalOpen: true }, "");
    setTimeout(() => setShowIframe(true), 400);
  }, []);

  const closeVideo = useCallback(() => {
    setShowIframe(false);
    setTimeout(() => {
      setActiveVideo(null);
      if (window.history.state?.isModalOpen) window.history.back();
    }, 10);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full py-8 md:py-12 bg-[#050505] overflow-hidden font-sans"
    >
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
        <div className="relative w-full max-w-6xl mx-auto min-h-[300px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* ─── VIDEO TAB ─── */}
            {activeTab === "video" && (
              <motion.div
                key="video-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-full"
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
                className="relative w-full"
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
          <a
            href={activeTab === "video" ? "/services/video-editing" : "/services/web-dev"}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/15 text-white text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/40 shadow-2xl"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10">View Full Library</span>
            <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 md:w-4 md:h-4" />
          </a>
        </motion.div>
      </div>

      {/* ═══ VIDEO MODAL — UNCHANGED ═══ */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none ${!activeVideo.isCenterpiece ? "p-4 md:p-8" : ""
              }`}
          >
            <VideoModalContent video={activeVideo} onClose={closeVideo} showIframe={showIframe} />
          </motion.div>
        )}
      </AnimatePresence>

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