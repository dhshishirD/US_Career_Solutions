'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Calculator, 
  Globe2, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';

const STATE_TAX_RATES: Record<string, { name: string; rate: number; hasLocalTax?: boolean }> = {
  CA: { name: 'California (Silicon Valley / LA)', rate: 0.085 },
  NY: { name: 'New York (NYC / Manhattan)', rate: 0.065, hasLocalTax: true },
  TX: { name: 'Texas (Austin / Dallas - 0% State Tax)', rate: 0.00 },
  WA: { name: 'Washington (Seattle - 0% State Tax)', rate: 0.00 },
  FL: { name: 'Florida (Miami / Orlando - 0% State Tax)', rate: 0.00 },
  MA: { name: 'Massachusetts (Boston Biotech)', rate: 0.05 },
  IL: { name: 'Illinois (Chicago Metro)', rate: 0.0495 },
  GA: { name: 'Georgia (Atlanta Tech)', rate: 0.0549 },
  NC: { name: 'North Carolina (Raleigh / RTP)', rate: 0.045 },
  TN: { name: 'Tennessee (Nashville - 0% State Tax)', rate: 0.00 },
};

const COUNTRY_TREATY_RATES: Record<string, { name: string; withholdingRate: number; treatyNotes: string }> = {
  BD: { name: 'Bangladesh', withholdingRate: 0.00, treatyNotes: 'US-Bangladesh Tax Treaty Article 15 (0% US Withholding on independent personal services with Form W-8BEN)' },
  IN: { name: 'India', withholdingRate: 0.00, treatyNotes: 'US-India Tax Treaty Article 15 (0% US Withholding on remote consulting services with Form W-8BEN)' },
  PH: { name: 'Philippines', withholdingRate: 0.00, treatyNotes: 'US-Philippines Tax Treaty Article 15 (0% US Withholding on remote independent services)' },
  PK: { name: 'Pakistan', withholdingRate: 0.00, treatyNotes: 'US-Pakistan Tax Treaty Article XI (0% US Withholding on remote services)' },
  NG: { name: 'Nigeria / Ghana', withholdingRate: 0.30, treatyNotes: 'Non-treaty standard 30% statutory withholding unless structured as foreign-sourced work performed entirely outside US territory' },
  UK: { name: 'United Kingdom', withholdingRate: 0.00, treatyNotes: 'US-UK Double Tax Treaty (0% US Withholding with Form W-8BEN)' },
  CA: { name: 'Canada', withholdingRate: 0.00, treatyNotes: 'US-Canada Tax Treaty (0% US Withholding on remote services)' },
  OTHER: { name: 'Other Worldwide Country', withholdingRate: 0.00, treatyNotes: 'Services performed 100% physically outside the United States are generally exempt from US payroll tax under IRC Section 861/862' }
};

