'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { createGoogleUserSession } from '@/lib/user-vault';
import { ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const redirectTo = searchParams.get('redirectTo') || '/dashboard';
  const plan = (searchParams.get('plan') as any) || 'free';

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setErrorMsg('Supabase is not configured. Please verify your Project URL and Anon Key.');
      return;
    }

    // 1. Process active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error fetching session:', error);
        setErrorMsg(error.message);
        return;
      }

      if (session?.user) {
        handleUserAuthenticated(session.user);
      }
    });

    // 2. Listen to auth state change (for hash/code exchange)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
        handleUserAuthenticated(session.user);
      }
    });

    function handleUserAuthenticated(user: any) {
      const meta = user.user_metadata || {};
      const name = meta.full_name || meta.name || user.email?.split('@')[0] || 'Candidate';
      const email = user.email || meta.email || '';
      const picture = meta.avatar_url || meta.picture || undefined;

      // Sync into user vault with 5 monthly free applications
      createGoogleUserSession(name, email, picture, plan);

      // Redirect directly to dashboard or target job
      router.replace(redirectTo);
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [redirectTo, plan, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full text-center shadow-xl space-y-4">
        {!errorMsg ? (
          <>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Authenticating with Google...
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verifying your credentials with Supabase and establishing your secure candidate session.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Authentication Notice
              </h2>
              <p className="text-xs text-rose-600 mt-1">
                {errorMsg}
              </p>
            </div>
            <button
              onClick={() => router.replace('/apply/choose-plan')}
              className="px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl shadow"
            >
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-xs font-bold text-slate-400">Completing Sign-In...</div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
