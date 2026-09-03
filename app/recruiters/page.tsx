'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Sparkles, 
  Globe2, 
  DollarSign, 
  AlertCircle 
} from 'lucide-react';
import AntiScamBanner from '@/components/AntiScamBanner';

export default function RecruitersPage() {
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [roleType, setRoleType] = useState('Global Remote (W-8BEN / Contractor)');
  const [salaryUSD, setSalaryUSD] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Jobs in USA / US Career Solutions! I am a verified employer/recruiter submitting a position for review.\n\nCompany: ${companyName}\nWork Email: ${workEmail}\nWebsite: ${websiteUrl}\nTitle: ${jobTitle}\nType: ${roleType}\nSalary: ${salaryUSD || 'Competitive USD'}\nDescription: ${jobDescription}`
    );
    window.open(`https://wa.me/8801981505761?text=${text}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <Building2 className="w-4 h-4 text-blue-400" />
          Verified Employer & Recruiter Portal
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Hire Top Global Talent & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Post Verified US Roles
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Connect directly with thousands of motivated, vetted international professionals for <strong>Global Remote (W-8BEN)</strong> roles, tech support, AI data annotation, virtual assistance, and visa-sponsoring positions.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/talent"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-5 py-3 rounded-xl shadow-sm transition-all"
          >
            <Users className="w-4 h-4 text-blue-600" />
            Browse Live Talent Pool
          </Link>
        </div>
      </div>

      {/* Anti-Scam Shield Banner */}
      <AntiScamBanner />

      {/* Form & Value Props Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
        
        {/* Left: Value Props */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Why US Employers Hire Through Us
            </h3>
            
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Pre-Screened Candidates:</strong> Active talent with verified English fluency, technical skills, and remote readiness.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Direct W-8BEN Contractor Hiring:</strong> Compliant international contractor engagement with zero US payroll overhead.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Massive Social Community Reach:</strong> Immediate exposure to over 100,000+ career seekers across our platform & Facebook network.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Strict Anti-Scam Verification:</strong> Every listing is reviewed by our lead team to ensure genuine company legitimacy.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
            <h4 className="text-base font-bold text-white mb-1.5">
              Need Dedicated Scouting / Custom Batch Hiring?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your company is looking to hire a batch of 5+ customer support specialists, AI annotators, or engineers, we provide dedicated screening and shortlist delivery.
            </p>
            <div className="mt-4">
              <a
                href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20am%20a%20US%20company%20interested%20in%20custom%20batch%20hiring"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors"
              >
                Talk to Employer Concierge <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Post a Verified Opening Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Submit a Verified Opening
              </h3>
              <p className="text-xs text-slate-500">
                Post an authentic remote or visa-sponsoring role for review
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Submission
            </span>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                Opening Received for Verification!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Our team will verify your corporate domain and publish your opening to our daily job board and social channels.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Cloud Corp"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Corporate Website Domain *
                  </label>
                  <input
                    type="text"
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Customer Support Specialist"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Role & Visa Classification *
                  </label>
                  <select
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Global Remote (W-8BEN / Contractor)">Global Remote (W-8BEN / Contractor)</option>
                    <option value="H-1B Visa Sponsor">H-1B Visa Sponsorship</option>
                    <option value="Cap-Exempt H-1B">Cap-Exempt H-1B (University/Hospital)</option>
                    <option value="OPT / STEM OPT Friendly">OPT / STEM OPT Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Compensation (USD / Year or Hourly)
                  </label>
                  <input
                    type="text"
                    value={salaryUSD}
                    onChange={(e) => setSalaryUSD(e.target.value)}
                    placeholder="e.g. $50,000/yr or $25/hr"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Description & Core Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Outline key responsibilities, mandatory skills, working hours, and how to apply..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Submit for Verification & Publication</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>All listings are screened for corporate legitimacy to protect candidates from scams.</span>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
