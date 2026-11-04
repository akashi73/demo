import React, { useState } from 'react';
import { 
  X, 
  Sun, 
  Flame, 
  ShieldCheck, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Share2, 
  MessageCircle, 
  Check, 
  Sparkles,
  Award,
  UtensilsCrossed,
  Info
} from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    product.sizes.findIndex(s => s.popular) !== -1 ? product.sizes.findIndex(s => s.popular) : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('story'); // 'story', 'ingredients', 'pairings'

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const discountPercent = Math.round(
    ((currentSize.originalPrice - currentSize.price) / currentSize.originalPrice) * 100
  );

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      hindiName: product.hindiName,
      image: product.image,
      size: currentSize.size,
      price: currentSize.price,
      originalPrice: currentSize.originalPrice,
      quantity: quantity
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste Naani Pickles! 🙏\nI'm looking at: ${product.name} (${product.hindiName})\nPackaging: ${currentSize.size}\nPrice: ₹${currentSize.price * quantity}\nPlease assist me with dispatch and queries.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-4xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close & Share Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6]">
          <div className="flex items-center gap-2">
            <span className="bg-[#8F2024] text-[#FFF8E9] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-xs text-[#806F60] font-mono">
              {product.batch}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-colors ${
                isWishlisted ? 'bg-[#F7F1DF] text-[#701B25] border-[#D69A19]' : 'bg-white text-[#62564D] border-[#E9DCC7] hover:bg-[#F7F1DF]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image & Taste Profile */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/4] bg-stone-100 shadow-md border border-[#E9DCC7]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {product.sunDays > 0 && (
                  <div className="absolute top-3 left-3 bg-[#E5AC28] text-[#701B25] font-black text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <Sun className="w-3.5 h-3.5 text-[#701B25]" /> {product.sunDays} Days Sun Cured
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2.5 text-white text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D69A19]" />
                    <span>{product.origin}</span>
                  </div>
                  <span className="text-[#E5AC28] font-bold">{product.harvestYear}</span>
                </div>
              </div>

              {/* Taste Radar Indicators */}
              <div className="bg-[#F7F1DF] p-4 rounded-2xl border border-[#E9DCC7] space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#701B25] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#DF905B]" /> Naani's Taste Index (स्वाद मीटर)
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[#62564D] font-medium mb-1">
                      <span>Tanginess (खट्टापन)</span>
                      <span className="font-bold text-[#701B25]">{product.tasteProfile.tanginess * 10}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D69A19] rounded-full" style={{ width: `${product.tasteProfile.tanginess * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#62564D] font-medium mb-1">
                      <span>Spiciness (तीखापन)</span>
                      <span className="font-bold text-[#701B25]">{product.tasteProfile.spiciness * 10}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8F2024] rounded-full" style={{ width: `${product.tasteProfile.spiciness * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#62564D] font-medium mb-1">
                      <span>Crunchiness (कुरकुरापन)</span>
                      <span className="font-bold text-[#701B25]">{product.tasteProfile.crunch * 10}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#DF905B] rounded-full" style={{ width: `${product.tasteProfile.crunch * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#62564D] font-medium mb-1">
                      <span>Aroma (सोंधी सुगंध)</span>
                      <span className="font-bold text-[#701B25]">{product.tasteProfile.aroma * 10}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#285331] rounded-full" style={{ width: `${product.tasteProfile.aroma * 10}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Oil Base & Clean Label Guarantee */}
              <div className="p-3 bg-white rounded-xl border border-[#E9DCC7] text-xs space-y-1">
                <div className="text-[#806F60]">Base Oil:</div>
                <div className="font-bold text-[#701B25] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#285331]" />
                  {product.oilBase}
                </div>
              </div>
            </div>

            {/* Right Product Overview & Ordering */}
            <div className="md:col-span-7 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-[#D69A19] text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <span className="font-bold text-[#701B25] text-sm">{product.rating}</span>
                  <span className="text-[#806F60] text-xs">({product.reviewsCount} customer reviews)</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#701B25] leading-tight">
                  {product.name}
                </h2>
                <p className="font-serif text-sm font-semibold text-[#DF905B] mt-0.5">
                  {product.hindiName}
                </p>

                <p className="text-sm text-[#62564D] mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Packaging Size Selector */}
              <div>
                <label className="text-xs font-bold text-[#62564D] uppercase tracking-wider block mb-2">
                  Select Packaging & Jar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        selectedSizeIndex === idx 
                          ? 'border-[#8F2024] bg-[#F7F1DF] shadow-md ring-1 ring-[#8F2024]' 
                          : 'border-[#E9DCC7] bg-white hover:bg-[#F7F1DF]'
                      }`}
                    >
                      {s.popular && (
                        <span className="absolute -top-2 right-2 bg-[#8F2024] text-[#FFF8E9] text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                          POPULAR
                        </span>
                      )}
                      <div className="font-bold text-xs text-[#701B25] leading-tight">
                        {s.size}
                      </div>
                      <div className="text-[11px] text-[#806F60] mt-0.5">
                        {s.label}
                      </div>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="font-black text-sm text-[#701B25]">₹{s.price}</span>
                        {s.originalPrice && (
                          <span className="text-[10px] text-[#806F60] line-through">₹{s.originalPrice}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Quantity Purchase Controls */}
              <div className="p-4 bg-white rounded-2xl border border-[#E9DCC7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#806F60]">Total Price:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#701B25]">
                        ₹{currentSize.price * quantity}
                      </span>
                      {currentSize.originalPrice && (
                        <span className="text-sm text-[#806F60] line-through">
                          ₹{currentSize.originalPrice * quantity}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="bg-[#285331]/10 text-[#285331] text-xs font-bold px-2 py-0.5 rounded">
                          Save {discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-[#E9DCC7] rounded-xl overflow-hidden bg-[#F7F1DF]">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-[#701B25] hover:bg-[#ebdaba] font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-bold text-[#701B25]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-[#701B25] hover:bg-[#ebdaba] font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button 
                    onClick={handleAdd}
                    className={`py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                      justAdded 
                        ? 'bg-[#285331] text-[#FFF8E9]' 
                        : 'bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] hover:shadow-lg'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#D69A19]" /> Add to Cart (₹{currentSize.price * quantity})
                      </>
                    )}
                  </button>

                  <button 
                    onClick={handleWhatsApp}
                    className="py-3 px-4 rounded-xl bg-[#285331]/10 hover:bg-[#285331]/20 text-[#285331] border border-[#285331]/30 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#285331]" /> Order via WhatsApp
                  </button>
                </div>
              </div>

              {/* Detail Tabs: Story, Ingredients, Pairings */}
              <div className="pt-2">
                <div className="flex border-b border-[#E9DCC7]">
                  <button 
                    onClick={() => setActiveTab('story')}
                    className={`pb-2 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === 'story' 
                        ? 'border-[#8F2024] text-[#8F2024]' 
                        : 'border-transparent text-[#806F60] hover:text-[#701B25]'
                    }`}
                  >
                    Heritage Lore (कथा)
                  </button>
                  <button 
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === 'ingredients' 
                        ? 'border-[#8F2024] text-[#8F2024]' 
                        : 'border-transparent text-[#806F60] hover:text-[#701B25]'
                    }`}
                  >
                    Pure Ingredients
                  </button>
                  <button 
                    onClick={() => setActiveTab('pairings')}
                    className={`pb-2 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === 'pairings' 
                        ? 'border-[#8F2024] text-[#8F2024]' 
                        : 'border-transparent text-[#806F60] hover:text-[#701B25]'
                    }`}
                  >
                    Naani's Pairings
                  </button>
                </div>

                <div className="py-3 text-xs leading-relaxed text-[#62564D] min-h-[90px]">
                  {activeTab === 'story' && (
                    <p className="font-sans italic bg-[#F7F1DF] p-3 rounded-xl border border-[#E9DCC7]">
                      "{product.fullStory}"
                    </p>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="grid grid-cols-2 gap-2">
                      {product.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-[#E9DCC7]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D69A19]" />
                          <span className="text-[#62564D] font-medium">{ing}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'pairings' && (
                    <div className="space-y-2">
                      {product.pairings.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 bg-[#F7F1DF] p-2 rounded-lg border border-[#E9DCC7]">
                          <UtensilsCrossed className="w-4 h-4 text-[#8F2024] shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
