import { JobPosting } from './types';

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-entry-001',
    title: 'Customer Happiness Engineer (Global Remote - No Degree Required)',
    company: 'Automattic (WordPress.com)',
    location: 'Remote (Worldwide - Work from your country)',
    city: 'San Francisco',
    state: 'CA',
    isRemote: true,
    category: 'Customer Support & Helpdesk',
    experienceLevel: 'Entry Level / Junior',
    salaryMin: 45000,
    salaryMax: 65000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'US Remote (Contractor/W-8BEN)',
    sponsorshipConfidence: 'high',
    description: 'Automattic is looking for compassionate, tech-curious individuals to support millions of WordPress users worldwide. You will solve user issues via live chat and email, troubleshoot website setups, and learn web technologies. 100% distributed company hiring in 90+ countries. Paid in USD via international contractor agreement (W-8BEN).',
    requirements: [
      'Strong written English skills and patient, empathetic communication',
      'Curiosity about the internet, websites, and basic WordPress/HTML',
      'Ability to learn quickly and work asynchronously with a global team',
      'No formal computer science degree required'
    ],
    skills: ['Customer Support', 'WordPress', 'HTML/CSS Basics', 'Written English', 'Troubleshooting'],
    sourceUrl: 'https://automattic.com/work-with-us',
    atsType: 'greenhouse',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-entry-002',
    title: 'AI Data Annotation & Quality Reviewer (Entry Level - Freelance/Contract)',
    company: 'Scale AI / Outlier',
    location: 'Remote (Anywhere - Global Remote Contractor)',
    city: 'San Francisco',
    state: 'CA',
    isRemote: true,
    category: 'Data, AI Training & Annotation',
    experienceLevel: 'Entry Level / Junior',
    salaryMin: 32000,
    salaryMax: 52000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'US Remote (Contractor/W-8BEN)',
    sponsorshipConfidence: 'high',
    description: 'Help train cutting-edge Large Language Models (LLMs) used across the US tech industry. Review and grade AI-generated responses for factual accuracy, logic, grammar, and code quality. Flexible hours; you can work from your home country and receive weekly direct bank or PayPal payouts.',
    requirements: [
      'Excellent analytical thinking and fluent English reading/writing',
      'Attention to detail in following complex guidelines',
      'Reliable high-speed internet and personal computer',
      'Open to graduates of any field (Literature, Sciences, Business, or Tech)'
    ],
    skills: ['Data Annotation', 'English Fluency', 'Quality Assurance', 'Analytical Thinking', 'AI Training'],
    sourceUrl: 'https://scale.com/careers',
    atsType: 'lever',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-entry-003',
    title: 'Junior Laboratory & Clinical Research Assistant',
    company: 'Johns Hopkins University & Medicine',
    location: 'Baltimore, MD (Cap-Exempt Visa Sponsor)',
    city: 'Baltimore',
    state: 'MD',
    isRemote: false,
    category: 'Healthcare & Nursing',
    experienceLevel: 'Entry Level / Junior',
    salaryMin: 48000,
    salaryMax: 64000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'Cap-Exempt H-1B',
    sponsorshipConfidence: 'high',
    description: 'Entry-level research assistant position supporting clinical trials and wet lab data collection. Johns Hopkins is an academic non-profit research institution, making this position eligible for Cap-Exempt H-1B sponsorship with no lottery restriction. Perfect for international graduates in Biology, Chemistry, or Health Sciences.',
    requirements: [
      'Bachelor’s degree in Biology, Chemistry, Public Health, or related life sciences',
      'Basic laboratory skills (pipetting, sample logging, or basic data entry)',
      'Eagerness to learn clinical documentation protocols (GCP)',
      'Good teamwork and communication skills'
    ],
    skills: ['Lab Techniques', 'Data Entry', 'Sample Management', 'Life Sciences', 'Documentation'],
    sourceUrl: 'https://jobs.jhu.edu',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-entry-004',
    title: 'Virtual Operations Assistant & Customer Onboarding Specialist',
    company: 'Zapier',
    location: 'Remote (Global Contractor - Anywhere)',
    city: 'San Francisco',
    state: 'CA',
    isRemote: true,
    category: 'Virtual Assistant & Admin',
    experienceLevel: 'Entry Level / Junior',
    salaryMin: 45000,
    salaryMax: 68000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'US Remote (Contractor/W-8BEN)',
    sponsorshipConfidence: 'high',
    description: 'Zapier is 100% remote and hires globally. Help new customers set up simple automated workflows, answer onboarding queries, and assist internal operations. Great role for organized individuals wanting to break into US remote work.',
    requirements: [
      'Excellent written communication and helpful problem-solving attitude',
      'Comfortable using digital tools (Google Workspace, Slack, Notion)',
      'Organized and self-driven in a remote asynchronous setting',
      'Prior customer interaction or administrative experience is a plus'
    ],
    skills: ['Customer Care', 'Google Workspace', 'SaaS Tools', 'Communication', 'Virtual Assistance'],
    sourceUrl: 'https://zapier.com/jobs',
    atsType: 'ashby',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-us-001',
    title: 'Senior Full Stack Software Engineer (Cloud & AI)',
    company: 'Microsoft',
    location: 'Redmond, WA (Hybrid / Remote Option)',
    city: 'Redmond',
    state: 'WA',
    isRemote: true,
    category: 'Software & Tech',
    experienceLevel: 'Senior / Lead',
    salaryMin: 155000,
    salaryMax: 220000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'H-1B Sponsor',
    sponsorshipConfidence: 'high',
    description: 'Design next-generation cloud and generative AI workflows. You will architect resilient distributed systems, collaborate across global engineering teams, and deliver mission-critical software.',
    requirements: [
      '5+ years of software development experience with React/Next.js, TypeScript, and Python or C#',
      'Strong knowledge of cloud architectures (Azure or AWS) and microservices',
      'Bachelor’s or Master’s in Computer Science or equivalent field'
    ],
    skills: ['TypeScript', 'React', 'Python', 'Azure', 'System Design', 'Docker'],
    sourceUrl: 'https://careers.microsoft.com',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    isFeatured: false
  },
  {
    id: 'job-us-008',
    title: 'Registered Nurse (Acute Care / ICU - Direct Green Card EB-3 Sponsor)',
    company: 'Cleveland Clinic Health System',
    location: 'Cleveland, OH (Full Sponsorship + Relocation Package)',
    city: 'Cleveland',
    state: 'OH',
    isRemote: false,
    category: 'Healthcare & Nursing',
    experienceLevel: 'Mid Level',
    salaryMin: 78000,
    salaryMax: 115000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'Cap-Exempt H-1B',
    sponsorshipConfidence: 'high',
    description: 'Cleveland Clinic sponsors qualified international registered nurses for direct US Permanent Residency (EB-3 Schedule A Green Card) and Cap-Exempt visas. The US healthcare system has an urgent nursing demand and provides complete visa filing for nurses with NCLEX-RN credentials.',
    requirements: [
      'BSc in Nursing (BSN) or equivalent accredited nursing degree',
      'Passing score on NCLEX-RN examination (or in final preparation)',
      '18+ months acute care hospital experience',
      'English proficiency (IELTS or TOEFL / VisaScreen certificate)'
    ],
    skills: ['NCLEX-RN', 'Critical Care', 'Patient Assessment', 'ICU Care', 'Medical Protocols'],
    sourceUrl: 'https://jobs.clevelandclinic.org',
    atsType: 'workday',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-us-006',
    title: 'Junior Quantitative Risk & Operations Analyst (STEM OPT & H-1B Eligible)',
    company: 'Goldman Sachs',
    location: 'New York, NY (Financial District)',
    city: 'New York',
    state: 'NY',
    isRemote: false,
    category: 'Business & Finance',
    experienceLevel: 'Entry Level / Junior',
    salaryMin: 115000,
    salaryMax: 155000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'OPT/CPT Friendly',
    sponsorshipConfidence: 'high',
    description: 'Entry-level opportunity for recent international graduates with F-1 STEM OPT or seeking H-1B sponsorship. Analyze market risk exposures, build statistical models, and generate stress testing reports.',
    requirements: [
      'Degree in Finance, Mathematics, Statistics, Economics, or Computer Science',
      'Proficiency in Python (NumPy, Pandas), SQL, and Excel modeling',
      'Clear verbal and written communication'
    ],
    skills: ['Python', 'SQL', 'Financial Modeling', 'Risk Analysis', 'Statistics'],
    sourceUrl: 'https://www.goldmansachs.com/careers',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    isFeatured: false
  },
  {
    id: 'job-us-004',
    title: 'Junior Frontend Support Developer (Global Remote - W-8BEN)',
    company: 'GitLab (Remote)',
    location: 'Remote (Worldwide Contractor)',
    city: 'San Francisco',
    state: 'CA',
    isRemote: true,
    category: 'Software & Tech',
    experienceLevel: 'Entry Level / Junior',
    salaryMin: 55000,
    salaryMax: 82000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'US Remote (Contractor/W-8BEN)',
    sponsorshipConfidence: 'high',
    description: 'Support frontend design components, fix bugs, and review documentation for GitLab open-source tooling. Remote contractor position open to applicants anywhere globally.',
    requirements: [
      'Basic to intermediate knowledge of JavaScript, Vue or React, and Git',
      'Strong problem-solving and documentation writing skills',
      'Independent remote work motivation'
    ],
    skills: ['JavaScript', 'Vue.js', 'Git', 'Debugging', 'Web Development'],
    sourceUrl: 'https://gitlab.com/jobs',
    atsType: 'greenhouse',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    isFeatured: false
  }
];

// In-memory / dynamic store
let dynamicJobs: JobPosting[] = [...INITIAL_JOBS];

export function getJobsList(): JobPosting[] {
  return dynamicJobs;
}

export function addOrUpdateJobs(newJobs: JobPosting[]) {
  const existingMap = new Map<string, JobPosting>();
  dynamicJobs.forEach(j => existingMap.set(j.id, j));
  newJobs.forEach(j => existingMap.set(j.id, j));
  dynamicJobs = Array.from(existingMap.values());
  dynamicJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
}

export function findJobById(id: string): JobPosting | undefined {
  return dynamicJobs.find(j => j.id === id);
}
