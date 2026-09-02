export interface USAScholarship {
  id: string;
  name: string;
  university: string;
  location: string;
  degreeLevel: 'Masters & PhD' | 'PhD Only' | 'Masters Only' | 'Undergraduate / General';
  field: string;
  fundingCoverage: '100% Full Tuition + Monthly Stipend' | 'Full Tuition Waiver' | 'Partial / Merit-Based';
  stipendAmount?: string; // e.g., "$28,000 - $38,000 / year"
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
    field: 'All Graduate Disciplines (Engineering, Medicine, Business, Humanities)',
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
      'Citizenship of participating country (Bangladesh, Pakistan, India, etc.)',
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
    field: 'Engineering, Computer Science, Data, Agriculture & Sciences',
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
    field: 'Computing, Cybersecurity, Electrical & Mechanical Engineering',
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
    name: 'Hubert H. Humphrey Fellowship Program',
    university: 'Participating US Universities (Penn State, Syracuse, UC Davis, etc.)',
    location: 'United States',
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
    id: 'sch-006',
    name: 'MIT Presidential & Departmental Graduate Fellowships',
    university: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts',
    degreeLevel: 'PhD Only',
    field: 'Science, Architecture, Engineering, Economics, AI',
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
  }
];

export function getScholarshipsList(): USAScholarship[] {
  return USA_SCHOLARSHIPS;
}
