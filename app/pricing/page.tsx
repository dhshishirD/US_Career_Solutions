'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  CreditCard, 
  Smartphone, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock,
  Clock,
  Star
} from 'lucide-react';
import PaymentCheckoutModal from '@/components/PaymentCheckoutModal';
import { PlanTier } from '@/lib/user-vault';

export default function PricingPage() {
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModalPlan, setSelectedModalPlan] = useState<PlanTier>('fast_track');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openCheckout = (plan: PlanTier) => {
    setSelectedModalPlan(plan);
    setModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Will my updated CV or saved work be removed if I remain on the Free tier?',
      a: 'Never. All your tailored CVs, customized cover letters, targeted employer notes, and application tracking records are permanently preserved in your candidate cloud vault. No progress is ever removed or deleted. You can use the free tier as long as you want and upgrade whenever you are ready (with upgrade passes starting from just $10 / ৳1,000).'
    },
    {
      q: 'Can I start upgrading with just $10 or ৳1,000?',
      a: 'Yes! Our Starter Pass starts at just $10.00 (or ৳1,000 via bKash/Nagad/Rocket). It provides 15 direct verified applications, 1-click ATS resume & cover letter tailoring, and lifetime preservation of your complete career portfolio.'
    },
    {
      q: 'How does the Free Explorer tier (5 Free Applications/mo) work?',
      a: 'Every registered candidate receives 5 free direct application credits each calendar month. These credits automatically refresh on the 1st of every month at zero cost. No credit card is required to sign up or use these credits.'
    },
    {
      q: 'How can I pay from Bangladesh without international cards?',
      a: 'We provide direct domestic payments via bKash, Nagad, and Rocket Send Money to our official personal account at 01627714636. Simply select BDT, send the fee (৳1,000 for Starter, ৳1,990 for Fast-Track, or ৳4,990 for VIP), and submit your Transaction ID (TrxID) for immediate account upgrade. Anyone can also contact us directly on WhatsApp at 01627714636 for clarification before making a payment.'
    },
    {
      q: 'How do U.S. and international candidates pay in USD?',
      a: 'International candidates can send domestic ACH, Fedwire, or international SWIFT wire transfers directly to our official JP Morgan Chase Bank, N.A. checking account in New York.'
    },
    {
      q: 'Is US Career Solutions compliant with U.S. Department of Labor rules?',
      a: 'Yes, 100%. Under 20 CFR § 656.12, employers are strictly prohibited from passing PERM, labor certification, or visa placement costs to candidates. US Career Solutions charges exclusively for candidate career acceleration software, AI resume optimization tools, and application CRM technology. We never charge job placement fees.'
    },
    {
      q: 'What is included in the 1-on-1 Visa & Dossier Audit for VIP Concierge?',
      a: 'VIP candidates receive a personalized review of their work authorization strategy (F-1 OPT STEM, Cap-Exempt H-1B, Schedule A Healthcare, or EB-2 NIW criteria) and an expert audit of their master CV to ensure maximum compatibility with target U.S. hiring managers.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Transparent Candidate Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Accelerate Your U.S. Career Journey
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Start with <strong>5 free direct applications</strong> every month. Upgrade whenever you need high-volume recruiter outreach, AI dossier generation, or 1-on-1 visa strategy.
          </p>

          {/* Interactive Currency Switcher */}
          <div className="pt-3 flex flex-col items-center justify-center gap-3">
            <div className="inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currency === 'USD'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>USD ($) • Global & USA</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrency('BDT')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currency === 'BDT'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>BDT (৳) • Bangladesh (bKash/Nagad/Rocket)</span>
              </button>
            </div>

            {/* Pre-Payment WhatsApp Clarification Link */}
            <a
              href="https://wa.me/8801627714636?text=Hello%20US%20Career%20Solutions%2C%20I%20have%20a%20question%20regarding%20packages%20and%20payment%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-colors shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Need pre-payment clarification? Chat on WhatsApp: 01627714636</span>
            </a>
          </div>
        </div>

        {/* 4 Core Pricing Cards (Starts from $10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Free Explorer */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  Every Month
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  100% Free
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">Free Explorer</h3>
                <p className="text-xs text-slate-500 mt-0.5">Foundational access for all candidates</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-3xl font-black text-slate-900">
                  {currency === 'USD' ? '$0' : '৳0'}
                </div>
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  5 Free Direct Applications / Month
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>5 Direct Applications</strong> every month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Permanent Cloud Vault:</strong> Work never removed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>AI ATS Resume Scanner & Scorer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant 1-Click DOCX Resume Export</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Application Milestone CRM Tracker</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <Link
                href="/apply/choose-plan"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Start Free with Google</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
                No credit card required
              </p>
            </div>
          </div>

          {/* Card 2: Starter Pass ($10 / ৳1,000) */}
          <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 shadow-md relative flex flex-col justify-between hover:shadow-lg transition-all ring-2 ring-emerald-50">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Starts from $10
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                  Entry Pass
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Quick Access
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">Starter Pass</h3>
                <p className="text-xs text-slate-500 mt-0.5">Budget-friendly boost for serious applicants</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-3xl font-black text-slate-900">
                  {currency === 'USD' ? '$10.00' : '৳1,000'}
                </div>
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  15 Direct Applications + Full Vault
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>15 Direct Applications</strong> with AI Dossier</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1-Click Job-to-CV Tailoring Engine</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom Employer-Specific Cover Letters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Lifetime Career Vault Preservation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>bKash / Nagad / Bank Wire Accepted</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openCheckout('starter')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Upgrade for {currency === 'USD' ? '$10' : '৳1,000'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
                Instant delivery to your dashboard
              </p>
            </div>
          </div>

          {/* Card 3: Fast-Track Pack (Featured) */}
          <div className="bg-white rounded-3xl border-2 border-blue-600 p-6 shadow-xl relative flex flex-col justify-between ring-4 ring-blue-50">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full">
                  Accelerated Pack
                </span>
                <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  Instant Activation
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">Fast-Track Pack</h3>
                <p className="text-xs text-slate-500 mt-0.5">Accelerate recruiter screens & reachouts</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-3xl font-black text-slate-900">
                  {currency === 'USD' ? '$19.99' : '৳1,990'}
                </div>
                <div className="text-xs font-bold text-blue-700 mt-1">
                  35 Direct Applications + Recruiter Radar
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>35 Direct Applications</strong> with AI Dossier</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Priority Recruiter Read Beacons & Alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Hiring Manager LinkedIn Outreach Scripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Professional Connections CRM Vault</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>bKash, Nagad & US Bank Wire Accepted</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openCheckout('fast_track')}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Upgrade to Fast-Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-1.5 font-medium">
                Instant delivery to your dashboard
              </p>
            </div>
          </div>

          {/* Card 4: VIP Concierge */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-full">
                  VIP Concierge
                </span>
                <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
                  Full Service
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">VIP Concierge</h3>
                <p className="text-xs text-slate-500 mt-0.5">High volume, audit & dedicated advisory</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-3xl font-black text-slate-900">
                  {currency === 'USD' ? '$49.99' : '৳4,990'}
                </div>
                <div className="text-xs font-bold text-purple-700 mt-1">
                  100 Direct Applications + 1-on-1 Audit
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100 Direct Applications</strong> with AI Dossier</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1-on-1 Visa & Dossier Audit</strong> (H-1B / EB-3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated WhatsApp Concierge Desk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Targeted Decision-Maker Outreach List</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Priority Queue for Employer Delivery</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openCheckout('vip')}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Get VIP Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-1.5 font-medium">
                Includes 1-on-1 strategy session
              </p>
            </div>
          </div>

        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Detailed Feature Comparison
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare package capabilities side-by-side
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:px-6">Feature</th>
                  <th className="p-4 text-center">Free Explorer</th>
                  <th className="p-4 text-center text-blue-700">Fast-Track Pack</th>
                  <th className="p-4 text-center text-purple-700">VIP Concierge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Direct Applications Included</td>
                  <td className="p-4 text-center font-bold text-slate-700">5 / month</td>
                  <td className="p-4 text-center font-bold text-blue-700">25 total</td>
                  <td className="p-4 text-center font-bold text-purple-700">100 total</td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">AI ATS Resume Scanner & Builder</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Tailored Cover Letter Engine</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Export DOCX Resume</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Recruiter Read Beacons</td>
                  <td className="p-4 text-center text-slate-400">Standard</td>
                  <td className="p-4 text-center font-bold text-blue-700">Priority</td>
                  <td className="p-4 text-center font-bold text-purple-700">Instant Alert</td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Hiring Manager LinkedIn Scripts</td>
                  <td className="p-4 text-center text-slate-300">—</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Networking CRM Desk</td>
                  <td className="p-4 text-center text-slate-300">—</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">1-on-1 Visa & Dossier Audit</td>
                  <td className="p-4 text-center text-slate-300">—</td>
                  <td className="p-4 text-center text-slate-300">—</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:px-6 font-semibold text-slate-900">Dedicated WhatsApp Concierge</td>
                  <td className="p-4 text-center text-slate-300">—</td>
                  <td className="p-4 text-center text-slate-300">—</td>
                  <td className="p-4 text-center font-bold text-purple-700">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* DOL Legal Compliance & Trust Guarantee */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                U.S. Department of Labor (DOL) Compliance Guarantee
              </h3>
              <p className="text-xs text-slate-500">
                Ethical, legally sound technology for global professionals
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In strict compliance with <strong>20 CFR § 656.12</strong> and U.S. immigration employment regulations, <strong>US Career Solutions</strong> assesses fees exclusively for proprietary career intelligence software, ATS formatting tools, and candidate-directed application management technology. <strong>We do not assess placement fees, visa sponsorship fees, or recruitment charges to candidates.</strong> All employer sponsorship fees must be borne independently by petitioning U.S. entities.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">
              Answers regarding billing, payment rails, and application credits
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Checkout Modal */}
      <PaymentCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={selectedModalPlan}
        initialCurrency={currency}
      />
    </div>
  );
}
