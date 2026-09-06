import React from 'react';
import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { MASTER_GUIDES } from '@/lib/guides-data';
import GuidesClient from './GuidesClient';

export const metadata: Metadata = {
  title: 'US Career, Visa & Scholarship Intelligence Guides | US Career Solutions',
  description: 'In-depth, verified strategic guides on passing Fortune 500 ATS resume scanners, securing direct Schedule A hospital Green Cards, winning 100% fully funded USA scholarships, and prevailing wages.',
  keywords: [
    'ats resume checker guide',
    'schedule a green card nurse',
    'fully funded scholarships in usa',
    'how to study in usa for free',
    'workday ats resume format',
    'us career solutions guides',
    'prevailing wage intelligence'
  ]
};

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
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

      {/* Interactive Category Hubs & Guides Grid */}
      <GuidesClient guides={MASTER_GUIDES} />

    </div>
  );
}
