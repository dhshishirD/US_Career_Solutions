'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Globe2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="w-4 h-4" />
          Official Compliance & Transparency
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: September 2026 | Compliant with Google AdSense, GDPR & CCPA/CPRA Standards
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Introduction</h2>
            <p>
              US Career Solutions ("we", "our", or "us") is dedicated to protecting the privacy of visitors to our website (<strong>uscareersolutions.online</strong>). This Privacy Policy outlines what information we collect, how it is handled, how third-party services (such as Google AdSense and Google Analytics) use cookies, and your choices regarding personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Google AdSense & DoubleClick DART Cookies</h2>
            <p>
              We use <strong>Google AdSense</strong> to display advertisements across our website. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to our website or other websites on the internet.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">Google Ads Settings</a> page.</li>
              <li>Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">www.aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Information We Collect</h2>
            <p>
              We collect information in the following circumstances:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li><strong>Voluntary Communications:</strong> When you submit consultation forms, contact us via email, or message our official WhatsApp support channel, we collect your name, email, and message contents to fulfill your request.</li>
              <li><strong>Interactive Tool Usage:</strong> Data entered into client-side tools (e.g. ATS Resume Scanner, EB-2 NIW Profile Evaluator, W-8BEN Validator) is processed ephemerally in your browser and is not retained or sold.</li>
              <li><strong>Log Data & Analytics:</strong> Standard server logs, device types, browser versions, operating systems, and anonymous usage data collected via Google Analytics (GA4) to ensure site reliability.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. General Data Protection Regulation (GDPR) Rights</h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you possess statutory rights including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li>The right to access, update, or delete personal data we hold about you.</li>
              <li>The right of rectification if your data is inaccurate.</li>
              <li>The right to object to processing and request data portability.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. California Consumer Privacy Act (CCPA / CPRA)</h2>
            <p>
              Under the CCPA/CPRA, California residents have the right to know what personal information is collected, request deletion, and opt-out of the sale of personal information. <strong>US Career Solutions does not sell your personal data.</strong>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Third-Party Outbound Links</h2>
            <p>
              Our pages contain outbound links to external third-party career portals, universities, and government websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">7. Contact Information</h2>
            <p>
              For any questions regarding this Privacy Policy, please contact our Data Protection Officer at:
            </p>
            <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm">
              <div><strong>Email:</strong> contact@uscareersolutions.online</div>
              <div><strong>Official Address:</strong> US Career Solutions, Dhaka / Global Support</div>
              <div><strong>WhatsApp Support:</strong> +880 1981-505761</div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
