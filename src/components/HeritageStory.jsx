import React, { useRef } from 'react';
import { 
  Sun, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Heart, 
  Clock, 
  MapPin, 
  BookOpen
} from 'lucide-react';
import { useElementParallax, useScrollParallax } from '../hooks/useParallax';

export default function HeritageStory() {
  const windowRef = useRef(null);
  const parallaxOffset = useElementParallax(windowRef, -0.2);
  const scrollY = useScrollParallax();

  return (
    <section id="heritage-story" className="py-20 bg-[#FBF7EF] border-b border-[#E9DCC7] relative overflow-hidden w-full max-w-[100vw]">
      
      {/* Ambient Parallax Radial Warmth in Section Background */}
      <div 
        className="absolute top-1/4 -right-28 w-96 h-96 rounded-full bg-[#D69A19]/15 blur-3xl pointer-events-none will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
      />
      <div 
        className="absolute bottom-10 -left-28 w-96 h-96 rounded-full bg-[#701B25]/10 blur-3xl pointer-events-none will-change-transform"
        style={{ transform: `translate3d(0, ${-scrollY * 0.06}px, 0)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-w-0">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F7F1DF] text-[#701B25] text-xs font-bold uppercase tracking-wider border border-[#E9DCC7]">
            <BookOpen className="w-3.5 h-3.5 text-[#D69A19]" />
            The 1964 Heirloom Chronicle
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#701B25] tracking-tight">
            "Dhoop, Dhaga, aur Dulaar"
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#DF905B] italic">
            Sun-cured in clay barnis, pounded on stone, preserved in love.
          </p>
          <p className="text-sm text-[#62564D] leading-relaxed font-sans">
            In 1964, in an ancestral haveli courtyard along the Ganges in Varanasi, grandmother Shanti Devi (affectionately known as <em>Badi Amma</em>) began bottling her family's centuries-old pickle recipes. Today, four generations later, we haven't changed a single step.
          </p>
        </div>

        {/* 4 Pillars Grid with Subtle Hover Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Pillar 1 */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl hover:border-[#D69A19] hover:-translate-y-1.5 transition-all duration-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1DF] flex items-center justify-center text-[#DF905B] font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              🏺
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#DF905B] uppercase block">
              Pillar I
            </span>
            <h3 className="font-serif font-black text-lg text-[#701B25]">
              Mitti Ki Barni (मिट्टी की बरनी)
            </h3>
            <p className="text-xs text-[#62564D] leading-relaxed">
              We never use plastic containers. Our traditional glazed ceramic clay barnis breathe naturally, allowing micro-aeration while preventing light oxidation that spoils essential spice oils.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl hover:border-[#D69A19] hover:-translate-y-1.5 transition-all duration-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1DF] flex items-center justify-center text-[#DF905B] font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              🛢️
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#DF905B] uppercase block">
              Pillar II
            </span>
            <h3 className="font-serif font-black text-lg text-[#701B25]">
              Wood-Pressed Kachi Ghani
            </h3>
            <p className="text-xs text-[#62564D] leading-relaxed">
              Industrial pickles cut costs with refined palm oil. We use 100% cold-pressed wood-churned (Kohlu) mustard and sesame oils that naturally inhibit mold while creating the authentic nasal-clearing pungent bite.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl hover:border-[#D69A19] hover:-translate-y-1.5 transition-all duration-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1DF] flex items-center justify-center text-[#701B25] font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              🪨
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#DF905B] uppercase block">
              Pillar III
            </span>
            <h3 className="font-serif font-black text-lg text-[#701B25]">
              Stone Mortar Pounding (सिल-बट्टा)
            </h3>
            <p className="text-xs text-[#62564D] leading-relaxed">
              High-speed steel mixer blades generate 70°C friction heat, scorching delicate volatile oils. We coarse-crush yellow mustard, saunf, and fenugreek on basalt stone mortars to preserve their raw fragrance.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl hover:border-[#D69A19] hover:-translate-y-1.5 transition-all duration-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1DF] flex items-center justify-center text-[#285331] font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              ☀️
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#DF905B] uppercase block">
              Pillar IV
            </span>
            <h3 className="font-serif font-black text-lg text-[#701B25]">
              21 Days of Solar Maturation
            </h3>
            <p className="text-xs text-[#62564D] leading-relaxed">
              Zero chemical vinegar or acetic acid. Covered with breathable white muslin cloth (malmal ka dhaga), our barnis spend 21 full sunny afternoons basking on haveli rooftops to unlock natural fermentation.
            </p>
          </div>

        </div>

        {/* Cinematic Parallax Rooftop Courtyard Window */}
        <div 
          ref={windowRef}
          className="relative overflow-hidden rounded-3xl my-16 h-72 sm:h-96 border-2 border-[#D69A19]/60 shadow-2xl group w-full"
        >
          {/* Parallax Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=85" 
            alt="1964 Varanasi Terrace Sun Basking Ceramic Barnis"
            className="absolute -top-32 left-0 w-full h-[160%] object-cover object-center will-change-transform transition-transform duration-75 brightness-90 group-hover:scale-105 duration-700"
            style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
          />

          {/* Warmth & Vignette Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/60 to-stone-950/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-[#701B25]/20" />

          {/* Overlaid Parallax Heritage Content */}
          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between z-10 text-white">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#701B25]/80 backdrop-blur-md border border-[#D69A19]/40 text-[#FFF8E9] text-xs font-bold uppercase tracking-wider">
                <Sun className="w-3.5 h-3.5 text-[#D69A19] animate-spin" style={{ animationDuration: '20s' }} />
                <span>1964 Ancestral Courtyard • Varanasi</span>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-[#D69A19]/90 tracking-widest uppercase">
                LAT 25.3176° N • LONG 82.9739° E
              </span>
            </div>

            <div className="max-w-2xl space-y-2">
              <span className="text-[#D69A19] text-xs sm:text-sm font-hindi uppercase tracking-widest">
                काशी के घाटों पर 21 दिनों की धूप
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                Where Sunbeams Become Heirloom Flavor
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F1DF] leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                Every single ceramic barni is swaddled in unbleached cotton muslin (मालमल), sealed with pure beeswax cord, and turned toward the rising morning sun by hand. No speed-ups. No shortcuts. Just patient tradition.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#FFF8E9]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D69A19]" />
                <span>21 Days of Patient Sun</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#DF905B]" />
                <span>4 Generations of Legacy</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sensory Manifesto Banner */}
        <div className="bg-[#701B25] text-[#FFF8E9] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-[#D69A19]/30">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D69A19]">
                The Clean Food Pledge (शुद्धता का संकल्प)
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-[#FFF8E9] leading-tight">
                "If it didn't exist in our grandmother's pantry in 1964, it will NEVER be in our jar."
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F1DF] leading-relaxed">
                No Sodium Benzoate. No Artificial Food Colors. No Synthetic Acetic Acid. No Refined Palm Oils. Just sun, rock salt, wood-pressed oil, unadulterated spices, and four generations of pure affection.
              </p>
            </div>

            <div className="md:col-span-4 bg-[#285331]/40 backdrop-blur-md p-6 rounded-2xl border border-[#D69A19]/30 text-center space-y-2">
              <div className="text-4xl font-serif font-black text-[#D69A19]">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FFF8E9]">FSSAI Certified Artisanal Kitchen</div>
              <div className="text-[11px] text-[#F7F1DF]">License No: 10023051000842</div>
              <div className="pt-2 text-[10px] text-[#D69A19]">Batch Tested for Heavy Metals & Purity</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
