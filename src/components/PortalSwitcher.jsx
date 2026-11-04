import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Laptop
} from 'lucide-react';

export default function PortalSwitcher({ 
  currentPortal, 
  onSwitchPortal, 
  currentUser 
}) {
  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Current Portal Status Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Active Portal:</span>
          
          <div className="flex items-center gap-1.5 font-bold">
            {currentPortal === 'user' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                User Portal (Job Seekers & Recruiters)
              </span>
            )}
            {currentPortal === 'admin' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Operations & Verification Admin Portal
              </span>
            )}
            {currentPortal === 'superadmin' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs">
                <Crown className="w-3.5 h-3.5 text-rose-400" />
                Super Admin Master Control
              </span>
            )}
          </div>
        </div>

        {/* Right: Master Portal Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          
          {/* User Portal Tab */}
          <button
            onClick={() => onSwitchPortal('user')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              currentPortal === 'user'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>1. User Portal</span>
          </button>

          {/* Admin Portal Tab */}
          <button
            onClick={() => onSwitchPortal('admin')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              currentPortal === 'admin'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2. Admin Portal</span>
          </button>

          {/* Super Admin Portal Tab */}
          <button
            onClick={() => onSwitchPortal('superadmin')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              currentPortal === 'superadmin'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>3. Super Admin</span>
          </button>

        </div>

      </div>
    </div>
  );
}
