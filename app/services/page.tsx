'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Video, 
  Compass, 
  Award, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  tagline: string;
  priceUSD: number;
  isPopular?: boolean;
  deliveryTime: string;
  features: string[];
}

const SERVICES: ServicePackage[] = [
  {
    id: 'resume-makeover',
    title: 'US ATS Resume & Cover Letter Transformation',
    tagline: 'Turn your international CV into a high-converting 1-page US executive standard.',
    priceUSD: 29,
    isPopular: true,
    deliveryTime: '48 Hours Delivery',
    features: [
      'Complete rewrite into 1-page US ATS-compliant format',
      'Infused with US power-action verbs & quantifiable metrics',
      'Targeted keyword injection for Workday, Greenhouse & Taleo',
      'Customized US-style Cover Letter template included',
      '1-on-1 review via WhatsApp until 100% satisfied'
    ]
  },
  {
    id: 'strategy-call',
    title: '1-on-1 US Career & Visa Strategy Call (40 Min)',
    tagline: 'Private 1-on-1 consultation to evaluate your background and map your exact US pathway.',
    priceUSD: 45,
    isPopular: false,
    deliveryTime: 'Scheduled via Zoom / Google Meet / WhatsApp',
    features: [
      'Deep profile assessment (Tech, Healthcare, Engineering, Finance)',
      'Detailed breakdown of Cap-Exempt H-1B (no lottery!) vs Remote (W-8BEN)',
      'List of 10+ US companies currently hiring your exact skill set',
      'Live Q&A: salary expectations, recruiter outreach, interview stages',
      'Recording & actionable step-by-step PDF roadmap provided'
    ]
  },
  {
    id: 'complete-career-bundle',
    title: 'VIP Complete US Job Search Mastery Bundle',
    tagline: 'Our all-in-one comprehensive solution for candidates serious about securing a US role.',
    priceUSD: 79,
    isPopular: false,
    deliveryTime: 'Full 14-Day Mentorship',
    features: [
      'Everything in Resume & Cover Letter Transformation',
      'Complete LinkedIn Profile Overhaul for US Recruiter search filters',
      '40-minute 1-on-1 Career Strategy Consultation call',
      'Mock Interview Session with US Behavioral STAR-method practice',
      'Direct WhatsApp priority support for 14 days during your applications'
    ]
  },
  {
    id: 'vip-alerts',
    title: 'Curated VIP US Jobs & Recruiter Circle',
    tagline: 'Get weekly verified sponsor job drops matched to your profile delivered straight to your WhatsApp.',
    priceUSD: 15,
    isPopular: false,
    deliveryTime: 'Monthly WhatsApp VIP Circle',
    features: [
      'Curated weekly batch of verified H-1B & Cap-Exempt openings',
      'Direct LinkedIn profiles of the hiring managers and recruiters',
      'Pre-written personalized cold message templates for each job',
      'Exclusive access to private WhatsApp VIP community group'
    ]
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [currentCountry, setCurrentCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPkg = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Jobs in USA / US Career Solutions! I would like to book the "${selectedPkg.title}" ($${selectedPkg.priceUSD} USD).\n\nName: ${fullName || 'Interested Candidate'}\nTarget Role: ${targetRole || 'Not specified'}\nCountry: ${currentCountry || 'Not specified'}\nNotes: ${notes || 'None'}`
    );
    return `https://wa.me/8801981505761?text=${text}`;
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Direct candidate straight to WhatsApp with prefilled message
    window.open(buildWhatsAppUrl(), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <Award className="w-4 h-4 text-emerald-600" />
          1-on-1 Personalized Career Care & Consulting
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Land Your US Job with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Expert 1-on-1 Guidance
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Stop getting auto-rejected by US Applicant Tracking Systems. We partner with you 1-on-1 to craft a world-class US resume, optimize your recruiter presence, and map your legal visa pathway.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {SERVICES.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedService(pkg.id)}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 relative flex flex-col justify-between border ${
              selectedService === pkg.id
                ? 'border-blue-600 bg-white ring-2 ring-blue-600 shadow-xl scale-[1.02]'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                ★ Most Popular
              </span>
            )}

            <div>
              {/* Icon & Title */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                {pkg.id === 'resume-makeover' && <FileText className="w-6 h-6" />}
                {pkg.id === 'strategy-call' && <Video className="w-6 h-6" />}
                {pkg.id === 'complete-career-bundle' && <Sparkles className="w-6 h-6" />}
                {pkg.id === 'vip-alerts' && <Zap className="w-6 h-6" />}
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {pkg.title}
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {pkg.tagline}
              </p>

              {/* Pricing Display in USD */}
              <div className="mt-5 pb-5 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">${pkg.priceUSD}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">USD</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {pkg.deliveryTime}
                </div>
              </div>

              {/* Feature List */}
              <ul className="mt-5 space-y-2.5">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Select Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                  selectedService === pkg.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {selectedService === pkg.id ? 'Selected' : 'Select Package'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking & Instant Contact Hub */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Info */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
                Guaranteed Quality & Care
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                Ready to Start? Talk to Us Instantly
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                You will be connected directly with our lead US career specialist. We provide complete transparent guidance with zero false promises.
              </p>
            </div>

            {/* Direct Quick Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <div>
                    <div>Chat on WhatsApp (+880 1981-505761)</div>
                    <div className="text-[11px] font-normal text-emerald-100">Fastest response • Available for voice / text</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61573335766965"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5 text-white" />
                  <div>
                    <div>Message on Facebook (Jobs in USA)</div>
                    <div className="text-[11px] font-normal text-blue-100">Official verified page & community</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* Flexible Global Payment Badges */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Accepted Payment Methods (100% Secure in USD)
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">International Credit / Debit Cards</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Wise / Wire Transfer</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">PayPal</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Payoneer / Direct Transfer</span>
              </div>
            </div>
          </div>

          {/* Right Form: Inquire & Book */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Book Your Consultation
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Selected: <strong className="text-blue-600">{selectedPkg.title}</strong> (${selectedPkg.priceUSD} USD)
            </p>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+123..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Job Field
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Domain</option>
                    <option value="Software & Tech">Software & Tech</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Healthcare & Nursing">Healthcare & Nursing</option>
                    <option value="Business & Finance">Business & Finance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Customer Support / VA">Customer Support / Virtual Assistant</option>
                    <option value="Remote / Other">General Remote / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Country
                  </label>
                  <input
                    type="text"
                    value={currentCountry}
                    onChange={(e) => setCurrentCountry(e.target.value)}
                    placeholder="e.g. India, Philippines, UK, Nigeria..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tell Us About Your Goals or Questions
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details about your target job, years of experience, or current questions..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Continue on WhatsApp (${selectedPkg.priceUSD} USD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                🔒 100% confidential. No spam. You will talk directly to our lead career specialist.
              </p>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
