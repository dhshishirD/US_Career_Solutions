export interface InterviewQuestion {
  id: string;
  category: 'Remote Work & Reliability' | 'Problem Solving & STAR' | 'US Culture & Communication' | 'Conflict & Customer Care';
  question: string;
  whyRecruitersAsk: string;
  starFormula: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleWinningAnswer: string;
  proTip: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Visa & Immigration' | 'Employment & Contracts' | 'University Funding';
  plainEnglishExplanation: string;
  whyItMattersToYou: string;
  example: string;
}

export interface ColdEmailTemplate {
  id: string;
  targetAudience: string;
  subjectLine: string;
  body: string;
  whenToUse: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q-1',
    category: 'Remote Work & Reliability',
    question: 'How do you manage your time and communicate effectively when working remotely across US time zones?',
    whyRecruitersAsk: 'US managers fear hiring remote workers who disappear, miss deadlines, or require constant supervision.',
    starFormula: {
      situation: 'Working on a remote team with a 10-hour time difference from headquarters.',
      task: 'Deliver client support tickets and project updates without blocking team progress.',
      action: 'Set up clear asynchronous daily standups on Slack, overlap 3 core hours daily with US EST, and document all workflow in Notion.',
      result: 'Maintained a 100% on-time delivery record and zero missed communication handoffs.'
    },
    sampleWinningAnswer: 'I treat asynchronous communication as a core superpower. Every morning, I post a structured daily update detailing what was completed, what is in progress, and any blockers. I ensure at least 3 to 4 hours of daily live overlap with US Eastern time for team syncs, and I document all decisions clearly so my teammates can proceed seamlessly while I am offline.',
    proTip: 'Never say "I will work 24/7." US hiring managers value sustainable, organized asynchronous workflows over burnout.'
  },
  {
    id: 'q-2',
    category: 'Conflict & Customer Care',
    question: 'Tell me about a time you handled an angry or frustrated customer.',
    whyRecruitersAsk: 'To see if you take complaints personally or if you possess emotional de-escalation skills.',
    starFormula: {
      situation: 'A customer was furious because their software subscription failed during a critical presentation.',
      task: 'De-escalate the tension, restore their access, and retain them as a client.',
      action: 'Listened actively without interrupting, validated their frustration, resolved the billing glitch in real-time, and credited their account.',
      result: 'The customer thanked me for the rapid handling and upgraded to an annual plan.'
    },
    sampleWinningAnswer: 'First, I never take frustration personally. I acknowledge the impact immediately: "I completely understand how stressful this is during your presentation, and I am taking personal ownership to resolve this right now." I quickly identified the underlying issue, fixed the payment sync, and provided a free monthly extension. The user was so impressed by the calm resolution that they left a 5-star review.',
    proTip: 'Always use the "HEAR" formula: Hear, Empathize, Apologize, Resolve.'
  },
  {
    id: 'q-3',
    category: 'Problem Solving & STAR',
    question: 'Describe a situation where you had to learn a new tool or technology quickly with zero prior training.',
    whyRecruitersAsk: 'To evaluate your adaptability and resourcefulness in fast-moving US startups.',
    starFormula: {
      situation: 'Our company transitioned to a new enterprise CRM tool on 48 hours notice.',
      task: 'Master the system and train two junior teammates without slowing down customer operations.',
      action: 'Read the official documentation, built test sandbox workflows, and recorded short Loom videos for the team.',
      result: 'Completed the migration 1 day ahead of schedule with zero operational downtime.'
    },
    sampleWinningAnswer: 'When our company moved to a new CRM, there was no formal onboarding. I spent the weekend going through developer docs and setting up test tickets in a sandbox environment. By Monday, not only was I fully proficient, but I created a 5-minute Loom video guide that helped 4 other colleagues get up to speed in hours.',
    proTip: 'Highlight your self-starter mentality and mention tools like Loom, Notion, or GitHub.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-1',
    term: 'Cap-Exempt H-1B Visa',
    category: 'Visa & Immigration',
    plainEnglishExplanation: 'A special category of H-1B work visas for non-profit universities, research institutions, and academic hospitals that has NO annual lottery limits and can be applied for at any time of the year.',
    whyItMattersToYou: 'While corporate H-1B visas have only a ~15-20% lottery win rate, Cap-Exempt H-1B visas have NO lottery and 99% approval for qualified researchers, data analysts, and healthcare workers!',
    example: 'A research lab assistant role at Johns Hopkins University or Mayo Clinic.'
  },
  {
    id: 'term-2',
    term: 'W-8BEN Contractor Agreement',
    category: 'Employment & Contracts',
    plainEnglishExplanation: 'An official US Internal Revenue Service (IRS) tax certificate allowing foreign individuals living outside the USA to work legally for US companies as independent contractors and be paid in full in USD without US tax withholding.',
    whyItMattersToYou: 'Allows you to work from your home country for American startups, SaaS companies, and digital agencies completely legally without needing a US work visa.',
    example: 'Working as a remote Customer Happiness Engineer for Automattic or Zapier from abroad.'
  },
  {
    id: 'term-3',
    term: 'Graduate Research Assistantship (GRA) / Teaching Assistantship (GTA)',
    category: 'University Funding',
    plainEnglishExplanation: 'An academic appointment where a US university hires a graduate student (Master’s or PhD) to conduct lab research or teach undergraduate classes for 20 hours/week in exchange for 100% full tuition remission plus a bi-weekly living salary.',
    whyItMattersToYou: 'The single most accessible pathway to study in the USA with zero tuition debt while earning $2,000 – $3,500/month living stipend.',
    example: 'PhD in Computer Science at Purdue University with $32,000/year stipend + $0 tuition.'
  },
  {
    id: 'term-4',
    term: 'Schedule A Green Card (Direct Relocation)',
    category: 'Visa & Immigration',
    plainEnglishExplanation: 'A fast-track US permanent residency pathway designated for shortage occupations (specifically Registered Nurses and Physical Therapists) that bypasses the lengthy Department of Labor PERM certification.',
    whyItMattersToYou: 'Qualified international nurses with NCLEX-RN passing credentials can receive direct Permanent Residency (Green Card) for themselves and their family sponsored by US hospital systems.',
    example: 'Cleveland Clinic sponsoring international nurses directly for US Green Cards.'
  }
];

