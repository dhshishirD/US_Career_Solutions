import React from 'react';
import Link from 'next/link';
import { Check, X, Sparkles, ArrowRight, ShieldCheck, Briefcase, GraduationCap, DollarSign, Globe2, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Jobscan & Resume.io Alternative — AI ATS Scanner & US Career Radar",
  description: "Looking for a 100% free alternative to Jobscan, Resume.io, and Teal? US Career Solutions provides free AI ATS resume match scoring, verified daily US remote jobs (W-8BEN), and fully-funded scholarships without expensive subscriptions.",
  keywords: [
    "free jobscan alternative",
    "free ats resume scanner",
    "jobscan alternative free",
    "resume io alternative",
    "ai resume match score free",
    "ats resume checker without subscription"
  ]
};

export default function JobscanAlternativePage() {
  const comparisonData = [
    {
      feature: "AI ATS Resume Match Scoring (0-100%)",
      usCareer: "100% Free & Instant",
      jobscan: "Limited (5 Free Scans, then $49.95/mo)",
      resumeio: "Locked behind $24.95/mo paywall"
    },
    {
      feature: "Missing Keyword Gap Detection",
      usCareer: "Included Free",
      jobscan: "Paid Plan Only ($49.95/mo)",
      resumeio: "Basic"
    },
    {
      feature: "Everyday Verified US & Remote Jobs",
      usCareer: "Included Free (W-8BEN, H-1B, Cap-Exempt)",
      jobscan: "None (Scanner only)",
      resumeio: "None (Builder only)"
    },
    {
      feature: "100% Fully Funded USA Scholarships (GRA/GTA)",
      usCareer: "Included Free ($0 Tuition + Living Salary)",
      jobscan: "None",
      resumeio: "None"
    },
    {
      feature: "STAR Behavioral Interview Simulator",
      usCareer: "Included Free Interactive Q&A",
      jobscan: "None",
      resumeio: "None"
    },
    {
      feature: "Professor & Recruiter Cold Outreach Templates",
      usCareer: "1-Click Copyable Free",
      jobscan: "None",
      resumeio: "Generic templates only"
    },
    {
      feature: "1-on-1 Human Resume Transformation Service",
      usCareer: "Only $29 USD (Delivered in 48 hrs)",
      jobscan: "Expensive Partner Referrals ($150+)",
      resumeio: "None"
    },
    {
      feature: "Annual Cost",
      usCareer: "$0 Free / $29 one-time for makeover",
      jobscan: "$400 - $600 USD / year",
      resumeio: "$200 - $300 USD / year"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          The #1 Free Jobscan & Resume.io Alternative
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Why Pay \$50/Month for Jobscan When You Can Get AI ATS Scoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">100% Free?</span>
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Stop getting blocked by expensive subscription paywalls. <strong>US Career Solutions</strong> gives you unlimited AI ATS match scoring, daily verified US remote jobs (W-8BEN), and fully-funded university scholarships—all in one place.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/tools/ats-scanner"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Test Your Resume Score (Free)
          </Link>
          <Link
            href="/jobs"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-800 hover:bg-slate-50 font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            Explore US & Remote Jobs
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-16">
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black">Detailed Feature Comparison</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">See how US Career Solutions compares with traditional paid resume tools.</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1.5 rounded-full">
            ★ Save up to $500/year
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-bold text-slate-700">
                <th className="p-4 sm:p-5">Capability / Feature</th>
                <th className="p-4 sm:p-5 bg-blue-50/70 text-blue-900 font-extrabold border-x border-blue-100">
                  US Career Solutions
                </th>
                <th className="p-4 sm:p-5 text-slate-600">Jobscan</th>
                <th className="p-4 sm:p-5 text-slate-600">Resume.io</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-800">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 bg-blue-50/40 text-emerald-700 font-bold border-x border-blue-100 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{row.usCareer}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    {row.jobscan}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    {row.resumeio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Pillars of Superiority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Subscription Traps</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Legacy ATS tools charge recurring \$50/month credit card charges that are hard to cancel. We believe core career tooling and job feeds should be 100% free forever.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Built for Global & US Talent</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Jobscan only scans resumes. We pair our AI scanner directly with **verified US remote jobs (W-8BEN)** and **no-lottery Cap-Exempt visas** so you have immediate roles to apply for.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Education-to-Career Pipeline</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Discover top US university assistantships providing 100% tuition waivers and \$35,000/yr living salaries, complete with 1-click professor cold email outreach templates.
          </p>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Ready to Test Your Resume Score for Free?
        </h2>
        <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto mt-3">
          Paste your resume text and any US job description to see your exact ATS compatibility score and missing keyword analysis in 5 seconds.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/tools/ats-scanner"
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm shadow-lg transition-all"
          >
            Launch Free AI ATS Scanner
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
          >
            Get 1-on-1 US Makeover ($29 USD)
          </Link>
        </div>
      </div>

    </div>
  );
}
