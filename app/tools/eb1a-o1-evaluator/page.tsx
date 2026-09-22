'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  GraduationCap, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Users,
  Building2,
  Atom,
  Cpu,
  HeartPulse,
  Leaf,
  Globe,
  DollarSign,
  Briefcase,
  Star,
  Layers,
  ArrowRight,
  FileCheck,
  Zap,
  Info
} from 'lucide-react';

interface CriterionData {
  id: string;
  number: number;
  title: string;
  cfrCitation: string;
  description: string;
  evidenceExamples: string[];
  commonRfeReasons: string[];
  status: 'strong' | 'moderate' | 'weak' | 'none';
}

const INITIAL_CRITERIA: Omit<CriterionData, 'status'>[] = [
  {
    id: 'awards',
    number: 1,
    title: 'Nationally or Internationally Recognized Prizes / Awards',
    cfrCitation: '8 CFR § 204.5(h)(3)(i) / 8 CFR § 214.2(o)(3)(iii)(A)',
    description: 'Documentation of receipt of lesser nationally or internationally recognized prizes or awards for excellence in the field of endeavor.',
    evidenceExamples: [
      'National innovation awards, Forbes 30 Under 30, IEEE Best Paper Awards',
      'Major hackathon championships (e.g. ETHGlobal, TechCrunch Disrupt)',
      'Government scientific grants or national fellowships given on competitive merit'
    ],
    commonRfeReasons: [
      'USCIS rejects student-level awards, internal corporate "employee of the month", or awards where criteria were not public and competitive across the entire field.'
    ]
  },
  {
    id: 'memberships',
    number: 2,
    title: 'Membership in Associations Requiring Outstanding Achievements',
    cfrCitation: '8 CFR § 204.5(h)(3)(ii) / 8 CFR § 214.2(o)(3)(iii)(B)',
    description: 'Documentation of membership in associations in the field which require outstanding achievements of their members, as judged by recognized national or international experts.',
    evidenceExamples: [
      'IEEE Senior / Fellow membership, Sigma Xi full membership',
      'Invitation-only tech councils or founder networks requiring strict peer review',
      'National academies or specialized scholarly societies with selective admission'
    ],
    commonRfeReasons: [
      'Rejection if membership is granted merely by paying annual dues or holding a degree (e.g., standard ACM/IEEE regular student membership).'
    ]
  },
  {
    id: 'published_material',
    number: 3,
    title: 'Published Material About You in Major Media / Trade Publications',
    cfrCitation: '8 CFR § 204.5(h)(3)(iii) / 8 CFR § 214.2(o)(3)(iii)(C)',
    description: 'Published material about the alien in professional or major trade publications or other major media, relating to the alien\'s work in the field.',
    evidenceExamples: [
      'Features in TechCrunch, Wired, Forbes, Bloomberg, Reuters, or VentureBeat',
      'In-depth interviews or profiles in specialized scientific journals or industry magazines',
      'Articles citing your specific commercial product, algorithmic discovery, or research'
    ],
    commonRfeReasons: [
      'USCIS rejects press releases (PR Newswire), paid sponsored posts, brief routine company announcements, or articles that discuss the company without profiling you specifically.'
    ]
  },
  {
    id: 'judging',
    number: 4,
    title: 'Judging the Work of Others in the Same or Allied Field',
    cfrCitation: '8 CFR § 204.5(h)(3)(iv) / 8 CFR § 214.2(o)(3)(iii)(D)',
    description: 'Evidence of the alien\'s participation, either individually or on a panel, as a judge of the work of others in the same or an allied field.',
    evidenceExamples: [
      'Peer reviewer for prestigious journals (Nature, IEEE, ACM, Springer, Elsevier)',
      'Program Committee (PC) member or reviewer for conferences (NeurIPS, ICML, CVPR)',
      'Official judge for major venture pitch competitions or international hackathons'
    ],
    commonRfeReasons: [
      'Reviewing without proof of completed reviews (invitation emails alone are insufficient; requires completion certificates or editorial logs).'
    ]
  },
  {
    id: 'original_contributions',
    number: 5,
    title: 'Original Scientific, Scholarly, or Business Contributions of Major Significance',
    cfrCitation: '8 CFR § 204.5(h)(3)(v) / 8 CFR § 214.2(o)(3)(iii)(E)',
    description: 'Evidence of original scientific, scholarly, artistic, athletic, or business-related contributions of major significance in the field.',
    evidenceExamples: [
      'Patents licensed to third parties or integrated into commercial market-leading products',
      'Foundational algorithms or open-source software with massive adoption (e.g. 5,000+ GitHub stars, widely used ML libraries)',
      'Independent expert recommendation letters demonstrating field-wide paradigm shifts'
    ],
    commonRfeReasons: [
      'Failing to prove "major significance" beyond routine incremental work. Letters of recommendation must come from independent experts who have never worked with the applicant.'
    ]
  },
  {
    id: 'scholarly_articles',
    number: 6,
    title: 'Authorship of Scholarly Articles in Professional / Major Media',
    cfrCitation: '8 CFR § 204.5(h)(3)(vi) / 8 CFR § 214.2(o)(3)(iii)(F)',
    description: 'Evidence of the alien\'s authorship of scholarly articles in the field, in professional or major trade publications or other major media.',
    evidenceExamples: [
      'First-author or co-author papers in peer-reviewed journals (Impact factor > 3.0)',
      'Top-tier conference proceedings papers (NeurIPS, ACL, IEEE, ACM)',
      'Authoritative technical book chapters or whitepapers published by academic presses'
    ],
    commonRfeReasons: [
      'Low citation counts relative to field peers or publishing in predatory/unindexed journals without editorial oversight.'
    ]
  },
  {
    id: 'exhibitions',
    number: 7,
    title: 'Display of Work at Artistic Exhibitions or Major Showcases',
    cfrCitation: '8 CFR § 204.5(h)(3)(vii) / 8 CFR § 214.2(o)(3)(iii)(G)',
    description: 'Evidence of the display of the alien\'s work in the field at artistic exhibitions or showcases (applicable to designers, artists, and comparable tech demos).',
    evidenceExamples: [
      'Keynote technological demos at major global conferences (CES, WWDC, Google I/O)',
      'Design exhibitions, museum installations, or international UI/UX galleries',
      'Public architecture or physical design installations of national scope'
    ],
    commonRfeReasons: [
      'Standard corporate booth exhibitions where any vendor can pay for floor space do not qualify as artistic or curated showcases.'
    ]
  },
  {
    id: 'critical_role',
    number: 8,
    title: 'Leading or Critical Role for Organizations with Distinguished Reputation',
    cfrCitation: '8 CFR § 204.5(h)(3)(viii) / 8 CFR § 214.2(o)(3)(iii)(H)',
    description: 'Evidence that the alien has performed in a leading or critical role for organizations or establishments that have a distinguished reputation.',
    evidenceExamples: [
      'Founder, CEO, CTO, or VP of Engineering at venture-funded startups ($2M+ raised)',
      'Lead Principal Investigator or Chief Architect leading a core revenue-generating business unit at a Fortune 500 company',
      'Key contributor whose technical leadership was essential to enterprise customer acquisition or core product launch'
    ],
    commonRfeReasons: [
      'Providing a title without establishing the "distinguished reputation" of the entity or failing to prove how your specific individual contribution was "critical" to its overall success.'
    ]
  },
  {
    id: 'high_remuneration',
    number: 9,
    title: 'High Salary or Significantly High Remuneration Relative to Peers',
    cfrCitation: '8 CFR § 204.5(h)(3)(ix) / 8 CFR § 214.2(o)(3)(iii)(I)',
    description: 'Evidence that the alien has commanded a high salary or other significantly high remuneration for services, in relation to others in the field.',
    evidenceExamples: [
      'Base salary + guaranteed bonus exceeding 90th percentile of DOL OEWS Level 4 wage data',
      'Substantial equity grants, venture profit shares, or executive consulting fees documented by W-2 / 1099 or Form 1040 returns',
      'Official Foreign/Domestic Tax Returns demonstrating earnings in the top 5% of regional professionals'
    ],
    commonRfeReasons: [
      'Comparing compensation to median entry-level wages rather than to top senior peers in the exact geographic metropolitan area (MSA).'
    ]
  },
  {
    id: 'commercial_success',
    number: 10,
    title: 'Commercial Successes in the Performing Arts / Business Ventures',
    cfrCitation: '8 CFR § 204.5(h)(3)(x) / 8 CFR § 214.2(o)(3)(iii)(J)',
    description: 'Evidence of commercial successes in the performing arts, box office receipts, or comparable evidence of major commercial sales and revenue.',
    evidenceExamples: [
      'Box office receipts, album sales, or streaming records (for arts)',
      'B2B enterprise SaaS contract revenue exceeding $1M+ ARR directly driven by petitioner\'s proprietary software',
      'App Store / Google Play top trending apps with multi-million active downloads'
    ],
    commonRfeReasons: [
      'Failing to link commercial revenue directly to the petitioner\'s specific personal contribution.'
    ]
  }
];

