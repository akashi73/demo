import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sun, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Award, 
  ArrowRight,
  Check
} from 'lucide-react';

export default function Footer({ onOpenQuiz, onOpenBundleBuilder, onOpenSunTracker, onSelectCategory, onNavigateBlog }) {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterInput.trim()) return;

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterInput.trim() })
      });
      setSubscribed(true);
      setNewsletterInput('');
    } catch (err) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#285331] text-[#F7F1DF] pt-16 pb-12 border-t-4 border-[#D69A19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Grandma's Secret Recipe Circle */}
        <div className="bg-[#1f4126] p-8 rounded-3xl border border-[#49664A] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-2">
              <span className="text-[#E5AC28] font-serif italic text-sm">
                Join Naani's Secret Recipe & Seasonal Batch Circle
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#FFF8E9] leading-snug">
                Receive Alerts When Fresh Sun-Cured Batches are Bottled.
              </h3>
              <p className="text-xs text-[#F7F1DF]/90 leading-relaxed max-w-lg">
                Raw Ramkela mangoes and Banarasi chillies are harvested only once a year. Be the first to secure limited edition ceramic barni batches + enjoy 15% off your first jar.
              </p>
            </div>

            <div className="md:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-[#285331] border border-[#D69A19] rounded-2xl text-[#FFF8E9] text-xs flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#E5AC28] shrink-0" />
                  <span>Pranam! You are now subscribed to seasonal batch alerts and grandma's secret recipes.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email"
                    required
                    value={newsletterInput}
                    onChange={(e) => setNewsletterInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 text-xs rounded-full bg-[#285331] border border-[#49664A] text-[#FFF8E9] placeholder-[#F7F1DF]/60 focus:outline-none focus:border-[#E5AC28]"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#D69A19] hover:bg-[#E5AC28] text-[#701B25] font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-1"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Middle Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="overflow-hidden rounded-2xl border-2 border-[#E5AC28]/50 bg-[#F7F1DF]/10 shadow-xl p-0.5">
                <img 
                  src="/logo.png" 
                  alt="Naani Pickles Logo" 
                  className="h-16 w-auto object-contain" 
                />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-black text-[#FFF8E9] leading-tight">Naani Pickles™</h4>
                <p className="text-xs text-[#E5AC28] font-serif italic font-semibold">"Swaad hi Pehchan"</p>
                <p className="text-[11px] text-[#F7F1DF] font-medium">दादी-नानी के हाथ का पारंपरिक स्वाद</p>
              </div>
            </div>

            <p className="text-xs text-[#F7F1DF]/90 leading-relaxed">
              Heirloom Indian pickles and chutneys made with wood-pressed oils, hand-pounded spices, and 21 days of slow courtyard sun-curing in ceramic barnis. No chemicals, zero synthetic vinegar.
            </p>

            <div className="text-xs text-[#F7F1DF] space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E5AC28] shrink-0" />
                <span>FSSAI Lic. #10023051000842</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E5AC28] shrink-0" />
                <span>Courtyard Terraces: Assi Ghat, Varanasi & Old City, Jodhpur</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5AC28] shrink-0" />
                <span>Helpline: +91 98765 43210 (10 AM - 7 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#FFF8E9] tracking-wide uppercase">
              Heirloom Categories
            </h5>
            <ul className="text-xs text-[#F7F1DF] space-y-2">
              <li>
                <button onClick={() => onSelectCategory('Mango Specials')} className="hover:text-[#E5AC28] transition-colors">
                  Ramkela Raw Mango Pickles (आम का आचार)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Chili & Fiery')} className="hover:text-[#E5AC28] transition-colors">
                  Bharwa Banarasi Red Chilies (लाल मिर्च)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Citrus & Tangy')} className="hover:text-[#E5AC28] transition-colors">
                  Zero-Oil Sun-Cured Lemon (नींबू आचार)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Heritage & Rare')} className="hover:text-[#E5AC28] transition-colors">
                  Royal Ker Sangri & Gunda (शाही केर सांगरी)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Gourmet Chutneys & Podis')} className="hover:text-[#E5AC28] transition-colors">
                  Roasted Garlic Kolhapuri Thecha & Gunpowder
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Gift Hampers')} className="hover:text-[#E5AC28] transition-colors">
                  Brass Keepsake Gift Trunks & Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage Guides & Shortcuts */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#FFF8E9] tracking-wide uppercase">
              Brand Secrets
            </h5>
            <ul className="text-xs text-[#F7F1DF] space-y-2">
              <li>
                <button 
                  onClick={() => {
                    if (onNavigateBlog) onNavigateBlog();
                  }} 
                  className="text-[#E5AC28] font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>Heirloom Blog & Recipes</span>
                  <span className="text-[9px] bg-[#8F2024] text-[#FFF8E9] px-1.5 py-0.2 rounded-full font-sans font-bold">New</span>
                </button>
              </li>
              <li>
                <a href="#heritage-story" className="hover:text-[#E5AC28] transition-colors">
                  The 1964 Haveli Story
                </a>
              </li>
              <li>
                <button onClick={onOpenSunTracker} className="hover:text-[#E5AC28] transition-colors text-left">
                  Live Courtyard Curing
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-[#E5AC28] transition-colors text-left">
                  Taste Matchmaker Quiz
                </button>
              </li>
              <li>
                <button onClick={onOpenBundleBuilder} className="hover:text-[#E5AC28] transition-colors text-left">
                  Build Custom Tiffin Dabba
                </button>
              </li>
              <li>
                <a href="#preservation-rules" className="hover:text-[#E5AC28] transition-colors">
                  5 Rules of Achar Longevity
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Ordering & Hours */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#FFF8E9] tracking-wide uppercase">
              WhatsApp Concierge
            </h5>
            <p className="text-xs text-[#F7F1DF]/90 leading-relaxed">
              Prefer placing orders or asking questions directly with our family kitchen?
            </p>
            <a 
              href="https://wa.me/919876543210?text=Namaste%20Naani%20Pickles!%20I'd%20like%20to%20order%20some%20authentic%20pickles."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f4126] hover:bg-[#16301c] text-[#FFF8E9] border border-[#49664A] font-bold text-xs shadow transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#E5AC28]" />
              <span>Chat with Kitchen Team</span>
            </a>
            <div className="text-[11px] text-[#F7F1DF]/70 pt-1">
              Dispatches within 24 hours via Express Air Couriers. Pan-India & Global Delivery.
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 border-t border-[#49664A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F1DF]/80">
          <div>
            © 2026 Naani Pickles™ Heritage Foodworks Pvt. Ltd. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-[#F7F1DF]/90">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>FSSAI License Info</span>
            <span>•</span>
            <span className="text-[#E5AC28]">Made with ❤️ for Indian Food Traditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
