export type VisaSponsorshipType = 
  | 'H-1B Sponsor' 
  | 'Cap-Exempt H-1B' 
  | 'OPT/CPT Friendly' 
  | 'US Remote (Contractor/W-8BEN)'
  | 'Requires US Auth';

export type JobCategory = 
  | 'Software & Tech' 
  | 'Data & AI' 
  | 'Healthcare & Nursing' 
  | 'Business & Finance' 
  | 'Engineering' 
  | 'Marketing & Sales' 
  | 'Operations & Other';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  city?: string;
  state?: string;
  isRemote: boolean;
  category: JobCategory;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  salaryPeriod?: 'year' | 'hour';
  visaSponsorship: VisaSponsorshipType;
  sponsorshipConfidence: 'high' | 'medium' | 'unverified';
  description: string;
  requirements: string[];
  skills: string[];
  sourceUrl: string;
  atsType?: 'greenhouse' | 'lever' | 'ashby' | 'workday' | 'usajobs' | 'direct';
  postedDate: string; // ISO string
  isFeatured?: boolean;
}

export interface CompanySponsorshipRecord {
  companyName: string;
  domain?: string;
  totalH1BFiled: number;
  approvalRate: number; // percentage, e.g. 98.4
  topOccupations: string[];
  capExempt: boolean;
  notes?: string;
}

export interface ATSAnalysisResult {
  matchScore: number; // 0 - 100
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingScore: number;
  strengthPoints: string[];
  weaknessPoints: string[];
  rewrittenBullets: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export interface OutreachMessageResult {
  subject: string;
  linkedInConnectionNote: string;
  coldEmailBody: string;
  followUpMessage: string;
}

export type ApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';

export interface TrackedApplication {
  id: string;
  jobId?: string;
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate?: string;
  salary?: string;
  notes?: string;
  contactPerson?: string;
  updatedAt: string;
}
