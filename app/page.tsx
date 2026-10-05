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
  Users
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* =========================================================================
          1. HERO SECTION (Light, Luxury, Psychologically High-Trust)
      ========================================================================= */}
      <section className="text-center max-w-4xl mx-auto pt-4 pb-4">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/80 text-blue-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Direct U.S. Sponsorship Pipeline • 1-Click AI ATS Tailoring • Live Status Tracking
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
          Directly Apply to Verified <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
            U.S. Visa & Remote USD Jobs
          </span>
        </h1>

        {/* Subtitle with Tracking & ATS Focus */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bypass the ATS black hole. Apply with <strong>1-click AI resume keyword optimization</strong>, pre-tailored application dossiers, verified recruiter delivery, and <strong>real-time response milestone tracking</strong>.
        </p>

        {/* Dual Primary Call-To-Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/jobs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-sm sm:text-base font-extrabold bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span>Smart Apply to 101 Jobs (3 Free Credits)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tracker"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base font-bold bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200/90 shadow-sm transition-all"
          >
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span>Live Application Tracker</span>
          </Link>
        </div>

        {/* Quick Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-grow">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by role, skill, or sponsor (e.g. Software, Nurse, Stanford, W-8BEN)..."
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
            Find Positions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Social Proof & Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 sm:gap-10 text-slate-600 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span><strong>100%</strong> Statutory Verified Sponsors</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span><strong>91.4%</strong> ATS Filter Pass Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span><strong>5.2 Days</strong> Avg Recruiter Review</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE 3 FAST-TRACK AUDIENCE BRIDGES (Psychological Segmentation)
      ========================================================================= */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
            Dedicated Career Tracks
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Select Your U.S. Fast-Track Pathway
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pre-vetted statutory programs tailored to your exact professional profile and visa status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
          
          {/* Bridge 1: International Registered Nurses */}
          <Link
            href="/jobs/nursing-schedule-a-directory"
            className="group bg-white rounded-3xl p-7 border border-rose-200/80 hover:border-rose-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
                  🩺 20 CFR § 656.5
                </span>
                <span className="text-xs font-bold text-rose-600">Schedule A EB-3</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                Healthcare & Direct Hospital Green Cards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                100% exempt from the 18-month DOL PERM labor market test. Direct Form I-140 filing with Memorial Sloan Kettering, Mayo Clinic, and Cedars-Sinai.
              </p>
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>$80,000 – $145,000 Base Prevailing Wage</span>
                </div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>NCLEX-RN + VisaScreen Relocation Support</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>View 25+ Hospital Openings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bridge 2: Cap-Exempt H-1B Tech & Research */}
          <Link
            href="/jobs/cap-exempt-directory"
            className="group bg-white rounded-3xl p-7 border border-blue-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                  ⚡ INA § 214(g)(5)
                </span>
                <span className="text-xs font-bold text-blue-600">Zero Lottery Quota</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Cap-Exempt H-1B Tech & Research Roles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Skip the random 25% lottery. File Form I-129 year-round with accredited universities, research hospitals, and federally funded national institutes.
              </p>
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>MIT, Stanford, Purdue & UIUC Hiring</span>
                </div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Concurrent Private Commercial Work Permitted</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>View 35+ Cap-Exempt Positions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bridge 3: Global Remote USD Contractors */}
          <Link
            href="/landing/us-remote-jobs-w8ben"
            className="group bg-white rounded-3xl p-7 border border-emerald-200/80 hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  🌐 Form W-8BEN Compliant
                </span>
                <span className="text-xs font-bold text-emerald-600">0% US Withholding</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                US Remote Jobs for Global Foreigners
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Work from anywhere in the world for U.S. technology companies. Paid directly in USD via international bank wire, Wise, or Payoneer with tax treaty protection.
              </p>
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>$3,500 – $7,000 / Month Direct USD Income</span>
                </div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Software, AI Annotation, Support & Design</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>View 20+ Remote USD Openings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          3. HOW DIRECT SMART APPLY WORKS (3-Step Visual Process)
      ========================================================================= */}
      <section className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
            The Smart Apply Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How You Land Interviews 6x Faster
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We eliminated the painful 45-minute manual job application grind with 1-click ATS matching and tracked delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Select Verified Opening</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Browse 101 vetted listings across hospitals, universities, and remote employers with transparent salary bands and visa types.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">1-Click AI ATS Optimization</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our AI extracts keywords from the job description, scores your resume for Workday/Greenhouse, and drafts a custom 3-paragraph cover letter.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Verified Dispatch & Live Tracking</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Application dossier is prepared, recruiter follow-up contacts are unlocked, and real-time response milestones are monitored on your dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SERVICE PACKAGES & PRICING TABLE (Core Monetization Storefront)
      ========================================================================= */}
      <section className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600">
            Simple, Transparent Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Choose Your Application Pace
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Start completely free with 3 credits. Upgrade when you need high-volume submissions and direct recruiter intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Tier 1: Free Explorer */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  Free Starter
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Free Explorer</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 font-semibold">/ forever</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Test the platform with zero risk or card required.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>3 Free Smart Applications</strong> per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant ATS Resume Compatibility Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Auto-generated tailored cover letters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live tracking dashboard on /tracker</span>
                </li>
              </ul>
            </div>

            <Link
              href="/jobs"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl transition-colors"
            >
              Start Free (3 Credits)
            </Link>
          </div>

          {/* Tier 2: Fast-Track Applicant (MOST POPULAR) */}
          <div className="bg-white rounded-3xl p-7 border-2 border-blue-600 shadow-xl relative flex flex-col justify-between space-y-6">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Most Popular • Best Value
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Fast-Track Pack
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Fast-Track Applicant</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-900">$19.99</span>
                  <span className="text-xs text-slate-500 font-bold">one-time <span className="text-blue-600">(৳1,990)</span></span>
                </div>
                <p className="text-xs text-slate-500 mt-2">For active applicants applying to multiple openings.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>25 Verified Smart Submissions</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Workday & Greenhouse AI keyword optimization</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Direct HR & Recruiter Email Contacts</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Form W-8BEN Remote Contractor Tax Toolkit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>1-Click LinkedIn recruiter outreach templates</span>
                </li>
              </ul>
            </div>

            <Link
              href="/jobs?upgrade=fast-track"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              Get Fast-Track 25-Pack
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tier 3: VIP Career Concierge */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  Full Concierge
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">VIP Career Concierge</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-900">$49.99</span>
                  <span className="text-xs text-slate-500 font-bold">one-time <span className="text-purple-600">(৳4,990)</span></span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Comprehensive human-assisted career placement suite.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>100 Verified Submissions</strong> across all tracks</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>1-on-1 Human Resume Audit & Formatting Polish</strong></span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-purple-900">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Private VIP Telegram Channel Access</strong> (12h early drops)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>U.S. Interview STAR Method Strategy Sheet</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Priority email & WhatsApp advisory response</span>
                </li>
              </ul>
            </div>

            <Link
              href="/jobs?upgrade=vip"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition-colors"
            >
              Get VIP Concierge
            </Link>
          </div>

        </div>

        {/* Payment Gateways & Guarantees */}
        <div className="max-w-3xl mx-auto pt-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span>Cards & PayPal Supported</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">bKash & Nagad Accepted for Bangladesh</span>
          </div>
          <p className="text-[11px] text-slate-400">
            100% Statutory Compliant: We provide career intelligence, application dispatch tools, and resume tailoring. No illegal placement fees.
          </p>
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED VERIFIED USA JOBS (Real-Time Feed with Direct Apply)
      ========================================================================= */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Active Listings
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Verified Openings Today
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every role includes confirmed statutory visa sponsorship signals or remote USD contracts.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Jobs' },
              { id: 'h1b', label: 'H-1B Sponsor' },
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
          6. INSTANT ACCESS COMMAND CENTER (8 Diagnostic Tools)
      ========================================================================= */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Institutional Tools
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Instant Access Command Center
            </h2>
          </div>
          <span className="text-xs font-bold text-indigo-600 hidden sm:inline">8 Statutory Diagnostic Tools</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card: EB-2 NIW Profile Evaluator */}
          <Link
            href="/tools/eb2-niw-evaluator"
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  ⚖️ Self-Petition
                </span>
                <span className="text-xs font-bold text-slate-400">Dhanasar Test</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                EB-2 NIW Profile Evaluator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Test your direct Green Card approval probability without an employer sponsor based on citations and national endeavors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Evaluate Profile Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card: AI ATS Resume Checker */}
          <Link
            href="/tools/ats-scanner"
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-purple-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-purple-50 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
                  🎯 Workday / Greenhouse
                </span>
                <span className="text-xs font-bold text-slate-400">0-100% Score</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                AI ATS Resume Scanner
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Scan your resume against any job description to flag missing keywords and fatal 1-page formatting errors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Scan Resume Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card: W-8BEN Form Validator */}
          <Link
            href="/tools/w8ben-validator"
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  🌐 IRC § 1441 / 894
                </span>
                <span className="text-xs font-bold text-slate-400">0% Withholding</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                W-8BEN Form Validator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Verify FTIN format, claim bilateral double tax treaties, and generate U.S. client compliance packets.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Validate W-8BEN Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card: Salary & 50-State Tax Calculator */}
          <Link
            href="/tools/salary-tax-calculator"
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                  💰 IRS 2026 Brackets
                </span>
                <span className="text-xs font-bold text-slate-400">50 States</span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                50-State Net Salary Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Compare net take-home pay in zero-tax states (TX/FL/WA) vs high-tax states (CA/NY) before signing an offer.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Calculate Net Salary</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          7. MASTER GUIDES (Institutional E-E-A-T Content)
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
            <span>View All 20 Guides</span>
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
          8. COMMUNITY BANNER (Telegram 100k Funnel & Facebook Page)
      ========================================================================= */}
      <CommunityBanner />

    </div>
  );
}
