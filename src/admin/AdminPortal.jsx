import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  ShoppingBag, 
  CreditCard, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  DollarSign, 
  Tag, 
  Layers, 
  Flame, 
  Sun, 
  ExternalLink, 
  LogOut, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  RefreshCw,
  SlidersHorizontal,
  Key,
  FileText
} from 'lucide-react';
import BlogAdminSection from './BlogAdminSection';

export default function AdminPortal({ 
  isOpen, 
  onClose, 
  adminUser, 
  onLogout,
  onProductUpdated // callback to tell App.jsx to refresh products catalog
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'orders', 'razorpay'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  // Edit / Add Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    hindiName: '',
    category: 'Mango Specials',
    tagline: '',
    description: '',
    fullStory: '',
    badge: 'Artisanal Batch',
    isBestseller: false,
    price: 360,
    spiceLevel: 2,
    spiceText: 'Medium Zing',
    oilBase: 'Kachi Ghani Mustard Oil',
    sunDays: 21,
    origin: 'Varanasi, Uttar Pradesh',
    harvestYear: 'Harvest 2026',
    ingredients: 'Raw Mango, Mustard Oil, Fenugreek, Fennel, Sendha Namak, Turmeric, Hing',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    inStock: true
  });

  // Razorpay Gateway Settings State
  const [razorpaySettings, setRazorpaySettings] = useState({
    enabled: true,
    keyId: 'rzp_test_NaaniPickles2026',
    keySecret: 'w948hfskj3489hfskd',
    mode: 'test',
    accountName: 'Naani Pickles Heritage Foodworks',
    currency: 'INR'
  });
  const [isSavingRzp, setIsSavingRzp] = useState(false);

  // Initial Fetch
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [prodsRes, ordsRes, settsRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/admin/settings').then(r => r.json())
      ]);

      if (prodsRes) setProducts(prodsRes);
      if (ordsRes) setOrders(ordsRes);
      if (settsRes && settsRes.razorpay) setRazorpaySettings(settsRes.razorpay);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // ---------------- PRODUCT CRUD ----------------
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      hindiName: '',
      category: 'Mango Specials',
      tagline: '',
      description: '',
      fullStory: '',
      badge: 'Artisanal Batch',
      isBestseller: false,
      price: 360,
      spiceLevel: 2,
      spiceText: 'Medium Zing',
      oilBase: 'Kachi Ghani Mustard Oil',
      sunDays: 21,
      origin: 'Varanasi, Uttar Pradesh',
      harvestYear: 'Harvest 2026',
      ingredients: 'Raw Mango, Cold-Pressed Mustard Oil, Fenugreek, Fennel, Sendha Namak, Turmeric, Pure Hing',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
      inStock: true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      hindiName: prod.hindiName || '',
      category: prod.category || 'Mango Specials',
      tagline: prod.tagline || '',
      description: prod.description || '',
      fullStory: prod.fullStory || '',
      badge: prod.badge || '',
      isBestseller: !!prod.isBestseller,
      price: prod.sizes && prod.sizes[0] ? prod.sizes[0].price : 360,
      spiceLevel: prod.spiceLevel || 2,
      spiceText: prod.spiceText || 'Medium Zing',
      oilBase: prod.oilBase || 'Kachi Ghani Mustard Oil',
      sunDays: prod.sunDays || 21,
      origin: prod.origin || 'Varanasi, Uttar Pradesh',
      harvestYear: prod.harvestYear || 'Harvest 2026',
      ingredients: Array.isArray(prod.ingredients) ? prod.ingredients.join(', ') : prod.ingredients,
      image: prod.image,
      inStock: prod.inStock !== false
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      spiceLevel: Number(productForm.spiceLevel),
      sunDays: Number(productForm.sunDays),
      sizes: [
        { size: "250g Glass Jar", price: Number(productForm.price), originalPrice: Math.round(Number(productForm.price) * 1.2), label: "Starter" },
        { size: "500g Jar (Most Loved)", price: Math.round(Number(productForm.price) * 1.65), originalPrice: Math.round(Number(productForm.price) * 1.95), label: "Best Value", popular: true },
        { size: "1kg Heritage Ceramic Barni", price: Math.round(Number(productForm.price) * 3.1), originalPrice: Math.round(Number(productForm.price) * 3.6), label: "Ceramic Barni with Muslin Tie" }
      ]
    };

    try {
      if (editingProduct) {
        // Update PUT
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setProducts(products.map(p => p.id === editingProduct.id ? data.product : p));
          showStatus(`Updated "${payload.name}" successfully!`);
          if (onProductUpdated) onProductUpdated();
        }
      } else {
        // Create POST
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setProducts([data.product, ...products]);
          showStatus(`Added new pickle "${payload.name}" to store catalog!`);
          if (onProductUpdated) onProductUpdated();
        }
      }
      setIsProductModalOpen(false);
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleToggleStock = async (prod) => {
    const updatedStock = !prod.inStock;
    try {
      const res = await fetch(`/api/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: updatedStock })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === prod.id ? { ...p, inStock: updatedStock } : p));
        showStatus(`${prod.name} marked ${updatedStock ? 'IN STOCK' : 'OUT OF STOCK'}`);
        if (onProductUpdated) onProductUpdated();
      }
    } catch (err) {}
  };

  const handleDeleteProduct = async (prodId, prodName) => {
    if (!window.confirm(`Are you sure you want to remove "${prodName}" from the store catalog?`)) return;
    try {
      const res = await fetch(`/api/products/${prodId}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== prodId));
        showStatus(`Removed "${prodName}" from catalog.`);
        if (onProductUpdated) onProductUpdated();
      }
    } catch (err) {}
  };

  // ---------------- ORDER FULFILLMENT ----------------
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        showStatus(`Order #${orderId} marked as "${newStatus}"`);
      }
    } catch (err) {}
  };

  const handleUpdateTracking = async (orderId, awb) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: awb })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, trackingNumber: awb } : o));
        showStatus(`Tracking #${awb} updated for Order #${orderId}`);
      }
    } catch (err) {}
  };

  // ---------------- RAZORPAY SETTINGS ----------------
  const handleSaveRazorpay = async (e) => {
    e.preventDefault();
    setIsSavingRzp(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ razorpay: razorpaySettings })
      });
      if (res.ok) {
        showStatus('Razorpay Payment Gateway configuration saved successfully!');
      }
    } catch (err) {
      alert('Error saving Razorpay settings');
    } finally {
      setIsSavingRzp(false);
    }
  };

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.finalAmount || 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + (o.items ? o.items.reduce((s, it) => s + (it.quantity || 1), 0) : 0), 0);
  const pendingFulfillment = orders.filter(o => o.status !== 'Delivered').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-6xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="shrink-0 p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#701B25] text-[#D69A19] flex items-center justify-center font-bold shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-xl text-[#701B25] leading-none">
                  Naani Pickles Administration
                </h3>
                <span className="bg-[#F7F1DF] text-[#701B25] border border-[#E9DCC7] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Control Center
                </span>
              </div>
              <p className="text-[11px] text-[#62564D] mt-0.5">
                Logged in as: <strong className="text-[#701B25]">{adminUser?.name || 'Head Administrator'}</strong> ({adminUser?.email || 'admin@naanipickles.com'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              className="p-2 rounded-xl bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full border border-[#E9DCC7] hover:bg-[#F7F1DF] text-[#701B25] font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <span>View Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-[#8F2024]/10 hover:bg-[#8F2024]/20 text-[#8F2024] transition-colors"
              title="Sign Out of Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast / Feedback */}
        {statusMessage && (
          <div className="shrink-0 bg-[#285331] text-white text-xs px-6 py-2 flex items-center justify-between font-semibold animate-in slide-in-from-top">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {statusMessage}
            </span>
            <button onClick={() => setStatusMessage(null)}><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Navigation Tabs - Distinct Pill Tabs with guaranteed height and no clipping */}
        <div className="shrink-0 px-4 sm:px-6 bg-[#FFFCF6] border-b border-[#E9DCC7] py-3">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`shrink-0 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                activeTab === 'overview'
                  ? 'bg-[#8F2024] text-white shadow-md ring-2 ring-[#D69A19]/50'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7] hover:border-[#D69A19]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#D69A19]" />
              <span>Kitchen Analytics (आँकड़े)</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`shrink-0 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                activeTab === 'products'
                  ? 'bg-[#8F2024] text-white shadow-md ring-2 ring-[#D69A19]/50'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7] hover:border-[#D69A19]'
              }`}
            >
              <Package className="w-4 h-4 text-[#D69A19]" />
              <span>Product Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`shrink-0 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                activeTab === 'orders'
                  ? 'bg-[#8F2024] text-white shadow-md ring-2 ring-[#D69A19]/50'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7] hover:border-[#D69A19]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#DF905B]" />
              <span>Orders & Fulfillment ({orders.length})</span>
              {pendingFulfillment > 0 && (
                <span className="bg-[#8F2024] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {pendingFulfillment} Active
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('razorpay')}
              className={`shrink-0 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                activeTab === 'razorpay'
                  ? 'bg-[#8F2024] text-white shadow-md ring-2 ring-[#D69A19]/50'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7] hover:border-[#D69A19]'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#4C7897]" />
              <span>Razorpay Gateway</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                razorpaySettings.enabled ? 'bg-[#285331]/10 text-[#285331]' : 'bg-stone-200 text-[#806F60]'
              }`}>
                {razorpaySettings.enabled ? 'Active' : 'Off'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`shrink-0 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                activeTab === 'blog'
                  ? 'bg-[#8F2024] text-white shadow-md ring-2 ring-[#D69A19]/50'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7] hover:border-[#D69A19]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#D69A19]" />
              <span>Blog Management (ब्लॉग)</span>
            </button>
          </div>
        </div>

        {/* Tab Content Workspace */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-6">

          {/* ================= TAB 1: PRODUCT MANAGER ================= */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              
              {/* Product Subhead & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E9DCC7] shadow-sm">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pickles by name, category, or ingredients..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] text-[#62564D]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#806F60] font-medium">
                    Showing {products.length} live recipes
                  </span>
                  <button
                    onClick={handleOpenAddProduct}
                    className="px-4 py-2.5 rounded-xl bg-[#8F2024] hover:bg-[#701B25] text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Pickle / Product</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter(p => !searchQuery.trim() || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.hindiName && p.hindiName.includes(searchQuery)))
                  .map((p) => (
                    <div 
                      key={p.id}
                      className="bg-white rounded-2xl border border-[#E9DCC7] shadow-sm p-4 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#D69A19] transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <img 
                            src={p.image} 
                            alt={p.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E9DCC7]"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-[#DF905B] uppercase tracking-wider block">
                              {p.category}
                            </span>
                            <h4 className="font-serif font-bold text-sm text-[#701B25] leading-tight truncate">
                              {p.name}
                            </h4>
                            <p className="text-xs text-[#D69A19] font-serif">
                              {p.hindiName}
                            </p>
                            <div className="text-xs font-bold text-[#701B25] mt-1">
                              ₹{p.sizes && p.sizes[0] ? p.sizes[0].price : 299} 
                              <span className="text-[10px] text-[#806F60] font-normal"> (Starter 250g)</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-[#62564D] line-clamp-2 leading-relaxed">
                          {p.tagline || p.description}
                        </p>

                        <div className="flex items-center gap-2 pt-1 text-[11px] text-[#806F60]">
                          <span className="bg-[#F7F1DF] text-[#701B25] px-2 py-0.5 rounded border border-[#E9DCC7]">🌶️ Spice: {p.spiceLevel}/4</span>
                          <span className="bg-[#F7F1DF] text-[#701B25] px-2 py-0.5 rounded border border-[#E9DCC7]">☀️ {p.sunDays || 21} Days Sun</span>
                        </div>
                      </div>

                      {/* Controls Bar */}
                      <div className="pt-3 border-t border-[#E9DCC7]/50 flex items-center justify-between">
                        {/* Stock toggle */}
                        <button
                          onClick={() => handleToggleStock(p)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 ${
                            p.inStock !== false 
                              ? 'bg-[#285331]/10 text-[#285331] hover:bg-[#285331]/20' 
                              : 'bg-[#8F2024]/10 text-[#8F2024] hover:bg-[#8F2024]/20'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${p.inStock !== false ? 'bg-[#285331]' : 'bg-[#8F2024]'}`} />
                          <span>{p.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 rounded-lg bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
                            title="Edit Product Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-[#8F2024]/10 hover:bg-[#8F2024]/20 text-[#8F2024] transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ================= TAB 2: ORDER FULFILLMENT ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              <div className="bg-white p-4 rounded-2xl border border-[#E9DCC7] shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-black text-lg text-[#701B25]">
                    Live Customer Orders & Kitchen Dispatch
                  </h4>
                  <p className="text-xs text-[#806F60]">
                    Track customer addresses, update fulfillment stage, and assign tracking numbers.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#806F60] block">Total Revenue</span>
                  <span className="font-serif font-black text-xl text-[#701B25]">₹{totalRevenue}</span>
                </div>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div 
                    key={ord.id}
                    className="p-5 bg-white rounded-2xl border border-[#E9DCC7] shadow-sm space-y-3"
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
                        {ord.email && (
                          <span className="text-[11px] text-[#806F60]">({ord.email})</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#701B25]">
                          ₹{ord.finalAmount}
                        </span>
                        <span className="text-[10px] bg-[#F7F1DF] text-[#701B25] border border-[#E9DCC7] px-2 py-0.5 rounded font-medium">
                          {ord.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="text-xs text-[#62564D] space-y-1">
                      {ord.items && ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>• {it.name} ({it.size}) x{it.quantity}</span>
                          <span className="font-semibold text-[#701B25]">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address & Courier Tracking */}
                    <div className="pt-2 border-t border-[#E9DCC7]/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                      <div className="text-[#806F60] text-[11px] flex items-center gap-1 max-w-md">
                        <MapPin className="w-3.5 h-3.5 text-[#806F60] shrink-0" />
                        <span>{ord.address}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Courier Tracking input */}
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-[#806F60]">Tracking:</span>
                          <input 
                            type="text"
                            defaultValue={ord.trackingNumber || `BLUEDART-${ord.id}-IN`}
                            onBlur={(e) => handleUpdateTracking(ord.id, e.target.value)}
                            className="text-[11px] p-1 px-2 border border-[#E9DCC7] rounded font-mono bg-stone-50 text-[#62564D] w-36"
                          />
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-[#62564D]">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="text-xs font-bold p-1.5 px-2.5 rounded-xl border border-[#E9DCC7] bg-[#F7F1DF] text-[#701B25] focus:outline-none"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing in Muslin Cloth">Packing in Muslin Cloth</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 3: RAZORPAY PAYMENT GATEWAY ================= */}
          {activeTab === 'razorpay' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E9DCC7]/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#4C7897]/10 border border-[#4C7897]/30 flex items-center justify-center text-[#4C7897] font-bold text-xl">
                      ₹
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-xl text-[#701B25] leading-tight">
                        Razorpay Payment Gateway Integration
                      </h4>
                      <p className="text-xs text-[#806F60]">
                        Accept UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards, Netbanking & Wallets
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    razorpaySettings.enabled ? 'bg-[#285331]/10 text-[#285331]' : 'bg-stone-200 text-[#806F60]'
                  }`}>
                    {razorpaySettings.enabled ? 'Gateway Active' : 'Disabled'}
                  </span>
                </div>

                <form onSubmit={handleSaveRazorpay} className="space-y-4 text-xs">
                  
                  {/* Enable Gateway Toggle */}
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-[#E9DCC7] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#701B25] block text-xs">Enable Razorpay Checkout</span>
                      <span className="text-[11px] text-[#806F60]">Customers will be offered Razorpay at checkout for immediate online payment.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={razorpaySettings.enabled}
                        onChange={(e) => setRazorpaySettings({ ...razorpaySettings, enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8F2024]"></div>
                    </label>
                  </div>

                  {/* Environment Mode Switcher */}
                  <div>
                    <label className="font-bold text-[#62564D] block mb-1">Gateway Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRazorpaySettings({ ...razorpaySettings, mode: 'test' })}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          razorpaySettings.mode === 'test'
                            ? 'border-[#8F2024] bg-[#F7F1DF] text-[#701B25] font-bold shadow-sm'
                            : 'border-[#E9DCC7] text-[#62564D]'
                        }`}
                      >
                        🧪 Test Mode (Sandbox Simulation)
                      </button>

                      <button
                        type="button"
                        onClick={() => setRazorpaySettings({ ...razorpaySettings, mode: 'live' })}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          razorpaySettings.mode === 'live'
                            ? 'border-[#8F2024] bg-[#F7F1DF] text-[#701B25] font-bold shadow-sm'
                            : 'border-[#E9DCC7] text-[#62564D]'
                        }`}
                      >
                        🚀 Live Production Mode
                      </button>
                    </div>
                  </div>

                  {/* Razorpay Key ID */}
                  <div>
                    <label className="font-bold text-[#62564D] block mb-1 flex items-center justify-between">
                      <span>Razorpay Key ID *</span>
                      <span className="text-[10px] text-[#806F60]">Starts with rzp_test_ or rzp_live_</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={razorpaySettings.keyId}
                      onChange={(e) => setRazorpaySettings({ ...razorpaySettings, keyId: e.target.value.trim() })}
                      placeholder="rzp_test_NaaniPickles2026"
                      className="w-full p-2.5 rounded-xl border border-[#E9DCC7] font-mono text-xs focus:outline-none focus:border-[#8F2024] text-[#62564D]"
                    />
                  </div>

                  {/* Razorpay Key Secret */}
                  <div>
                    <label className="font-bold text-[#62564D] block mb-1 flex items-center justify-between">
                      <span>Razorpay Key Secret *</span>
                      <span className="text-[10px] text-[#806F60]">Stored securely on your server</span>
                    </label>
                    <input 
                      type="password"
                      required
                      value={razorpaySettings.keySecret}
                      onChange={(e) => setRazorpaySettings({ ...razorpaySettings, keySecret: e.target.value.trim() })}
                      placeholder="••••••••••••••••••••••••"
                      className="w-full p-2.5 rounded-xl border border-[#E9DCC7] font-mono text-xs focus:outline-none focus:border-[#8F2024] text-[#62564D]"
                    />
                  </div>

                  {/* Business Name Display */}
                  <div>
                    <label className="font-bold text-[#62564D] block mb-1">Brand Name on Razorpay Popup</label>
                    <input 
                      type="text"
                      value={razorpaySettings.accountName}
                      onChange={(e) => setRazorpaySettings({ ...razorpaySettings, accountName: e.target.value })}
                      placeholder="Naani Pickles™ Heritage Foodworks"
                      className="w-full p-2.5 rounded-xl border border-[#E9DCC7] text-xs focus:outline-none focus:border-[#8F2024] text-[#62564D]"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSavingRzp}
                      className="w-full py-3 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isSavingRzp ? (
                        <span>Saving Configuration...</span>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Razorpay Settings</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>

                {/* Helpful info box */}
                <div className="p-3 bg-[#F7F1DF] border border-[#E9DCC7] rounded-2xl text-[11px] text-[#62564D] space-y-1">
                  <div className="font-bold text-[#701B25] flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-[#4C7897]" /> Razorpay Integration Details:
                  </div>
                  <p>
                    When customers choose Razorpay in the checkout modal, the store automatically contacts Razorpay to generate an authenticated order. All verified payments are instantly marked as "Paid" and tied to your order tracking.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 1: KITCHEN ANALYTICS ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Analytics Top Welcome Banner */}
              <div className="bg-gradient-to-r from-[#F7F1DF] via-[#FFFCF6] to-[#F7F1DF] p-6 rounded-3xl border border-[#E9DCC7] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1DF] border border-[#E9DCC7] text-[#701B25] text-[11px] font-bold uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-[#8F2024]" /> Live Kitchen Analytics & Metrics
                  </div>
                  <h3 className="font-serif font-black text-2xl text-[#701B25]">
                    Kitchen Performance & Revenue Overview
                  </h3>
                  <p className="text-xs text-[#62564D] max-w-xl">
                    Real-time statistics on storefront sales, order fulfillment pipeline, rooftop barni fermentation, and payment modes.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="px-4 py-2.5 rounded-xl bg-[#8F2024] hover:bg-[#701B25] text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D69A19]" />
                    <span>View Orders ({orders.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F1DF] border border-[#E9DCC7] text-[#701B25] font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Package className="w-3.5 h-3.5 text-[#D69A19]" />
                    <span>Catalog ({products.length})</span>
                  </button>
                </div>
              </div>

              {/* 4 Core Hero Metric KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-1 hover:border-[#D69A19] transition-all">
                  <div className="flex items-center justify-between text-xs text-[#806F60] font-medium">
                    <span>Total Store Revenue</span>
                    <span className="p-1.5 rounded-lg bg-[#8F2024]/10 text-[#8F2024] font-bold">₹</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#701B25] tracking-tight">₹{totalRevenue}</div>
                  <span className="text-[10px] text-[#285331] font-bold block pt-1">
                    Avg Basket: ₹{Math.round(totalRevenue / Math.max(1, orders.length))}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-1 hover:border-[#D69A19] transition-all">
                  <div className="flex items-center justify-between text-xs text-[#806F60] font-medium">
                    <span>Customer Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#DF905B]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#701B25] tracking-tight">{orders.length}</div>
                  <span className="text-[10px] text-[#D69A19] font-bold block pt-1">
                    {pendingFulfillment} in progress / fulfillment
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-1 hover:border-[#D69A19] transition-all">
                  <div className="flex items-center justify-between text-xs text-[#806F60] font-medium">
                    <span>Bottled Jars Shipped</span>
                    <Package className="w-4 h-4 text-[#D69A19]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#D69A19] tracking-tight">{totalItemsSold} Jars</div>
                  <span className="text-[10px] text-[#806F60] font-semibold block pt-1">
                    Glass & Ceramic Barnis
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-1 hover:border-[#D69A19] transition-all">
                  <div className="flex items-center justify-between text-xs text-[#806F60] font-medium">
                    <span>Catalog Recipes</span>
                    <Sun className="w-4 h-4 text-[#D69A19]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#285331] tracking-tight">{products.length} Pickles</div>
                  <span className="text-[10px] text-[#285331] font-bold block pt-1">
                    100% Sun-Cured & Preserved
                  </span>
                </div>
              </div>

              {/* Order Fulfillment Pipeline Cards */}
              <div className="bg-white p-6 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-black text-base text-[#701B25]">
                      Order Fulfillment Pipeline Status
                    </h4>
                    <p className="text-xs text-[#806F60]">Live order movement across kitchen packing and couriers</p>
                  </div>
                  <span className="text-xs font-bold text-[#806F60]">
                    Total: {orders.length} Orders
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7] space-y-1">
                    <span className="text-[10px] font-bold text-[#701B25] uppercase tracking-wider block">1. Packing in Muslin</span>
                    <div className="text-2xl font-black text-[#701B25]">
                      {orders.filter(o => o.status === 'Packing in Muslin Cloth' || !o.status).length}
                    </div>
                    <span className="text-[10px] text-[#806F60]">Hand-tying with thread</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#4C7897]/10 border border-[#4C7897]/30 space-y-1">
                    <span className="text-[10px] font-bold text-[#4C7897] uppercase tracking-wider block">2. In Transit / Dispatched</span>
                    <div className="text-2xl font-black text-[#4C7897]">
                      {orders.filter(o => ['Dispatched', 'In Transit'].includes(o.status)).length}
                    </div>
                    <span className="text-[10px] text-[#806F60]">With Bluedart / DTDC Air</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#DF905B]/10 border border-[#DF905B]/30 space-y-1">
                    <span className="text-[10px] font-bold text-[#DF905B] uppercase tracking-wider block">3. Out for Delivery</span>
                    <div className="text-2xl font-black text-[#DF905B]">
                      {orders.filter(o => o.status === 'Out for Delivery').length}
                    </div>
                    <span className="text-[10px] text-[#806F60]">Courier at doorstep</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#285331]/10 border border-[#285331]/30 space-y-1">
                    <span className="text-[10px] font-bold text-[#285331] uppercase tracking-wider block">4. Delivered</span>
                    <div className="text-2xl font-black text-[#285331]">
                      {orders.filter(o => o.status === 'Delivered').length}
                    </div>
                    <span className="text-[10px] text-[#285331] font-semibold">At customer dining table</span>
                  </div>
                </div>
              </div>

              {/* Payment Split & Courtyard Solar Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Payment Gateway Split */}
                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif font-black text-sm text-[#701B25] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#4C7897]" />
                      Payment Methods Breakdown
                    </h5>
                    <span className="text-xs text-[#806F60] font-bold">100% Recorded</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[#62564D] font-semibold mb-1">
                        <span>Razorpay & Online UPI</span>
                        <span className="text-[#4C7897] font-bold">
                          {orders.filter(o => o.paymentMethod && (o.paymentMethod.includes('Razorpay') || o.paymentMethod.includes('UPI'))).length} Orders (₹{orders.filter(o => o.paymentMethod && (o.paymentMethod.includes('Razorpay') || o.paymentMethod.includes('UPI'))).reduce((s, o) => s + (o.finalAmount || 0), 0)})
                        </span>
                      </div>
                      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#4C7897] rounded-full" 
                          style={{ width: `${Math.round((orders.filter(o => o.paymentMethod && (o.paymentMethod.includes('Razorpay') || o.paymentMethod.includes('UPI'))).length / Math.max(1, orders.length)) * 100)}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#62564D] font-semibold mb-1">
                        <span>Cash on Delivery (COD)</span>
                        <span className="text-[#D69A19] font-bold">
                          {orders.filter(o => o.paymentMethod && o.paymentMethod.includes('Cash')).length} Orders (₹{orders.filter(o => o.paymentMethod && o.paymentMethod.includes('Cash')).reduce((s, o) => s + (o.finalAmount || 0), 0)})
                        </span>
                      </div>
                      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#D69A19] rounded-full" 
                          style={{ width: `${Math.round((orders.filter(o => o.paymentMethod && o.paymentMethod.includes('Cash')).length / Math.max(1, orders.length)) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Courtyard Sun Curing Active Status */}
                <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif font-black text-sm text-[#701B25] flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-[#D69A19]" />
                      Courtyard Solar Fermentation
                    </h5>
                    <span className="text-xs bg-[#F7F1DF] text-[#701B25] border border-[#E9DCC7] font-bold px-2 py-0.5 rounded-full">
                      Varanasi & Jodhpur
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7]">
                      <span className="text-[10px] text-[#806F60] block">Active Barnis</span>
                      <span className="font-black text-base text-[#701B25]">540 Pots</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7]">
                      <span className="text-[10px] text-[#806F60] block">Sun Days</span>
                      <span className="font-black text-base text-[#701B25]">Day 16 of 21</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7]">
                      <span className="text-[10px] text-[#806F60] block">Maturation</span>
                      <span className="font-black text-base text-[#285331]">76% Ready</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Customer Orders Live Feed Table */}
              <div className="bg-white p-6 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-black text-base text-[#701B25]">
                      Recent Orders Live Feed & Quick Status Updates
                    </h4>
                    <p className="text-xs text-[#806F60]">Update fulfillment status directly without leaving the Analytics tab</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#8F2024] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E9DCC7] text-[#806F60] font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-2">Order ID</th>
                        <th className="pb-2">Customer</th>
                        <th className="pb-2">Items</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Payment</th>
                        <th className="pb-2">Status & Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#F7F1DF]/40 transition-colors">
                          <td className="py-3 font-mono font-bold text-[#701B25]">
                            #{ord.id}
                          </td>
                          <td className="py-3">
                            <div className="font-bold text-[#701B25]">{ord.customerName}</div>
                            <div className="text-[11px] text-[#806F60]">{ord.phone}</div>
                          </td>
                          <td className="py-3 max-w-[180px] truncate text-[#62564D]">
                            {ord.items ? ord.items.map(i => `${i.name} x${i.quantity}`).join(', ') : 'Assorted Jars'}
                          </td>
                          <td className="py-3 font-black text-[#701B25]">
                            ₹{ord.finalAmount}
                          </td>
                          <td className="py-3">
                            <span className="text-[10px] bg-[#F7F1DF] border border-[#E9DCC7] px-2 py-0.5 rounded font-medium text-[#701B25]">
                              {ord.paymentMethod?.split(' ')[0] || 'Online'}
                            </span>
                          </td>
                          <td className="py-3">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="text-xs font-bold p-1 px-2 rounded-xl border border-[#E9DCC7] bg-[#F7F1DF] text-[#701B25] focus:outline-none"
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="Packing in Muslin Cloth">Packing in Muslin Cloth</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 5: BLOG MANAGEMENT ================= */}
          {activeTab === 'blog' && (
            <BlogAdminSection 
              onNavigateToPost={(postUrl) => {
                onClose();
                if (window.history && window.history.pushState) {
                  window.history.pushState({}, '', postUrl);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                } else {
                  window.location.href = postUrl;
                }
              }} 
            />
          )}

        </div>

      </div>

      {/* ================= PRODUCT ADD / EDIT MODAL ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
          <div 
            className="relative bg-[#FBF7EF] rounded-3xl max-w-2xl w-full border border-[#E9DCC7] shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E9DCC7] pb-3">
              <h4 className="font-serif font-black text-xl text-[#701B25]">
                {editingProduct ? `Edit Pickle: ${editingProduct.name}` : 'Add New Pickle to Catalog'}
              </h4>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full text-[#806F60] hover:text-[#701B25]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Pickle Name (English) *</label>
                  <input 
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Kashmiri Walnut & Garlic Chutney"
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Hindi Traditional Name</label>
                  <input 
                    type="text"
                    value={productForm.hindiName}
                    onChange={(e) => setProductForm({ ...productForm, hindiName: e.target.value })}
                    placeholder="e.g. कश्मीरी अखरोट व लहसुन चटनी"
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Category *</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D] font-medium"
                  >
                    <option value="Mango Specials">Mango Specials</option>
                    <option value="Chili & Fiery">Chili & Fiery</option>
                    <option value="Citrus & Tangy">Citrus & Tangy</option>
                    <option value="Heritage & Rare">Heritage & Rare</option>
                    <option value="Gourmet Chutneys & Podis">Gourmet Chutneys & Podis</option>
                    <option value="Gift Hampers">Gift Hampers</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Base Price (250g Jar) ₹ *</label>
                  <input 
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#701B25] font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Spice Level (1 to 4)</label>
                  <select 
                    value={productForm.spiceLevel}
                    onChange={(e) => setProductForm({ ...productForm, spiceLevel: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  >
                    <option value="1">1 - Mild & Sweet (🌶️)</option>
                    <option value="2">2 - Medium Zing (🌶️🌶️)</option>
                    <option value="3">3 - Robust & Bold (🌶️🌶️🌶️)</option>
                    <option value="4">4 - Volcanic Fiery (🌶️🌶️🌶️🌶️)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Short Tagline (Sensory Headline)</label>
                <input 
                  type="text"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  placeholder="e.g. Crunchy raw mangoes sun-dried with turmeric and sendha namak"
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Detailed Recipe Description</label>
                <textarea 
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Write the flavor description seen on the product card..."
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Grandma's Lore & Heritage Story</label>
                <textarea 
                  rows={2}
                  value={productForm.fullStory}
                  onChange={(e) => setProductForm({ ...productForm, fullStory: e.target.value })}
                  placeholder="The story of how Naani prepares this in the haveli courtyard..."
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Oil Base</label>
                  <input 
                    type="text"
                    value={productForm.oilBase}
                    onChange={(e) => setProductForm({ ...productForm, oilBase: e.target.value })}
                    placeholder="e.g. Kachi Ghani Mustard Oil / Cold-Pressed Til Oil / Zero Oil"
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#62564D] block mb-1">Sun Curing Days</label>
                  <input 
                    type="number"
                    value={productForm.sunDays}
                    onChange={(e) => setProductForm({ ...productForm, sunDays: e.target.value })}
                    placeholder="21"
                    className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Ingredients (Comma Separated)</label>
                <input 
                  type="text"
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  placeholder="e.g. Ramkela Mango, Cold-Pressed Mustard Oil, Fenugreek, Fennel, Sendha Namak"
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Image URL (High-Res Photo)</label>
                <input 
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white font-mono text-[11px] text-[#62564D]"
                />
              </div>

              {/* In stock checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox"
                  id="inStockCheck"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  className="w-4 h-4 text-[#8F2024] rounded border-[#E9DCC7] focus:ring-[#8F2024]"
                />
                <label htmlFor="inStockCheck" className="font-bold text-[#62564D]">
                  Pickle is currently In Stock & Available for Ordering
                </label>
              </div>

              <div className="pt-3 border-t border-[#E9DCC7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E9DCC7] hover:bg-[#F7F1DF] text-[#62564D] font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-white font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Save Changes' : 'Create Pickle'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
