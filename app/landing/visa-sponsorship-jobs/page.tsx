import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Building2, Sparkles, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { INITIAL_JOBS } from '@/lib/jobs-data';
import JobCard from '@/components/JobCard';

export const metadata: Metadata = {
  title: "Jobs in USA with Visa Sponsorship (H-1B, Cap-Exempt, EB-3) — Verified 2026",
  description: "Browse verified daily US jobs offering real visa sponsorship including Cap-Exempt H-1B (no lottery), Schedule A Green Cards for nurses, and corporate H-1B filings.",
  keywords: [
    "jobs in usa with visa sponsorship",
    "usa jobs with visa sponsorship",
    "jobs in usa for foreigners with visa sponsorship",
    "h1b visa sponsorship jobs in usa",
    "cap exempt h1b jobs",
    "eb3 visa sponsorship jobs usa",
    "companies sponsoring work visa in usa"
  ]
};

export default function VisaSponsorshipJobsLandingPage() {
  const visaJobs = INITIAL_JOBS.filter(j => j.visaSponsorship !== 'None');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Verified US Visa Sponsorship Directory
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Verified Jobs in USA with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Visa Sponsorship & Cap-Exempt Filings
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Stop guessing which companies sponsor international talent. Browse verified employers offering <strong>Cap-Exempt H-1B (no annual lottery quota)</strong>, healthcare green cards, and corporate H-1B visa support.
        </p>
      </div>

      {/* 3 Major Visa Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            ★ No Lottery Required
          </span>
          <h3 className="text-lg font-bold text-slate-900">Cap-Exempt H-1B</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sponsored by universities, research laboratories, and non-profit hospital systems. Zero lottery limit, filed year-round with 99% approval.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            ★ Tech & Corporate
          </span>
          <h3 className="text-lg font-bold text-slate-900">Standard H-1B Sponsor</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Leading tech enterprises and multinational corporations sponsoring skilled specialty occupations in software, finance, and engineering.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            ★ Direct Green Card
          </span>
          <h3 className="text-lg font-bold text-slate-900">Schedule A EB-3 for Nurses</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Direct Permanent Residency fast-track for certified Registered Nurses (NCLEX-RN) with zero labor certification delays.
          </p>
        </div>
      </div>

      {/* Live Sponsoring Openings */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Active Visa-Sponsoring Openings</h2>
          <p className="text-xs sm:text-sm text-slate-500">Every opening verified with employer sponsorship confidence metrics.</p>
        </div>
        <Link href="/jobs" className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
          Filter All Jobs <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {visaJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Consultation Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Need 1-on-1 Guidance on US Visa Pathways & Interviews?
        </h2>
        <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto mt-3">
          Book a private 45-minute video call with our career team (\$45 USD) or get your resume converted into the official 1-Page US ATS format (\$29 USD).
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/services"
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-lg transition-all"
          >
            View Consultation Packages ($29 - $79 USD)
          </Link>
          <a
            href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%201-on-1%20guidance%20on%20US%20Visa%20Jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow transition-all"
          >
            Chat on WhatsApp (+880 1981-505761)
          </a>
        </div>
      </div>

    </div>
  );
}
