import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  Tag, 
  Gift, 
  MessageCircle, 
  Check, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedCheckout 
}) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Cart financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShip = Math.max(0, freeShippingThreshold - subtotal);
  
  // Shipping calculation: Free if >= 499 or if coupon grants free shipping
  let shippingFee = subtotal >= freeShippingThreshold || appliedCoupon?.freeShipping ? 0 : 70;
  if (cartItems.length === 0) shippingFee = 0;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = appliedCoupon.discountAmount || 0;
  }

  const giftWrapFee = giftWrap ? 40 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + giftWrapFee);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponError('');
    setIsApplyingCoupon(true);

    try {
      const res = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponInput.trim(),
          cartTotal: subtotal
        })
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedCoupon(data);
        setCouponInput('');
      } else {
        setCouponError(data.message || 'Invalid promo code');
      }
    } catch (err) {
      setCouponError('Unable to apply promo code right now');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsSummary = cartItems.map((item, idx) => 
      `${idx + 1}. ${item.name} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    let text = `Namaste Naani Pickles! 🙏\nI would like to place an order:\n\n${itemsSummary}\n\n`;
    text += `Subtotal: ₹${subtotal}\n`;
    if (discountAmount > 0) text += `Discount (${appliedCoupon.code}): -₹${discountAmount}\n`;
    text += `Shipping: ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}\n`;
    if (giftWrap) text += `Gift Wrap with Note: ₹${giftWrapFee}\n`;
    text += `*Final Amount: ₹${finalTotal}*\n\n`;
    if (giftNote) text += `Gift Note: "${giftNote}"\n\n`;
    text += `Please send payment link (UPI / GPay) and dispatch time. Dhanyawaad!`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#FBF7EF] h-full shadow-2xl flex flex-col border-l border-[#E9DCC7] transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8F2024]" />
            <h3 className="font-serif font-black text-xl text-[#701B25]">
              Your Kitchen Basket
            </h3>
            <span className="bg-[#8F2024] text-[#FFF8E9] text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#F7F1DF] border-b border-[#E9DCC7]">
          <div className="flex items-center justify-between text-xs font-medium text-[#62564D] mb-1.5">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-[#D69A19]" />
              {amountNeededForFreeShip === 0 ? (
                <strong className="text-[#285331] font-bold">🎉 You unlocked FREE Express Pan-India Shipping!</strong>
              ) : (
                <span>Add <strong className="text-[#8F2024]">₹{amountNeededForFreeShip}</strong> more for Free Shipping</span>
              )}
            </span>
            <span className="text-[11px] font-bold text-[#806F60]">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-[#E9DCC7] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#D69A19] to-[#285331] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Item List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F7F1DF] flex items-center justify-center text-3xl mx-auto text-[#D69A19]">
                🥒
              </div>
              <h4 className="font-serif font-bold text-lg text-[#701B25]">
                Your basket is empty!
              </h4>
              <p className="text-xs text-[#806F60] max-w-xs mx-auto">
                No jars added yet. Discover our sun-cured Ramkela Mango, Banarasi Lal Mirch, or spicy Chutneys.
              </p>
              <button 
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs shadow"
              >
                Browse Handcrafted Pickles
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div 
                key={`${item.productId}-${item.size}-${idx}`}
                className="p-3.5 bg-white rounded-2xl border border-[#E9DCC7] shadow-sm flex gap-3 items-center"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E9DCC7]" 
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#701B25] truncate">
                      {item.name}
                    </h5>
                    <button 
                      onClick={() => onRemoveItem(item.productId, item.size)}
                      className="text-[#806F60] hover:text-[#701B25] p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-[#806F60] font-medium">
                    {item.size}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm text-[#701B25]">
                      ₹{item.price * item.quantity}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E9DCC7] rounded-lg overflow-hidden bg-[#F7F1DF] text-xs">
                      <button 
                        onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="px-2 py-1 text-[#701B25] hover:bg-[#ebdaba]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-[#701B25]">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="px-2 py-1 text-[#701B25] hover:bg-[#ebdaba]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Coupon Code Section */}
          {cartItems.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                    <input 
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Try NAANI10 or PEHLIKHOJ"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white uppercase font-mono text-[#62564D]"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isApplyingCoupon || !couponInput.trim()}
                    className="px-4 py-2 rounded-xl bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] border border-[#D69A19] font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </div>

                {couponError && (
                  <p className="text-[11px] text-[#8F2024] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {couponError}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="p-2 bg-[#285331]/10 rounded-xl border border-[#285331]/30 flex items-center justify-between text-xs text-[#285331]">
                    <span className="font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#285331]" />
                      {appliedCoupon.code} applied (-₹{discountAmount})
                    </span>
                    <button 
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-[#806F60] hover:text-[#701B25] underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Gift Packaging Checkbox */}
          {cartItems.length > 0 && (
            <div className="p-3.5 bg-white rounded-2xl border border-[#E9DCC7] space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 text-xs font-bold text-[#62564D]">
                  <Gift className="w-4 h-4 text-[#D69A19]" />
                  Add Festive Muslin Gift Wrap (+₹40)
                </span>
                <input 
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 text-[#8F2024] rounded border-[#E9DCC7] focus:ring-[#8F2024]"
                />
              </label>

              {giftWrap && (
                <input 
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter handwritten note for recipient..."
                  className="w-full text-xs p-2 rounded-lg border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                />
              )}
            </div>
          )}

        </div>

        {/* Bottom Total & Checkout Bar */}
        {cartItems.length > 0 && (
          <div className="p-4 px-6 border-t border-[#E9DCC7] bg-[#FFFCF6] space-y-3">
            
            {/* Bill Summary */}
            <div className="space-y-1 text-xs text-[#62564D]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#701B25]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#285331] font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code}):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingFee === 0 ? <strong className="text-[#285331]">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              {giftWrap && (
                <div className="flex justify-between">
                  <span>Gift Wrapping:</span>
                  <span>₹{giftWrapFee}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#701B25] pt-2 border-t border-[#E9DCC7]">
                <span>Final Total:</span>
                <span className="text-[#701B25]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Buttons: Proceed to Checkout and WhatsApp Checkout */}
            <div className="space-y-2 pt-1">
              <button 
                onClick={() => {
                  onProceedCheckout({
                    subtotal,
                    discountAmount,
                    shippingFee,
                    giftWrapFee,
                    finalTotal,
                    appliedCoupon: appliedCoupon?.code || null,
                    giftNote: giftWrap ? giftNote : null
                  });
                }}
                className="w-full py-3.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <span>Proceed to Checkout • ₹{finalTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 rounded-full bg-[#285331]/10 hover:bg-[#285331]/20 text-[#285331] border border-[#285331]/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#285331]" />
                <span>Instant 1-Click WhatsApp Order</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#806F60] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#285331]" /> 100% Authentic
              </span>
              <span>•</span>
              <span>UPI / Cards / COD Available</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