export const COLD_EMAIL_TEMPLATES: ColdEmailTemplate[] = [
  {
    id: 'email-1',
    targetAudience: 'Reaching out to US University Professors for Graduate Research Assistantships (GRA)',
    subjectLine: 'Prospective Graduate Researcher (Fall 2027) — [Your Name] / [Specific Research Topic]',
    whenToUse: 'Send 3-6 months before university graduate application deadlines to secure funding.',
    body: `Dear Professor [Professor's Last Name],

I hope this email finds you well.

I have been following your lab's recent publications on [Mention a specific paper or project from their lab], particularly your findings regarding [Mention one insightful point from the paper]. Your methodology on [Topic] deeply aligns with my own academic background in [Your Major/Field].

I hold a Bachelor’s degree in [Your Degree] from [Your University] (GPA: [Your GPA] / IELTS: [Your Score]), where I conducted research on [Brief 1-sentence summary of your thesis or relevant project]. 

I am applying to the [Master's/PhD] program in [Department Name] for [Term/Year], and I am writing to inquire if you have potential openings for a Graduate Research Assistant (GRA) in your laboratory.

I have attached my academic CV and research summary for your review. If your schedule permits, I would welcome the opportunity to discuss how my background in [Key Skill/Tool] can contribute to your upcoming projects.

Thank you for your time and consideration.

Sincerely,
[Your Name]
[LinkedIn Profile URL]
[Phone / WhatsApp]`
  },
  {
    id: 'email-2',
    targetAudience: 'Reaching out to US Tech & Remote Hiring Managers on LinkedIn',
    subjectLine: 'Application Inquiry: [Job Title] — [Your Name]',
    whenToUse: 'Send to the hiring manager right after applying for a US Remote job.',
    body: `Hi [Hiring Manager Name],

I saw that [Company Name] is actively expanding its [Department, e.g. Customer Support / Engineering] team, and I recently submitted my application for the [Job Title] role.

With [Number] years of experience specializing in [Key Skill 1, e.g. Zendesk/Intercom] and [Key Skill 2], I have maintained a [Key Metric, e.g. 98% CSAT rating across 20,000+ support interactions]. Having worked extensively in asynchronous remote setups, I am excited about [Company Name]'s mission in [Company Focus].

I would love to connect and share how my background can immediately support your team's goals.

Best regards,
[Your Name]
[Portfolio / LinkedIn URL]`
  }
];


