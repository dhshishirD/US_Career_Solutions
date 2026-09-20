export interface SkillsListCountry {
  country: string;
  isAllSkillsSubject: boolean;
  subjectGroups: string[];
  notes?: string;
}

export interface WaiverBasis {
  id: string;
  title: string;
  shortName: string;
  statutoryRef: string;
  agency: string;
  formRequired: string;
  filingFee: string;
  processingTime: string;
  successRate: string;
  appliesTo: string[];
  description: string;
  keyRequirements: string[];
  disqualifiers: string[];
}

export interface ConradStateProgram {
  state: string;
  abbr: string;
  slots: number;
  flexSlots: number;
  contactAgency: string;
  applicationPeriod: string;
  specialtiesAllowed: string;
  hpsaRequirement: string;
  status: 'Open' | 'Upcoming' | 'High Competition' | 'Rolling';
}

export const SKILLS_LIST_SAMPLE: SkillsListCountry[] = [
  {
    country: "India",
    isAllSkillsSubject: false,
    subjectGroups: ["Engineering", "Computer Science", "Information Technology", "Medical Sciences", "Biological Sciences", "Physical Sciences", "Business Management"],
    notes: "Subject under 1997 & 2009 DOS Skills Lists for almost all technical and medical disciplines."
  },
  {
    country: "China (PRC)",
    isAllSkillsSubject: false,
    subjectGroups: ["All STEM Fields", "Environmental Sciences", "Agricultural Sciences", "Public Health", "Economics", "Communications"],
    notes: "Broad coverage under 2009 Skills List across all scientific and technical degrees."
  },
  {
    country: "Philippines",
    isAllSkillsSubject: false,
    subjectGroups: ["Nursing & Allied Health", "Education & Teaching", "Engineering", "Computer Science", "Biological Sciences"],
    notes: "Heavy coverage for educators, nurses, and STEM specialists."
  },
  {
    country: "Brazil",
    isAllSkillsSubject: false,
    subjectGroups: ["Engineering", "Information Technology", "Agronomy", "Biomedical Sciences"],
    notes: "Applies to government-sponsored science without bilateral exemption."
  },
  {
    country: "Pakistan",
    isAllSkillsSubject: false,
    subjectGroups: ["Medicine & Public Health", "Engineering", "Agricultural Sciences", "Information Technology"],
    notes: "Skills list applies extensively unless privately self-funded."
  },
  {
    country: "Nigeria",
    isAllSkillsSubject: false,
    subjectGroups: ["Medical Sciences", "Petroleum Engineering", "Computer Science", "Education"],
    notes: "Applies to healthcare and technical disciplines."
  },
  {
    country: "Egypt",
    isAllSkillsSubject: false,
    subjectGroups: ["Engineering", "Computer Science", "Pharmacy", "Biotechnology", "Agriculture"],
    notes: "Applies to scientific fields under bilateral skill schedule."
  },
  {
    country: "South Korea",
    isAllSkillsSubject: false,
    subjectGroups: ["Select Nuclear Engineering & Defense Tech"],
    notes: "Most South Korean scholars are exempt unless military/nuclear-related or government funded."
  },
  {
    country: "Canada / UK / Germany / Australia",
    isAllSkillsSubject: false,
    subjectGroups: [],
    notes: "No Skills List subjectivity. Only subject if government funding or ECFMG clinical residency was involved."
  }
];

