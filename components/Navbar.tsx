'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileCheck, 
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
  BookOpen,
  Building2,
  ChevronDown,
  Calculator,
  DollarSign,
  FileText,
  MapPin,
  Flame,
  Award,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-2.5 shrink-0">
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

          {/* Desktop Mega Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            
            {/* 1. Jobs & Visas Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('jobs')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'jobs' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Jobs & Visas</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'jobs' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'jobs' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    USA Employment Pathways
                  </div>
                  <Link
                    href="/jobs"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Daily Verified Jobs</div>
                      <div className="text-[11px] text-slate-500">Live aggregated US job postings with sponsorship filters</div>
                    </div>
                  </Link>

                  <Link
                    href="/landing/visa-sponsorship-jobs"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1.5">
                        H-1B Sponsors Hub
                        <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded-full">Top Intent</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Companies hiring H-1B, Cap-Exempt & Schedule A</div>
                    </div>
                  </Link>

                  <Link
                    href="/jobs/cap-exempt-directory"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center gap-1.5">
                        100+ Cap-Exempt Database
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">No Lottery</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Universities, research labs & teaching hospitals</div>
                    </div>
                  </Link>

                  <Link
                    href="/landing/us-remote-jobs-w8ben"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">US Remote (W-8BEN)</div>
                      <div className="text-[11px] text-slate-500">Earn USD remotely with 0% US tax withholding</div>
                    </div>
                  </Link>

                  <Link
                    href="/jobs/states"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">50-State Career Directory</div>
                      <div className="text-[11px] text-slate-500">Browse salaries & tech jobs by state (CA, TX, NY, WA)</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Scholarships & Funding Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('scholarships')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'scholarships' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Scholarships & Funding</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'scholarships' ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'scholarships' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    100% Free US Degree Pathways
                  </div>
                  <Link
                    href="/scholarships"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">100% Fully-Funded Hub</div>
                      <div className="text-[11px] text-slate-500">Full tuition waivers + monthly living stipends</div>
                    </div>
                  </Link>

                  <Link
                    href="/scholarships/fee-waiver-directory"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                        Fall 2026 Fee Waivers
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">Save $1,500+</span>
                      </div>
                      <div className="text-[11px] text-slate-500">$0 application promo codes & GRE waivers</div>
                    </div>
                  </Link>

                  <Link
                    href="/guides/study-usa-zero-tuition-graduate-assistantship"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">GTA & GRA Application Protocol</div>
                      <div className="text-[11px] text-slate-500">How to get teaching/research assistantships</div>
                    </div>
                  </Link>

                  <Link
                    href="/guides/day-1-cpt-universities-usa-legitimate-list-uscis-guide-2026"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center gap-1.5">
                        Day 1 CPT Universities [2026]
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">New Guide</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Accredited colleges, hybrid schedules & RFE defense</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Interactive Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('tools')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'tools' ? 'bg-amber-50 text-amber-800' : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Interactive Tools</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'tools' ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'tools' && (
                <div className="absolute left-0 mt-2 w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Live Data Calculators & Scanners
                  </div>
                  
                  <Link
                    href="/tools/eb2-niw-evaluator"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                        EB-2 NIW Profile Evaluator
                        <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded-full">Dhanasar Test</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Self-petition Green Card odds & citation calculator</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/opt-grace-period-calculator"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-rose-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 flex items-center gap-1.5">
                        F-1 OPT Grace Period Calculator
                        <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded-full">60-Day Window</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Track 90/150-day unemployment & SEVIS transfer deadlines</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/lca-salary-search"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center gap-1.5">
                        ⚡ Live H-1B LCA Salary Search
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">DOL Data</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Search 10,000+ certified prevailing wage filings</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/salary-tax-calculator"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                        STEM OPT & Salary Tax Calculator
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">FICA Exempt</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Estimate take-home pay, federal & state taxes</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/w8ben-validator"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                        W-8BEN Compliance Validator
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">0% Tax</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Foreign Tax ID (FTIN) check & treaty rates</div>
                    </div>
                  </Link>



                  <Link
                    href="/tools/ats-scanner"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">AI ATS Resume Checker</div>
                      <div className="text-[11px] text-slate-500">Score your CV against Workday & Greenhouse algorithms</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/outreach-gen"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600">Recruiter Cold Outreach Generator</div>
                      <div className="text-[11px] text-slate-500">Generate high-converting LinkedIn & email messages</div>
                    </div>
                  </Link>

                  <Link
                    href="/tracker"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Application Tracker</div>
                      <div className="text-[11px] text-slate-500">Track interviews, statuses & follow-up reminders</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Master Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('guides')}
                className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'guides' ? 'bg-purple-50 text-purple-700' : 'text-slate-700 hover:text-purple-600 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Master Guides (14)</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'guides' ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'guides' && (
                <div className="absolute left-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 flex items-center justify-between">
                    <span>Institutional Career Blueprints</span>
                    <Link href="/guides" onClick={closeAll} className="text-blue-600 hover:underline">View All 14 →</Link>
                  </div>

                  <Link
                    href="/guides/h1b-to-green-card-perm-i140-timeline-audit-guide-2026"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 flex items-center gap-1.5">
                        H-1B to Green Card PERM Roadmap
                        <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded-full">New</span>
                      </div>
                      <div className="text-[11px] text-slate-500">PWD ETA-9141, Sunday recruitment & AC21 portability</div>
                    </div>
                  </Link>

                  <Link
                    href="/guides/us-job-offer-salary-negotiation-masterclass-2026"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Salary Negotiation Masterclass</div>
                      <div className="text-[11px] text-slate-500">DOL Level IV leverage, signing bonus scripts & equity</div>
                    </div>
                  </Link>

                  <Link
                    href="/guides/uscis-form-i-912-fee-waiver-green-card-citizenship-guide-2026"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Form I-912 $0 USCIS Fee Waiver</div>
                      <div className="text-[11px] text-slate-500">150% HHS poverty guidelines & Green Card fee exemptions</div>
                    </div>
                  </Link>

                  <Link
                    href="/guides/eb2-niw-self-petition-green-card-guide-2026"
                    onClick={closeAll}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">EB-2 NIW Self-Petition Guide</div>
                      <div className="text-[11px] text-slate-500">Matter of Dhanasar 3-prong framework & STEM criteria</div>
                    </div>
                  </Link>

                  <div className="pt-2 border-t border-slate-100 mt-1 px-3">
                    <Link
                      href="/guides"
                      onClick={closeAll}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between py-1"
                    >
                      <span>Explore All 14 In-Depth Guides</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/talent"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Talent Board</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>1-on-1 Concierge</span>
            </Link>

            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all whitespace-nowrap"
            >
              <span>Find US Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Accordion Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[85vh] overflow-y-auto px-4 py-6 space-y-6">
          
          {/* Section 1: Jobs & Visas */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Jobs & Visa Sponsorship
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/jobs" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">Daily Verified Jobs</Link>
              <Link href="/landing/visa-sponsorship-jobs" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">H-1B Sponsors Hub</Link>
              <Link href="/landing/us-remote-jobs-w8ben" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">US Remote Jobs (W-8BEN 0% Tax)</Link>
              <Link href="/jobs/states" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">50-State Career Radar</Link>
            </div>
          </div>

          {/* Section 2: Scholarships & Funding */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Scholarships & Degree Pathways
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/scholarships" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">100% Fully-Funded Hub</Link>
              <Link href="/scholarships/fee-waiver-directory" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">Fall 2026 Fee Waivers ($0 Codes)</Link>
              <Link href="/guides/study-usa-zero-tuition-graduate-assistantship" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">GTA & Assistantship Blueprint</Link>
              <Link href="/guides/day-1-cpt-universities-usa-legitimate-list-uscis-guide-2026" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600">Day 1 CPT Universities [2026 List]</Link>
            </div>
          </div>

          {/* Section 3: Interactive Tools */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Tools
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/tools/lca-salary-search" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">⚡ Live H-1B LCA Salary Search</Link>
              <Link href="/tools/salary-tax-calculator" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">STEM OPT & Salary Tax Calculator</Link>
              <Link href="/tools/ats-scanner" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">AI ATS Resume Checker</Link>
              <Link href="/tools/outreach-gen" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">Recruiter Outreach Generator</Link>
              <Link href="/tracker" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-amber-700">Application Tracker</Link>
            </div>
          </div>

          {/* Section 4: Master Guides */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-purple-600 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Master Guides (14)
            </div>
            <div className="space-y-1 pl-2">
              <Link href="/guides/h1b-to-green-card-perm-i140-timeline-audit-guide-2026" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">H-1B to Green Card PERM Roadmap</Link>
              <Link href="/guides/us-job-offer-salary-negotiation-masterclass-2026" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">Salary Negotiation Masterclass</Link>
              <Link href="/guides/uscis-form-i-912-fee-waiver-green-card-citizenship-guide-2026" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">Form I-912 $0 USCIS Fee Waiver</Link>
              <Link href="/guides/eb2-niw-self-petition-green-card-guide-2026" onClick={closeAll} className="block py-2 text-sm font-semibold text-slate-800 hover:text-purple-600">EB-2 NIW Self-Petition Guide</Link>
              <Link href="/guides" onClick={closeAll} className="block py-2 text-sm font-bold text-blue-600">Explore All 14 Guides →</Link>
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <Link
              href="/services"
              onClick={closeAll}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-sm border border-emerald-300 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Book 1-on-1 Career Consultation</span>
            </Link>
            <Link
              href="/jobs"
              onClick={closeAll}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
            >
              <span>Find US Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
