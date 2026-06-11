'use client';

import { useEffect, useRef } from 'react';

export function GlobalBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      
      // Calculate mouse position relative to the viewport
      const x = e.clientX;
      const y = e.clientY;
      
      bgRef.current.style.setProperty('--mouse-x', `${x}px`);
      bgRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={bgRef}
        className="fixed inset-0 pointer-events-none overflow-hidden bg-[#030303] z-[-1]"
      >
        {/* 1. Subtle Animated Mesh Gradient / Aurora (Optimized for GPU) */}
        <div className="absolute inset-0 opacity-30">
          <div className="global-blob global-blob-1" />
          <div className="global-blob global-blob-2" />
          <div className="global-blob global-blob-3" />
        </div>

        {/* 2. Mouse Following Spotlight */}
        <div 
          className="absolute inset-0 opacity-50 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(6, 182, 212, 0.05), transparent 50%)'
          }}
        />
        
        {/* Very lightweight CSS noise pattern (Replaces the heavy SVG) */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] mix-blend-overlay" />
      </div>

      <style>{`
        .global-blob {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(100px);
          animation: global-blob-anim 20s infinite alternate ease-in-out;
          will-change: transform;
        }

        .global-blob-1 {
          top: -10%;
          left: -10%;
          background: rgba(8, 145, 178, 0.2); /* Cyan */
        }

        .global-blob-2 {
          top: 40%;
          right: -10%;
          background: rgba(139, 92, 246, 0.15); /* Violet */
          animation-delay: -5s;
        }

        .global-blob-3 {
          bottom: -20%;
          left: 20%;
          background: rgba(59, 130, 246, 0.15); /* Blue */
          animation-delay: -10s;
        }

        @keyframes global-blob-anim {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
          33% {
            transform: translate3d(30px, -50px, 0) scale(1.1);
          }
          66% {
            transform: translate3d(-20px, 20px, 0) scale(0.9);
          }
          100% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
