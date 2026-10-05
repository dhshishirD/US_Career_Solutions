'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Settings, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { PlanTier, GoogleUserProfile } from '@/lib/user-vault';
import { getSupabaseConfig, saveSupabaseConfig, signInWithGoogleSupabase } from '@/lib/supabase';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: GoogleUserProfile) => void;
  selectedPlan?: PlanTier;
  targetJobId?: string;
  targetTitle?: string;
  targetCompany?: string;
}

export default function GoogleAuthModal({
  isOpen,
  onClose,
  onSuccess,
  selectedPlan = 'free',
  targetJobId,
  targetTitle,
  targetCompany
}: GoogleAuthModalProps) {
  const [supabaseConfig, setSupabaseConfig] = useState<{ url: string; anonKey: string } | null>(null);
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const cfg = getSupabaseConfig();
    setSupabaseConfig(cfg);
    if (cfg) {
      setSupabaseUrl(cfg.url);
      setSupabaseKey(cfg.anonKey);
    } else {
      setShowConfigDrawer(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOneClickGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const cfg = getSupabaseConfig();
      if (!cfg) {
        setShowConfigDrawer(true);
        setLoading(false);
        return;
      }

      // Build target redirect destination
      const destination = `/dashboard${targetJobId ? `?jobId=${encodeURIComponent(targetJobId)}&title=${encodeURIComponent(targetTitle || '')}&company=${encodeURIComponent(targetCompany || '')}` : ''}`;
      const callbackUrl = `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(destination)}&plan=${selectedPlan}`;

      await signInWithGoogleSupabase(callbackUrl);
    } catch (err: any) {
      console.error('Supabase Google OAuth error:', err);
      setErrorMsg(err.message || 'Failed to initialize Google OAuth via Supabase');
      setLoading(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseKey.trim()) return;

    saveSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    setSupabaseConfig({ url: supabaseUrl.trim(), anonKey: supabaseKey.trim() });
    setShowConfigDrawer(false);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
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
                1-Click Google Sign-In
              </h3>
              <p className="text-xs text-slate-500">
                Direct OAuth Authentication via Supabase
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

        {/* Selected Package Indicator */}
        <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Package: {selectedPlan === 'free' ? 'Free Explorer (5 Free Apps/mo)' : selectedPlan === 'fast_track' ? 'Fast-Track Pack (25 Apps)' : 'VIP Concierge (100 Apps)'}</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
            Active
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Primary 1-Click Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleOneClickGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
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
            )}
            <span>{loading ? 'Redirecting to Google...' : 'Direct 1-Click Login with Google'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Supabase Connection Details & Config Drawer */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${supabaseConfig ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{supabaseConfig ? 'Supabase Project Active' : 'Supabase Setup Required'}</span>
            </span>

            <button
              type="button"
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className="font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{showConfigDrawer ? 'Hide Keys' : 'Configure Supabase Keys'}</span>
            </button>
          </div>

          {showConfigDrawer && (
            <form onSubmit={handleSaveConfig} className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs text-slate-600 leading-relaxed">
                Copy your <strong>Project URL</strong> and <strong>anon public key</strong> from your open Supabase dashboard (Project Settings ➔ API):
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  required
                  value={supabaseUrl}
                  onChange={e => setSupabaseUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Supabase Anon Public API Key
                </label>
                <input
                  type="text"
                  required
                  value={supabaseKey}
                  onChange={e => setSupabaseKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Save & Enable 1-Click Login
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>OAuth 2.0 PKCE Encrypted via Supabase Auth</span>
        </div>

      </div>
    </div>
  );
}
