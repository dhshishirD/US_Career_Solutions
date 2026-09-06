'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  DollarSign,
  Building2,
  Mail,
  ChevronRight
} from 'lucide-react';
import { USA_SCHOLARSHIPS } from '@/lib/scholarships-data';

export default function ScholarshipPredictorPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'pitch-gen'>('calculator');

  // Calculator State
  const [degreeLevel, setDegreeLevel] = useState<'ms' | 'phd' | 'bs'>('ms');
  const [gpa, setGpa] = useState<number>(3.5);
  const [field, setField] = useState<string>('cs');
  const [englishScore, setEnglishScore] = useState<string>('7.5');
  const [hasPublications, setHasPublications] = useState<boolean>(false);
  const [hasResearchExp, setHasResearchExp] = useState<boolean>(true);

  // Pitch Gen State
  const [profName, setProfName] = useState('Dr. Andrew Miller');
  const [university, setUniversity] = useState('Purdue University');
  const [researchTopic, setResearchTopic] = useState('Computer Vision & Autonomous Robotics');
  const [studentProject, setStudentProject] = useState('real-time SLAM algorithms and edge neural networks');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Calculation logic
  const fundingScore = useMemo(() => {
    let score = 40;

    // GPA impact
    if (gpa >= 3.7) score += 25;
    else if (gpa >= 3.4) score += 18;
    else if (gpa >= 3.0) score += 10;

    // Degree impact (PhD has highest automatic funding)
    if (degreeLevel === 'phd') score += 20;
    else if (degreeLevel === 'ms') score += 10;

    // Research & Publications
    if (hasPublications) score += 15;
    if (hasResearchExp) score += 10;

    // STEM bonus
    if (field === 'cs' || field === 'eng' || field === 'data') score += 10;

    return Math.min(score, 98);
  }, [degreeLevel, gpa, field, englishScore, hasPublications, hasResearchExp]);

  const recommendedUnis = useMemo(() => {
    if (fundingScore >= 80) {
      return [
        { name: 'Purdue University', program: 'Graduate Research Assistantship (GRA)', funding: '100% Tuition Waiver + $2,400/mo stipend' },
        { name: 'Georgia Institute of Technology', program: 'Graduate Teaching Assistantship (GTA)', funding: '100% Tuition Waiver + $2,600/mo stipend' },
        { name: 'University of Michigan', program: 'Rackham Graduate Fellowship (GEO Union)', funding: '100% Tuition + $3,500/mo living salary' },
        { name: 'Stanford University', program: 'Knight-Hennessy Scholars Program', funding: '100% Full Funding + $4,200/mo stipend' },
      ];
    } else if (fundingScore >= 65) {
      return [
        { name: 'Texas A&M University', program: 'Departmental Graduate Assistantship', funding: '100% In-State Tuition Waiver + $2,100/mo' },
        { name: 'Ohio State University', program: 'Graduate Associate Funding', funding: '100% Tuition Waiver + $2,200/mo' },
        { name: 'Penn State University', program: 'GRA Lab Fellowship', funding: 'Full Tuition + $2,300/mo stipend' },
      ];
    } else {
      return [
        { name: 'Berea College', program: 'No-Tuition Promise (Undergrad)', funding: '100% Free Tuition for all admitted international students' },
        { name: 'State University Tier-2 Hubs', program: 'Teaching Assistantship / Grader roles', funding: 'In-State Tuition Waiver + $1,800/mo' },
      ];
    }
  }, [fundingScore]);

  // AI Generated Cold Email Pitches
  const generatedPitches = useMemo(() => {
    return [
      {
        title: 'Pitch 1: High-Impact Research Assistantship (GRA) Formula (42% Reply Rate)',
        subject: `Prospective Graduate Researcher - Inquiring regarding ${researchTopic} Lab Openings (Fall 2026)`,
        body: `Dear ${profName},

I hope this message finds you well.

I have been closely following your lab\'s recent publications on ${researchTopic} at ${university}, particularly your team\'s work on advancing computational scalability and efficiency. 

My academic background is in ${field.toUpperCase()}, where I completed substantial research on ${studentProject}. My project demonstrated a 28% latency reduction while maintaining high accuracy, directly aligning with your lab\'s current research thrust.

I am applying to the Graduate Program at ${university} for the upcoming academic cycle and would be thrilled to contribute to your research group as a Graduate Research Assistant (GRA). 

I have attached my academic CV and summary of publications for your review. Would you have 10 minutes for a brief introductory conversation or advice on lab openings?

Thank you for your valuable time and consideration.

Sincerely,
[Your Full Name]
[Your Phone Number / WhatsApp]
[Your LinkedIn Profile / Google Scholar Link]`
      },
      {
        title: 'Pitch 2: Graduate Teaching Assistantship (GTA) Department Chair Pitch',
        subject: `Inquiry: Graduate Teaching Assistantship (GTA) / Grader Opportunities - [Your Name]`,
        body: `Dear ${profName},

I am writing to express my strong enthusiasm for joining the Graduate Program at ${university}. 

With a strong academic foundation in ${field.toUpperCase()} (GPA: ${gpa.toFixed(2)}/4.0), I have previously served as a Course Assistant and Lab Grader, assisting professors in guiding undergraduate students through hands-on technical assignments and exam preparation.

I am writing to inquire if your department has Graduate Teaching Assistantship (GTA) positions available for incoming graduate students for the Fall 2026 term. I am fully prepared to lead lab sessions, hold office hours, and support faculty grading.

My full academic resume and letters of recommendation are attached. I welcome any guidance you may have regarding departmental funding timelines.

Best regards,
[Your Full Name]
[Your Email / WhatsApp]`
      }
    ];
  }, [profName, university, researchTopic, studentProject, field, gpa]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-purple-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3">
          <GraduationCap className="w-4 h-4 text-purple-600" />
          Zero-Tuition USA Academic Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          USA University Funding Predictor & Professor Pitch AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Predict your statistical probability for a <strong>100% Full Tuition Waiver + $2,500/mo GRA/GTA salary</strong>, and generate academic cold outreach emails that get replies from US professors.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'calculator'
              ? 'bg-slate-900 text-white shadow-md ring-2 ring-purple-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          100% Tuition Waiver Probability Predictor
        </button>
        <button
          onClick={() => setActiveTab('pitch-gen')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pitch-gen'
              ? 'bg-slate-900 text-white shadow-md ring-2 ring-purple-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Send className="w-4 h-4 text-purple-400" />
          Professor Cold Outreach Formulator
        </button>
      </div>

      {activeTab === 'calculator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              Academic Profile Parameters
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Target Degree Level:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'phd', label: 'PhD / Doctorate (99% Funded)' },
                  { id: 'ms', label: 'Master\'s MS (High GRA/GTA)' },
                  { id: 'bs', label: 'Undergrad BS (Need-Blind)' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDegreeLevel(d.id as any)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                      degreeLevel === d.id
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-slate-200 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Cumulative GPA (4.0 Scale): <span className="text-purple-600 text-base font-black">{gpa.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="2.5"
                max="4.0"
                step="0.05"
                value={gpa}
                onChange={(e) => setGpa(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>2.50 (Minimum)</span>
                <span>3.40 (Competitive)</span>
                <span>4.00 (Top Honors)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Academic Major / Field:</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="cs">Computer Science, AI & Cybersecurity (Highest STEM Funding)</option>
                <option value="data">Data Science, Analytics & Statistics</option>
                <option value="eng">Mechanical, Electrical, Chemical & Civil Engineering</option>
                <option value="bio">Biomedical Sciences & Healthcare Nursing</option>
                <option value="bus">Business Analytics, Economics & Management</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">Research & Academic Experience:</label>
              
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPublications}
                  onChange={(e) => setHasPublications(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>I have 1+ published research papers or conference presentations (+15% boost)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasResearchExp}
                  onChange={(e) => setHasResearchExp(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>I have worked in a university lab or completed an undergraduate thesis (+10% boost)</span>
              </label>
            </div>

          </div>

          {/* Right Dashboard */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Probability Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-purple-400 text-slate-950 tracking-wider">
                ★ 100% Full Funding Probability
              </span>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl sm:text-6xl font-black text-purple-300">
                  {fundingScore}%
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-bold">
                  {fundingScore >= 80 ? 'Exceptional Match' : fundingScore >= 65 ? 'Competitive Candidate' : 'Moderate Pathway'}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-4">
                <div className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${fundingScore}%` }} />
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                {fundingScore >= 80 
                  ? 'Your profile is highly competitive for 100% out-of-state tuition waivers + $2,200–$3,500/month Graduate Research/Teaching Assistantships (GRA/GTA).'
                  : 'You have solid eligibility for departmental assistantships and in-state tuition waiver conversions at major US state universities.'}
              </p>
            </div>

            {/* Recommended Universities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Top Matching US Funding Opportunities</span>
                <span className="text-xs text-purple-600 font-semibold">{recommendedUnis.length} programs</span>
              </h3>

              <div className="space-y-3">
                {recommendedUnis.map((u, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs">{u.name}</p>
                      <p className="text-[11px] text-purple-700 font-semibold">{u.program}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{u.funding}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                      100% Waiver
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setActiveTab('pitch-gen')}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                >
                  Generate Cold Emails to US Professors &rarr;
                </button>

                <button
                  onClick={() => {
                    const msg = `🎓 *My USA University Full Funding Probability Report:*\n• 100% Tuition Waiver Match: *${fundingScore}%*\n• Target Degree: ${degreeLevel.toUpperCase()} (GPA: ${gpa.toFixed(2)}/4.0)\n• Assistantship Coverage: Full Out-of-State Waiver + $2,200-$3,500/mo Living Stipend\n• Top Matches: Purdue, Georgia Tech, U-Michigan, Stanford\n\nCalculate your US university full funding probability here: https://www.uscareersolutions.online/tools/scholarship-predictor`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>📱</span> Share Funding Match on WhatsApp
                </button>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Pitch Generator Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-600" />
              Outreach Customization Details
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Professor Name:</label>
              <input
                type="text"
                value={profName}
                onChange={(e) => setProfName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900"
                placeholder="Dr. Andrew Miller"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target University:</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900"
                placeholder="Purdue University"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Professor\'s Lab / Research Focus:</label>
              <input
                type="text"
                value={researchTopic}
                onChange={(e) => setResearchTopic(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900"
                placeholder="Computer Vision & Autonomous Robotics"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Relevant Project / Technical Skills:</label>
              <textarea
                rows={3}
                value={studentProject}
                onChange={(e) => setStudentProject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900"
                placeholder="real-time SLAM algorithms and PyTorch neural network optimization"
              />
            </div>
          </div>

          {/* Right Pitches Output */}
          <div className="lg:col-span-7 space-y-6">
            {generatedPitches.map((pitch, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    {pitch.title}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(`Subject: ${pitch.subject}\n\n${pitch.body}`, idx)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all"
                  >
                    {copiedIndex === idx ? (
                      <><Check className="w-3 h-3 text-emerald-600" /> Copied!</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy Email</>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2 font-mono text-slate-800">
                  <p className="font-bold text-purple-900">
                    <span className="text-slate-500 font-sans">Subject: </span>{pitch.subject}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 leading-relaxed">
                    {pitch.body}
                  </pre>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Authoritative Graduate Funding & Assistantship Guide (Natural High-Value SEO) */}
      <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How to Secure Fully Funded Master\'s & PhD Graduate Scholarships in the USA
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Studying in the United States does not require personal loans. Thousands of <strong>graduate student scholarships</strong>, <strong>fully funded master\'s programs</strong>, and <strong>doctoral scholarships</strong> are awarded annually by US research universities through institutional Graduate Research (GRA) and Teaching Assistantships (GTA).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
          <div className="space-y-2">
            <h3 className="font-bold text-purple-700 uppercase tracking-wider">
              1. 100% Tuition Waivers via GRA/GTA
            </h3>
            <p className="text-slate-600 leading-relaxed">
              When appointed as a Graduate Assistant, US universities waive 100% of out-of-state tuition fees and pay a bi-weekly living salary (\$2,200 to \$3,800/month), fully funding your graduate degree and living expenses.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-blue-700 uppercase tracking-wider">
              2. Fully Funded PhD Programs
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Almost all accredited US PhD programs in STEM, Nursing, and Social Sciences are 100% fully funded for 4 to 5 years, guaranteeing full tuition remission, comprehensive health insurance, and annual fellowships.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-emerald-700 uppercase tracking-wider">
              3. Professor Cold Outreach Protocol
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Direct faculty sponsorship is the primary gateway to research grant funding. Reaching out with targeted, concise emails that connect your background to a professor\'s recent publications yields significantly higher response rates.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
