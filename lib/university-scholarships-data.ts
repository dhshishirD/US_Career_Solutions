export interface UniversityScholarshipProfile {
  slug: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  acceptanceRate: string;
  ranking: string;
  totalGraduateEnrollment: string;
  internationalPercentage: string;
  fundingGuarantee: string;
  averageAnnualStipend: string;
  tuitionWaiverType: '100% Full Tuition Remission + Health Insurance' | 'Full Tuition Waiver + Partial Stipend' | 'Competitive Assistantship Non-Resident Waiver';
  primaryPrograms: {
    name: string;
    level: string;
    coverage: string;
    stipend: string;
    deadline: string;
    requirements: string[];
    departmentLink: string;
  }[];
  applicationFee: {
    amount: string;
    waiverAvailable: boolean;
    waiverProcess: string;
  };
  assistantshipTypes: {
    title: string;
    hoursPerWeek: string;
    duties: string;
    benefits: string;
  }[];
  costOfLivingSummary: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const UNIVERSITIES_SCHOLARSHIPS_DATA: Record<string, UniversityScholarshipProfile> = {
  'purdue-university': {
    slug: 'purdue-university',
    name: 'Purdue University',
    shortName: 'Purdue',
    city: 'West Lafayette',
    state: 'Indiana',
    acceptanceRate: '24% (Graduate Engineering)',
    ranking: '#4 in US Best Engineering Schools',
    totalGraduateEnrollment: '12,500+',
    internationalPercentage: '38%',
    fundingGuarantee: '100% Guaranteed Funding for Admitted PhD & Funded MS Thesis Students',
    averageAnnualStipend: '$24,000 - $34,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Graduate Teaching & Research Assistantships (GTA / GRA)',
        level: 'Masters & PhD',
        coverage: '100% Tuition Waiver + Monthly Stipend',
        stipend: '$2,000 - $2,850 / month ($24k - $34k/year)',
        deadline: 'December 15 - January 15 (Fall Intake)',
        requirements: [
          'Bachelor’s in Engineering, Computer Science, Data, or Physical Sciences',
          'GPA 3.2+ on 4.0 scale',
          'TOEFL (minimum 80, speaking 22+) or IELTS 6.5+',
          'Statement of Purpose highlighting research alignment with Purdue lab faculty'
        ],
        departmentLink: 'https://www.purdue.edu/gradschool/'
      },
      {
        name: 'Ross Graduate Fellowships & Andrews Fellowships',
        level: 'PhD Only',
        coverage: 'Full Tuition + $30,000+ Annual Fellowship (No Teaching Required)',
        stipend: '$30,000 / year + Summer Research Grant',
        deadline: 'December 15',
        requirements: [
          'Top 5% undergraduate class standing',
          'Nomination by academic department upon PhD admission',
          'Demonstrated potential for original scholarly research'
        ],
        departmentLink: 'https://www.purdue.edu/gradschool/funding/'
      }
    ],
    applicationFee: {
      amount: '$75 for International Applicants',
      waiverAvailable: true,
      waiverProcess: 'Fee waivers available via Purdue Graduate Diversity programs, attendance at virtual Graduate Information Sessions, or Big Ten Academic Alliance FreeApp program.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Research Assistant (GRA)',
        hoursPerWeek: '20 hours/week (0.50 FTE)',
        duties: 'Conduct laboratory experiments, algorithmic modeling, and scholarly paper authorship under Principal Investigator (PI) grants.',
        benefits: '100% tuition remission, medical insurance premium subsidy (80%+ covered), and monthly direct-deposit stipend.'
      },
      {
        title: 'Graduate Teaching Assistant (GTA)',
        hoursPerWeek: '20 hours/week (0.50 FTE)',
        duties: 'Lead undergraduate discussion sections, grade engineering lab assignments, and hold weekly office hours.',
        benefits: 'Full tuition waiver + identical statutory living stipend.'
      }
    ],
    costOfLivingSummary: 'West Lafayette offers one of the most affordable college town cost-of-living index levels in the US. A single graduate student can comfortably live on $1,200 - $1,500/month for rent, food, and utilities.',
    faqs: [
      {
        question: 'Do international students at Purdue get in-state tuition or full waivers with a GTA/GRA?',
        answer: 'When appointed to a half-time (0.50 FTE / 20 hours/week) graduate assistantship at Purdue, both out-of-state and international tuition rates are 100% remitted. You only pay minimal mandatory student activity fees (~$300/semester).'
      },
      {
        question: 'Can MS students get fully funded assistantships at Purdue?',
        answer: 'Yes. Thesis-track Master of Science (MS) students in Electrical & Computer Engineering, Mechanical Engineering, Civil Engineering, and Computer Science are eligible for GRA/GTA positions funded directly by department research grants.'
      },
      {
        question: 'How do I contact Purdue professors for research assistantships?',
        answer: 'Identify 3-5 faculty members whose current NSF/DoD grants match your undergraduate research. Send a concise email including your CV, GitHub/Google Scholar link, and a 2-paragraph summary explaining how your background solves an active problem in their published papers.'
      }
    ]
  },

  'stanford-university': {
    slug: 'stanford-university',
    name: 'Stanford University',
    shortName: 'Stanford',
    city: 'Stanford',
    state: 'California',
    acceptanceRate: '3.9% (Graduate Overall)',
    ranking: '#1 Global Research & Innovation University',
    totalGraduateEnrollment: '9,500+',
    internationalPercentage: '34%',
    fundingGuarantee: '100% Guaranteed 5-Year Funding for All Admitted PhD Candidates',
    averageAnnualStipend: '$45,000 - $52,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Knight-Hennessy Scholars Program',
        level: 'Masters & PhD',
        coverage: '100% Full Tuition + $45,000 Annual Living Stipend + Travel Grants',
        stipend: '$45,000 / year living allowance',
        deadline: 'October (Annual Intake)',
        requirements: [
          'Bachelor’s degree conferred within the last 7 years',
          'Simultaneous application to any full-time Stanford graduate degree program',
          'Demonstrated independence of thought, purposeful leadership, and civic mindset'
        ],
        departmentLink: 'https://knight-hennessy.stanford.edu'
      },
      {
        name: 'Stanford Doctoral Fellowship (SGF) & Departmental GRA/GTA',
        level: 'PhD Only',
        coverage: 'Full Tuition + Health Insurance + $12,500/quarter Stipend',
        stipend: '$50,000 / year guaranteed for 5 years',
        deadline: 'December 1 - December 15',
        requirements: [
          'Admission to Stanford School of Engineering, Humanities & Sciences, or Medicine',
          'Exemplary undergraduate academic and research record'
        ],
        departmentLink: 'https://vpge.stanford.edu/fellowships-funding/sgf'
      }
    ],
    applicationFee: {
      amount: '$125',
      waiverAvailable: true,
      waiverProcess: 'Fee waivers granted to applicants demonstrating financial hardship or who have participated in specific STEM pipeline programs.'
    },
    assistantshipTypes: [
      {
        title: 'Research Assistantship (RA)',
        hoursPerWeek: '20 hours/week (50% appointment)',
        duties: 'Advanced research in state-of-the-art Silicon Valley labs in AI, robotics, bioengineering, and quantum computing.',
        benefits: '10-unit tuition allowance per quarter (100% coverage) plus Cardinal Care health insurance and monthly stipend.'
      }
    ],
    costOfLivingSummary: 'While Silicon Valley / Bay Area living costs are high, Stanford graduate stipends ($45k-$52k/yr) are among the highest in the world and designed specifically to cover on-campus graduate housing (Escondido Village) and living expenses.',
    faqs: [
      {
        question: 'Is Knight-Hennessy open to international students from any country?',
        answer: 'Yes. Citizens of all countries without restriction are eligible for the Knight-Hennessy Scholars program. There are no quotas by country or academic discipline.'
      },
      {
        question: 'Are Stanford PhD students required to pay any tuition?',
        answer: 'No. Admitted doctoral students at Stanford receive a guaranteed 5-year financial support package covering 100% of tuition, full Cardinal Care health insurance, and a living stipend.'
      }
    ]
  },

  'massachusetts-institute-of-technology': {
    slug: 'massachusetts-institute-of-technology',
    name: 'Massachusetts Institute of Technology (MIT)',
    shortName: 'MIT',
    city: 'Cambridge',
    state: 'Massachusetts',
    acceptanceRate: '6.5% (Graduate Engineering/Science)',
    ranking: '#1 Best Engineering & Computer Science School in the World',
    totalGraduateEnrollment: '7,000+',
    internationalPercentage: '42%',
    fundingGuarantee: '100% Guaranteed Funding for All Admitted Doctoral Students',
    averageAnnualStipend: '$42,000 - $48,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'MIT Graduate Research Assistantships (EECS, MechE, AeroAstro, Media Lab)',
        level: 'Masters & PhD',
        coverage: '100% Tuition Remission + Full Medical Insurance + Monthly Stipend',
        stipend: '$3,500 - $4,000 / month ($42,000 - $48,000/year)',
        deadline: 'December 15 (Annual Fall Intake)',
        requirements: [
          'Exceptional background in STEM disciplines',
          'GRE (optional/waived in most departments)',
          'TOEFL / IELTS for non-native English speakers',
          'Strong research portfolio or open-source software contributions'
        ],
        departmentLink: 'https://gradadmissions.mit.edu/'
      }
    ],
    applicationFee: {
      amount: '$75 - $100 (department dependent)',
      waiverAvailable: true,
      waiverProcess: 'MIT Office of Graduate Education provides fee waiver request forms directly on the admissions portal based on financial need.'
    },
    assistantshipTypes: [
      {
        title: 'Research Assistant (RA)',
        hoursPerWeek: '20 hours/week',
        duties: 'Conduct pioneering research in MIT CSAIL, Lincoln Laboratory, Koch Institute, or Media Lab.',
        benefits: 'Full tuition coverage, MIT Student Extended Health Plan, and 12-month annual stipend.'
      }
    ],
    costOfLivingSummary: 'Cambridge / Boston living expenses average $1,600 - $2,000/month. MIT provides subsidized graduate student dorms (Sidney-Pacific, Ashdown, Edgerton House) ensuring comfortable living on the graduate stipend.',
    faqs: [
      {
        question: 'Does MIT offer Master’s degree funding for international students?',
        answer: 'MIT primarily admits graduate students into continuous MS/PhD programs in engineering (EECS, MechE, AeroAstro). Admitted students receive full RA/TA funding from day one.'
      }
    ]
  },

  'georgia-tech': {
    slug: 'georgia-tech',
    name: 'Georgia Institute of Technology',
    shortName: 'Georgia Tech',
    city: 'Atlanta',
    state: 'Georgia',
    acceptanceRate: '18% (Graduate Engineering)',
    ranking: '#1 Public Engineering Institution in the Southeast',
    totalGraduateEnrollment: '15,000+',
    internationalPercentage: '44%',
    fundingGuarantee: '100% Out-of-State Tuition Waiver + Stipend for all GTA/GRA Appointees',
    averageAnnualStipend: '$26,000 - $36,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'College of Engineering & Computing GTA / GRA Appointments',
        level: 'Masters & PhD',
        coverage: 'Full Out-of-State Tuition Waiver + Monthly Stipend',
        stipend: '$2,200 - $3,000 / month ($26,400 - $36,000/year)',
        deadline: 'January 1 - January 15',
        requirements: [
          'Bachelor’s degree in Computing, Engineering, or Quantitative Sciences',
          'GPA 3.3+ on 4.0 scale',
          'TOEFL iBT 90+ (minimum 19 in each sub-score) or IELTS 7.0+'
        ],
        departmentLink: 'https://grad.gatech.edu/'
      }
    ],
    applicationFee: {
      amount: '$85 for International Applicants',
      waiverAvailable: true,
      waiverProcess: 'Departmental waivers granted for eligible research preview event participants and GEM fellowship applicants.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Research Assistant (GRA)',
        hoursPerWeek: '13 - 20 hours/week (1/3 to 1/2 time)',
        duties: 'Federally funded research in robotics, machine learning, cybersecurity, clean energy, and aerospace.',
        benefits: 'Reduces tuition from $16,000+/semester down to $25 mandatory fee + stipend.'
      }
    ],
    costOfLivingSummary: 'Atlanta offers dynamic metropolitan living at a significantly lower cost than Boston, New York, or San Francisco. Average student housing near campus (Midtown Atlanta) is $900 - $1,300/month.',
    faqs: [
      {
        question: 'How much tuition do I pay at Georgia Tech if I have a GRA or GTA?',
        answer: 'With a 1/3-time or 1/2-time GRA/GTA appointment, your tuition is reduced to exactly $25 per semester. You only pay standard student mandatory fees.'
      }
    ]
  },

  'uiuc': {
    slug: 'uiuc',
    name: 'University of Illinois Urbana-Champaign',
    shortName: 'UIUC',
    city: 'Urbana-Champaign',
    state: 'Illinois',
    acceptanceRate: '21% (Grainger College of Engineering)',
    ranking: '#5 Best Computer Science & Engineering Graduate School',
    totalGraduateEnrollment: '16,000+',
    internationalPercentage: '39%',
    fundingGuarantee: '100% Tuition Waiver for Assistantships >= 25% FTE',
    averageAnnualStipend: '$25,000 - $35,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Grainger College of Engineering Assistantships (CS, ECE, MechSE, BioE)',
        level: 'Masters & PhD',
        coverage: '100% Tuition Waiver + Service Fee Waiver + Monthly Living Stipend',
        stipend: '$2,300 - $2,950 / month',
        deadline: 'December 15 (PhD / MS Fall)',
        requirements: [
          'Strong mathematics and programming background',
          'GPA 3.2+ on 4.0 scale',
          'TOEFL iBT 102+ (for GTA teaching appointment)'
        ],
        departmentLink: 'https://grad.illinois.edu/'
      }
    ],
    applicationFee: {
      amount: '$90 for International Applicants',
      waiverAvailable: true,
      waiverProcess: 'Available through Big Ten FreeApp and Illinois Graduate College Fee Waiver programs.'
    },
    assistantshipTypes: [
      {
        title: 'Research Assistant (RA) / Teaching Assistant (TA)',
        hoursPerWeek: '20 hours/week (50% appointment)',
        duties: 'Supervised lab research, AI modeling, grading, and laboratory instruction.',
        benefits: '100% base tuition remission, partial fee waiver, and dental/vision insurance.'
      }
    ],
    costOfLivingSummary: 'Urbana-Champaign has an exceptionally affordable midwest cost of living ($800 - $1,100/month for private apartment near campus).',
    faqs: [
      {
        question: 'Does UIUC fund Master of Science (MS) students?',
        answer: 'Yes, thesis-based MS students in Grainger College of Engineering departments are frequently appointed to funded GRA positions by faculty advisers.'
      }
    ]
  },

  'texas-am-university': {
    slug: 'texas-am-university',
    name: 'Texas A&M University',
    shortName: 'Texas A&M',
    city: 'College Station',
    state: 'Texas',
    acceptanceRate: '28% (College of Engineering)',
    ranking: '#10 Best Engineering Graduate School',
    totalGraduateEnrollment: '15,000+',
    internationalPercentage: '31%',
    fundingGuarantee: 'Non-Resident Tuition Waiver to In-State Rate for All 20-Hour Graduate Assistants',
    averageAnnualStipend: '$22,000 - $32,000 / year',
    tuitionWaiverType: 'Competitive Assistantship Non-Resident Waiver',
    primaryPrograms: [
      {
        name: 'Graduate Assistant Research / Teaching (GAR / GAT / GANT)',
        level: 'Masters & PhD',
        coverage: 'In-State Tuition Waiver Rate ($10k+ savings) + Departmental Tuition Remission + Monthly Stipend',
        stipend: '$2,000 - $2,700 / month',
        deadline: 'January 1 - January 15',
        requirements: [
          'Undergraduate degree in engineering, physical sciences, or agriculture',
          'GPA 3.0+ on 4.0 scale',
          'TOEFL 80+ or IELTS 6.0+'
        ],
        departmentLink: 'https://grad.tamu.edu/'
      }
    ],
    applicationFee: {
      amount: '$90',
      waiverAvailable: true,
      waiverProcess: 'Granted through department recruitment weekends and veteran/diversity programs.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Assistant Research (GAR)',
        hoursPerWeek: '20 hours/week',
        duties: 'Conduct engineering and agricultural research supported by Texas A&M Engineering Experiment Station (TEES).',
        benefits: 'In-state tuition classification, health insurance contribution, and monthly stipend.'
      }
    ],
    costOfLivingSummary: 'College Station, Texas has one of the lowest living costs in the nation with zero state income tax and affordable student housing ($600 - $900/month).',
    faqs: [
      {
        question: 'How does the Texas Non-Resident Tuition Waiver work for international students?',
        answer: 'Under Texas Education Code § 54.212, any international graduate student employed as a Graduate Assistant (GAR/GAT) for at least 20 hours/week is legally entitled to pay in-state resident tuition rates, saving over $10,000 per semester.'
      }
    ]
  },

  'uc-berkeley': {
    slug: 'uc-berkeley',
    name: 'University of California, Berkeley',
    shortName: 'UC Berkeley',
    city: 'Berkeley',
    state: 'California',
    acceptanceRate: '9% (Graduate STEM)',
    ranking: '#1 Public University in the United States',
    totalGraduateEnrollment: '12,000+',
    internationalPercentage: '33%',
    fundingGuarantee: 'Full Fee Remission (GSI / GSR) for Appointments >= 25%',
    averageAnnualStipend: '$32,000 - $44,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Graduate Student Researcher (GSR) & Graduate Student Instructor (GSI)',
        level: 'Masters & PhD',
        coverage: '100% In-State & Non-Resident Tuition Remission + SHIP Health Insurance + Monthly Wage',
        stipend: '$2,800 - $3,700 / month ($33,600 - $44,400/year)',
        deadline: 'December 1 - December 15',
        requirements: [
          'Distinguished academic background in STEM or Humanities',
          'GRE (department specific)',
          'TOEFL iBT 90+ or IELTS 7.0+'
        ],
        departmentLink: 'https://grad.berkeley.edu/'
      }
    ],
    applicationFee: {
      amount: '$140 for International Applicants',
      waiverAvailable: true,
      waiverProcess: 'Fee waiver application available directly within the UC Berkeley online graduate application for eligible financial need.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Student Researcher (GSR)',
        hoursPerWeek: '20 hours/week',
        duties: 'Conduct original research in world-renowned centers (BAIR - Berkeley AI Research, Lawrence Berkeley National Lab).',
        benefits: '100% tuition coverage, Nonresident Supplemental Tuition (NRST) remission, and union-negotiated wage scale.'
      }
    ],
    costOfLivingSummary: 'San Francisco Bay Area cost of living is high. Berkeley GSR stipends are union-represented (UAW 2865) and provide competitive wage scales designed to offset Bay Area rent ($1,200 - $1,700/month).',
    faqs: [
      {
        question: 'Does UC Berkeley cover Nonresident Supplemental Tuition (NRST) for international students?',
        answer: 'Yes. For doctoral students working as Graduate Student Researchers (GSR), departments routinely provide 100% NRST remission covering all non-resident fees.'
      }
    ]
  },

  'university-of-michigan': {
    slug: 'university-of-michigan',
    name: 'University of Michigan - Ann Arbor',
    shortName: 'UMich',
    city: 'Ann Arbor',
    state: 'Michigan',
    acceptanceRate: '15% (Rackham Graduate School)',
    ranking: '#1 Public Research University in Annual Research Volume',
    totalGraduateEnrollment: '16,000+',
    internationalPercentage: '36%',
    fundingGuarantee: '5-Year Guaranteed Funding Package for All Admitted PhD Students',
    averageAnnualStipend: '$34,000 - $42,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Rackham Graduate School Doctoral Funding Guarantee (GSRA / GSI)',
        level: 'PhD Only',
        coverage: 'Full Tuition + Premier Health & Dental Insurance + Living Stipend + Summer Support',
        stipend: '$34,000 - $42,000 / year (12-month guaranteed support)',
        deadline: 'December 15 - January 15',
        requirements: [
          'High academic achievement in undergraduate studies',
          'Demonstrated capacity for independent scientific inquiry',
          'TOEFL 84+ or IELTS 6.5+'
        ],
        departmentLink: 'https://rackham.umich.edu/'
      }
    ],
    applicationFee: {
      amount: '$90 for International Applicants',
      waiverAvailable: true,
      waiverProcess: 'Rackham Graduate School offers pre-application fee waivers to participants in approved pipeline programs.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Student Research Assistant (GSRA)',
        hoursPerWeek: '20 hours/week',
        duties: 'Participate in faculty research projects funded by NSF, NIH, DARPA, and industry sponsors.',
        benefits: '100% tuition remission and comprehensive GradCare health benefits with $0 employee premiums.'
      }
    ],
    costOfLivingSummary: 'Ann Arbor is a vibrant, safe college town with moderate-to-affordable living expenses ($1,000 - $1,400/month).',
    faqs: [
      {
        question: 'What is the Rackham 5-Year Funding Guarantee?',
        answer: 'Every doctoral student admitted to a PhD program in the Rackham Graduate School is guaranteed five full years of financial support (tuition, health insurance, and monthly stipend) through a combination of fellowships, GSRAs, and GSIs.'
      }
    ]
  },

  'columbia-university': {
    slug: 'columbia-university',
    name: 'Columbia University',
    shortName: 'Columbia',
    city: 'New York',
    state: 'New York',
    acceptanceRate: '7% (Graduate School of Arts & Sciences)',
    ranking: 'Ivy League Premier Global University',
    totalGraduateEnrollment: '20,000+',
    internationalPercentage: '45%',
    fundingGuarantee: '100% Guaranteed Multi-Year Fellowship for All PhD Candidates',
    averageAnnualStipend: '$45,000 - $48,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Columbia GSAS Doctoral Fellowships & SEAS Graduate Assistantships',
        level: 'PhD Only',
        coverage: '100% Full Tuition + Health & Dental Coverage + 12-Month Living Allowance',
        stipend: '$45,000 / year',
        deadline: 'December 15 (Annual Intake)',
        requirements: [
          'Bachelor’s or Master’s in relevant academic field',
          '3 letters of academic recommendation',
          'Academic writing sample or research abstract'
        ],
        departmentLink: 'https://gsas.columbia.edu/'
      }
    ],
    applicationFee: {
      amount: '$120',
      waiverAvailable: true,
      waiverProcess: 'GSAS fee waivers granted to applicants demonstrating exceptional financial hardship.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Research & Teaching Fellow',
        hoursPerWeek: '20 hours/week',
        duties: 'Conduct doctoral research and assist in undergraduate instruction in New York City.',
        benefits: '100% tuition coverage, full Columbia student health insurance, and subsidized university housing eligibility.'
      }
    ],
    costOfLivingSummary: 'New York City living expenses are higher, but Columbia graduate student housing in Morningside Heights and Washington Heights is heavily subsidized ($1,100 - $1,600/month).',
    faqs: [
      {
        question: 'Are Columbia PhD fellowships taxable for international students?',
        answer: 'Fellowships may be subject to US non-resident alien withholding under IRC § 1441 unless exempted by an applicable bilateral Double Taxation Treaty between the US and your home country.'
      }
    ]
  },

  'johns-hopkins-university': {
    slug: 'johns-hopkins-university',
    name: 'Johns Hopkins University',
    shortName: 'Johns Hopkins',
    city: 'Baltimore',
    state: 'Maryland',
    acceptanceRate: '11% (Graduate Medicine, Public Health, Engineering)',
    ranking: '#1 in US Academic Research & Development Spending ($3.4B+)',
    totalGraduateEnrollment: '18,000+',
    internationalPercentage: '35%',
    fundingGuarantee: '100% Tuition, Health Coverage & Living Stipend for all PhD Students',
    averageAnnualStipend: '$38,000 - $46,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Whiting School of Engineering & Bloomberg School of Public Health Fellowships',
        level: 'PhD Only',
        coverage: '100% Tuition Remission + Health Insurance + 12-Month Living Stipend',
        stipend: '$38,000 - $46,000 / year',
        deadline: 'December 1 - January 15',
        requirements: [
          'Exemplary background in biomedical, public health, engineering, or computational sciences',
          'TOEFL iBT 100+ or IELTS 7.0+'
        ],
        departmentLink: 'https://www.jhu.edu/admissions/graduate-admissions/'
      }
    ],
    applicationFee: {
      amount: '$75 - $95',
      waiverAvailable: true,
      waiverProcess: 'Whiting School and Bloomberg School provide automatic fee waivers for select international recruitment partnerships.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Research Assistant (GRA)',
        hoursPerWeek: '20 hours/week',
        duties: 'Conduct state-of-the-art medical, computational biology, and engineering research in JHU labs and medical institutes.',
        benefits: '100% tuition waiver, full individual medical insurance, and competitive 12-month stipend.'
      }
    ],
    costOfLivingSummary: 'Baltimore offers a highly favorable cost of living compared to other East Coast cities. Average rent near JHU Homewood and East Baltimore medical campuses is $800 - $1,200/month.',
    faqs: [
      {
        question: 'Does Johns Hopkins provide health insurance for international graduate assistants?',
        answer: 'Yes. 100% of individual medical, dental, and vision insurance premiums are paid directly by Johns Hopkins for all funded graduate assistants.'
      }
    ]
  },

  'caltech': {
    slug: 'caltech',
    name: 'California Institute of Technology',
    shortName: 'Caltech',
    city: 'Pasadena',
    state: 'California',
    acceptanceRate: '5.8% (Graduate STEM)',
    ranking: '#1 Student-to-Faculty Research Ratio in the Nation',
    totalGraduateEnrollment: '1,400',
    internationalPercentage: '45%',
    fundingGuarantee: '100% Financial Support Guarantee for All Admitted Graduate Students',
    averageAnnualStipend: '$44,000 - $48,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Caltech Graduate Fellowship & Graduate Research Assistantship (GRA)',
        level: 'PhD Only',
        coverage: '100% Full Tuition + Health Insurance + Living Stipend',
        stipend: '$44,000 / year ($3,666/month)',
        deadline: 'December 1 - December 15',
        requirements: [
          'Exceptional aptitude in mathematics, physics, computing, or chemistry',
          'Transcripts, 3 letters of reference, and Statement of Purpose'
        ],
        departmentLink: 'https://gradoffice.caltech.edu/'
      }
    ],
    applicationFee: {
      amount: '$100',
      waiverAvailable: true,
      waiverProcess: 'Fee waivers available via online form for applicants demonstrating financial need.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Research Assistant (GRA)',
        hoursPerWeek: '20 hours/week',
        duties: 'Conduct cutting-edge research in Jet Propulsion Laboratory (JPL) or Caltech campus labs.',
        benefits: '100% tuition remission and competitive Pasadena cost-of-living stipend.'
      }
    ],
    costOfLivingSummary: 'Pasadena offers beautiful California living with Caltech-owned graduate housing (Catalina Apartments) guaranteeing rent rates well below market ($900 - $1,300/month).',
    faqs: [
      {
        question: 'Do all admitted international PhD students at Caltech receive funding?',
        answer: 'Yes. 100% of admitted doctoral students at Caltech receive full tuition remission, comprehensive health insurance, and a living stipend for the entire duration of their degree.'
      }
    ]
  },

  'harvard-university': {
    slug: 'harvard-university',
    name: 'Harvard University',
    shortName: 'Harvard',
    city: 'Cambridge',
    state: 'Massachusetts',
    acceptanceRate: '4.2% (Kenneth C. Griffin GSAS)',
    ranking: '#1 Ivy League Global Academic Institution',
    totalGraduateEnrollment: '14,000+',
    internationalPercentage: '37%',
    fundingGuarantee: 'Guaranteed 5-Year Financial Support Package for All PhD Students',
    averageAnnualStipend: '$46,000 - $50,000 / year',
    tuitionWaiverType: '100% Full Tuition Remission + Health Insurance',
    primaryPrograms: [
      {
        name: 'Harvard Griffin GSAS Doctoral Fellowships & Assistantships',
        level: 'PhD Only',
        coverage: '100% Tuition + Harvard Health Insurance Plan + 12-Month Living Stipend + Summer Grants',
        stipend: '$46,000 / year',
        deadline: 'December 1 - December 15',
        requirements: [
          'Distinguished academic excellence',
          '3 letters of recommendation from faculty',
          'Statement of Purpose and sample of scholarly work'
        ],
        departmentLink: 'https://gsas.harvard.edu/'
      }
    ],
    applicationFee: {
      amount: '$105',
      waiverAvailable: true,
      waiverProcess: 'Griffin GSAS offers fee waivers based on financial need submitted through the online application portal.'
    },
    assistantshipTypes: [
      {
        title: 'Graduate Research / Teaching Fellow (TF)',
        hoursPerWeek: '20 hours/week',
        duties: 'Lead laboratory research or undergraduate tutorial sections across Harvard departments.',
        benefits: 'Full tuition coverage, individual medical and dental insurance, and living stipend.'
      }
    ],
    costOfLivingSummary: 'Cambridge / Boston living expenses ($1,600 - $2,000/month) are comfortably offset by Harvard’s union-negotiated graduate student stipend ($46k-$50k/year).',
    faqs: [
      {
        question: 'Are Harvard PhD programs free for international students?',
        answer: 'Yes. Every student admitted to a PhD program at the Harvard Kenneth C. Griffin Graduate School of Arts and Sciences receives full tuition, health insurance, and a generous 12-month living stipend for a minimum of 5 years.'
      }
    ]
  }
};

export function getUniversityBySlug(slug: string): UniversityScholarshipProfile | undefined {
  return UNIVERSITIES_SCHOLARSHIPS_DATA[slug];
}

export function getAllUniversitySlugs(): string[] {
  return Object.keys(UNIVERSITIES_SCHOLARSHIPS_DATA);
}
