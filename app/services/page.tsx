'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  ArrowRight,
  UserCheck,
  Award,
  CreditCard,
  PhoneCall,
  Briefcase
} from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  tagline: string;
  priceUSD: number;
  priceLocalApprox: string;
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
    priceLocalApprox: '≈ 3,500 BDT',
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
    priceLocalApprox: '≈ 5,400 BDT',
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
    priceLocalApprox: '≈ 9,500 BDT',
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
    priceLocalApprox: '≈ 1,800 BDT / month',
    isPopular: false,
    deliveryTime: 'Weekly WhatsApp Delivery',
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
      `Hi Jobs in USA / US Career Solutions! I would like to book the "${selectedPkg.title}" ($${selectedPkg.priceUSD}).\n\nName: ${fullName || 'Interested Candidate'}\nTarget Role: ${targetRole || 'Not specified'}\nCountry: ${currentCountry || 'Not specified'}\nNotes: ${notes || 'None'}`
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

      {/* Ethical Guarantee & Transparency Callout */}
      <div className="mb-12 bg-white rounded-2xl border border-blue-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-bold text-slate-900">
            Our 100% Ethical & Transparent Commitment
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            We are dedicated professional career coaches, ATS engineers, and resume specialists. <strong>We do not sell visas, and we never make false job guarantees.</strong> What we guarantee is a world-class US application package, rigorous interview preparation, and honest, realistic guidance that maximizes your real interview callback rate.
          </p>
        </div>
      </div>

      {/* Pricing & Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {SERVICES.map((pkg) => {
          const isCurrent = selectedService === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedService(pkg.id)}
              className={`rounded-2xl p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between relative bg-white border ${
                isCurrent 
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl' 
                  : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {pkg.tagline}
                </p>

                <div className="my-5 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">${pkg.priceUSD}</span>
                    <span className="text-xs text-slate-400 font-semibold">USD</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 mt-0.5">
                    {pkg.priceLocalApprox}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {pkg.deliveryTime}
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedService(pkg.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isCurrent ? 'Selected Package' : 'Select Package'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Form & Immediate Direct Contact */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
          
          {/* Left info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
              <PhoneCall className="w-3.5 h-3.5" />
              Direct Personal Care
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Upgrade Your Career? Talk with Us Right Now
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Have questions or want to discuss your background before making any payment? Message us directly on our official WhatsApp or Facebook Messenger. We respond promptly.
            </p>

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

            {/* Flexible Payment Badges */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Accepted Payment Methods (Domestic & International)
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">bKash / Nagad / Rocket</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Bank Transfer</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Wise / Remitly</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Debit / Credit Cards</span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">PayPal</span>
              </div>
            </div>
          </div>

          {/* Right Form: Inquire & Book */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Book Your Consultation
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Selected: <strong className="text-blue-600">{selectedPkg.title}</strong> (${selectedPkg.priceUSD})
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
                    placeholder="+880..."
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
                    placeholder="e.g. Bangladesh, India, UK..."
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
                  placeholder="e.g. I need my resume tailored for US software roles and guidance on Cap-Exempt jobs..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Submit & Open WhatsApp Discussion
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                🔒 Your personal information is kept strictly confidential.
              </p>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
