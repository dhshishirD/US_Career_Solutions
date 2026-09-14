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
  Building,
  GraduationCap,
  Calculator,
  DollarSign,
  Award,
  BookOpen,
  Layers,
  Flame,
  FileText,
  MapPin
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-2 pb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
          Everyday USA Valid Jobs Automated Pipeline + AI Career Care
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Your Fast-Track to Valid <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
            USA Jobs & Visa Sponsorship
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform for international professionals, F-1 students, and remote workers. Access verified <strong>H-1B Sponsors</strong>, <strong>Cap-Exempt institutions</strong> (no lottery!), <strong>$0 University Fee Waivers</strong>, and certified <strong>DOL LCA salary records</strong>.
        </p>

        {/* Quick Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto bg-white p-2.5 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-grow">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by job title, skill, or US company (e.g. Software, Data, Nurse, MIT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="w-full text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent py-2"
            />
          </div>
          <Link
            href={`/jobs?q=${encodeURIComponent(searchQuery)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition-all whitespace-nowrap"
          >
            Find US Jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Highlight Stats */}
        <div className="mt-6 flex items-center justify-center gap-6 sm:gap-10 text-slate-600 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span><strong>100%</strong> Public & Valid Postings</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span><strong>Cap-Exempt</strong> Visa Radar</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span><strong>Live DOL</strong> Certified LCA Filings</span>
          </div>
        </div>
      </section>

      {/* 🚀 6-Card Interactive Command Center (Instant Access Matrix) */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Instant Access Command Center
            </h2>
          </div>
          <span className="text-xs font-bold text-indigo-600">8 Premier Interactive Gateways</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card: EB-2 NIW Profile Evaluator */}
          <Link
            href="/tools/eb2-niw-evaluator"
            className="group bg-gradient-to-br from-indigo-500/10 via-white to-white rounded-2xl p-6 border-2 border-indigo-200/80 hover:border-indigo-500 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full border border-indigo-300">
                  ⚖️ Self-Petition
                </span>
                <span className="text-xs font-bold text-slate-400">Dhanasar 3-Prong</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                EB-2 NIW Profile Evaluator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Test your direct Green Card approval probability without an employer sponsor based on citations, publications, and critical tech endeavors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Evaluate Profile Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card: F-1 OPT Grace Period Calculator */}
          <Link
            href="/tools/opt-grace-period-calculator"
            className="group bg-gradient-to-br from-rose-500/10 via-white to-white rounded-2xl p-6 border-2 border-rose-200/80 hover:border-rose-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full border border-rose-300">
                  ⏱️ 8 CFR § 214.2
                </span>
                <span className="text-xs font-bold text-slate-400">60-Day Tracker</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-700 transition-colors flex items-center gap-2">
                F-1 OPT Grace Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Calculate exact 60-day departure deadlines, 90/150-day cumulative unemployment gauges, Day 1 CPT transfers, and RFE compliance audits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>Launch Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 1: LCA Prevailing Wage Search Engine */}
          <Link
            href="/tools/lca-salary-search"
            className="group bg-gradient-to-br from-amber-500/10 via-white to-white rounded-2xl p-6 border-2 border-amber-200/80 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                  ⚡ Live DOL Data
                </span>
                <span className="text-xs font-bold text-slate-400">10,000+ Filings</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                H-1B LCA Salary Search
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Search certified base salaries by company, Wage Levels (I–IV), and state from official Form ETA-9035 filings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Search Certified Wages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Fall 2026 Application Fee Waiver Directory */}
          <Link
            href="/scholarships/fee-waiver-directory"
            className="group bg-gradient-to-br from-emerald-500/10 via-white to-white rounded-2xl p-6 border-2 border-emerald-200/80 hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  🎓 Save $1,500+
                </span>
                <span className="text-xs font-bold text-slate-400">30+ US Universities</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                Fall 2026 Fee Waivers & GRE
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Verified $0 application promo codes, webinar attendee waivers, and GRE exemption policies for US graduate admissions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Explore Promo Codes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Salary & STEM OPT Tax Calculator */}
          <Link
            href="/tools/salary-tax-calculator"
            className="group bg-gradient-to-br from-blue-500/10 via-white to-white rounded-2xl p-6 border-2 border-blue-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full border border-blue-300">
                  💰 IRC § 3121 Exemption
                </span>
                <span className="text-xs font-bold text-slate-400">50-State Tax Engine</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                STEM OPT Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Calculate your exact take-home pay with F-1 FICA tax exemptions (7.65%), federal income tax, and state tax brackets.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Calculate Take-Home Pay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: AI ATS Resume Checker */}
          <Link
            href="/tools/ats-scanner"
            className="group bg-gradient-to-br from-purple-500/10 via-white to-white rounded-2xl p-6 border-2 border-purple-200/80 hover:border-purple-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full border border-purple-300">
                  🎯 Google XYZ Formula
                </span>
                <span className="text-xs font-bold text-slate-400">0-100% Score</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors flex items-center gap-2">
                AI ATS Resume Scanner
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Pass Workday and Greenhouse automated candidate scoring algorithms with real-time keyword density matching.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Scan CV Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: H-1B to Green Card PERM & I-140 Roadmap */}
          <Link
            href="/guides/h1b-to-green-card-perm-i140-timeline-audit-guide-2026"
            className="group bg-gradient-to-br from-indigo-500/10 via-white to-white rounded-2xl p-6 border-2 border-indigo-200/80 hover:border-indigo-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full border border-indigo-300">
                  🏛️ Master Blueprint
                </span>
                <span className="text-xs font-bold text-slate-400">DOL & USCIS</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-2">
                H-1B to Green Card PERM
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Form ETA-9089 filing, prevailing wage stages, audit triggers, and AC21 180-day portability when switching employers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Read Full Roadmap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Day 1 CPT Universities [2026 Compliance List] */}
          <Link
            href="/guides/day-1-cpt-universities-usa-legitimate-list-uscis-guide-2026"
            className="group bg-gradient-to-br from-rose-500/10 via-white to-white rounded-2xl p-6 border-2 border-rose-200/80 hover:border-rose-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full border border-rose-300">
                  🛡️ 8 CFR § 214.2
                </span>
                <span className="text-xs font-bold text-slate-400">Accredited List</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-700 transition-colors flex items-center gap-2">
                Day 1 CPT Universities
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Verified regional accreditation (WASC/HLC), 364-day OPT preservation rules, and 7 mandatory RFE defense documents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>Explore Day 1 CPT List</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* University Scholarships & Assistantships Spotlight Banner */}
      <section className="my-10 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <GraduationCap className="w-7 h-7 text-indigo-300" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-400/30">
              100% Fully Funded
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Top USA University Scholarships & Assistantships (GRA/GTA)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Study in the US with 100% full tuition waivers plus monthly living salaries ($24,000 – $45,000/year). Verified programs at Stanford, Purdue, MIT, Georgia Tech, and Berea.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/scholarships/fee-waiver-directory"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>$0 Fee Waivers</span>
            <Sparkles className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/scholarships"
            className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-white text-indigo-950 hover:bg-slate-100 px-5 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Explore Scholarships</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="my-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Real-Time Feed
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured USA Jobs Today
            </h2>
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

        <div className="mt-8 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-xl border border-blue-200 transition-colors"
          >
            Browse All {jobs.length}+ Verified USA Job Openings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Master Guides Showcase Section */}
      <section className="my-16 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
              Institutional Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master Career & Visa Blueprints (14 Guides)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Researched and cited from official USCIS, DOL OFLC, and IRS statutory regulations.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All 14 Guides</span>
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

      {/* Community Banner */}
      <CommunityBanner />

    </div>
  );
}
