import React, { useEffect, useState } from 'react';
import { 
  Sun, 
  Thermometer, 
  Wind, 
  Droplets, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export default function SunCuringTracker({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [data, setData] = useState({
    location: "Varanasi Ganges Terrace & Jodhpur Courtyards",
    temperature: "32°C",
    sky: "Clear Radiant Sun (उत्तम धूप)",
    uvIndex: 8.5,
    activeCuringBarnis: 540,
    currentSunExposureDays: 16,
    targetCuringDays: 21,
    sunMaturationPercent: 76,
    nextBatchDate: "November 4, 2026",
    oilStatus: "Fresh Kohlu Wood-Pressed Mustard Oil Steeping"
  });

  useEffect(() => {
    fetch('/api/courtyard-status')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-2xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7] flex items-center justify-center text-[#D69A19]">
            <Sun className="w-7 h-7 text-[#D69A19] animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#285331] animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#285331] bg-[#285331]/10 px-2 py-0.5 rounded-full">
                Live Courtyard Feeds
              </span>
            </div>
            <h3 className="font-serif font-black text-2xl text-[#701B25] leading-tight">
              Terrace Sun Curing Live Status
            </h3>
            <p className="text-xs text-[#62564D]">
              {data.location}
            </p>
          </div>
        </div>

        {/* Solar Maturation Meter */}
        <div className="bg-[#F7F1DF] p-6 rounded-3xl border border-[#E9DCC7] shadow-inner space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#701B25] uppercase tracking-wider">
              Batch #92 Solar Maturation (धूप की सिकाई)
            </span>
            <span className="font-black text-[#701B25] bg-[#E5AC28] px-2.5 py-0.5 rounded-full">
              Day {data.currentSunExposureDays} of {data.targetCuringDays} ({data.sunMaturationPercent}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-4 w-full bg-[#E9DCC7] rounded-full overflow-hidden p-0.5 border border-[#E9DCC7]">
            <div 
              className="h-full bg-gradient-to-r from-[#D69A19] to-[#8F2024] rounded-full transition-all duration-1000 shadow"
              style={{ width: `${data.sunMaturationPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-[#806F60] font-medium">
            <span>Day 1: Spices Pounded</span>
            <span>Day 10: Oil Blanket Formed</span>
            <span>Day 21: Final Bottling (Nov 4)</span>
          </div>
        </div>

        {/* Live Weather Metrics */}
        <div className="grid grid-cols-3 gap-3 my-4 text-center">
          <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7] shadow-sm">
            <Thermometer className="w-5 h-5 text-[#DF905B] mx-auto mb-1" />
            <div className="text-xs text-[#806F60]">Courtyard Temp</div>
            <div className="font-black text-base text-[#701B25]">{data.temperature}</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7] shadow-sm">
            <Sun className="w-5 h-5 text-[#D69A19] mx-auto mb-1" />
            <div className="text-xs text-[#806F60]">UV Solar Index</div>
            <div className="font-black text-base text-[#701B25]">{data.uvIndex} (Strong)</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7] shadow-sm">
            <Layers className="w-5 h-5 text-[#701B25] mx-auto mb-1" />
            <div className="text-xs text-[#806F60]">Barnis on Roof</div>
            <div className="font-black text-base text-[#701B25]">{data.activeCuringBarnis} Pots</div>
          </div>
        </div>

        {/* Why Sunlight Matters Science Pill */}
        <div className="bg-[#F7F1DF] p-4 rounded-2xl border border-[#E9DCC7] text-xs space-y-2 text-[#62564D]">
          <h4 className="font-bold text-[#701B25] flex items-center gap-1.5 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-[#D69A19]" />
            The 3000-Year Ancient Science of Rooftop Curing
          </h4>
          <p className="leading-relaxed">
            Industrial commercial pickles cook fruit on gas fires and dump synthetic acetic acid (chemical vinegar) to force sourness in 20 minutes. 
            <strong> At Naani Pickles, our barnis sit under direct radiant sunlight for 21 full days.</strong> Gentle 35°C solar warmth slowly activates beneficial lactic bacteria, softening the fruit skins while keeping the interior flesh delightfully crunchy for up to 3 years.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 text-center">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-sm shadow-md transition-colors"
          >
            Explore Today's Sun-Matured Jars
          </button>
        </div>

      </div>
    </div>
  );
}
