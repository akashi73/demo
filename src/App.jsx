import React, { useState, useEffect, useMemo } from 'react';
import { 
  PRODUCTS as INITIAL_FALLBACK_PRODUCTS, 
  CATEGORIES 
} from './data/products';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import SpiceQuizModal from './components/SpiceQuizModal';
import CustomBoxBuilder from './components/CustomBoxBuilder';
import SunCuringTracker from './components/SunCuringTracker';
import OrdersAdminModal from './components/OrdersAdminModal';
import WishlistModal from './components/WishlistModal';
import HeritageStory from './components/HeritageStory';
import PreservationGuide from './components/PreservationGuide';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ParallaxTicker from './components/ParallaxTicker';
import BlogListPage from './components/blog/BlogListPage';
import BlogPostDetailPage from './components/blog/BlogPostDetailPage';

// Admin & User Sub-folder Portals
import AdminPortal from './admin/AdminPortal';
import AdminLoginModal from './admin/AdminLoginModal';
import UserAuthModal from './user/UserAuthModal';
import UserAccountModal from './user/UserAccountModal';
import OrderTrackerModal from './user/OrderTrackerModal';

import { 
  SlidersHorizontal, 
  Flame, 
  Sun, 
  Sparkles, 
  ShoppingBag, 
  Package, 
  Heart, 
  RotateCcw,
  Check, 
  ShieldCheck,
  Search,
  MessageCircle,
  Truck,
  User,
  Plus
} from 'lucide-react';

