'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  CheckSquare, 
  Search, 
  Menu, 
  X, 
  GraduationCap,
  Users,
  BookOpen,
  Building2
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-slate-700/20 flex-shrink-0">
              <img src="/icon.svg" alt="US Career Solutions Icon" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                US<span className="text-blue-600">Career</span>Solutions
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                USA Jobs & Talent Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            <Link 
              href="/jobs" 
              className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-blue-500" />
              Daily Jobs
            </Link>

            <Link 
              href="/scholarships" 
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1.5 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              Scholarships
            </Link>

            <Link 
              href="/talent" 
              className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              Talent Board
            </Link>

            <Link 
              href="/learn" 
              className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              Interview Academy
            </Link>

            <Link 
              href="/recruiters" 
              className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              Post a Role
            </Link>

            <Link 
              href="/guides" 
              className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              Career Guides
            </Link>

            <Link 
              href="/tools/ats-scanner" 
              className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Free ATS Resume Checker
            </Link>

            <Link 
              href="/services" 
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              1-on-1 Help
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              My Account
            </Link>
            <a
              href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%20help%20with%20my%20US%20career"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href="/talent"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
            >
              Pitch Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden">
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
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2.5">
          <Link
            href="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm"
          >
            <Search className="w-4 h-4 text-blue-500" />
            Daily US Jobs
          </Link>
          <Link
            href="/scholarships"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-indigo-700 bg-indigo-50 font-bold text-sm"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            USA Scholarships & Assistantships
          </Link>
          <Link
            href="/talent"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-700 bg-blue-50 font-bold text-sm"
          >
            <Users className="w-4 h-4 text-blue-600" />
            Community Talent Showcase
          </Link>
          <Link
            href="/learn"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            Interview Prep Academy (STAR)
          </Link>
          <Link
            href="/recruiters"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            For Employers & Recruiters
          </Link>
          <Link
            href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            Career & Visa Intelligence Guides
          </Link>
          <Link
            href="/tools/ats-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Free ATS Resume Checker
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-700 bg-emerald-50 font-bold text-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            1-on-1 Career Guidance ($29 USD)
          </Link>
        </div>
      )}
    </header>
  );
}
