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
      'Citizenship of participating country (Bangladesh, Pakistan, India, Nigeria, Ghana, etc.)',
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
    officialUrl: 'https://grad.gatech.edu/',
    description: 'Georgia Tech provides full tuition waivers and competitive stipends for graduate research assistants working in AI, robotics, wireless systems, and advanced computing laboratories.',
    isFeatured: true
  },
  {
    id: 'sch-005',
    name: 'MIT Presidential & Departmental Graduate Fellowships',
    university: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts',
    degreeLevel: 'Masters & PhD',
    field: 'Architecture, Engineering, Science, Management, Humanities',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$44,000 - $52,000 / year + 100% tuition waiver',
    deadline: 'December 15 - January 5',
    requirements: [
      'Outstanding academic record in undergraduate studies',
      'Strong research portfolio or publications',
      '3 letters of recommendation from research mentors'
    ],
    officialUrl: 'https://gradadmissions.mit.edu/costs-funding',
    description: 'All admitted PhD students at MIT are guaranteed 100% full financial support covering full tuition, individual health insurance, and a substantial living stipend for the normal duration of their program.',
    isFeatured: true
  },
  {
    id: 'sch-006',
    name: 'Harvard University Graduate School of Arts and Sciences Fellowships',
    university: 'Harvard University',
    location: 'Cambridge, Massachusetts',
    degreeLevel: 'PhD Only',
    field: 'Life Sciences, Physical Sciences, Humanities, Social Sciences, Engineering',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$46,000 / year stipend + full tuition & healthcare',
    deadline: 'December 1 - January 5',
    requirements: [
      'Undergraduate degree with high academic honors',
      'Compelling Statement of Purpose and research writing sample',
      'Three academic letters of recommendation'
    ],
    officialUrl: 'https://gsas.harvard.edu/financial-support',
    description: 'Harvard GSAS provides guaranteed multi-year funding packages to all doctoral students including full tuition, health fees, and generous living stipends throughout the 5-year PhD trajectory.',
    isFeatured: true
  },
  {
    id: 'sch-007',
    name: 'Yale University Fully-Funded Doctoral Fellowships',
    university: 'Yale University',
    location: 'New Haven, Connecticut',
    degreeLevel: 'PhD Only',
    field: 'All PhD Programs across Sciences, Engineering, Humanities & Social Sciences',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$48,000 / year stipend + 100% tuition fellowship',
    deadline: 'December 15 - January 2',
    requirements: [
      'Bachelor’s or Master’s degree with strong research credentials',
      'TOEFL / IELTS for non-native English speakers',
      'Statement of Purpose and faculty alignment'
    ],
    officialUrl: 'https://gsas.yale.edu/funding-aid',
    description: 'Every admitted PhD candidate at Yale receives a comprehensive financial award that covers full tuition, comprehensive health insurance, and a living stipend for up to five full years.',
    isFeatured: true
  },
  {
    id: 'sch-008',
    name: 'Rackham International Merit Fellowship',
    university: 'University of Michigan - Ann Arbor',
    location: 'Ann Arbor, Michigan',
    degreeLevel: 'Masters & PhD',
    field: 'All Graduate Disciplines',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: '$36,000 / year stipend + full tuition waiver',
    deadline: 'January 15 (Annual Intake)',
    requirements: [
      'Nomination by U-M academic department upon admission',
      'Outstanding academic record and potential to contribute to field',
      'GRE / English proficiency as required by department'
    ],
    officialUrl: 'https://rackham.umich.edu/funding/',
    description: 'Supports outstanding international graduate students studying at the University of Michigan with full tuition, monthly stipend, and health insurance.',
    isFeatured: false
  },
  {
    id: 'sch-009',
    name: 'Hubert H. Humphrey Fellowship Program (US Dept of State)',
    university: 'Selected Top US Universities',
    location: 'United States (Nationwide)',
    degreeLevel: 'Masters Only',
    field: 'Public Policy, Climate Change, Public Health, Education, Economic Development',
    fundingCoverage: '100% Full Tuition + Monthly Stipend',
    stipendAmount: 'Full living allowance + airfare + professional development fund',
    deadline: 'May - August (Varies by US Embassy)',
    requirements: [
      'Undergraduate degree and minimum 5 years of professional work experience',
      'Demonstrated leadership qualities and public service record',
      'English language proficiency'
    ],
    officialUrl: 'https://www.humphreyfellowship.org',
    description: 'A 10-month non-degree fellowship for mid-career professionals that combines academic coursework with practical work affiliations with US organizations, fully funded by the US Department of State.',
    isFeatured: false
  },
  {
    id: 'sch-010',
    name: 'Clark University Global Scholars Program',
    university: 'Clark University',
    location: 'Worcester, Massachusetts',
    degreeLevel: 'Undergraduate / General',
    field: 'All Undergraduate Majors',
    fundingCoverage: 'Partial / Merit-Based',
    stipendAmount: '$15,000 - $25,000 per year renewable for 4 years',
    deadline: 'February 1 (Fall Semester)',
    requirements: [
      'High school senior with outstanding GPA and leadership record',
      'International applicant demonstrating global citizenship',
      'Common Application with Clark supplemental essay'
    ],
    officialUrl: 'https://www.clarku.edu',
    description: 'Designed for international first-year undergraduate students who demonstrate outstanding academic performance and leadership potential in their communities.',
    isFeatured: false
  }
];
