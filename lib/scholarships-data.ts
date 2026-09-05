export interface USAScholarship {
  id: string;
  name: string;
  university: string;
  location: string;
  degreeLevel: 'Masters & PhD' | 'PhD Only' | 'Masters Only' | 'Undergraduate / General';
  field: string;
  fundingCoverage: '100% Full Tuition + Monthly Stipend' | 'Full Tuition Waiver' | 'Partial / Merit-Based';
  stipendAmount?: string;
  deadline: string;
  requirements: string[];
  officialUrl: string;
  description: string;
  isFeatured?: boolean;
}

export const USA_SCHOLARSHIPS: USAScholarship[] = [
  {
    id: 'sch-001',
    name: 'Knight-Hennessy Scholars Program',
    university: 'Stanford University',
    location: 'Stanford, California',
    degreeLevel: 'Masters & PhD',
    field: 'All Graduate Disciplines (Engineering, Medicine, Business, Humanities, Law)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$45,000 / year + full tuition & health insurance',
    deadline: 'October 2026 (Annual Intake)',
    requirements: [
      'Bachelor’s degree received within the last 7 years',
      'TOEFL / IELTS for international applicants',
      'Statement of Purpose and 3 recommendation letters',
      'Demonstrated leadership, civic mindset, and academic distinction'
    ],
    officialUrl: 'https://knight-hennessy.stanford.edu',
    description: 'One of the most prestigious graduate fellowships in the world. Fully funds any graduate degree at Stanford University, covering 100% tuition, living stipend, travel grant, and leadership development.',
    isFeatured: true
  },
  {
    id: 'sch-002',
    name: 'Fulbright Foreign Student Program (US Department of State)',
    university: 'Top US Universities Nationwide',
    location: 'United States (Nationwide Placement)',
    degreeLevel: 'Masters & PhD',
    field: 'All Academic Fields (STEM, Social Sciences, Education, Public Policy)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: 'Full living allowance + airfare + health insurance',
    deadline: 'May - September (varies by home country embassy)',
    requirements: [
      'Citizenship of participating country (Bangladesh, Pakistan, India, Nigeria, etc.)',
      'Four-year Bachelor’s degree with strong academic record',
      'English proficiency (IELTS minimum 6.5 or TOEFL 80+)',
      'Commitment to return to home country upon program completion (J-1 Visa)'
    ],
    officialUrl: 'https://foreign.fulbrightonline.org',
    description: 'Administered by the US Department of State. Operates in over 160 countries, providing full tuition, monthly stipend, visa sponsorship (J-1), and roundtrip international flights for master’s and doctoral degrees.',
    isFeatured: true
  },
  {
    id: 'sch-003',
    name: 'Graduate Teaching & Research Assistantships (GTA / GRA)',
    university: 'Purdue University',
    location: 'West Lafayette, Indiana',
    degreeLevel: 'Masters & PhD',
    field: 'Engineering, Computer Science, Data, Agriculture & Physical Sciences',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$24,000 - $34,000 / year stipend + tuition remission',
    deadline: 'December 15 - January 15 (Fall Intake)',
    requirements: [
      'Bachelor’s in Engineering, CS, Math, or physical sciences',
      'GPA 3.0+ on 4.0 scale',
      'GRE score (optional or waived in many departments)',
      'TOEFL 80+ or IELTS 6.5+'
    ],
    officialUrl: 'https://www.purdue.edu/gradschool',
    description: 'Over 85% of doctoral and thesis master’s students in STEM at Purdue receive full tuition remission plus a bi-weekly living paycheck by working 20 hours/week as a teaching or research assistant on campus.',
    isFeatured: true
  },
  {
    id: 'sch-004',
    name: 'Graduate Research Assistantship (GRA) & Fellowship',
    university: 'Georgia Institute of Technology (Georgia Tech)',
    location: 'Atlanta, Georgia',
    degreeLevel: 'Masters & PhD',
    field: 'Computing, Cybersecurity, Electrical, Industrial & Mechanical Engineering',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$28,000 - $36,000 / year + tuition waived to $25/sem',
    deadline: 'January 1 (Fall Semester)',
    requirements: [
      'BSc in Computer Science, Electrical Engineering, or related discipline',
      'Statement of Purpose aligning with a Georgia Tech faculty lab',
      'Three letters of academic recommendation',
      'Proficiency in programming and core STEM fundamentals'
    ],
    officialUrl: 'https://grad.gatech.edu/pay-for-grad-school',
    description: 'Georgia Tech provides full tuition waivers and competitive stipends for graduate research assistants working in AI, robotics, wireless systems, and advanced computing laboratories.',
    isFeatured: true
  },
  {
    id: 'sch-005',
    name: 'MIT Presidential & Departmental Graduate Fellowships',
    university: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts',
    degreeLevel: 'PhD Only',
    field: 'Science, Architecture, Engineering, Economics, Artificial Intelligence',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$42,000+ / year + full tuition & comprehensive medical',
    deadline: 'December 15 (Annual)',
    requirements: [
      'Outstanding academic records and rigorous analytical research background',
      'Statement of objectives demonstrating independent scientific thought',
      'Letters of evaluation from academic research mentors'
    ],
    officialUrl: 'https://gradadmissions.mit.edu/costs-funding',
    description: 'MIT guarantees full financial support (tuition, individual health insurance, and 12-month living stipend) for all doctoral candidates in good academic standing.',
    isFeatured: true
  },
  {
    id: 'sch-006',
    name: 'Hubert H. Humphrey Fellowship Program',
    university: 'Participating US Universities (Penn State, Syracuse, UC Davis, etc.)',
    location: 'United States (Nationwide Placement)',
    degreeLevel: 'Undergraduate / General',
    field: 'Public Health, Education, Economic Development, Climate Change, Law',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: 'Full maintenance stipend + professional development grant + travel',
    deadline: 'June - August (Annual)',
    requirements: [
      'Undergraduate degree with 5+ years of professional experience',
      'Demonstrated commitment to public service',
      'English language ability',
      'Leadership potential in public or non-profit sector'
    ],
    officialUrl: 'https://www.humphreyfellowship.org',
    description: 'Brings mid-career professionals from developing countries to the US for a 10-month non-degree academic study and substantive professional affiliation at top American universities.',
    isFeatured: false
  },
  {
    id: 'sch-007',
    name: 'Rotary Peace Fellowship (Duke University & UNC Chapel Hill)',
    university: 'Duke University / UNC Chapel Hill',
    location: 'Durham & Chapel Hill, North Carolina',
    degreeLevel: 'Masters Only',
    field: 'International Development, Conflict Resolution, Public Policy, Peace Studies',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '100% Tuition, room & board, roundtrip transportation, internship funding',
    deadline: 'May 15 (Annual)',
    requirements: [
      'Proficiency in English with minimum 3 years of relevant work experience',
      'Bachelor’s degree with strong academic record',
      'Demonstrated commitment to international peace and community service',
      'Endorsement by local Rotary District'
    ],
    officialUrl: 'https://www.rotary.org/en/our-programs/peace-fellowships',
    description: 'Fully funded master’s program in international relations and peace studies covering tuition, fees, room and board, round-trip transportation, and all internship/field-study expenses.',
    isFeatured: true
  },
  {
    id: 'sch-008',
    name: 'AAUW International Fellowships for Women',
    university: 'Accredited US Universities Nationwide',
    location: 'United States (Any Accredited Institution)',
    degreeLevel: 'Masters & PhD',
    field: 'All Academic Disciplines (STEM, Humanities, Medicine, Business)',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$20,000 (Master’s) to $30,000 (Doctoral) / year stipend',
    deadline: 'November 15 (Annual)',
    requirements: [
      'Open to women holding citizenship in a country other than the U.S.',
      'Hold academic degree equivalent to U.S. bachelor’s degree',
      'Intention to return to home country to pursue a professional career',
      'English language proficiency'
    ],
    officialUrl: 'https://www.aauw.org/resources/programs/fellowships-grants/current-opportunities/international/',
    description: 'Supports international women pursuing full-time graduate or postdoctoral study in the United States. Recipients are selected for academic achievement and demonstrated commitment to women and girls.',
    isFeatured: true
  },
  {
    id: 'sch-009',
    name: 'Yale Fox International Fellowship',
    university: 'Yale University',
    location: 'New Haven, Connecticut',
    degreeLevel: 'Masters & PhD',
    field: 'Social Sciences, Economics, Law, Political Science, International Affairs',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: 'Full living expense stipend + health insurance + travel grant',
    deadline: 'January 15 (Annual)',
    requirements: [
      'Graduate student enrolled in partner international university',
      'Demonstrated research capability on world peace and global policy',
      'Strong letters of academic recommendation'
    ],
    officialUrl: 'https://foxfellowship.yale.edu',
    description: 'A prestigious graduate research fellowship at Yale University designed to enhance mutual understanding between the United States and global academic partners.',
    isFeatured: false
  },
  {
    id: 'sch-010',
    name: 'Texas A&M University Graduate Merit & Assistantship Funding',
    university: 'Texas A&M University',
    location: 'College Station, Texas',
    degreeLevel: 'Masters & PhD',
    field: 'Petroleum, Mechanical & Aerospace Engineering, Data Science, Agriculture',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$26,000 - $32,000 / year + in-state tuition waiver',
    deadline: 'January 1 (Fall Intake)',
    requirements: [
      'Bachelor’s in STEM with strong quantitative GPA',
      'TOEFL 80+ / IELTS 6.5+',
      'Direct faculty advisor matching via research proposal'
    ],
    officialUrl: 'https://grad.tamu.edu/funding-your-education',
    description: 'Texas A&M awards non-resident tuition waivers and graduate research/teaching assistantships to over 70% of enrolled international doctoral and master’s students in technical colleges.',
    isFeatured: true
  }
];

export function getScholarshipsList(): USAScholarship[] {
  return USA_SCHOLARSHIPS;
}
