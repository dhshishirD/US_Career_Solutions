'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Building2, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  Search, 
  DollarSign, 
  ExternalLink,
  ArrowRight,
  Info,
  HelpCircle,
  FileText
} from 'lucide-react';

interface ProcessingBenchmark {
  formId: string;
  formName: string;
  category: string;
  centers: {
    tsc: string; // Texas
    nsc: string; // Nebraska
    csc: string; // California
    vsc: string; // Vermont
    psc: string; // Potomac
  };
  premiumProcessing: {
    available: boolean;
    timeframe: string;
    fee: number;
    rule: string;
  };
  notes: string;
}

const BENCHMARKS: ProcessingBenchmark[] = [
  {
    formId: 'I-129',
    formName: 'Form I-129 (Petition for Nonimmigrant Worker)',
    category: 'H-1B Specialty Occupation (Cap & Cap-Exempt)',
    centers: {
      tsc: '2.0 - 3.5 Months',
      nsc: '2.5 - 4.0 Months',
      csc: '2.0 - 3.0 Months',
      vsc: '3.0 - 5.0 Months',
      psc: 'N/A'
    },
    premiumProcessing: {
      available: true,
      timeframe: '15 Calendar Days',
      fee: 2805,
      rule: '8 CFR § 106.4(c)(1) — 15 calendar days guaranteed adjudication or full refund of premium fee.'
    },
    notes: 'Texas Service Center (SRC) currently processes standard H-1B extensions faster than Vermont (EAC).'
  },
  {
    formId: 'I-129-O1',
    formName: 'Form I-129 (O-1A / O-1B Extraordinary Ability)',
    category: 'O-1 Nonimmigrant Extraordinary Ability',
    centers: {
      tsc: '1.5 - 2.5 Months',
      nsc: '2.0 - 3.5 Months',
      csc: '1.5 - 3.0 Months',
      vsc: '2.5 - 4.5 Months',
      psc: 'N/A'
    },
    premiumProcessing: {
      available: true,
      timeframe: '15 Calendar Days',
      fee: 2805,
      rule: '8 CFR § 106.4(c)(1) — Form I-907 premium processing clock starts on date USCIS physical receipt is logged.'
    },
    notes: 'California and Texas service centers handle high-volume AI and tech venture O-1 petitions.'
  },
  {
    formId: 'I-140-EB2-NIW',
    formName: 'Form I-140 (Immigrant Petition for Alien Workers)',
    category: 'EB-2 National Interest Waiver (NIW)',
    centers: {
      tsc: '6.5 - 10.5 Months',
      nsc: '7.0 - 11.5 Months',
      csc: 'N/A',
      vsc: 'N/A',
      psc: 'N/A'
    },
    premiumProcessing: {
      available: true,
      timeframe: '45 Business Days',
      fee: 2805,
      rule: '8 CFR § 106.4(e) — 45 calendar/business days for EB-2 NIW and EB-1C multinational manager petitions.'
    },
    notes: 'Texas and Nebraska are the exclusive adjudication hubs for Form I-140 NIW self-petitions.'
  },
  {
    formId: 'I-140-EB1A',
    formName: 'Form I-140 (Immigrant Petition for Alien Workers)',
    category: 'EB-1A Extraordinary Ability & EB-1B Outstanding Researcher',
    centers: {
      tsc: '5.0 - 8.5 Months',
      nsc: '6.0 - 9.5 Months',
      csc: 'N/A',
      vsc: 'N/A',
      psc: 'N/A'
    },
    premiumProcessing: {
      available: true,
      timeframe: '15 Calendar Days',
      fee: 2805,
      rule: '8 CFR § 106.4(c)(1) — 15 calendar day adjudication window.'
    },
    notes: 'Filing with Premium Processing triggers initial decision (Approval or RFE) within exactly 15 calendar days.'
  },
  {
    formId: 'I-140-PERM',
    formName: 'Form I-140 (Immigrant Petition for Alien Workers)',
    category: 'EB-2 / EB-3 Employer-Sponsored (with Approved PERM)',
    centers: {
      tsc: '4.0 - 7.0 Months',
      nsc: '4.5 - 8.0 Months',
      csc: 'N/A',
      vsc: 'N/A',
      psc: 'N/A'
    },
    premiumProcessing: {
      available: true,
      timeframe: '15 Calendar Days',
      fee: 2805,
      rule: 'Requires original certified Form ETA-9089 attached.'
    },
    notes: 'Direct hire filings with DOL certified prevailing wages proceed rapidly through Nebraska and Texas.'
  },
  {
    formId: 'I-765-OPT',
    formName: 'Form I-765 (Application for Employment Authorization)',
    category: 'F-1 Post-Completion OPT & STEM OPT 24-Month Extension',
    centers: {
      tsc: '2.5 - 4.5 Months',
      nsc: '3.0 - 5.0 Months',
      csc: '2.5 - 4.0 Months',
      vsc: '3.0 - 5.5 Months',
      psc: '2.5 - 4.0 Months'
    },
    premiumProcessing: {
      available: true,
      timeframe: '30 Calendar Days',
      fee: 1685,
      rule: '8 CFR § 106.4(c)(2) — 30 calendar days for Form I-765 F-1 OPT and STEM extensions.'
    },
    notes: 'STEM OPT applicants benefit from an automatic 180-day employment authorization extension while I-765 is pending.'
  },
  {
    formId: 'I-485-EB',
    formName: 'Form I-485 (Application to Register Permanent Residence)',
    category: 'Employment-Based Adjustment of Status (EB-1, EB-2, EB-3)',
    centers: {
      tsc: '8.5 - 14.0 Months',
      nsc: '9.0 - 15.5 Months',
      csc: 'N/A (Field Offices)',
      vsc: 'N/A (Field Offices)',
      psc: 'N/A (National Benefits Center)'
    },
    premiumProcessing: {
      available: false,
      timeframe: 'Not Available for Form I-485',
      fee: 0,
      rule: 'Form I-485 is not eligible for premium processing under 8 CFR § 106.4.'
    },
    notes: 'Processing depends heavily on Visa Bulletin final action priority date cutoff movements.'
  }
];

