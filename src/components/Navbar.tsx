"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Briefcase, Activity, User, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Portfolio", href: "#portfolio", icon: Briefcase },
  { label: "Process", href: "#process", icon: Activity },
  { label: "About", href: "#about", icon: User },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("#home"); 
  
  // Visibility States
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const isClickScrolling = useRef(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isServicePage = location.pathname !== "/";

  const scrollToSection = (selector: string) => {
    if (selector === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(selector);
    if (element) {
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // 1. Initial Load & Route Changes
  useEffect(() => {
    if (location.hash) {
      setActiveItem(location.hash);
      const timer = setTimeout(() => {
        scrollToSection(location.hash);
      }, 100);
      return () => clearTimeout(timer);
    } else if (location.pathname === "/") {
      setActiveItem("#home");
    }
  }, [location.hash, location.pathname]);

  // 2. ISOLATED VISIBILITY LOGIC: Only handles background styling on scroll
  useEffect(() => {
    const handleVisibilityScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Removed auto-hide logic, navbar is always visible now
    };

    window.addEventListener("scroll", handleVisibilityScroll, { passive: true });
    handleVisibilityScroll(); // Trigger once on mount
    
    return () => {
      window.removeEventListener("scroll", handleVisibilityScroll);
    };
  }, []);

  // 3. ISOLATED ACTIVE SECTION LOGIC: Only handles highlighting the correct button
  useEffect(() => {
    const handleSectionTracking = () => {
      if (isServicePage || isClickScrolling.current) return;

      const currentScrollY = window.scrollY;
      let currentSection = "#home";
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections) {
        if (section === "home") continue; 
        
        const el = document.getElementById(section);
        if (el && currentScrollY >= (el.offsetTop - 300)) {
          currentSection = "#" + section;
        }
      }
      
      if (currentSection !== activeItem) {
        setActiveItem(currentSection);
      }
    };

    window.addEventListener("scroll", handleSectionTracking, { passive: true });
    return () => window.removeEventListener("scroll", handleSectionTracking);
  }, [activeItem, isServicePage]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setActiveItem(href);
    
    // Keep visible while programmatic scrolling happens
    setIsNavVisible(true);
    isClickScrolling.current = true;

    if (isServicePage) {
      navigate("/" + href);
      return;
    }

    if (href.startsWith("#")) {
      if (href === "#home") {
        window.history.pushState(null, "", "/");
      } else {
        window.history.pushState(null, "", href);
      }
      
      scrollToSection(href);
      
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  };

  return (
    <motion.header
      // Keep visible if mouse is over it (Desktop)
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Bring back instantly if the user taps the top of the screen (Mobile)
      onTouchStart={() => {
        setIsNavVisible(true);
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setIsNavVisible(false), 2000); // Gives 2s to click
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled || isServicePage
          ? "bg-gradient-to-b from-black/80 to-transparent py-3 sm:py-4 border-none"
          : "bg-transparent py-4 sm:py-6",
        // Navbar is always visible now
        "opacity-100 translate-y-0"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
        
        {/* --- LEFT: TEXT LOGO (HIDDEN ON MOBILE) --- */}
        <Link to="/" className="hidden sm:flex items-center group z-50" onClick={() => {
          if (!isServicePage) {
            setActiveItem("#home");
            isClickScrolling.current = true;
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => { isClickScrolling.current = false; }, 1000);
          }
        }}>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            Logician Creatives
          </span>
        </Link>

        {/* --- CENTER: APPLE GLASS SHORTCUT PILL (DESKTOP - ICONS + TEXT) --- */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] saturate-150">
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              const Icon = item.icon;
              return (
                <button
                  key={`desktop-${item.label}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-colors duration-300",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPillDesktop"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-lg backdrop-blur-md pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex flex-col items-center justify-center gap-1">
                    <Icon size={18} strokeWidth={2} />
                    <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- CENTER: APPLE GLASS SHORTCUT PILL (MOBILE - ICONS + TEXT) --- */}
        <div className="flex md:hidden absolute left-1/2 -translate-x-1/2 top-0 z-50 w-[96vw] sm:w-[85vw]">
          <div className="flex items-center justify-between w-full px-1 py-1 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_0_rgba(0,0,0,0.4)] saturate-150">
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              const Icon = item.icon;
              return (
                <button
                  key={`mobile-${item.label}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative flex flex-1 flex-col items-center justify-center py-1 rounded-full transition-colors duration-300",
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPillMobile"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-lg backdrop-blur-md pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex flex-col items-center justify-center gap-[1px]">
                    <Icon size={14} strokeWidth={2.5} />
                    <span className="text-[8px] font-medium tracking-wide">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- RIGHT: START PROJECT BUTTON (DESKTOP) --- */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden md:flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-zinc-300 transition-colors group cursor-pointer z-50 ml-auto"
        >
          Start Project
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>

      </nav>
    </motion.header>
  );
}