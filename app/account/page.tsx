'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="text-xs font-bold text-slate-400">Loading Candidate Dashboard...</div>
    </div>
  );
}
