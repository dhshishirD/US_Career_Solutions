export interface ParsedResumeSections {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  summary: string;
  skills: string[];
  experience: {
    roleTitle?: string;
    organization?: string;
    dateRange?: string;
    bullets: string[];
  }[];
  education: {
    degree?: string;
    institution?: string;
    yearOrCgpa?: string;
  }[];
  otherSections: {
    title: string;
    lines: string[];
  }[];
  rawText: string;
}

export function parseResumeIntelligently(rawText: string, targetRole: string = ''): ParsedResumeSections {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // 1. Extract Email
  const emailMatch = rawText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const email = emailMatch ? emailMatch[1] : undefined;

  // 2. Extract Phone Number
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,9}/);
  const phone = phoneMatch ? phoneMatch[0].trim() : undefined;

  // 3. Extract LinkedIn / Web Link
  const linkedInMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?(?:linkedin\.com\/in\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\.com\/[a-zA-Z0-9_-]+)/i);
  const linkedIn = linkedInMatch ? linkedInMatch[0] : undefined;

  // 4. Extract Location
  const locationMatch = rawText.match(/(?:Address[:\s]*)?([A-Za-z\s]+,\s*(?:Dhaka|Chittagong|Sylhet|Rajshahi|Feni|Banani|Gulshan|Bangladesh|USA|CA|NY|TX|UK|India|Pakistan|Canada|Germany|Remote)[A-Za-z0-9\s,.-]*)/i);
  let location = locationMatch ? locationMatch[1].replace(/^Address[:\s]*/i, '').trim() : undefined;
  if (location && location.length > 50) location = location.slice(0, 50);

  // 5. Extract Full Name
  let fullName = '';
  for (let i = 0; i < Math.min(lines.length, 6); i++) {
    const l = lines[i];
    const upper = l.toUpperCase();
    if (
      upper.includes('MY CONTACT') || 
      upper.includes('CURRICULUM VITAE') || 
      upper.includes('RESUME') || 
      upper.includes('CONTACT INFO') ||
      upper.includes('PERSONAL DETAILS') ||
      l.includes('@') ||
      l.includes('http') ||
      /^\+?\d/.test(l)
    ) {
      continue;
    }
    const cleaned = l.replace(/^(Name|Full Name|Candidate Name)[:\s-]*/i, '').trim();
    if (cleaned.length >= 2 && cleaned.length <= 45 && !cleaned.includes(':') && !cleaned.includes('|')) {
      fullName = cleaned;
      break;
    }
  }
  if (!fullName) {
    fullName = lines[0] ? lines[0].replace(/^(Name|Full Name)[:\s-]*/i, '').trim() : 'Professional Candidate';
  }

  // 6. Section Parsing
  const sectionKeywords: { [key: string]: 'summary' | 'experience' | 'education' | 'skills' | 'other' } = {
    'SUMMARY': 'summary',
    'PROFESSIONAL SUMMARY': 'summary',
    'CAREER OBJECTIVE': 'summary',
    'PROFILE': 'summary',
    'ABOUT ME': 'summary',
    'EXECUTIVE SUMMARY': 'summary',
    'EXPERIENCE': 'experience',
    'WORK EXPERIENCE': 'experience',
    'PROFESSIONAL EXPERIENCE': 'experience',
    'EMPLOYMENT HISTORY': 'experience',
    'CAREER HISTORY': 'experience',
    'LEADERSHIP EXPERIENCE': 'experience',
    'EDUCATION': 'education',
    'ACADEMIC BACKGROUND': 'education',
    'EDUCATIONAL QUALIFICATIONS': 'education',
    'QUALIFICATIONS': 'education',
    'SKILLS': 'skills',
    'CORE COMPETENCIES': 'skills',
    'TECHNICAL SKILLS': 'skills',
    'KEY SKILLS': 'skills',
    'CORE SKILLS': 'skills',
    'PROJECTS': 'other',
    'CERTIFICATIONS': 'other',
    'TRAININGS': 'other',
    'VOLUNTEER WORK': 'other',
    'AWARDS': 'other',
    'PUBLICATIONS': 'other',
    'MEMBERSHIPS': 'other',
    'AFFILIATIONS': 'other'
  };

  let currentSectionType: 'summary' | 'experience' | 'education' | 'skills' | 'other' | 'none' = 'none';
  let currentSectionTitle = '';
  
  let summaryText = '';
  const skillsList: string[] = [];
  const experienceBlocks: { roleTitle?: string; organization?: string; dateRange?: string; bullets: string[] }[] = [];
  const educationBlocks: { degree?: string; institution?: string; yearOrCgpa?: string }[] = [];
  const otherSections: { title: string; lines: string[] }[] = [];

  let currentExpBlock: { roleTitle?: string; organization?: string; dateRange?: string; bullets: string[] } | null = null;
  let currentEduBlock: { degree?: string; institution?: string; yearOrCgpa?: string } | null = null;
  let currentOtherBlock: { title: string; lines: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const upperLine = rawLine.toUpperCase().replace(/[:\-_#]/g, '').trim();

    // Check if line is a section header
    let matchedSection: 'summary' | 'experience' | 'education' | 'skills' | 'other' | null = null;
    for (const [secKey, secVal] of Object.entries(sectionKeywords)) {
      if (upperLine === secKey || upperLine.startsWith(secKey + ' ') || upperLine.endsWith(' ' + secKey)) {
        matchedSection = secVal;
        currentSectionTitle = rawLine;
        break;
      }
    }

    if (matchedSection) {
      if (currentExpBlock && (currentExpBlock.bullets.length > 0 || currentExpBlock.roleTitle)) {
        experienceBlocks.push(currentExpBlock);
        currentExpBlock = null;
      }
      if (currentEduBlock) {
        educationBlocks.push(currentEduBlock);
        currentEduBlock = null;
      }
      if (currentOtherBlock && currentOtherBlock.lines.length > 0) {
        otherSections.push(currentOtherBlock);
        currentOtherBlock = null;
      }

      currentSectionType = matchedSection;
      continue;
    }

    if (currentSectionType === 'summary') {
      summaryText += (summaryText ? ' ' : '') + rawLine;
    } else if (currentSectionType === 'skills') {
      const splitSkills = rawLine.split(/[•,|;·\n]/).map(s => s.replace(/^[-*•·▪▫\s]+/, '').trim()).filter(s => s.length > 1 && s.length < 40);
      splitSkills.forEach(s => {
        if (!skillsList.includes(s)) skillsList.push(s);
      });
    } else if (currentSectionType === 'experience') {
      // Clean leading bullet marks and asterisks
      const isExplicitBullet = /^[-•*–▪▫·	]+\s*/.test(rawLine) || rawLine.startsWith('* ');
      const cleanLine = rawLine.replace(/^[-•*–▪▫·	\s*]+/, '').trim();

      // Check if line is lone date word like "Present" or "Jan 2024"
      const isLoneDate = /^(Present|Ongoing|Current|\d{4}|\w+\s+\d{4}|\w+\s+\d{4}\s*[-–]\s*(Present|Ongoing|\d{4}))$/i.test(cleanLine);
      if (isLoneDate && currentExpBlock) {
        currentExpBlock.dateRange = (currentExpBlock.dateRange ? currentExpBlock.dateRange + ' - ' : '') + cleanLine;
        continue;
      }

      const isHeaderLine = !isExplicitBullet && (rawLine.includes('|') || rawLine.includes('–') || (rawLine.length < 75 && (rawLine.includes('Hospital') || rawLine.includes('Ltd') || rawLine.includes('Inc') || rawLine.includes('Navy') || rawLine.includes('Officer') || rawLine.includes('Director') || rawLine.includes('Center') || rawLine.includes('Manager'))));

      if (isHeaderLine && (!currentExpBlock || currentExpBlock.bullets.length > 0)) {
        if (currentExpBlock) experienceBlocks.push(currentExpBlock);
        
        const parts = cleanLine.split(/[|–]/).map(p => p.trim());
        currentExpBlock = {
          roleTitle: parts[0] || cleanLine,
          organization: parts[1] || undefined,
          dateRange: parts[2] || (parts.length > 1 && parts[parts.length - 1].match(/\d{4}/) ? parts[parts.length - 1] : undefined),
          bullets: []
        };
      } else {
        if (!currentExpBlock) {
          currentExpBlock = { roleTitle: 'Key Professional Experience', bullets: [] };
        }

        // If this line does NOT start with a bullet and is short or continuation, merge with previous bullet
        if (!isExplicitBullet && currentExpBlock.bullets.length > 0 && (cleanLine.length < 60 || !cleanLine.match(/^[A-Z][a-z]+/))) {
          const lastIdx = currentExpBlock.bullets.length - 1;
          currentExpBlock.bullets[lastIdx] = currentExpBlock.bullets[lastIdx] + ' ' + cleanLine;
        } else {
          currentExpBlock.bullets.push(cleanLine);
        }
      }
    } else if (currentSectionType === 'education') {
      const cleanEdu = rawLine.replace(/^[-•*–▪▫·	\s]+/, '').trim();
      if (!currentEduBlock) {
        currentEduBlock = { degree: cleanEdu };
      } else if (!currentEduBlock.institution) {
        currentEduBlock.institution = cleanEdu;
      } else {
        currentEduBlock.yearOrCgpa = (currentEduBlock.yearOrCgpa ? currentEduBlock.yearOrCgpa + ' | ' : '') + cleanEdu;
        educationBlocks.push(currentEduBlock);
        currentEduBlock = null;
      }
    } else if (currentSectionType === 'other') {
      if (!currentOtherBlock) {
        currentOtherBlock = { title: currentSectionTitle || 'Additional Credentials', lines: [] };
      }
      const cleanOther = rawLine.replace(/^[-•*–▪▫·	\s]+/, '').trim();
      if (cleanOther) currentOtherBlock.lines.push(cleanOther);
    }
  }

  if (currentExpBlock) experienceBlocks.push(currentExpBlock);
  if (currentEduBlock) educationBlocks.push(currentEduBlock);
  if (currentOtherBlock) otherSections.push(currentOtherBlock);

  if (experienceBlocks.length === 0) {
    const defaultExp = { roleTitle: 'Key Professional Experience', bullets: [] as string[] };
    for (const l of lines) {
      if (l.length > 20 && !l.includes('@') && !l.includes('http')) {
        defaultExp.bullets.push(l.replace(/^[-•*–▪▫·	\s]+/, ''));
      }
    }
    if (defaultExp.bullets.length > 0) experienceBlocks.push(defaultExp);
  }

  return {
    fullName,
    email,
    phone,
    location,
    linkedIn,
    summary: summaryText,
    skills: skillsList,
    experience: experienceBlocks,
    education: educationBlocks,
    otherSections,
    rawText
  };
}
