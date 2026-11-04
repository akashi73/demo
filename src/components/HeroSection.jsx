import React from 'react';
import { 
  Sun, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  Award, 
  Clock, 
  CheckCircle2, 
  Package, 
  Flame, 
  Truck 
} from 'lucide-react';
import { useScrollParallax, useMouseParallax } from '../hooks/useParallax';
import ParallaxFloatingSpices from './ParallaxFloatingSpices';

export default function HeroSection({ 
  onExploreClick, 
  onOpenQuiz, 
  onOpenBundleBuilder, 
  onOpenSunTracker 
}) {
  const scrollY = useScrollParallax();
  const { bind: cardTiltBind, isHovered } = useMouseParallax({ maxTilt: 6, perspective: 1000 });

  return (
    <section className="relative overflow-hidden bg-[#FBF7EF] pt-6 pb-16 md:pt-12 md:pb-24 border-b border-[#E9DCC7] w-full max-w-[100vw]">
      {/* Floating Artisanal Spice Particles with Parallax Speeds */}
      <ParallaxFloatingSpices />

      {/* Ambient Parallax Radial Glows */}
      <div 
        className="absolute top-0 right-0 -mt-16 -mr-16 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-[#D69A19]/15 via-[#DF905B]/10 to-transparent blur-3xl pointer-events-none overflow-hidden will-change-transform transition-transform duration-75"
        style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }}
      />
      <div 
        className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#701B25]/10 via-[#F7F1DF]/50 to-transparent blur-3xl pointer-events-none overflow-hidden will-change-transform transition-transform duration-75"
        style={{ transform: `translate3d(0, ${-scrollY * 0.08}px, 0)` }}
      />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column with Subtle Parallax Float */}
          <div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left will-change-transform transition-transform duration-75"
            style={{ transform: `translate3d(0, ${scrollY * 0.03}px, 0)` }}
          >
            
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F1DF] border border-[#E9DCC7] shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#D69A19] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#701B25] uppercase">
                धूप, धागा और दुलार • 60-Year Heirloom Recipes
              </span>
            </div>

            {/* Main Sensory Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-[#701B25] tracking-tight leading-[1.12]">
              The Taste You Spent Your Whole Life <span className="text-[#D69A19] italic font-normal">Missing.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#62564D] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Hand-pounded spices, single-origin cold-pressed <strong className="text-[#701B25] font-semibold">Kachi Ghani mustard oil</strong>, and 21 days of patient terrace sun-curing in ceramic <em className="text-[#DF905B] font-semibold not-italic">barnis</em>. Absolutely zero artificial preservatives, zero synthetic vinegar. Made exactly how our grandmothers made them in 1964.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button 
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Shop Handcrafted Pickles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={onOpenBundleBuilder}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] font-bold text-sm sm:text-base border-2 border-[#D69A19] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4 text-[#D69A19]" />
                <span>Build Custom Tiffin Dabba</span>
                <span className="bg-[#8F2024] text-[#FFF8E9] text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">15% Off</span>
              </button>

              <button 
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-transparent hover:bg-[#F7F1DF] text-[#62564D] hover:text-[#701B25] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-[#DF905B]" />
                <span>Take Spice Quiz</span>
              </button>
            </div>

            {/* Quick Guarantees & Ratings */}
            <div className="pt-4 border-t border-[#E9DCC7] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#62564D]">
              <div className="flex items-center gap-2">
                <div className="flex text-[#D69A19] text-sm">
                  {'★'.repeat(5)}
                </div>
                <span className="font-bold text-[#701B25]">4.96/5 Rating</span>
                <span className="text-[#806F60]">(28,400+ Jars Delivered)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#285331]" />
                <span>Free Pan-India Delivery on ₹499+</span>
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#285331]" />
                <span>100% Glass & Ceramic Packaging</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image & Interactive 3D Parallax Card */}
          <div className="lg:col-span-5 relative">
            <div 
              {...cardTiltBind}
              className="relative mx-auto max-w-md lg:max-w-none cursor-pointer"
              style={{
                ...cardTiltBind.style,
                transformStyle: 'preserve-3d'
              }}
            >
              
              {/* Outer Glow & Border */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-[#D69A19]/30 via-[#DF905B]/20 to-[#701B25]/20 border border-[#E9DCC7] shadow-xl">
                <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-[4/5] sm:aspect-[4/4.5] shadow-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85" 
                    alt="Authentic Indian Stuffed Red Chili Pickle and Mango Achar in traditional barni" 
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-transparent" />

                  {/* Overlaid Tagline & Batch Seal - Floating in 3D Space */}
                  <div 
                    className="absolute top-4 left-4 bg-[#701B25]/85 backdrop-blur-md border border-[#D69A19]/50 rounded-full px-3 py-1 flex items-center gap-2 text-[#FFF8E9] text-xs shadow-lg"
                    style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)', transition: 'transform 0.2s' }}
                  >
                    <Sun className="w-3.5 h-3.5 text-[#D69A19] animate-spin" style={{ animationDuration: '15s' }} />
                    <span className="font-semibold">Sun-Matured in Ceramic Barnis</span>
                  </div>

                  <div 
                    className="absolute top-4 right-4 bg-[#E5AC28] text-[#701B25] text-xs font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wide"
                    style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)', transition: 'transform 0.2s' }}
                  >
                    Zero Chemicals
                  </div>

                  {/* Bottom Caption Card - Deep 3D Parallax Float */}
                  <div 
                    className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md p-4 rounded-xl border border-[#E9DCC7] shadow-xl space-y-2"
                    style={{ 
                      transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)',
                      transition: 'transform 0.2s' 
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#8F2024] uppercase tracking-wider">
                        Current Courtyard Batch
                      </span>
                      <button 
                        onClick={onOpenSunTracker}
                        className="text-[11px] font-bold text-[#D69A19] hover:underline flex items-center gap-1"
                      >
                        View Live Courtyard →
                      </button>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#701B25] leading-snug">
                      Heirloom Banarasi Lal Mirch & Ramkela Aam
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                      <div className="bg-[#F7F1DF] p-1.5 rounded-lg border border-[#E9DCC7]">
                        <span className="block text-[10px] text-[#806F60]">Sun Days</span>
                        <span className="font-bold text-[#701B25]">21 Days</span>
                      </div>
                      <div className="bg-[#F7F1DF] p-1.5 rounded-lg border border-[#E9DCC7]">
                        <span className="block text-[10px] text-[#806F60]">Oil Extraction</span>
                        <span className="font-bold text-[#701B25]">Wood Kohlu</span>
                      </div>
                      <div className="bg-[#F7F1DF] p-1.5 rounded-lg border border-[#E9DCC7]">
                        <span className="block text-[10px] text-[#806F60]">Preservative</span>
                        <span className="font-bold text-[#285331]">0% Pure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Pill - Highest Z-Depth */}
              <div 
                className="hidden sm:flex absolute -bottom-5 -left-6 bg-[#FFFFFF] border border-[#E9DCC7] p-3 rounded-2xl shadow-xl items-center gap-3 max-w-xs z-20"
                style={{ 
                  transform: isHovered ? 'translateZ(55px) scale(1.03)' : 'translateZ(0px)',
                  transition: 'transform 0.25s' 
                }}
              >
                <img 
                  src="/logo.png" 
                  alt="Naani Pickles - Swaad hi Pehchan" 
                  className="w-12 h-12 rounded-xl object-contain shrink-0 shadow-sm border border-[#E9DCC7] bg-[#F7F1DF]" 
                />
                <div>
                  <p className="text-[11px] font-serif italic text-[#62564D] leading-tight">
                    "Tastes just like my Badi Amma's rooftop barni in 1978. Real mustard pungency!"
                  </p>
                  <p className="text-[10px] font-bold text-[#8F2024] mt-0.5">— Anuradha K., Verified Food Critic</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars of Naani's Kitchen Banner with Micro Parallax Lift */}
        <div 
          className="mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 will-change-transform transition-transform duration-75"
          style={{ transform: `translate3d(0, ${-scrollY * 0.02}px, 0)` }}
        >
          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E9DCC7] shadow-sm flex items-start gap-3 hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1DF] flex items-center justify-center shrink-0 text-[#D69A19]">
              <Sun className="w-5 h-5 text-[#D69A19]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#701B25]">21-Day Sun Curing</h4>
              <p className="text-xs text-[#62564D] mt-0.5 leading-relaxed">
                Slow solar enzymatic maturation on rooftop terraces; no artificial heating.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E9DCC7] shadow-sm flex items-start gap-3 hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1DF] flex items-center justify-center shrink-0 text-[#DF905B]">
              <Award className="w-5 h-5 text-[#DF905B]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#701B25]">Kachi Ghani Mustard</h4>
              <p className="text-xs text-[#62564D] mt-0.5 leading-relaxed">
                Wood-pressed cold oil retention preserves natural antioxidants & aroma.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E9DCC7] shadow-sm flex items-start gap-3 hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1DF] flex items-center justify-center shrink-0 text-[#701B25]">
              <ShieldCheck className="w-5 h-5 text-[#701B25]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#701B25]">Zero Synthetic Acid</h4>
              <p className="text-xs text-[#62564D] mt-0.5 leading-relaxed">
                Zero vinegar, sodium benzoate, or chemical stabilizer additives ever.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E9DCC7] shadow-sm flex items-start gap-3 hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1DF] flex items-center justify-center shrink-0 text-[#285331]">
              <Sparkles className="w-5 h-5 text-[#285331]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#701B25]">Stone Mortar Pounded</h4>
              <p className="text-xs text-[#62564D] mt-0.5 leading-relaxed">
                Basalt stone sil-batta grinding prevents heat build-up in volatile spice oils.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
