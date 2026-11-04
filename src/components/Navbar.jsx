import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Heart, 
  Sun, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  MessageCircle,
  Package,
  Layers,
  HelpCircle,
  SlidersHorizontal,
  Flame,
  Truck,
  User,
  Lock,
  BookOpen
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenQuiz, 
  onOpenBundleBuilder,
  onOpenOrdersAdmin,
  onOpenSunTracker,
  searchQuery, 
  setSearchQuery,
  activeCategory,
  onSelectCategory,
  wishlistCount,
  onOpenWishlist,
  currentUser,
  onOpenUserAuth,
  onOpenUserAccount,
  onOpenTrackOrder,
  isAdminLoggedIn,
  onOpenAdminPortal,
  onNavigateBlog,
  onNavigateHome,
  currentPath
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF6]/95 backdrop-blur-md border-b border-[#E9DCC7] transition-all duration-200">
      {/* Top Heritage Notice Ticker */}
      <div className="bg-[#701B25] text-[#FFF8E9] text-xs py-1.5 px-3 sm:px-4 overflow-hidden border-b border-[#8F2024]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-[#D69A19]/20 text-[#D69A19] px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-[#D69A19]/40 shrink-0">
              <Sun className="w-3 h-3 text-[#D69A19] animate-spin" style={{ animationDuration: '12s' }} /> 
              Batch Live
            </span>
            <span className="font-medium text-[#FFF8E9] text-[11px] sm:text-xs truncate">
              ☀️ 21-Day Sun-Cured Jars Bottled • Code <strong className="text-[#D69A19] underline underline-offset-2">NAANI10</strong> for 10% Off
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[12px] text-[#F7F1DF] shrink-0">
            <button 
              onClick={onOpenTrackOrder}
              className="flex items-center gap-1 hover:text-[#D69A19] transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-[#D69A19]" /> Track Order
            </button>
            <span className="text-[#E9DCC7]/30">|</span>
            <a 
              href="https://wa.me/919876543210?text=Namaste%20Naani%20Pickles!%20I%20have%20an%20inquiry%20regarding%20fresh%20achar%20batches."
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#D69A19] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#DF905B]" /> WhatsApp Orders
            </a>
            <span className="text-[#E9DCC7]/30">|</span>
            <button 
              onClick={onOpenAdminPortal}
              className="flex items-center gap-1 text-[#FFF8E9] hover:text-[#D69A19] font-bold bg-[#8F2024] px-2.5 py-0.5 rounded-full border border-[#D69A19]/50 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D69A19]" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 min-w-0">
          
          {/* Left Brand Identity with User Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectCategory('all');
                }
              }}
              className="text-left group flex items-center gap-2 sm:gap-3 min-w-0"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm border border-[#E9DCC7] bg-[#F7F1DF]/50 p-0.5 group-hover:shadow-md transition-all shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Naani Pickles Logo - Swaad hi Pehchan" 
                  className="h-10 sm:h-14 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" 
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h1 className="font-serif text-lg sm:text-2xl font-extrabold tracking-tight text-[#701B25] group-hover:text-[#8F2024] transition-colors leading-none truncate">
                    Naani Pickles<span className="text-[#D69A19] text-sm sm:text-base font-normal">™</span>
                  </h1>
                </div>
                <div className="hidden xs:flex items-center gap-1.5 mt-0.5">
                  <span className="font-serif italic font-bold text-[10px] sm:text-xs text-[#DF905B]">"Swad hi Pehchaan"</span>
                  <span className="w-1 h-1 rounded-full bg-[#D69A19]"></span>
                  <span className="text-[10px] font-medium tracking-wider text-[#806F60] uppercase hidden sm:inline">
                    दादी-नानी के हाथ का स्वाद
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#62564D] shrink-0">
            <button 
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else onSelectCategory('all');
              }}
              className="hover:text-[#701B25] transition-colors py-1"
            >
              All Pickles
            </button>

            <button
              onClick={() => {
                if (onNavigateBlog) onNavigateBlog();
              }}
              className={`flex items-center gap-1.5 transition-colors py-1 text-xs font-semibold ${
                currentPath && currentPath.startsWith('/blog')
                  ? 'text-[#701B25] font-bold border-b-2 border-[#701B25]'
                  : 'hover:text-[#701B25] text-[#62564D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#DF905B]" />
              <span>Heirloom Blog</span>
            </button>

            <button 
              onClick={onOpenBundleBuilder}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1DF] text-[#701B25] hover:bg-[#F7F1DF]/80 hover:text-[#8F2024] transition-colors border border-[#D69A19] font-semibold text-xs"
            >
              <Package className="w-3.5 h-3.5 text-[#D69A19]" />
              Build a Dabba
              <span className="bg-[#8F2024] text-[#FFF8E9] text-[10px] px-1.5 py-0.2 rounded-full font-bold">15% Off</span>
            </button>

            <button 
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 hover:text-[#701B25] transition-colors py-1 text-xs"
            >
              <Flame className="w-3.5 h-3.5 text-[#DF905B] animate-pulse" />
              Spice Quiz
            </button>

            <button 
              onClick={onOpenSunTracker}
              className="flex items-center gap-1.5 hover:text-[#701B25] transition-colors py-1 text-[#62564D] text-xs"
            >
              <Sun className="w-3.5 h-3.5 text-[#D69A19]" />
              Courtyard Curing
            </button>

            <button
              onClick={onOpenTrackOrder}
              className="flex items-center gap-1.5 hover:text-[#701B25] transition-colors py-1 text-xs text-[#62564D]"
            >
              <Truck className="w-3.5 h-3.5 text-[#4C7897]" />
              Track Order
            </button>
          </nav>

          {/* Right Action Icons, User Account & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Search Toggle / Box */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-[#D69A19] rounded-full px-2.5 py-1 shadow-inner">
                  <Search className="w-3.5 h-3.5 text-[#806F60] mr-1.5" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pickles..."
                    className="w-28 sm:w-52 text-xs bg-transparent focus:outline-none text-[#62564D]"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchInput(false);
                    }}
                    className="text-[#806F60] hover:text-[#701B25] p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowSearchInput(true)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-[#F7F1DF] text-[#701B25] hover:text-[#8F2024] transition-colors border border-transparent hover:border-[#E9DCC7]"
                  title="Search Pickles"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Wishlist Button (hidden on very small mobile) */}
            <button 
              onClick={onOpenWishlist}
              className="hidden sm:flex relative p-2 rounded-full hover:bg-[#F7F1DF] text-[#701B25] hover:text-[#8F2024] transition-colors"
              title="Saved Pickles"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8F2024] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Customer User Account Button */}
            {currentUser ? (
              <button
                onClick={onOpenUserAccount}
                className="flex items-center gap-1 p-1 sm:px-3 sm:py-1.5 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] font-bold text-xs border border-[#E9DCC7] transition-colors"
                title="View Buying History & Orders"
              >
                <div className="w-6 h-6 rounded-full bg-[#701B25] text-[#FFF8E9] flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[75px] truncate hidden md:inline">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={onOpenUserAuth}
                className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#E9DCC7] hover:border-[#701B25] hover:bg-[#F7F1DF] text-[#701B25] font-bold text-xs transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Slide-out Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-1 bg-[#8F2024] hover:bg-[#701B25] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all transform active:scale-95 group shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7F1DF] group-hover:rotate-6 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E5AC28] text-[#701B25] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-bold tracking-wide">
                {cartCount > 0 ? `₹${cartTotal}` : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-lg text-[#701B25] hover:bg-[#F7F1DF] shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFFCF6] border-t border-[#E9DCC7] px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button 
              onClick={() => {
                onOpenBundleBuilder();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F1DF] border border-[#D69A19] text-[#701B25] font-semibold text-xs"
            >
              <Package className="w-4 h-4 text-[#D69A19]" /> Build Custom Dabba
            </button>

            <button 
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F1DF] border border-[#E9DCC7] text-[#8F2024] font-semibold text-xs"
            >
              <Flame className="w-4 h-4 text-[#DF905B]" /> Spice Finder
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#E9DCC7] text-sm font-medium text-[#62564D]">
            <button 
              onClick={() => {
                if (onNavigateBlog) onNavigateBlog();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg bg-[#F7F1DF] hover:bg-[#E9DCC7] flex items-center justify-between text-left font-bold text-[#701B25] border border-[#E9DCC7]"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#DF905B]" /> Heirloom Blog & Recipes
              </span>
              <span className="text-xs bg-[#E5AC28] text-[#701B25] font-black px-2 py-0.5 rounded-full">New</span>
            </button>

            <button 
              onClick={() => {
                onOpenTrackOrder();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg hover:bg-[#F7F1DF] flex items-center justify-between text-left font-bold text-[#701B25]"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#4C7897]" /> Track My Order
              </span>
              <span className="text-xs bg-[#285331] text-[#FFF8E9] px-2 py-0.5 rounded-full">Live</span>
            </button>

            {currentUser ? (
              <button 
                onClick={() => {
                  onOpenUserAccount();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg hover:bg-[#F7F1DF] flex items-center justify-between text-left font-bold text-[#701B25]"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#701B25]" /> My Account ({currentUser.name})
                </span>
                <span className="text-xs text-[#806F60]">History →</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  onOpenUserAuth();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg hover:bg-[#F7F1DF] flex items-center justify-between text-left font-bold text-[#62564D]"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#806F60]" /> Customer Sign In / Register
                </span>
                <span className="text-xs text-[#806F60]">Login →</span>
              </button>
            )}

            <button 
              onClick={() => {
                onOpenAdminPortal();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg bg-[#F7F1DF] hover:bg-[#E9DCC7] flex items-center justify-between text-left font-bold text-[#701B25] border border-[#E9DCC7]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#285331]" /> Administration & Backend Panel
              </span>
              <span className="text-xs bg-[#701B25] text-white px-2 py-0.5 rounded-full">Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
