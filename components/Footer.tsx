import React from 'react';
import Link from 'next/link';
import { Briefcase, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                US<span className="text-blue-400">Career</span>Solutions
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Empowering global professionals and international job seekers with everyday verified USA jobs, clear visa sponsorship transparency (H-1B, Cap-Exempt, OPT, Remote), and AI career care tools.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <a
                href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%20help%20with%20my%20US%20job%20search"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                WhatsApp: +880 1981-505761 <ExternalLink className="w-3 h-3" />
              </a>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a
                href="https://www.facebook.com/profile.php?id=61573335766965"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                Official Facebook: Jobs in USA <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Explore Jobs
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs?sponsorship=H-1B+Sponsor" className="hover:text-white transition-colors">
                  H-1B Sponsor Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?sponsorship=Cap-Exempt+H-1B" className="hover:text-white transition-colors">
                  Cap-Exempt H-1B (No Lottery)
                </Link>
              </li>
              <li>
                <Link href="/jobs?sponsorship=OPT/CPT+Friendly" className="hover:text-white transition-colors">
                  OPT / CPT Friendly Roles
                </Link>
              </li>
              <li>
                <Link href="/jobs?remote=true" className="hover:text-white transition-colors">
                  US Remote (Contractor / W-8BEN)
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                  🎓 USA Uni Scholarships & Fellowships
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  All Daily US Postings
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Career Care Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                  ★ 1-on-1 Career Consultation
                </Link>
              </li>
              <li>
                <Link href="/tools/ats-scanner" className="hover:text-white transition-colors">
                  AI ATS Resume Tailorer
                </Link>
              </li>
              <li>
                <Link href="/tools/visa-checker" className="hover:text-white transition-colors">
                  Company Visa Sponsor Radar
                </Link>
              </li>
              <li>
                <Link href="/tools/outreach-gen" className="hover:text-white transition-colors">
                  Recruiter Outreach Generator
                </Link>
              </li>
              <li>
                <Link href="/tracker" className="hover:text-white transition-colors">
                  Application Tracker (CRM)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <p>
              © {new Date().getFullYear()} US Career Solutions. Independent public jobs aggregator.
            </p>
            <Link href="/privacy" className="text-slate-400 hover:text-white underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white underline transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" /> for your followers & community.
          </div>
        </div>
      </div>
    </footer>
  );
}
