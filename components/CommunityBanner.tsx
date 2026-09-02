import React from 'react';
import Link from 'next/link';
import { MessageSquare, Bell, ArrowRight, CheckCircle } from 'lucide-react';

export default function CommunityBanner() {
  return (
    <section className="my-10 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold text-blue-300 mb-4">
          <Bell className="w-3.5 h-3.5" />
          Direct Community Access
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          Never Miss a Valid US Job or Visa Opportunity
        </h2>

        <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
          Join thousands of followers who receive everyday curated US job drops, H-1B lottery alerts, Cap-Exempt openings, and ATS resume advice directly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Daily US Jobs Ingestion</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>H-1B & Remote Filtering</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>1-Click AI Resume Care</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20want%20to%20join%20the%20community%20and%20get%20job%20updates"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            WhatsApp: +880 1981-505761
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61573335766965"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold bg-white text-blue-950 hover:bg-slate-100 px-5 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Facebook Community
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </a>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold bg-blue-600/60 hover:bg-blue-600 border border-blue-400/40 text-white px-5 py-3 rounded-xl shadow transition-all"
          >
            1-on-1 Resume & Career Help
          </Link>
        </div>
      </div>
    </section>
  );
}
