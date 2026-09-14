export interface StateNursingInfo {
  stateCode: string;
  stateName: string;
  isCompact: boolean; // NLC
  allowsInitialNoSSN: boolean;
  evaluationAgency: string; // CGFNS CES / IERF / Josef Silny
  englishExemptionPolicy: string;
  processingTimeWeeks: string;
  averageSalary: number; // Annual
  hourlyWage: number;
  bonUrl: string;
  specialRules?: string;
}

export interface DirectHireHospital {
  id: string;
  name: string;
  systemType: string; // Academic Medical Center, Non-Profit Teaching Hospital, Cancer Center, Health System
  city: string;
  state: string;
  stateCode: string;
  eb3SponsorshipTrack: string;
  signOnBonus: string;
  relocationAssistance: boolean;
  careerUrl: string;
  featuredUnits: string[];
}

export const STATE_NURSING_MATRIX: StateNursingInfo[] = [
  {
    stateCode: 'NY',
    stateName: 'New York',
    isCompact: false,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES Professional Report / FCVS',
    englishExemptionPolicy: 'Required if education not in English (TOEFL/IELTS/PTE)',
    processingTimeWeeks: '6 - 10 weeks',
    averageSalary: 105650,
    hourlyWage: 50.79,
    bonUrl: 'http://www.op.nysed.gov/prof/nurse/',
    specialRules: 'Allows initial NCLEX registration without US SSN using Form 1.'
  },
  {
    stateCode: 'IL',
    stateName: 'Illinois',
    isCompact: false,
    allowsInitialNoSSN: true,
    evaluationAgency: 'Continental Testing Services / CGFNS CES',
    englishExemptionPolicy: 'TOEFL iBT (84) or IELTS (6.5 overall)',
    processingTimeWeeks: '4 - 8 weeks',
    averageSalary: 88450,
    hourlyWage: 42.52,
    bonUrl: 'https://idfpr.illinois.gov/profs/nursing.html',
    specialRules: 'Very popular initial testing state for international candidates.'
  },
  {
    stateCode: 'TX',
    stateName: 'Texas',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / IERF / Josef Silny',
    englishExemptionPolicy: 'TOEFL iBT (83) or IELTS (6.5) / OET (B)',
    processingTimeWeeks: '3 - 6 weeks',
    averageSalary: 86900,
    hourlyWage: 41.78,
    bonUrl: 'https://www.bon.texas.gov/',
    specialRules: 'Full Nurse Licensure Compact (NLC) state. Rapid endorsement for initial passers.'
  },
  {
    stateCode: 'CA',
    stateName: 'California',
    isCompact: false,
    allowsInitialNoSSN: false,
    evaluationAgency: 'Direct Evaluation by CA BRN / CGFNS',
    englishExemptionPolicy: 'Required unless native English country',
    processingTimeWeeks: '10 - 16 weeks',
    averageSalary: 137690,
    hourlyWage: 66.20,
    bonUrl: 'https://www.rn.ca.gov/',
    specialRules: 'Highest RN salaries in the world. Requires US SSN/ITIN at final license issuance.'
  },
  {
    stateCode: 'FL',
    stateName: 'Florida',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny / IERF',
    englishExemptionPolicy: 'TOEFL (80) or IELTS (6.5) or Pearson PTE',
    processingTimeWeeks: '3 - 5 weeks',
    averageSalary: 81200,
    hourlyWage: 39.04,
    bonUrl: 'https://floridasnursing.gov/',
    specialRules: 'NLC Compact State. Massive international nurse hiring demand across hospital systems.'
  },
  {
    stateCode: 'MA',
    stateName: 'Massachusetts',
    isCompact: false,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES Professional Report',
    englishExemptionPolicy: 'TOEFL (84) / IELTS (6.5) required',
    processingTimeWeeks: '4 - 8 weeks',
    averageSalary: 104150,
    hourlyWage: 50.07,
    bonUrl: 'https://www.mass.gov/orgs/board-of-registration-in-nursing',
    specialRules: 'World-renowned academic medical centers (Mass General, Brigham, Beth Israel).'
  },
  {
    stateCode: 'WA',
    stateName: 'Washington',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny / SpanTran',
    englishExemptionPolicy: 'TOEFL / IELTS / OET',
    processingTimeWeeks: '3 - 6 weeks',
    averageSalary: 101670,
    hourlyWage: 48.88,
    bonUrl: 'https://nursing.wa.gov/',
    specialRules: 'No state personal income tax. Compact member.'
  },
  {
    stateCode: 'OH',
    stateName: 'Ohio',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / IERF',
    englishExemptionPolicy: 'TOEFL iBT (84) or IELTS (6.5)',
    processingTimeWeeks: '2 - 4 weeks',
    averageSalary: 79940,
    hourlyWage: 38.43,
    bonUrl: 'https://nursing.ohio.gov/',
    specialRules: 'Fast endorsement processing (<3 weeks). Cleveland Clinic and Ohio State networks.'
  },
  {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES Professional Report',
    englishExemptionPolicy: 'TOEFL iBT (84) / IELTS (6.5)',
    processingTimeWeeks: '4 - 7 weeks',
    averageSalary: 84700,
    hourlyWage: 40.72,
    bonUrl: 'https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Nursing/',
    specialRules: 'UPMC and Penn Medicine international sponsorship hubs.'
  },
  {
    stateCode: 'NC',
    stateName: 'North Carolina',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny',
    englishExemptionPolicy: 'Standard CGFNS / TOEFL / IELTS',
    processingTimeWeeks: '3 - 5 weeks',
    averageSalary: 80550,
    hourlyWage: 38.73,
    bonUrl: 'https://www.ncbon.com/',
    specialRules: 'Duke Health, UNC Health, and Atrium Health Schedule A pipelines.'
  },
  {
    stateCode: 'GA',
    stateName: 'Georgia',
    isCompact: true,
    allowsInitialNoSSN: false,
    evaluationAgency: 'CGFNS CES / Josef Silny',
    englishExemptionPolicy: 'TOEFL (80) / IELTS (6.5)',
    processingTimeWeeks: '4 - 8 weeks',
    averageSalary: 83620,
    hourlyWage: 40.20,
    bonUrl: 'https://sos.ga.gov/georgia-board-nursing',
    specialRules: 'Emory Healthcare & Piedmont networks. Requires SSN at final endorsement.'
  },
  {
    stateCode: 'VA',
    stateName: 'Virginia',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny',
    englishExemptionPolicy: 'TOEFL (83) / IELTS (6.5)',
    processingTimeWeeks: '2 - 4 weeks',
    averageSalary: 84100,
    hourlyWage: 40.43,
    bonUrl: 'https://www.dhp.virginia.gov/Boards/Nursing/',
    specialRules: 'Fastest endorsement in Mid-Atlantic region. Compact member.'
  },
  {
    stateCode: 'MN',
    stateName: 'Minnesota',
    isCompact: false,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny',
    englishExemptionPolicy: 'TOEFL / IELTS',
    processingTimeWeeks: '3 - 6 weeks',
    averageSalary: 93300,
    hourlyWage: 44.86,
    bonUrl: 'https://mn.gov/boards/nursing/',
    specialRules: 'Home of Mayo Clinic (Rochester). Direct-hire Schedule A powerhouse.'
  },
  {
    stateCode: 'NM',
    stateName: 'New Mexico',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny',
    englishExemptionPolicy: 'TOEFL (84) / IELTS (6.5)',
    processingTimeWeeks: '2 - 4 weeks',
    averageSalary: 83500,
    hourlyWage: 40.14,
    bonUrl: 'https://www.bon.nm.gov/',
    specialRules: 'Famous for flexible foreign nurse initial exam registration.'
  },
  {
    stateCode: 'AZ',
    stateName: 'Arizona',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES / Josef Silny',
    englishExemptionPolicy: 'TOEFL / IELTS',
    processingTimeWeeks: '3 - 5 weeks',
    averageSalary: 86450,
    hourlyWage: 41.56,
    bonUrl: 'https://www.azbn.gov/',
    specialRules: 'Banner Health and Mayo Clinic Phoenix campus.'
  },
  {
    stateCode: 'MD',
    stateName: 'Maryland',
    isCompact: true,
    allowsInitialNoSSN: true,
    evaluationAgency: 'CGFNS CES',
    englishExemptionPolicy: 'TOEFL / IELTS',
    processingTimeWeeks: '4 - 7 weeks',
    averageSalary: 89900,
    hourlyWage: 43.22,
    bonUrl: 'https://mbon.maryland.gov/',
    specialRules: 'Johns Hopkins Medicine and University of Maryland Medical System.'
  }
];

