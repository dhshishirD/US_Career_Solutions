'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen,
  GraduationCap,
  Download,
  Info
} from 'lucide-react';

export default function OptGracePeriodCalculatorPage() {
  const [eadEndDate, setEadEndDate] = useState<string>('2026-06-30');
  const [optType, setOptType] = useState<'initial' | 'stem'>('initial');
  const [unemploymentDaysUsed, setUnemploymentDaysUsed] = useState<number>(15);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Calculations
  const results = useMemo(() => {
    if (!eadEndDate) return null;
    const end = new Date(eadEndDate);
    if (isNaN(end.getTime())) return null;

    // 60-Day Grace Period End Date (end + 60 days)
    const gracePeriodEnd = new Date(end);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 60);

    // Recommended SEVIS Transfer Release Deadline (end + 45 days to be safe)
    const sevisTransferSafeDate = new Date(end);
    sevisTransferSafeDate.setDate(sevisTransferSafeDate.getDate() + 45);

    // Day 1 CPT Application Deadline (30 days prior to EAD end)
    const cptApplyRecommended = new Date(end);
    cptApplyRecommended.setDate(cptApplyRecommended.getDate() - 30);

    // Unemployment Limit Calculations
    const maxUnemploymentDays = optType === 'initial' ? 90 : 150;
    const remainingUnemploymentDays = Math.max(0, maxUnemploymentDays - unemploymentDaysUsed);
    const unemploymentPercentage = Math.min(100, Math.round((unemploymentDaysUsed / maxUnemploymentDays) * 100));

    // Days remaining from today until EAD end
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - today.getTime();
    const daysUntilEadEnd = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysUntilGraceEnd = Math.ceil((gracePeriodEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      eadEndDateFormatted: end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      gracePeriodEndFormatted: gracePeriodEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      sevisTransferSafeFormatted: sevisTransferSafeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      cptApplyFormatted: cptApplyRecommended.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      daysUntilEadEnd,
      daysUntilGraceEnd,
      maxUnemploymentDays,
      remainingUnemploymentDays,
      unemploymentPercentage
    };
  }, [eadEndDate, optType, unemploymentDaysUsed]);

  const copyRfeChecklist = () => {
    const text = `📁 F-1 OPT & Day 1 CPT Maintenance of Status RFE Evidence Portfolio:
1. Official Transcripts (Continuous GPA > 3.0)
2. Course Syllabi with On-Campus Physical Residency Schedule
3. Physical Travel Receipts (Flight tickets, gas, hotel folios in university city)
4. Employer CPT Cooperative Agreement & Job Description
5. Official University Bursar Tuition Receipts
6. All Historical Form I-20s (Signed by DSO and Student)
7. Bi-Weekly W-2 Paystubs & Form W-2

Generated via US Career Solutions: https://www.uscareersolutions.online/tools/opt-grace-period-calculator`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <Calendar className="w-4 h-4 text-indigo-600" />
          Official 8 CFR § 214.2(f)(10) USCIS Rules
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          F-1 OPT Grace Period & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            SEVIS Transfer Timeline Calculator
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Never risk unlawful presence. Compute your exact <strong>60-day departure deadline</strong>, track your <strong>90/150-day unemployment clock</strong>, and calculate your Day 1 CPT SEVIS release windows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Input Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Enter Your EAD Parameters</h3>
          </div>

          {/* EAD End Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Current OPT / STEM EAD Expiration Date
            </label>
            <input
              type="date"
              value={eadEndDate}
              onChange={(e) => setEadEndDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">Found on "Card Expires" field of your Form I-766 EAD card.</p>
          </div>

          {/* OPT Type Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Your Current Status Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOptType('initial')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  optType === 'initial'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                12-Month Initial OPT
              </button>
              <button
                type="button"
                onClick={() => setOptType('stem')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  optType === 'stem'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                24-Month STEM OPT
              </button>
            </div>
          </div>

          {/* Unemployment Days Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Cumulative Unemployment Days Used
              </label>
              <span className="text-sm font-black text-indigo-600">{unemploymentDaysUsed} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max={optType === 'initial' ? 90 : 150}
              value={unemploymentDaysUsed}
              onChange={(e) => setUnemploymentDaysUsed(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>0 Days</span>
              <span>Max: {optType === 'initial' ? '90 Days' : '150 Days'}</span>
            </div>
          </div>

          {/* Status Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Crucial Rule:</strong> You cannot work during the 60-day grace period. Work authorization strictly terminates on your EAD end date unless you have a timely filed H-1B with Cap-Gap or STEM extension.
            </p>
          </div>
        </div>

        {/* Results & Milestones (7 Cols) */}
        {results && (
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: 60-Day Deadline */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 text-white p-6 rounded-3xl border border-indigo-500/40 shadow-xl relative overflow-hidden">
                <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Final 60-Day USCIS Deadline
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {results.gracePeriodEndFormatted}
                </div>
                <div className="mt-3 text-xs text-indigo-200 flex items-center gap-1">
                  <span>{results.daysUntilGraceEnd > 0 ? `${results.daysUntilGraceEnd} days remaining from today` : 'Grace period expired'}</span>
                </div>
              </div>

              {/* Card 2: Remaining Unemployment Clock */}
              <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                    <span>Unemployment Buffer</span>
                    <span className="text-[11px] font-bold text-indigo-600">{results.unemploymentPercentage}% Used</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    {results.remainingUnemploymentDays} <span className="text-base font-normal text-slate-500">Days Left</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      results.remainingUnemploymentDays <= 15 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${results.unemploymentPercentage}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Step-by-Step Strategic Roadmap */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Your Critical Immigration Action Milestones
              </h3>

              <div className="space-y-4 pt-2">
                
                {/* Milestone 1 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide">30 Days Before Expiration</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">Submit Day 1 CPT University Application</div>
                    <div className="text-xs text-slate-600 mt-1">Recommended deadline: <strong>{results.cptApplyFormatted}</strong> to receive I-20 before payroll stops.</div>
                  </div>
                  <Link
                    href="/guides/day-1-cpt-universities-usa-legitimate-list-uscis-guide-2026"
                    className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                  >
                    View List →
                  </Link>
                </div>

                {/* Milestone 2 */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Last Day of Work Authorization</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">EAD Expiration Date: {results.eadEndDateFormatted}</div>
                    <div className="text-xs text-slate-600 mt-1">You must stop working at 11:59 PM on this date unless CPT I-20 or Cap-Gap is active.</div>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Recommended SEVIS Release Date</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">Target Transfer Out: {results.sevisTransferSafeFormatted}</div>
                    <div className="text-xs text-slate-600 mt-1">Submit transfer request to your current DSO before 45 days into your grace period.</div>
                  </div>
                </div>

              </div>
            </div>

            {/* 1-Click RFE Portfolio Checklist */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    7 Mandatory RFE Maintenance of Status Documents
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Keep these ready in case USCIS issues an RFE on your change of status.</p>
                </div>

                <button
                  onClick={copyRfeChecklist}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow shrink-0"
                >
                  {copiedChecklist ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedChecklist ? 'Copied Checklist!' : 'Copy Full Checklist'}</span>
                </button>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">✅ 1. Official Transcripts (Continuous GPA &gt; 3.0)</li>
                <li className="flex items-center gap-2">✅ 2. Course Syllabi & Assignment Logs with Physical Residency Dates</li>
                <li className="flex items-center gap-2">✅ 3. Flight Tickets, Hotel Receipts & Gas Tolls to University City</li>
                <li className="flex items-center gap-2">✅ 4. Employer CPT Cooperative Agreement & Signed Job Description</li>
                <li className="flex items-center gap-2">✅ 5. University Bursar Tuition Payment Receipts</li>
                <li className="flex items-center gap-2">✅ 6. Historical Form I-20s (Signed by DSO and Student)</li>
                <li className="flex items-center gap-2">✅ 7. Bi-Weekly W-2 Paystubs Proving Authorized Employment</li>
              </ul>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
