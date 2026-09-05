import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Globe2,
  Search
} from 'lucide-react';
import { MASTER_GUIDES, GuideArticle } from '@/lib/guides-data';

export const metadata: Metadata = {
  title: 'US Career, Visa & Scholarship Intelligence Guides | US Career Solutions',
  description: 'In-depth, verified strategic guides on passing Fortune 500 ATS resume scanners, securing direct Schedule A hospital Green Cards, and winning 100% fully funded USA scholarships.',
  keywords: [
    'ats resume checker guide',
    'schedule a green card nurse',
    'fully funded scholarships in usa',
    'how to study in usa for free',
    'workday ats resume format',
    'us career solutions guides'
  ]
};

export default function GuidesPage() {
  const featuredGuide = MASTER_GUIDES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          US Career, Visa & Scholarship Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Authoritative US Career & Visa Blueprints
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          In-depth, reverse-engineered strategic guides on passing Fortune 500 ATS scanners, securing direct hospital Green Cards, winning fully funded assistantships, and landing high-paying US remote contracts.
        </p>
      </div>

      {/* Featured Master Blueprint Banner */}
      {featuredGuide && (
        <div className="mb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md mb-4 tracking-wider">
              ★ Featured Master Intelligence Dossier
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
              <Link href={`/guides/${featuredGuide.slug}`} className="hover:text-blue-300 transition-colors">
                {featuredGuide.title}
              </Link>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {featuredGuide.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {featuredGuide.readTime}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">By {featuredGuide.author.name}</span>
            </div>

            <Link
              href={`/guides/${featuredGuide.slug}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Read Complete Blueprint
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Guides Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          All Verified Intelligence Blueprints ({MASTER_GUIDES.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MASTER_GUIDES.map((guide) => (
            <article 
              key={guide.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {guide.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  <Link href={`/guides/${guide.slug}`}>
                    {guide.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {guide.author.name}
                </span>
                <Link 
                  href={`/guides/${guide.slug}`}
                  className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}
