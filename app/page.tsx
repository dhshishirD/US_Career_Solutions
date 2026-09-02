'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
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
  GraduationCap
} from 'lucide-react';
import JobCard from '@/components/JobCard';
import CommunityBanner from '@/components/CommunityBanner';
import { JobPosting } from '@/lib/types';
import { INITIAL_JOBS } from '@/lib/jobs-data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);

  useEffect(() => {
    // Optionally fetch dynamic jobs
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
      <section className="text-center max-w-4xl mx-auto pt-4 pb-12">
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
          The all-in-one place where public US jobs are automatically aggregated daily. Filter directly for 
          <span className="font-semibold text-slate-900"> H-1B Sponsors</span>, 
          <span className="font-semibold text-slate-900"> Cap-Exempt institutions</span> (no lottery!), and 
          <span className="font-semibold text-slate-900"> US Remote</span> positions, with instant AI resume tailoring.
        </p>

        {/* Quick Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto bg-white p-2.5 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-grow">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by job title, skill, or US company..."
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
        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10 text-slate-600 text-xs sm:text-sm flex-wrap">
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
            <span><strong>Built-In</strong> ATS Resume Engine</span>
          </div>
        </div>
      </section>

      {/* Feature Tools Grid: "On Spot USA Jobs Solution Care" */}
      <section className="my-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              On-The-Spot Career Care
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powerful Tools to Land US Interviews
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Don't just apply blindly. Use our specialized tools engineered for international candidates and US ATS standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tool 1 */}
          <Link
            href="/tools/ats-scanner"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                AI ATS Resume Tailorer
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Scan your CV against any US job description. Get a 0-100% ATS score, missing keywords, and one-click bullet rewrites.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600 gap-1">
              Optimize Resume Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 2 */}
          <Link
            href="/tools/visa-checker"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Visa Sponsor Radar
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Check historical US Department of Labor LCA data and H-1B approval rates for top US employers before applying.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 gap-1">
              Check Company Visas <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 3 */}
          <Link
            href="/tools/outreach-gen"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Recruiter Cold Outreach
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Generate high-converting LinkedIn connection notes and cold emails tailored to the hiring manager and position.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600 gap-1">
              Draft Outreach Message <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 4 */}
          <Link
            href="/tracker"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Application Tracker
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Track all your active US job applications, saved roles, interview stages, and follow-ups in a clean personal dashboard.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 gap-1">
              Open Dashboard <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
              Study in the US with 100% full tuition waivers plus monthly living salaries ($24,000 – $45,000/year). Verified programs at Stanford, Purdue, MIT, Georgia Tech, and Fulbright.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href="/scholarships"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white text-indigo-950 hover:bg-slate-100 px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Explore USA Scholarships <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="my-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured US Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified daily listings with active visa pathways
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setSelectedTag('capexempt')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === 'capexempt'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Cap-Exempt (No Lottery)
            </button>
            <button
              onClick={() => setSelectedTag('h1b')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === 'h1b'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              H-1B Sponsors
            </button>
            <button
              onClick={() => setSelectedTag('remote')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === 'remote'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              US Remote / W-8BEN
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg"
          >
            Explore All Daily US Postings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Educational Guide: Visa Pathways Breakdown */}
      <section className="my-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            How International Job Seekers Land US Roles
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Many candidates don't realize there are multiple valid legal ways to work for US companies:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              Secret Superpower
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Cap-Exempt H-1B</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Universities, non-profit medical centers, and research institutes do <strong>NOT</strong> participate in the 85,000 annual lottery cap. You can be hired and sponsored year-round.
            </p>
          </div>

          <div className="bg-purple-50/60 border border-purple-200/80 rounded-xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
              Work From Home Country
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">US Remote (W-8BEN)</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Earn in US Dollars from anywhere in the world. US tech firms hire international talent as independent contractors or via Employer of Record (EOR) platforms.
            </p>
          </div>

          <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
              Corporate Relocation
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">H-1B & L-1 Transfer</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Top technology, finance, and engineering companies sponsor petitions for in-demand candidates, with complete legal and relocation assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 1-on-1 Consultation Callout */}
      <section className="my-14 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 border border-emerald-400/30 px-3 py-1 rounded-full">
            ★ Dedicated 1-on-1 Care
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight leading-tight">
            Need Expert Help Crafting Your US Resume & Strategy?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Work directly with our career specialists to transform your CV into a US executive 1-page standard, map your exact visa pathway, and prepare for interviews.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold bg-white text-emerald-950 hover:bg-emerald-50 px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
            >
              View Packages & Book Call
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </Link>
            <a
              href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20would%20like%20to%20discuss%201-on-1%20Career%20Guidance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold bg-emerald-700 hover:bg-emerald-600 border border-emerald-500/50 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Chat on WhatsApp (+880 1981-505761)
            </a>
          </div>
        </div>
      </section>

      {/* Community Banner */}
      <CommunityBanner />

    </div>
  );
}
