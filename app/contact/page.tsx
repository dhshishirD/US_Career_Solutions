'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send, 
  HelpCircle, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Career Consultation & Resume Service');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-4 h-4 text-blue-600" />
          Official Contact & Support Hub
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          How Can We Help You? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Get in Touch with Our Team
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Whether you need 1-on-1 US resume makeovers, scholarship guidance, job verification inquiries, or partnership discussions, our team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          
          {/* Direct Support Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Direct Communication Channels
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Email</span>
                <div className="font-bold text-slate-900">
                  <a href="mailto:contact@uscareersolutions.online" className="text-blue-600 hover:underline">
                    contact@uscareersolutions.online
                  </a>
                </div>
                <div className="text-slate-500 text-xs">For general inquiries, editorial corrections, and legal compliance.</div>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Support WhatsApp</span>
                <div className="font-bold text-slate-900">
                  <a 
                    href="https://wa.me/8801981505761?text=Hi%20US%20Career%20Solutions%2C%20I%20have%20an%20inquiry" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline flex items-center gap-1.5"
                  >
                    +880 1981-505761 <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="text-slate-500 text-xs">Direct chat for consultation scheduling & quick support.</div>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Community Page</span>
                <div className="font-bold text-slate-900">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573335766965" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1.5"
                  >
                    Jobs in USA (Official Facebook) <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="text-slate-500 text-xs">Community updates, scholarship alerts, and live Q&A.</div>
              </div>
            </div>
          </div>

          {/* Operating Hours & SLA */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Clock className="w-4 h-4" /> Response Guarantee
            </div>
            <h4 className="text-base font-bold text-white">Under 24-Hour SLA</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our support specialists review all inquiries within <strong>24 business hours</strong>. Priority is given to verified job correction reports and 1-on-1 consultation requests.
            </p>
          </div>

        </div>

        {/* Contact & Consultation Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Send an Inquiry or Feedback</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">Thank You! Your Message Has Been Sent</h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  We have received your message. An advisor from US Career Solutions will review your inquiry and reach out via email ({email}) within 24 hours.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  >
                    <option value="Career Consultation & Resume Service">1-on-1 US Career Consultation & Resume Service</option>
                    <option value="University Scholarship & Fee Waiver Question">University Scholarship & Fee Waiver Inquiries</option>
                    <option value="Job Listing Verification or Correction">Job Listing Verification or Error Report</option>
                    <option value="Tax Compliance & W-8BEN Feedback">Tax Compliance & Form W-8BEN Feedback</option>
                    <option value="Partnership & Employer Recruitment">Recruiter Job Posting & Partnerships</option>
                    <option value="Other">Other Question / General Feedback</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your question, consultation request, or feedback in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
