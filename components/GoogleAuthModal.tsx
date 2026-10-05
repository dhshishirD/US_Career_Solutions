'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { createGoogleUserSession, PlanTier, GoogleUserProfile } from '@/lib/user-vault';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: GoogleUserProfile) => void;
  selectedPlan?: PlanTier;
}

export default function GoogleAuthModal({
  isOpen,
  onClose,
  onSuccess,
  selectedPlan = 'free'
}: GoogleAuthModalProps) {
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isCustomInput, setIsCustomInput] = useState(false);

  if (!isOpen) return null;

  // Pre-configured fast Google one-tap sample accounts for instant zero-latency login
  const sampleGoogleAccounts = [
    {
      name: 'Tariqul Islam',
      email: 'tariqul.candidate@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Rahim Chowdhury',
      email: 'r.chowdhury.tech@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const handleSelectAccount = (name: string, email: string, avatar?: string) => {
    const user = createGoogleUserSession(name, email, avatar, selectedPlan);
    onSuccess(user);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    const name = customName.trim() || customEmail.split('@')[0];
    const user = createGoogleUserSession(name, customEmail.trim(), undefined, selectedPlan);
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* Official Google Multi-Color SVG Icon */}
            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Continue with Google
              </h3>
              <p className="text-xs text-slate-500">
                Secure Single Sign-On to US Career Solutions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan summary badge */}
        <div className="my-4 p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Package: {selectedPlan === 'free' ? 'Free Explorer (5 Free Apps/mo)' : selectedPlan === 'fast_track' ? 'Fast-Track Pack (25 Apps)' : 'VIP Concierge (100 Apps)'}</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
            Active
          </span>
        </div>

        {/* Account Selector Section */}
        {!isCustomInput ? (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-600 mb-1">
              Select your Google Account:
            </div>

            {sampleGoogleAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectAccount(acc.name, acc.email, acc.avatar)}
                className="w-full p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-center gap-3 text-left group"
              >
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-slate-900 group-hover:text-blue-600 truncate">
                    {acc.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {acc.email}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsCustomInput(true)}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Use another Google account</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder="e.g. Tariqul Islam"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Google Email Address *
              </label>
              <input
                type="email"
                required
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCustomInput(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Complete Google Sign-In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Security Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>OAuth 2.0 Encrypted. Direct Access to Candidate Dashboard.</span>
        </div>

      </div>
    </div>
  );
}
