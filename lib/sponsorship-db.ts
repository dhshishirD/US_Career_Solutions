import { CompanySponsorshipRecord } from './types';

export const TOP_SPONSOR_COMPANIES: CompanySponsorshipRecord[] = [
  // --- BIG TECH & CLOUD LEADERS ---
  {
    companyName: 'Microsoft',
    domain: 'microsoft.com',
    totalH1BFiled: 4200,
    approvalRate: 99.2,
    topOccupations: ['Software Engineer', 'Data Scientist', 'Program Manager', 'Cloud Solutions Architect', 'AI Researcher'],
    capExempt: false,
    notes: 'Aggressive H-1B sponsor with immediate Day-1 PERM/Green Card initiation policies for full-time employees.'
  },
  {
    companyName: 'Amazon',
    domain: 'amazon.com',
    totalH1BFiled: 7800,
    approvalRate: 98.6,
    topOccupations: ['Software Development Engineer', 'Applied Scientist', 'Operations Research', 'Financial Analyst', 'Cloud Support'],
    capExempt: false,
    notes: 'Largest single H-1B employer in the US with a dedicated in-house global immigration team and strong OPT/STEM OPT support.'
  },
  {
    companyName: 'Google',
    domain: 'google.com',
    totalH1BFiled: 3900,
    approvalRate: 99.5,
    topOccupations: ['Software Engineer', 'AI Research Scientist', 'Product Manager', 'Hardware Engineer', 'Site Reliability Engineer'],
    capExempt: false,
    notes: 'Consistently high approval rates; sponsors H-1B, O-1 extraordinary ability visas, and fast-track EB-2 / EB-3 PERM.'
  },
  {
    companyName: 'Meta',
    domain: 'meta.com',
    totalH1BFiled: 2600,
    approvalRate: 98.9,
    topOccupations: ['Software Engineer', 'Research Scientist (AI/ML)', 'Data Engineer', 'Product Designer', 'Infrastructure Engineer'],
    capExempt: false,
    notes: 'Active sponsor across technical engineering, AR/VR, AI research, and specialized product analytics roles.'
  },
  {
    companyName: 'Apple',
    domain: 'apple.com',
    totalH1BFiled: 2900,
    approvalRate: 99.1,
    topOccupations: ['Hardware Engineer', 'Software Engineer', 'Machine Learning Engineer', 'Systems Design Engineer', 'Operations Analyst'],
    capExempt: false,
    notes: 'Extensive sponsorship for Silicon Valley, Austin, and San Diego offices; strong support for foreign advanced degree holders.'
  },
  {
    companyName: 'NVIDIA',
    domain: 'nvidia.com',
    totalH1BFiled: 1400,
    approvalRate: 99.4,
    topOccupations: ['Deep Learning Software Engineer', 'ASIC Verification Engineer', 'System Software Engineer', 'GPU Architect'],
    capExempt: false,
    notes: 'Rapidly growing sponsor with exceptional compensation, strong relocation packages, and aggressive PERM Green Card sponsorship.'
  },
  {
    companyName: 'Salesforce',
    domain: 'salesforce.com',
    totalH1BFiled: 1250,
    approvalRate: 99.0,
    topOccupations: ['Member of Technical Staff', 'Lead Solution Engineer', 'Business Systems Analyst', 'Security Engineer'],
    capExempt: false,
    notes: 'Strong support for F-1 STEM OPT transfers and H-1B change of employer petitions with comprehensive legal coverage.'
  },
  {
    companyName: 'Oracle',
    domain: 'oracle.com',
    totalH1BFiled: 2100,
    approvalRate: 98.4,
    topOccupations: ['Applications Developer', 'Cloud Infrastructure Engineer', 'Database Administrator', 'Technical Consultant'],
    capExempt: false,
    notes: 'High-volume H-1B sponsor with offices in Austin, Redwood City, Seattle, and international transfer programs (L-1).'
  },
  {
    companyName: 'Cisco Systems',
    domain: 'cisco.com',
    totalH1BFiled: 1850,
    approvalRate: 99.0,
    topOccupations: ['Network Engineer', 'Software Engineer', 'Customer Solutions Architect', 'Cybersecurity Specialist'],
    capExempt: false,
    notes: 'Regularly files hundreds of H-1B and PERM applications annually with high approval consistency.'
  },
  {
    companyName: 'Adobe',
    domain: 'adobe.com',
    totalH1BFiled: 850,
    approvalRate: 99.2,
    topOccupations: ['Computer Scientist', 'Data Scientist', 'Product Manager', 'UX Designer'],
    capExempt: false,
    notes: 'Excellent immigration support for international graduates and engineers in San Jose, Seattle, and Lehi.'
  },
  {
    companyName: 'Uber',
    domain: 'uber.com',
    totalH1BFiled: 920,
    approvalRate: 98.8,
    topOccupations: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Operations Specialist'],
    capExempt: false,
    notes: 'Sponsors H-1B, O-1, and Green Card filings across San Francisco, Sunnyvale, and New York engineering hubs.'
  },
  {
    companyName: 'Airbnb',
    domain: 'airbnb.com',
    totalH1BFiled: 410,
    approvalRate: 99.0,
    topOccupations: ['Software Engineer', 'Data Scientist', 'Design Technologist', 'Finance Specialist'],
    capExempt: false,
    notes: 'Supports work-from-anywhere policies in the US with complete H-1B transfer and Green Card processing.'
  },
  {
    companyName: 'Stripe',
    domain: 'stripe.com',
    totalH1BFiled: 450,
    approvalRate: 99.1,
    topOccupations: ['Software Engineer', 'Technical Account Manager', 'Infrastructure Engineer', 'Risk Analyst'],
    capExempt: false,
    notes: 'Sponsors H-1B transfers, STEM OPT extensions, and international transfers with top-tier compensation.'
  },
  {
    companyName: 'Netflix',
    domain: 'netflix.com',
    totalH1BFiled: 320,
    approvalRate: 99.6,
    topOccupations: ['Senior Software Engineer', 'Content Analyst', 'Algorithms Researcher', 'Cloud Architect'],
    capExempt: false,
    notes: 'All-senior engineering model offering top-of-market base salaries and full immigration sponsorship.'
  },
  {
    companyName: 'Qualcomm',
    domain: 'qualcomm.com',
    totalH1BFiled: 1600,
    approvalRate: 99.3,
    topOccupations: ['Wireless Systems Engineer', 'Hardware Engineer', 'Software Engineer', 'Modem Systems Analyst'],
    capExempt: false,
    notes: 'Major sponsor for international Masters and PhD graduates in Electrical Engineering and Computer Engineering.'
  },
  {
    companyName: 'Intel Corporation',
    domain: 'intel.com',
    totalH1BFiled: 2300,
    approvalRate: 98.7,
    topOccupations: ['Process Engineer', 'Component Design Engineer', 'Software Engineer', 'Packaging Engineer'],
    capExempt: false,
    notes: 'Sponsors hundreds of international engineers across Oregon, Arizona, California, and Ohio fabs.'
  },
  {
    companyName: 'Tesla',
    domain: 'tesla.com',
    totalH1BFiled: 1100,
    approvalRate: 98.5,
    topOccupations: ['Mechanical Engineer', 'Autopilot Software Engineer', 'Battery Systems Engineer', 'Manufacturing Specialist'],
    capExempt: false,
    notes: 'Active sponsor in Austin, Fremont, and Palo Alto for engineering and autonomous systems specialists.'
  },
  {
    companyName: 'Snowflake',
    domain: 'snowflake.com',
    totalH1BFiled: 480,
    approvalRate: 99.2,
    topOccupations: ['Core Database Engineer', 'Cloud Infrastructure Engineer', 'Data Solutions Architect'],
    capExempt: false,
    notes: 'Rapidly expanding enterprise sponsor with strong H-1B and Green Card support.'
  },
  {
    companyName: 'Databricks',
    domain: 'databricks.com',
    totalH1BFiled: 530,
    approvalRate: 99.4,
    topOccupations: ['Distributed Systems Engineer', 'AI Research Scientist', 'Solutions Architect'],
    capExempt: false,
    notes: 'Top tier compensation and aggressive sponsorship for big data and AI engineers.'
  },

  // --- CAP-EXEMPT UNIVERSITIES (NO LOTTERY REQUIRED!) ---
  {
    companyName: 'Stanford University',
    domain: 'stanford.edu',
    totalH1BFiled: 850,
    approvalRate: 99.8,
    topOccupations: ['Postdoctoral Scholar', 'Research Scientist', 'Software Engineer', 'Clinical Instructor'],
    capExempt: true,
    notes: 'CAP-EXEMPT: No annual H-1B lottery cap! Petitions can be filed and approved year-round with no lottery risk.'
  },
  {
    companyName: 'Harvard University',
    domain: 'harvard.edu',
    totalH1BFiled: 720,
    approvalRate: 99.7,
    topOccupations: ['Research Fellow', 'Data Analyst', 'Bioinformatician', 'Associate Researcher'],
    capExempt: true,
    notes: 'CAP-EXEMPT: High-volume sponsor for researchers, staff scientists, and administrative analysts.'
  },
  {
    companyName: 'Massachusetts Institute of Technology (MIT)',
    domain: 'mit.edu',
    totalH1BFiled: 680,
    approvalRate: 99.8,
    topOccupations: ['Postdoctoral Associate', 'Research Scientist', 'AI Engineer', 'Laboratory Specialist'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Continuous year-round H-1B sponsorship for STEM researchers and technical staff.'
  },
  {
    companyName: 'Johns Hopkins University',
    domain: 'jhu.edu',
    totalH1BFiled: 910,
    approvalRate: 99.6,
    topOccupations: ['Research Specialist', 'Postdoctoral Fellow', 'Clinical Research Coordinator', 'Bioinformatics Analyst'],
    capExempt: true,
    notes: 'CAP-EXEMPT: One of the largest academic research employers in the nation with extensive international hiring.'
  },
  {
    companyName: 'University of California, Berkeley (UC Berkeley)',
    domain: 'berkeley.edu',
    totalH1BFiled: 590,
    approvalRate: 99.5,
    topOccupations: ['Postdoctoral Researcher', 'Systems Analyst', 'Lab Manager', 'Lecturer'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Part of the University of California system with lottery-exempt H-1B and J-1 scholar support.'
  },
  {
    companyName: 'University of Illinois Urbana-Champaign (UIUC)',
    domain: 'illinois.edu',
    totalH1BFiled: 640,
    approvalRate: 99.6,
    topOccupations: ['Research Programmer', 'Postdoctoral Researcher', 'Instructional Designer', 'Data Specialist'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Major STEM research hub with extensive international staff sponsorship.'
  },
  {
    companyName: 'Purdue University',
    domain: 'purdue.edu',
    totalH1BFiled: 580,
    approvalRate: 99.5,
    topOccupations: ['Research Associate', 'Postdoc Fellow', 'Laboratory Engineer', 'Assistant Professor'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Leading engineering university with full lottery-exempt visa sponsorship programs.'
  },
  {
    companyName: 'Georgia Institute of Technology (Georgia Tech)',
    domain: 'gatech.edu',
    totalH1BFiled: 620,
    approvalRate: 99.7,
    topOccupations: ['Research Engineer', 'Postdoctoral Fellow', 'Computer Scientist', 'Research Faculty'],
    capExempt: true,
    notes: 'CAP-EXEMPT: High volume of international research engineers and data specialists.'
  },
  {
    companyName: 'University of Michigan',
    domain: 'umich.edu',
    totalH1BFiled: 750,
    approvalRate: 99.6,
    topOccupations: ['Research Fellow', 'Applications Programmer', 'Clinical Specialist', 'Faculty'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Massive public research institution with robust international scholar and staff hiring.'
  },
  {
    companyName: 'Columbia University',
    domain: 'columbia.edu',
    totalH1BFiled: 690,
    approvalRate: 99.4,
    topOccupations: ['Associate Research Scientist', 'Postdoctoral Research Scientist', 'Statistical Analyst'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Prominent NYC institution offering lottery-exempt H-1B filings.'
  },

  // --- HEALTHCARE SYSTEMS & HOSPITALS (SCHEDULE A & CAP-EXEMPT) ---
  {
    companyName: 'Mayo Clinic',
    domain: 'mayoclinic.org',
    totalH1BFiled: 610,
    approvalRate: 99.4,
    topOccupations: ['Staff Physician', 'Clinical Research Associate', 'Registered Nurse Specialist', 'Biostatistician'],
    capExempt: true,
    notes: 'CAP-EXEMPT & SCHEDULE A: World-renowned medical center offering green cards and non-profit visas.'
  },
  {
    companyName: 'Cleveland Clinic',
    domain: 'clevelandclinic.org',
    totalH1BFiled: 530,
    approvalRate: 99.1,
    topOccupations: ['Clinical Fellow', 'Staff Physician', 'Healthcare Data Analyst', 'Registered Nurse'],
    capExempt: true,
    notes: 'CAP-EXEMPT & SCHEDULE A: Non-profit healthcare system with direct EB-3 Schedule A nurse green cards.'
  },
  {
    companyName: 'Memorial Sloan Kettering Cancer Center',
    domain: 'mskcc.org',
    totalH1BFiled: 440,
    approvalRate: 99.6,
    topOccupations: ['Research Fellow', 'Bioinformatician', 'Clinical Trials Specialist', 'Healthcare Analyst'],
    capExempt: true,
    notes: 'CAP-EXEMPT: Leading oncology institute in New York sponsoring global medical researchers and engineers.'
  },
  {
    companyName: 'Kaiser Permanente',
    domain: 'kaiserpermanente.org',
    totalH1BFiled: 620,
    approvalRate: 98.8,
    topOccupations: ['Physician', 'Clinical Informatics Specialist', 'Registered Nurse', 'Healthcare IT Engineer'],
    capExempt: false,
    notes: 'Major healthcare provider with high demand for international healthcare specialists and tech talent.'
  },
  {
    companyName: 'HCA Healthcare',
    domain: 'hcahealthcare.com',
    totalH1BFiled: 480,
    approvalRate: 98.2,
    topOccupations: ['Registered Nurse (ICU/ER)', 'Medical Technologist', 'Physical Therapist', 'Healthcare Admin'],
    capExempt: false,
    notes: 'SCHEDULE A SPONSOR: One of the largest hospital networks in the US filing EB-3 immigrant green cards.'
  },
  {
    companyName: 'Tenet Healthcare',
    domain: 'tenethealth.com',
    totalH1BFiled: 350,
    approvalRate: 98.0,
    topOccupations: ['Staff Nurse', 'Clinical Lab Scientist', 'Physical Therapist', 'Imaging Technologist'],
    capExempt: false,
    notes: 'SCHEDULE A SPONSOR: Active recruitment of foreign trained nurses and medical allied health professionals.'
  },

  // --- FINANCIAL SERVICES & INVESTMENT FIRMS ---
  {
    companyName: 'Goldman Sachs',
    domain: 'goldmansachs.com',
    totalH1BFiled: 1650,
    approvalRate: 98.2,
    topOccupations: ['Financial Analyst', 'Quantitative Strategist', 'Software Engineer', 'Risk Analyst'],
    capExempt: false,
    notes: 'Major sponsor in New York, Dallas, and Salt Lake City for STEM and quantitative finance graduates.'
  },
  {
    companyName: 'JPMorgan Chase',
    domain: 'jpmorganchase.com',
    totalH1BFiled: 2100,
    approvalRate: 98.5,
    topOccupations: ['Software Engineer', 'Applied AI Researcher', 'Quantitative Risk Analyst', 'Investment Banking Analyst'],
    capExempt: false,
    notes: 'Massive employer of international tech and financial talent with strong legal and relocation support.'
  },
  {
    companyName: 'Morgan Stanley',
    domain: 'morganstanley.com',
    totalH1BFiled: 980,
    approvalRate: 98.4,
    topOccupations: ['Quantitative Associate', 'Application Developer', 'Financial Risk Specialist'],
    capExempt: false,
    notes: 'Regular sponsor for STEM OPT graduates and experienced finance professionals in NY and Alpharetta.'
  },
  {
    companyName: 'Citadel & Citadel Securities',
    domain: 'citadel.com',
    totalH1BFiled: 430,
    approvalRate: 99.3,
    topOccupations: ['Quantitative Researcher', 'Software Engineer', 'Quantitative Trader', 'Systems Architect'],
    capExempt: false,
    notes: 'Elite market maker with industry-leading compensation and full immigration legal assistance.'
  },
  {
    companyName: 'Bloomberg',
    domain: 'bloomberg.com',
    totalH1BFiled: 820,
    approvalRate: 99.0,
    topOccupations: ['Software Engineer', 'Financial Data Analyst', 'Data Operations Specialist'],
    capExempt: false,
    notes: 'Massive tech and financial news employer in NYC with high H-1B approval rates.'
  },

  // --- MANAGEMENT CONSULTING & AUDIT GIANTS ---
  {
    companyName: 'Deloitte',
    domain: 'deloitte.com',
    totalH1BFiled: 3400,
    approvalRate: 98.1,
    topOccupations: ['Advisory Senior Consultant', 'Cloud Engineering Specialist', 'Data Analytics Manager', 'Cyber Risk Analyst'],
    capExempt: false,
    notes: 'Consistently one of the top 5 largest H-1B petitioners nationwide across business and technology consulting.'
  },
  {
    companyName: 'Ernst & Young (EY)',
    domain: 'ey.com',
    totalH1BFiled: 2900,
    approvalRate: 98.3,
    topOccupations: ['Technology Consultant', 'Assurance Senior', 'Financial Risk Specialist', 'Tax Analyst'],
    capExempt: false,
    notes: 'High-volume sponsor for international graduates from top business, accounting, and engineering schools.'
  },
  {
    companyName: 'PricewaterhouseCoopers (PwC)',
    domain: 'pwc.com',
    totalH1BFiled: 2400,
    approvalRate: 98.2,
    topOccupations: ['Management Consultant', 'Technology Advisory Senior', 'Digital Analytics Specialist'],
    capExempt: false,
    notes: 'Comprehensive sponsorship program for MBA and STEM OPT candidates.'
  },
  {
    companyName: 'McKinsey & Company',
    domain: 'mckinsey.com',
    totalH1BFiled: 580,
    approvalRate: 99.2,
    topOccupations: ['Associate', 'Engagement Manager', 'Data Scientist (QuantumBlack)', 'Product Specialist'],
    capExempt: false,
    notes: 'Top tier strategy consulting firm offering full H-1B, O-1, and Green Card processing for global hires.'
  },
  {
    companyName: 'Boston Consulting Group (BCG)',
    domain: 'bcg.com',
    totalH1BFiled: 510,
    approvalRate: 99.1,
    topOccupations: ['Consultant', 'Project Leader', 'Data Scientist (BCG X)', 'Digital Architect'],
    capExempt: false,
    notes: 'Full visa support for international business school graduates and technical analytics specialists.'
  },

  // --- GLOBAL REMOTE-FIRST (W-8BEN / CONTRACTOR / EOR) ---
  {
    companyName: 'Automattic (Remote)',
    domain: 'automattic.com',
    totalH1BFiled: 40,
    approvalRate: 97.0,
    topOccupations: ['Customer Happiness Engineer', 'Code Wrangler', 'Systems Engineer', 'Product Designer'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: Hires in 90+ countries via international contractor agreements (W-8BEN) with USD pay.'
  },
  {
    companyName: 'GitLab (Remote)',
    domain: 'gitlab.com',
    totalH1BFiled: 65,
    approvalRate: 98.0,
    topOccupations: ['Frontend Engineer', 'Backend Engineer', 'Solutions Architect', 'Product Support'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: All-remote organization hiring internationally through Employer of Record (EOR) and direct contractor setups.'
  },
  {
    companyName: 'Zapier (Remote)',
    domain: 'zapier.com',
    totalH1BFiled: 50,
    approvalRate: 98.5,
    topOccupations: ['Customer Support Specialist', 'Software Engineer', 'Product Manager', 'Data Analyst'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: 100% remote company paying in USD with worldwide hiring flexibility.'
  },
  {
    companyName: 'Scale AI / Outlier (Remote)',
    domain: 'scale.com',
    totalH1BFiled: 85,
    approvalRate: 98.2,
    topOccupations: ['AI Data Annotator', 'Model Trainer', 'Software Engineer', 'Operations Lead'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: Massive remote contractor hiring for AI training, reasoning, and annotation with weekly USD payouts.'
  },
  {
    companyName: 'Canonical (Ubuntu) (Remote)',
    domain: 'canonical.com',
    totalH1BFiled: 30,
    approvalRate: 97.5,
    topOccupations: ['Linux Engineer', 'Cloud Architect', 'Technical Author', 'Customer Support'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: 100% distributed Linux software company hiring talent worldwide.'
  },
  {
    companyName: 'Buffer (Remote)',
    domain: 'buffer.com',
    totalH1BFiled: 20,
    approvalRate: 96.5,
    topOccupations: ['Customer Advocate', 'Full Stack Engineer', 'Content Marketer'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: Pioneer in remote work culture hiring worldwide with transparent salary tiers.'
  },
  {
    companyName: 'Basecamp / 37signals (Remote)',
    domain: '37signals.com',
    totalH1BFiled: 15,
    approvalRate: 98.0,
    topOccupations: ['Programmer', 'Designer', 'Customer Support Specialist'],
    capExempt: false,
    notes: 'GLOBAL REMOTE: Renowned remote-first company hiring worldwide with generous benefits.'
  }
];

export function lookupCompanySponsorship(name: string): CompanySponsorshipRecord | null {
  if (!name) return null;
  const query = name.toLowerCase().trim();
  return TOP_SPONSOR_COMPANIES.find(c => 
    c.companyName.toLowerCase().includes(query) || 
    query.includes(c.companyName.toLowerCase()) ||
    (c.domain && c.domain.toLowerCase().includes(query))
  ) || null;
}

export function searchCompanies(term: string, filterType: string = 'all'): CompanySponsorshipRecord[] {
  let list = TOP_SPONSOR_COMPANIES;
  
  if (filterType === 'cap-exempt') {
    list = list.filter(c => c.capExempt);
  } else if (filterType === 'remote') {
    list = list.filter(c => (c.notes || '').toLowerCase().includes('remote') || (c.notes || '').toLowerCase().includes('w-8ben'));
  } else if (filterType === 'healthcare') {
    list = list.filter(c => (c.notes || '').toLowerCase().includes('schedule a') || (c.notes || '').toLowerCase().includes('medical') || (c.notes || '').toLowerCase().includes('hospital') || (c.notes || '').toLowerCase().includes('clinic'));
  } else if (filterType === 'tech') {
    list = list.filter(c => !c.capExempt && (c.domain?.includes('com') || c.topOccupations.some(o => o.toLowerCase().includes('engineer'))));
  }

  if (!term.trim()) return list;

  const query = term.toLowerCase().trim();
  return list.filter(c => 
    c.companyName.toLowerCase().includes(query) ||
    c.topOccupations.some(o => o.toLowerCase().includes(query)) ||
    (c.notes && c.notes.toLowerCase().includes(query)) ||
    (c.domain && c.domain.toLowerCase().includes(query))
  );
}