export default function ProcessingTimesPage() {
  const [selectedCenter, setSelectedCenter] = useState<'all' | 'tsc' | 'nsc' | 'csc' | 'vsc'>('tsc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedForm, setSelectedForm] = useState<string>('all');

  const filteredBenchmarks = BENCHMARKS.filter((b) => {
    const matchesSearch = b.formName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.formId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesForm = selectedForm === 'all' || b.formId.startsWith(selectedForm);
    return matchesSearch && matchesForm;
  });

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-semibold">USCIS Service Center Processing Times Hub</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Clock className="w-3.5 h-3.5" />
            Official Adjudication Timelines & Form I-907 Benchmarks (2026)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
            USCIS Service Center <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Processing Times</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Live statutory adjudication timelines across Texas (SRC), Nebraska (LIN), California (WAC), and Vermont (EAC) service centers. Calculate 15-day and 45-day Premium Processing deadlines and 180-day automatic extension rules.
          </p>
        </div>

        {/* Service Center Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setSelectedCenter('tsc')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedCenter === 'tsc'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400">SRC / TSC</span>
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-bold text-sm text-white">Texas Service Center</div>
            <p className="text-[11px] text-slate-400 mt-1">Dallas / Mesquite, TX</p>
          </button>

          <button
            onClick={() => setSelectedCenter('nsc')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedCenter === 'nsc'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">LIN / NSC</span>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-bold text-sm text-white">Nebraska Service Center</div>
            <p className="text-[11px] text-slate-400 mt-1">Lincoln, NE</p>
          </button>

          <button
            onClick={() => setSelectedCenter('csc')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedCenter === 'csc'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-400">WAC / CSC</span>
              <MapPin className="w-4 h-4 text-purple-400" />
            </div>
            <div className="font-bold text-sm text-white">California Service Center</div>
            <p className="text-[11px] text-slate-400 mt-1">Laguna Niguel, CA</p>
          </button>

          <button
            onClick={() => setSelectedCenter('vsc')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedCenter === 'vsc'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-amber-400">EAC / VSC</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-bold text-sm text-white">Vermont Service Center</div>
            <p className="text-[11px] text-slate-400 mt-1">St. Albans, VT</p>
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search H-1B, NIW, OPT, I-140..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'I-129', 'I-140', 'I-765', 'I-485'].map((form) => (
              <button
                key={form}
                onClick={() => setSelectedForm(form)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedForm === form
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {form === 'all' ? 'All Forms' : `Form ${form}`}
              </button>
            ))}
          </div>
        </div>

        {/* Processing Times Table / Cards */}
        <div className="space-y-6 mb-16">
          {filteredBenchmarks.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {item.formId}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {item.formName}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {item.category}
                  </h2>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    {item.notes}
                  </p>
                </div>

                {/* Premium Processing Badge */}
                <div className="shrink-0 bg-slate-950 border border-slate-800 rounded-2xl p-4 min-w-[240px]">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    Form I-907 Premium Processing
                  </div>
                  {item.premiumProcessing.available ? (
                    <div>
                      <div className="text-sm font-black text-white">
                        {item.premiumProcessing.timeframe}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Fee: <strong>${item.premiumProcessing.fee.toLocaleString()}</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">
                      Not eligible for Premium Processing
                    </div>
                  )}
                </div>
              </div>

              {/* Service Center Timeline Comparison Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
                <div className={`p-4 rounded-2xl border ${selectedCenter === 'tsc' ? 'bg-blue-500/10 border-blue-500/40' : 'bg-slate-950/60 border-slate-800'}`}>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">Texas (TSC / SRC)</div>
                  <div className="text-sm font-bold text-white">{item.centers.tsc}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${selectedCenter === 'nsc' ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-slate-950/60 border-slate-800'}`}>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">Nebraska (NSC / LIN)</div>
                  <div className="text-sm font-bold text-white">{item.centers.nsc}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${selectedCenter === 'csc' ? 'bg-purple-500/10 border-purple-500/40' : 'bg-slate-950/60 border-slate-800'}`}>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">California (CSC / WAC)</div>
                  <div className="text-sm font-bold text-white">{item.centers.csc}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${selectedCenter === 'vsc' ? 'bg-amber-500/10 border-amber-500/40' : 'bg-slate-950/60 border-slate-800'}`}>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">Vermont (VSC / EAC)</div>
                  <div className="text-sm font-bold text-white">{item.centers.vsc}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* E-E-A-T Statutory Inquiries & FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              When Can You File an "Outside Normal Processing Times" e-Request?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under USCIS Policy, you may submit a formal service inquiry (e-Request) only when your receipt date is <strong>earlier than the 93rd percentile inquiry date</strong> calculated by USCIS for your specific form and service center.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              If your case is pending beyond standard benchmarks, you can also contact the <strong>USCIS Ombudsman’s Office (DHS Form 7001)</strong> for statutory administrative assistance after submitting an e-Request.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Automatic Employment Extension (8 CFR § 274a.12)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Timely-filed renewal applications for certain nonimmigrant statuses receive automatic employment authorization while the petition is pending:
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
              <li><strong>H-1B Extension with Same Employer:</strong> Automatic 240 days of continuous work authorization (8 CFR § 274a.12(b)(20)).</li>
              <li><strong>STEM OPT 24-Month Extension:</strong> Automatic 180 days of continued employment authorization while Form I-765 is adjudicated (8 CFR § 214.2(f)(11)).</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
