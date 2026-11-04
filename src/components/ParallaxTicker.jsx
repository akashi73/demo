import React from 'react';
import { useScrollParallax } from '../hooks/useParallax';
import { Sparkles, Sun, Heart, Flame } from 'lucide-react';

/**
 * Parallax Heritage Ticker Ribbon.
 * Moves smoothly with scroll speed, creating horizontal motion linked to vertical page scroll.
 */
export default function ParallaxTicker() {
  const scrollY = useScrollParallax();

  // Scroll-reactive horizontal offset with wrapping
  const parallaxX = (scrollY * 0.25) % 800;

  const items = [
    { icon: <Sun className="w-3.5 h-3.5 text-[#D69A19]" />, text: "21-Day Terrace Sun Curing" },
    { icon: <Sparkles className="w-3.5 h-3.5 text-[#D69A19]" />, text: "Wood-Pressed Kachi Ghani Mustard Oil" },
    { icon: <Flame className="w-3.5 h-3.5 text-[#DF905B]" />, text: "Sil-Batta Basalt Stone Pounded" },
    { icon: <Heart className="w-3.5 h-3.5 text-[#DF905B]" />, text: "1964 Badi Amma Heirloom Recipe" },
    { icon: <Sun className="w-3.5 h-3.5 text-[#D69A19]" />, text: "Glazed Ceramic Barnis Only" },
    { icon: <Sparkles className="w-3.5 h-3.5 text-[#D69A19]" />, text: "Zero Preservatives • Zero Vinegar" }
  ];

  return (
    <div className="w-full max-w-[100vw] overflow-hidden bg-[#701B25] py-3 text-[#FFF8E9] border-y border-[#D69A19]/30 relative select-none shadow-md">
      <div 
        className="flex items-center gap-8 whitespace-nowrap will-change-transform transition-transform duration-75"
        style={{ transform: `translate3d(-${parallaxX}px, 0, 0)` }}
      >
        {/* Repeat 4 times so ticker has seamless infinite length */}
        {[...Array(4)].map((_, rep) => (
          <React.Fragment key={rep}>
            {items.map((item, idx) => (
              <div 
                key={`${rep}-${idx}`} 
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-serif tracking-wide uppercase font-semibold text-[#FFF8E9]"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
                <span className="text-[#D69A19]/60 text-base">•</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
