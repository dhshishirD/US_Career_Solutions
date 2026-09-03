export interface CandidatePitch {
  id: string;
  anonymousHandle: string; // e.g., "Talent-CS-402"
  headline: string;
  category: string;
  skills: string[];
  experienceYears: string;
  country: string;
  desiredRoleType: 'Global Remote (W-8BEN)' | 'US Visa Sponsor (H-1B/EB-3)' | 'Either';
  hourlyRateUSD?: string;
  pitchBio: string;
  upvotes: number;
  createdAt: string;
  verifiedStatus: 'Verified Candidate' | 'Community Profile';
}

export const INITIAL_TALENT: CandidatePitch[] = [
  {
    id: 'pitch-001',
    anonymousHandle: 'Talent-Support-88',
    headline: 'Senior Customer Happiness & Zendesk Specialist',
    category: 'Customer Support & Helpdesk',
    skills: ['Customer Support', 'Zendesk', 'Intercom', 'Live Chat', 'Written English', 'Conflict Resolution'],
    experienceYears: '4+ Years',
    country: 'International (Global Remote)',
    desiredRoleType: 'Global Remote (W-8BEN)',
    hourlyRateUSD: '$18 - $25 / hr',
    pitchBio: 'Experienced customer advocate with 98% CSAT rating across 25,000+ support tickets. Skilled in asynchronous remote troubleshooting, handling angry customers with calm empathy, and setting up helpdesk macros.',
    upvotes: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    verifiedStatus: 'Verified Candidate'
  },
  {
    id: 'pitch-002',
    anonymousHandle: 'Talent-AI-301',
    headline: 'LLM AI Data Annotator & Prompt Quality Reviewer',
    category: 'Data, AI Training & Annotation',
    skills: ['RLHF', 'Data Annotation', 'Python Basics', 'English Grammar', 'Fact Checking', 'AI Evaluation'],
    experienceYears: '2+ Years',
    country: 'International (Global Remote)',
    desiredRoleType: 'Global Remote (W-8BEN)',
    hourlyRateUSD: '$15 - $22 / hr',
    pitchBio: 'Trained and graded over 40,000 conversational AI model responses for factual accuracy, safety, and reasoning logic. High attention to detail with background in analytical writing and rapid turnaround.',
    upvotes: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    verifiedStatus: 'Verified Candidate'
  },
  {
    id: 'pitch-003',
    anonymousHandle: 'Talent-Health-109',
    headline: 'Registered Nurse (NCLEX-RN Passed) Seeking US EB-3 Direct Sponsorship',
    category: 'Healthcare & Nursing',
    skills: ['NCLEX-RN', 'ICU Care', 'Patient Assessment', 'Emergency Nursing', 'IELTS 7.5', 'VisaScreen Ready'],
    experienceYears: '5 Years Hospital Exp',
    country: 'International (Ready for Relocation)',
    desiredRoleType: 'US Visa Sponsor (H-1B/EB-3)',
    pitchBio: 'Passionate acute care nurse with verified NCLEX-RN passing credentials and VisaScreen certification. 5 years of bedside ICU experience handling high-acuity patients. Seeking direct hospital Schedule A Green Card sponsorship.',
    upvotes: 38,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    verifiedStatus: 'Verified Candidate'
  },
  {
    id: 'pitch-004',
    anonymousHandle: 'Talent-VA-512',
    headline: 'Executive Virtual Assistant & Operations Coordinator',
    category: 'Virtual Assistant & Admin',
    skills: ['Google Workspace', 'Calendar Scheduling', 'Notion', 'Email Management', 'Invoicing', 'Slack'],
    experienceYears: '3+ Years',
    country: 'International (Global Remote)',
    desiredRoleType: 'Global Remote (W-8BEN)',
    hourlyRateUSD: '$12 - $18 / hr',
    pitchBio: 'Organized executive assistant supporting US founders and digital agencies. Expert in email triage, travel booking, calendar management, and CRM maintenance across time zones.',
    upvotes: 15,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    verifiedStatus: 'Verified Candidate'
  },
  {
    id: 'pitch-005',
    anonymousHandle: 'Talent-Tech-742',
    headline: 'Junior Full Stack Developer (Next.js & TypeScript)',
    category: 'Software & Tech',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST APIs', 'Git'],
    experienceYears: '2 Years',
    country: 'International (Global Remote)',
    desiredRoleType: 'Either',
    hourlyRateUSD: '$20 - $35 / hr',
    pitchBio: 'Self-driven web developer with solid experience building performant Next.js applications and responsive UIs. Strong English, comfortable collaborating asynchronously on GitHub and Linear.',
    upvotes: 27,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    verifiedStatus: 'Verified Candidate'
  }
];

export function getTalentList(): CandidatePitch[] {
  return INITIAL_TALENT;
}
