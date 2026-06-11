'use client';

import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Heavy optimization
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = false;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    
    // Reverse magnet radius (decreased so it doesn't push them too far)
    const mouse = { x: -1000, y: -1000, radius: 150 };
    
    // Smooth vibrant colors (Strictly Cyan/Blue theme)
    const colors = ['#22d3ee', '#0ea5e9', '#0284c7', '#38bdf8'];

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      
      const area = width * height;
      // Increased particle density
      const particleCount = Math.min(Math.floor(area / 6000), 180); 
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Flat dark background (Extremely fast, no heavy gradients)
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, width, height);

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal drifting
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction: SMOOTH REVERSE MAGNET (Repel)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // Much softer, smaller repulsion force
          const force = Math.pow((mouse.radius - distance) / mouse.radius, 2); 
          const pushX = (dx / distance) * force * 0.8;
          const pushY = (dy / distance) * force * 0.8;
          
          p.vx += pushX;
          p.vy += pushY;
        }

        // Friction to prevent infinite acceleration, very smooth
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Enforce base speed for continuous smooth drift
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.3) {
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;
        }

        // Draw particle (Beautiful smooth dots, no webs!)
        ctx.globalAlpha = p.size / 3; // Vary opacity based on size for depth
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Intersection Observer to prevent lag when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    init();
    draw();

    // Event Listeners
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-[#030303]"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none"
      />
      {/* Soft Fade Edges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
    </div>
  );
}
