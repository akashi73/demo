import React from 'react';
import { useScrollParallax } from '../hooks/useParallax';

/**
 * Ambient Parallax Floating Spices Layer.
 * Renders artisanal Indian spice emblems (Star Anise, Red Chili, Mustard Seeds, Sun Rays, Barni)
 * that drift smoothly at varying parallax depths as the user scrolls.
 */
export default function ParallaxFloatingSpices() {
  const scrollY = useScrollParallax();

  // Different layer speeds for natural 3D depth
  const speedSlow = scrollY * 0.06;
  const speedMedium = scrollY * 0.14;
  const speedFast = scrollY * 0.22;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Golden Star Anise (Chakra Phool) - Top Right Slow Drift */}
      <div 
        className="absolute top-16 right-[6%] text-[#D69A19]/25 transition-transform duration-75 will-change-transform"
        style={{ transform: `translate3d(0, ${speedSlow}px, 0) rotate(${scrollY * 0.05}deg)` }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 4.2 4.5-.8-1.5 4.3 4.2 1.8-3.4 3 2.1 4.1-4.4-1.3-1.8 4.2-1.8-4.2-4.4 1.3 2.1-4.1-3.4-3 4.2-1.8-1.5-4.3 4.5.8L12 2z"/>
        </svg>
      </div>

      {/* 2. Banarasi Whole Red Chili Silhouette - Mid Left Fast Drift */}
      <div 
        className="absolute top-44 left-[4%] text-[#701B25]/20 transition-transform duration-75 will-change-transform hidden sm:block"
        style={{ transform: `translate3d(0, ${-speedMedium}px, 0) rotate(${-15 + scrollY * 0.04}deg)` }}
      >
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c0 3-2 5-2 8a6 6 0 0 0 12 0c0-3-2-5-2-8" />
          <path d="M10 2c-1.5 3-4 5-4 9a8 8 0 0 0 16 0c0-4-2.5-6-4-9" />
          <path d="M12 2v-1" />
        </svg>
      </div>

      {/* 3. Golden Sunbeam Dhoop Stamp - Center Right */}
      <div 
        className="absolute top-[380px] right-[12%] text-[#DF905B]/25 transition-transform duration-75 will-change-transform"
        style={{ transform: `translate3d(0, ${speedFast}px, 0) scale(${1 + Math.sin(scrollY * 0.005) * 0.08})` }}
      >
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </div>

      {/* 4. Golden Mustard Seeds (Rai) Cluster - Bottom Left */}
      <div 
        className="absolute top-[520px] left-[8%] flex gap-2 transition-transform duration-75 will-change-transform"
        style={{ transform: `translate3d(0, ${-speedSlow}px, 0)` }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#D69A19]/35 shadow-sm inline-block" />
        <span className="w-2 h-2 rounded-full bg-[#DF905B]/40 shadow-sm inline-block mt-2" />
        <span className="w-3 h-3 rounded-full bg-[#285331]/30 shadow-sm inline-block -ml-1" />
      </div>

      {/* 5. Glazed Ceramic Barni Pot Outline - Lower Right */}
      <div 
        className="absolute top-[680px] right-[4%] text-[#4C7897]/25 transition-transform duration-75 will-change-transform hidden md:block"
        style={{ transform: `translate3d(0, ${-speedMedium}px, 0) rotate(8deg)` }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M8 3h8v2H8zM6 5h12v3H6zM5 8c0 5 1.5 12 7 12s7-7 7-12H5z" />
          <path d="M5 12h14" strokeDasharray="2 2" />
        </svg>
      </div>
    </div>
  );
}
