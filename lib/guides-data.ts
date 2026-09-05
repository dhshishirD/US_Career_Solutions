export interface GuideArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'ATS & Resumes' | 'Visa & Green Cards' | 'Scholarships & Education' | 'Remote USD Careers';
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  keywords: string[];
  tableOfContents: { id: string; title: string }[];
  contentHtml: string;
  relatedTool: {
    name: string;
    description: string;
    link: string;
    buttonText: string;
  };
}

export const MASTER_GUIDES: GuideArticle[] = [
  {
    slug: 'pass-workday-greenhouse-ats-resume-2026',
    title: 'The 2026 ATS Resume Blueprint: How to Pass Workday, Greenhouse & Lever Scanners',
    subtitle: 'A complete reverse-engineered guide on how Fortune 500 Applicant Tracking Systems parse, score, and rank incoming CVs.',
    excerpt: 'Over 75% of resumes submitted for US positions are automatically filtered out before a recruiter sees them. Learn the exact keyword densities, formatting rules, and power metrics needed to score 90%+ on modern ATS scanners.',
    category: 'ATS & Resumes',
    readTime: '8 min read',
    publishedDate: '2026-09-05T00:00:00.000Z',
    updatedDate: '2026-09-05T00:00:00.000Z',
    author: {
      name: 'US Career Solutions Intelligence Team',
      role: 'Certified ATS & Executive Career Advisors',
      avatar: '/favicon.ico'
    },
    keywords: [
      'ats resume checker',
      'free ats resume checker',
      'how to pass workday ats',
      'ats friendly resume format',
      'greenhouse resume parsing',
      'resume ats score checker'
    ],
    tableOfContents: [
      { id: 'how-ats-works', title: '1. How Modern ATS Algorithms Actually Parse CVs' },
      { id: 'top-3-ats-platforms', title: '2. Workday vs. Greenhouse vs. Lever: Key Differences' },
      { id: 'the-xyz-formula', title: '3. The Google XYZ Formula for High-Impact Bullets' },
      { id: 'formatting-mistakes', title: '4. Critical Formatting Errors That Cause Zero-Scores' },
      { id: 'keyword-density', title: '5. The Natural Keyword Placement Strategy' }
    ],
    contentHtml: `
      <h2 id="how-ats-works">1. How Modern ATS Algorithms Actually Parse CVs</h2>
      <p>When you submit an application to a top US employer, your document rarely reaches a human recruiter first. Instead, it is processed by an <strong>Applicant Tracking System (ATS)</strong>—a specialized database software designed to extract text, tokenize skills, calculate keyword match ratios, and assign an overall candidate ranking score.</p>
      
      <p>Understanding the parser pipeline is the key to passing:</p>
      <ul>
        <li><strong>Text Ingestion:</strong> The ATS strips graphical elements, columns, and icons, converting your document into plain raw text strings.</li>
        <li><strong>Entity Extraction:</strong> The algorithm identifies standard section headers (<em>Professional Summary, Experience, Skills, Education</em>). If your headers are non-standard (e.g. <em>"My Journey"</em> or <em>"What I Do"</em>), the parser skips entire blocks of experience.</li>
        <li><strong>Semantic Keyword Matching:</strong> The system matches your listed skills against the job description's required qualifications. Exact matches and synonyms are tallied.</li>
      </ul>

      <h2 id="top-3-ats-platforms">2. Workday vs. Greenhouse vs. Lever: Key Differences</h2>
      <p>Different enterprise platforms have distinct parsing behaviors:</p>
      
      <div class="my-6 p-4 rounded-xl bg-slate-100 border border-slate-200">
        <h4 class="font-bold text-slate-900 mb-2">Platform Breakdown:</h4>
        <ul class="space-y-2 text-sm text-slate-700">
          <li><strong>Workday:</strong> Used by Fortune 500s (Amazon, Microsoft, Mayo Clinic). Highly strict with chronological date formats and standard section headers. Avoid tables and multi-column layouts at all costs.</li>
          <li><strong>Greenhouse:</strong> Popular with high-growth tech companies and scaleups (GitLab, Stripe). Prioritizes clean plain-text skills lists and clear employment tenures.</li>
          <li><strong>Lever:</strong> Focuses heavily on candidate tagging and direct keyword extraction from the first third of your resume.</li>
        </ul>
      </div>

      <h2 id="the-xyz-formula">3. The Google XYZ Formula for High-Impact Bullets</h2>
      <p>US recruiters and ATS algorithms both heavily reward quantifiable business results over passive job descriptions. Use the famous <strong>Google XYZ Formula</strong>:</p>
      <blockquote>
        <em>"Accomplished [X], as measured by [Y], by doing [Z]."</em>
      </blockquote>
      
      <p><strong>Weak (Passive Duty):</strong><br/>
      ❌ <em>"Responsible for managing cloud systems and updating databases."</em></p>
      
      <p><strong>Strong (ATS High-Score Version):</strong><br/>
      ✅ <em>"Spearheaded database indexing and microservices migration across AWS, reducing query latency by 42% and supporting 1.2M daily active users."</em></p>

      <h2 id="formatting-mistakes">4. Critical Formatting Errors That Cause Zero-Scores</h2>
      <ol>
        <li><strong>Multi-Column Layouts:</strong> ATS parsers read horizontally across columns, frequently mixing text from two different jobs into scrambled paragraphs.</li>
        <li><strong>Text Inside Images or Shapes:</strong> Any text placed inside Canva graphics or Word text boxes is invisible to ATS parsers.</li>
        <li><strong>Header & Footer Contacts:</strong> Placing your phone number, email, or LinkedIn link in the physical document header/footer often leads to unparsed contact information. Place them in the main body.</li>
      </ol>

      <h2 id="keyword-density">5. The Natural Keyword Placement Strategy</h2>
      <p>Never keyword-stuff invisible white text (modern systems detect and blacklist this automatically). Instead:</p>
      <ul>
        <li>Include your target role title directly beneath your name as your professional headline.</li>
        <li>Group 8–14 core skills into a dedicated <strong>Technical & Functional Core Competencies</strong> section.</li>
        <li>Repeat critical skills at least twice naturally inside your most recent job accomplishment bullets.</li>
      </ul>
    `,
    relatedTool: {
      name: 'Free ATS Resume Checker',
      description: 'Upload your CV file (.docx or .pdf) to get an instant ATS score, missing keywords audit, and AI bullet makeover.',
      link: '/tools/ats-scanner',
      buttonText: 'Scan My Resume for Free →'
    }
  },
  {
    slug: 'international-nurse-schedule-a-greencard-guide',
    title: 'The International Nurse Fast-Track Green Card: Schedule A Hospital Sponsorship Roadmap',
    subtitle: 'How foreign Registered Nurses bypass the PERM labor certification backlog to obtain direct permanent residency.',
    excerpt: 'Facing a shortage of over 200,000 healthcare professionals, the US Department of Labor designates Registered Nurses under Schedule A exemption. Discover the 4-step roadmap from NCLEX-RN to hospital direct-hire.',
    category: 'Visa & Green Cards',
    readTime: '10 min read',
    publishedDate: '2026-09-05T00:00:00.000Z',
    updatedDate: '2026-09-05T00:00:00.000Z',
    author: {
      name: 'US Career Solutions Immigration Team',
      role: 'Healthcare & EB-3 Specialization Advisors',
      avatar: '/favicon.ico'
    },
    keywords: [
      'schedule a green card nurse',
      'eb3 nurse visa sponsorship',
      'nclex rn international nurse',
      'visascreen certificate requirements',
      'us hospital green card direct hire'
    ],
    tableOfContents: [
      { id: 'what-is-schedule-a', title: '1. What is the Schedule A Exemption?' },
      { id: 'step-1-nclex', title: '2. Step 1: NCLEX-RN Examination & Credential Evaluation' },
      { id: 'step-2-visascreen', title: '3. Step 2: VisaScreen Certificate (CGFNS)' },
      { id: 'step-3-hospital-matching', title: '4. Step 3: Direct Hospital Recruitment vs. Staffing Agencies' },
      { id: 'step-4-i140-filing', title: '5. Step 4: Form I-140 Immigrant Petition & Green Card Timeline' }
    ],
    contentHtml: `
      <h2 id="what-is-schedule-a">1. What is the Schedule A Exemption?</h2>
      <p>For most US employment-based Green Cards (EB-2 and EB-3), employers must undergo a lengthy Department of Labor process called <strong>PERM Labor Certification</strong>, proving that no qualified US worker was available for the job. This alone often adds 12–18 months of delay.</p>
      
      <p>However, under <strong>Title 20 CFR § 656.5 (Schedule A, Group I)</strong>, the US Government has officially predetermined that there is a chronic nationwide shortage of <strong>Registered Nurses and Physical Therapists</strong>. Therefore, hospitals are legally exempt from PERM and can file your Immigrant Green Card petition (Form I-140) directly with USCIS on Day 1.</p>

      <h2 id="step-1-nclex">2. Step 1: NCLEX-RN Examination & Credential Evaluation</h2>
      <p>To qualify, international nurses must obtain a US state nursing license endorsement:</p>
      <ul>
        <li><strong>Credential Evaluation:</strong> Have your foreign nursing transcripts evaluated through CGFNS or Josef Silny & Associates.</li>
        <li><strong>NCLEX-RN Exam:</strong> Pass the computer-adaptive NCLEX-RN examination at an international Pearson VUE test center (available in India, Philippines, UK, Brazil, South Africa, etc.).</li>
      </ul>

      <h2 id="step-2-visascreen">3. Step 2: VisaScreen Certificate (CGFNS)</h2>
      <p>Under Section 343 of the Illegal Immigration Reform and Immigrant Responsibility Act (IIRIRA), all foreign healthcare professionals must obtain a <strong>VisaScreen Certificate</strong> verifying:</p>
      <ol>
        <li>Your foreign nursing education meets US standards.</li>
        <li>Your nursing license is unencumbered.</li>
        <li>English language proficiency via <strong>IELTS Academic</strong> (Overall 6.5, Speaking 7.0) or <strong>TOEFL iBT</strong> (Overall 83, Speaking 26).</li>
      </ol>

      <h2 id="step-3-hospital-matching">4. Step 3: Direct Hospital Recruitment vs. Staffing Agencies</h2>
      <p><strong>Crucial Warning:</strong> Legitimate US hospital networks (e.g. Cleveland Clinic, Mayo Clinic, Kaiser Permanente, HCA Healthcare) <strong>NEVER charge upfront recruitment fees</strong>. They cover legal filing costs, attorney fees, and often provide $5,000–$15,000 in relocation and sign-on bonuses.</p>

      <h2 id="step-4-i140-filing">5. Step 4: Form I-140 Immigrant Petition & Green Card Timeline</h2>
      <p>Once you accept a hospital offer, the hospital's immigration attorneys file <strong>Form I-140 (Immigrant Petition for Alien Worker)</strong> with Premium Processing (approved within 15 calendar days). Following I-140 approval and visa bulletin priority date availability, you complete consular processing (DS-260) and enter the United States directly as a Permanent Resident Green Card holder.</p>
    `,
    relatedTool: {
      name: 'USA Visa Sponsor Radar',
      description: 'Search 150+ verified US hospital systems and cap-exempt medical centers actively sponsoring foreign healthcare talent.',
      link: '/tools/visa-checker',
      buttonText: 'Lookup Healthcare Sponsors →'
    }
  },
  {
    slug: 'study-usa-zero-tuition-graduate-assistantship',
    title: 'How to Study in the USA for $0 Tuition + $35,000/yr Living Stipend (GRA & GTA Secrets)',
    subtitle: 'The 3-step faculty cold outreach blueprint to secure fully funded Graduate Research & Teaching Assistantships.',
    excerpt: 'Most international students believe US universities require $50,000/yr in tuition. In reality, American research universities spend billions paying graduate students to earn their degrees. Learn how to secure a 100% tuition waiver and living paycheck.',
    category: 'Scholarships & Education',
    readTime: '9 min read',
    publishedDate: '2026-09-05T00:00:00.000Z',
    updatedDate: '2026-09-05T00:00:00.000Z',
    author: {
      name: 'US Career Solutions Academic Division',
      role: 'Graduate Funding & Admissions Strategists',
      avatar: '/favicon.ico'
    },
    keywords: [
      'fully funded scholarships usa',
      'graduate assistantship full tuition waiver',
      'gra stipend usa university',
      'professor cold email template assistantship',
      'study in usa for free'
    ],
    tableOfContents: [
      { id: 'the-funding-myth', title: '1. The Billion-Dollar US University Research Engine' },
      { id: 'gra-vs-gta', title: '2. GRA vs. GTA: How the Financial Mechanism Works' },
      { id: '3-step-blueprint', title: '3. The 3-Step Faculty Cold Outreach Blueprint' },
      { id: 'cold-email-template', title: '4. High-Converting Professor Cold Email Template' },
      { id: 'post-grad-opt', title: '5. The 3-Year STEM OPT Career Launchpad' }
    ],
    contentHtml: `
      <h2 id="the-funding-myth">1. The Billion-Dollar US University Research Engine</h2>
      <p>Every year, major US federal agencies—including the <strong>National Science Foundation (NSF)</strong>, the <strong>National Institutes of Health (NIH)</strong>, and the <strong>Department of Energy (DOE)</strong>—award hundreds of billions of dollars in research grants to American universities (such as Purdue, Georgia Tech, UIUC, Michigan, and Texas A&M).</p>
      
      <p>University professors (Principal Investigators or PIs) are required to allocate these grant funds directly toward hiring graduate student researchers. When you are appointed as an assistant, the university provides two massive financial benefits:</p>
      <ol>
        <li><strong>100% Full Tuition Waiver:</strong> All semester tuition and institutional fees are completely canceled ($30,000–$55,000/year value).</li>
        <li><strong>Bi-Weekly Living Stipend:</strong> You receive a bi-weekly direct deposit paycheck of <strong>$2,000 to $3,500/month</strong> ($25,000–$42,000/year) for living expenses.</li>
      </ol>

      <h2 id="gra-vs-gta">2. GRA vs. GTA: How the Financial Mechanism Works</h2>
      <p>There are two primary assistantship vehicles:</p>
      <ul>
        <li><strong>Graduate Research Assistantship (GRA):</strong> You work 20 hours/week conducting research in a professor's laboratory directly tied to funded grant deliverables.</li>
        <li><strong>Graduate Teaching Assistantship (GTA):</strong> You assist faculty with grading, conducting lab sessions, or tutoring undergraduate courses.</li>
      </ul>

      <h2 id="3-step-blueprint">3. The 3-Step Faculty Cold Outreach Blueprint</h2>
      <p>The #1 mistake international applicants make is applying blindly through the generic university admissions portal. General admissions officers do not control research funds—<strong>individual lab professors do</strong>.</p>
      
      <ol>
        <li><strong>Step 1: Faculty Identification:</strong> Explore university department faculty pages. Identify 5–8 professors whose recently published papers (2024–2026) align with your specific technical background.</li>
        <li><strong>Step 2: Cold Email Engagement:</strong> Send a concise, tailored email detailing how your technical skills (e.g. Python, PyTorch, wet lab protocols, CAD design) can immediately assist their active projects.</li>
        <li><strong>Step 3: Secured Faculty Backing:</strong> When a professor agrees to fund you, they notify the departmental admissions committee, virtually guaranteeing your formal admission and full scholarship award.</li>
      </ol>

      <h2 id="cold-email-template">4. High-Converting Professor Cold Email Template</h2>
      <div class="my-6 p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed">
        <p class="text-amber-400 font-bold mb-2">Subject: Prospective Graduate Researcher - Fall Admissions & Research Inquiry</p>
        <p>Dear Professor [Last Name],</p>
        <br/>
        <p>I hope this email finds you well.</p>
        <p>I have been closely following your lab's research at [University Name], particularly your recent publication on [Specific Research Topic/Paper Title]. Your methodology in [Specific Technique] was especially compelling.</p>
        <br/>
        <p>I recently graduated with a degree in [Your Major] from [Your University]. Over the past years, I have developed strong technical proficiency in [Key Skill 1, Key Skill 2, and Key Skill 3]. My recent project focused on [Brief 1-sentence description of relevant technical achievement].</p>
        <br/>
        <p>I am planning to apply for the [Master's/PhD] program in [Department Name] for the upcoming intake, and I am very eager to contribute to your current grant projects as a Graduate Research Assistant (GRA).</p>
        <br/>
        <p>I have attached my academic CV and transcript for your review. Would you be open to a brief 10-minute introductory call next week to discuss potential research alignment?</p>
        <br/>
        <p>Thank you very much for your time and consideration.</p>
        <br/>
        <p>Sincerely,<br/>[Your Full Name]<br/>[LinkedIn / Portfolio Link]</p>
      </div>

      <h2 id="post-grad-opt">5. The 3-Year STEM OPT Career Launchpad</h2>
      <p>In addition to zero tuition and free living expenses, graduating from a STEM-designated degree program grants you <strong>3 full years of STEM OPT work authorization</strong> in the United States without needing an immediate H-1B visa lottery, providing a direct bridge to high-paying US corporate engineering and technology careers.</p>
    `,
    relatedTool: {
      name: '5-in-1 Outreach Generator',
      description: 'Generate tailored professor cold emails and graduate assistantship inquiry letters in seconds.',
      link: '/tools/outreach-gen',
      buttonText: 'Generate Professor Email →'
    }
  }
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return MASTER_GUIDES.find(g => g.slug === slug);
}
