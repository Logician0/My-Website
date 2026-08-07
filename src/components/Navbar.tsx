"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Home, Briefcase, Activity, User, MessageSquare, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";

const navItems = [
  { label: "Home", href: "#home", id: "home", icon: Home },
  { label: "Portfolio", href: "#portfolio", id: "portfolio", icon: Briefcase },
  { label: "Process", href: "#process", id: "process", icon: Activity },
  { label: "About", href: "#about", id: "about", icon: User },
  { label: "Testimonials", href: "#testimonials", id: "testimonials", icon: MessageSquare },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("#home");

  // Visibility States
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isClickScrolling = useRef(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Refs for Continuous Pill Tracking
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const desktopPillRef = useRef<HTMLDivElement>(null);
  const mobilePillRef = useRef<HTMLDivElement>(null);

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

  // 2. ISOLATED VISIBILITY LOGIC
  useEffect(() => {
    const handleVisibilityScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsNavVisible(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      
      const shouldAutoHide = isServicePage || window.scrollY > 50;
      if (shouldAutoHide) {
        scrollTimer.current = setTimeout(() => {
          setIsNavVisible(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleVisibilityScroll, { passive: true });
    handleVisibilityScroll();

    return () => {
      window.removeEventListener("scroll", handleVisibilityScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [isServicePage]);

  // 3. CONTINUOUS SCROLL TRACKING (Lag-Free Native DOM Updates)
  useEffect(() => {
    let ticking = false;
    let desktopButtons: HTMLButtonElement[] = [];
    let mobileButtons: HTMLButtonElement[] = [];

    const handleScrollTracking = () => {
      if (isServicePage || isClickScrolling.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          const desktopNavItems = navItems;
          const mobileNavItems = navItems.filter(item => item.id !== 'testimonials');

          const calculateTracking = (items: typeof navItems) => {
            let currentIndex = 0;
            let progress = 0;
            let activeSectionId = items[0].id;

            for (let i = 0; i < items.length; i++) {
              const sectionId = items[i].id;
              const nextSectionId = i < items.length - 1 ? items[i + 1].id : null;
              
              const el = document.getElementById(sectionId);
              const nextEl = nextSectionId ? document.getElementById(nextSectionId) : null;
              
              if (el) {
                if (i > 0 && el.offsetTop < 100) continue;

                const top = i === 0 ? 0 : el.offsetTop - 300;
                const bottom = nextEl ? nextEl.offsetTop - 300 : document.body.scrollHeight;
                
                if (currentScrollY >= top && currentScrollY < bottom) {
                  currentIndex = i;
                  progress = Math.max(0, Math.min(1, (currentScrollY - top) / (bottom - top)));
                  activeSectionId = progress < 0.5 ? sectionId : (nextSectionId || sectionId);
                  break;
                }
              }
            }
            return { currentIndex, progress, activeSectionId };
          };

          const desktopTracking = calculateTracking(desktopNavItems);
          const mobileTracking = calculateTracking(mobileNavItems);

          // Set active text color via React State using Desktop as the source of truth
          const currentHref = "#" + desktopTracking.activeSectionId;
          if (activeItem !== currentHref) {
            setActiveItem(currentHref);
          }

          // Cache DOM queries for buttons
          if (desktopButtons.length === 0 && desktopNavRef.current) {
            desktopButtons = Array.from(desktopNavRef.current.querySelectorAll('button'));
          }
          if (mobileButtons.length === 0 && mobileNavRef.current) {
            mobileButtons = Array.from(mobileNavRef.current.querySelectorAll('button'));
          }

          // Update Pill Position Natively (60FPS)
          const updatePill = (
            pillRef: React.RefObject<HTMLDivElement | null>, 
            buttons: HTMLButtonElement[],
            tracking: { currentIndex: number, progress: number }
          ) => {
            if (!pillRef.current || buttons.length === 0) return;

            const currentBtn = buttons[tracking.currentIndex];
            const nextBtn = buttons[Math.min(tracking.currentIndex + 1, buttons.length - 1)];

            if (currentBtn && nextBtn) {
              const easeOut = 1 - Math.pow(1 - tracking.progress, 3);
              const easeIn = Math.pow(tracking.progress, 3);

              const startLeft = currentBtn.offsetLeft;
              const startRight = currentBtn.offsetLeft + currentBtn.offsetWidth;
              
              const endLeft = nextBtn.offsetLeft;
              const endRight = nextBtn.offsetLeft + nextBtn.offsetWidth;

              const currentLeft = startLeft + easeIn * (endLeft - startLeft);
              const currentRight = startRight + easeOut * (endRight - startRight);

              const left = currentLeft;
              const width = currentRight - currentLeft;
              const height = currentBtn.offsetHeight;
              const top = currentBtn.offsetTop;

              pillRef.current.style.transform = `translate(${left}px, ${top}px)`;
              pillRef.current.style.width = `${width}px`;
              pillRef.current.style.height = `${height}px`;
            }
          };

          updatePill(desktopPillRef, desktopButtons, desktopTracking);
          updatePill(mobilePillRef, mobileButtons, mobileTracking);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollTracking, { passive: true });
    
    // Attempt tracking multiple times as layout paints
    handleScrollTracking(); 
    setTimeout(handleScrollTracking, 100);
    setTimeout(handleScrollTracking, 500);
    
    return () => window.removeEventListener("scroll", handleScrollTracking);
  }, [activeItem, isServicePage]);

  // Initial pill positioning on mount/resize
  useEffect(() => {
    const handleResize = () => window.dispatchEvent(new Event('scroll'));
    window.addEventListener("resize", handleResize);
    setTimeout(handleResize, 100); // Trigger after layout computation
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setActiveItem(href);

    setIsNavVisible(true);
    isClickScrolling.current = true;

    // Force pill to target immediately
    const index = navItems.findIndex(i => i.href === href);
    const forcePill = (navRef: React.RefObject<HTMLDivElement | null>, pillRef: React.RefObject<HTMLDivElement | null>) => {
      if (navRef.current && pillRef.current) {
        const btn = navRef.current.querySelectorAll('button')[index];
        if (btn) {
          pillRef.current.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          pillRef.current.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop}px)`;
          pillRef.current.style.width = `${btn.offsetWidth}px`;
          pillRef.current.style.height = `${btn.offsetHeight}px`;
          setTimeout(() => {
            if (pillRef.current) pillRef.current.style.transition = 'none';
          }, 600);
        }
      }
    };
    forcePill(desktopNavRef, desktopPillRef);
    forcePill(mobileNavRef, mobilePillRef);

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
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        setIsNavVisible(true);
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setIsNavVisible(false), 2000);
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out pointer-events-none",
        isScrolled || isServicePage
          ? "py-3 sm:py-4"
          : "py-4 sm:py-6",
        isNavVisible || (!isScrolled && !isServicePage) || isHovered
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-32"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">

        {/* --- LEFT: TEXT LOGO --- */}
        <Link to="/" className={cn(
          "hidden sm:flex items-center group z-50 transition-opacity duration-300 pointer-events-auto",
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        )} onClick={() => {
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

        {/* --- CENTER: APPLE GLASS SHORTCUT PILL (DESKTOP) --- */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <div ref={desktopNavRef} className="relative flex items-center gap-1 px-1.5 py-1.5 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] saturate-150">
            {/* CONTINUOUS HIGHLIGHT PILL */}
            <div
              ref={desktopPillRef}
              className="absolute top-0 left-0 bg-white/10 border border-white/20 rounded-full shadow-lg pointer-events-none will-change-[transform,width] z-0"
            />
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              const Icon = item.icon;
              return (
                <button
                  key={`desktop-${item.label}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-colors duration-300 z-10",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  <span className="relative flex flex-col items-center justify-center gap-1">
                    <Icon size={18} strokeWidth={2} />
                    <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- CENTER: APPLE GLASS SHORTCUT PILL (MOBILE) --- */}
        <div className="flex md:hidden absolute left-1/2 -translate-x-1/2 top-0 z-50 w-[96vw] sm:w-[85vw] pointer-events-auto">
          <div ref={mobileNavRef} className="relative flex items-center justify-between w-full px-1 py-1 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_0_rgba(0,0,0,0.4)] saturate-150">
            {/* CONTINUOUS HIGHLIGHT PILL */}
            <div
              ref={mobilePillRef}
              className="absolute top-0 left-0 bg-white/10 border border-white/20 rounded-full shadow-lg pointer-events-none will-change-[transform,width] z-0"
            />
            {navItems.filter(item => item.id !== 'testimonials').map((item) => {
              const isActive = activeItem === item.href;
              const Icon = item.icon;
              return (
                <button
                  key={`mobile-${item.label}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative flex flex-col items-center justify-center px-1.5 sm:px-2 py-1 rounded-full transition-colors duration-300 z-10 flex-1",
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  <span className="relative flex flex-col items-center justify-center gap-[1px]">
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
          className={cn(
            "hidden md:flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-zinc-300 transition-all duration-300 group cursor-pointer z-50 ml-auto pointer-events-auto",
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          Start Project
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>

      </nav>
    </header>
  );
}