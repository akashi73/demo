import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function WishlistModal({ 
  isOpen, 
  onClose, 
  wishlistIds, 
  onRemoveWishlist, 
  onAddToCart,
  onQuickView 
}) {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-lg w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#701B25] fill-[#701B25]" />
            <h3 className="font-serif font-black text-xl text-[#701B25]">
              Saved Favorite Jars ({wishlistedProducts.length})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#806F60] space-y-2">
              <div className="text-3xl">❤️</div>
              <p className="font-serif font-bold text-base text-[#701B25]">No favorite pickles saved yet</p>
              <p>Click the heart icon on any pickle card to save it for later.</p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div 
                key={p.id}
                className="p-3.5 bg-white rounded-2xl border border-[#E9DCC7] shadow-sm flex items-center gap-3"
              >
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer border border-[#E9DCC7]"
                  onClick={() => {
                    onClose();
                    onQuickView(p);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h5 
                    onClick={() => {
                      onClose();
                      onQuickView(p);
                    }}
                    className="font-serif font-bold text-xs sm:text-sm text-[#701B25] truncate cursor-pointer hover:text-[#8F2024]"
                  >
                    {p.name}
                  </h5>
                  <div className="text-[11px] text-[#DF905B] font-serif">
                    {p.hindiName}
                  </div>
                  <div className="font-black text-sm text-[#701B25] mt-1">
                    ₹{p.sizes[0].price} <span className="text-[10px] text-[#806F60] font-normal">({p.sizes[0].size})</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button 
                    onClick={() => {
                      onAddToCart({
                        productId: p.id,
                        name: p.name,
                        hindiName: p.hindiName,
                        image: p.image,
                        size: p.sizes[0].size,
                        price: p.sizes[0].price,
                        originalPrice: p.sizes[0].originalPrice,
                        quantity: 1
                      });
                    }}
                    className="p-2 rounded-xl bg-[#8F2024] text-[#FFF8E9] hover:bg-[#701B25] transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => onRemoveWishlist(p.id)}
                    className="p-2 rounded-xl text-[#806F60] hover:text-[#701B25] hover:bg-[#F7F1DF] transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
