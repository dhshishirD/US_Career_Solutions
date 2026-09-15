'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, Scale, ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <FileText className="w-4 h-4" />
          Terms & Conditions
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: September 2026
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using US Career Solutions (<strong>uscareersolutions.online</strong>), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, our Privacy Policy, and our Legal Disclaimer. If you do not agree, please discontinue use of the site immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Description of Services</h2>
            <p>
              US Career Solutions provides educational information, publicly aggregated job feeds with visa sponsorship metadata, university scholarship directories, and interactive career tools. We do not guarantee employment, visa issuance, scholarship awards, or petition outcomes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Intellectual Property Rights</h2>
            <p>
              All proprietary content, brand assets, interactive calculators, software code, and editorial guides published on this website are the intellectual property of US Career Solutions, protected by applicable copyright and international intellectual property laws. Unauthorized reproduction or scraping is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. User Conduct & Acceptable Use</h2>
            <p>
              You agree not to use the website for any unlawful purpose, attempt to interfere with site cybersecurity, or employ automated bots to disrupt server availability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability & Warranty Disclaimer</h2>
            <p>
              The platform and all tools are provided on an "as is" and "as available" basis without warranties of any kind. US Career Solutions shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

        </div>

      </div>

    </div>
  );
}
