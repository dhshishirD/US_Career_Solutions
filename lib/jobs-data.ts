import { JobPosting } from './types';

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-us-001',
    title: 'Senior Full Stack Software Engineer (Cloud & AI)',
    company: 'Microsoft',
    location: 'Redmond, WA (Hybrid / Remote Option)',
    city: 'Redmond',
    state: 'WA',
    isRemote: true,
    category: 'Software & Tech',
    salaryMin: 155000,
    salaryMax: 220000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'H-1B Sponsor',
    sponsorshipConfidence: 'high',
    description: 'We are seeking an experienced Full Stack Software Engineer to build next-generation cloud and generative AI workflows. You will design resilient distributed systems, collaborate across global engineering teams, and deliver mission-critical software.',
    requirements: [
      '5+ years of software development experience with React/Next.js, TypeScript, and Python or C#',
      'Strong knowledge of cloud architectures (Azure or AWS), microservices, and REST/GraphQL APIs',
      'Bachelor’s or Master’s in Computer Science or equivalent STEM field',
      'Experience optimizing distributed databases and automated CI/CD pipelines'
    ],
    skills: ['TypeScript', 'React', 'Python', 'Azure', 'System Design', 'Docker', 'GraphQL'],
    sourceUrl: 'https://careers.microsoft.com',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-us-002',
    title: 'Clinical Data Scientist & Healthcare Informatics Specialist',
    company: 'Mayo Clinic',
    location: 'Rochester, MN (Cap-Exempt Visa Eligible)',
    city: 'Rochester',
    state: 'MN',
    isRemote: false,
    category: 'Healthcare & Nursing',
    salaryMin: 125000,
    salaryMax: 175000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'Cap-Exempt H-1B',
    sponsorshipConfidence: 'high',
    description: 'Join the world-renowned Mayo Clinic to analyze large-scale clinical electronic health records (EHR) and design predictive machine learning models to improve patient outcomes. Because Mayo Clinic is a non-profit academic medical center, eligible candidates can receive Cap-Exempt H-1B sponsorship with no lottery restriction.',
    requirements: [
      'Master’s or Ph.D. in Biomedical Informatics, Biostatistics, Data Science, or related health science',
      'Strong programming proficiency in Python, R, and SQL on clinical databases (MIMIC, Epic Cosmos, OMOP)',
      'Familiarity with survival analysis, predictive modeling, and medical statistical standards',
      'Ability to collaborate with medical doctors, surgeons, and clinical research teams'
    ],
    skills: ['Python', 'R', 'SQL', 'Healthcare Informatics', 'Biostatistics', 'Machine Learning'],
    sourceUrl: 'https://jobs.mayoclinic.org',
    atsType: 'workday',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-us-003',
    title: 'AI / Machine Learning Research Engineer',
    company: 'Stanford University',
    location: 'Stanford, CA (Cap-Exempt Institution)',
    city: 'Stanford',
    state: 'CA',
    isRemote: false,
    category: 'Data & AI',
    salaryMin: 130000,
    salaryMax: 180000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'Cap-Exempt H-1B',
    sponsorshipConfidence: 'high',
    description: 'Stanford AI Lab is hiring an AI Research Engineer to contribute to foundation model training, alignment, and multi-modal evaluation frameworks. As a university role, this position is fully exempt from the USCIS annual H-1B lottery cap.',
    requirements: [
      'Solid foundations in PyTorch, JAX, CUDA kernels, and distributed GPU training (DeepSpeed/Megatron)',
      'Published research or open-source contributions in NLP, Computer Vision, or multimodal architectures',
      'MS or PhD in Computer Science, Electrical Engineering, or related technical discipline'
    ],
    skills: ['PyTorch', 'Python', 'LLMs', 'Deep Learning', 'CUDA', 'Distributed Systems'],
    sourceUrl: 'https://careersearch.stanford.edu',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-us-004',
    title: 'Senior Frontend Engineer (US Remote - Global Contractor / W-8BEN)',
    company: 'Automattic (WordPress.com)',
    location: 'Remote (Anywhere - International Hires Welcome)',
    city: 'San Francisco',
    state: 'CA',
    isRemote: true,
    category: 'Software & Tech',
    salaryMin: 110000,
    salaryMax: 165000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'US Remote (Contractor/W-8BEN)',
    sponsorshipConfidence: 'high',
    description: 'Automattic operates as a 100% distributed company across 95+ countries. You can work directly for a US company from your home country without needing a US physical visa or relocation, receiving compensation via international contract (W-8BEN).',
    requirements: [
      'Deep expertise in modern JavaScript/TypeScript, React, state management, and modern CSS/Tailwind',
      'Strong independent communication and asynchronous workflow track record',
      'Experience with high-scale web platforms and performance optimization',
      'Passion for open source and creator tooling'
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Web Performance', 'Asynchronous Collaboration', 'Git'],
    sourceUrl: 'https://automattic.com/work-with-us',
    atsType: 'greenhouse',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    isFeatured: true
  },
  {
    id: 'job-us-005',
    title: 'Cloud DevOps & Site Reliability Engineer',
    company: 'Amazon Web Services (AWS)',
    location: 'Seattle, WA / Arlington, VA',
    city: 'Seattle',
    state: 'WA',
    isRemote: false,
    category: 'Software & Tech',
    salaryMin: 145000,
    salaryMax: 215000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'H-1B Sponsor',
    sponsorshipConfidence: 'high',
    description: 'AWS is looking for an SRE to drive reliability, infrastructure as code, and automated remediation across Tier-1 cloud services. Amazon provides full corporate immigration sponsorship for eligible H-1B, L-1, and green card applicants.',
    requirements: [
      '3+ years maintaining Linux production environments at scale',
      'Expertise in Terraform, Kubernetes (EKS), Docker, and CI/CD automation',
      'Programming capability in Go, Python, or Java',
      'Incident management, on-call experience, and monitoring with Prometheus/Grafana'
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Go', 'Linux', 'SRE'],
    sourceUrl: 'https://www.amazon.jobs',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    isFeatured: false
  },
  {
    id: 'job-us-006',
    title: 'Junior Quantitative Risk Analyst (STEM OPT & H-1B Eligible)',
    company: 'Goldman Sachs',
    location: 'New York, NY (Financial District)',
    city: 'New York',
    state: 'NY',
    isRemote: false,
    category: 'Business & Finance',
    salaryMin: 115000,
    salaryMax: 160000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'OPT/CPT Friendly',
    sponsorshipConfidence: 'high',
    description: 'Great entry/mid-level opportunity for recent international graduates with F-1 STEM OPT or seeking H-1B sponsorship. Analyze market risk exposures, build statistical risk models, and generate stress testing reports for trading desks.',
    requirements: [
      'Degree in Financial Engineering, Mathematics, Statistics, Economics, or Computer Science',
      'Proficiency in Python (NumPy, Pandas, SciPy), SQL, and financial modeling',
      'Solid grasp of derivative pricing, VaR (Value at Risk), and fixed income instruments',
      'Clear verbal and written communication for stakeholder presentations'
    ],
    skills: ['Python', 'SQL', 'Financial Modeling', 'Risk Analysis', 'Statistics', 'Excel'],
    sourceUrl: 'https://www.goldmansachs.com/careers',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
    isFeatured: false
  },
  {
    id: 'job-us-007',
    title: 'Lead Structural / Mechanical Design Engineer',
    company: 'Tesla',
    location: 'Austin, TX / Fremont, CA',
    city: 'Austin',
    state: 'TX',
    isRemote: false,
    category: 'Engineering',
    salaryMin: 135000,
    salaryMax: 195000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'H-1B Sponsor',
    sponsorshipConfidence: 'medium',
    description: 'Design next-generation structural chassis and thermal battery pack enclosures. Lead finite element analysis (FEA), prototype validation, and collaborate directly with gigafactory manufacturing lines.',
    requirements: [
      'BS/MS in Mechanical, Aerospace, or Automotive Engineering',
      'Hands-on mastery of CAD (CATIA or NX) and FEA simulation (Abaqus/Ansys)',
      'Experience taking mechanical assemblies from CAD through stamping, casting, and production'
    ],
    skills: ['CAD', 'CATIA', 'FEA', 'Mechanical Design', 'Manufacturing', 'Prototyping'],
    sourceUrl: 'https://www.tesla.com/careers',
    atsType: 'direct',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    isFeatured: false
  },
  {
    id: 'job-us-008',
    title: 'Registered Nurse (ICU / Acute Care - Green Card EB-3 Sponsor)',
    company: 'Cleveland Clinic Health System',
    location: 'Cleveland, OH (Relocation + Sponsorship Package)',
    city: 'Cleveland',
    state: 'OH',
    isRemote: false,
    category: 'Healthcare & Nursing',
    salaryMin: 78000,
    salaryMax: 112000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    visaSponsorship: 'Cap-Exempt H-1B',
    sponsorshipConfidence: 'high',
    description: 'Full-time ICU Registered Nurse positions offering complete direct-hire immigration sponsorship (EB-3 Schedule A Permanent Residency / Green Card & Cap-Exempt visas) for qualified nurses with NCLEX-RN and IELTS/TOEFL credentials.',
    requirements: [
      'BSc in Nursing (BSN) or equivalent accredited nursing qualification',
      'Passing score on the NCLEX-RN examination or active US State Nursing License',
      'Minimum 18 months of acute care / ICU hospital experience',
      'VisaScreen certificate eligibility'
    ],
    skills: ['Critical Care', 'NCLEX-RN', 'Patient Assessment', 'ICU Protocol', 'BLS/ACLS'],
    sourceUrl: 'https://jobs.clevelandclinic.org',
    atsType: 'workday',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 58).toISOString(),
    isFeatured: true
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
  // Sort newest first
  dynamicJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
}

export function findJobById(id: string): JobPosting | undefined {
  return dynamicJobs.find(j => j.id === id);
}
