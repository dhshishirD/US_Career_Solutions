import React from 'react';
import Link from 'next/link';
import { Briefcase, Heart, MessageCircle, Send, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                US<span className="text-blue-500">Career</span>Solutions
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your trusted automated hub for everyday verified USA jobs, top 100% fully-funded university scholarships, candidate talent showcase, and 1-on-1 US career solutions.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%20assistance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Official WhatsApp: +880 1981-505761 <ExternalLink className="w-3 h-3" />
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
              Explore Opportunities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Daily US Jobs & Remote
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                  🎓 USA Uni Scholarships & GRA/GTA
                </Link>
              </li>
              <li>
                <Link href="/talent" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                  👥 Talent Showcase Board
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                  🎯 Interview Prep Academy (STAR)
                </Link>
              </li>
              <li>
                <Link href="/recruiters" className="text-slate-300 hover:text-white transition-colors">
                  🏢 For Employers & Recruiters
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Tools & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Career Care & Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                  ★ 1-on-1 Career Consultation ($29 USD)
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
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
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
