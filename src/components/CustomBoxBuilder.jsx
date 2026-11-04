import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  ShoppingBag, 
  Gift, 
  Heart,
  MessageSquare,
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function CustomBoxBuilder({ isOpen, onClose, onAddBundleToCart }) {
  if (!isOpen) return null;

  // Bundle selection: 3 or 4 jars
  const [boxCapacity, setBoxCapacity] = useState(3);
  const [selectedJars, setSelectedJars] = useState([]);
  const [boxStyle, setBoxStyle] = useState('brass-trunk'); // 'brass-trunk', 'terracotta-box', 'wooden-crate'
  const [customNote, setCustomNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Available candidate pickles (pick from single-jar products)
  const candidateProducts = PRODUCTS.filter(p => p.category !== 'Gift Hampers');

  const handleToggleJar = (product) => {
    setSelectedJars(prev => {
      const existingIndex = prev.findIndex(j => j.id === product.id);
      if (existingIndex !== -1) {
        // Remove
        return prev.filter(j => j.id !== product.id);
      }
      // Add if under capacity
      if (prev.length < boxCapacity) {
        return [...prev, {
          id: product.id,
          name: product.name,
          hindiName: product.hindiName,
          image: product.image,
          price: product.sizes[0].price,
          spiceText: product.spiceText || 'Medium Zing',
          origin: product.origin || 'Varanasi'
        }];
      }
      return prev;
    });
  };

  const handleRemoveIndex = (idx) => {
    setSelectedJars(prev => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  // Pricing calculation
  const rawSum = selectedJars.reduce((acc, curr) => acc + curr.price, 0) + (boxCapacity === 3 ? 120 : 160); // box cost
  const bundleDiscount = Math.round(rawSum * 0.15); // 15% combo discount
  const finalBundlePrice = rawSum - bundleDiscount;

  const handleAddBundle = () => {
    if (selectedJars.length < boxCapacity) return;

    const bundleItem = {
      productId: `custom-bundle-${Date.now()}`,
      name: `Custom Heritage Dabba (${boxCapacity} Jars)`,
      hindiName: `कस्टम हेरिटेज उपहार डिब्बा`,
      size: `${boxStyle.replace('-', ' ').toUpperCase()} • 15% OFF BUNDLE`,
      image: selectedJars[0]?.image || PRODUCTS[0].image,
      price: finalBundlePrice,
      originalPrice: rawSum,
      quantity: 1,
      isBundle: true,
      bundleContents: selectedJars.map(j => j.name),
      customNote: customNote || null
    };

    onAddBundleToCart(bundleItem);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  const BOX_STYLES = [
    { id: 'brass-trunk', name: 'Brass Trunk', icon: '🧳', desc: 'Antique Gold Finish' },
    { id: 'terracotta-box', name: 'Terracotta Pot', icon: '🏺', desc: 'Claykeepsake' },
    { id: 'wooden-crate', name: 'Pine Crate', icon: '🪵', desc: 'Handcrafted Wood' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        role="dialog"
        id="custom-box-builder-modal"
        aria-label="Build Your Own Heritage Dabba"
        className="relative bg-[#FBF7EF] rounded-t-3xl sm:rounded-3xl max-w-4xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden h-[94vh] sm:h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header - Guaranteed Compact Height & Never Shrinks */}
        <div className="shrink-0 p-3.5 sm:p-4 px-4 sm:px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#701B25] text-[#D69A19] flex items-center justify-center shrink-0 shadow-sm">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-serif font-black text-base sm:text-lg text-[#701B25] leading-tight truncate">
                  Build Your Own Heritage Dabba
                </h3>
                <span className="bg-[#8F2024] text-[#FFF8E9] text-[9px] sm:text-[10px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider">
                  15% Off
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#62564D] truncate mt-0.5">
                Choose any {boxCapacity} handcrafted signature jars + keepsake box
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors shrink-0"
            title="Close Customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Workspace - Full Height and Spacious */}
        <div className="overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6 flex-1 min-w-0">
          
          {/* Step 1: Set Box Size & Keepsake Packaging in one sleek card */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E9DCC7] shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Capacity Selector */}
              <div>
                <label className="text-[10px] sm:text-xs font-bold text-[#62564D] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <span>1. Set Dabba Size:</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBoxCapacity(3);
                      if (selectedJars.length > 3) setSelectedJars(selectedJars.slice(0, 3));
                    }}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      boxCapacity === 3 
                        ? 'border-[#8F2024] bg-[#F7F1DF] text-[#701B25] font-bold ring-2 ring-[#D69A19]/50 shadow-sm' 
                        : 'border-[#E9DCC7] text-[#62564D] hover:bg-[#F7F1DF]'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">3 Jars Set</div>
                    <div className="text-[10px] text-[#285331] font-semibold">15% Automatic Off</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBoxCapacity(4)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      boxCapacity === 4 
                        ? 'border-[#8F2024] bg-[#F7F1DF] text-[#701B25] font-bold ring-2 ring-[#D69A19]/50 shadow-sm' 
                        : 'border-[#E9DCC7] text-[#62564D] hover:bg-[#F7F1DF]'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">4 Jars Grand Set</div>
                    <div className="text-[10px] text-[#285331] font-semibold">15% Off + Brass Spoon</div>
                  </button>
                </div>
              </div>

              {/* Box Style Selector */}
              <div>
                <label className="text-[10px] sm:text-xs font-bold text-[#62564D] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <span>2. Keepsake Packaging Box:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {BOX_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setBoxStyle(style.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        boxStyle === style.id 
                          ? 'border-[#8F2024] bg-[#F7F1DF] text-[#701B25] font-bold ring-2 ring-[#D69A19]/50 shadow-sm' 
                          : 'border-[#E9DCC7] text-[#62564D] hover:bg-[#F7F1DF]'
                      }`}
                    >
                      <span className="text-base sm:text-lg block leading-none">{style.icon}</span>
                      <span className="text-[10px] sm:text-[11px] font-bold block mt-1 truncate">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Step 2: The Dabba Tray (Slots Visualizer) */}
          <div className="bg-[#F7F1DF] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#D69A19] space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#701B25] uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#D69A19]" /> 
                <span>Your Dabba Slots ({selectedJars.length}/{boxCapacity} filled)</span>
              </span>
              <span className="text-[11px] font-semibold text-[#62564D]">
                {selectedJars.length < boxCapacity 
                  ? `👇 Tap ${boxCapacity - selectedJars.length} more pickle(s) below` 
                  : '✨ Dabba is full! Ready to seal and ship.'}
              </span>
            </div>

            {/* Slots Grid */}
            <div className={`grid gap-2 sm:gap-3 ${boxCapacity === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {[...Array(boxCapacity)].map((_, i) => {
                const jar = selectedJars[i];
                return (
                  <div 
                    key={i}
                    className={`aspect-square sm:aspect-[4/3] rounded-xl sm:rounded-2xl border-2 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center relative overflow-hidden transition-all ${
                      jar 
                        ? 'bg-white border-[#D69A19] shadow-md ring-1 ring-[#D69A19]/50' 
                        : 'bg-white/50 border-dashed border-[#E9DCC7] text-[#806F60]'
                    }`}
                  >
                    {jar ? (
                      <>
                        <img 
                          src={jar.image} 
                          alt={jar.name}
                          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover shadow border border-[#E9DCC7] mb-1" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        <div className="text-[9px] sm:text-xs font-bold text-[#701B25] leading-tight truncate w-full px-1">
                          {jar.name.replace(/Heirloom|Traditional|Special|Grandma's/gi, '').trim() || jar.name}
                        </div>
                        <div className="text-[8px] sm:text-[10px] text-[#8F2024] font-bold">₹{jar.price}</div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveIndex(i);
                          }}
                          className="absolute top-1 right-1 p-0.5 sm:p-1 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors shadow-sm"
                          title="Remove jar from box"
                        >
                          <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-dashed border-[#E9DCC7] flex items-center justify-center text-[#806F60] mb-1">
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#806F60]" />
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-semibold text-[#806F60]">Empty Slot {i + 1}</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Pickle Catalog */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-[#62564D] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D69A19]" />
                <span>3. Tap Pickles to Add / Remove ({candidateProducts.length} Available):</span>
              </h4>
              <span className="text-[10px] text-[#806F60] font-semibold hidden sm:inline">
                Click any jar to toggle in your dabba
              </span>
            </div>

            {/* 2-Column Responsive Grid on Mobile, 3-4 on Tablet/Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {candidateProducts.map((p) => {
                const isSelected = selectedJars.some(j => j.id === p.id);
                const isFull = selectedJars.length >= boxCapacity && !isSelected;
                const slotIndex = selectedJars.findIndex(j => j.id === p.id);

                return (
                  <button
                    key={p.id}
                    type="button"
                    disabled={isFull}
                    onClick={() => handleToggleJar(p)}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all relative flex flex-col justify-between group overflow-hidden ${
                      isSelected 
                        ? 'border-[#8F2024] bg-[#F7F1DF] shadow-md ring-2 ring-[#8F2024]' 
                        : isFull 
                          ? 'border-[#E9DCC7] bg-stone-50 opacity-40 cursor-not-allowed' 
                          : 'border-[#E9DCC7] bg-white hover:border-[#D69A19] hover:shadow-md'
                    }`}
                  >
                    {/* Active Checkmark Pill */}
                    {isSelected && (
                      <span className="absolute top-2 right-2 bg-[#8F2024] text-[#FFF8E9] text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md z-10 animate-in zoom-in-50">
                        <Check className="w-2.5 h-2.5" /> Slot {slotIndex + 1}
                      </span>
                    )}

                    <div className="space-y-1.5">
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-stone-100 shadow-inner">
                        <img 
                          src={p.image} 
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        {p.sunDays > 0 && (
                          <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-[#D69A19] text-[8px] font-bold px-1 rounded">
                            ☀️ {p.sunDays}d Sun
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs font-bold text-[#701B25] leading-snug line-clamp-1 group-hover:text-[#8F2024] transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-[#DF905B] font-serif truncate">
                          {p.hindiName}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E9DCC7] mt-2 flex items-center justify-between text-[10px]">
                      <span className="font-black text-[#701B25] text-xs">₹{p.sizes[0].price}</span>
                      
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        isSelected 
                          ? 'bg-[#701B25] text-white' 
                          : isFull 
                            ? 'text-stone-400' 
                            : 'bg-[#F7F1DF] text-[#701B25] group-hover:bg-[#8F2024] group-hover:text-white'
                      }`}>
                        {isSelected ? '✓ Added' : isFull ? 'Box Full' : '+ Add'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Complimentary Gift Note */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E9DCC7] space-y-2">
            <button 
              type="button"
              onClick={() => setShowNoteInput(!showNoteInput)}
              className="w-full flex items-center justify-between text-xs font-bold text-[#62564D] uppercase tracking-wider hover:text-[#701B25] transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#DF905B]" />
                Add Handwritten Blessing Card (Complimentary):
              </span>
              <span className="text-[11px] text-[#806F60] lowercase font-medium">
                {showNoteInput ? 'hide note' : customNote ? 'edit note' : '+ add note'}
              </span>
            </button>

            {(showNoteInput || customNote) && (
              <div className="pt-1 animate-in fade-in">
                <input 
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. 'For Dadi with unconditional love from Amit' or 'Happy Diwali to the family!'"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] text-[#62564D]"
                />
              </div>
            )}
          </div>

        </div>

        {/* Bottom Checkout & Total Bar */}
        <div className="shrink-0 p-3 sm:p-4 px-4 sm:px-6 border-t border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between gap-3 shadow-lg">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-black text-[#701B25] leading-none">
                ₹{selectedJars.length > 0 ? finalBundlePrice : 0}
              </span>
              {selectedJars.length > 0 && (
                <>
                  <span className="text-[10px] sm:text-xs text-[#806F60] line-through">₹{rawSum}</span>
                  <span className="bg-[#285331]/10 text-[#285331] text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded">
                    15% OFF
                  </span>
                </>
              )}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#62564D] truncate mt-0.5">
              {selectedJars.length === boxCapacity 
                ? '✨ Ready to pack into keepsake box' 
                : `${boxCapacity - selectedJars.length} jar(s) remaining`}
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={selectedJars.length < boxCapacity}
            className={`py-2.5 sm:py-3 px-4 sm:px-8 rounded-full font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 sm:gap-2 transition-all shrink-0 ${
              selectedJars.length === boxCapacity
                ? justAdded 
                  ? 'bg-[#285331] text-white' 
                  : 'bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] active:scale-95'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed opacity-75'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#D69A19]" />
                <span>Add Dabba to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
