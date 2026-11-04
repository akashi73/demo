import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  RefreshCw, 
  Phone, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function OrdersAdminModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [orders, setOrders] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {}
    finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {}
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    o.phone.includes(filterQuery)
  );

  const totalRevenue = orders.reduce((acc, o) => acc + (o.finalAmount || 0), 0);
  const totalJarsCount = orders.reduce((acc, o) => acc + o.items.reduce((s, it) => s + (it.quantity || 1), 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-4xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#8F2024]" />
            <div>
              <h3 className="font-serif font-black text-xl text-[#701B25]">
                Naani Pickles Store Orders & Dispatch Desk
              </h3>
              <p className="text-[11px] text-[#806F60]">
                Live Kitchen Fulfillment & Tracking Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={fetchOrders}
              className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Store Metric Cards */}
        <div className="grid grid-cols-3 gap-3 p-4 px-6 bg-[#F7F1DF] border-b border-[#E9DCC7] text-xs">
          <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7]">
            <span className="text-[#806F60] block">Total Orders</span>
            <span className="font-black text-lg text-[#701B25]">{orders.length}</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7]">
            <span className="text-[#806F60] block">Total Revenue</span>
            <span className="font-black text-lg text-[#701B25]">₹{totalRevenue}</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7]">
            <span className="text-[#806F60] block">Bottled Jars Ordered</span>
            <span className="font-black text-lg text-[#D69A19]">{totalJarsCount} Jars</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 px-6 border-b border-[#E9DCC7]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
            <input 
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. NP-84210), Customer Name, or Phone..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#806F60]">
              No orders found matching your search.
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div 
                key={ord.id}
                className="p-4 bg-white rounded-2xl border border-[#E9DCC7] shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E9DCC7]/50">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#701B25]">
                      #{ord.id}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="font-bold text-xs text-[#701B25]">
                      {ord.customerName}
                    </span>
                    <span className="text-xs text-[#806F60] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#806F60]" /> {ord.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#701B25]">
                      ₹{ord.finalAmount}
                    </span>
                    <span className="text-[10px] bg-[#F7F1DF] text-[#701B25] border border-[#E9DCC7] px-2 py-0.5 rounded">
                      {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="text-xs text-[#62564D] space-y-1">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {it.name} ({it.size}) x{it.quantity}</span>
                      <span className="font-medium text-[#701B25]">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address & Status Control */}
                <div className="pt-2 border-t border-[#E9DCC7]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-[#806F60] text-[11px] flex items-center gap-1 truncate max-w-md">
                    <MapPin className="w-3 h-3 text-[#806F60] shrink-0" />
                    <span className="truncate">{ord.address}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#806F60]">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                      className="text-xs font-bold p-1 px-2 rounded-lg border border-[#E9DCC7] bg-[#F7F1DF] text-[#701B25] focus:outline-none"
                    >
                      <option value="Packing in Muslin Cloth">Packing in Muslin Cloth</option>
                      <option value="Handed to Bluedart Express">Handed to Bluedart Express</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
