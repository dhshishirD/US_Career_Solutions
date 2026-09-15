'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Globe2, 
  Scale, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Briefcase
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-blue-600" />
          About US Career Solutions
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Empowering Global Talent with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Verified US Career & Education Intelligence
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          US Career Solutions was founded to solve a critical global challenge: navigating the complex landscape of American employment, visa sponsorship, fully-funded higher education, and international contractor compliance without falling prey to middleman fraud or misleading information.
        </p>
      </div>

      {/* Core Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Verified US Employment</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We aggregate and verify daily job openings across Fortune 500 companies, cap-exempt research universities, and teaching hospital networks with clear visa sponsorship signals (H-1B, Schedule A, J-1, H-2A/B).
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">100% Fully-Funded Study</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We track graduate assistantships (GTA/GRA), full tuition waivers, application fee waiver codes, and living stipends across accredited US universities, making American higher education accessible to all economic backgrounds.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Global Contractor Care</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We provide interactive compliance tools like our IRS Form W-8BEN validator and STEM OPT tax calculators to help remote international talent earn in USD with complete statutory tax clarity.
          </p>
        </div>
      </div>

      {/* Editorial Methodology & Verification Protocol */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Editorial Integrity & E-E-A-T</span>
          <h2 className="text-2xl font-bold text-white mt-1">Our Data Verification & Research Standards</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every piece of data, guide, and interactive calculator on our platform is built upon official statutory sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              1. Statutory Legal Alignment
            </div>
            <p className="text-slate-400">
              Our visa roadmaps and guides cite official statutes including <strong>INA § 214(g)(5)</strong> (Cap-Exempt H-1B), <strong>8 CFR § 214.2</strong> (F-1 OPT/CPT), <strong>20 CFR § 656.5</strong> (Schedule A Green Cards), and <strong>USCIS *Matter of Dhanasar*</strong> (EB-2 NIW).
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              2. Wage & Filing Data Verification
            </div>
            <p className="text-slate-400">
              Salary tools index official <strong>US Department of Labor (DOL) Form ETA-9035</strong> filings and BLS Occupational Employment and Wage Statistics (OEWS) to ensure accurate Prevailing Wage and Adverse Effect Wage Rates.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Direct Employer Linkage
            </div>
            <p className="text-slate-400">
              We never act as recruitment brokers or charge job seekers placement fees. All job cards route applicants directly to official company career portals (Workday, Greenhouse, Lever, Taleo) and hospital boards.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              4. Continuous Editorial Review
            </div>
            <p className="text-slate-400">
              Our technical guides and policy analyses are audited monthly by our career intelligence editors to reflect changes in USCIS filing fees, Visa Bulletins, and IRS tax guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Editorial Team */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Our Editorial & Career Advisory Team</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Passionate researchers, international career strategists, and technology specialists dedicated to global workforce mobility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-xl shrink-0">
              DH
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Daloyar Hassan</h3>
              <div className="text-xs font-semibold text-blue-600">Founder & Lead Career Strategist</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Specializes in international talent mobility, US university funding pathways, ATS resume optimization algorithms, and global remote employment compliance under IRS Form W-8BEN.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shrink-0">
              US
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">US Career Editorial Research Panel</h3>
              <div className="text-xs font-semibold text-emerald-600">Immigration & Higher Education Analysts</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                A multidisciplinary team monitoring US Department of Labor prevailing wage updates, USCIS policy memoranda, CGFNS credentialing guidelines, and university graduate assistantship cycles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Transparency */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-xs text-slate-600 leading-relaxed space-y-2">
        <h4 className="font-bold text-slate-900 text-sm">Transparency & Legal Disclaimer</h4>
        <p>
          US Career Solutions is an independent educational and employment publishing platform. We are not a law firm, attorney, licensed immigration consultancy, or affiliated with the United States Government, USCIS, or the US Department of Labor. Content provided on this site is for informational and educational purposes only and should not be construed as legal advice.
        </p>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-white">Have Questions or Need Assistance?</h3>
          <p className="text-xs sm:text-sm text-blue-100">
            Reach out directly to our support team for career guidance or editorial feedback.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-xs sm:text-sm shadow-lg hover:bg-blue-50 transition-all whitespace-nowrap"
        >
          Contact Our Team <ArrowRight className="w-4 h-4 inline ml-1" />
        </Link>
      </div>

    </div>
  );
}
