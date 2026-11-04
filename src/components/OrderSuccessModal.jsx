import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Download, 
  Printer, 
  MessageCircle, 
  Sun, 
  Heart, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

export default function OrderSuccessModal({ order, onClose, onContinueShopping }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppNotify = () => {
    const text = encodeURIComponent(
      `Namaste Naani Pickles! 🙏\nI just placed Order *#${order.id}* for ₹${order.finalAmount}.\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nPlease notify me on WhatsApp when dispatched. Thank you!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-6 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#285331]/10 border-2 border-[#285331] flex items-center justify-center mx-auto text-[#285331] shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          
          <span className="text-xs font-bold text-[#701B25] bg-[#F7F1DF] px-3 py-1 rounded-full uppercase tracking-wider border border-[#E9DCC7]">
            Aashirwaad! Order Confirmed
          </span>

          <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#701B25] leading-tight">
            Thank you, {order.customerName}!
          </h3>

          <p className="text-xs text-[#62564D] max-w-sm mx-auto">
            Your authentic sun-cured pickles are being carefully hand-tied in muslin cloth and packed in protective straw cushioning.
          </p>
        </div>

        {/* Order Meta Pill */}
        <div className="bg-[#F7F1DF] p-4 rounded-2xl border border-[#E9DCC7] flex items-center justify-between text-xs">
          <div>
            <span className="text-[#806F60] block">Order Number</span>
            <span className="font-mono font-black text-sm text-[#701B25]">{order.id}</span>
          </div>

          <div>
            <span className="text-[#806F60] block">Estimated Delivery</span>
            <span className="font-bold text-[#701B25]">{order.estimatedDelivery}</span>
          </div>

          <div>
            <span className="text-[#806F60] block">Payment Mode</span>
            <span className="font-bold text-[#285331]">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Order Fulfillment Timeline */}
        <div className="space-y-2 pt-2">
          <h4 className="text-[11px] font-bold text-[#806F60] uppercase tracking-wider">
            Preparation & Dispatch Journey:
          </h4>
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="p-2 bg-[#285331]/10 border border-[#285331]/30 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#285331] mx-auto block mb-1" />
              <div className="text-[10px] font-bold text-[#285331]">Received</div>
            </div>

            <div className="p-2 bg-[#F7F1DF] border border-[#D69A19] rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#D69A19] mx-auto block mb-1 animate-ping" />
              <div className="text-[10px] font-bold text-[#701B25]">Muslin Packing</div>
            </div>

            <div className="p-2 bg-stone-100 border border-stone-200 rounded-xl opacity-60">
              <span className="w-2 h-2 rounded-full bg-stone-400 mx-auto block mb-1" />
              <div className="text-[10px] text-stone-600">Dispatched</div>
            </div>

            <div className="p-2 bg-stone-100 border border-stone-200 rounded-xl opacity-60">
              <span className="w-2 h-2 rounded-full bg-stone-400 mx-auto block mb-1" />
              <div className="text-[10px] text-stone-600">At Dining Table</div>
            </div>
          </div>
        </div>

        {/* Itemized Order Summary */}
        <div className="p-4 bg-white rounded-2xl border border-[#E9DCC7] space-y-2 text-xs">
          <div className="font-bold text-[#701B25] pb-1 border-b border-[#E9DCC7] flex justify-between">
            <span>Ordered Jars ({order.items.length})</span>
            <span>Subtotal</span>
          </div>
          
          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center text-[#62564D]">
                <span className="truncate pr-2">
                  • {it.name} ({it.size}) x{it.quantity}
                </span>
                <span className="font-semibold text-[#701B25] shrink-0">
                  ₹{it.price * it.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E9DCC7] space-y-1 text-[#62564D]">
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#285331]">
                <span>Promotional Discount:</span>
                <span>-₹{order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-[#701B25] pt-1 border-t border-[#E9DCC7]">
              <span>Total Paid / Due:</span>
              <span className="text-[#701B25]">₹{order.finalAmount}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address Details */}
        <div className="p-3 bg-[#F7F1DF] rounded-xl text-xs text-[#62564D] border border-[#E9DCC7]">
          <span className="font-bold text-[#701B25] block">Shipping To:</span>
          <div>{order.address}</div>
          <div>Mobile: {order.phone}</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button 
            onClick={handleWhatsAppNotify}
            className="w-full py-3 rounded-full bg-[#285331] hover:bg-[#1f4126] text-[#FFF8E9] font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#D69A19]" />
            <span>Get Live WhatsApp Dispatch Alerts</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handlePrint}
              className="py-2.5 rounded-full border border-[#D69A19] hover:bg-[#F7F1DF] text-[#701B25] font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>

            <button 
              onClick={onContinueShopping}
              className="py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
