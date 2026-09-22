import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Calculator, 
  FileText, 
  Compass, 
  Award, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free US Visa, Salary & Immigration Compliance Tools (2026) | US Career Solutions',
  description: 'Access our suite of free statutory immigration diagnostic tools: J-1 2-Year Rule Waiver Advisor, US Paycheck & Tax Calculator, ATS Resume Scanner, EB-2 NIW Evaluator, and LCA Prevailing Wage Search.',
  alternates: {
    canonical: 'https://www.uscareersolutions.online/tools',
  },
  openGraph: {
    title: 'Free US Visa, Salary & Immigration Compliance Tools | US Career Solutions',
    description: 'Statutory immigration calculators, waiver advisors, and AI ATS scanners for international professionals.',
    url: 'https://www.uscareersolutions.online/tools',
    siteName: 'US Career Solutions',
    type: 'website',
  }
};

const TOOLS = [
  {
    title: 'EB-1A & O-1A Extraordinary Ability Scorer',
    path: '/tools/eb1a-o1-evaluator',
    badge: '8 CFR § 204.5(h) HIGH-CPC',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: '10-criterion diagnostic engine built on 8 CFR § 204.5(h)(3) & § 214.2(o). Audit Kazarian two-step merits risk and export a 1-click legal action filing memo.',
    icon: Award,
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    features: ['10-Prong Evidentiary Wizard', 'Kazarian Step 2 Merits Audit', 'RFE Vulnerability Scorer', '1-Click Statutory Filing Memo']
  },
  {
    title: 'USCIS Service Center Processing Times Hub',
    path: '/tools/processing-times',
    badge: 'LIVE BENCHMARKS (2026)',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Track official adjudication times across Texas (SRC), Nebraska (LIN), California (WAC), and Vermont (EAC) service centers for H-1B, O-1, EB-2, and OPT.',
    icon: Clock,
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    features: ['Texas vs. Nebraska Benchmarks', '15-Day Premium Clock Estimator', 'Automatic 180/240 Day Extension Rules', 'Outside Normal Processing e-Request Guide']
  },
  {
    title: 'J-1 Visa 2-Year Rule (212e) Waiver Advisor',
    path: '/tools/j1-waiver-advisor',
    badge: 'HIGH-CPC IMMIGRATION TOOL',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'Diagnose whether INA § 212(e) applies to your DS-2019, evaluate all 5 waiver bases (No Objection, IGA, Conrad 30), and generate a Form DS-3035 filing plan.',
    icon: Compass,
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    features: ['DS-2019 Skills List Checker', '5-Way Waiver Comparator', '50-State Conrad 30 Directory', '1-Click Action Memo']
  },
  {
    title: 'U.S. Paycheck & State Tax Calculator',
    path: '/tools/salary-tax-calculator',
    badge: 'IRC § 1441 COMPLIANT',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Calculate net take-home pay across all 50 states with Federal, FICA, State, and Form W-8BEN 0% international contractor tax treaty withholding.',
    icon: Calculator,
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    features: ['50-State Income Tax Schedules', 'W-8BEN Treaty Rates', 'FICA & Medicare Breakdown', 'Net Take-Home Estimator']
  },
  {
    title: 'AI ATS Resume Compatibility Scanner',
    path: '/tools/ats-scanner',
    badge: '100% FREE AI CHECKER',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Scan your resume against real US job descriptions to beat Workday, Taleo, and Greenhouse recruiter filters with instant match scoring.',
    icon: FileText,
    iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    features: ['Keyword Density Analysis', 'Section Header Audit', '1-Page US Standard Check', 'Formatting Error Detector']
  },
  {
    title: 'EB-2 NIW Green Card Evaluator',
    path: '/tools/eb2-niw-evaluator',
    badge: 'USCIS DHANASAR TEST',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: 'Evaluate your profile against the 3 Dhanasar prongs for direct self-petition Green Card without employer sponsorship or PERM certification.',
    icon: Award,
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    features: ['Dhanasar 3-Prong Scorer', 'Substantial Merit Checker', 'National Importance Rating', 'Self-Petition Readiness Score']
  },
  {
    title: 'STEM OPT 60-Day Grace Period Calculator',
    path: '/tools/opt-grace-period-calculator',
    badge: '8 CFR § 214.2(f) VERIFIED',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    description: 'Track cumulative unemployment days (90/150 day limits), Form I-983 filing deadlines, and H-1B Cap-Gap extension timelines with zero status violations.',
    icon: Clock,
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    features: ['Unemployment Day Counter', 'Cap-Gap Extension Clock', 'Form I-983 Milestone Alerts', 'Status Violation Shield']
  },
  {
    title: 'DOL LCA Prevailing Wage & Salary Explorer',
    path: '/tools/lca-salary-search',
    badge: 'CERTIFIED DOL DATA',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    description: 'Search official Department of Labor prevailing wages across 50 states for H-1B, H-2A, H-2B, and EB-3 direct-hire employer filings.',
    icon: DollarSign,
    iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    features: ['OEWS Level 1-4 Wage Schedules', 'State AEWR Farm Benchmarks', 'H-1B Wage Compliance Check', 'Direct Sponsor Transparency']
  }
];

export default function ToolsDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Official Compliance & Diagnostic Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Free US Visa, Salary & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Immigration Tools</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Statutory calculators, waiver diagnostic wizards, and AI scanners built on official USCIS, Department of Labor (DOL), and IRS regulatory schedules.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div 
                key={tool.path}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-blue-500/5 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl border ${tool.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                    {tool.title}
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-slate-800/80 pt-6">
                    {tool.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={tool.path}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all group-hover:scale-[1.02]"
                >
                  <span>Launch Tool Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Statutory E-E-A-T Guarantee Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            100% Free & Legally Verified Diagnostic Tools
          </h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Under US Federal Law and Department of Labor statutes, all calculations and advisory schedules are provided without fees or paywalls to empower international job seekers and students.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-6">
            <span className="flex items-center gap-1.5">✓ 20 CFR § 655 Protected</span>
            <span className="flex items-center gap-1.5">✓ IRC § 1441 Compliant</span>
            <span className="flex items-center gap-1.5">✓ USCIS INA § 212(e) Schedules</span>
          </div>
        </div>

      </div>
    </div>
  );
}
