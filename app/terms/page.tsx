import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | US Career Solutions',
  description: 'Terms of Service and legal disclaimer for US Career Solutions.'
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
          <FileText className="w-4 h-4" />
          Terms & Conditions
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 mb-8">
          Last Updated: September 2026
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using US Career Solutions ("the platform"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or consulting services.
            </p>
          </section>

          <section className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl">
            <h2 className="text-base font-bold text-amber-900 mb-1 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              2. Legal & Immigration Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              US Career Solutions is an independent career coaching and job indexing platform. <strong>We are NOT an immigration law firm, licensed attorney, or government agency.</strong> We do NOT sell visas, guarantee employment, or guarantee visa approvals. All visa-related decisions are made solely by US employers and the United States Citizenship and Immigration Services (USCIS) / Department of State.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Accuracy of Job & Scholarship Listings</h2>
            <p>
              Job openings and university scholarship details are aggregated from public employer feeds, institutional announcements, and public APIs. While we make every effort to ensure accuracy and verify active postings daily, we cannot guarantee that any third-party position remains open or unfulfilled.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. 1-on-1 Consulting & Resume Services</h2>
            <p>
              Our paid services (Resume Makeover, 1-on-1 Career Strategy Calls, and Application Bundles) provide professional career advisory, ATS formatting, and mentorship. Deliverables are crafted according to US industry best practices. Payments cover the specialist’s time, analysis, and custom drafting.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Intellectual Property</h2>
            <p>
              All software, design elements, algorithms, and proprietary tools on this website are the intellectual property of US Career Solutions. You may not duplicate or scrape our codebase without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">6. Contact Information</h2>
            <p>
              For inquiries regarding these Terms, contact our official support team:
            </p>
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm">
              <div><strong>WhatsApp:</strong> +880 1981-505761</div>
              <div><strong>Facebook:</strong> <a href="https://www.facebook.com/profile.php?id=61573335766965" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Jobs in USA</a></div>
            </div>
          </section>
        </div>

      </div>

    </div>
  );
}
