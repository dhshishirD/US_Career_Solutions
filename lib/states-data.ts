export interface StateData {
  name: string;
  code: string;
  slug: string;
  tagline: string;
  metaDescription: string;
  badgeColor: string;
  heroBgGradient: string;
  stats: {
    avgTechSalary: string;
    h1bApprovalRank: string;
    stateIncomeTax: string;
    medianRent: string;
    costOfLivingIndex: number;
    eVerifyRank: string;
  };
  keyHubs: string[];
  topSponsors: {
    name: string;
    industry: string;
    h1bApprovals: string;
    medianSalary: string;
    eVerify: boolean;
    day1GreenCard: boolean;
  }[];
  capExemptInstitutions: {
    name: string;
    type: 'Research University' | 'Medical Center / Hospital' | 'Non-Profit Research Lab';
    city: string;
    highlight: string;
  }[];
  taxAnalysis: {
    grossSalary: number;
    federalTax: number;
    stateTax: number;
    ficaTax: number;
    netTakeHome: number;
    effectiveTaxRate: string;
    comparisonNote: string;
  };
  discussions: {
    question: string;
    authorRole: string;
    answer: string;
    upvotes: number;
  }[];
  insiderTips: string[];
}

export const US_STATES_DATA: Record<string, StateData> = {
  'california': {
    name: 'California',
    code: 'CA',
    slug: 'california',
    tagline: 'Silicon Valley AI, Cloud Computing & Global Tech Epicenter',
    metaDescription: 'Complete 2026 California US Visa & Job Guide. Top H-1B sponsors in Silicon Valley, state income tax breakdown, $180k+ tech salary benchmarks, and cost of living.',
    badgeColor: '#C084FC',
    heroBgGradient: 'from-purple-900/40 via-indigo-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$178,500',
      h1bApprovalRank: '#1 in USA (75,000+ Filings)',
      stateIncomeTax: '1.0% – 13.3% (Highest in US)',
      medianRent: '$2,850 / mo',
      costOfLivingIndex: 138,
      eVerifyRank: '#1 Active Mandate Compliance'
    },
    keyHubs: ['San Francisco Bay Area', 'Silicon Valley (San Jose/Palo Alto)', 'Los Angeles (Silicon Beach)', 'San Diego Biotech Cluster'],
    topSponsors: [
      { name: 'Google (Alphabet)', industry: 'AI & Cloud Software', h1bApprovals: '4,200+', medianSalary: '$195,000', eVerify: true, day1GreenCard: true },
      { name: 'Apple', industry: 'Hardware & OS Engineering', h1bApprovals: '2,800+', medianSalary: '$185,000', eVerify: true, day1GreenCard: true },
      { name: 'Meta (Facebook)', industry: 'AI Research & Social Tech', h1bApprovals: '2,400+', medianSalary: '$205,000', eVerify: true, day1GreenCard: true },
      { name: 'Nvidia', industry: 'Semiconductors & GPU AI', h1bApprovals: '1,950+', medianSalary: '$198,000', eVerify: true, day1GreenCard: true },
      { name: 'Salesforce', industry: 'Enterprise SaaS & Cloud', h1bApprovals: '1,400+', medianSalary: '$172,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'Stanford University & Healthcare', type: 'Research University', city: 'Stanford / Palo Alto', highlight: 'Zero H-1B lottery cap, top AI & biomedical research appointments.' },
      { name: 'University of California System (UC Berkeley / UCLA / UCSF)', type: 'Research University', city: 'Statewide', highlight: 'Sponsors 3,000+ international postdocs, faculty, and research scientists.' },
      { name: 'Cedars-Sinai Medical Center', type: 'Medical Center / Hospital', city: 'Los Angeles', highlight: 'High-volume Schedule A nurse and medical specialist EB-3/H-1B filings.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 10850,
      ficaTax: 11475,
      netTakeHome: 102275,
      effectiveTaxRate: '31.8%',
      comparisonNote: 'California progressive income tax ranges from 1% to 13.3%. High gross base salaries ($175k+) offset state tax, but housing costs require disciplined budgeting.'
    },
    discussions: [
      {
        question: 'Can I work remotely from another state for a California-based tech employer without paying CA state tax?',
        authorRole: 'Senior Cloud Architect (H-1B)',
        answer: 'Yes. California taxes non-resident employees based on physical location of service performance (source of income), not employer headquarters location. If you reside and work physically in Texas or Washington, you owe 0% CA state income tax, provided your payroll is properly coded to your physical state.',
        upvotes: 142
      },
      {
        question: 'Do Silicon Valley employers sponsor EB-2 NIW or Day 1 Green Cards for foreign engineers?',
        authorRole: 'Immigration Legal Specialist',
        answer: 'Most top-tier California tech companies (Google, Meta, Apple, Salesforce) initiate PERM labor certification within 6 to 12 months of employment. Furthermore, STEM Master’s holders can independently file self-petitioned EB-2 NIW without needing employer permission.',
        upvotes: 98
      }
    ],
    insiderTips: [
      'Target E-Verify employers in the South Bay (Sunnyvale, Mountain View) for maximum STEM OPT extension support.',
      'Consider living in East Bay (Fremont, Oakland) or Peninsula suburbs to balance commute with BART/Caltrain access.',
      'Schedule A Nurses in Northern California enjoy the highest base hourly wages in the US ($65–$95/hr).'
    ]
  },
  'texas': {
    name: 'Texas',
    code: 'TX',
    slug: 'texas',
    tagline: 'Silicon Hills, Energy Tech & Zero State Income Tax Tech Haven',
    metaDescription: 'Explore 2026 Texas H-1B Visa Sponsorship Jobs in Austin, Dallas & Houston. 0% State Income Tax, $145k+ salaries, and top enterprise employers.',
    badgeColor: '#38BDF8',
    heroBgGradient: 'from-sky-900/40 via-blue-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$148,200',
      h1bApprovalRank: '#2 in USA (58,000+ Filings)',
      stateIncomeTax: '0.0% (Zero State Income Tax)',
      medianRent: '$1,650 / mo',
      costOfLivingIndex: 93,
      eVerifyRank: '#2 in USA Enterprise Hiring'
    },
    keyHubs: ['Austin (Silicon Hills)', 'Dallas-Fort Worth (Telecom & Finance Corridor)', 'Houston (Energy Tech & Medical Center)', 'San Antonio (Cybersecurity Hub)'],
    topSponsors: [
      { name: 'Tesla / Gigafactory Texas', industry: 'EV, AI Robotics & Energy', h1bApprovals: '1,650+', medianSalary: '$155,000', eVerify: true, day1GreenCard: true },
      { name: 'Dell Technologies', industry: 'Enterprise Cloud & Compute', h1bApprovals: '1,800+', medianSalary: '$142,000', eVerify: true, day1GreenCard: true },
      { name: 'Texas Instruments', industry: 'Semiconductors & Hardware', h1bApprovals: '1,100+', medianSalary: '$138,000', eVerify: true, day1GreenCard: true },
      { name: 'Oracle (Austin HQ)', industry: 'Cloud Infrastructure & Database', h1bApprovals: '2,100+', medianSalary: '$162,000', eVerify: true, day1GreenCard: true },
      { name: 'JPMorgan Chase (Plano Hub)', industry: 'FinTech & Banking Engineering', h1bApprovals: '1,900+', medianSalary: '$145,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'MD Anderson Cancer Center (Houston)', type: 'Medical Center / Hospital', city: 'Houston', highlight: '#1 Cancer Center in the US with massive cap-exempt H-1B and EB-2 medical researcher sponsorship.' },
      { name: 'University of Texas System (UT Austin / UT Dallas)', type: 'Research University', city: 'Austin / Dallas', highlight: 'Premier STEM research institutions offering full Graduate Assistantships (RA/TA) and zero lottery H-1B.' },
      { name: 'Texas A&M University Health Science Center', type: 'Research University', city: 'College Station / Houston', highlight: 'Over 1,200 foreign research scholars and faculty on cap-exempt visas.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 0,
      ficaTax: 11475,
      netTakeHome: 113125,
      effectiveTaxRate: '24.6%',
      comparisonNote: 'With 0% state income tax, an engineer in Austin or Dallas retains $10,850+ MORE net take-home pay every year compared to California on the exact same $150k gross salary.'
    },
    discussions: [
      {
        question: 'Why are tech workers migrating from California to Texas in 2026?',
        authorRole: 'Principal Systems Engineer',
        answer: 'The combination of 0% state income tax, lower real estate prices, and the relocation of enterprise HQs (Tesla, Oracle, Hewlett Packard Enterprise, Dell) gives tech workers 30% to 40% more purchasing power while maintaining top-tier compensation.',
        upvotes: 215
      },
      {
        question: 'Is Texas Medical Center in Houston good for international nurse Green Cards?',
        authorRole: 'Clinical Nurse Manager (Schedule A EB-3)',
        answer: 'TMC is the largest medical complex in the world. Texas hospitals routinely sponsor international nurses under Schedule A EB-3 with sign-on bonuses between $12,000 and $20,000 and fast-tracked licensure endorsement.',
        upvotes: 167
      }
    ],
    insiderTips: [
      'Austin has no state income tax, but property taxes are higher if buying a home. Renting first during your H-1B transition maximizes net savings.',
      'Plano/Frisco north of Dallas is one of the fastest-growing FinTech and AI engineering corridors in the nation.',
      'Houston energy transition sectors (Hydrogen, Carbon Capture, Battery Storage) are aggressively sponsoring chemical and mechanical engineers.'
    ]
  },
  'new-york': {
    name: 'New York',
    code: 'NY',
    slug: 'new-york',
    tagline: 'Wall Street FinTech, Media Tech & Global Commerce Epicenter',
    metaDescription: 'Find 2026 New York H-1B Visa Sponsorship Jobs in NYC. Wall Street quantitative finance salaries, healthcare Schedule A nursing, and NY state tax rates.',
    badgeColor: '#F59E0B',
    heroBgGradient: 'from-amber-900/40 via-yellow-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$172,000',
      h1bApprovalRank: '#3 in USA (49,000+ Filings)',
      stateIncomeTax: '4.0% – 10.9% (+ 3.876% NYC Local)',
      medianRent: '$3,400 / mo',
      costOfLivingIndex: 142,
      eVerifyRank: '#3 in USA Financial Hubs'
    },
    keyHubs: ['New York City (Manhattan & Brooklyn)', 'Long Island Biotech', 'Albany Tech Valley (Nanotechnology)', 'Westchester Healthcare Corridor'],
    topSponsors: [
      { name: 'Goldman Sachs', industry: 'Investment Banking & FinTech', h1bApprovals: '2,200+', medianSalary: '$185,000', eVerify: true, day1GreenCard: true },
      { name: 'JPMorgan Chase & Co. (NYC HQ)', industry: 'Quantitative Finance & Banking Tech', h1bApprovals: '3,100+', medianSalary: '$178,000', eVerify: true, day1GreenCard: true },
      { name: 'Bloomberg LP', industry: 'Financial Data & Systems', h1bApprovals: '1,500+', medianSalary: '$182,000', eVerify: true, day1GreenCard: true },
      { name: 'Citadel & Citadel Securities', industry: 'Quantitative Trading & AI Research', h1bApprovals: '750+', medianSalary: '$240,000', eVerify: true, day1GreenCard: true },
      { name: 'Google (NYC Campus)', industry: 'Cloud & Consumer Apps', h1bApprovals: '1,850+', medianSalary: '$190,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'Memorial Sloan Kettering Cancer Center', type: 'Medical Center / Hospital', city: 'New York City', highlight: 'World-renowned oncology hospital sponsoring hundreds of cap-exempt doctors, scientists, and clinical data engineers.' },
      { name: 'Columbia University & NYU', type: 'Research University', city: 'New York City', highlight: 'Massive cap-exempt academic appointments, research labs, and graduate assistantships.' },
      { name: 'NewYork-Presbyterian Hospital', type: 'Medical Center / Hospital', city: 'New York City', highlight: 'Premier hospital system sponsoring international RNs with high shift differentials ($55–$75/hr).' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 8850,
      ficaTax: 11475,
      netTakeHome: 98460,
      effectiveTaxRate: '34.4%',
      comparisonNote: 'Living inside NYC five boroughs incurs NYC resident local tax (~3.88%). Commuting from New Jersey or Westchester avoids the NYC city income tax.'
    },
    discussions: [
      {
        question: 'How do quantitative trading firms like Citadel and Two Sigma handle H-1B and Green Card sponsorship in NY?',
        authorRole: 'Quantitative Researcher',
        answer: 'Top NY quant funds sponsor O-1 extraordinary ability visas and EB-1/EB-2 NIW petitions immediately, offering expedited premium processing and legal budgets of $15,000+ per candidate.',
        upvotes: 189
      },
      {
        question: 'Is it better to live in Jersey City / Hoboken while working in Manhattan?',
        authorRole: 'FinTech Software Engineer',
        answer: 'Yes! Living in New Jersey allows you to avoid NYC local income tax (3.88%), saving roughly $5,000 to $8,000/year while being only 15 minutes away via PATH train.',
        upvotes: 243
      }
    ],
    insiderTips: [
      'New York State offers automatic application fee waivers to several state university (SUNY) graduate programs during open house weeks.',
      'Manhattan tech compensation packages frequently include high annual cash bonuses (20% to 50% of base salary) in quantitative finance.',
      'International nurses in NYC benefit from strong unionized compensation scales under NYSNA contracts.'
    ]
  },
  'washington': {
    name: 'Washington',
    code: 'WA',
    slug: 'washington',
    tagline: 'Seattle Cloud Infrastructure, AI & 0% State Income Tax',
    metaDescription: 'Complete 2026 Washington State H-1B Sponsorship & Tech Job Guide. Seattle Amazon & Microsoft salaries, 0% state income tax, and STEM OPT hiring.',
    badgeColor: '#10B981',
    heroBgGradient: 'from-emerald-900/40 via-teal-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$182,000',
      h1bApprovalRank: '#4 in USA (42,000+ Filings)',
      stateIncomeTax: '0.0% (Zero State Income Tax)',
      medianRent: '$2,350 / mo',
      costOfLivingIndex: 118,
      eVerifyRank: '#1 Cloud Engineering Density'
    },
    keyHubs: ['Seattle Downtown & South Lake Union', 'Bellevue / Redmond (Tech Eastside)', 'Kirkland & Bothell (Biotech Hub)', 'Tacoma / Olympia'],
    topSponsors: [
      { name: 'Amazon (Seattle HQ)', industry: 'Cloud AWS, AI & E-Commerce', h1bApprovals: '6,400+', medianSalary: '$180,000', eVerify: true, day1GreenCard: true },
      { name: 'Microsoft (Redmond HQ)', industry: 'AI, Cloud Azure & Enterprise Software', h1bApprovals: '4,100+', medianSalary: '$178,000', eVerify: true, day1GreenCard: true },
      { name: 'Google (Seattle/Kirkland Campus)', industry: 'Cloud & Kubernetes Infrastructure', h1bApprovals: '1,600+', medianSalary: '$192,000', eVerify: true, day1GreenCard: true },
      { name: 'Meta (Seattle Engineering)', industry: 'AI Infrastructure & Systems', h1bApprovals: '1,200+', medianSalary: '$202,000', eVerify: true, day1GreenCard: true },
      { name: 'F5 Networks', industry: 'Application Security & Multi-Cloud', h1bApprovals: '380+', medianSalary: '$158,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'University of Washington (UW) & UW Medicine', type: 'Research University', city: 'Seattle', highlight: '#1 Computer Science (Paul G. Allen School) and world-renowned cap-exempt biomedical research.' },
      { name: 'Fred Hutchinson Cancer Center', type: 'Non-Profit Research Lab', city: 'Seattle', highlight: 'Premier cap-exempt research institute with extensive foreign postdoc and clinical investigator visas.' },
      { name: 'Washington State University (WSU)', type: 'Research University', city: 'Pullman / Spokane', highlight: 'Statewide research institution offering graduate teaching & research assistantships.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 0,
      ficaTax: 11475,
      netTakeHome: 113125,
      effectiveTaxRate: '24.6%',
      comparisonNote: 'With 0% state income tax and median tech base salaries exceeding $180k, Washington state offers one of the highest net wealth accumulation rates in the world.'
    },
    discussions: [
      {
        question: 'Why do Amazon and Microsoft file so many H-1B transfers to Seattle and Bellevue?',
        authorRole: 'Principal Cloud Architect',
        answer: 'Washington state provides zero state income tax and a massive concentration of enterprise cloud infrastructure. Both companies have dedicated in-house immigration teams that initiate Green Card PERM processing within the first 6 months of employment.',
        upvotes: 178
      }
    ],
    insiderTips: [
      'Take advantage of public transit (Sound Transit light rail) connecting Seattle, Bellevue, and SeaTac airport to reduce transportation costs.',
      'Target AWS and Azure teams during university campus recruitment for streamlined STEM OPT and H-1B lottery filings.',
      'Bothell and South Lake Union are rapidly expanding biotech clusters offering Schedule A nursing and biomedical informatics roles.'
    ]
  },
  'massachusetts': {
    name: 'Massachusetts',
    code: 'MA',
    slug: 'massachusetts',
    tagline: 'Boston Biotech, Academic Research & Kendall Square Innovation',
    metaDescription: 'Explore 2026 Massachusetts H-1B Visa & Biotech Jobs in Boston & Cambridge. Harvard/MIT cap-exempt research hubs, life sciences salaries, and visa sponsors.',
    badgeColor: '#6366F1',
    heroBgGradient: 'from-indigo-900/40 via-violet-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$164,000',
      h1bApprovalRank: '#5 in USA (34,000+ Filings)',
      stateIncomeTax: '5.0% Flat (+ 4% surtax over $1M)',
      medianRent: '$2,700 / mo',
      costOfLivingIndex: 132,
      eVerifyRank: '#1 in Biotech & Life Sciences'
    },
    keyHubs: ['Cambridge (Kendall Square - Biotech Capital)', 'Boston (FinTech & Healthcare Corridor)', 'Route 128 Tech Belt (Waltham/Burlington)', 'Worcester Biomedical Hub'],
    topSponsors: [
      { name: 'Moderna', industry: 'Biotechnology & mRNA Therapeutics', h1bApprovals: '650+', medianSalary: '$158,000', eVerify: true, day1GreenCard: true },
      { name: 'Biogen', industry: 'Neuroscience & Pharma', h1bApprovals: '450+', medianSalary: '$152,000', eVerify: true, day1GreenCard: true },
      { name: 'Wayfair (Boston HQ)', industry: 'E-Commerce & Supply Chain Tech', h1bApprovals: '850+', medianSalary: '$148,000', eVerify: true, day1GreenCard: true },
      { name: 'Fidelity Investments (Boston HQ)', industry: 'WealthTech & Financial Engineering', h1bApprovals: '1,400+', medianSalary: '$155,000', eVerify: true, day1GreenCard: true },
      { name: 'Amazon (Boston Tech Hub)', industry: 'Robotics & Speech AI', h1bApprovals: '1,100+', medianSalary: '$180,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'Harvard University & Harvard Medical School', type: 'Research University', city: 'Cambridge / Boston', highlight: 'Global academic leader with thousands of cap-exempt research fellow and faculty visas.' },
      { name: 'Massachusetts Institute of Technology (MIT)', type: 'Research University', city: 'Cambridge', highlight: 'Premier STEM institution offering full graduate assistantship tuition waivers and rolling H-1B filings.' },
      { name: 'Massachusetts General Hospital (Mass General Brigham)', type: 'Medical Center / Hospital', city: 'Boston', highlight: 'Largest hospital-based research program in the US with top Schedule A nurse sponsorship.' },
      { name: 'Broad Institute of MIT and Harvard', type: 'Non-Profit Research Lab', city: 'Cambridge', highlight: 'Genomics and computational biology leader with 100% cap-exempt visa infrastructure.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 7500,
      ficaTax: 11475,
      netTakeHome: 105625,
      effectiveTaxRate: '29.6%',
      comparisonNote: 'Massachusetts has a flat 5.0% state income tax. High research grant funding and venture capital density make Kendall Square the top life sciences market globally.'
    },
    discussions: [
      {
        question: 'Is Kendall Square in Cambridge the best place for foreign biotech and AI researchers?',
        authorRole: 'Senior Computational Biologist',
        answer: 'Kendall Square has the highest concentration of biotech and life sciences startups in the world. Being adjacent to MIT and Harvard provides unmatched networking, cap-exempt transition opportunities, and high EB-2 NIW approval rates.',
        upvotes: 156
      }
    ],
    insiderTips: [
      'Kendall Square in Cambridge is often called "the most innovative square mile on the planet" for biomedical research.',
      'Check the MBTA Red Line and Green Line maps to find more affordable rental housing in Somerville, Medford, or Quincy.',
      'UMass system universities (Amherst, Boston, Lowell, Dartmouth) offer generous graduate assistantships and application fee waivers.'
    ]
  },
  'illinois': {
    name: 'Illinois',
    code: 'IL',
    slug: 'illinois',
    tagline: 'Chicago Financial Trading, Enterprise Tech & Logistics Hub',
    metaDescription: '2026 Illinois H-1B Visa Sponsorship Jobs in Chicago. Quantitative trading salaries, healthcare Schedule A nursing, and IL flat tax rates.',
    badgeColor: '#F97316',
    heroBgGradient: 'from-orange-900/40 via-amber-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$142,000',
      h1bApprovalRank: '#6 in USA (28,000+ Filings)',
      stateIncomeTax: '4.95% Flat Rate',
      medianRent: '$1,850 / mo',
      costOfLivingIndex: 98,
      eVerifyRank: '#1 in Algorithmic Trading'
    },
    keyHubs: ['Chicago (The Loop & Fulton Market Tech Hub)', 'Schaumburg / Naperville (Suburban Tech Corridor)', 'Urbana-Champaign (AI & Engineering Epicenter)'],
    topSponsors: [
      { name: 'Citadel LLC (Chicago Office)', industry: 'Quantitative Finance & Market Making', h1bApprovals: '600+', medianSalary: '$220,000', eVerify: true, day1GreenCard: true },
      { name: 'DRW & Jump Trading', industry: 'Proprietary Trading & Algorithms', h1bApprovals: '450+', medianSalary: '$210,000', eVerify: true, day1GreenCard: true },
      { name: 'Northern Trust', industry: 'WealthTech & Financial Services', h1bApprovals: '850+', medianSalary: '$135,000', eVerify: true, day1GreenCard: true },
      { name: 'Motorola Solutions', industry: 'Telecommunications & Cloud Security', h1bApprovals: '420+', medianSalary: '$138,000', eVerify: true, day1GreenCard: true },
      { name: 'United Airlines (Chicago HQ)', industry: 'Aviation Tech & Operations Research', h1bApprovals: '550+', medianSalary: '$140,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'University of Chicago & UChicago Medicine', type: 'Research University', city: 'Chicago', highlight: 'World-leading economics and medical research with full cap-exempt visa support.' },
      { name: 'Northwestern University & Northwestern Memorial', type: 'Research University', city: 'Evanston / Chicago', highlight: 'Top biomedical, engineering, and data science research appointments.' },
      { name: 'University of Illinois Urbana-Champaign (UIUC)', type: 'Research University', city: 'Urbana-Champaign', highlight: 'Top 5 engineering institution in the US with hundreds of funded graduate assistantships.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 7425,
      ficaTax: 11475,
      netTakeHome: 105700,
      effectiveTaxRate: '29.5%',
      comparisonNote: 'Illinois has a simple flat 4.95% state income tax. Chicago offers world-class metropolitan amenities at a significantly lower cost of living than NYC or San Francisco.'
    },
    discussions: [
      {
        question: 'How does Chicago quantitative trading compensation compare to New York?',
        authorRole: 'C++ Quantitative Developer',
        answer: 'Chicago prop trading firms (Jump, DRW, IMC, Optiver) offer base salaries and bonus structures that rival or exceed NYC Wall Street funds, with a much lower cost of living and 4.95% flat state tax.',
        upvotes: 147
      }
    ],
    insiderTips: [
      'UIUC produces some of the most sought-after computer engineering graduates in Silicon Valley and Chicago.',
      'The CTA train system (L-train) makes commuting throughout Chicago convenient without requiring a personal vehicle.',
      'Fulton Market is Chicago’s premier tech hub housing major Google and tech engineering campuses.'
    ]
  },
  'florida': {
    name: 'Florida',
    code: 'FL',
    slug: 'florida',
    tagline: 'Miami Tech, Aerospace Corridor & 0% State Income Tax',
    metaDescription: 'Find 2026 Florida H-1B Visa & Remote USD Jobs. Miami FinTech, Tampa tech corridors, 0% state income tax, and healthcare nurse green cards.',
    badgeColor: '#EC4899',
    heroBgGradient: 'from-pink-900/40 via-rose-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$135,000',
      h1bApprovalRank: '#7 in USA (24,000+ Filings)',
      stateIncomeTax: '0.0% (Zero State Income Tax)',
      medianRent: '$1,950 / mo',
      costOfLivingIndex: 101,
      eVerifyRank: '#2 in Remote Contractor Relocation'
    },
    keyHubs: ['Miami (FinTech & Crypto Hub)', 'Tampa Bay (Cybersecurity & HealthTech)', 'Orlando (Simulation, Gaming & Aerospace)', 'Space Coast (Melbourne/Cape Canaveral)'],
    topSponsors: [
      { name: 'Citigroup (Tampa Operations Hub)', industry: 'FinTech & Banking Infrastructure', h1bApprovals: '1,450+', medianSalary: '$132,000', eVerify: true, day1GreenCard: true },
      { name: 'NextEra Energy / FPL', industry: 'Clean Energy & Grid Systems', h1bApprovals: '450+', medianSalary: '$128,000', eVerify: true, day1GreenCard: true },
      { name: 'Ultimate Kronos Group (UKG - Weston)', industry: 'Human Capital Cloud SaaS', h1bApprovals: '550+', medianSalary: '$142,000', eVerify: true, day1GreenCard: true },
      { name: 'Raymond James Financial (St. Petersburg)', industry: 'Wealth Management Tech', h1bApprovals: '380+', medianSalary: '$130,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'University of Florida (UF) & UF Health', type: 'Research University', city: 'Gainesville / Jacksonville', highlight: 'Top 5 public research university with large AI supercomputer (HiPerGator) research programs.' },
      { name: 'University of Miami & Miller School of Medicine', type: 'Research University', city: 'Miami / Coral Gables', highlight: 'Premier research hub for biotech, infectious diseases, and tropical medicine.' },
      { name: 'Moffitt Cancer Center', type: 'Medical Center / Hospital', city: 'Tampa', highlight: 'NCI-designated cancer center sponsoring international oncologists and research scientists.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 0,
      ficaTax: 11475,
      netTakeHome: 113125,
      effectiveTaxRate: '24.6%',
      comparisonNote: 'Zero state income tax and year-round warm climate have made Florida a top destination for remote USD contractors and international tech relocations.'
    },
    discussions: [
      {
        question: 'Can remote USD contractors live in Florida to maximize take-home income?',
        authorRole: 'Remote Solutions Consultant',
        answer: 'Yes! Florida has 0% state income tax. If you work remotely on a W-8BEN or domestic contractor agreement, residing in Florida maximizes your net earnings.',
        upvotes: 165
      }
    ],
    insiderTips: [
      'Tampa and Orlando offer lower housing costs than Miami while hosting major enterprise finance and aerospace corridors.',
      'Florida healthcare systems are aggressively hiring foreign nurses with comprehensive NCLEX endorsement programs.',
      'UF in Gainesville has one of the most advanced academic AI supercomputing clusters in the nation.'
    ]
  },
  'north-carolina': {
    name: 'North Carolina',
    code: 'NC',
    slug: 'north-carolina',
    tagline: 'Research Triangle Park (RTP), Biotech & Apple/Google Hub',
    metaDescription: '2026 North Carolina H-1B Sponsorship & Tech Jobs in Raleigh-Durham RTP & Charlotte. Top biopharma sponsors, low state tax, and top university hubs.',
    badgeColor: '#06B6D4',
    heroBgGradient: 'from-cyan-900/40 via-sky-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$146,000',
      h1bApprovalRank: '#8 in USA (22,000+ Filings)',
      stateIncomeTax: '4.5% Flat Rate (Dropping to 3.99%)',
      medianRent: '$1,550 / mo',
      costOfLivingIndex: 94,
      eVerifyRank: '#1 in Research Park Density'
    },
    keyHubs: ['Research Triangle Park (Raleigh, Durham, Chapel Hill)', 'Charlotte (Banking & FinTech Capital)', 'Winston-Salem (Biotech Corridor)'],
    topSponsors: [
      { name: 'Bank of America (Charlotte HQ)', industry: 'Banking & Financial Technology', h1bApprovals: '2,100+', medianSalary: '$150,000', eVerify: true, day1GreenCard: true },
      { name: 'Cisco Systems (RTP Campus)', industry: 'Networking, Cloud & Security', h1bApprovals: '1,200+', medianSalary: '$155,000', eVerify: true, day1GreenCard: true },
      { name: 'SAS Institute (Cary HQ)', industry: 'Analytics & Enterprise AI', h1bApprovals: '650+', medianSalary: '$140,000', eVerify: true, day1GreenCard: true },
      { name: 'Fidelity Investments (RTP Tech Center)', industry: 'Financial Systems', h1bApprovals: '950+', medianSalary: '$145,000', eVerify: true, day1GreenCard: true },
      { name: 'Red Hat / IBM (Raleigh HQ)', industry: 'Open Source & Linux Cloud', h1bApprovals: '750+', medianSalary: '$152,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'Duke University & Duke Health', type: 'Research University', city: 'Durham', highlight: 'World-renowned medical research and engineering institution with 100% cap-exempt visa filings.' },
      { name: 'University of North Carolina at Chapel Hill (UNC)', type: 'Research University', city: 'Chapel Hill', highlight: 'Top public research institution with extensive NIH funding and funded graduate programs.' },
      { name: 'North Carolina State University (NC State)', type: 'Research University', city: 'Raleigh', highlight: 'Centennial Campus hub partnered with leading tech and pharma enterprise labs.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 6750,
      ficaTax: 11475,
      netTakeHome: 106375,
      effectiveTaxRate: '29.1%',
      comparisonNote: 'North Carolina is lowering its flat state income tax rate to 3.99%. Combined with low median rent ($1,550/mo), RTP offers exceptional quality of life.'
    },
    discussions: [
      {
        question: 'Why is Research Triangle Park (RTP) considered the best balance of tech salaries and living costs?',
        authorRole: 'Senior Data Architect',
        answer: 'RTP has satellite campuses for Apple, Google, Cisco, and Microsoft paying coastal salaries ($150k–$190k) while real estate and rental prices are less than half of Silicon Valley or Seattle.',
        upvotes: 184
      }
    ],
    insiderTips: [
      'Charlotte is the second-largest banking center in the US after New York City.',
      'RTP is one of the largest dedicated research parks in North America, spanning 7,000 acres.',
      'Duke and UNC Chapel Hill offer comprehensive application fee waiver programs for graduate international applicants.'
    ]
  },
  'georgia': {
    name: 'Georgia',
    code: 'GA',
    slug: 'georgia',
    tagline: 'Atlanta FinTech, Logistics AI & Georgia Tech Innovation Hub',
    metaDescription: 'Find 2026 Georgia H-1B Visa Sponsorship Jobs in Atlanta. FinTech Transaction Alley salaries, Georgia Tech cap-exempt research, and healthcare jobs.',
    badgeColor: '#EAB308',
    heroBgGradient: 'from-yellow-900/40 via-amber-950/30 to-slate-950',
    stats: {
      avgTechSalary: '$141,000',
      h1bApprovalRank: '#9 in USA (19,000+ Filings)',
      stateIncomeTax: '5.39% Flat Rate (Decreasing)',
      medianRent: '$1,600 / mo',
      costOfLivingIndex: 92,
      eVerifyRank: '#1 in Payment Processing Tech'
    },
    keyHubs: ['Atlanta (Midtown Tech Square & Buckhead)', 'Alpharetta (FinTech & Telecom Corridor)', 'Savannah (Logistics & Port Tech)'],
    topSponsors: [
      { name: 'The Home Depot (Atlanta HQ)', industry: 'Retail Cloud & Supply Chain Tech', h1bApprovals: '1,100+', medianSalary: '$138,000', eVerify: true, day1GreenCard: true },
      { name: 'NCR Voyix & NCR Atleos', industry: 'FinTech, Point-of-Sale & Banking Tech', h1bApprovals: '750+', medianSalary: '$135,000', eVerify: true, day1GreenCard: true },
      { name: 'Global Payments (Atlanta HQ)', industry: 'Payment Processing & FinTech', h1bApprovals: '600+', medianSalary: '$132,000', eVerify: true, day1GreenCard: true },
      { name: 'Delta Air Lines (Atlanta HQ)', industry: 'Aviation Tech & Cloud Systems', h1bApprovals: '500+', medianSalary: '$140,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'Georgia Institute of Technology (Georgia Tech)', type: 'Research University', city: 'Atlanta', highlight: '#1 Engineering and Computing research ecosystem with massive cap-exempt research fellow sponsorships.' },
      { name: 'Emory University & Emory Healthcare', type: 'Research University', city: 'Atlanta', highlight: 'Premier health research institution and hospital network with high Schedule A nurse recruitment.' },
      { name: 'Centers for Disease Control and Prevention (CDC)', type: 'Non-Profit Research Lab', city: 'Atlanta', highlight: 'Federal health agency research partner with specialized foreign scientific scholar visas.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 8085,
      ficaTax: 11475,
      netTakeHome: 105040,
      effectiveTaxRate: '30.0%',
      comparisonNote: 'Over 70% of all US payment transactions flow through Atlanta’s "Transaction Alley" FinTech corridor, creating immense demand for backend and security engineers.'
    },
    discussions: [
      {
        question: 'Why is Atlanta known as the FinTech capital of the United States?',
        authorRole: 'FinTech Lead Engineer',
        answer: 'Over 70% of all debit, credit, and gift card transactions in the US are processed by companies headquartered in the Atlanta metro area (NCR, Global Payments, FIS, TSYS).',
        upvotes: 139
      }
    ],
    insiderTips: [
      'Tech Square in Midtown Atlanta is adjacent to Georgia Tech and serves as the epicenter for corporate innovation centers.',
      'Alpharetta is known as the "Technology City of the South" with over 700 tech companies.',
      'Emory Healthcare is one of the largest employers of international registered nurses in the Southeast.'
    ]
  },
  'virginia': {
    name: 'Virginia',
    code: 'VA',
    slug: 'virginia',
    tagline: 'Cloud Data Center Alley, Defense Tech & DC Metro Corridor',
    metaDescription: '2026 Virginia H-1B Visa & Cloud Engineering Jobs. Northern Virginia AWS Data Center Alley, defense contracting, and state tax benchmarks.',
    badgeColor: '#3B82F6',
    heroBgGradient: 'from-blue-900/40 via-slate-950/40 to-slate-950',
    stats: {
      avgTechSalary: '$152,000',
      h1bApprovalRank: '#10 in USA (18,500+ Filings)',
      stateIncomeTax: '2.0% – 5.75% Progressive',
      medianRent: '$2,150 / mo',
      costOfLivingIndex: 108,
      eVerifyRank: '#1 in Cloud Infrastructure Density'
    },
    keyHubs: ['Northern Virginia (NoVA - Tysons, Reston, Ashburn)', 'Arlington (Amazon HQ2 Corridor)', 'Richmond (State Capital & FinTech)', 'Blacksburg (Virginia Tech Hub)'],
    topSponsors: [
      { name: 'Amazon (HQ2 Arlington & AWS NoVA)', industry: 'Cloud AWS & Enterprise Software', h1bApprovals: '2,800+', medianSalary: '$175,000', eVerify: true, day1GreenCard: true },
      { name: 'Capital One (McLean HQ)', industry: 'FinTech & Cloud Banking', h1bApprovals: '1,650+', medianSalary: '$160,000', eVerify: true, day1GreenCard: true },
      { name: 'General Dynamics Information Technology', industry: 'Defense Tech & Systems', h1bApprovals: '450+', medianSalary: '$140,000', eVerify: true, day1GreenCard: true },
      { name: 'Booz Allen Hamilton (McLean)', industry: 'Management Consulting & Analytics', h1bApprovals: '550+', medianSalary: '$145,000', eVerify: true, day1GreenCard: true }
    ],
    capExemptInstitutions: [
      { name: 'Virginia Tech & VT Innovation Campus (Alexandria)', type: 'Research University', city: 'Blacksburg / Alexandria', highlight: 'Top computer science and engineering research appointments.' },
      { name: 'University of Virginia (UVA) & UVA Health', type: 'Research University', city: 'Charlottesville', highlight: 'Top public research institution with high-volume graduate funding.' },
      { name: 'George Mason University (GMU)', type: 'Research University', city: 'Fairfax', highlight: 'Major cybersecurity and data science hub in the NoVA region.' }
    ],
    taxAnalysis: {
      grossSalary: 150000,
      federalTax: 25400,
      stateTax: 8250,
      ficaTax: 11475,
      netTakeHome: 104875,
      effectiveTaxRate: '30.1%',
      comparisonNote: 'Loudoun County (Ashburn) carries over 70% of the world’s internet traffic through "Data Center Alley", driving massive cloud infrastructure engineer demand.'
    },
    discussions: [
      {
        question: 'How is the job market in Northern Virginia with Amazon HQ2?',
        authorRole: 'Senior Cloud Solutions Architect',
        answer: 'Amazon HQ2 in Arlington has anchored hundreds of cloud, cybersecurity, and consulting firms across Tysons, Reston, and Crystal City, offering strong STEM OPT and H-1B transfer opportunities.',
        upvotes: 162
      }
    ],
    insiderTips: [
      'Ashburn in Loudoun County is the global capital of cloud data centers ("Data Center Alley").',
      'The Washington Metro Silver Line connects Reston and Ashburn directly to Washington DC.',
      'Capital One’s headquarters in McLean is a major sponsor of quantitative analysts and software engineers.'
    ]
  }
};
