'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Building2, 
  Briefcase, 
  Send,
  Zap,
  Lock,
  Clock,
  RefreshCw
} from 'lucide-react';
import { PlanTier, getCurrentUser, createGoogleUserSession } from '@/lib/user-vault';
import GoogleAuthModal from '@/components/GoogleAuthModal';
import { signInWithGoogleSupabase } from '@/lib/supabase';

function ChoosePlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = searchParams.get('jobId') || '';
  const jobTitle = searchParams.get('title') || 'Target US Role';
  const company = searchParams.get('company') || 'Verified U.S. Employer';

  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('free');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) {
      router.push(`/dashboard${jobId ? `?jobId=${encodeURIComponent(jobId)}&title=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}` : ''}`);
    }
  }, [jobId, jobTitle, company, router]);

  const handleContinueWithGoogle = async () => {
    setLoading(true);
    try {
      const destination = `/dashboard${jobId ? `?jobId=${encodeURIComponent(jobId)}&title=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}` : ''}`;
      const callbackUrl = `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(destination)}&plan=${selectedPlan}`;
      await signInWithGoogleSupabase(callbackUrl);
    } catch (err) {
      console.warn('Direct OAuth initialization fallback:', err);
      setShowGoogleModal(true);
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    router.push(`/dashboard${jobId ? `?jobId=${encodeURIComponent(jobId)}&title=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb & Job Target Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Step 1 of 2: Select Package
              </span>
              <span className="text-xs text-slate-400 font-medium">Direct Application Gateway</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              Apply to {jobTitle}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{company}</span>
              <span>•</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Verified U.S. Opportunity</span>
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Link
              href="/jobs"
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Back to Jobs
            </Link>
          </div>
        </div>

        {/* Pricing & Plan Selection Cards */}
        <div>
          <div className="text-center mb-6 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Choose Your Application Package
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Select Free Explorer for 5 free applications per month, or upgrade for bulk recruiter outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Plan 1: Free Explorer (5 Free / Month) */}
            <div 
              onClick={() => setSelectedPlan('free')}
              className={`bg-white rounded-3xl border-2 p-6 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                selectedPlan === 'free'
                  ? 'border-blue-600 ring-4 ring-blue-50 shadow-xl'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                    Recommended
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'free' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {selectedPlan === 'free' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">Free Explorer</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Perfect for starting your search</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-3xl font-black text-slate-900">$0</div>
                  <div className="text-xs font-bold text-emerald-700 mt-0.5">5 Free Applications / Month</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>5 Direct Applications</strong> per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Instant AI ATS Resume Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tailored Cover Letter Generator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Application Status Dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    selectedPlan === 'free'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {selectedPlan === 'free' ? 'Selected' : 'Select Free'}
                </button>
              </div>
            </div>

            {/* Plan 2: Fast-Track Pack ($19.99 / ৳1,990) */}
            <div 
              onClick={() => setSelectedPlan('fast_track')}
              className={`bg-white rounded-3xl border-2 p-6 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                selectedPlan === 'fast_track'
                  ? 'border-blue-600 ring-4 ring-blue-50 shadow-xl'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full">
                    High Conversion
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'fast_track' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {selectedPlan === 'fast_track' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">Fast-Track Pack</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Accelerate hiring manager screens</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-3xl font-black text-slate-900">
                    $19.99 <span className="text-xs font-bold text-slate-400">/ ৳1,990</span>
                  </div>
                  <div className="text-xs font-bold text-blue-700 mt-0.5">25 Direct Applications</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>25 Direct Applications</strong> with AI Dossier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hiring Manager LinkedIn Scripts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Priority Recruiter Read Beacons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>bKash / Nagad / Card Accepted</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    selectedPlan === 'fast_track'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {selectedPlan === 'fast_track' ? 'Selected' : 'Select Fast-Track'}
                </button>
              </div>
            </div>

            {/* Plan 3: VIP Concierge ($49.99 / ৳4,990) */}
            <div 
              onClick={() => setSelectedPlan('vip')}
              className={`bg-white rounded-3xl border-2 p-6 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                selectedPlan === 'vip'
                  ? 'border-blue-600 ring-4 ring-blue-50 shadow-xl'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-full">
                    Executive
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'vip' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {selectedPlan === 'vip' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">VIP Concierge</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Maximum reach & manual audit</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-3xl font-black text-slate-900">
                    $49.99 <span className="text-xs font-bold text-slate-400">/ ৳4,990</span>
                  </div>
                  <div className="text-xs font-bold text-purple-700 mt-0.5">100 Direct Applications</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>100 Direct Applications</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>1-on-1 Visa & Dossier Audit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dedicated WhatsApp Concierge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Custom Cold Email Outreach List</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    selectedPlan === 'vip'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {selectedPlan === 'vip' ? 'Selected' : 'Select VIP'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Step 2: Sign Up Directly with Google */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md text-center space-y-4">
          <div className="max-w-md mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
              Step 2 of 2: Activate Your Dashboard
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Continue to Sign Up with Google
            </h3>
            <p className="text-xs text-slate-500">
              Your personalized candidate dashboard will be activated instantly with your selected package.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleContinueWithGoogle}
              disabled={loading}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all"
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
              <span>{loading ? 'Connecting to Google...' : 'Continue with Google'}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Instant Access • No credit card required for Free Explorer (5 Apps/Month)</span>
          </div>
        </div>

      </div>

      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={handleAuthSuccess}
        selectedPlan={selectedPlan}
        targetJobId={jobId}
        targetTitle={jobTitle}
        targetCompany={company}
      />
    </div>
  );
}

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-xs font-bold text-slate-400">Loading Application Gateway...</div>
      </div>
    }>
      <ChoosePlanContent />
    </Suspense>
  );
}
