'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Globe2, 
  FileText, 
  Download, 
  Info, 
  Scale, 
  DollarSign,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { COUNTRIES_TREATY_DATA, CountryTreatyInfo } from '@/lib/w8ben-data';

export default function W8BENValidatorPage() {
  // Step State
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('GB');
  const [entityType, setEntityType] = useState<'individual' | 'entity' | 'us_person'>('individual');
  const [physicalLocation, setPhysicalLocation] = useState<'100_outside' | 'partially_inside'>('100_outside');
  const [fullName, setFullName] = useState<string>('');
  const [ftinInput, setFtinInput] = useState<string>('');
  const [ftinNotRequired, setFtinNotRequired] = useState<boolean>(false);
  const [incomeType, setIncomeType] = useState<'services' | 'royalties' | 'other'>('services');
  const [claimTreaty, setClaimTreaty] = useState<boolean>(true);
  const [copiedMemo, setCopiedMemo] = useState<boolean>(false);

  // Active Country Data
  const activeCountry = useMemo(() => {
    return COUNTRIES_TREATY_DATA.find(c => c.code === selectedCountryCode) || COUNTRIES_TREATY_DATA[0];
  }, [selectedCountryCode]);

  // FTIN Validation
  const ftinValidationStatus = useMemo(() => {
    if (ftinNotRequired) {
      return { valid: true, isExempt: true, message: 'Box 6b exemption selected (Requires justification to avoid 30% backup withholding).' };
    }
    if (!ftinInput.trim()) {
      return { valid: false, isExempt: false, message: 'Please enter your Foreign Tax ID.' };
    }
    try {
      const regex = new RegExp(activeCountry.ftinRegex, 'i');
      const isValid = regex.test(ftinInput.trim());
      if (isValid) {
        return { valid: true, isExempt: false, message: `Matches standard format for ${activeCountry.ftinName}.` };
      } else {
        return { valid: false, isExempt: false, message: `Format mismatch. Expected: ${activeCountry.ftinFormat}` };
      }
    } catch {
      return { valid: ftinInput.trim().length >= 5, isExempt: false, message: 'Valid format.' };
    }
  }, [ftinInput, ftinNotRequired, activeCountry]);

  // Withholding Rate Calculation
  const withholdingResult = useMemo(() => {
    if (entityType === 'us_person') {
      return {
        rate: 0,
        formName: 'Form W-9 (Request for Taxpayer ID Number)',
        status: 'US Person / Resident Alien',
        statutoryBasis: 'US citizens, Green Card holders, and US tax residents submit Form W-9. Form W-8BEN is not applicable.'
      };
    }
    if (entityType === 'entity') {
      return {
        rate: activeCountry.hasTreaty ? (incomeType === 'services' ? 0 : activeCountry.royaltyWithholdingRate) : (incomeType === 'services' ? 0 : 30),
        formName: 'Form W-8BEN-E (Certificate of Status of Beneficial Owner for US Tax Withholding - Entities)',
        status: 'Foreign Corporate Entity',
        statutoryBasis: 'Foreign companies and LLCs must use Form W-8BEN-E with Chapter 3/4 FATCA entity classification.'
      };
    }

    // Individual
    if (physicalLocation === 'partially_inside') {
      return {
        rate: 30,
        formName: 'Form W-8BEN / Form 8233 / Form W-4',
        status: 'US-Sourced Income (Potential 30% Withholding or Graduated Rates)',
        statutoryBasis: 'Work performed physically on US soil constitutes US-source income under IRC § 861(a)(3), requiring graduated payroll withholding or Form 8233 treaty exemption.'
      };
    }

    // 100% Outside US
    if (incomeType === 'services') {
      return {
        rate: 0,
        formName: 'Form W-8BEN (Individual)',
        status: '0% US Withholding Tax (Foreign Source Income & Treaty Article 7)',
        statutoryBasis: `Services performed 100% outside the US by a Non-Resident Alien constitute Foreign-Source Income under IRC § 862(a)(3). Supported by ${activeCountry.hasTreaty ? activeCountry.serviceTreatyArticle : 'IRC § 862(a)(3)'}.`
      };
    } else if (incomeType === 'royalties') {
      const rate = activeCountry.hasTreaty ? activeCountry.royaltyWithholdingRate : 30;
      return {
        rate: rate,
        formName: 'Form W-8BEN (Individual)',
        status: `${rate}% US Withholding Tax on Royalty / IP Income`,
        statutoryBasis: activeCountry.hasTreaty 
          ? `Treaty reduced rate under ${activeCountry.royaltyTreatyArticle}. Standard non-treaty rate is 30% under IRC § 1441.`
          : 'No tax treaty in effect. Mandatory 30% statutory withholding under IRC § 1441 applies.'
      };
    } else {
      return {
        rate: activeCountry.hasTreaty ? 0 : 30,
        formName: 'Form W-8BEN (Individual)',
        status: activeCountry.hasTreaty ? '0% to 15% Treaty Rate' : '30% Statutory Rate',
        statutoryBasis: 'Subject to specific income classification under Treasury Regulation § 1.1441-1.'
      };
    }
  }, [entityType, physicalLocation, incomeType, activeCountry]);

  // Copy US Client Memo
  const generateClientMemo = () => {
    const contractor = fullName.trim() || '[Your Full Name]';
    const tinValue = ftinNotRequired ? '[Box 6b Exemption Claimed]' : (ftinInput.trim() || '[Your Foreign Tax ID]');
    
    return `MEMORANDUM: Form W-8BEN Tax Compliance & Exemption Certification
To: Accounts Payable / Finance Department
From: ${contractor}
Country of Tax Residence: ${activeCountry.name}
Form Submitted: IRS Form W-8BEN (Rev. October 2021)
Foreign Tax Identification Number (FTIN): ${tinValue}

STATUTORY BASIS FOR ZERO (0%) US WITHHOLDING TAX:
1. Beneficial Owner Status: I am a non-resident alien individual residing in ${activeCountry.name} and the sole beneficial owner of payments received.
2. Source of Income Rule (IRC § 862(a)(3)): 100% of all professional independent contractor services are performed physically outside the United States. Under US Internal Revenue Code §§ 861(a)(3) and 862(a)(3), compensation for services performed outside the US is classified as Foreign-Source Income.
3. No US Trade or Business (ECI): I have no permanent establishment, office, or fixed place of business in the United States under ${activeCountry.hasTreaty ? activeCountry.treatyName : 'IRC § 864(b)'}.
4. Applicable Treaty Article: ${activeCountry.hasTreaty ? activeCountry.serviceTreatyArticle : 'Foreign-Source Income Exemption (IRC § 862)'}.

CONCLUSION:
Under 26 U.S. Code § 1441 and Treasury Regulation § 1.1441-1(b)(4)(i), payments for foreign-source independent services made to a non-resident alien are exempt from US federal backup withholding (0% withholding). Please process 100% gross invoice payouts without US tax deductions.

Form W-8BEN is valid for three full calendar years under Treas. Reg. § 1.1441-1(e)(4)(ii).`;
  };

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(generateClientMemo());
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header Breadcrumbs & Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            IRS Statutory Compliance Engine (IRC §§ 1441, 1442, 894 & 862)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Form W-8BEN Compliance Validator <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              & Tax Treaty Rate Calculator
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Verify your Foreign Tax ID (FTIN), determine your exact double taxation treaty rate (0% vs 30%), avoid wrongful US client tax withholding, and generate a 1-click IRS compliance pack.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto text-xs font-semibold">
          {[
            { step: 1, title: '1. Entity & Location' },
            { step: 2, title: '2. Foreign Tax ID (FTIN)' },
            { step: 3, title: '3. Income & Treaty' },
            { step: 4, title: '4. Compliance Report' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`py-3 px-2 rounded-xl text-center border transition-all ${
                currentStep === item.step
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : currentStep > item.step
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                {currentStep > item.step ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : null}
                <span className="truncate">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Interactive Wizard Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">

          {/* STEP 1: Entity & Location Audit */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 1 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Entity Type & Physical Work Location</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  IRS rules distinguish between individuals (W-8BEN), corporations (W-8BEN-E), and US persons (W-9).
                </p>
              </div>

              {/* Country Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-200">
                  Select Your Country of Permanent Tax Residence:
                </label>
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {COUNTRIES_TREATY_DATA.map((country) => (
                    <option key={country.code} value={country.code} className="bg-slate-950 text-white">
                      {country.name} {country.hasTreaty ? '★ (US Tax Treaty Member)' : '(Non-Treaty Jurisdiction)'}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <Globe2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Treaty Status:</strong> {activeCountry.treatyName}
                  </span>
                </div>
              </div>

              {/* Entity Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-200">
                  What entity structure are you operating under?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'individual',
                      title: 'Individual / Freelancer',
                      sub: 'Form W-8BEN (Correct Form)',
                      desc: 'Sole contractor or independent professional working under personal legal name.'
                    },
                    {
                      id: 'entity',
                      title: 'Foreign Company / LLC',
                      sub: 'Form W-8BEN-E Required',
                      desc: 'Registered corporate entity outside the US requiring Chapter 4 FATCA classification.'
                    },
                    {
                      id: 'us_person',
                      title: 'US Citizen / Green Card',
                      sub: 'Form W-9 Required',
                      desc: 'US citizens or Permanent Residents regardless of where they currently live.'
                    }
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setEntityType(option.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        entityType === option.id
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-100">{option.title}</div>
                      <div className="text-xs font-semibold text-emerald-400 mt-0.5">{option.sub}</div>
                      <div className="text-xs text-slate-400 mt-2 leading-relaxed">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Location Check */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-200">
                  Where will your work/services be physically performed?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPhysicalLocation('100_outside')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      physicalLocation === '100_outside'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      100% Outside the USA
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      You never step foot in the US while working on the contract. Classified as <strong>Foreign-Source Income (0% US Withholding under IRC § 862)</strong>.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPhysicalLocation('partially_inside')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      physicalLocation === 'partially_inside'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Partially or Fully on US Soil
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Any work performed while physically inside the US is US-Sourced Income (IRC § 861) and requires Form 8233 or payroll withholding.
                    </p>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all"
                >
                  Proceed to Step 2: Foreign Tax ID (FTIN) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Foreign Tax Identification Number (FTIN) */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 2 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Foreign Tax Identifying Number (FTIN) Verification</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  IRS Form W-8BEN Box 6a requires an authentic Foreign Tax ID issued by your home country. Without it, US payers must withhold 30%.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Full Legal Name (as shown on official tax returns / passport):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* FTIN Input Card */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Box 6a: {activeCountry.ftinName} ({activeCountry.name})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Format rule: {activeCountry.ftinDescription}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg">
                    {activeCountry.ftinFormat}
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    disabled={ftinNotRequired}
                    placeholder={`Enter ${activeCountry.ftinName}`}
                    value={ftinInput}
                    onChange={(e) => setFtinInput(e.target.value.toUpperCase())}
                    className={`w-full bg-slate-900 border rounded-xl px-4 py-3.5 text-white font-mono text-base focus:outline-none transition-all ${
                      ftinNotRequired
                        ? 'opacity-50 cursor-not-allowed border-slate-800'
                        : ftinValidationStatus.valid
                        ? 'border-emerald-500 ring-1 ring-emerald-500/50'
                        : ftinInput.trim()
                        ? 'border-amber-500 ring-1 ring-amber-500/50'
                        : 'border-slate-700 focus:border-emerald-500'
                    }`}
                  />

                  {/* Dynamic Regex Feedback */}
                  <div className="flex items-center gap-2 text-xs">
                    {ftinValidationStatus.valid ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-4 h-4" /> {ftinValidationStatus.message}
                      </span>
                    ) : ftinInput.trim() ? (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-4 h-4" /> {ftinValidationStatus.message}
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        Type your national tax identification number to test validity.
                      </span>
                    )}
                  </div>
                </div>

                {/* Box 6b Exemption Checkbox */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ftinNotRequired}
                      onChange={(e) => {
                        setFtinNotRequired(e.target.checked);
                        if (e.target.checked) setFtinInput('');
                      }}
                      className="mt-1 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div className="text-xs text-slate-300">
                      <span className="font-semibold text-slate-200">Box 6b: Check if FTIN not legally required in your jurisdiction</span>
                      <p className="text-slate-500 mt-0.5 leading-relaxed">
                        ⚠️ CAUTION: Only check if your country’s tax authority does not issue tax numbers. Checking this without statutory grounds triggers mandatory 30% IRS backup withholding.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Explainer: Do you need a US SSN or ITIN? */}
              <div className="bg-blue-950/30 border border-blue-800/40 rounded-2xl p-5 flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-blue-300">Do you need a US SSN or ITIN in Box 5?</div>
                  <p className="text-slate-400 leading-relaxed">
                    <strong>NO.</strong> Non-resident alien remote contractors do NOT need a US Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN) in Box 5. Providing your foreign home-country tax ID in <strong>Box 6a</strong> is 100% compliant under Treas. Reg. § 1.1441-1(e)(4)(iv).
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all"
                >
                  Proceed to Step 3: Income & Treaty Claim <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Income Category & Treaty Claim */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Income Classification & Part II Treaty Claims</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Correct classification prevents erroneous royalty or ECI withholding by US payroll departments.
                </p>
              </div>

              {/* Income Type */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-200">
                  Select the Nature of Payments Received:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'services',
                      title: 'Independent Professional Services',
                      rate: '0% US Withholding',
                      desc: 'Software development, engineering, UI/UX design, marketing, copywriting, remote consulting.'
                    },
                    {
                      id: 'royalties',
                      title: 'Digital Royalties & Licensing',
                      rate: activeCountry.hasTreaty ? `${activeCountry.royaltyWithholdingRate}% Treaty Rate` : '30% Statutory Rate',
                      desc: 'Copyright licensing, software IP royalties, stock photography, YouTube / AdSense digital media.'
                    },
                    {
                      id: 'other',
                      title: 'Teaching / Research / Honoraria',
                      rate: 'Special Treaty Rates',
                      desc: 'Visiting academic lecturers, guest researchers, or international grant recipients.'
                    }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIncomeType(item.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        incomeType === item.id
                          ? 'bg-emerald-500/10 border-emerald-500 text-white'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-100">{item.title}</div>
                      <div className="text-xs font-bold text-emerald-400 mt-1">{item.rate}</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Part II Treaty Claim Details */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Part II: Claim of Tax Treaty Benefits (Lines 9 & 10)</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeCountry.hasTreaty ? 'Treaty Applicable' : 'Non-Treaty Foreign Source'}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-400">Line 9 (Treaty Country):</span>
                      <span className="font-bold text-white">{activeCountry.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-400">Line 10 (Article & Paragraph):</span>
                      <span className="font-bold text-emerald-400">
                        {incomeType === 'services' ? activeCountry.serviceTreatyArticle : activeCountry.royaltyTreatyArticle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-400">Applicable Withholding Rate:</span>
                      <span className="font-bold text-emerald-300 text-sm">
                        {incomeType === 'services' ? '0%' : `${activeCountry.hasTreaty ? activeCountry.royaltyWithholdingRate : 30}%`}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400">
                    <strong>Statutory Authority:</strong> Under <strong>IRC § 894(a)</strong>, provisions of the US tax treaty take precedence over standard statutory 30% withholding rules under IRC § 1441.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all"
                >
                  Generate Compliance Blueprint <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Compliance Report & US Client Packet */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Compliance Status Banner */}
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                withholdingResult.rate === 0
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Audit Result: {withholdingResult.status}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {withholdingResult.rate === 0 ? '0% US Federal Withholding Tax' : `${withholdingResult.rate}% US Withholding Required`}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mt-1">
                      {withholdingResult.statutoryBasis}
                    </p>
                  </div>

                  <div className="shrink-0 bg-slate-950/80 px-5 py-3.5 rounded-2xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-400">Effective Rate</div>
                    <div className="text-3xl font-black text-emerald-400">{withholdingResult.rate}%</div>
                  </div>
                </div>
              </div>

              {/* Line-by-Line Form Completion Guide */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    IRS Form W-8BEN Line-by-Line Completion Blueprint
                  </h3>
                  <a
                    href="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Download Official IRS PDF <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="font-mono text-emerald-400 font-bold">Line 1: Name of Individual</div>
                    <div className="text-white font-medium">{fullName.trim() || '[Your Full Legal Name]'}</div>
                    <div className="text-slate-500">Must exactly match passport and bank account holder name.</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="font-mono text-emerald-400 font-bold">Line 2: Country of Citizenship</div>
                    <div className="text-white font-medium">{activeCountry.name}</div>
                    <div className="text-slate-500">Do not abbreviate country names.</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="font-mono text-emerald-400 font-bold">Line 3: Permanent Residence Address</div>
                    <div className="text-white font-medium">[Your Physical Address in {activeCountry.name}]</div>
                    <div className="text-slate-500">Cannot be a P.O. Box or US address (must be outside the US).</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="font-mono text-emerald-400 font-bold">Line 6a: Foreign Tax Identifying Number (FTIN)</div>
                    <div className="text-white font-mono font-bold">
                      {ftinNotRequired ? 'N/A (Box 6b checked)' : (ftinInput.trim() || `[Your ${activeCountry.ftinName}]`)}
                    </div>
                    <div className="text-slate-500">{activeCountry.ftinName} issued by local tax department.</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="font-mono text-emerald-400 font-bold">Line 9: Treaty Country Claim</div>
                    <div className="text-white font-medium">{activeCountry.hasTreaty ? activeCountry.name : 'N/A'}</div>
                    <div className="text-slate-500">Beneficial owner is a tax resident of treaty nation.</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="font-mono text-emerald-400 font-bold">Line 10: Special Rates & Conditions</div>
                    <div className="text-white font-medium">
                      {incomeType === 'services' 
                        ? `${activeCountry.serviceTreatyArticle} - 0% Withholding`
                        : `${activeCountry.royaltyTreatyArticle}`}
                    </div>
                    <div className="text-slate-500">Specific article specifying zero/reduced rate for remote earnings.</div>
                  </div>
                </div>
              </div>

              {/* 1-Click US Client Compliance Statement Memo */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      1-Click US Client Cover Memo (Attach to Email)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Copy and send this statutory memo to your US client's Accounts Payable department along with your completed W-8BEN.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyMemo}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                      copiedMemo
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {copiedMemo ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-950" /> Copied Memo to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Compliance Memo
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {generateClientMemo()}
                </div>
              </div>

              {/* Zero-Fee Banking Recommendation */}
              <div className="bg-gradient-to-r from-emerald-900/60 to-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">USD Payout Setup</span>
                  <h4 className="text-xl font-bold text-white">
                    Receive 100% of USD Invoices with Zero Wire Deduction Fees
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Avoid \$35-\$50 bank intermediary wire cuts. Set up a free US Routing and Account Number with Wise to receive direct ACH client payments.
                  </p>
                </div>
                <a
                  href="https://wise.prf.hn/click/camref:1011l5QMmm"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all whitespace-nowrap"
                >
                  Open Free US Account <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </a>
              </div>

              {/* Navigation Back */}
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Step 3
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
                >
                  Start New Audit
                </button>
              </div>

            </div>
          )}

        </div>

        {/* FAQ & Statutory Knowledge Base */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-400" />
            W-8BEN Compliance & IRS Statutory FAQ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 text-sm">How long is Form W-8BEN valid?</h4>
              <p>
                Under <strong>Treasury Regulation § 1.1441-1(e)(4)(ii)</strong>, a Form W-8BEN remains valid starting on the date signed and running through the end of the third full calendar year (approximately 3 to 4 years), unless a change in circumstances makes any information invalid.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 text-sm">Do I have to file a US tax return (Form 1040-NR)?</h4>
              <p>
                If you performed 100% of your contractor services outside the US and had zero US withholding deducted, you do <strong>not</strong> need to file a US federal tax return with the IRS. You only report and pay taxes in your country of tax residence.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 text-sm">What happens if a US client erroneously withheld 30%?</h4>
              <p>
                If your client withheld 30% because you did not submit Form W-8BEN in time, they will issue you a <strong>Form 1042-S</strong> by March 15. You can file IRS Form 1040-NR to claim a full refund of the erroneously withheld tax citing IRC § 862(a)(3).
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 text-sm">What if my country does not have a US tax treaty?</h4>
              <p>
                Even without a double taxation treaty (e.g. Nigeria, Brazil, Kenya), independent services performed 100% offshore are <strong>Foreign-Source Income under IRC § 862(a)(3)</strong> and are exempt from US withholding. Treaties are primarily needed for royalties and dividends.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
