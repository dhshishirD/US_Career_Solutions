'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
          <Scale className="w-4 h-4" />
          Statutory Notice
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Legal, Immigration & Educational Disclaimer
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: September 2026
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <h2 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              1. Non-Legal & Non-Government Advisory Notice
            </h2>
            <p className="text-xs sm:text-sm text-amber-900">
              US Career Solutions (uscareersolutions.online) is an independent private educational and career publishing platform. <strong>We are NOT an immigration law firm, licensed attorney, or accredited legal representative.</strong> We are not affiliated with, authorized by, or endorsed by the United States Citizenship and Immigration Services (USCIS), the US Department of Labor (DOL), the US Department of State (DOS), the Internal Revenue Service (IRS), or any other federal or state agency.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Educational & Informational Purpose Only</h2>
            <p>
              All articles, guides, calculators, prevailing wage data, statutory citations (such as 8 CFR, INA, IRC, and 20 CFR), and interactive tools provided on this website are published solely for general informational and educational purposes. Nothing on this website constitutes legal, tax, financial, or immigration counsel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Job Listings & Third-Party Outbound Links</h2>
            <p>
              US Career Solutions aggregates employment opportunities and university scholarship feeds from publicly available sources and official employer portals. We do NOT act as an employment agency, headhunter, recruiter, or staffing broker. We do not charge fees to job applicants or guarantee interviews, job offers, or visa issuances. Applying to any job listing connects you directly to the prospective employer or educational institution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Interactive Calculators & Simulation Estimates</h2>
            <p>
              Our interactive tools (including the EB-2 NIW Profile Evaluator, STEM OPT Tax Calculator, F-1 OPT Grace Period Calculator, and Form W-8BEN Validator) provide computational simulations based on user inputs and statutory formulas. Results generated do not guarantee petition approvals, tax exemption validity, or government determinations. Users should consult licensed immigration attorneys or certified public accountants (CPAs) for case-specific advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
            <p>
              Under no circumstances shall US Career Solutions, its founders, editors, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, the information and tools provided on this platform.
            </p>
          </section>
        </div>

      </div>

    </div>
  );
}
