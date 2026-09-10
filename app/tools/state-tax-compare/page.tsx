'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftRight, 
  DollarSign, 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Percent, 
  HelpCircle,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import { US_STATES_DATA, StateData } from '@/lib/states-data';

export default function StateTaxComparePage() {
  const statesList = Object.values(US_STATES_DATA);
  const [stateACode, setStateACode] = useState('california');
  const [stateBCode, setStateBCode] = useState('texas');
  const [salaryInput, setSalaryInput] = useState<number>(150000);

  const stateA = US_STATES_DATA[stateACode] || statesList[0];
  const stateB = US_STATES_DATA[stateBCode] || statesList[1];

  // Progressive/Flat State Tax Estimator Helper
  const calculateStateTax = (state: StateData, salary: number) => {
    if (state.code === 'TX' || state.code === 'WA' || state.code === 'FL') {
      return 0;
    }
    if (state.code === 'MA') return salary * 0.05;
    if (state.code === 'IL') return salary * 0.0495;
    if (state.code === 'NC') return salary * 0.045;
    if (state.code === 'GA') return salary * 0.0539;
    if (state.code === 'VA') return salary * 0.055;
    if (state.code === 'NY') return salary * 0.065; // Average state effective
    if (state.code === 'CA') {
      if (salary <= 100000) return salary * 0.06;
      if (salary <= 200000) return salary * 0.082;
      return salary * 0.093;
    }
    return salary * 0.05;
  };

  const calculateFederalTax = (salary: number) => {
    // 2026 Estimated Federal Tax for Single Filer
    if (salary <= 50000) return salary * 0.10;
    if (salary <= 100000) return 4800 + (salary - 50000) * 0.18;
    if (salary <= 200000) return 13800 + (salary - 100000) * 0.23;
    return 36800 + (salary - 200000) * 0.30;
  };

  const calculateFica = (salary: number) => {
    // 6.2% Social Security (capped at ~168k) + 1.45% Medicare
    const ssCap = 168600;
    const ssTax = Math.min(salary, ssCap) * 0.062;
    const medicareTax = salary * 0.0145;
    return ssTax + medicareTax;
  };

  const comparison = useMemo(() => {
    const fedTax = calculateFederalTax(salaryInput);
    const ficaTax = calculateFica(salaryInput);

    const taxA = calculateStateTax(stateA, salaryInput);
    const netA = salaryInput - fedTax - ficaTax - taxA;

    const taxB = calculateStateTax(stateB, salaryInput);
    const netB = salaryInput - fedTax - ficaTax - taxB;

    const netDifference = netB - netA;
    const rentDifferenceAnnual = (parseInt(stateB.stats.medianRent.replace(/[^0-9]/g, '')) - parseInt(stateA.stats.medianRent.replace(/[^0-9]/g, ''))) * 12;
    const totalAdvantageAnnual = (netB - netA) - rentDifferenceAnnual; // positive means state B wins

    return {
      fedTax,
      ficaTax,
      taxA,
      netA,
      monthlyA: netA / 12,
      effectiveRateA: ((fedTax + ficaTax + taxA) / salaryInput * 100).toFixed(1),
      taxB,
      netB,
      monthlyB: netB / 12,
      effectiveRateB: ((fedTax + ficaTax + taxB) / salaryInput * 100).toFixed(1),
      netDifference,
      rentDifferenceAnnual,
      totalAdvantageAnnual,
    };
  }, [stateA, stateB, salaryInput]);

  // WebApplication Schema
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'US State Tax & Relocation Take-Home Pay Comparison Calculator',
    url: 'https://www.uscareersolutions.online/tools/state-tax-compare',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Compare side-by-side net take-home pay, state income tax, housing costs, and H-1B visa sponsors between any two US states.'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
          <span>/</span>
          <Link href="/jobs/states" className="hover:text-white transition-colors">States</Link>
          <span>/</span>
          <span className="text-blue-400">State Tax & Relocation Comparison</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <ArrowLeftRight className="w-4 h-4" />
            <span>Interactive US Relocation & Tax Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            US State Tax & Take-Home <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Salary Comparison Tool
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Compare actual net take-home pay, state tax rates (e.g. 0% in Texas vs 13.3% in California), median rent, and enterprise H-1B sponsors side-by-side.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* State A Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                State A (Base Location)
              </label>
              <select
                value={stateACode}
                onChange={(e) => setStateACode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-colors"
              >
                {statesList.map(s => (
                  <option key={s.slug} value={s.slug}>
                    {s.name} ({s.code}) — {s.stats.stateIncomeTax}
                  </option>
                ))}
              </select>
            </div>

            {/* State B Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                State B (Comparison Location)
              </label>
              <select
                value={stateBCode}
                onChange={(e) => setStateBCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-colors"
              >
                {statesList.map(s => (
                  <option key={s.slug} value={s.slug}>
                    {s.name} ({s.code}) — {s.stats.stateIncomeTax}
                  </option>
                ))}
              </select>
            </div>

            {/* Annual Salary Input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Annual Gross Salary ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  step="5000"
                  min="30000"
                  max="1000000"
                  value={salaryInput}
                  onChange={(e) => setSalaryInput(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Card State A */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  {stateA.code}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">{stateA.name}</h2>
              </div>
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{ borderColor: `${stateA.badgeColor}40`, color: stateA.badgeColor, backgroundColor: `${stateA.badgeColor}15` }}
              >
                {stateA.stats.h1bApprovalRank}
              </span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 mb-6">
              <span className="text-xs text-slate-400 font-medium block">Net Annual Take-Home</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                ${Math.round(comparison.netA).toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                ${Math.round(comparison.monthlyA).toLocaleString()} / month • {comparison.effectiveRateA}% Effective Tax
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Estimated State Income Tax</span>
                <span className="font-bold text-rose-400">
                  {comparison.taxA === 0 ? '$0 (Exempt)' : `-$${Math.round(comparison.taxA).toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Federal Tax + FICA</span>
                <span className="font-bold text-slate-300">
                  -${Math.round(comparison.fedTax + comparison.ficaTax).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Median Monthly Rent</span>
                <span className="font-bold text-white">{stateA.stats.medianRent}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Top Tech Hub</span>
                <span className="font-bold text-blue-400">{stateA.keyHubs[0]}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link 
                href={`/jobs/states/${stateA.slug}`}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View Full {stateA.name} Visa Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card State B */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  {stateB.code}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">{stateB.name}</h2>
              </div>
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{ borderColor: `${stateB.badgeColor}40`, color: stateB.badgeColor, backgroundColor: `${stateB.badgeColor}15` }}
              >
                {stateB.stats.h1bApprovalRank}
              </span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 mb-6">
              <span className="text-xs text-slate-400 font-medium block">Net Annual Take-Home</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                ${Math.round(comparison.netB).toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                ${Math.round(comparison.monthlyB).toLocaleString()} / month • {comparison.effectiveRateB}% Effective Tax
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Estimated State Income Tax</span>
                <span className="font-bold text-rose-400">
                  {comparison.taxB === 0 ? '$0 (Exempt)' : `-$${Math.round(comparison.taxB).toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Federal Tax + FICA</span>
                <span className="font-bold text-slate-300">
                  -${Math.round(comparison.fedTax + comparison.ficaTax).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Median Monthly Rent</span>
                <span className="font-bold text-white">{stateB.stats.medianRent}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Top Tech Hub</span>
                <span className="font-bold text-blue-400">{stateB.keyHubs[0]}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link 
                href={`/jobs/states/${stateB.slug}`}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View Full {stateB.name} Visa Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Key Takeaway Verdict Box */}
        <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-8 mb-12 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Relocation Financial Verdict</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                On a <strong className="text-white">${salaryInput.toLocaleString()}</strong> salary, moving from <strong className="text-blue-400">{stateA.name}</strong> to <strong className="text-emerald-400">{stateB.name}</strong> results in:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Net Take-Home Difference</span>
                  <span className={`text-lg font-bold ${comparison.netDifference >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {comparison.netDifference >= 0 ? `+ $${Math.round(comparison.netDifference).toLocaleString()} / year in ${stateB.name}` : `- $${Math.round(Math.abs(comparison.netDifference)).toLocaleString()} / year in ${stateB.name}`}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Annual Rent Savings</span>
                  <span className={`text-lg font-bold ${comparison.rentDifferenceAnnual <= 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {comparison.rentDifferenceAnnual < 0 ? `Save $${Math.round(Math.abs(comparison.rentDifferenceAnnual)).toLocaleString()} / yr in ${stateB.name}` : `+$${Math.round(comparison.rentDifferenceAnnual).toLocaleString()} / yr higher rent in ${stateB.name}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
