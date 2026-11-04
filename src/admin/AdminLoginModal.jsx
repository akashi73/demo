import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('admin@naanipickles.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.admin, data.token);
        onClose();
      } else {
        setErrorMsg(data.error || 'Invalid credentials. Default: admin@naanipickles.com / admin123');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to backend API');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-md w-full border border-[#E9DCC7] shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#701B25] text-[#D69A19] flex items-center justify-center mx-auto shadow-md border border-[#D69A19]/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          
          <span className="text-[10px] font-black uppercase tracking-widest text-[#701B25] bg-[#F7F1DF] border border-[#E9DCC7] px-3 py-0.5 rounded-full">
            Staff & Kitchen Management
          </span>

          <h3 className="font-serif font-black text-2xl text-[#701B25]">
            Administration Portal
          </h3>

          <p className="text-xs text-[#62564D]">
            Log in to manage product details, add new pickles, configure Razorpay payments, and fulfill customer orders.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-5 p-3 bg-[#F7F1DF] border border-[#D69A19]/40 rounded-2xl text-xs space-y-1">
          <div className="font-bold text-[#701B25] flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#8F2024]" /> Default Master Credentials:
          </div>
          <div className="text-[#62564D] flex justify-between items-center text-[11px] font-mono">
            <span>Email: <strong className="text-[#701B25]">admin@naanipickles.com</strong></span>
            <span>Pass: <strong className="text-[#701B25]">admin123</strong></span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#62564D] block mb-1">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@naanipickles.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#62564D] block mb-1">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] focus:ring-1 focus:ring-[#8F2024] bg-white text-[#62564D]"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#806F60] hover:text-[#701B25]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