export default function App() {
  // Live Dynamic Products from Backend API (Editable via Admin Panel)
  const [productsList, setProductsList] = useState(INITIAL_FALLBACK_PRODUCTS);

  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState('all'); // 'all', 1, 2, 3, 4
  const [selectedOilBase, setSelectedOilBase] = useState('all'); // 'all', 'mustard', 'sesame', 'zero-oil'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'spice'
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (stored in localStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('naani_cart');
      return saved ? JSON.parse(saved) : [
        {
          productId: "ramkela-mango",
          name: "Grandma's Traditional Ramkela Mango Achar",
          hindiName: "असली रामकेला आम का आचार",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
          size: "500g Jar (Most Loved)",
          price: 360,
          originalPrice: 420,
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State (stored in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('naani_wishlist');
      return saved ? JSON.parse(saved) : ['banarasi-lal-mirch'];
    } catch {
      return [];
    }
  });

  // Customer User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('naani_customer_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Administration Authentication State
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('naani_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals Visibility
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBundleBuilderOpen, setIsBundleBuilderOpen] = useState(false);
  const [isSunTrackerOpen, setIsSunTrackerOpen] = useState(false);
  const [isOrdersAdminOpen, setIsOrdersAdminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New User & Admin Portals Modals
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  
  // URL Routing State (Home / Blog Listing / Individual Blog Post)
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch Live Products from Backend
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setProductsList(data);
        }
      }
    } catch (e) {
      console.warn('Using local products fallback:', e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('naani_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('naani_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // User Auth Handlers
  const handleUserLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('naani_customer_user', JSON.stringify(user));
    } catch (e) {}
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('naani_customer_user');
    } catch (e) {}
    setIsUserAccountOpen(false);
    showToast('Signed out of customer account.');
  };

  // Admin Auth Handlers
  const handleAdminLogin = (admin, token) => {
    setAdminUser(admin);
    try {
      localStorage.setItem('naani_admin_user', JSON.stringify(admin));
      localStorage.setItem('naani_admin_token', token);
    } catch (e) {}
    setIsAdminLoginOpen(false);
    setIsAdminPortalOpen(true);
    showToast(`Welcome to Admin Panel, ${admin.name}!`);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('naani_admin_user');
      localStorage.removeItem('naani_admin_token');
    } catch (e) {}
    setIsAdminPortalOpen(false);
    showToast('Logged out of Admin Portal.');
  };

  const handleOpenAdminPortalClick = () => {
    if (adminUser) {
      setIsAdminPortalOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Cart operations
  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === newItem.productId && i.size === newItem.size
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });

    showToast(`Added ${newItem.name} (${newItem.size}) to basket!`);
  };

  const handleUpdateCartQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId, size) => {
    setCartItems(prev => prev.filter(i => !(i.productId === productId && i.size === size)));
  };

  const handleToggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from saved jars');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your favorite jars ❤️');
        return [...prev, productId];
      }
    });
  };

  // Reorder Handler (from Buying History)
  const handleReorder = (items) => {
    if (!items || !items.length) return;
    items.forEach(it => {
      handleAddToCart({
        productId: it.id || it.productId || 'reorder-item',
        name: it.name,
        hindiName: it.hindiName || '',
        image: it.image || productsList[0]?.image,
        size: it.size || '500g Jar',
        price: it.price,
        quantity: it.quantity || 1
      });
    });
    setIsUserAccountOpen(false);
    setIsCartOpen(true);
    showToast(`Re-ordered ${items.length} item(s) into your kitchen basket!`);
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return productsList.filter(p => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Spice level filter
      if (selectedSpiceLevel !== 'all' && p.spiceLevel !== Number(selectedSpiceLevel)) {
        return false;
      }
      // Oil base filter
      if (selectedOilBase !== 'all') {
        if (selectedOilBase === 'mustard' && !p.oilBase.toLowerCase().includes('mustard')) return false;
        if (selectedOilBase === 'sesame' && !p.oilBase.toLowerCase().includes('sesame')) return false;
        if (selectedOilBase === 'zero-oil' && !p.oilBase.toLowerCase().includes('zero')) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesHindi = p.hindiName && p.hindiName.includes(q);
        const matchesDesc = p.description && p.description.toLowerCase().includes(q);
        const matchesOrigin = p.origin && p.origin.toLowerCase().includes(q);
        const matchesIngredients = Array.isArray(p.ingredients) 
          ? p.ingredients.some(ing => ing.toLowerCase().includes(q))
          : (p.ingredients && p.ingredients.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesOrigin && !matchesIngredients) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return (a.sizes ? a.sizes[0].price : a.price) - (b.sizes ? b.sizes[0].price : b.price);
      }
      if (sortBy === 'price-high') {
        return (b.sizes ? b.sizes[0].price : b.price) - (a.sizes ? a.sizes[0].price : a.price);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'spice') {
        return b.spiceLevel - a.spiceLevel;
      }
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [productsList, activeCategory, selectedSpiceLevel, selectedOilBase, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedSpiceLevel('all');
    setSelectedOilBase('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FBF7EF] flex flex-col font-sans selection:bg-[#D69A19]/30 selection:text-[#701B25] w-full max-w-[100vw] overflow-x-hidden">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#701B25] text-[#FFF8E9] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#D69A19] animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-[#D69A19] animate-spin" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navigation Bar */}
      <Navbar 
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onOpenOrdersAdmin={() => setIsOrdersAdminOpen(true)}
        onOpenSunTracker={() => setIsSunTrackerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        currentUser={currentUser}
        onOpenUserAuth={() => setIsUserAuthOpen(true)}
        onOpenUserAccount={() => setIsUserAccountOpen(true)}
        onOpenTrackOrder={() => setIsOrderTrackerOpen(true)}
        isAdminLoggedIn={!!adminUser}
        onOpenAdminPortal={handleOpenAdminPortalClick}
        currentPath={currentPath}
        onNavigateBlog={() => navigateTo('/blog')}
        onNavigateHome={() => navigateTo('/')}
      />

      {/* Route Switcher: Public Blog Listing / Individual Article / Storefront Home */}
      {currentPath === '/blog' ? (
        <BlogListPage onNavigate={navigateTo} />
      ) : currentPath.startsWith('/blog/') ? (
        <BlogPostDetailPage 
          slug={currentPath.replace('/blog/', '').split('?')[0]} 
          onNavigate={navigateTo} 
        />
      ) : (
        <>
          {/* Hero Showcase Section */}
          <HeroSection 
        onExploreClick={() => {
          document.getElementById('pickles-grid')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onOpenSunTracker={() => setIsSunTrackerOpen(true)}
      />

      {/* Parallax Heritage Ribbon Ticker */}
      <ParallaxTicker />

      {/* Interactive Main Catalog & E-Commerce Grid */}
      <main id="pickles-grid" className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-16 scroll-mt-20 overflow-hidden min-w-0 box-border">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-4 sm:mb-10 px-1 w-full min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1DF] text-[#701B25] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#E9DCC7] max-w-full">
            <Sun className="w-3 h-3 text-[#D69A19] shrink-0" />
            <span className="truncate">100% Traditional Small-Batch Harvests</span>
          </div>
          <h2 className="font-serif text-xl sm:text-3xl md:text-5xl font-black text-[#701B25] tracking-tight leading-tight">
            Handcrafted Heirloom Jars
          </h2>
          <p className="text-[11px] sm:text-sm text-[#62564D] font-sans max-w-xl mx-auto leading-relaxed">
            Every single jar is filled by hand, sealed with cold-pressed oils, and packed in reusable glass or ceramic clay pots with traditional muslin cloth ties.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="w-full max-w-full min-w-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 sm:pb-4 no-scrollbar border-b border-[#E9DCC7]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#8F2024] text-[#FFF8E9] shadow-md'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls (Spice Level, Oil Base, Sort By) */}
        <div className="w-full max-w-full min-w-0 my-3 sm:my-6 p-2.5 sm:p-4 bg-[#F7F1DF] rounded-xl sm:rounded-2xl border border-[#E9DCC7] space-y-2 text-xs">
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
            {/* Spice Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-bold text-[#62564D] uppercase tracking-wider text-[9px] sm:text-[11px] flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-[#DF905B]" /> Spice:
              </span>
              <select
                value={selectedSpiceLevel}
                onChange={(e) => setSelectedSpiceLevel(e.target.value)}
                className="w-full sm:w-auto bg-white border border-[#E9DCC7] rounded-lg sm:rounded-xl px-2 py-1 text-[11px] font-medium text-[#62564D] focus:outline-none focus:border-[#8F2024]"
              >
                <option value="all">All Spice Levels</option>
                <option value="1">Mild & Sweet (🌶️)</option>
                <option value="2">Medium Zing (🌶️🌶️)</option>
                <option value="3">Robust & Bold (🌶️🌶️🌶️)</option>
                <option value="4">Volcanic & Fiery (🌶️🌶️🌶️🌶️)</option>
              </select>
            </div>

            {/* Oil Base Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-bold text-[#62564D] uppercase tracking-wider text-[9px] sm:text-[11px]">
                Base:
              </span>
              <select
                value={selectedOilBase}
                onChange={(e) => setSelectedOilBase(e.target.value)}
                className="w-full sm:w-auto bg-white border border-[#E9DCC7] rounded-lg sm:rounded-xl px-2 py-1 text-[11px] font-medium text-[#62564D] focus:outline-none focus:border-[#8F2024]"
              >
                <option value="all">All Bases</option>
                <option value="mustard">Mustard Oil</option>
                <option value="sesame">Sesame (Til) Oil</option>
                <option value="zero-oil">0% Zero Oil</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E9DCC7]">
            <div className="flex items-center gap-1.5 flex-1 max-w-xs">
              <span className="font-bold text-[#62564D] uppercase tracking-wider text-[9px] sm:text-[11px] whitespace-nowrap">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-[#E9DCC7] rounded-lg sm:rounded-xl px-2 py-1 text-[11px] font-medium text-[#62564D] focus:outline-none focus:border-[#8F2024]"
              >
                <option value="featured">Featured Picks</option>
                <option value="rating">Top Rated (★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {(activeCategory !== 'all' || selectedSpiceLevel !== 'all' || selectedOilBase !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-[#806F60] hover:text-[#701B25] underline flex items-center gap-1 font-semibold text-[11px] shrink-0"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

        </div>

        {/* Product Cards Grid - Exactly 2 cards per row on mobile */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="text-4xl">🏺</div>
            <h3 className="font-serif font-bold text-xl text-[#701B25]">
              No pickles found matching your criteria.
            </h3>
            <p className="text-xs text-[#806F60]">
              Try resetting your filters or search keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] text-xs font-bold transition-colors"
            >
              Show All Flavors
            </button>
          </div>
        ) : (
          <div 
            className="naani-product-grid w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '8px',
              width: '100%',
              maxWidth: '100%'
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

        {/* Custom Bundle Promo Banner */}
        <div className="w-full max-w-full min-w-0 mt-10 sm:mt-16 bg-gradient-to-r from-[#F7F1DF] via-[#FBF7EF] to-[#F7F1DF] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-dashed border-[#D69A19] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#701B25] flex items-center justify-center text-white shrink-0 shadow-lg">
              <Package className="w-7 h-7 sm:w-8 sm:h-8 text-[#D69A19]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#8F2024] uppercase tracking-wider">
                Festive Custom Box Feature
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-black text-[#701B25] leading-tight mt-1">
                Can't decide on just one jar? Build your own 3 or 4-jar Tiffin Dabba!
              </h3>
              <p className="text-xs text-[#62564D] mt-1 max-w-xl">
                Mix and match Banarasi Lal Mirch, crunchy Ramkela Mango, and Kolhapuri Thecha into a luxury Brass or Terracotta Keepsake Gift Box. Enjoy <strong>15% automatic combo savings</strong> + free handwritten blessing card.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBundleBuilderOpen(true)}
            className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all shrink-0"
          >
            Build Your Custom Dabba (15% Off) →
          </button>
        </div>

      </main>

      {/* The 1964 Heritage Story Section */}
      <HeritageStory />

      {/* 5 Golden Rules of Preservation Section */}
      <PreservationGuide />

      {/* Verified Reviews Section */}
      <ReviewsSection />
        </>
      )}

      {/* Luxury Footer */}
      <Footer 
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onOpenSunTracker={() => setIsSunTrackerOpen(true)}
        onSelectCategory={(cat) => {
          navigateTo('/');
          setTimeout(() => setActiveCategory(cat), 100);
        }}
        onNavigateBlog={() => navigateTo('/blog')}
      />

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFCF6]/95 backdrop-blur-md border-t border-[#E9DCC7] p-2.5 px-4 flex items-center justify-between shadow-2xl">
        <button 
          onClick={() => {
            document.getElementById('pickles-grid')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center text-[#62564D] hover:text-[#701B25]"
        >
          <Search className="w-4 h-4 text-[#DF905B]" />
          <span className="text-[10px] font-bold mt-0.5">Explore</span>
        </button>

        <button 
          onClick={() => setIsOrderTrackerOpen(true)}
          className="flex flex-col items-center text-[#62564D] hover:text-[#701B25]"
        >
          <Truck className="w-4 h-4 text-[#701B25]" />
          <span className="text-[10px] font-bold mt-0.5">Track</span>
        </button>

        {currentUser ? (
          <button 
            onClick={() => setIsUserAccountOpen(true)}
            className="flex flex-col items-center text-[#62564D] hover:text-[#701B25]"
          >
            <User className="w-4 h-4 text-[#285331]" />
            <span className="text-[10px] font-bold mt-0.5">Account</span>
          </button>
        ) : (
          <button 
            onClick={() => setIsUserAuthOpen(true)}
            className="flex flex-col items-center text-[#62564D] hover:text-[#701B25]"
          >
            <User className="w-4 h-4 text-[#806F60]" />
            <span className="text-[10px] font-bold mt-0.5">Sign In</span>
          </button>
        )}

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-1.5 bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#E5AC28]" />
          <span>Cart ({cartCount})</span>
        </button>
      </div>

      {/* MODALS */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 2. Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={(summary) => {
          setCheckoutSummary(summary);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 3. Multi-Step Checkout Modal (with Razorpay Gateway Integration) */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        checkoutSummary={checkoutSummary}
        currentUser={currentUser}
        onOrderSuccess={(order) => {
          setPlacedOrder(order);
          setIsCheckoutOpen(false);
          setCartItems([]); // empty cart on success
        }}
      />

      {/* 4. Order Confirmation Modal with Printable Invoice */}
      <OrderSuccessModal 
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
        onContinueShopping={() => setPlacedOrder(null)}
      />

      {/* 5. Naani's Spice Quiz Matchmaker Modal */}
      <SpiceQuizModal 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
      />

      {/* 6. Build Your Heritage Sampler Dabba (Custom Bundle Builder) */}
      <CustomBoxBuilder 
        isOpen={isBundleBuilderOpen}
        onClose={() => setIsBundleBuilderOpen(false)}
        onAddBundleToCart={handleAddToCart}
      />

      {/* 7. Courtyard Sun Curing Live Status Modal */}
      <SunCuringTracker 
        isOpen={isSunTrackerOpen}
        onClose={() => setIsSunTrackerOpen(false)}
      />

      {/* 8. Saved Favorite Jars Modal */}
      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
      />

      {/* 9. ADMINISTRATION & BACKEND PANEL */}
      <AdminPortal 
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        adminUser={adminUser}
        onLogout={handleAdminLogout}
        onProductUpdated={fetchProducts}
      />

      {/* 10. Admin Login Modal */}
      <AdminLoginModal 
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLogin}
      />

      {/* 11. Customer User Sign In / Register Modal */}
      <UserAuthModal 
        isOpen={isUserAuthOpen}
        onClose={() => setIsUserAuthOpen(false)}
        onLoginSuccess={handleUserLogin}
      />

      {/* 12. Customer Account & Buying History Modal */}
      <UserAccountModal 
        isOpen={isUserAccountOpen}
        onClose={() => setIsUserAccountOpen(false)}
        user={currentUser}
        onLogout={handleUserLogout}
        onReorder={handleReorder}
        onOpenQuickTracker={() => setIsOrderTrackerOpen(true)}
      />

      {/* 13. Quick Order Tracker Modal */}
      <OrderTrackerModal 
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

    </div>
  );
}
