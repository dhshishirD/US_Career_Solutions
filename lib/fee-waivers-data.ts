export interface UniversityFeeWaiver {
  id: string;
  university: string;
  state: string;
  standardFee: number; // e.g. 75, 90, 100
  waiverType: 'Automatic (No Code Needed)' | 'Info Session / Virtual Open House' | 'Direct Email Request' | 'Promotional Waiver Code' | 'Diversity & Financial Need';
  waiverCodeOrInstruction: string;
  greRequirement: '100% Waived (No GRE Needed)' | 'GRE Optional' | 'Required for Specific STEM';
  fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)' | 'Full Tuition Waiver' | 'Departmental Fellowship Available';
  averageStipend: string;
  degreeLevels: ('MS' | 'PhD' | 'Master of Engineering')[];
  priorityDeadlineFall2026: string;
  spring2027Available: boolean;
  officialApplyUrl: string;
  nsfGrantFundingUrl?: string;
  description: string;
}

export const US_FEE_WAIVERS_DATA: UniversityFeeWaiver[] = [
  // 1. Northeastern University
  {
    id: 'fw-001',
    university: 'Northeastern University (Khoury & COE)',
    state: 'MA',
    standardFee: 100,
    waiverType: 'Info Session / Virtual Open House',
    waiverCodeOrInstruction: 'Register and attend any Khoury College of Computer Sciences or College of Engineering virtual open house webinar. An automated unique $100 waiver code is emailed within 48 hours of attendance.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,800 - $3,600 / month (GTA/GRA)',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'December 15, 2026 / Rolling',
    spring2027Available: true,
    officialApplyUrl: 'https://coe.northeastern.edu/academics-experiential-learning/graduate-school/admissions/',
    nsfGrantFundingUrl: 'https://www.nsf.gov/awardsearch/advancedSearchResult?ProgEleCode=&BooleanElement=Any&BooleanRef=4&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&ProgRefCode=&HistoricalAwards=Y&Org=Northeastern+University',
    description: 'Premier R1 research university in Boston with world-leading Co-Op industry placement. Offers massive AI and biomedical graduate assistantships.'
  },
  // 2. University of Michigan
  {
    id: 'fw-002',
    university: 'University of Michigan - Ann Arbor (Rackham)',
    state: 'MI',
    standardFee: 90,
    waiverType: 'Automatic (No Code Needed)',
    waiverCodeOrInstruction: 'Eligible international applicants attending virtual recruitment events or nominated by academic departments receive direct fee exemptions at final submission screen.',
    greRequirement: 'GRE Optional',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$3,200 - $4,200 / month (PhD Fellowship)',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'December 1, 2026',
    spring2027Available: false,
    officialApplyUrl: 'https://rackham.umich.edu/admissions/applying/application-fee-and-waivers/',
    description: 'Top-5 global public research powerhouse. 100% of PhD candidates receive full tuition remission, comprehensive health insurance, and guaranteed 5-year living stipends.'
  },
  // 3. Purdue University
  {
    id: 'fw-003',
    university: 'Purdue University West Lafayette',
    state: 'IN',
    standardFee: 75,
    waiverType: 'Info Session / Virtual Open House',
    waiverCodeOrInstruction: 'Attend the annual Purdue Engineering Virtual Graduate Showcase or Big Ten Academic Alliance recruitment events to receive a direct application waiver code.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,600 - $3,500 / month',
    degreeLevels: ['MS', 'PhD', 'Master of Engineering'],
    priorityDeadlineFall2026: 'December 15, 2026',
    spring2027Available: true,
    officialApplyUrl: 'https://www.purdue.edu/gradschool/admissions/how-to-apply/application-fees.html',
    description: 'World leader in aerospace, semiconductor engineering, and computer science with $600M+ in annual research expenditures.'
  },
  // 4. University of Texas at Arlington
  {
    id: 'fw-004',
    university: 'University of Texas at Arlington (UTA)',
    state: 'TX',
    standardFee: 90,
    waiverType: 'Promotional Waiver Code',
    waiverCodeOrInstruction: 'Apply during UTA Virtual Graduate Week using code UTAWINTER or email the graduate advisor directly with undergraduate transcripts showing GPA > 3.2/4.0.',
    greRequirement: 'GRE Optional',
    fundingCoverage: 'Full Tuition Waiver',
    averageStipend: '$2,200 - $2,900 / month + In-State Tuition Waiver',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'February 15, 2027 (Priority Fall 2026)',
    spring2027Available: true,
    officialApplyUrl: 'https://www.uta.edu/admissions/apply/graduate',
    description: 'Major Texas R1 research university in the Dallas-Fort Worth tech corridor. Offers Texas In-State Tuition waivers for students receiving $1,000+ competitive scholarships.'
  },
  // 5. University of Rochester
  {
    id: 'fw-005',
    university: 'University of Rochester (Hajim School)',
    state: 'NY',
    standardFee: 70,
    waiverType: 'Automatic (No Code Needed)',
    waiverCodeOrInstruction: '$0 application fee for all PhD applications automatically. MS applicants attending virtual graduate webinars receive instant $70 waiver promo codes.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$3,400 - $4,200 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 5, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://www.hajim.rochester.edu/graduate-admissions.html',
    description: 'Elite private research institution renowned for Optics, Data Science, and Biomedical Engineering with generous laboratory research fellowships.'
  },
  // 6. Michigan Technological University
  {
    id: 'fw-006',
    university: 'Michigan Technological University (Michigan Tech)',
    state: 'MI',
    standardFee: 0,
    waiverType: 'Automatic (No Code Needed)',
    waiverCodeOrInstruction: 'Permanent $0 application fee for ALL international graduate applicants. No promotional code or special request needed.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,400 - $3,200 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'February 1, 2027 / Rolling',
    spring2027Available: true,
    officialApplyUrl: 'https://www.mtu.edu/gradschool/admissions/apply/',
    description: 'Zero application fee barrier permanently. Highly regarded STEM curriculum with extensive automotive, robotics, and environmental research labs.'
  },
  // 7. University of Dayton
  {
    id: 'fw-007',
    university: 'University of Dayton',
    state: 'OH',
    standardFee: 0,
    waiverType: 'Automatic (No Code Needed)',
    waiverCodeOrInstruction: 'Permanent $0 application fee for all international graduate applications submitted directly through the university application portal.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: 'Full Tuition Waiver',
    averageStipend: '$2,100 - $2,700 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'May 1, 2027 / Rolling',
    spring2027Available: true,
    officialApplyUrl: 'https://udayton.edu/admission/international/graduate/apply.php',
    description: 'R1 research institution affiliated with GE Aviation and Wright-Patterson Air Force Research Laboratory with zero application costs.'
  },
  // 8. Stevens Institute of Technology
  {
    id: 'fw-008',
    university: 'Stevens Institute of Technology',
    state: 'NJ',
    standardFee: 75,
    waiverType: 'Info Session / Virtual Open House',
    waiverCodeOrInstruction: 'Attend any Stevens virtual open house or graduate information session to receive an automated $75 waiver code in your registration confirmation email.',
    greRequirement: 'GRE Optional',
    fundingCoverage: 'Full Tuition Waiver',
    averageStipend: '$2,800 - $3,500 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 15, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://www.stevens.edu/admissions/graduate-admissions/how-to-apply',
    description: 'Overlooking the Manhattan skyline with direct hiring pipelines into Wall Street investment banks, quantitative trading firms, and FAANG tech.'
  },
  // 9. Illinois Institute of Technology
  {
    id: 'fw-009',
    university: 'Illinois Institute of Technology (Chicago)',
    state: 'IL',
    standardFee: 100,
    waiverType: 'Promotional Waiver Code',
    waiverCodeOrInstruction: 'Use promotional code IITGRAD or attend Chicago Tech Open Day webinars for 100% application fee waiver.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: 'Full Tuition Waiver',
    averageStipend: '$2,500 - $3,300 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'March 1, 2027 / Rolling',
    spring2027Available: true,
    officialApplyUrl: 'https://www.iit.edu/admissions-aid/graduate-admission',
    description: 'Offers generous $10,000 - $15,000 merit scholarships automatically evaluated during admission, plus full research assistantships for thesis students.'
  },
  // 10. George Mason University
  {
    id: 'fw-010',
    university: 'George Mason University (Costello & CEC)',
    state: 'VA',
    standardFee: 75,
    waiverType: 'Info Session / Virtual Open House',
    waiverCodeOrInstruction: 'Attend any College of Engineering & Computing virtual graduate information session to receive a personalized fee waiver code.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,700 - $3,600 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'December 1, 2026',
    spring2027Available: true,
    officialApplyUrl: 'https://www.gmu.edu/admissions-aid/apply-now/graduate',
    description: 'Prime Washington D.C. capital region hub with extensive federal cybersecurity, cloud infrastructure, and defense research contracts.'
  },
  // 11. University of Colorado Boulder
  {
    id: 'fw-011',
    university: 'University of Colorado Boulder',
    state: 'CO',
    standardFee: 80,
    waiverType: 'Direct Email Request',
    waiverCodeOrInstruction: 'Email your target department graduate coordinator before submitting application to request a departmental diversity or academic fee voucher.',
    greRequirement: 'GRE Optional',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$3,100 - $3,900 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'December 15, 2026',
    spring2027Available: false,
    officialApplyUrl: 'https://www.colorado.edu/graduateschool/admissions/how-apply',
    description: 'Ranked top-10 in Aerospace and Environmental Sciences with massive research funding from NASA, NOAA, and NSF.'
  },
  // 12. Case Western Reserve University
  {
    id: 'fw-012',
    university: 'Case Western Reserve University',
    state: 'OH',
    standardFee: 50,
    waiverType: 'Info Session / Virtual Open House',
    waiverCodeOrInstruction: 'Attend Case School of Engineering virtual graduate fairs for an immediate $50 fee waiver coupon code.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$3,000 - $3,800 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 15, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://case.edu/graduate-studies/admissions',
    description: 'Powerhouse private research university partnered with Cleveland Clinic. Extensive biomedical, materials, and robotics funding.'
  },
  // 13. University of South Florida
  {
    id: 'fw-013',
    university: 'University of South Florida (USF)',
    state: 'FL',
    standardFee: 30,
    waiverType: 'Automatic (No Code Needed)',
    waiverCodeOrInstruction: 'Low baseline application fee ($30) with automatic graduate assistantship consideration for all applicants with strong GPA and research profiles.',
    greRequirement: 'GRE Optional',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,300 - $3,000 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 1, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://www.usf.edu/admissions/graduate/index.aspx',
    description: 'Fast-rising public research university with state-of-the-art medical and cybersecurity facilities and zero state income tax.'
  },
  // 14. Tulane University
  {
    id: 'fw-014',
    university: 'Tulane University (SSE)',
    state: 'LA',
    standardFee: 0,
    waiverType: 'Automatic (No Code Needed)',
    waiverCodeOrInstruction: 'Permanent $0 application fee for all School of Science & Engineering graduate programs.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,900 - $3,700 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 10, 2027',
    spring2027Available: false,
    officialApplyUrl: 'https://sse.tulane.edu/admissions/graduate',
    description: 'Prestigious AAU private institution providing 100% tuition scholarships and guaranteed 5-year stipends for all accepted PhD candidates.'
  },
  // 15. Worcester Polytechnic Institute
  {
    id: 'fw-015',
    university: 'Worcester Polytechnic Institute (WPI)',
    state: 'MA',
    standardFee: 70,
    waiverType: 'Promotional Waiver Code',
    waiverCodeOrInstruction: 'Use code WPIGRAD26 or attend graduate virtual open houses to waive the $70 fee.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: 'Full Tuition Waiver',
    averageStipend: '$2,700 - $3,500 / month',
    degreeLevels: ['MS', 'PhD', 'Master of Engineering'],
    priorityDeadlineFall2026: 'February 1, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://www.wpi.edu/admissions/graduate/how-to-apply',
    description: 'Pioneering project-based STEM curriculum in Massachusetts with exceptional robotics, data science, and biotechnology labs.'
  },
  // 16. University of Wisconsin-Madison
  {
    id: 'fw-016',
    university: 'University of Wisconsin - Madison',
    state: 'WI',
    standardFee: 75,
    waiverType: 'Diversity & Financial Need',
    waiverCodeOrInstruction: 'Submit the online Fee Grant Request form in the Graduate School portal citing financial need or international research scholar status.',
    greRequirement: 'GRE Optional',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$3,100 - $3,900 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'December 1, 2026',
    spring2027Available: false,
    officialApplyUrl: 'https://grad.wisc.edu/apply/fee-grant/',
    description: 'Top-15 global research university with over $1.4 Billion in annual research grants. All PhD students receive guaranteed full funding.'
  },
  // 17. University of Arizona
  {
    id: 'fw-017',
    university: 'University of Arizona (Graduate College)',
    state: 'AZ',
    standardFee: 90,
    waiverType: 'Direct Email Request',
    waiverCodeOrInstruction: 'Contact prospective lab faculty advisors. Professors with active grant funding directly cover student application fees upon preliminary interview.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,500 - $3,200 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 15, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://grad.arizona.edu/admissions/requirements/application-fees-and-fee-waivers',
    description: 'World leader in astronomy, optical sciences, hydrology, and planetary exploration with direct NASA space mission funding.'
  },
  // 18. New Jersey Institute of Technology
  {
    id: 'fw-018',
    university: 'New Jersey Institute of Technology (NJIT)',
    state: 'NJ',
    standardFee: 75,
    waiverType: 'Promotional Waiver Code',
    waiverCodeOrInstruction: 'Use promotional code NJITGRAD or attend NJIT Graduate Virtual Information Days for 100% fee waiver.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: 'Full Tuition Waiver',
    averageStipend: '$2,400 - $3,100 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'February 15, 2027 / Rolling',
    spring2027Available: true,
    officialApplyUrl: 'https://www.njit.edu/admissions/graduate/apply',
    description: 'Top public STEM polytechnic 20 minutes from NYC. Highest return on investment for computing and civil engineering.'
  },
  // 19. University of Massachusetts Amherst
  {
    id: 'fw-019',
    university: 'University of Massachusetts Amherst (Manning CICS)',
    state: 'MA',
    standardFee: 85,
    waiverType: 'Diversity & Financial Need',
    waiverCodeOrInstruction: 'Manning College of Information and Computer Sciences provides direct application fee waivers for eligible prospective graduate students.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$3,200 - $4,000 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'December 15, 2026',
    spring2027Available: true,
    officialApplyUrl: 'https://www.cics.umass.edu/admissions/graduate-admissions',
    description: 'Top-20 Computer Science program worldwide with world-class Natural Language Processing, Computer Vision, and Systems research labs.'
  },
  // 20. Virginia Tech
  {
    id: 'fw-020',
    university: 'Virginia Tech (College of Engineering)',
    state: 'VA',
    standardFee: 75,
    waiverType: 'Info Session / Virtual Open House',
    waiverCodeOrInstruction: 'Attend Virginia Tech Graduate School Diversity & Recruitment webinars to receive a direct $75 application fee waiver coupon.',
    greRequirement: '100% Waived (No GRE Needed)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend (GTA/GRA)',
    averageStipend: '$2,700 - $3,500 / month',
    degreeLevels: ['MS', 'PhD'],
    priorityDeadlineFall2026: 'January 5, 2027',
    spring2027Available: true,
    officialApplyUrl: 'https://graduateschool.vt.edu/admissions/how-to-apply/application-fees.html',
    description: 'National leader in autonomous vehicles, smart grid engineering, and advanced manufacturing with extensive research sponsorships.'
  }
];