export const WAIVER_BASES: WaiverBasis[] = [
  {
    id: "nos",
    title: "No Objection Statement (NOS)",
    shortName: "No Objection",
    statutoryRef: "INA § 212(e); 22 CFR § 41.62(c)(1)",
    agency: "Home Country Embassy + DOS Waiver Review Division",
    formRequired: "DS-3035 + Embassy Statement",
    filingFee: "$120 (DOS WRD)",
    processingTime: "6 – 12 Weeks",
    successRate: "92% – 97%",
    appliesTo: ["Research Scholars", "Postdocs", "Exchange Students", "Short-term Scholars", "Professors"],
    description: "Your home country government issues a formal diplomatic note (No Objection Statement) to the US Department of State stating they have no objection to you remaining in the United States or adjusting status.",
    keyRequirements: [
      "Submit electronic Form DS-3035 to obtain a DOS Case Number & third-party barcode sheet.",
      "Apply to your home country embassy/consulate or designated ministry (e.g. MHRD in India, Embassy in Washington DC).",
      "Embassy transmits official diplomatic note directly to the DOS Waiver Review Division."
    ],
    disqualifiers: [
      "Foreign Medical Graduates who received Graduate Medical Education/Training (GME/Residency) via ECFMG cannot use NOS.",
      "U.S. Government funded exchange visitors (e.g. Fulbright, USAID) face strong opposition and frequently receive negative recommendations."
    ]
  },
  {
    id: "iga",
    title: "Interested U.S. Federal Government Agency (IGA)",
    shortName: "Interested Federal Agency",
    statutoryRef: "INA § 212(e); 22 CFR § 41.62(c)(2)",
    agency: "U.S. Federal Agency (HHS, VA, USDA, DOD, DOE, NSF, NASA) + DOS WRD",
    formRequired: "DS-3035 + Agency IGA Application Packet",
    filingFee: "$120 (DOS WRD) + Agency fees (if applicable)",
    processingTime: "3 – 6 Months",
    successRate: "85% – 90%",
    appliesTo: ["Clinical Physicians (VA / HHS)", "Senior Researchers", "Principal Investigators", "Critical Tech Experts"],
    description: "A U.S. Federal Government agency determines that your departure from the United States would be detrimental to a program or project of significant interest to that agency.",
    keyRequirements: [
      "Must have strong institutional backing or essential role in federally funded research or healthcare.",
      "HHS IGA: Clinical research of national public health priority, or clinical care in underserved community health centers.",
      "VA IGA: Full-time clinical or research position at a VA Medical Center (minimum 3-year commitment)."
    ],
    disqualifiers: [
      "Low publication record or non-essential role on grant without institutional sponsorship.",
      "Lack of demonstrated national interest compared to ordinary employment."
    ]
  },
  {
    id: "conrad30",
    title: "Conrad State 30 Program for Physicians",
    shortName: "Conrad 30",
    statutoryRef: "INA § 212(e); INA § 214(l); P.L. 103-416",
    agency: "State Department of Health + DOS WRD + USCIS",
    formRequired: "DS-3035 + State Application + Form I-129 (H-1B)",
    filingFee: "$120 (DOS) + $460 (USCIS I-129) + $2,805 (Premium Processing optional)",
    processingTime: "2 – 4 Months",
    successRate: "95% – 98%",
    appliesTo: ["J-1 International Medical Graduates (IMGs)", "Residency & Fellowship Completers"],
    description: "Allows each U.S. state health department to sponsor up to 30 J-1 medical doctors per fiscal year to waive the 2-year rule in exchange for 3 years of full-time clinical service (40 hrs/wk) in a designated Health Professional Shortage Area (HPSA) or Medically Underserved Area (MUA).",
    keyRequirements: [
      "Executed 3-year full-time employment contract at an eligible medical facility located in a federally designated HPSA, MUA, or MUP.",
      "State Department of Health application and formal letter of endorsement to DOS.",
      "Agreement to begin employment within 90 days of receiving waiver approval and H-1B change of status."
    ],
    disqualifiers: [
      "Non-physicians.",
      "Failure to secure employment contract in qualifying geographic shortage zone."
    ]
  },
  {
    id: "hardship",
    title: "Exceptional Hardship to U.S. Citizen / LPR Family",
    shortName: "Exceptional Hardship",
    statutoryRef: "INA § 212(e); 8 CFR § 212.7(c)(5)",
    agency: "USCIS (Form I-612) + DOS WRD",
    formRequired: "Form I-612 + DS-3035 + Comprehensive Evidence Packet",
    filingFee: "$1,100 (USCIS Form I-612) + $120 (DOS WRD)",
    processingTime: "8 – 14 Months",
    successRate: "65% – 75%",
    appliesTo: ["Any J-1 exchange visitor married to USC/LPR or with USC/LPR minor children"],
    description: "You prove that your departure for 2 years would cause 'exceptional hardship' (beyond normal emotional/financial disruption of separation) to your U.S. citizen or lawful permanent resident spouse or child.",
    keyRequirements: [
      "Must prove hardship under BOTH scenarios: (1) Family remains in the US without you, AND (2) Family relocates abroad with you.",
      "Substantial evidence: Severe medical conditions, psychological trauma, language/education barriers for children, or severe country condition hazards."
    ],
    disqualifiers: [
      "Standard financial inconvenience or normal career disruption (courts require 'exceptional' hardship).",
      "Hardship to yourself (hardship must be to the USC/LPR qualifying relative)."
    ]
  },
  {
    id: "persecution",
    title: "Persecution on Race, Religion, or Political Opinion",
    shortName: "Persecution",
    statutoryRef: "INA § 212(e); 8 CFR § 212.7(c)(8)",
    agency: "USCIS (Form I-612) + DOS WRD",
    formRequired: "Form I-612 + DS-3035 + Country Evidence",
    filingFee: "$1,100 (USCIS Form I-612) + $120 (DOS WRD)",
    processingTime: "9 – 16 Months",
    successRate: "50% – 65%",
    appliesTo: ["Exchange visitors fearing targeted harm upon return"],
    description: "You establish that you would be subject to persecution on account of race, religion, or political opinion if you were required to return to your country of nationality or last residence.",
    keyRequirements: [
      "High evidentiary burden similar to asylum, specifically tied to home country conditions.",
      "Detailed affidavits, human rights reports, and documentation of past persecution or targeted threats."
    ],
    disqualifiers: [
      "General civil strife or economic hardship in home country without individualized nexus to protected grounds."
    ]
  }
];