export interface SalaryBenchmark {
  id: string;
  role: string;
  category: string;
  usAverageSalary: string;
  dolPrevailingWageLevel2: string;
  globalRemoteW8BenRate: string;
  topPayingStates: string;
  h1bSponsorDemand: 'Extremely High' | 'High' | 'Moderate';
  description: string;
}

export const US_SALARY_BENCHMARKS: SalaryBenchmark[] = [
  {
    id: 'sal-01',
    role: 'Software Development Engineer / Cloud Architect',
    category: 'Software & Tech',
    usAverageSalary: '$125,000 – $175,000 / year',
    dolPrevailingWageLevel2: '$112,000 / year',
    globalRemoteW8BenRate: '$45 – $85 / hour ($85,000 – $155,000/yr)',
    topPayingStates: 'California, Washington, New York, Texas',
    h1bSponsorDemand: 'Extremely High',
    description: 'Under US DOL prevailing wage regulations, US tech sponsors (Microsoft, Amazon, Google) must pay international H-1B engineers at or above the certified prevailing wage to prevent wage suppression.'
  },
  {
    id: 'sal-02',
    role: 'Critical Care ICU / Medical-Surgical Registered Nurse',
    category: 'Healthcare & Nursing',
    usAverageSalary: '$82,000 – $118,000 / year',
    dolPrevailingWageLevel2: '$78,500 / year',
    globalRemoteW8BenRate: 'N/A (Direct US Bedside Employment)',
    topPayingStates: 'California, Texas, New York, Ohio, Florida',
    h1bSponsorDemand: 'Extremely High',
    description: 'Under US Department of Labor Schedule A rules, hospitals sponsoring foreign RNs for EB-3 Green Cards must guarantee prevailing wage parity with domestic nurses, plus shift differentials and relocation packages.'
  },
  {
    id: 'sal-03',
    role: 'AI Data Annotation & Prompt Evaluation Specialist',
    category: 'Data & AI',
    usAverageSalary: '$65,000 – $92,000 / year',
    dolPrevailingWageLevel2: '$58,000 / year',
    globalRemoteW8BenRate: '$20 – $55 / hour ($38,000 – $85,000/yr)',
    topPayingStates: 'Remote (Worldwide - Form W-8BEN)',
    h1bSponsorDemand: 'Moderate',
    description: 'Contractors working remotely for US AI labs (Scale AI, Outlier, DataAnnotation) receive direct USD payments with 0% US tax withholding under standard double-taxation international treaties.'
  },
  {
    id: 'sal-04',
    role: 'Executive Virtual Assistant & Operations Coordinator',
    category: 'Virtual Operations',
    usAverageSalary: '$55,000 – $82,000 / year',
    dolPrevailingWageLevel2: '$48,000 / year',
    globalRemoteW8BenRate: '$18 – $38 / hour ($35,000 – $70,000/yr)',
    topPayingStates: 'Remote (Worldwide - Form W-8BEN)',
    h1bSponsorDemand: 'Moderate',
    description: 'US founders and venture capital executives hire international virtual operations specialists on USD retainers for calendar management, research, and asynchronous project coordination.'
  },
  {
    id: 'sal-05',
    role: 'Clinical Research Associate & Bioinformatics Specialist',
    category: 'Research & Cap-Exempt',
    usAverageSalary: '$78,000 – $115,000 / year',
    dolPrevailingWageLevel2: '$72,000 / year',
    globalRemoteW8BenRate: '$35 – $65 / hour ($65,000 – $110,000/yr)',
    topPayingStates: 'Massachusetts, Maryland, California, Pennsylvania',
    h1bSponsorDemand: 'Extremely High',
    description: 'Cap-Exempt university medical centers (Johns Hopkins, Stanford, Broad Institute) sponsor international researchers year-round with no lottery caps and guaranteed university salary bands.'
  },
  {
    id: 'sal-06',
    role: 'Graduate Research & Teaching Assistant (GRA / GTA)',
    category: 'University Funding',
    usAverageSalary: '$28,000 – $45,000 / year living stipend + 100% Tuition Waiver',
    dolPrevailingWageLevel2: 'Full Tuition Remission ($45k–$60k/yr value)',
    globalRemoteW8BenRate: 'On-Campus 20 hrs/week F-1 Appointment',
    topPayingStates: 'Michigan, Indiana, Georgia, Illinois, California',
    h1bSponsorDemand: 'Extremely High',
    description: 'US graduate assistantships provide full out-of-state tuition remission plus a bi-weekly living paycheck, making STEM Masters and PhD degrees 100% free for international scholars.'
  }
];
