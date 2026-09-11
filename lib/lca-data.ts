export interface LcaRecord {
  id: string;
  jobTitle: string;
  socCode: string;
  socTitle: string;
  company: string;
  city: string;
  state: string;
  wageLevel: 'Level I (Entry)' | 'Level II (Qualified)' | 'Level III (Experienced)' | 'Level IV (Fully Competent)';
  baseSalary: number;
  prevailingWage: number;
  caseStatus: 'Certified' | 'Certified - Withdrawn';
  submitYear: number;
  day1GreenCard: boolean;
  eVerify: boolean;
  capExempt: boolean;
}

export const LCA_RECORDS_DATA: LcaRecord[] = [
  // ==========================================
  // 1. SILICON VALLEY & BIG TECH (CALIFORNIA)
  // ==========================================
  {
    id: 'lca-001',
    jobTitle: 'Senior Software Engineer (AI & Infrastructure)',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Google LLC (Alphabet)',
    city: 'Mountain View',
    state: 'CA',
    wageLevel: 'Level IV (Fully Competent)',
    baseSalary: 215000,
    prevailingWage: 178200,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-002',
    jobTitle: 'Machine Learning Research Scientist',
    socCode: '15-2051',
    socTitle: 'Data Scientists',
    company: 'Meta Platforms (Facebook)',
    city: 'Menlo Park',
    state: 'CA',
    wageLevel: 'Level IV (Fully Competent)',
    baseSalary: 235000,
    prevailingWage: 189400,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-003',
    jobTitle: 'GPU Architecture Hardware Engineer',
    socCode: '17-2072',
    socTitle: 'Electronics Engineers',
    company: 'Nvidia Corporation',
    city: 'Santa Clara',
    state: 'CA',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 205000,
    prevailingWage: 168500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-004',
    jobTitle: 'iOS Systems Software Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Apple Inc.',
    city: 'Cupertino',
    state: 'CA',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 192000,
    prevailingWage: 162400,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-005',
    jobTitle: 'Full Stack Cloud Developer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Salesforce Inc.',
    city: 'San Francisco',
    state: 'CA',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 168000,
    prevailingWage: 142100,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-006',
    jobTitle: 'Postdoctoral Biomedical Research Fellow',
    socCode: '19-1029',
    socTitle: 'Biological Scientists, All Other',
    company: 'Stanford University & Healthcare',
    city: 'Stanford',
    state: 'CA',
    wageLevel: 'Level I (Entry)',
    baseSalary: 85000,
    prevailingWage: 74200,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: true
  },

  // ==========================================
  // 2. TEXAS (SILICON HILLS & ENERGY TECH)
  // ==========================================
  {
    id: 'lca-007',
    jobTitle: 'Autopilot & Computer Vision Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Tesla Inc.',
    city: 'Austin',
    state: 'TX',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 175000,
    prevailingWage: 138600,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-008',
    jobTitle: 'Cloud Database Kernel Developer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Oracle America Inc. (Austin HQ)',
    city: 'Austin',
    state: 'TX',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 165000,
    prevailingWage: 132400,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-009',
    jobTitle: 'Analog IC Semiconductor Design Engineer',
    socCode: '17-2072',
    socTitle: 'Electronics Engineers',
    company: 'Texas Instruments Incorporated',
    city: 'Dallas',
    state: 'TX',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 142000,
    prevailingWage: 118500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-010',
    jobTitle: 'Clinical Oncology Research Scientist',
    socCode: '19-1042',
    socTitle: 'Medical Scientists',
    company: 'MD Anderson Cancer Center',
    city: 'Houston',
    state: 'TX',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 96000,
    prevailingWage: 82100,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: true
  },
  {
    id: 'lca-011',
    jobTitle: 'FinTech Banking Infrastructure Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'JPMorgan Chase & Co.',
    city: 'Plano',
    state: 'TX',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 148000,
    prevailingWage: 124000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },

  // ==========================================
  // 3. WASHINGTON (SEATTLE CLOUD AWS & MICROSOFT)
  // ==========================================
  {
    id: 'lca-012',
    jobTitle: 'Software Development Engineer II (AWS S3 & EC2)',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Amazon.com Services LLC',
    city: 'Seattle',
    state: 'WA',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 178000,
    prevailingWage: 146500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-013',
    jobTitle: 'Principal Software Engineer (Azure AI)',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Microsoft Corporation',
    city: 'Redmond',
    state: 'WA',
    wageLevel: 'Level IV (Fully Competent)',
    baseSalary: 210000,
    prevailingWage: 174200,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-014',
    jobTitle: 'Kubernetes Infrastructure Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Google LLC (Seattle Campus)',
    city: 'Seattle',
    state: 'WA',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 195000,
    prevailingWage: 158900,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-015',
    jobTitle: 'Computational Immunology Postdoc',
    socCode: '19-1042',
    socTitle: 'Medical Scientists',
    company: 'Fred Hutchinson Cancer Center',
    city: 'Seattle',
    state: 'WA',
    wageLevel: 'Level I (Entry)',
    baseSalary: 82000,
    prevailingWage: 71500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: true
  },

  // ==========================================
  // 4. NEW YORK (WALL STREET FINTECH & HEALTHCARE)
  // ==========================================
  {
    id: 'lca-016',
    jobTitle: 'Quantitative Trading Systems Developer (C++)',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Citadel LLC',
    city: 'New York',
    state: 'NY',
    wageLevel: 'Level IV (Fully Competent)',
    baseSalary: 245000,
    prevailingWage: 185000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-017',
    jobTitle: 'Financial Quantitative Analyst (Algorithmic Modeling)',
    socCode: '13-2051',
    socTitle: 'Financial Analysts',
    company: 'Goldman Sachs & Co. LLC',
    city: 'New York',
    state: 'NY',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 190000,
    prevailingWage: 148200,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-018',
    jobTitle: 'Real-Time Market Data Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Bloomberg LP',
    city: 'New York',
    state: 'NY',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 175000,
    prevailingWage: 139500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-019',
    jobTitle: 'Staff Oncology Data Scientist',
    socCode: '15-2051',
    socTitle: 'Data Scientists',
    company: 'Memorial Sloan Kettering Cancer Center',
    city: 'New York',
    state: 'NY',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 155000,
    prevailingWage: 132000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: true
  },
  {
    id: 'lca-020',
    jobTitle: 'Registered Nurse (Cardiothoracic ICU - Schedule A)',
    socCode: '29-1141',
    socTitle: 'Registered Nurses',
    company: 'NewYork-Presbyterian Hospital',
    city: 'New York',
    state: 'NY',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 118000,
    prevailingWage: 98500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: true
  },

  // ==========================================
  // 5. MASSACHUSETTS (BOSTON BIOTECH & MIT/HARVARD)
  // ==========================================
  {
    id: 'lca-021',
    jobTitle: 'Senior Computational Biologist (Genomics AI)',
    socCode: '19-1029',
    socTitle: 'Biological Scientists, All Other',
    company: 'ModernaTX Inc.',
    city: 'Cambridge',
    state: 'MA',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 168000,
    prevailingWage: 135000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-022',
    jobTitle: 'Research Scientist (Quantum Computing Lab)',
    socCode: '19-2012',
    socTitle: 'Physicists',
    company: 'Massachusetts Institute of Technology (MIT)',
    city: 'Cambridge',
    state: 'MA',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 105000,
    prevailingWage: 88500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: true
  },
  {
    id: 'lca-023',
    jobTitle: 'Supply Chain Optimization Algorithms Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Wayfair LLC',
    city: 'Boston',
    state: 'MA',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 152000,
    prevailingWage: 126400,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },

  // ==========================================
  // 6. ILLINOIS (CHICAGO PROP TRADING & HEALTH)
  // ==========================================
  {
    id: 'lca-024',
    jobTitle: 'Low-Latency C++ Execution Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Jump Trading LLC',
    city: 'Chicago',
    state: 'IL',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 215000,
    prevailingWage: 155000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-025',
    jobTitle: 'Cloud Security Systems Engineer',
    socCode: '15-1212',
    socTitle: 'Information Security Analysts',
    company: 'Motorola Solutions Inc.',
    city: 'Chicago',
    state: 'IL',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 140000,
    prevailingWage: 112000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },

  // ==========================================
  // 7. NORTH CAROLINA & VIRGINIA & GEORGIA
  // ==========================================
  {
    id: 'lca-026',
    jobTitle: 'Principal Cloud Security Architect',
    socCode: '15-1212',
    socTitle: 'Information Security Analysts',
    company: 'Cisco Systems Inc. (RTP Campus)',
    city: 'Research Triangle Park',
    state: 'NC',
    wageLevel: 'Level IV (Fully Competent)',
    baseSalary: 185000,
    prevailingWage: 144000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-027',
    jobTitle: 'Senior Distributed Systems Engineer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Capital One Services LLC',
    city: 'McLean',
    state: 'VA',
    wageLevel: 'Level III (Experienced)',
    baseSalary: 172000,
    prevailingWage: 138000,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  },
  {
    id: 'lca-028',
    jobTitle: 'Payment Gateway Core Developer',
    socCode: '15-1252',
    socTitle: 'Software Developers',
    company: 'Global Payments Inc. (Atlanta HQ)',
    city: 'Atlanta',
    state: 'GA',
    wageLevel: 'Level II (Qualified)',
    baseSalary: 138000,
    prevailingWage: 110500,
    caseStatus: 'Certified',
    submitYear: 2026,
    day1GreenCard: true,
    eVerify: true,
    capExempt: false
  }
];
