import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Sun, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Eye, 
  MapPin, 
  MessageCircle, 
  Plus, 
  Minus 
} from 'lucide-react';
import { useMouseParallax } from '../hooks/useParallax';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    product.sizes.findIndex(s => s.popular) !== -1 ? product.sizes.findIndex(s => s.popular) : 0
  );
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { bind: cardTiltBind, isHovered } = useMouseParallax({ maxTilt: 3.5, perspective: 900 });

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const discountPercent = Math.round(
    ((currentSize.originalPrice - currentSize.price) / currentSize.originalPrice) * 100
  );

  const handleAddToCart = () => {
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

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Namaste Naani Pickles! 🙏\nI would like to order:\n• Product: ${product.name} (${product.hindiName})\n• Size: ${currentSize.size}\n• Quantity: ${quantity}\n• Total: ₹${currentSize.price * quantity}\n\nPlease share payment details and dispatch estimate.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div 
      {...cardTiltBind}
      className="group relative bg-[#FFFFFF] rounded-xl sm:rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:border-[#D69A19] h-full w-full min-w-0"
      style={{
        ...cardTiltBind.style,
        transformStyle: 'preserve-3d'
      }}
    >
      
      {/* Top Image Container */}
      <div 
        className="relative aspect-square sm:aspect-[4/3] bg-[#F7F1DF] overflow-hidden cursor-pointer w-full min-w-0" 
        onClick={() => onQuickView(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Floating Badges */}
        <div 
          className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 items-start max-w-[70%]"
          style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)', transition: 'transform 0.2s' }}
        >
          {product.badge && (
            <span className="bg-[#E5AC28] text-[#701B25] text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md uppercase tracking-wider truncate max-w-full">
              {product.badge}
            </span>
          )}
          {product.sunDays > 0 && (
            <span className="bg-[#F7F1DF]/95 backdrop-blur-sm text-[#701B25] border border-[#E9DCC7] text-[7px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm whitespace-nowrap">
              <Sun className="w-2.5 h-2.5 text-[#D69A19] shrink-0" /> 
              <span>{product.sunDays}d Sun-Cured</span>
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 p-1 sm:p-2 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
            isWishlisted 
              ? 'bg-[#F7F1DF] text-[#701B25] scale-110' 
              : 'bg-white/85 text-[#62564D] hover:text-[#701B25] hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Hover Pill (desktop) */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#701B25] font-bold text-xs shadow-xl flex items-center gap-1.5 pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#8F2024]" /> Quick View
          </span>
        </div>

        {/* Bottom Origin Pill */}
        <div className="absolute bottom-1 left-1.5 sm:bottom-2.5 sm:left-3 text-[#FFF8E9] text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5 drop-shadow-md z-10 truncate max-w-[60%]">
          <MapPin className="w-2.5 h-2.5 text-[#D69A19] shrink-0" />
          <span className="truncate">{product.origin ? product.origin.split(',')[0] : 'Varanasi'}</span>
        </div>

        {/* Spice Level Indicator in Image Corner */}
        <div className="absolute bottom-1 right-1.5 sm:bottom-2.5 sm:right-3 bg-black/60 backdrop-blur-sm px-1 sm:px-1.5 py-0.5 rounded-full flex items-center gap-0.5 text-[7px] sm:text-[9px] text-[#D69A19] font-semibold z-10">
          <div className="flex leading-none">
            {[...Array(4)].map((_, i) => (
              <span 
                key={i} 
                className={i < product.spiceLevel ? 'text-[#DF905B] font-bold' : 'text-stone-500 opacity-30'}
              >
                🌶️
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 min-w-0">
        
        <div className="min-w-0">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-xs text-stone-500 mb-0.5 min-w-0">
            <span className="text-[#DF905B] font-bold uppercase tracking-wider text-[8px] sm:text-[10px] truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 bg-[#F7F1DF] px-1 py-0.2 rounded border border-[#E9DCC7] shrink-0 text-[9px] sm:text-[11px]">
              <span className="text-[#D69A19]">★</span>
              <span className="font-bold text-[#701B25]">{product.rating}</span>
            </div>
          </div>

          {/* Title and Hindi Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-xs sm:text-base text-[#701B25] group-hover:text-[#8F2024] transition-colors leading-snug cursor-pointer line-clamp-1 truncate"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-[9px] sm:text-[11px] font-serif text-[#DF905B] truncate mt-0.5">
            {product.hindiName}
          </p>

          {/* Short Tagline - hidden on mobile to keep cards compact and aligned */}
          <p className="text-[11px] text-[#62564D] line-clamp-2 mt-1 leading-relaxed hidden sm:block">
            {product.tagline}
          </p>
        </div>

        {/* Jar Size Selector Tabs */}
        <div className="min-w-0">
          <label className="text-[8px] sm:text-[10px] font-semibold text-[#806F60] uppercase tracking-wider block mb-0.5">
            Packaging:
          </label>
          <div className="grid grid-cols-3 gap-1 min-w-0">
            {product.sizes.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                className={`py-1 px-0.5 rounded-lg text-center border relative min-w-0 transition-all ${
                  selectedSizeIndex === idx 
                    ? 'bg-[#F7F1DF] border-[#8F2024] text-[#701B25] shadow-sm font-bold' 
                    : 'bg-[#FFFCF6] border-[#E9DCC7] text-[#62564D] hover:bg-[#F7F1DF]'
                }`}
              >
                <div className="text-[8px] sm:text-[10px] truncate">{s.size.split(' ')[0]}</div>
                <div className="text-[7px] sm:text-[9px] text-[#806F60] font-medium">₹{s.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Quantity Stepper */}
        <div className="pt-1.5 sm:pt-2 border-t border-[#E9DCC7] min-w-0">
          <div className="flex items-baseline justify-between gap-1 mb-1.5 sm:mb-2 min-w-0">
            <div className="flex items-baseline gap-1 min-w-0 truncate">
              <span className="text-sm sm:text-lg font-black text-[#701B25] tracking-tight">
                ₹{currentSize.price * quantity}
              </span>
              {currentSize.originalPrice && (
                <span className="text-[9px] sm:text-[11px] text-[#806F60] line-through">
                  ₹{currentSize.originalPrice * quantity}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#285331]/10 text-[#285331] text-[7px] sm:text-[9px] font-bold px-1 py-0.2 rounded whitespace-nowrap hidden xs:inline">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#E9DCC7] rounded-md overflow-hidden bg-[#F7F1DF] shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 sm:px-1.5 sm:py-0.5 text-[#701B25] hover:bg-[#ebdaba] transition-colors"
                title="Decrease"
              >
                <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              </button>
              <span className="px-1 text-[9px] sm:text-[11px] font-bold text-[#701B25]">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 sm:px-1.5 sm:py-0.5 text-[#701B25] hover:bg-[#ebdaba] transition-colors"
                title="Increase"
              >
                <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & WhatsApp */}
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs shadow-sm transition-all flex items-center justify-center gap-1 transform active:scale-95 min-w-0 ${
                justAdded 
                  ? 'bg-[#285331] text-[#FFF8E9]' 
                  : 'bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] hover:shadow-md'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3 h-3 text-[#FFF8E9] shrink-0" />
                  <span className="truncate">Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 text-[#D69A19] shrink-0" />
                  <span className="truncate">Add • ₹{currentSize.price * quantity}</span>
                </>
              )}
            </button>

            <button 
              onClick={handleWhatsAppOrder}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#285331]/10 hover:bg-[#285331]/20 text-[#285331] border border-[#285331]/30 flex items-center justify-center transition-colors shadow-sm shrink-0"
              title="1-Click WhatsApp Order"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#285331]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
