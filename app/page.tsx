'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Sparkles,
  Scale,
  Clock, 
  ShieldCheck, 
  Send, 
  CheckSquare, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase,
  Globe2,
  TrendingUp,
  Zap,
  Building2,
  GraduationCap,
  Calculator,
  DollarSign,
  Award,
  BookOpen,
  Layers,
  Flame,
  FileText,
  MapPin,
  Check,
  Lock,
  Star,
  Users,
  Stethoscope,
  Tractor,
  PhoneCall,
  HeartHandshake,
  BookmarkCheck,
  FileCheck
} from 'lucide-react';
import JobCard from '@/components/JobCard';
import CommunityBanner from '@/components/CommunityBanner';
import { JobPosting } from '@/lib/types';
import { INITIAL_JOBS } from '@/lib/jobs-data';
import { MASTER_GUIDES } from '@/lib/guides-data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      })
      .catch(() => {});
  }, []);

  const featuredJobs = jobs.filter(j => {
    if (selectedTag === 'h1b') return j.visaSponsorship === 'H-1B Sponsor';
    if (selectedTag === 'capexempt') return j.visaSponsorship === 'Cap-Exempt H-1B';
    if (selectedTag === 'remote') return j.isRemote || j.visaSponsorship === 'US Remote (Contractor/W-8BEN)';
    return true;
  }).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20">
      
      {/* =========================================================================
          1. HERO SECTION: World-Class Trust, Executive Palette, Psychological Clarity
      ========================================================================= */}
      <section className="text-center max-w-4xl mx-auto pt-2 pb-4">
        {/* Real-Time Live Status Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-extrabold uppercase tracking-wide text-emerald-700">Updated Status:</span>
          <span>Verified Cap-Exempt H-1B, Schedule A Healthcare & $0 Scholarships Live</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
          Your Direct Bridge to Verified <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900">
            U.S. Visa Sponsorship & USD Remote Jobs
          </span>
        </h1>

        {/* Value Proposition & Psychological Reassurance */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bypass the automated ATS black hole with <strong>pre-vetted statutory employer directories</strong>, 1-click AI resume optimization, and a <strong>permanent cloud vault</strong> that stores your tailored documents forever.
        </p>

        {/* Dual Primary Call-To-Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/jobs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-sm sm:text-base font-extrabold bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span>Browse 100+ Verified Jobs (5 Free / Mo)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/scholarships"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base font-bold bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 shadow-sm transition-all"
          >
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>$0 Tuition Scholarships Directory</span>
          </Link>
        </div>

        {/* Quick Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-grow">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by role, university, hospital, or visa (e.g. Software, Nurse, Stanford, W-8BEN)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent py-2.5"
            />
          </div>
          <Link
            href={`/jobs?q=${encodeURIComponent(searchQuery)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl shadow transition-all whitespace-nowrap"
          >
            Search Openings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Statutory Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 sm:gap-10 text-slate-600 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>100%</strong> Statutory DOL & USCIS Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600 shrink-0" />
            <span><strong>91.4%</strong> First-Pass ATS Compatibility</span>
          </div>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-purple-600 shrink-0" />
            <span><strong>Permanent Vault:</strong> Progress Never Expires</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CORE DIRECTORIES OF THE PLATFORM (Top Importance)
      ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
            Official Directory Hub
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore 4 Primary Statutory Directories
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Direct statutory pipelines vetted against federal regulations for international professionals, students, and remote specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          
          {/* Directory 1: Cap-Exempt H-1B (No Lottery) */}
          <Link
            href="/jobs/cap-exempt-directory"
            className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-600" />
                  INA § 214(g)(5)
                </span>
                <span className="text-xs font-bold text-blue-600">No Lottery</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Cap-Exempt H-1B Directory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                File Form I-129 year-round with 100+ accredited U.S. universities, academic research hospitals, and federally funded scientific centers without lottery caps.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>MIT, Stanford, UIUC & Purdue Openings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Concurrent Private Work Permitted</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Explore 35+ Employers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Directory 2: Schedule A Healthcare (Direct EB-3 Green Card) */}
          <Link
            href="/jobs/nursing-schedule-a-directory"
            className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-rose-500 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-800 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                  <Stethoscope className="w-3 h-3 text-rose-600" />
                  20 CFR § 656.5
                </span>
                <span className="text-xs font-bold text-rose-600">Direct Green Card</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                Schedule A Nurse & Healthcare Hub
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-certified healthcare shortage occupations exempt from the 18-month DOL PERM labor market test. Direct Form I-140 filing with premier hospital systems.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>$80,000 – $145,000 Prevailing Wage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>50-State Endorsement & VisaScreen Guide</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>View 25+ Hospital Sponsors</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Directory 3: 100% Fully-Funded Degree Scholarships */}
          <Link
            href="/scholarships"
            className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
                  <Award className="w-3 h-3 text-indigo-600" />
                  $0 Tuition + Stipend
                </span>
                <span className="text-xs font-bold text-indigo-600">Fall 2026</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                Fully-Funded Scholarships Directory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Database of 12 top U.S. universities offering 100% full tuition waivers, teaching/research assistantships (GTA/GRA), and $2,000–$3,500/mo living stipends.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Fall 2026 $0 Application Fee Codes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Day 1 CPT & Assistantship Protocols</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Browse 12 Fully-Funded Hubs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Directory 4: US Remote Jobs (W-8BEN 0% Tax) */}
          <Link
            href="/landing/us-remote-jobs-w8ben"
            className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-emerald-600" />
                  IRC § 1441 / 894
                </span>
                <span className="text-xs font-bold text-emerald-600">0% US Tax</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                US Remote Hub (W-8BEN)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work remotely from anywhere in the world for U.S. tech firms. Earn direct USD via bank wire, Wise, or Payoneer under bilateral double-tax treaty protections.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>$3,500 – $7,000 / Month Direct USD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Foreign Contractor Compliance Packet</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>View Remote Openings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          3. HOW IT WORKS & PERMANENT VAULT GUARANTEE (Psychological Safety)
      ========================================================================= */}
      <section className="bg-slate-50/90 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
            Zero-Friction Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How You Secure Interviews Without Losing Any Progress
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed to empower your search today while keeping every tailored CV, cover letter, and application safely preserved forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Select Verified Opening</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Browse statutory listings across universities, hospitals, and remote employers with transparent DOL prevailing wage data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">1-Click ATS Optimization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI maps job requirements into your CV, tunes keywords for Workday & Greenhouse, and drafts custom 3-paragraph cover letters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Track Direct Submissions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monitor verified dispatch milestones, recruiter follow-up contacts, and response timelines in your personal CRM.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-sm">
              04
            </div>
            <h3 className="text-base font-bold text-purple-950 flex items-center gap-1.5">
              <span>Permanent Vault</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your work is 100% saved under your account forever. No work is ever deleted. Upgrade whenever you have funds, starting from just $10.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. FEATURED LIVE POSITIONS (Filterable Feed)
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Live Verified Openings
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Positions Updated Today
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every opening includes confirmed statutory visa sponsorship signals or foreign remote contractor eligibility.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Positions' },
              { id: 'h1b', label: 'H-1B Sponsors' },
              { id: 'capexempt', label: 'Cap-Exempt (No Lottery)' },
              { id: 'remote', label: 'US Remote (W-8BEN)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTag(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedTag === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-7 py-3.5 rounded-2xl border border-blue-200 transition-colors shadow-sm"
          >
            Browse All {jobs.length}+ Verified USA Job Openings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          5. INSTANT ACCESS DIAGNOSTIC COMMAND CENTER (8 Core Tools)
      ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Statutory Decision Engines
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Interactive Diagnostic Tools
            </h2>
          </div>
          <span className="text-xs font-bold text-indigo-600 hidden sm:inline">6 Core Free Calculators & Evaluators</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: AI ATS Resume Scanner */}
          <Link
            href="/tools/ats-scanner"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Workday & Greenhouse
                </span>
                <span className="text-xs font-bold text-slate-400">Instant Score</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                AI ATS Resume Scanner
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Score your CV against any job description. Identify missing technical keywords and formatting pitfalls that trigger automated rejections.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Scan Resume Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Live H-1B Prevailing Wage Search */}
          <Link
            href="/tools/lca-salary-search"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                  DOL OFLC Filings
                </span>
                <span className="text-xs font-bold text-slate-400">10,000+ Records</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                <Search className="w-4 h-4 text-amber-600" />
                Live H-1B Wage Search
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Look up certified prevailing wages, Level I–IV salary bands, and certified employers by occupational title and US metropolitan county.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Search Certified Wages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: EB-2 NIW Profile Evaluator */}
          <Link
            href="/tools/eb2-niw-evaluator"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Matter of Dhanasar
                </span>
                <span className="text-xs font-bold text-slate-400">Self-Petition</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-600" />
                EB-2 NIW Profile Evaluator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Test your direct permanent residency odds without a sponsor based on your advanced degree, citations, publications, and national endeavor.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Evaluate NIW Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: F-1 OPT Grace Period Calculator */}
          <Link
            href="/tools/opt-grace-period-calculator"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-rose-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-rose-50 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                  8 CFR § 214.2(f)
                </span>
                <span className="text-xs font-bold text-slate-400">SEVIS Safe</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-rose-600 transition-colors flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-600" />
                F-1 OPT Grace Period Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Track your 90/150-day unemployment allowance, calculate 60-day post-completion departure windows, and avoid SEVIS status termination.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>Calculate Deadlines Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: W-8BEN Form Validator */}
          <Link
            href="/tools/w8ben-validator"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  IRS Foreign Contractor
                </span>
                <span className="text-xs font-bold text-slate-400">0% Withholding</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                W-8BEN Compliance Validator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Check FTIN validation, identify tax treaty reduction articles, and prepare compliant compliance certificates for U.S. clients.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Validate W-8BEN Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: 50-State Salary & Tax Calculator */}
          <Link
            href="/tools/salary-tax-calculator"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                  IRS 2026 Brackets
                </span>
                <span className="text-xs font-bold text-slate-400">All 50 States</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-600" />
                50-State Net Salary Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Accurately forecast take-home pay after federal, FICA, and state income taxes across Texas, California, Washington, and New York.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Calculate Net Pay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          6. PREMIUM SERVICES: Lower Barrier Starting from $10 / ৳1,000
      ========================================================================= */}
      <section className="space-y-8 pt-2">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600">
            Transparent Pricing • Permanent Preservation
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Select Your Application Tier
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Start free with 5 applications. Upgrade anytime starting from just <strong>$10.00 / ৳1,000</strong> without ever losing your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tier 1: Free Explorer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  Free Forever
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">Free Explorer</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 font-semibold">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">Full access to explore and search with zero credit card required.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>5 Free Applications</strong> / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant ATS Resume Compatibility Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Permanent Cloud Vault (Never deleted)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full access to 100+ verified listings</span>
                </li>
              </ul>
            </div>

            <Link
              href="/jobs"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl transition-colors"
            >
              Start Free (5 Credits)
            </Link>
          </div>

          {/* Tier 2: Starter Pass ($10 - NEW ACCESSIBLE ENTRY) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-md flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Accessible Entry Tier
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Starter Pass
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">Starter Pass</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">$10.00</span>
                  <span className="text-xs text-slate-500 font-bold">one-time <span className="text-emerald-700">(৳1,000)</span></span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">Low-barrier upgrade for serious job applications.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>15 Direct Submissions</strong> / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1-Click ATS Tailored CV Builder</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Auto-Generated Cover Letter Studio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Permanent Vault Cloud Preservation</span>
                </li>
              </ul>
            </div>

            <Link
              href="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl shadow-sm transition-all"
            >
              Get Starter ($10 / ৳1,000)
            </Link>
          </div>

          {/* Tier 3: Fast-Track Pack ($19.99 - MOST POPULAR) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-600 shadow-xl relative flex flex-col justify-between space-y-6">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Most Popular • Best Value
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Fast-Track Pack
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">Fast-Track Pack</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">$19.99</span>
                  <span className="text-xs text-slate-500 font-bold">one-time <span className="text-blue-600">(৳1,990)</span></span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">For active candidates applying across multiple sectors.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>35 Verified Submissions</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Workday & Greenhouse AI Keyword Polish</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Direct Recruiter Email Intelligence</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>W-8BEN Remote Contractor Tax Kit</span>
                </li>
              </ul>
            </div>

            <Link
              href="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              Get Fast-Track ($19.99)
            </Link>
          </div>

          {/* Tier 4: VIP Concierge ($49.99) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  Full Concierge
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">VIP Concierge</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">$49.99</span>
                  <span className="text-xs text-slate-500 font-bold">one-time <span className="text-purple-600">(৳4,990)</span></span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">Comprehensive human-assisted career dossier suite.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>100 Verified Submissions</strong></span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>1-on-1 Human Resume Audit</strong></span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-purple-900">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Private VIP Telegram Drops</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Priority WhatsApp Helpdesk (`01627714636`)</span>
                </li>
              </ul>
            </div>

            <Link
              href="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl transition-colors"
            >
              Get VIP Concierge
            </Link>
          </div>

        </div>

        {/* Verification & Compliance Note */}
        <div className="max-w-3xl mx-auto pt-2 text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span>Global Cards & JP Morgan Bank Wire</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">bKash, Nagad & Rocket Accepted (01627714636)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            DOL 20 CFR § 656.12 Strict Compliance: We provide career intelligence, application dispatch tools, and resume tailoring. Zero illegal placement fees.
          </p>
        </div>
      </section>

      {/* =========================================================================
          7. MASTER GUIDES (Institutional Knowledge)
      ========================================================================= */}
      <section className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
              Institutional Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master Career & Visa Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Researched and cited from official USCIS, DOL OFLC, and IRS statutory regulations.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All 17 Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASTER_GUIDES.slice(0, 6).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {guide.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 mt-1">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Read Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. COMMUNITY & DIRECT CLARIFICATION DESK
      ========================================================================= */}
      <CommunityBanner />

    </div>
  );
}
