import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  ShoppingBag, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  LogOut, 
  RefreshCw, 
  ExternalLink,
  PackageCheck,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function UserAccountModal({ 
  isOpen, 
  onClose, 
  user, 
  onLogout,
  onReorder,
  onOpenQuickTracker
}) {
  if (!isOpen || !user) return null;

  const [orders, setOrders] = useState([]);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const id = encodeURIComponent(user.email || user.phone || user.name);
      const res = await fetch(`/api/user/orders/${id}`);
      const data = await res.json();
      setOrders(data || []);
      if (data && data.length > 0 && !selectedOrderForTracking) {
        // default select latest order
        handleTrackOrder(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackOrder = async (order) => {
    setSelectedOrderForTracking(order);
    try {
      const res = await fetch(`/api/orders/track/${order.id}`);
      const data = await res.json();
      if (res.ok) {
        setTrackingDetails(data);
      }
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-4xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7] flex items-center justify-center text-[#701B25] font-bold text-lg shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-xl text-[#701B25]">
                  {user.name}'s Account
                </h3>
                <span className="bg-[#285331]/10 text-[#285331] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified Member
                </span>
              </div>
              <p className="text-[11px] text-[#62564D]">
                {user.email} • {user.phone || 'No phone added'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchUserOrders}
              className="p-2 rounded-xl bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-[#8F2024]/10 hover:bg-[#8F2024]/20 text-[#8F2024] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Workspace */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Order History List */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#E9DCC7]">
                <h4 className="font-serif font-black text-base text-[#701B25] flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#8F2024]" />
                  Your Buying History ({orders.length})
                </h4>
                <span className="text-[11px] text-[#806F60] font-medium">Click order to track live</span>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-[#E9DCC7] space-y-2">
                  <div className="text-3xl">🥒</div>
                  <h5 className="font-serif font-bold text-sm text-[#701B25]">No orders placed yet</h5>
                  <p className="text-xs text-[#806F60]">Discover our 12 sun-cured pickles and place your first order!</p>
                </div>
              ) : (
                orders.map((ord) => {
                  const isSelected = selectedOrderForTracking && selectedOrderForTracking.id === ord.id;
                  return (
                    <div 
                      key={ord.id}
                      onClick={() => handleTrackOrder(ord)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                        isSelected 
                          ? 'border-[#701B25] bg-[#F7F1DF] shadow-md ring-1 ring-[#701B25]' 
                          : 'border-[#E9DCC7] bg-white hover:border-[#D69A19] hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-[#701B25]">#{ord.id}</span>
                          <span className="text-stone-400">•</span>
                          <span className="text-[#806F60] text-[11px]">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <span className="font-black text-sm text-[#701B25]">₹{ord.finalAmount}</span>
                      </div>

                      {/* Items */}
                      <div className="text-xs text-[#62564D] space-y-0.5">
                        {ord.items && ord.items.map((it, idx) => (
                          <div key={idx} className="truncate">
                            • {it.name} ({it.size}) x{it.quantity}
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#E9DCC7]/50 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            ord.status === 'Delivered' ? 'bg-[#285331]' : 'bg-[#D69A19] animate-pulse'
                          }`} />
                          <span className="font-bold text-[#62564D] text-[11px]">{ord.status}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onReorder && ord.items) onReorder(ord.items);
                            }}
                            className="text-[11px] font-bold text-[#8F2024] hover:underline flex items-center gap-0.5"
                          >
                            <RotateCcw className="w-3 h-3" /> Re-Order
                          </button>
                          <ChevronRight className="w-4 h-4 text-stone-400" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Live Order Tracking Timeline */}
            <div className="lg:col-span-6 space-y-4">
              <div className="pb-1 border-b border-[#E9DCC7] flex items-center justify-between">
                <h4 className="font-serif font-black text-base text-[#701B25] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D69A19]" />
                  Live Order Tracking Timeline
                </h4>
                {selectedOrderForTracking && (
                  <span className="font-mono text-xs font-bold text-[#701B25]">
                    #{selectedOrderForTracking.id}
                  </span>
                )}
              </div>

              {selectedOrderForTracking && trackingDetails ? (
                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-5">
                  
                  {/* Courier Card */}
                  <div className="bg-[#F7F1DF] p-4 rounded-2xl border border-[#E9DCC7] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#806F60] uppercase tracking-wider block">Courier Partner</span>
                      <span className="font-serif font-bold text-sm text-[#701B25]">{trackingDetails.courier}</span>
                      <div className="text-[11px] font-mono text-[#8F2024]">
                        AWB: {trackingDetails.trackingNumber}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#806F60] uppercase tracking-wider block">Estimated Arrival</span>
                      <span className="font-bold text-xs text-[#285331]">{trackingDetails.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* 5-Stage Interactive Timeline */}
                  <div className="space-y-4 pt-1">
                    {trackingDetails.stages.map((stg, i) => (
                      <div key={i} className="flex gap-3 relative">
                        {/* Connecting Line */}
                        {i < trackingDetails.stages.length - 1 && (
                          <div className={`absolute top-6 left-3 w-0.5 h-10 ${
                            stg.completed ? 'bg-[#285331]' : 'bg-[#E9DCC7]'
                          }`} />
                        )}

                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          stg.completed 
                            ? 'bg-[#285331] text-white' 
                            : stg.current 
                              ? 'bg-[#D69A19] text-white animate-pulse ring-4 ring-[#D69A19]/30' 
                              : 'bg-stone-200 text-stone-400'
                        }`}>
                          {stg.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-[10px] font-bold">{i + 1}</span>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className={`text-xs font-bold ${
                            stg.completed ? 'text-[#285331]' : stg.current ? 'text-[#8F2024]' : 'text-[#806F60]'
                          }`}>
                            {stg.name}
                          </div>
                          <div className="text-[11px] text-[#806F60] leading-tight">
                            {stg.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Location pill */}
                  <div className="pt-3 border-t border-[#E9DCC7]/50 text-xs text-[#62564D] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#8F2024] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#701B25]">Delivering to:</strong> {selectedOrderForTracking.customerName}
                      <div className="text-[11px] text-[#806F60]">{selectedOrderForTracking.address}</div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-[#E9DCC7] text-xs text-[#806F60]">
                  Select an order on the left to inspect its live courier timeline.
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