export default function SalaryTaxCalculatorPage() {
  const [calcMode, setCalcMode] = useState<'w2' | 'f1-opt' | 'remote-w8ben'>('w2');
  const [annualSalary, setAnnualSalary] = useState<number>(120000);
  const [selectedState, setSelectedState] = useState<string>('TX');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [remoteCountry, setRemoteCountry] = useState<string>('BD');
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);

  const calculations = useMemo(() => {
    if (calcMode === 'remote-w8ben') {
      const grossAnnual = hourlyRate * weeklyHours * 50; // 50 working weeks
      const grossMonthly = grossAnnual / 12;
      const treatyInfo = COUNTRY_TREATY_RATES[remoteCountry] || COUNTRY_TREATY_RATES['OTHER'];
      const usTaxWithheld = grossAnnual * treatyInfo.withholdingRate;
      const paymentFees = grossAnnual * 0.015; // 1.5% Wise/wire transfer fee
      const netAnnual = grossAnnual - usTaxWithheld - paymentFees;
      const netMonthly = netAnnual / 12;

      return {
        grossAnnual,
        grossMonthly,
        federalTax: usTaxWithheld,
        stateTax: 0,
        ficaTax: 0,
        ficaExemptAmount: 0,
        otherFees: paymentFees,
        netAnnual,
        netMonthly,
        effectiveTaxRate: (usTaxWithheld / grossAnnual) * 100,
        treatyNotes: treatyInfo.treatyNotes
      };
    }

    // Standard W-2 or F-1 OPT calculation
    const gross = annualSalary;
    const grossMonthly = gross / 12;

    // Standard deduction 2026
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, gross - standardDeduction);

    // Progressive Federal Tax Brackets
    let fedTax = 0;
    if (taxableIncome > 0) {
      if (taxableIncome <= 11600) fedTax = taxableIncome * 0.10;
      else if (taxableIncome <= 47150) fedTax = 1160 + (taxableIncome - 11600) * 0.12;
      else if (taxableIncome <= 100525) fedTax = 5426 + (taxableIncome - 47150) * 0.22;
      else if (taxableIncome <= 191950) fedTax = 17168.50 + (taxableIncome - 100525) * 0.24;
      else if (taxableIncome <= 243725) fedTax = 39110.50 + (taxableIncome - 191950) * 0.32;
      else fedTax = 55678.50 + (taxableIncome - 243725) * 0.35;
    }

    // State Tax
    const stateInfo = STATE_TAX_RATES[selectedState] || STATE_TAX_RATES['TX'];
    const stateTax = taxableIncome * stateInfo.rate;

    // FICA (Social Security 6.2% up to $168,600 + Medicare 1.45%)
    const socialSecurity = Math.min(gross, 168600) * 0.062;
    const medicare = gross * 0.0145;
    const standardFica = socialSecurity + medicare;

    // F-1 OPT is 100% EXEMPT from FICA for first 5 calendar years!
    const isF1 = calcMode === 'f1-opt';
    const ficaTax = isF1 ? 0 : standardFica;
    const ficaExemptSavings = isF1 ? standardFica : 0;

    const netAnnual = gross - fedTax - stateTax - ficaTax;
    const netMonthly = netAnnual / 12;
    const effectiveTaxRate = ((fedTax + stateTax + ficaTax) / gross) * 100;

    return {
      grossAnnual: gross,
      grossMonthly,
      federalTax: fedTax,
      stateTax,
      ficaTax,
      ficaExemptAmount: ficaExemptSavings,
      otherFees: 0,
      netAnnual,
      netMonthly,
      effectiveTaxRate,
      treatyNotes: ''
    };
  }, [calcMode, annualSalary, selectedState, filingStatus, remoteCountry, hourlyRate, weeklyHours]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          Official 2026 US Payroll & Tax Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          US Take-Home Salary & Remote W-8BEN Tax Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Accurately calculate your actual in-pocket cash earnings across US states, F-1 STEM OPT FICA exemptions, and Global Remote W-8BEN bilateral tax treaties.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'w2', label: '🇺🇸 US Resident / H-1B / EB-3 (W-2)', desc: 'Standard State & Federal Net Pay' },
          { id: 'f1-opt', label: '🎓 F-1 Student / STEM OPT (FICA Exempt)', desc: 'Saves 7.65% Social Security/Medicare Tax' },
          { id: 'remote-w8ben', label: '🌐 Global Remote USD Contractor (W-8BEN)', desc: 'Direct USD Wire via Form W-8BEN' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCalcMode(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              calcMode === tab.id
                ? 'bg-slate-900 text-white shadow-md ring-2 ring-blue-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            Income & Location Parameters
          </h2>

          {calcMode === 'remote-w8ben' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Hourly USD Rate: <span className="text-blue-600 text-sm font-black">${hourlyRate}/hr</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max="150"
                  step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$15/hr (Entry Remote)</span>
                  <span>$50/hr (Mid Senior)</span>
                  <span>$150/hr (Staff/Architect)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Weekly Hours: <span className="text-slate-900 font-bold">{weeklyHours} hrs/week</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Your Country of Residence (Tax Treaty Jurisdiction):
                </label>
                <select
                  value={remoteCountry}
                  onChange={(e) => setRemoteCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {Object.entries(COUNTRY_TREATY_RATES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.name} (Withholding: {info.withholdingRate * 100}%)
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Annual Gross Salary: <span className="text-blue-600 text-base font-black">${annualSalary.toLocaleString()} USD</span>
                </label>
                <input
                  type="range"
                  min="40000"
                  max="350000"
                  step="5000"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$40k (Entry)</span>
                  <span>$120k (Prevailing L2)</span>
                  <span>$250k+ (Staff Lead)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Target US State (State Tax Rate):
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {Object.entries(STATE_TAX_RATES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.name} ({info.rate === 0 ? '0% State Tax' : `${(info.rate * 100).toFixed(2)}%`})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Filing Status:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFilingStatus('single')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      filingStatus === 'single'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    Single Filer
                  </button>
                  <button
                    onClick={() => setFilingStatus('married')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      filingStatus === 'married'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    Married Filing Jointly
                  </button>
                </div>
              </div>
            </>
          )}

          {/* F-1 Note if Active */}
          {calcMode === 'f1-opt' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 space-y-1">
              <strong className="text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                IRS IRC Section 3121(b)(19) Exemption Applied:
              </strong>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                As an F-1 student on CPT or OPT, you are non-resident alien exempt from Social Security (6.2%) and Medicare (1.45%), saving you <strong>${Math.round(calculations.ficaExemptAmount).toLocaleString()} extra cash per year</strong>!
              </p>
            </div>
          )}

          {calcMode === 'remote-w8ben' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 space-y-1">
              <strong className="text-blue-800 flex items-center gap-1">
                <Globe2 className="w-4 h-4 text-blue-600" />
                Form W-8BEN Tax Rule:
              </strong>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                {calculations.treatyNotes}
              </p>
            </div>
          )}

        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Main Take-Home Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-emerald-400 text-slate-950 tracking-wider">
              ★ Estimated Net Take-Home Pay
            </span>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-black text-emerald-400">
                ${Math.round(calculations.netMonthly).toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-semibold">/ month net cash</span>
            </div>

            <p className="text-xs text-slate-300 mt-1">
              Annual Net Earnings: <strong>${Math.round(calculations.netAnnual).toLocaleString()} USD</strong>
            </p>

            <div className="mt-6 pt-6 border-t border-slate-700/80 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400">Gross Monthly:</span>
                <p className="font-bold text-white text-sm">${Math.round(calculations.grossMonthly).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-400">Effective Tax Rate:</span>
                <p className="font-bold text-amber-400 text-sm">{calculations.effectiveTaxRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Itemized Deduction Breakdown</h3>
            
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">Federal Income Tax:</span>
              <span className="font-bold text-red-600">-${Math.round(calculations.federalTax).toLocaleString()} / yr</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">State Income Tax ({selectedState}):</span>
              <span className="font-bold text-red-600">-${Math.round(calculations.stateTax).toLocaleString()} / yr</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">
                FICA (Social Security & Medicare):
                {calcMode === 'f1-opt' && <span className="ml-1 text-[10px] text-emerald-600 font-bold">(EXEMPT)</span>}
              </span>
              <span className={`font-bold ${calcMode === 'f1-opt' ? 'text-emerald-600' : 'text-red-600'}`}>
                {calcMode === 'f1-opt' ? '$0.00 (F-1 Saved)' : `-$${Math.round(calculations.ficaTax).toLocaleString()} / yr`}
              </span>
            </div>

            {calculations.otherFees > 0 && (
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">International Transfer & Processing (1.5%):</span>
                <span className="font-bold text-slate-700">-${Math.round(calculations.otherFees).toLocaleString()} / yr</span>
              </div>
            )}

            <div className="flex justify-between py-2 pt-3 font-extrabold text-slate-900 text-sm">
              <span>Actual Take-Home Cash:</span>
              <span className="text-emerald-600">${Math.round(calculations.netAnnual).toLocaleString()} USD</span>
            </div>
          </div>

          {/* Viral WhatsApp Share & CTA Box */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                  <span className="text-base">📱</span> Share Your Paycheck Breakdown
                </p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Send your net take-home calculation to WhatsApp friends or study groups.</p>
              </div>
              <button
                onClick={() => {
                  const msg = `💰 *My US Paycheck & Net Take-Home Pay Breakdown:*\n• Mode: ${calcMode.toUpperCase()}\n• Gross: $${Math.round(calculations.grossMonthly).toLocaleString()}/mo ($${Math.round(calculations.grossAnnual).toLocaleString()}/yr)\n• Net Take-Home Cash: *$${Math.round(calculations.netMonthly).toLocaleString()}/month* ($${Math.round(calculations.netAnnual).toLocaleString()}/yr)\n• Effective Tax: ${calculations.effectiveTaxRate.toFixed(1)}%\n\nCalculate your US salary after tax for free: https://www.uscareersolutions.online/tools/salary-tax-calculator`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
              >
                Share on WhatsApp &rarr;
              </button>
            </div>

            <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-800">Check DOL Level 2 Prevailing Wages:</span>
              <Link
                href="/learn?tab=salaries"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                View Salary Hub &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Authoritative Educational & FAQ Section (Natural High-Value SEO) */}
      <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How to Calculate Your US Paycheck & Net Take-Home Pay After Taxes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Understanding your true post-tax income is essential when evaluating US job offers, H-1B prevailing wages, or remote 1099/W-8BEN contracts. Our <strong>take-home pay calculator</strong> and <strong>paycheck estimator</strong> accurately calculates salary after tax by modeling 2026 Federal tax brackets, state income taxes, FICA withholdings, and foreign tax treaties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-blue-700 tracking-wider">
              1. Federal Income Tax Calculation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Federal tax is computed progressively using IRS standard deductions ($14,600 Single, $29,200 Married). As income rises through the brackets (10% up to 37%), our <strong>federal income tax calculator</strong> computes your exact marginal and effective tax liability.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
              2. State-by-State Income Tax
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Living in 0% state income tax states (Texas, Washington, Florida, Tennessee) saves thousands compared to progressive states like California (up to 8.5%+) or New York. Our tool calculates net earnings based on your specific work location.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-purple-700 tracking-wider">
              3. F-1 STEM OPT FICA Exemption
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under IRS IRC Section 3121(b)(19), international students on F-1 CPT/OPT are exempt from Social Security (6.2%) and Medicare (1.45%) during their first 5 calendar years in the US, providing significantly higher bring-home pay.
            </p>
          </div>
        </div>

        {/* Quick FAQ Grid */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Frequently Asked Questions: US Paycheck & Taxes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 font-bold block">What is the difference between gross pay and net pay?</strong>
              <p className="leading-relaxed">
                Gross pay is the total compensation agreed with your employer before any withholdings. Net pay (take-home pay) is the actual cash deposited into your bank account after subtracting Federal income tax, State income tax, and FICA.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 font-bold block">How does Form W-8BEN work for remote independent contractors?</strong>
              <p className="leading-relaxed">
                Form W-8BEN establishes your foreign non-resident status with US employers. If you perform work 100% outside the US or reside in a country with a US Double Taxation Treaty (e.g. Bangladesh, India, UK, Philippines), 0% US tax is withheld.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
