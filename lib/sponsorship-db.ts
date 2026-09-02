import { CompanySponsorshipRecord } from './types';

export const TOP_SPONSOR_COMPANIES: CompanySponsorshipRecord[] = [
  {
    companyName: 'Microsoft',
    domain: 'microsoft.com',
    totalH1BFiled: 4200,
    approvalRate: 99.2,
    topOccupations: ['Software Engineer', 'Data Scientist', 'Program Manager', 'Cloud Solutions Architect'],
    capExempt: false,
    notes: 'Aggressive H-1B sponsor with immediate PERM/Green Card initiation policies.'
  },
  {
    companyName: 'Amazon',
    domain: 'amazon.com',
    totalH1BFiled: 7800,
    approvalRate: 98.6,
    topOccupations: ['Software Development Engineer', 'Applied Scientist', 'Operations Research', 'Financial Analyst'],
    capExempt: false,
    notes: 'Largest single H-1B employer in the US with dedicated global immigration team.'
  },
  {
    companyName: 'Google',
    domain: 'google.com',
    totalH1BFiled: 3900,
    approvalRate: 99.5,
    topOccupations: ['Software Engineer', 'AI Research Scientist', 'Product Manager', 'Hardware Engineer'],
    capExempt: false,
    notes: 'Consistently high approval rates; sponsors H-1B, O-1, and fast-track EB-2.'
  },
  {
    companyName: 'Meta',
    domain: 'meta.com',
    totalH1BFiled: 2600,
    approvalRate: 98.9,
    topOccupations: ['Software Engineer', 'Research Scientist (AI/ML)', 'Data Engineer', 'Product Designer'],
    capExempt: false,
    notes: 'Active sponsor across technical engineering and specialized research roles.'
  },
  {
    companyName: 'Stanford University',
    domain: 'stanford.edu',
    totalH1BFiled: 850,
    approvalRate: 99.8,
    topOccupations: ['Postdoctoral Scholar', 'Research Scientist', 'Software Engineer', 'Clinical Instructor'],
    capExempt: true,
    notes: 'CAP-EXEMPT: No annual H-1B lottery cap! Petitions can be filed and approved year-round.'
  },
  {
    companyName: 'Harvard University',
    domain: 'harvard.edu',
    totalH1BFiled: 720,
    approvalRate: 99.7,
    topOccupations: ['Research Fellow', 'Data Analyst', 'Bioinformatician', 'Associate Researcher'],
    capExempt: true,
    notes: 'CAP-EXEMPT: H-1B petitions are exempt from the lottery. Strong support for J-1 and H-1B.'
  },
  {
    companyName: 'Mayo Clinic',
    domain: 'mayoclinic.org',
    totalH1BFiled: 610,
    approvalRate: 99.4,
    topOccupations: ['Physician', 'Research Associate', 'Clinical Data Specialist', 'Registered Nurse Specialist'],
    capExempt: true,
    notes: 'CAP-EXEMPT Healthcare: Excellent pathway for international medical and healthcare specialists.'
  },
  {
    companyName: 'Cleveland Clinic',
    domain: 'clevelandclinic.org',
    totalH1BFiled: 530,
    approvalRate: 99.1,
    topOccupations: ['Clinical Fellow', 'Staff Physician', 'Healthcare Data Analyst', 'Research Staff'],
    capExempt: true,
    notes: 'Non-profit healthcare system with exempt H-1B sponsorship and J-1 waiver programs.'
  },
  {
    companyName: 'Salesforce',
    domain: 'salesforce.com',
    totalH1BFiled: 1250,
    approvalRate: 99.0,
    topOccupations: ['Member of Technical Staff', 'Lead Solution Engineer', 'Business Systems Analyst'],
    capExempt: false,
    notes: 'Strong support for F-1 STEM OPT transfers and H-1B change of employer petitions.'
  },
  {
    companyName: 'NVIDIA',
    domain: 'nvidia.com',
    totalH1BFiled: 1400,
    approvalRate: 99.4,
    topOccupations: ['Deep Learning Software Engineer', 'ASIC Verification Engineer', 'System Software Engineer'],
    capExempt: false,
    notes: 'Rapidly growing sponsor with exceptional compensation and immigration support.'
  },
  {
    companyName: 'Johns Hopkins University & Medicine',
    domain: 'jhu.edu',
    totalH1BFiled: 910,
    approvalRate: 99.6,
    topOccupations: ['Research Specialist', 'Postdoctoral Fellow', 'Clinical Research Coordinator', 'Data Analyst'],
    capExempt: true,
    notes: 'CAP-EXEMPT institution: High volume of international researchers, scientists, and analysts.'
  },
  {
    companyName: 'Stripe',
    domain: 'stripe.com',
    totalH1BFiled: 450,
    approvalRate: 99.1,
    topOccupations: ['Software Engineer', 'Technical Account Manager', 'Infrastructure Engineer'],
    capExempt: false,
    notes: 'Sponsors H-1B transfers and international candidates with valid US work authorization or O-1.'
  },
  {
    companyName: 'Goldman Sachs',
    domain: 'goldmansachs.com',
    totalH1BFiled: 1650,
    approvalRate: 98.2,
    topOccupations: ['Financial Analyst', 'Quantitative Strategist', 'Software Engineer', 'Risk Analyst'],
    capExempt: false,
    notes: 'Major sponsor in New York, Dallas, and Salt Lake City for STEM and quantitative finance roles.'
  },
  {
    companyName: 'Automattic (Remote)',
    domain: 'automattic.com',
    totalH1BFiled: 40,
    approvalRate: 97.0,
    topOccupations: ['Code Wrangler', 'Customer Success', 'Systems Engineer'],
    capExempt: false,
    notes: 'Fully remote global employer. Hires internationally via contractor agreements (W-8BEN / local entities).'
  },
  {
    companyName: 'GitLab (Remote)',
    domain: 'gitlab.com',
    totalH1BFiled: 65,
    approvalRate: 98.0,
    topOccupations: ['Frontend Engineer', 'Backend Engineer', 'Solutions Architect'],
    capExempt: false,
    notes: 'All-remote organization hiring globally through Employer of Record (EOR) and US direct.'
  }
];

export function lookupCompanySponsorship(name: string): CompanySponsorshipRecord | null {
  const query = name.toLowerCase().trim();
  return TOP_SPONSOR_COMPANIES.find(c => 
    c.companyName.toLowerCase().includes(query) || 
    query.includes(c.companyName.toLowerCase()) ||
    (c.domain && c.domain.toLowerCase().includes(query))
  ) || null;
}
