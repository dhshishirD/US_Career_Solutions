'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  ShieldCheck, 
  Sparkles,
  Scale,
  Clock, 
  Send, 
  CheckSquare, 
  Search, 
  Menu, 
  X, 
  GraduationCap,
  Users,
  User,
  BookOpen,
  Building2,
  ChevronDown,
  Calculator,
  DollarSign,
  FileCheck,
  MapPin,
  Flame,
  Award,
  ArrowRight,
  ExternalLink,
  CreditCard,
  Stethoscope,
  Tractor,
  HelpCircle,
  MessageCircle,
  Info,
  PhoneCall
} from 'lucide-react';
import { getCurrentUser, GoogleUserProfile } from '@/lib/user-vault';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<GoogleUserProfile | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" ref={dropdownRef}>
      {/* Top Updated Status & Multi-Channel Support Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              UPDATED STATUS
            </span>
            <span className="hidden md:inline text-slate-300 truncate">
              Live Directories: Cap-Exempt H-1B, Schedule A Nursing & $0 Scholarships Verified
            </span>
            <span className="md:hidden text-slate-300 text-[11px] truncate">
              Live US Visa & Scholarship Directories
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <a 
              href="https://t.me/usacareeroppurtunity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram <span className="hidden sm:inline">Channel</span></span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://www.facebook.com/profile.php?id=61573335766965" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Facebook <span className="hidden sm:inline">Page</span></span>
            </a>
            <span className="hidden lg:inline text-slate-700">|</span>
            <a 
              href="https://wa.me/8801627714636" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp: 01627714636</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo - Fully Locked & Un-shrinkable */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-sm border border-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform">
              <img src="/icon.svg" alt="US Career Solutions Icon" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">
                US<span className="text-blue-600">Career</span>Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation - Streamlined into 4 Organized Hubs */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            
            {/* 1. Jobs Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('jobs')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'jobs' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Jobs</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'jobs' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'jobs' && (
                <div className="absolute left-0 mt-2 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Verified US Job Directories</span>
                    <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">DOL & USCIS Statutory</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/jobs/cap-exempt-directory"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center gap-1">
                          <span className="truncate">Cap-Exempt H-1B</span>
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0">No Lottery</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Universities & research labs</div>
                      </div>
                    </Link>

                    <Link
                      href="/jobs/nursing-schedule-a-directory"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-rose-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Stethoscope className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700 flex items-center gap-1">
                          <span className="truncate">Nurse & Healthcare</span>
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded shrink-0">EB-3</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Direct hospital Green Card</div>
                      </div>
                    </Link>

                    <Link
                      href="/jobs/seasonal-h2-directory"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Tractor className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 flex items-center gap-1">
                          <span className="truncate">H-2A / H-2B Seasonal</span>
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0">AEWR</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Certified seasonal employers</div>
                      </div>
                    </Link>

                    <Link
                      href="/landing/us-remote-jobs-w8ben"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <DollarSign className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1">
                          <span className="truncate">US Remote (W-8BEN)</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded shrink-0">0% Tax</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Global remote contractor roles</div>
                      </div>
                    </Link>

                    <Link
                      href="/jobs/states"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-purple-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 flex items-center gap-1">
                          <span className="truncate">50-State Career Radar</span>
                          <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded shrink-0">Wages</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Salaries across CA, TX, NY & WA</div>
                      </div>
                    </Link>

                    <Link
                      href="/jobs"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-blue-900 group-hover:text-blue-700 flex items-center gap-1">
                          <span className="truncate">Browse 100+ Jobs</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="text-[11px] text-blue-600 line-clamp-1 mt-0.5">Direct 1-click ATS applications</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Scholarships Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('scholarships')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'scholarships' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Scholarships</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'scholarships' ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'scholarships' && (
                <div className="absolute left-0 mt-2 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>100% Free US Degree Pathways</span>
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">Fall 2026</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/scholarships"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-indigo-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                          <span className="truncate">Fully-Funded Hub</span>
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded shrink-0">12 Unis</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Full tuition + monthly living stipend</div>
                      </div>
                    </Link>

                    <Link
                      href="/scholarships/fee-waiver-directory"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1">
                          <span className="truncate">Fall 2026 Fee Waivers</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded shrink-0">Save $1.5k</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">$0 promo codes & GRE waivers</div>
                      </div>
                    </Link>

                    <Link
                      href="/guides/study-usa-zero-tuition-graduate-assistantship"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-purple-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 flex items-center gap-1">
                          <span className="truncate">GTA & GRA Positions</span>
                          <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded shrink-0">Guide</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Funded teaching & research jobs</div>
                      </div>
                    </Link>

                    <Link
                      href="/guides/day-1-cpt-universities-usa-legitimate-list-uscis-guide-2026"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center gap-1">
                          <span className="truncate">Day 1 CPT Colleges</span>
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0">2026</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Accredited hybrid work-study</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('tools')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'tools' ? 'bg-amber-50 text-amber-800' : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tools</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'tools' ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'tools' && (
                <div className="absolute left-1/2 -translate-x-1/3 mt-2 w-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Live Statutory Data Calculators & Scanners</span>
                    <span className="text-[9px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full">100% Free Tools</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/tools/ats-scanner"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                          <span className="truncate">AI ATS Resume Scanner</span>
                          <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded shrink-0">Score</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Workday & Greenhouse keywords</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/lca-salary-search"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center gap-1">
                          <span className="truncate">H-1B Wage Search</span>
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0">DOL Data</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Certified LCA prevailing wages</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/eb2-niw-evaluator"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-indigo-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Scale className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                          <span className="truncate">EB-2 NIW Evaluator</span>
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded shrink-0">Dhanasar</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Green Card self-petition odds</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/opt-grace-period-calculator"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-rose-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 flex items-center gap-1">
                          <span className="truncate">F-1 OPT Grace Period</span>
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded shrink-0">60 Days</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Track unemployment & SEVIS dates</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/w8ben-validator"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FileCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1">
                          <span className="truncate">W-8BEN Validator</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded shrink-0">Treaty</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Validate FTIN & foreign tax treaty</div>
                      </div>
                    </Link>

                    <Link
                      href="/tracker"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                          <span className="truncate">Application CRM</span>
                          <span className="text-[9px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded shrink-0">CRM</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Track interviews & milestones</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Resources & Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('resources')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'resources' ? 'bg-purple-50 text-purple-700' : 'text-slate-700 hover:text-purple-600 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Resources & Guides</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'resources' ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute right-0 mt-2 w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Institutional Blueprints & Company Hub</span>
                    <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full">17 Guides</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/guides"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-purple-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 flex items-center gap-1">
                          <span className="truncate">Master Guides (17)</span>
                          <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded shrink-0">New</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">PERM, Salary Negotiation & NIW</div>
                      </div>
                    </Link>

                    <Link
                      href="/talent"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                          <span className="truncate">Talent Board</span>
                          <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded shrink-0">Radar</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Vetted international candidates</div>
                      </div>
                    </Link>

                    <Link
                      href="/services"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1">
                          <span className="truncate">1-on-1 Concierge</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded shrink-0">VIP</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Personalized petition strategy</div>
                      </div>
                    </Link>

                    <Link
                      href="/about"
                      onClick={closeAll}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Info className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                          <span className="truncate">About Platform</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Our compliance mission & team</div>
                      </div>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                    <Link href="/contact" onClick={closeAll} className="hover:text-blue-600 flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Contact Helpdesk</span>
                    </Link>
                    <a href="https://wa.me/8801627714636" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-bold">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct: 01627714636</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Desktop Right Actions: Premium Services, User Profile & CTA */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Premium Services Button */}
            <Link
              href="/pricing"
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Premium Services</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-full">
                $10
              </span>
            </Link>

            {/* Candidate Dashboard / Google Session */}
            {currentUser ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-blue-900 transition-colors shadow-sm"
              >
                <img src={currentUser.picture} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover border border-blue-300" />
                <span className="truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
                <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {currentUser.credits}
                </span>
              </Link>
            ) : (
              <Link
                href="/apply/choose-plan"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold bg-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Sign In</span>
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find US Jobs</span>
            </Link>
          </div>

          {/* Mobile menu hamburger toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200"
              >
                <img src={currentUser.picture} alt={currentUser.name} className="w-4 h-4 rounded-full" />
                <span>{currentUser.credits}</span>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Accordion Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[85vh] overflow-y-auto px-4 py-5 space-y-5 animate-in fade-in">
          
          {/* Quick Access Status Banner */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-800">Direct Live Status</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
              Directories Active
            </span>
          </div>

          {/* Section 1: Jobs */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Jobs
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/jobs/cap-exempt-directory" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
                Cap-Exempt H-1B Directory (No Lottery)
              </Link>
              <Link href="/jobs/nursing-schedule-a-directory" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
                50-State Nurse & Healthcare Hub (Schedule A)
              </Link>
              <Link href="/jobs/seasonal-h2-directory" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
                H-2A & H-2B Seasonal Directory
              </Link>
              <Link href="/jobs/states" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
                50-State Career Radar & Prevailing Salaries
              </Link>
              <Link href="/landing/us-remote-jobs-w8ben" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
                US Remote Hub (W-8BEN 0% Tax)
              </Link>
              <Link href="/jobs" onClick={closeAll} className="block py-2 text-sm font-bold text-blue-600">
                Browse All 100+ Live Jobs →
              </Link>
            </div>
          </div>

          {/* Section 2: Scholarships */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Scholarships
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/scholarships" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">
                100% Fully-Funded Degree Hub
              </Link>
              <Link href="/scholarships/fee-waiver-directory" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">
                Fall 2026 Application Fee Waivers ($0 Codes)
              </Link>
              <Link href="/guides/study-usa-zero-tuition-graduate-assistantship" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">
                GTA & GRA Teaching Assistantships
              </Link>
              <Link href="/guides/day-1-cpt-universities-usa-legitimate-list-uscis-guide-2026" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">
                Day 1 CPT Universities [2026 List]
              </Link>
            </div>
          </div>

          {/* Section 3: Tools */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Tools
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/tools/ats-scanner" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">
                AI ATS Resume Scanner & Scorer
              </Link>
              <Link href="/tools/lca-salary-search" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">
                Live H-1B Prevailing Wage Search
              </Link>
              <Link href="/tools/eb2-niw-evaluator" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">
                EB-2 NIW Profile Evaluator
              </Link>
              <Link href="/tools/opt-grace-period-calculator" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">
                F-1 OPT Grace Period Calculator
              </Link>
              <Link href="/tools/w8ben-validator" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">
                W-8BEN Compliance Validator
              </Link>
              <Link href="/tracker" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">
                Application Status CRM
              </Link>
            </div>
          </div>

          {/* Section 4: Guides & Platform */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-purple-600 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Resources & Network
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/guides" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">
                Master Career Guides (17 Blueprints)
              </Link>
              <Link href="/talent" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">
                Candidate Talent Board
              </Link>
              <Link href="/services" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">
                1-on-1 Visa & Career Concierge
              </Link>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/about" onClick={closeAll} className="text-xs font-bold text-slate-600 hover:text-blue-600">
                  About Us
                </Link>
                <Link href="/contact" onClick={closeAll} className="text-xs font-bold text-slate-600 hover:text-blue-600">
                  Contact Helpdesk
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Action Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <Link
              href="/dashboard"
              onClick={closeAll}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>{currentUser ? `My Candidate Dashboard (${currentUser.credits} Apps)` : 'Sign In with Google'}</span>
            </Link>

            <Link
              href="/pricing"
              onClick={closeAll}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-900 font-bold text-sm border border-blue-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Premium Services</span>
              </div>
              <span className="text-xs bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                From $10 / ৳1,000
              </span>
            </Link>

            <Link
              href="/jobs"
              onClick={closeAll}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Find US Jobs & Apply</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