export default function EB1AO1EvaluatorPage() {
  const [visaType, setVisaType] = useState<'eb1a' | 'o1a'>('eb1a');
  const [fieldDomain, setFieldDomain] = useState<'ai_ml' | 'biomed' | 'fintech' | 'enterprise_saas' | 'clean_energy' | 'academia' | 'arts_design'>('ai_ml');
  const [criteriaStatuses, setCriteriaStatuses] = useState<Record<string, 'strong' | 'moderate' | 'weak' | 'none'>>({
    awards: 'none',
    memberships: 'none',
    published_material: 'none',
    judging: 'strong',
    original_contributions: 'strong',
    scholarly_articles: 'strong',
    exhibitions: 'none',
    critical_role: 'moderate',
    high_remuneration: 'moderate',
    commercial_success: 'none'
  });

  const [citations, setCitations] = useState<number>(65);
  const [independentLetters, setIndependentLetters] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'wizard' | 'kazarian' | 'memo' | 'regulations'>('wizard');
  const [copiedMemo, setCopiedMemo] = useState<boolean>(false);

  const handleStatusChange = (id: string, status: 'strong' | 'moderate' | 'weak' | 'none') => {
    setCriteriaStatuses(prev => ({ ...prev, [id]: status }));
  };

  // Evaluation Metrics
  const strongCount = Object.values(criteriaStatuses).filter(s => s === 'strong').length;
  const moderateCount = Object.values(criteriaStatuses).filter(s => s === 'moderate').length;
  const weakCount = Object.values(criteriaStatuses).filter(s => s === 'weak').length;
  const totalClaimedProngs = strongCount + moderateCount;

  // Step 1: Kazarian Regulatory Threshold (Must have at least 3)
  const meetsStep1Threshold = totalClaimedProngs >= 3;

  // Step 2: Final Merits Determination Score (0 to 100)
  let calculatedScore = (strongCount * 22) + (moderateCount * 12) + (weakCount * 4);
  if (citations >= 150) calculatedScore += 12;
  else if (citations >= 50) calculatedScore += 8;
  else if (citations >= 15) calculatedScore += 4;

  if (independentLetters >= 5) calculatedScore += 10;
  else if (independentLetters >= 3) calculatedScore += 6;

  const finalScore = Math.min(98, Math.max(15, calculatedScore));

  let tier: 'exceptional' | 'strong' | 'borderline' | 'high_risk';
  let tierBadge: string;
  let tierColor: string;
  let tierBg: string;

  if (meetsStep1Threshold && finalScore >= 80 && strongCount >= 3) {
    tier = 'exceptional';
    tierBadge = 'Exceptional Profile — High Approval Probability (Top 5% of Field)';
    tierColor = 'text-emerald-400 border-emerald-500/30';
    tierBg = 'from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30';
  } else if (meetsStep1Threshold && finalScore >= 60) {
    tier = 'strong';
    tierBadge = 'Competitive Profile — Moderate Approval Probability (Needs Kazarian Polish)';
    tierColor = 'text-blue-400 border-blue-500/30';
    tierBg = 'from-blue-950/40 via-slate-900 to-slate-900 border-blue-500/30';
  } else if (meetsStep1Threshold) {
    tier = 'borderline';
    tierBadge = 'Borderline Case — High Risk of USCIS Request for Evidence (RFE)';
    tierColor = 'text-amber-400 border-amber-500/30';
    tierBg = 'from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/30';
  } else {
    tier = 'high_risk';
    tierBadge = 'Deficient Case — Fails 8 CFR 3-Prong Minimum Threshold';
    tierColor = 'text-rose-400 border-rose-500/30';
    tierBg = 'from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/30';
  }

  // Generate Action Memo
  const generateFilingMemo = () => {
    const claimedList = INITIAL_CRITERIA.filter(c => criteriaStatuses[c.id] === 'strong' || criteriaStatuses[c.id] === 'moderate')
      .map(c => `- Criterion #${c.number}: ${c.title} [Status: ${criteriaStatuses[c.id].toUpperCase()}]\n  Citation: ${c.cfrCitation}`)
      .join('\n');

    return `================================================================================
STATUTORY FILING ACTION MEMORANDUM
FORM I-140 (EB-1A) / FORM I-129 (O-1A) EXTRAORDINARY ABILITY PETITION
================================================================================
Target Visa Classification: ${visaType === 'eb1a' ? 'EB-1A Alien of Extraordinary Ability (8 CFR § 204.5(h))' : 'O-1A Nonimmigrant with Extraordinary Ability (8 CFR § 214.2(o))'}
Field of Expertise: ${fieldDomain.toUpperCase().replace('_', ' ')}
Diagnostic Evaluation Score: ${finalScore}/100 [${tierBadge}]
Evaluation Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

I. STATUTORY THRESHOLD ASSESSMENT (KAZARIAN STEP 1)
--------------------------------------------------------------------------------
Regulatory Requirement: Petitioner must satisfy at least 3 of 10 criteria under 8 CFR § 204.5(h)(3).
Prongs Satisfied: ${totalClaimedProngs} of 10 (Strong: ${strongCount}, Moderate: ${moderateCount})
Threshold Status: ${meetsStep1Threshold ? 'SATISFIED (Passed Step 1)' : 'DEFICIENT (Requires at least 3 qualifying criteria)'}

CLAIMED CRITERIA BREAKDOWN:
${claimedList || 'No criteria currently meet the strong/moderate threshold.'}

II. FINAL MERITS DETERMINATION AUDIT (KAZARIAN STEP 2)
--------------------------------------------------------------------------------
Under the Kazarian framework (Kazarian v. USCIS, 596 F.3d 1115 (9th Cir. 2010)), meeting 3 prongs
alone does not guarantee approval. USCIS evaluates all evidence in totality to determine sustained
national or international acclaim:

1. Scholarly Citations: ${citations} total Google Scholar citations recorded.
2. Independent Testimonial Letters: ${independentLetters} letters from disinterested global experts.
3. RFE Vulnerability Index: ${tier === 'exceptional' ? 'LOW' : tier === 'strong' ? 'MODERATE' : 'HIGH (Likely Notice of Intent to Deny/RFE)'}.

III. IMMEDIATE EVIDENCE GATHERING PROTOCOL
--------------------------------------------------------------------------------
1. Secure at least 3-5 independent expert letters of recommendation from leaders who have NOT co-authored or mentored the petitioner.
2. For Critical Role (8 CFR § 204.5(h)(3)(viii)): Provide organizational charts, media proof of company prestige, and revenue impact metrics.
3. For Judging (8 CFR § 204.5(h)(3)(iv)): Compile complete editorial acknowledgement certificates and Web of Science / Publons reviewer transcripts.
4. For High Remuneration (8 CFR § 204.5(h)(3)(ix)): Export official Foreign Labor Certification Data Center (FLCDC) Level 4 OEWS wage tables for the designated MSA.

Generated via US Career Solutions Statutory Intelligence Engine (www.uscareersolutions.online)
================================================================================`;
  };

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(generateFilingMemo());
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-semibold">EB-1A & O-1A Extraordinary Ability Scorer</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            8 CFR § 204.5(h)(3) & § 214.2(o) Regulatory Diagnostic
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
            EB-1A & O-1A <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Extraordinary Ability Scorer</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Evaluate your profile against the 10 statutory criteria under federal immigration regulations. Audit your Kazarian two-step merits risk, identify RFE vulnerabilities, and generate a 1-click legal action filing memo.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`pb-4 px-3 sm:px-6 font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'wizard'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            10-Prong Diagnostic Wizard
          </button>
          <button
            onClick={() => setActiveTab('kazarian')}
            className={`pb-4 px-3 sm:px-6 font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'kazarian'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            Kazarian 2-Step Framework
          </button>
          <button
            onClick={() => setActiveTab('memo')}
            className={`pb-4 px-3 sm:px-6 font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'memo'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Filing Action Memo
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`pb-4 px-3 sm:px-6 font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'regulations'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Statutory Code & RFEs
          </button>
        </div>

        {/* TAB 1: DIAGNOSTIC WIZARD */}
        {activeTab === 'wizard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Profile Config Bar */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Target Visa Classification
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setVisaType('eb1a')}
                      className={`p-3 rounded-2xl border text-sm font-bold transition-all ${
                        visaType === 'eb1a'
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      EB-1A (Green Card)
                    </button>
                    <button
                      onClick={() => setVisaType('o1a')}
                      className={`p-3 rounded-2xl border text-sm font-bold transition-all ${
                        visaType === 'o1a'
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      O-1A (Work Visa)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Field / Critical Domain
                  </label>
                  <select
                    value={fieldDomain}
                    onChange={(e) => setFieldDomain(e.target.value as any)}
                    aria-label="Field or Critical Domain"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ai_ml">Artificial Intelligence & Machine Learning</option>
                    <option value="biomed">Biomedical Engineering & Health Sciences</option>
                    <option value="fintech">Fintech & Quantitative Trading</option>
                    <option value="enterprise_saas">Enterprise Cloud & Cybersecurity</option>
                    <option value="clean_energy">Clean Energy & Semiconductors</option>
                    <option value="academia">Academic & Scientific Research</option>
                    <option value="arts_design">Creative Tech & Industrial Design</option>
                  </select>
                </div>
              </div>

              {/* Auxiliary Impact Modifiers */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300">Total Scholarly Citations</label>
                    <span className="text-xs font-mono font-bold text-amber-400">{citations}+ Citations</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={citations}
                    onChange={(e) => setCitations(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">High citations corroborate Criterion #5 (Original Contribution).</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300">Independent Testimonial Letters</label>
                    <span className="text-xs font-mono font-bold text-amber-400">{independentLetters} Letters</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={independentLetters}
                    onChange={(e) => setIndependentLetters(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Disinterested experts who have never worked with you.</p>
                </div>
              </div>

              {/* 10 Regulatory Criteria Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-400" />
                    The 10 Regulatory Evidentiary Criteria (8 CFR § 204.5(h)(3))
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    Claimed: <strong className="text-amber-400">{totalClaimedProngs}/10</strong> (Min 3 required)
                  </span>
                </div>

                {INITIAL_CRITERIA.map((criterion) => {
                  const currentStatus = criteriaStatuses[criterion.id];
                  return (
                    <div 
                      key={criterion.id}
                      className={`bg-slate-900/60 border rounded-3xl p-6 transition-all ${
                        currentStatus === 'strong' 
                          ? 'border-emerald-500/40 bg-slate-900/90' 
                          : currentStatus === 'moderate' 
                            ? 'border-blue-500/40 bg-slate-900/80' 
                            : currentStatus === 'weak'
                              ? 'border-amber-500/30'
                              : 'border-slate-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                              Criterion #{criterion.number}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">
                              {criterion.cfrCitation}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white">
                            {criterion.title}
                          </h3>
                        </div>

                        {/* Status Selectors */}
                        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
                          <button
                            onClick={() => handleStatusChange(criterion.id, 'strong')}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                              currentStatus === 'strong' 
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Strong
                          </button>
                          <button
                            onClick={() => handleStatusChange(criterion.id, 'moderate')}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                              currentStatus === 'moderate' 
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Moderate
                          </button>
                          <button
                            onClick={() => handleStatusChange(criterion.id, 'weak')}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                              currentStatus === 'weak' 
                                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Weak
                          </button>
                          <button
                            onClick={() => handleStatusChange(criterion.id, 'none')}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                              currentStatus === 'none' 
                                ? 'bg-slate-800 text-slate-300' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            None
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {criterion.description}
                      </p>

                      <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-2">
                        <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Qualifying Evidence Examples:
                        </div>
                        <ul className="text-xs text-slate-400 space-y-1 list-disc pl-5">
                          {criterion.evidenceExamples.map((ex, idx) => (
                            <li key={idx}>{ex}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Live Diagnostic Scorecard */}
            <div className="lg:col-span-4 space-y-6">
              <div className={`sticky top-8 bg-gradient-to-b ${tierBg} border rounded-3xl p-6 shadow-2xl space-y-6`}>
                
                {/* Score Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Statutory Readiness Score
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tierColor}`}>
                      {meetsStep1Threshold ? 'Step 1 Passed' : 'Deficient'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{finalScore}</span>
                    <span className="text-slate-500 font-bold text-xl">/ 100</span>
                  </div>
                </div>

                {/* Status Tier Badge */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs font-bold text-slate-300 mb-1">
                    Adjudication Assessment
                  </div>
                  <div className={`text-sm font-bold ${tierColor.split(' ')[0]}`}>
                    {tierBadge}
                  </div>
                </div>

                {/* Kazarian Step Breakdown */}
                <div className="space-y-3 border-t border-slate-800/80 pt-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Step 1 Threshold (3 Prongs):</span>
                    <span className="font-bold text-white">
                      {totalClaimedProngs >= 3 ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Met ({totalClaimedProngs}/3)
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Short ({totalClaimedProngs}/3)
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Strong Prongs (Definite):</span>
                    <span className="font-bold text-emerald-400">{strongCount}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Moderate Prongs (Needs Evidence):</span>
                    <span className="font-bold text-blue-400">{moderateCount}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Independent Expert Letters:</span>
                    <span className="font-bold text-amber-400">{independentLetters} Letters</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Citation Multiplier:</span>
                    <span className="font-bold text-amber-400">{citations}+</span>
                  </div>
                </div>

                {/* Quick Action Button */}
                <button
                  onClick={() => setActiveTab('memo')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Legal Action Memo</span>
                </button>

                {/* E-E-A-T Disclaimer */}
                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  Adjudicated under official USCIS Policy Manual Chapter 6 (Extraordinary Ability) & 9th Cir. Kazarian precedents.
                </p>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: KAZARIAN 2-STEP FRAMEWORK */}
        {activeTab === 'kazarian' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    The Kazarian Two-Part Adjudication Standard
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Kazarian v. USCIS, 596 F.3d 1115 (9th Cir. 2010) & USCIS Policy Manual Vol 6, Part F
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  In 2010, the Ninth Circuit established the mandatory two-step analysis that every USCIS adjudicating officer must follow when evaluating <strong>Form I-140 (EB-1A)</strong> and <strong>Form I-129 (O-1A)</strong> extraordinary ability petitions:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                      Step 1: Regulatory Counting
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Objective Evidentiary Threshold
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      The officer determines by a preponderance of the evidence whether the petition includes documentation satisfying <strong>at least 3 of the 10 regulatory criteria</strong> under 8 CFR § 204.5(h)(3). At this stage, the officer cannot impose extra-statutory requirements.
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                      Step 2: Final Merits Determination
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Totality of the Circumstances
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Even if 3 criteria are technically met, the officer conducts a qualitative review of all evidence to decide if you have sustained <strong>national or international acclaim</strong> and rank among <strong>the small percentage at the very top</strong> of your field.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 space-y-3">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    How to Avoid the Fatal "Step 2 Denial"
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Most denials and RFEs happen at Step 2 when petitioners present bare-minimum evidence (e.g., 3 minor peer reviews, 1 small paper, and a standard job title). To win at Step 2:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5">
                    <li>Provide 4–6 independent recommendation letters explaining the tangible commercial or scientific impact of your work in plain English.</li>
                    <li>Highlight citations from unaffiliated global researchers who applied your code, algorithm, or methodology in their own high-impact projects.</li>
                    <li>Prove commercial traction using enterprise customer logos, contract values, and venture funding rounds.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FILING ACTION MEMO */}
        {activeTab === 'memo' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-6 h-6 text-amber-400" />
                    Statutory Filing Action Memorandum
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Exportable petition strategy document formatted for immigration attorneys and USCIS Form I-140 / I-129 packets.
                  </p>
                </div>
                <button
                  onClick={handleCopyMemo}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                >
                  {copiedMemo ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMemo ? 'Copied to Clipboard!' : 'Copy Action Memo'}</span>
                </button>
              </div>

              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {generateFilingMemo()}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATUTORY CODE & RFES */}
        {activeTab === 'regulations' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-400" />
                Statutory Code & Common USCIS RFE Pitfalls
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <h3 className="text-base font-bold text-amber-400">
                    INA § 203(b)(1)(A) — Extraordinary Ability Definition
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    "Visas shall first be made available... to qualified immigrants who have extraordinary ability in the sciences, arts, education, business, or athletics which has been demonstrated by sustained national or international acclaim and whose achievements have been recognized in the field through extensive documentation."
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <h3 className="text-base font-bold text-blue-400">
                    8 CFR § 214.2(o)(3)(iii) — O-1A Nonimmigrant Standard
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Unlike EB-1A (which requires green card level sustained acclaim), O-1A classification requires proving that the beneficiary has "a level of expertise indicating that the person is one of the small percentage who have arisen to the very top of the field of endeavor." Venture-backed founders and senior AI engineers frequently qualify for O-1A as a fast-track springboard before filing EB-1A.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
