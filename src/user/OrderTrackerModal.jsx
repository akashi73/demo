import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Package, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function OrderTrackerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [orderQuery, setOrderQuery] = useState('NP-60950');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderQuery.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/orders/track/${orderQuery.trim()}`);
      const data = await res.json();
      if (res.ok) {
        setTrackingData(data);
      } else {
        setErrorMsg(data.error || 'Order not found. Please verify your Order ID (e.g. NP-60950).');
        setTrackingData(null);
      }
    } catch (err) {
      setErrorMsg('Network error checking order status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-lg w-full border border-[#E9DCC7] shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1.5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7] flex items-center justify-center text-[#701B25] mx-auto shadow-sm">
            <Truck className="w-7 h-7" />
          </div>
          <h3 className="font-serif font-black text-2xl text-[#701B25]">
            Track Your Pickle Order
          </h3>
          <p className="text-xs text-[#62564D]">
            Enter your Order ID (e.g. <strong>NP-60950</strong>) or Airway Bill tracking number.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="space-y-3 mb-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#806F60] absolute left-3 top-3.5" />
              <input 
                type="text"
                required
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                placeholder="e.g. NP-60950"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] font-mono text-xs focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D] uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-[#8F2024] hover:bg-[#701B25] text-white font-bold text-xs shadow transition-all disabled:opacity-50 flex items-center gap-1"
            >
              {isLoading ? 'Tracking...' : 'Track'}
            </button>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
            </p>
          )}
        </form>

        {/* Tracking Details View */}
        {trackingData && trackingData.order && (
          <div className="bg-white p-5 rounded-2xl border border-[#E9DCC7] space-y-4 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9DCC7]/50 text-xs">
              <div>
                <span className="font-mono font-bold text-sm text-[#701B25]">#{trackingData.order.id}</span>
                <span className="text-[11px] text-[#806F60] block">Customer: {trackingData.order.customerName}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#285331] bg-[#285331]/10 px-2.5 py-0.5 rounded-full border border-[#285331]/20">
                  {trackingData.order.status}
                </span>
                <span className="text-[10px] text-[#806F60] block mt-0.5">Est. {trackingData.estimatedDelivery}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3.5 py-1">
              {trackingData.stages.map((stg, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i < trackingData.stages.length - 1 && (
                    <div className={`absolute top-5 left-2.5 w-0.5 h-8 ${
                      stg.completed ? 'bg-[#285331]' : 'bg-[#E9DCC7]'
                    }`} />
                  )}

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    stg.completed ? 'bg-[#285331] text-white' : stg.current ? 'bg-[#D69A19] text-white animate-pulse' : 'bg-stone-200 text-stone-400'
                  }`}>
                    {stg.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[9px] font-bold">{i + 1}</span>}
                  </div>

                  <div className="text-xs">
                    <span className={`font-bold ${stg.completed ? 'text-[#285331]' : stg.current ? 'text-[#8F2024]' : 'text-[#806F60]'}`}>
                      {stg.name}
                    </span>
                    <span className="text-[10px] text-[#806F60] block leading-tight">{stg.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Courier info */}
            <div className="pt-2 border-t border-[#E9DCC7]/50 text-[11px] text-[#62564D] flex items-center justify-between">
              <span>Courier: <strong className="text-[#701B25]">{trackingData.courier}</strong></span>
              <span className="font-mono text-[#806F60]">AWB: {trackingData.trackingNumber}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
