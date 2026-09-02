'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, ShieldCheck, Sparkles, Send, CheckSquare, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                US<span className="text-blue-600">Career</span>Solutions
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                USA Visa & Jobs Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/jobs" 
              className="text-sm font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-4 h-4 text-blue-500" />
              Daily US Jobs
            </Link>

            <Link 
              href="/tools/visa-checker" 
              className="text-sm font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Visa Sponsor Radar
            </Link>

            <Link 
              href="/tools/ats-scanner" 
              className="text-sm font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              AI Resume ATS Tool
            </Link>

            <Link 
              href="/tools/outreach-gen" 
              className="text-sm font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-4 h-4 text-indigo-500" />
              Recruiter Outreach
            </Link>

            <Link 
              href="/services" 
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              1-on-1 Consultation
            </Link>

            <Link 
              href="/tracker" 
              className="text-sm font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-slate-500" />
              My Tracker
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%20help%20with%20my%20US%20job%20search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 transition-colors"
              title="Chat on WhatsApp (+880 1981-505761)"
            >
              WhatsApp Us
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61573335766965"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              Follow Page
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
            >
              Book 1-on-1 Help
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            <Search className="w-5 h-5 text-blue-500" />
            Daily US Jobs
          </Link>
          <Link
            href="/tools/visa-checker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Visa Sponsor Radar
          </Link>
          <Link
            href="/tools/ats-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-amber-50 hover:text-amber-600 font-medium"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            AI Resume ATS Tool
          </Link>
          <Link
            href="/tools/outreach-gen"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            <Send className="w-5 h-5 text-indigo-500" />
            Recruiter Outreach Generator
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-700 bg-emerald-50 font-bold"
          >
            <Sparkles className="w-5 h-5 text-emerald-600" />
            1-on-1 Career Consultation
          </Link>
          <Link
            href="/tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium"
          >
            <CheckSquare className="w-5 h-5 text-slate-500" />
            My Application Tracker
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%20help%20with%20my%20US%20job%20search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 text-sm font-bold rounded-lg bg-emerald-600 text-white shadow-sm"
            >
              Chat on WhatsApp (+880 1981-505761)
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61573335766965"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 text-sm font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200"
            >
              Follow Jobs in USA on Facebook
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
