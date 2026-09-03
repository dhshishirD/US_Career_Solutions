import React from 'react';
import Link from 'next/link';
import { Globe2, DollarSign, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import type { Metadata } from 'next';
import { INITIAL_JOBS } from '@/lib/jobs-data';
import JobCard from '@/components/JobCard';

export const metadata: Metadata = {
  title: "US Remote Jobs for Foreigners (W-8BEN) — Earn in USD from Home",
  description: "Explore verified daily US remote contractor jobs open to international applicants. Work from your home country, earn $45,000 - $80,000+ USD per year under IRS Form W-8BEN with no US work visa required.",
  keywords: [
    "us remote jobs for foreigners",
    "work from home jobs in usa for foreigners",
    "online jobs in usa for foreigners",
    "remote jobs for non us citizens",
    "w8ben remote contractor jobs",
    "us companies hiring internationally",
    "earn in usd from home"
  ]
};

export default function USRemoteJobsLandingPage() {
  const remoteJobs = INITIAL_JOBS.filter(j => j.isRemote || j.visaSponsorship === 'US Remote (Contractor/W-8BEN)');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <Globe2 className="w-4 h-4 text-emerald-600" />
          International Remote Contractor Hub (W-8BEN)
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Work for US Companies & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
            Earn in USD from Your Home Country
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          You do not need an H-1B visa or Green Card to access American salaries. US tech, customer care, and AI companies hire global talent under standard <strong>Form W-8BEN international contractor agreements</strong> with direct USD bank payouts.
        </p>
      </div>

      {/* Legal Explainer Box */}
      <div className="mb-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-900">How Does Working for US Companies Remotely Work Legally?</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Under US IRS tax rules, non-US citizens working outside the United States submit a simple 1-page form called **W-8BEN**. The US employer does not pay US payroll taxes or require visa sponsorship. You receive 100% of your gross USD earnings via Wise, Wire Transfer, or Payoneer.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow transition-all whitespace-nowrap"
          >
            Read Visa & W-8BEN Guide <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Live Verified Remote Jobs */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Featured Active Remote Openings</h2>
          <p className="text-xs sm:text-sm text-slate-500">Verified international contractor opportunities open right now.</p>
        </div>
        <Link href="/jobs" className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
          View All Verified Jobs <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {remoteJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Tailor Resume Callout */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 border border-emerald-400/30 px-3 py-1 rounded-full">
            ★ Resume Optimization
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            Applying to US Remote Roles? Make Sure Your CV Passes the ATS Scanner!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            US recruiters receive thousands of global applications. Test your resume match score against the job description for free or get our 1-on-1 US Makeover for \$29 USD.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            href="/tools/ats-scanner"
            className="text-center px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow transition-all"
          >
            Test Resume Match Score (Free)
          </Link>
          <Link
            href="/services"
            className="text-center px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow transition-all hover:bg-slate-100"
          >
            1-on-1 Makeover ($29 USD)
          </Link>
        </div>
      </div>

    </div>
  );
}