export const CONRAD_30_SAMPLE_STATES: ConradStateProgram[] = [
  {
    state: "Texas",
    abbr: "TX",
    slots: 30,
    flexSlots: 10,
    contactAgency: "Texas Department of State Health Services (DSHS)",
    applicationPeriod: "Opens September 1 annually; first-come, first-served",
    specialtiesAllowed: "Primary Care (Family, Internal, Peds, OB/GYN, Psych) & Select Specialists",
    hpsaRequirement: "Facility in HPSA score >= 7 or designated MUA",
    status: "High Competition"
  },
  {
    state: "California",
    abbr: "CA",
    slots: 30,
    flexSlots: 10,
    contactAgency: "California Department of Public Health (CDPH)",
    applicationPeriod: "October 1 – December 15 annual window",
    specialtiesAllowed: "Primary Care prioritized; Specialists accepted if demonstrated community need",
    hpsaRequirement: "HPSA/MUA mandatory; sliding fee scale compliance required",
    status: "High Competition"
  },
  {
    state: "New York",
    abbr: "NY",
    slots: 30,
    flexSlots: 10,
    contactAgency: "New York State Department of Health (NYSDOH)",
    applicationPeriod: "Rolling applications starting October 1",
    specialtiesAllowed: "Primary Care & Hospitalists in underserved urban/rural areas",
    hpsaRequirement: "Federal HPSA/MUA or State Designated Shortage Area",
    status: "Rolling"
  },
  {
    state: "Illinois",
    abbr: "IL",
    slots: 30,
    flexSlots: 10,
    contactAgency: "Illinois Department of Public Health (IDPH)",
    applicationPeriod: "Opens October 1 annually",
    specialtiesAllowed: "Primary Care prioritized; Specialist waivers reviewed in Phase 2",
    hpsaRequirement: "HPSA score >= 10 prioritized",
    status: "Rolling"
  },
  {
    state: "Florida",
    abbr: "FL",
    slots: 30,
    flexSlots: 10,
    contactAgency: "Florida Department of Health Primary Care Office",
    applicationPeriod: "October 1 – November 30 competitive cycle",
    specialtiesAllowed: "Primary Care, Emergency Medicine, and Critical Care",
    hpsaRequirement: "Strict rural & underserved HPSA requirements",
    status: "High Competition"
  },
  {
    state: "Pennsylvania",
    abbr: "PA",
    slots: 30,
    flexSlots: 10,
    contactAgency: "Pennsylvania Department of Health Primary Care Office",
    applicationPeriod: "September 1 – October 31 (Primary Care), Nov 1+ (Specialists)",
    specialtiesAllowed: "Primary Care & Subspecialists with documented unfilled vacancies",
    hpsaRequirement: "HPSA / MUA facility location",
    status: "Open"
  },
  {
    state: "Ohio",
    abbr: "OH",
    slots: 30,
    flexSlots: 10,
    contactAgency: "Ohio Department of Health (ODH)",
    applicationPeriod: "First business day in October through March 31",
    specialtiesAllowed: "Primary Care, Psychiatry, and Hospitalists",
    hpsaRequirement: "HPSA score >= 1 or designated MUA",
    status: "Open"
  }
];