export const DIRECT_HIRE_HOSPITALS: DirectHireHospital[] = [
  {
    id: 'hosp-001',
    name: 'Mayo Clinic',
    systemType: 'Non-Profit Academic Medical Center (#1 US Hospital)',
    city: 'Rochester',
    state: 'Minnesota',
    stateCode: 'MN',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A (In-House Legal Team)',
    signOnBonus: '$10,000 - $15,000 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://jobs.mayoclinic.org/nursing',
    featuredUnits: ['ICU / Critical Care', 'Cardiovascular Surgery', 'Oncology', 'Emergency Medicine']
  },
  {
    id: 'hosp-002',
    name: 'Cleveland Clinic Health System',
    systemType: 'Academic Medical Center (#2 US Hospital)',
    city: 'Cleveland',
    state: 'Ohio',
    stateCode: 'OH',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A Permanent Residency',
    signOnBonus: '$12,000 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://jobs.clevelandclinic.org/nursing',
    featuredUnits: ['Heart & Vascular', 'Neurological ICU', 'Pediatric ICU', 'Medical-Surgical']
  },
  {
    id: 'hosp-003',
    name: 'Johns Hopkins Medicine',
    systemType: 'Teaching & Research Hospital System',
    city: 'Baltimore',
    state: 'Maryland',
    stateCode: 'MD',
    eb3SponsorshipTrack: 'Direct Hospital EB-3 Green Card Filing',
    signOnBonus: '$10,000 Sign-on + Housing Stipend',
    relocationAssistance: true,
    careerUrl: 'https://jobs.hopkinsmedicine.org/nursing',
    featuredUnits: ['Trauma ICU', 'Comprehensive Cancer Care', 'Pediatrics', 'Operating Room']
  },
  {
    id: 'hosp-004',
    name: 'Mass General Brigham',
    systemType: 'Harvard Medical School Teaching System',
    city: 'Boston',
    state: 'Massachusetts',
    stateCode: 'MA',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A Sponsorship',
    signOnBonus: '$15,000 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://www.massgeneralbrigham.org/en/careers',
    featuredUnits: ['Burn ICU', 'Transplant Surgery', 'Neuro ICU', 'Labor & Delivery']
  },
  {
    id: 'hosp-005',
    name: 'MD Anderson Cancer Center (Univ. of Texas)',
    systemType: '#1 US Cancer Hospital (Public Non-Profit)',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A + Cap-Exempt H-1B',
    signOnBonus: '$10,000 Relocation & Sign-on',
    relocationAssistance: true,
    careerUrl: 'https://jobs.mdanderson.org/',
    featuredUnits: ['Bone Marrow Transplant', 'Surgical Oncology', 'Inpatient Chemotherapy', 'ICU']
  },
  {
    id: 'hosp-006',
    name: 'NYU Langone Health',
    systemType: 'Top Academic Medical Center',
    city: 'New York',
    state: 'New York',
    stateCode: 'NY',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A Permanent Sponsorship',
    signOnBonus: '$10,000 Sign-on (Starting >$115k/yr)',
    relocationAssistance: true,
    careerUrl: 'https://jobs.nyulangone.org/',
    featuredUnits: ['Cardiac Cath Lab', 'Emergency Trauma', 'Neonatal ICU (NICU)', 'Surgical Telemetry']
  },
  {
    id: 'hosp-007',
    name: 'Duke Health System',
    systemType: 'Academic Healthcare Network',
    city: 'Durham',
    state: 'North Carolina',
    stateCode: 'NC',
    eb3SponsorshipTrack: 'Direct-Hire Schedule A Green Card',
    signOnBonus: '$10,000 - $12,500 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://careers.dukehealth.org/nursing',
    featuredUnits: ['Pediatric ICU', 'Adult Cardiac ICU', 'Neurosciences', 'Dialysis']
  },
  {
    id: 'hosp-008',
    name: 'UPMC (University of Pittsburgh Medical Center)',
    systemType: 'Integrated Global Health Enterprise (40+ Hospitals)',
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    stateCode: 'PA',
    eb3SponsorshipTrack: 'Direct Hospital EB-3 Green Card Filing',
    signOnBonus: '$10,000 - $15,000 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://careers.upmc.com/nursing',
    featuredUnits: ['Transplantation', 'Trauma & Emergency', 'Women & Infants', 'Oncology']
  },
  {
    id: 'hosp-009',
    name: 'Banner Health',
    systemType: 'Major Non-Profit Health System (30+ Hospitals)',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    eb3SponsorshipTrack: 'Direct-Hire Schedule A Green Card Program',
    signOnBonus: '$10,000 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://careers.bannerhealth.com/',
    featuredUnits: ['ICU', 'Medical-Surgical', 'Tele', 'Step-down', 'Emergency Room']
  },
  {
    id: 'hosp-010',
    name: 'Emory Healthcare',
    systemType: 'Academic Health System',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    eb3SponsorshipTrack: 'Direct Hospital Schedule A Sponsorship',
    signOnBonus: '$10,000 Sign-on Bonus',
    relocationAssistance: true,
    careerUrl: 'https://www.emoryhealthcare.org/careers',
    featuredUnits: ['Cardiothoracic Surgery', 'Infectious Disease', 'High-Risk Perinatal', 'Critical Care']
  },
  {
    id: 'hosp-011',
    name: 'UW Medicine (University of Washington)',
    systemType: 'Academic Medical System (No State Income Tax)',
    city: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A + Cap-Exempt H-1B',
    signOnBonus: '$10,000 Relocation & Sign-on',
    relocationAssistance: true,
    careerUrl: 'https://www.uwmedicine.org/careers',
    featuredUnits: ['Harborview Level 1 Trauma', 'Regional Burn ICU', 'Surgical Specialty', 'Pediatrics']
  },
  {
    id: 'hosp-012',
    name: 'Memorial Sloan Kettering Cancer Center',
    systemType: 'World-Leading Cancer Hospital',
    city: 'New York',
    state: 'New York',
    stateCode: 'NY',
    eb3SponsorshipTrack: 'Direct-Hire EB-3 Schedule A Permanent Sponsorship',
    signOnBonus: '$12,000 Sign-on + Pension Benefits',
    relocationAssistance: true,
    careerUrl: 'https://careers.mskcc.org/nursing/',
    featuredUnits: ['Inpatient Chemotherapy', 'Immuno-Oncology', 'Surgical Oncology ICU', 'Palliative Care']
  }
];
