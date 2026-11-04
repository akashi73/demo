import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  ShoppingBag,
  Award,
  Sun
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SpiceQuizModal({ isOpen, onClose, onAddToCart, onQuickView }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    spice: null,
    comfortMeal: null,
    flavorCraving: null
  });
  const [matchedProduct, setMatchedProduct] = useState(null);

  const handleSelect = (field, value) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate match
      calculateResult(updated);
    }
  };

  const calculateResult = (ans) => {
    let matchId = 'ramkela-mango'; // default
    if (ans.spice === 4 || ans.flavorCraving === 'thecha') {
      matchId = 'kolhapuri-thecha';
    } else if (ans.spice === 3 || ans.flavorCraving === 'banarasi') {
      matchId = 'banarasi-lal-mirch';
    } else if (ans.comfortMeal === 'curd-rice' || ans.spice === 4) {
      matchId = 'andhra-avakaya';
    } else if (ans.flavorCraving === 'sweet' || ans.spice === 1) {
      matchId = 'gujarati-aam-chunda';
    } else if (ans.comfortMeal === 'khichdi' && ans.spice <= 2) {
      matchId = 'sweet-sour-nimbu';
    } else if (ans.flavorCraving === 'rare') {
      matchId = 'rajasthani-ker-sangri';
    } else {
      matchId = 'ramkela-mango';
    }

    const prod = PRODUCTS.find(p => p.id === matchId) || PRODUCTS[0];
    setMatchedProduct(prod);
    setStep(4); // result
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ spice: null, comfortMeal: null, flavorCraving: null });
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-lg w-full border border-[#E9DCC7] shadow-2xl overflow-hidden p-6 sm:p-8"
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
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1DF] text-[#701B25] text-xs font-bold uppercase tracking-wider border border-[#E9DCC7]">
            <Flame className="w-3.5 h-3.5 text-[#DF905B] animate-pulse" />
            Naani's Taste Index • 60-Sec Quiz
          </div>
          <h3 className="font-serif text-2xl font-black text-[#701B25]">
            Find Your Soulmate Pickle
          </h3>
          <p className="text-xs text-[#62564D]">
            {step <= 3 ? `Question ${step} of 3` : "Your Soulmate Pickle is Ready!"}
          </p>

          {/* Step Progress Bar */}
          {step <= 3 && (
            <div className="flex gap-2 justify-center pt-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 w-12 rounded-full transition-all ${
                    s === step ? 'bg-[#8F2024] w-16' : s < step ? 'bg-[#D69A19]' : 'bg-[#E9DCC7]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Question 1: Spice Tolerance */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-center text-[#701B25] text-base">
              How do you like your spice level?
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { val: 1, title: "Mild & Sweet-Tangy", desc: "Gentle warmth, no sweating (Chunda or Sweet Lemon)", icon: "🍯" },
                { val: 2, title: "Medium Piquant Zing", desc: "Pleasant mustard warmth, classic family table level", icon: "🌶️" },
                { val: 3, title: "Robust & Bold Kick", desc: "Authentic Banarasi stuffed chili punch with roasted seeds", icon: "🌶️🌶️" },
                { val: 4, title: "Volcanic & Unforgiving", desc: "Fiery Guntur chillies or Kolhapuri skillet roasted thecha", icon: "🔥🌶️" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect('spice', opt.val)}
                  className="p-3.5 rounded-2xl border border-[#E9DCC7] bg-white hover:border-[#8F2024] hover:bg-[#F7F1DF] text-left transition-all flex items-center justify-between group shadow-sm hover:shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-[#701B25] group-hover:text-[#8F2024]">
                        {opt.title}
                      </div>
                      <div className="text-xs text-[#62564D]">{opt.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#806F60] group-hover:text-[#8F2024] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 2: Comfort Meal */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-center text-[#701B25] text-base">
              What is your ultimate comfort meal?
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { val: "paratha", title: "Crisp Ajwain Paratha with Ghee", desc: "Triangle whole wheat layers on a rainy morning", icon: "🫓" },
                { val: "khichdi", title: "Steaming Dal Khichdi & Papad", desc: "The ultimate detox and comforting soul food", icon: "🍲" },
                { val: "curd-rice", title: "Cool South Indian Curd Rice", desc: "Soothing yogurt with tempered mustard & curry leaves", icon: "🍚" },
                { val: "snack", title: "Crispy Mathri or Gujarati Thepla", desc: "Evening chai table staple or train travel companion", icon: "☕" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect('comfortMeal', opt.val)}
                  className="p-3.5 rounded-2xl border border-[#E9DCC7] bg-white hover:border-[#8F2024] hover:bg-[#F7F1DF] text-left transition-all flex items-center justify-between group shadow-sm hover:shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-[#701B25] group-hover:text-[#8F2024]">
                        {opt.title}
                      </div>
                      <div className="text-xs text-[#62564D]">{opt.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#806F60] group-hover:text-[#8F2024] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 3: Craving */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-center text-[#701B25] text-base">
              Which sensory flavor makes your mouth water?
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { val: "banarasi", title: "Roasted Spices & Whole Stuffed Chili", desc: "Cracked fennel, amchur, thick Banarasi red chili", icon: "🫑" },
                { val: "mango-crunch", title: "Sour Raw Mango Crunch with Peel", desc: "Unpeeled Ramkela cubes in cold mustard oil", icon: "🥭" },
                { val: "sweet", title: "Sun-Caramelized Saffron Sweetness", desc: "Zero-oil sun baked chunda or amla murabba", icon: "🍯" },
                { val: "thecha", title: "Charred Garlic & Crunchy Peanuts", desc: "Rustic skillet roasted Marathi thecha kick", icon: "🧄" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect('flavorCraving', opt.val)}
                  className="p-3.5 rounded-2xl border border-[#E9DCC7] bg-white hover:border-[#8F2024] hover:bg-[#F7F1DF] text-left transition-all flex items-center justify-between group shadow-sm hover:shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-[#701B25] group-hover:text-[#8F2024]">
                        {opt.title}
                      </div>
                      <div className="text-xs text-[#62564D]">{opt.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#806F60] group-hover:text-[#8F2024] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && matchedProduct && (
          <div className="space-y-5 text-center">
            
            {/* Match Percentage Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#285331]/10 text-[#285331] font-bold text-xs border border-[#285331]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D69A19]" /> 98.4% Flavor Harmony Match
            </div>

            {/* Matched Product Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#E9DCC7] shadow-md text-left flex gap-4 items-center">
              <img 
                src={matchedProduct.image} 
                alt={matchedProduct.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0 border border-[#E9DCC7] shadow"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8F2024] uppercase tracking-wider">
                  {matchedProduct.category}
                </span>
                <h5 className="font-serif font-bold text-base text-[#701B25] leading-snug">
                  {matchedProduct.name}
                </h5>
                <p className="text-xs text-[#62564D] line-clamp-2">
                  {matchedProduct.tagline}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-black text-[#701B25]">
                    ₹{matchedProduct.sizes[0].price}
                  </span>
                  <span className="text-[11px] text-[#806F60]">
                    ({matchedProduct.sizes[0].size})
                  </span>
                </div>
              </div>
            </div>

            {/* Naani's Personal Note */}
            <div className="p-3 bg-[#F7F1DF] rounded-xl border border-[#E9DCC7] text-xs text-[#62564D] italic font-serif">
              "Based on your cravings, Naani recommends this jar. It has the exact balance of sun-curing and spices that will bring alive your dining table."
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onAddToCart({
                    productId: matchedProduct.id,
                    name: matchedProduct.name,
                    hindiName: matchedProduct.hindiName,
                    image: matchedProduct.image,
                    size: matchedProduct.sizes[0].size,
                    price: matchedProduct.sizes[0].price,
                    originalPrice: matchedProduct.sizes[0].originalPrice,
                    quantity: 1
                  });
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#D69A19]" />
                <span>Add Matched Jar to Cart (₹{matchedProduct.sizes[0].price})</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onQuickView(matchedProduct);
                }}
                className="w-full py-2.5 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] font-semibold text-xs transition-colors"
              >
                View Full Recipe & Ingredients Details
              </button>

              <button
                onClick={handleReset}
                className="text-[#806F60] hover:text-[#701B25] text-xs flex items-center justify-center gap-1 mx-auto pt-2"
              >
                <RotateCcw className="w-3 h-3" /> Retake Taste Quiz
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
