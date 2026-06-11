export function SciFiDivider() {
  return (
    <div className="relative w-full h-24 overflow-hidden z-20 pointer-events-none -my-12">
      
      {/* Wave 1 - Deep Blue/Cyan Fill with Heavy Glow */}
      <svg
        className="absolute bottom-0 w-[200%] h-[70px] animate-wave-slow opacity-70"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(0 -8px 25px rgba(8, 145, 178, 0.6))' }}
      >
        <path
          d="M0,60 C300,120 400,0 600,60 C800,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill="rgba(8, 145, 178, 0.7)"
        />
        <path
          d="M0,60 C300,120 400,0 600,60 C800,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill="rgba(8, 145, 178, 0.7)"
          transform="translate(1200, 0)"
        />
      </svg>

      {/* Wave 2 - Bright Cyan Fill with Heavy Glow */}
      <svg
        className="absolute bottom-0 w-[200%] h-[50px] animate-wave-fast opacity-90"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(0 -4px 15px rgba(6, 182, 212, 0.8))' }}
      >
        <path
          d="M0,80 C300,10 400,120 600,80 C800,10 900,120 1200,80 L1200,120 L0,120 Z"
          fill="rgba(6, 182, 212, 0.8)"
        />
        <path
          d="M0,80 C300,10 400,120 600,80 C800,10 900,120 1200,80 L1200,120 L0,120 Z"
          fill="rgba(6, 182, 212, 0.8)"
          transform="translate(1200, 0)"
        />
      </svg>

      {/* Wave 3 - Solid Black Core to merge seamlessly into the next section */}
      <svg
        className="absolute bottom-0 w-[200%] h-[40px] animate-wave-core"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C300,40 400,120 600,90 C800,40 900,120 1200,90 L1200,120 L0,120 Z"
          fill="#000000"
        />
        <path
          d="M0,90 C300,40 400,120 600,90 C800,40 900,120 1200,90 L1200,120 L0,120 Z"
          fill="#000000"
          transform="translate(1200, 0)"
        />
      </svg>

      <style>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave-slow {
          animation: wave 18s linear infinite;
        }
        .animate-wave-fast {
          animation: wave 12s linear infinite;
        }
        .animate-wave-core {
          animation: wave 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
