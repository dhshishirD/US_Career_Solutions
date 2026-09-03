import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | US Career Solutions',
  description: 'Privacy policy and data protection practices for US Career Solutions.'
};

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="w-4 h-4" />
          Official Compliance
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mb-8">
          Last Updated: September 2026
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview</h2>
            <p>
              US Career Solutions ("we", "our", or "us") is dedicated to safeguarding the privacy of visitors who use our platform to explore USA jobs, scholarships, and career tools. This Privacy Policy details the types of information we collect, how we use it, and your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Information We Collect</h2>
            <p>
              When you use our site, we may collect:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li><strong>Contact Information:</strong> Name, WhatsApp phone number, and email address when you submit consultation inquiries or reach out via WhatsApp/Messenger.</li>
              <li><strong>Resume & Application Details:</strong> Job titles, experience summaries, or resume text pasted into our AI ATS Tailorer tool. This information is processed in real-time and not sold to third parties.</li>
              <li><strong>Usage & Device Analytics:</strong> Standard server logs, IP addresses, browser types, and device information collected automatically to optimize website performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Google AdSense & Cookies</h2>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p className="mt-2">
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. How We Use Your Information</h2>
            <p>
              We use collected information solely to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li>Provide, maintain, and improve our public job aggregation and scholarship feeds.</li>
              <li>Deliver 1-on-1 resume optimization and career consulting services requested by you.</li>
              <li>Respond to support and consultation messages on WhatsApp and Facebook.</li>
              <li>Prevent unauthorized access and maintain cybersecurity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Third-Party Links</h2>
            <p>
              Our website links directly to official company career portals (e.g., Microsoft, Mayo Clinic, Stanford, Amazon) and university application systems. We are not responsible for the privacy practices or content of these external third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can reach out directly via:
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
