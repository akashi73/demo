import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  Sparkles,
  KeyRound
} from 'lucide-react';

export default function UserAuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const endpoint = mode === 'login' ? '/api/user/login' : '/api/user/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please verify your details.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to backend API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setMode('login');
    setFormData({
      ...formData,
      email: 'akhlaqueahmad12345@gmail.com',
      password: 'password123'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-md w-full border border-[#E9DCC7] shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#F7F1DF] border border-[#E9DCC7] flex items-center justify-center text-[#701B25] mx-auto shadow-sm">
            <User className="w-7 h-7" />
          </div>

          <h3 className="font-serif font-black text-2xl text-[#701B25]">
            {mode === 'login' ? 'Customer Sign In' : 'Join Naani Parivaar'}
          </h3>
          <p className="text-xs text-[#62564D]">
            {mode === 'login' 
              ? 'Access your buying history, track live orders, and manage addresses.'
              : 'Create your account to unlock order tracking and member benefits.'}
          </p>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[#F7F1DF] border border-[#E9DCC7] rounded-xl text-xs font-bold mt-3">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-[#701B25] shadow-sm' : 'text-[#62564D] hover:text-[#701B25]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'register' ? 'bg-white text-[#701B25] shadow-sm' : 'text-[#62564D] hover:text-[#701B25]'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Demo Fast Login Helper */}
        {mode === 'login' && (
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="w-full mb-4 p-2.5 bg-[#F7F1DF] hover:bg-[#E9DCC7]/60 border border-[#D69A19]/50 rounded-2xl text-left flex items-center justify-between transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-3.5 h-3.5 text-[#8F2024]" />
              <span className="font-semibold text-[#701B25]">Demo Customer Account (Akhlaque)</span>
            </div>
            <span className="text-[10px] text-[#8F2024] font-bold underline">Click to Fill</span>
          </button>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-bold text-[#62564D] block mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-[#62564D] block mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
              <input 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="font-bold text-[#62564D] block mb-1">Mobile Phone *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                <input 
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-[#62564D] block mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
              <input 
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="font-bold text-[#62564D] block mb-1">Default Delivery Address (Optional)</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                <input 
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street / Flat / City / Pincode"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In' : 'Create Customer Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
