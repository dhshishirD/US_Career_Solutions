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
    "id": "sch-001",
    "name": "Knight-Hennessy Scholars Program",
    "university": "Stanford University",
    "location": "Stanford, California",
    "degreeLevel": "Masters & PhD",
    "field": "All Graduate Disciplines (Engineering, Medicine, Business, Humanities, Law)",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$45,000 / year + full tuition & health insurance",
    "deadline": "October 2026 (Annual Intake)",
    "requirements": [
      "Bachelor\u2019s degree received within the last 7 years",
      "TOEFL / IELTS for international applicants",
      "Statement of Purpose and 3 recommendation letters",
      "Demonstrated leadership, civic mindset, and academic distinction"
    ],
    "officialUrl": "https://knight-hennessy.stanford.edu",
    "description": "One of the most prestigious graduate fellowships in the world. Fully funds any graduate degree at Stanford University, covering 100% tuition, living stipend, travel grant, and leadership development.",
    "isFeatured": true
  },
  {
    "id": "sch-002",
    "name": "Fulbright Foreign Student Program (US Department of State)",
    "university": "Top US Universities Nationwide",
    "location": "United States (Nationwide Placement)",
    "degreeLevel": "Masters & PhD",
    "field": "All Academic Fields (STEM, Social Sciences, Education, Public Policy)",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "Full living allowance + airfare + health insurance",
    "deadline": "May - September (varies by home country embassy)",
    "requirements": [
      "Citizenship of participating country (Bangladesh, Pakistan, India, Nigeria, Ghana, etc.)",
      "Four-year Bachelor\u2019s degree with strong academic record",
      "English proficiency (IELTS minimum 6.5 or TOEFL 80+)",
      "Commitment to return to home country upon program completion (J-1 Visa)"
    ],
    "officialUrl": "https://foreign.fulbrightonline.org",
    "description": "Administered by the US Department of State. Operates in over 160 countries, providing full tuition, monthly stipend, visa sponsorship (J-1), and roundtrip international flights for master\u2019s and doctoral degrees.",
    "isFeatured": true
  },
  {
    "id": "sch-003",
    "name": "Graduate Teaching & Research Assistantships (GTA / GRA)",
    "university": "Purdue University",
    "location": "West Lafayette, Indiana",
    "degreeLevel": "Masters & PhD",
    "field": "Engineering, Computer Science, Data, Agriculture & Physical Sciences",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$24,000 - $34,000 / year stipend + tuition remission",
    "deadline": "December 15 - January 15 (Fall Intake)",
    "requirements": [
      "Bachelor\u2019s in Engineering, CS, Math, or physical sciences",
      "GPA 3.0+ on 4.0 scale",
      "GRE score (waived in many departments)",
      "TOEFL 80+ or IELTS 6.5+"
    ],
    "officialUrl": "https://www.purdue.edu/gradschool",
    "description": "Over 85% of doctoral and thesis master\u2019s students in STEM at Purdue receive full tuition remission plus a bi-weekly living paycheck by working 20 hours/week as a teaching or research assistant on campus.",
    "isFeatured": true
  },
  {
    "id": "sch-004",
    "name": "Graduate Research Assistantship (GRA) & Fellowship",
    "university": "Georgia Institute of Technology (Georgia Tech)",
    "location": "Atlanta, Georgia",
    "degreeLevel": "Masters & PhD",
    "field": "Computing, Cybersecurity, Electrical, Industrial & Mechanical Engineering",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$28,000 - $36,000 / year + tuition waived to $25/sem",
    "deadline": "January 1 (Fall Semester)",
    "requirements": [
      "BSc in Computer Science, Electrical Engineering, or related discipline",
      "Statement of Purpose aligning with a Georgia Tech faculty lab",
      "Three letters of academic recommendation",
      "Proficiency in programming and core STEM fundamentals"
    ],
    "officialUrl": "https://grad.gatech.edu/",
    "description": "Georgia Tech provides full tuition waivers and competitive stipends for graduate research assistants working in AI, robotics, wireless systems, and advanced computing laboratories.",
    "isFeatured": true
  },
  {
    "id": "sch-005",
    "name": "MIT Presidential & Departmental Graduate Fellowships",
    "university": "Massachusetts Institute of Technology (MIT)",
    "location": "Cambridge, Massachusetts",
    "degreeLevel": "Masters & PhD",
    "field": "Architecture, Engineering, Science, Management, Humanities",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$44,000 - $52,000 / year + 100% tuition waiver",
    "deadline": "December 15 - January 5",
    "requirements": [
      "Outstanding academic record in undergraduate studies",
      "Strong research portfolio or publications",
      "3 letters of recommendation from research mentors"
    ],
    "officialUrl": "https://gradadmissions.mit.edu/costs-funding",
    "description": "All admitted PhD students at MIT are guaranteed 100% full financial support covering full tuition, individual health insurance, and a substantial living stipend for the normal duration of their program.",
    "isFeatured": true
  },
  {
    "id": "sch-006",
    "name": "Harvard University Graduate School of Arts and Sciences Fellowships",
    "university": "Harvard University",
    "location": "Cambridge, Massachusetts",
    "degreeLevel": "PhD Only",
    "field": "Life Sciences, Physical Sciences, Humanities, Social Sciences, Engineering",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$46,000 / year stipend + full tuition & healthcare",
    "deadline": "December 1 - January 5",
    "requirements": [
      "Undergraduate degree with high academic honors",
      "Compelling Statement of Purpose and research writing sample",
      "Three academic letters of recommendation"
    ],
    "officialUrl": "https://gsas.harvard.edu/financial-support",
    "description": "Harvard GSAS provides guaranteed multi-year funding packages to all doctoral students including full tuition, health fees, and generous living stipends throughout the 5-year PhD trajectory.",
    "isFeatured": true
  },
  {
    "id": "sch-007",
    "name": "Yale University Fully-Funded Doctoral Fellowships",
    "university": "Yale University",
    "location": "New Haven, Connecticut",
    "degreeLevel": "PhD Only",
    "field": "All PhD Programs across Sciences, Engineering, Humanities & Social Sciences",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$48,000 / year stipend + 100% tuition fellowship",
    "deadline": "December 15 - January 2",
    "requirements": [
      "Bachelor\u2019s or Master\u2019s degree with strong research credentials",
      "TOEFL / IELTS for non-native English speakers",
      "Statement of Purpose and faculty alignment"
    ],
    "officialUrl": "https://gsas.yale.edu/funding-aid",
    "description": "Every admitted PhD candidate at Yale receives a comprehensive financial award that covers full tuition, comprehensive health insurance, and a living stipend for up to five full years.",
    "isFeatured": true
  },
  {
    "id": "sch-008",
    "name": "Princeton University Doctoral Financial Support Guarantee",
    "university": "Princeton University",
    "location": "Princeton, New Jersey",
    "degreeLevel": "PhD Only",
    "field": "All Engineering, Natural Sciences, Humanities, and Social Sciences",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$49,000 - $54,000 / year stipend + 100% tuition waiver",
    "deadline": "December 1 - January 3",
    "requirements": [
      "Exceptional academic record and original research proposal",
      "Statement of academic purpose",
      "Three letters of recommendation"
    ],
    "officialUrl": "https://gradschool.princeton.edu",
    "description": "Princeton guarantees 100% funding for all regular PhD students for their entire period of regular enrollment, covering full tuition, health plan, and an annual living stipend.",
    "isFeatured": true
  },
  {
    "id": "sch-009",
    "name": "Columbia University Graduate School of Arts and Sciences Fellowships",
    "university": "Columbia University",
    "location": "New York, New York",
    "degreeLevel": "PhD Only",
    "field": "Data Science, Biomedical Engineering, Economics, Humanities",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$45,000 / year stipend + full tuition waiver",
    "deadline": "December 15 - January 10",
    "requirements": [
      "Bachelor\u2019s degree from an accredited institution",
      "Transcripts, resume, and Statement of Academic Purpose",
      "TOEFL / IELTS minimum score requirement"
    ],
    "officialUrl": "https://gsas.columbia.edu",
    "description": "All doctoral students admitted to Columbia GSAS receive multi-year Dean's Fellowships that cover full tuition, health fees, and a competitive NYC living stipend for five years.",
    "isFeatured": false
  },
  {
    "id": "sch-010",
    "name": "UC Berkeley Doctoral & Master's Graduate Fellowships",
    "university": "University of California, Berkeley",
    "location": "Berkeley, California",
    "degreeLevel": "Masters & PhD",
    "field": "EECS, Data Science, Mechanical Engineering, Chemistry, Public Policy",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$38,000 - $46,000 / year stipend + out-of-state tuition waiver",
    "deadline": "December 1 - December 15",
    "requirements": [
      "Undergraduate GPA of 3.5+ or equivalent",
      "Demonstrated research capability in laboratory or industry",
      "3 academic letters of recommendation"
    ],
    "officialUrl": "https://grad.berkeley.edu/financial/fellowships/",
    "description": "UC Berkeley provides comprehensive funding packages for international graduate researchers, covering full out-of-state tuition, health insurance, and monthly living stipends.",
    "isFeatured": true
  },
  {
    "id": "sch-011",
    "name": "Rackham International Merit Fellowship & GEO Assistantships",
    "university": "University of Michigan - Ann Arbor",
    "location": "Ann Arbor, Michigan",
    "degreeLevel": "Masters & PhD",
    "field": "All Graduate Disciplines (Automotive, AI, Data, Public Health)",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$36,000 - $44,000 / year stipend + full tuition waiver",
    "deadline": "January 15 (Annual Intake)",
    "requirements": [
      "Admission to a U-M graduate degree program",
      "Outstanding academic record and leadership potential",
      "English proficiency (IELTS 7.0 or TOEFL 90+)"
    ],
    "officialUrl": "https://rackham.umich.edu/funding/",
    "description": "Provides full tuition waivers, union-negotiated living salaries, and comprehensive health insurance for graduate student instructors and research assistants at U-M.",
    "isFeatured": true
  },
  {
    "id": "sch-012",
    "name": "Caltech Graduate Research Fellowships",
    "university": "California Institute of Technology (Caltech)",
    "location": "Pasadena, California",
    "degreeLevel": "PhD Only",
    "field": "Aerospace, Physics, Quantum Computing, Applied Math, Bioengineering",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$47,000 / year stipend + 100% tuition coverage",
    "deadline": "December 1 - January 1",
    "requirements": [
      "BSc/MSc in STEM disciplines with exceptional math/science foundations",
      "Research publications or significant lab projects",
      "Statement of Purpose"
    ],
    "officialUrl": "https://www.gradoffice.caltech.edu",
    "description": "Virtually all doctoral students at Caltech receive full tuition support and a generous living stipend through internal graduate research and teaching fellowships.",
    "isFeatured": false
  },
  {
    "id": "sch-013",
    "name": "UIUC Graduate Assistantships (GRA, GTA & GA)",
    "university": "University of Illinois Urbana-Champaign",
    "location": "Urbana-Champaign, Illinois",
    "degreeLevel": "Masters & PhD",
    "field": "Computer Science, Agricultural & Biological Engineering, Physics, Finance",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$26,000 - $35,000 / year stipend + full tuition waiver",
    "deadline": "December 15 - January 15",
    "requirements": [
      "Admission to UIUC Graduate College",
      "GPA 3.0+ on 4.0 scale",
      "Academic recommendation letters"
    ],
    "officialUrl": "https://grad.illinois.edu/assistantships",
    "description": "Graduate assistant appointments of 25% to 67% time at UIUC include a full tuition waiver, service fee waiver, and monthly living stipend.",
    "isFeatured": false
  },
  {
    "id": "sch-014",
    "name": "University of Chicago Doctoral Fellowships",
    "university": "University of Chicago",
    "location": "Chicago, Illinois",
    "degreeLevel": "PhD Only",
    "field": "Economics, Public Policy, Molecular Engineering, Mathematics",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$45,000 / year stipend + 100% tuition remission",
    "deadline": "December 1 - January 5",
    "requirements": [
      "Exceptional analytical preparation",
      "Statement of Purpose and writing sample",
      "GRE scores (department dependent)"
    ],
    "officialUrl": "https://grad.uchicago.edu",
    "description": "UChicago provides fully-funded guarantee packages for all admitted PhD students covering full tuition, health insurance, and annual living stipends for up to five years.",
    "isFeatured": false
  },
  {
    "id": "sch-015",
    "name": "Johns Hopkins Bloomberg & Medicine Doctoral Fellowships",
    "university": "Johns Hopkins University",
    "location": "Baltimore, Maryland",
    "degreeLevel": "PhD Only",
    "field": "Public Health, Biomedical Engineering, Immunology, Biostatistics",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "$42,000 - $48,000 / year stipend + full tuition & healthcare",
    "deadline": "December 1 - January 15",
    "requirements": [
      "Strong background in biology, math, or health sciences",
      "Statement of Purpose and research experience",
      "TOEFL / IELTS for international candidates"
    ],
    "officialUrl": "https://www.jhu.edu",
    "description": "Doctoral scholars at Johns Hopkins receive complete tuition funding, comprehensive health and dental coverage, and a competitive living stipend.",
    "isFeatured": true
  },
  {
    "id": "sch-016",
    "name": "Hubert H. Humphrey Fellowship Program (US Dept of State)",
    "university": "Selected Top US Universities Nationwide",
    "location": "United States (Nationwide Placement)",
    "degreeLevel": "Masters Only",
    "field": "Public Policy, Climate Change, Public Health, Education, Economic Development",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "Full living allowance + airfare + professional development fund",
    "deadline": "May - August (Varies by US Embassy)",
    "requirements": [
      "Undergraduate degree and minimum 5 years of professional work experience",
      "Demonstrated leadership qualities and public service record",
      "English language proficiency"
    ],
    "officialUrl": "https://www.humphreyfellowship.org",
    "description": "A 10-month non-degree fellowship for mid-career professionals that combines academic coursework with practical work affiliations with US organizations, fully funded by the US Department of State.",
    "isFeatured": false
  },
  {
    "id": "sch-017",
    "name": "Berea College No-Tuition Promise (100% Free Tuition for All Admitted)",
    "university": "Berea College",
    "location": "Berea, Kentucky",
    "degreeLevel": "Undergraduate / General",
    "field": "Computer Science, Business Administration, Biology, Engineering Sciences",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "100% Tuition ($44,000/yr value) + on-campus paid work position",
    "deadline": "January 15 (Fall Intake)",
    "requirements": [
      "High school diploma with exceptional academic record",
      "International applicant demonstrating financial need",
      "TOEFL / IELTS or Duolingo English Test"
    ],
    "officialUrl": "https://www.berea.edu/admissions/international-students",
    "description": "Every single admitted international student at Berea College receives a 100% Tuition Promise Scholarship worth over $176,000 for four years, plus guaranteed paid on-campus employment.",
    "isFeatured": true
  },
  {
    "id": "sch-018",
    "name": "Rotary Peace Fellowships (Fully Funded Master's)",
    "university": "Duke University & UNC Chapel Hill",
    "location": "Durham & Chapel Hill, North Carolina",
    "degreeLevel": "Masters Only",
    "field": "International Development, Peace Studies, Conflict Resolution, Public Policy",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "Full tuition, living stipend, roundtrip flights & internship funding",
    "deadline": "May 15 (Annual Deadline)",
    "requirements": [
      "Bachelor\u2019s degree with strong academic record",
      "Minimum 3 years of relevant full-time work or peacebuilding experience",
      "Proficiency in English"
    ],
    "officialUrl": "https://www.rotary.org/en/our-programs/peace-fellowships",
    "description": "Fully funded by The Rotary Foundation, covering all tuition, room and board, roundtrip transportation, and field study expenses for master's programs at Duke University and UNC Chapel Hill.",
    "isFeatured": false
  },
  {
    "id": "sch-019",
    "name": "AAUW International Fellowships for Women",
    "university": "Accredited US Universities Nationwide",
    "location": "United States (Any Accredited Institution)",
    "degreeLevel": "Masters & PhD",
    "field": "All Academic Fields (STEM, Medicine, Business, Humanities)",
    "fundingCoverage": "Partial / Merit-Based",
    "stipendAmount": "$20,000 (Master\u2019s) to $50,000 (PhD/Postdoc) per year",
    "deadline": "November 15 (Annual Intake)",
    "requirements": [
      "Non-US citizen woman scholar studying full-time in the USA",
      "Academic degree equivalent to a US bachelor\u2019s degree",
      "Commitment to return to home country to pursue professional career"
    ],
    "officialUrl": "https://www.aauw.org",
    "description": "American Association of University Women (AAUW) awards major fellowships to women pursuing full-time graduate or postdoctoral study in the United States.",
    "isFeatured": false
  },
  {
    "id": "sch-020",
    "name": "East-West Center Graduate Degree Fellowships",
    "university": "University of Hawaii at Manoa",
    "location": "Honolulu, Hawaii",
    "degreeLevel": "Masters & PhD",
    "field": "Asia-Pacific Studies, Environmental Science, Economics, Public Health",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "Full tuition, housing in EWC residence, monthly stipend & book allowance",
    "deadline": "December 1 (Fall Semester)",
    "requirements": [
      "Citizen of participating Asia-Pacific region or international applicant",
      "Bachelor's degree with minimum 3.0 GPA",
      "Admission to University of Hawaii graduate degree"
    ],
    "officialUrl": "https://www.eastwestcenter.org",
    "description": "Provides full graduate degree funding for students from the United States, Asia, and the Pacific to participate in educational and leadership development programs.",
    "isFeatured": false
  },
  {
    "id": "sch-021",
    "name": "Joint Japan/World Bank Graduate Scholarship Program (JJ/WBGSP)",
    "university": "Harvard, Columbia, Cornell, Johns Hopkins, Chicago",
    "location": "Participating US Partner Universities",
    "degreeLevel": "Masters Only",
    "field": "Development Policy, Economic Policy, Infrastructure Management, Public Health",
    "fundingCoverage": "100% Full Tuition + Monthly Stipend",
    "stipendAmount": "Full tuition + monthly living stipend + economy airfare + medical insurance",
    "deadline": "March - May (Annual Cycles)",
    "requirements": [
      "National of a World Bank member developing country",
      "Bachelor\u2019s degree and minimum 3 years of development-related work experience",
      "Unconditional admission to a participating US master\u2019s program"
    ],
    "officialUrl": "https://www.worldbank.org/en/programs/scholarships",
    "description": "Provides full financial support to nationals of developing countries pursuing development-related master's degrees at leading US universities.",
    "isFeatured": true
  },
  {
    "id": "sch-022",
    "name": "Clark University Global Scholars Program",
    "university": "Clark University",
    "location": "Worcester, Massachusetts",
    "degreeLevel": "Undergraduate / General",
    "field": "All Undergraduate Majors",
    "fundingCoverage": "Partial / Merit-Based",
    "stipendAmount": "$15,000 - $25,000 per year renewable for 4 years",
    "deadline": "February 1 (Fall Semester)",
    "requirements": [
      "High school senior with outstanding GPA and leadership record",
      "International applicant demonstrating global citizenship",
      "Common Application with Clark supplemental essay"
    ],
    "officialUrl": "https://www.clarku.edu",
    "description": "Designed for international first-year undergraduate students who demonstrate outstanding academic performance and leadership potential in their communities.",
    "isFeatured": false
  }
];
