import React from 'react';
import { 
  ShieldCheck, 
  Droplet, 
  Sun, 
  RotateCw, 
  AlertTriangle, 
  Check, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useScrollParallax } from '../hooks/useParallax';

export default function PreservationGuide() {
  const scrollY = useScrollParallax();
  const rules = [
    {
      number: "Rule 1",
      title: "The Bone-Dry Spoon Rule (सूखा चम्मच नियम)",
      desc: "Water is the mortal enemy of traditional sun-cured pickles. Never dip a wet or used spoon into your jar. Always use a bone-dry wooden or stainless steel spoon.",
      icon: "🥄",
      badge: "Crucial"
    },
    {
      number: "Rule 2",
      title: "Keep the 'Oil Blanket' Intact (तेल का पहरा)",
      desc: "Cold-pressed mustard oil acts as a natural vacuum seal against airborne spores. Ensure the top layer of fruit is always submerged beneath at least a 1/4-inch blanket of oil.",
      icon: "🛢️",
      badge: "Golden Tip"
    },
    {
      number: "Rule 3",
      title: "Shady Pantry, Never the Refrigerator! (फ्रिज से दूर)",
      desc: "Refrigeration solidifies healthy mustard oils, dulls the fragrant spices, and traps condensation inside the lid. Keep your barni in a cool, dark corner of your kitchen cupboard.",
      icon: "🏺",
      badge: "Taste Secret"
    },
    {
      number: "Rule 4",
      title: "The Gentle Weekly Swirl (साप्ताहिक घुमाव)",
      desc: "Once a week, take your jar and gently tilt/swirl it so the spiced oil bathes the upper pieces. This redistributes the salt and spices uniformly.",
      icon: "🔄",
      badge: "Grandma's Habit"
    },
    {
      number: "Rule 5",
      title: "The Monsoon Sun Bath (बरसात में धूप)",
      desc: "If you live in coastal or humid regions (Mumbai, Chennai, Kolkata), place your sealed jar on the windowsill for 2-3 hours of morning sun once a month during monsoons.",
      icon: "☀️",
      badge: "Longevity"
    }
  ];

  return (
    <section id="preservation-rules" className="py-20 bg-[#F7F1DF] border-b border-[#E9DCC7] relative overflow-hidden w-full max-w-[100vw]">
      {/* Ambient Parallax Solar Glow */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-72 rounded-full bg-gradient-to-b from-[#D69A19]/15 via-[#DF905B]/10 to-transparent blur-3xl pointer-events-none will-change-transform"
        style={{ transform: `translate3d(-50%, ${scrollY * 0.05}px, 0)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFCF6] text-[#701B25] text-xs font-bold uppercase tracking-wider border border-[#E9DCC7]">
            <ShieldCheck className="w-4 h-4 text-[#D69A19]" />
            Grandma's Wisdom (नानी के नियम)
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#701B25] tracking-tight">
            How to Keep Your Achar Fresh for 3+ Years
          </h2>
          <p className="text-sm text-[#62564D] font-sans">
            Because our pickles contain zero synthetic chemical preservatives, they thrive on ancient Ayurvedic preservation wisdom. Follow these 5 golden commandments:
          </p>
        </div>

        {/* 5 Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {rules.map((r, i) => (
            <div 
              key={i} 
              className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl hover:border-[#D69A19] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-3 relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{r.icon}</span>
                  <span className="text-[10px] font-bold text-[#701B25] bg-[#F7F1DF] border border-[#E9DCC7] px-2 py-0.5 rounded-full uppercase">
                    {r.badge}
                  </span>
                </div>

                <div className="text-[10px] font-bold text-[#DF905B] tracking-wider uppercase">
                  {r.number}
                </div>

                <h4 className="font-serif font-bold text-sm text-[#701B25] mt-1 leading-snug">
                  {r.title}
                </h4>

                <p className="text-xs text-[#62564D] mt-2 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E9DCC7] flex items-center gap-1 text-[11px] text-[#285331] font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Zero mold guarantee</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
