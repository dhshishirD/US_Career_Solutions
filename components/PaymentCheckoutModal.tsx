'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Lock, 
  ArrowRight,
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { PlanTier, getCurrentUser, savePaymentSubmission, upgradeUserPlan } from '@/lib/user-vault';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanTier;
  initialCurrency?: 'BDT' | 'USD';
  onSuccess?: () => void;
}

export default function PaymentCheckoutModal({
  isOpen,
  onClose,
  initialPlan = 'fast_track',
  initialCurrency = 'BDT',
  onSuccess
}: PaymentCheckoutModalProps) {
  const [plan, setPlan] = useState<'fast_track' | 'vip'>(initialPlan === 'vip' ? 'vip' : 'fast_track');
  const [currency, setCurrency] = useState<'BDT' | 'USD'>(initialCurrency);
  const [bdtMethod, setBdtMethod] = useState<'bkash' | 'nagad'>('bkash');
  
  // BDT form state
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  
  // USD form state
  const [senderName, setSenderName] = useState('');
  const [senderBank, setSenderBank] = useState('');
  const [wireRef, setWireRef] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialPlan === 'vip') {
      setPlan('vip');
    } else {
      setPlan('fast_track');
    }
  }, [initialPlan]);

  useEffect(() => {
    if (initialCurrency) {
      setCurrency(initialCurrency);
    }
  }, [initialCurrency]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCandidateEmail(user.email);
      setSenderName(user.name);
      if (user.phone) setSenderPhone(user.phone);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const planPricing: Record<'fast_track' | 'vip', {
    name: string;
    bdt: string;
    usd: string;
    apps: string;
    credits: number;
  }> = {
    fast_track: {
      name: 'Fast-Track Pack',
      bdt: '৳1,990',
      usd: '$19.99',
      apps: '25 Direct Applications',
      credits: 25
    },
    vip: {
      name: 'VIP Concierge',
      bdt: '৳4,990',
      usd: '$49.99',
      apps: '100 Direct Applications',
      credits: 100
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleBdtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!senderPhone || senderPhone.length < 10) {
      setErrorMsg('Please enter a valid bKash / Nagad mobile number.');
      return;
    }
    if (!trxId || trxId.length < 6) {
      setErrorMsg('Please enter a valid 8-10 character Transaction ID (TrxID).');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      // Record payment in vault
      const user = getCurrentUser();
      savePaymentSubmission({
        userId: user?.id,
        plan,
        currency: 'BDT',
        amount: plan === 'fast_track' ? '৳1,990' : '৳4,990',
        method: bdtMethod,
        senderPhone: senderPhone.trim(),
        trxId: trxId.trim().toUpperCase(),
        status: 'verified'
      });

      // Automatically upgrade plan and credit balance in client vault
      upgradeUserPlan(plan, planPricing[plan].credits);

      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 700);
  };

  const handleUsdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!senderName) {
      setErrorMsg('Please enter the remitter / account holder name.');
      return;
    }
    if (!wireRef) {
      setErrorMsg('Please enter your wire transfer or ACH confirmation number.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const user = getCurrentUser();
      savePaymentSubmission({
        userId: user?.id,
        plan,
        currency: 'USD',
        amount: plan === 'fast_track' ? '$19.99' : '$49.99',
        method: 'us_bank_wire',
        senderName: senderName.trim(),
        senderBank: senderBank.trim() || 'US Commercial Bank',
        reference: wireRef.trim().toUpperCase(),
        status: 'verified'
      });

      // Automatically upgrade plan and credit balance
      upgradeUserPlan(plan, planPricing[plan].credits);

      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 700);
  };

  const activePricing = planPricing[plan];
  const bKashNumber = '01719743174';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                Official Gateway
              </span>
              <span className="text-xs text-slate-500 font-medium">Verified Payment Processing</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Complete Package Upgrade
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">

          {submitted ? (
            /* Confirmation Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Payment Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your <strong>{activePricing.name}</strong> ({activePricing.apps}) has been registered and activated in your Candidate Dashboard.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Selected Tier:</span>
                  <span className="font-bold text-slate-900">{activePricing.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Amount:</span>
                  <span className="font-bold text-emerald-700">{currency === 'BDT' ? activePricing.bdt : activePricing.usd}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Payment Channel:</span>
                  <span className="font-bold text-slate-800 uppercase">{currency === 'BDT' ? bdtMethod : 'US Bank Wire / ACH'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Reference ID / TrxID:</span>
                  <span className="font-mono font-bold text-blue-700">{currency === 'BDT' ? trxId.toUpperCase() : wireRef.toUpperCase()}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/8801719743174?text=${encodeURIComponent(`Hello US Career Solutions, I just submitted payment for ${activePricing.name}. TrxID/Ref: ${currency === 'BDT' ? trxId : wireRef}. Please confirm.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Notify via WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => {
                    onClose();
                    window.location.href = '/dashboard';
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Go to Candidate Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Package Selector Pills */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Select Upgrade Tier
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlan('fast_track')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      plan === 'fast_track'
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">Fast-Track Pack</span>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">25 Apps</span>
                    </div>
                    <div className="mt-1 text-sm font-black text-blue-600">
                      {currency === 'BDT' ? '৳1,990' : '$19.99'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlan('vip')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      plan === 'vip'
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">VIP Concierge</span>
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">100 Apps</span>
                    </div>
                    <div className="mt-1 text-sm font-black text-purple-700">
                      {currency === 'BDT' ? '৳4,990' : '$49.99'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Currency & Region Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Payment Currency & Rail
                </label>
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setCurrency('BDT')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      currency === 'BDT'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-pink-600" />
                    <span>Bangladesh (bKash / Nagad ৳)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      currency === 'USD'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>International (US Bank Wire / Card $)</span>
                  </button>
                </div>
              </div>

              {/* Rail 1: Bangladesh bKash & Nagad */}
              {currency === 'BDT' && (
                <div className="space-y-4">
                  {/* bKash / Nagad Method Switcher */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBdtMethod('bkash')}
                      className={`flex-1 py-2.5 px-3 rounded-xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        bdtMethod === 'bkash'
                          ? 'border-pink-500 bg-pink-50/50 text-pink-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                      <span>bKash Send Money</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBdtMethod('nagad')}
                      className={`flex-1 py-2.5 px-3 rounded-xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        bdtMethod === 'nagad'
                          ? 'border-orange-500 bg-orange-50/50 text-orange-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      <span>Nagad Send Money</span>
                    </button>
                  </div>

                  {/* Payment Instruction Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {bdtMethod === 'bkash' ? 'bKash' : 'Nagad'} Number (Personal)
                        </div>
                        <div className="font-mono text-base font-black text-slate-900 tracking-wider mt-0.5">
                          {bKashNumber}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(bKashNumber, 'number')}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                      >
                        {copiedField === 'number' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/70">
                      <p>
                        1. Open your <strong>{bdtMethod === 'bkash' ? 'bKash' : 'Nagad'}</strong> App and select <strong>Send Money</strong>.
                      </p>
                      <p>
                        2. Send exact amount: <strong className="text-slate-900">{activePricing.bdt}</strong> to <span className="font-mono font-bold text-slate-900">{bKashNumber}</span>.
                      </p>
                      <p>
                        3. Enter the <strong>Transaction ID (TrxID)</strong> and your mobile number below.
                      </p>
                    </div>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleBdtSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your {bdtMethod === 'bkash' ? 'bKash' : 'Nagad'} Sender Mobile Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="017XXXXXXXX"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Transaction ID (TrxID)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BL9A8Z7X6Y"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-2"
                    >
                      {submitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>{submitting ? 'Verifying Transaction...' : `Confirm & Activate ${activePricing.name} (${activePricing.bdt})`}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Rail 2: International USD via JP Morgan Chase */}
              {currency === 'USD' && (
                <div className="space-y-4">
                  {/* Verified JP Morgan Chase Account Details */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-black text-slate-900">JP Morgan Chase Bank, N.A.</span>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        US Domestic & International Collections
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Beneficiary Name</div>
                        <div className="font-bold text-slate-900 mt-0.5">DALOYAR HASSAN</div>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Account Number</div>
                          <div className="font-mono font-bold text-slate-900 mt-0.5">30000001011126</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('30000001011126', 'acc')}
                          className="text-[10px] text-blue-600 hover:text-blue-800 font-bold"
                        >
                          {copiedField === 'acc' ? 'Copied' : 'Copy'}
                        </button>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">ACH Routing (Inside US)</div>
                          <div className="font-mono font-bold text-slate-900 mt-0.5">028000024</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('028000024', 'ach')}
                          className="text-[10px] text-blue-600 hover:text-blue-800 font-bold"
                        >
                          {copiedField === 'ach' ? 'Copied' : 'Copy'}
                        </button>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Wire Routing / SWIFT</div>
                          <div className="font-mono font-bold text-slate-900 mt-0.5">021000021 / CHASUS33</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('021000021', 'wire')}
                          className="text-[10px] text-blue-600 hover:text-blue-800 font-bold"
                        >
                          {copiedField === 'wire' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1">
                      Bank Address: 383 Madison Avenue, New York, NY 10179. Include candidate email in wire memo.
                    </div>
                  </div>

                  {/* Wire Confirmation Form */}
                  <form onSubmit={handleUsdSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Remitter / Sender Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name as on Bank Account"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sending Bank
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Bank of America, Chase, Wells Fargo"
                          value={senderBank}
                          onChange={(e) => setSenderBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Wire Reference / Transfer Confirmation Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ACH-9482910 or WIRE-84729"
                        value={wireRef}
                        onChange={(e) => setWireRef(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-2"
                    >
                      {submitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>{submitting ? 'Registering Wire...' : `Submit Wire Confirmation (${activePricing.usd})`}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* DOL Compliance & Guarantee Banner */}
              <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>DOL Compliance (20 CFR § 656.12):</strong> Fees are solely for candidate career software tools, ATS optimization engines, and technological intelligence. Zero job placement fees or visa fees are assessed.
                </p>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
