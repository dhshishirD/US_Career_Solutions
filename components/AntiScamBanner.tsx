import React from 'react';
import { ShieldAlert, AlertTriangle, MessageCircle, CheckCircle } from 'lucide-react';

export default function AntiScamBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Anti-Scam Notice:</strong> Legitimate US employers will <u>never</u> ask you for money, application fees, or crypto. All jobs on our site are verified.
          </span>
        </div>
        <a
          href="https://wa.me/8801981505761?text=Hi%2C%20I%20want%20to%20report%20a%20suspicious%20job%20or%20recruiter"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 hover:text-amber-900 font-bold underline shrink-0 flex items-center gap-1"
        >
          Report an issue
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-orange-50 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm sm:text-base font-black text-amber-950">
                Official Anti-Scam & Trust Protection Shield
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                Verified Safe
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed max-w-3xl">
              <strong>Zero-Tolerance for Scams:</strong> Legitimate US employers and universities pay <em>you</em> — they will <strong>NEVER</strong> charge application fees, visa guarantee fees, or request payment via gift cards/cryptocurrency. Never share sensitive passwords or banking OTPs.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <a
            href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20want%20to%20report%20a%20suspicious%20inquiry%20or%20job"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 px-4 py-2.5 rounded-xl shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-800" />
            Report Suspicious Activity
          </a>
        </div>
      </div>
    </div>
  );
}
