'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  Award,
  Share2,
  Copy,
  Check,
  X
} from 'lucide-react';
import { USA_SCHOLARSHIPS, USAScholarship } from '@/lib/scholarships-data';

export default function ScholarshipsPage() {
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [scholarships, setScholarships] = useState<USAScholarship[]>(USA_SCHOLARSHIPS);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = scholarships.filter(s => {
    if (selectedDegree !== 'all' && !s.degreeLevel.toLowerCase().includes(selectedDegree.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleCopyLink = (id: string, name: string, university: string) => {
    const text = `🎓 100% Fully-Funded US Scholarship: ${name} at ${university} (Full Tuition Waiver + Living Salary) 👉 https://www.uscareersolutions.online/scholarships`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          100% Fully Funded Graduate Pathways
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Top USA University Scholarships & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Graduate Assistantships (GRA/GTA)
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          The most legitimate, tuition-free gateway to enter the United States. US universities fund thousands of international students every year with <strong>100% full tuition waivers plus monthly living salaries ($2,000 – $3,500/mo)</strong>.
        </p>
      </div>

      {/* Educational Explainer Box: How GRA/GTA Works */}
      <div className="mb-10 bg-white rounded-2xl border border-indigo-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
          <Award className="w-7 h-7" />
        </div>
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Did you know? In the US, STEM PhDs and Research Masters are 100% Free!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Unlike other countries where universities charge massive tuition, US departments hire international graduate students as <strong>Graduate Research Assistants (GRA)</strong> or <strong>Teaching Assistants (GTA)</strong>. The university pays 100% of your tuition and gives you a bi-weekly paycheck to cover housing, food, and living expenses.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow transition-all whitespace-nowrap"
          >
            Get SOP & Email Help <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Degree Filters */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {[
          { id: 'all', label: 'All Funding Programs' },
          { id: 'Masters & PhD', label: 'Masters & PhD Assistantships' },
          { id: 'PhD Only', label: 'PhD Direct Fellowships' },
          { id: 'Masters Only', label: 'Masters Scholarships' },
          { id: 'Undergraduate', label: 'Undergraduate / General' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDegree(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDegree === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all flex flex-col justify-between relative ${
              item.isFeatured ? 'border-indigo-400 ring-2 ring-indigo-50' : 'border-slate-200'
            }`}
          >
            <div>
              {/* Top Badges & Share Button */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  {item.degreeLevel}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Deadline: {item.deadline}
                  </span>
                  <button
                    onClick={() => setActiveShareId(activeShareId === item.id ? null : item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Share scholarship"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Share Box Popup */}
              {activeShareId === item.id && (
                <div className="mb-3 p-3 bg-slate-900 text-white rounded-xl shadow-xl flex items-center justify-between gap-2 text-xs animate-in fade-in">
                  <span className="font-bold text-slate-300">Share:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🎓 100% Fully-Funded US Scholarship: ${item.name} at ${item.university} 👉 https://www.uscareersolutions.online/scholarships`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 font-bold text-white"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.uscareersolutions.online/scholarships')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 font-bold text-white"
                    >
                      Facebook
                    </a>
                    <button
                      onClick={() => handleCopyLink(item.id, item.name, item.university)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 flex items-center gap-1 border border-slate-700"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === item.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <button onClick={() => setActiveShareId(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Scholarship Name & University */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {item.name}
              </h3>
              
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 font-semibold flex-wrap">
                <span>🏛️ {item.university}</span>
                <span>•</span>
                <span className="text-slate-500 text-xs font-normal">📍 {item.location}</span>
              </div>

              {/* Funding Callout */}
              <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">
                    {item.fundingCoverage}
                  </div>
                  {item.stipendAmount && (
                    <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                      Living Salary: {item.stipendAmount}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* Requirements */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Key Requirements:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {item.requirements.slice(0, 3).map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <a
                href={`https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20need%20help%20applying%20for%20the%20${encodeURIComponent(item.name)}%20at%20${encodeURIComponent(item.university)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Ask Us on WhatsApp
              </a>

              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow transition-all"
              >
                Official Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* WhatsApp Help Banner for SOP and Professor Cold Emails */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-800/60 border border-indigo-400/30 px-3 py-1 rounded-full">
            ★ Application Care
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Need Help Reaching Out to US Professors or Writing Your Statement of Purpose?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Landing a research assistantship usually begins with sending a high-impact cold email to prospective professors. We help you draft compelling emails and polish your SOP.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20want%20guidance%20on%20US%20University%20Scholarships%20and%20Professor%20Outreach"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow transition-all"
          >
            Chat on WhatsApp (+880 1981-505761)
          </a>
          <Link
            href="/services"
            className="text-center px-5 py-3 rounded-xl bg-white text-indigo-950 font-bold text-xs sm:text-sm shadow transition-all hover:bg-slate-100"
          >
            View Packages ($29 USD)
          </Link>
        </div>
      </div>

    </div>
  );
}
