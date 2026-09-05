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
  const locationMatch = rawText.match(/(?:Address[:\s]*)?([A-Za-z\s]+,\s*(?:Dhaka|Chittagong|Sylhet|Rajshahi|Feni|Bangladesh|USA|CA|NY|TX|UK|India|Pakistan|Canada|Germany|Remote)[A-Za-z\s,]*)/i);
  let location = locationMatch ? locationMatch[1].replace(/^Address[:\s]*/i, '').trim() : undefined;
  if (location && location.length > 50) location = location.slice(0, 50);

  // 5. Extract Full Name (Ignore header labels like "MY CONTACT", "CURRICULUM VITAE", "RESUME")
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
    if (cleaned.length >= 2 && cleaned.length <= 40 && !cleaned.includes(':') && !cleaned.includes('|')) {
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
    'PUBLICATIONS': 'other'
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
    const line = lines[i];
    const upperLine = line.toUpperCase().replace(/[:\-_#]/g, '').trim();

    let matchedSection: 'summary' | 'experience' | 'education' | 'skills' | 'other' | null = null;
    for (const [secKey, secVal] of Object.entries(sectionKeywords)) {
      if (upperLine === secKey || upperLine.startsWith(secKey + ' ') || upperLine.endsWith(' ' + secKey)) {
        matchedSection = secVal;
        currentSectionTitle = line;
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
      summaryText += (summaryText ? ' ' : '') + line;
    } else if (currentSectionType === 'skills') {
      const splitSkills = line.split(/[•,|;·\n]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 40);
      splitSkills.forEach(s => {
        if (!skillsList.includes(s)) skillsList.push(s);
      });
    } else if (currentSectionType === 'experience') {
      const isBullet = line.startsWith('-') || line.startsWith('•') || line.startsWith('*') || line.startsWith('–');
      const isHeaderLine = !isBullet && (line.includes('|') || line.includes('–') || line.includes('- 20') || line.includes('20') || line.length < 70);

      if (isHeaderLine && (!currentExpBlock || currentExpBlock.bullets.length > 0)) {
        if (currentExpBlock) experienceBlocks.push(currentExpBlock);
        
        const parts = line.split(/[|–-]/).map(p => p.trim());
        currentExpBlock = {
          roleTitle: parts[0] || line,
          organization: parts[1] || undefined,
          dateRange: parts[2] || (parts.length > 1 && parts[parts.length - 1].match(/\d{4}/) ? parts[parts.length - 1] : undefined),
          bullets: []
        };
      } else {
        if (!currentExpBlock) {
          currentExpBlock = { roleTitle: 'Experience', bullets: [] };
        }
        const cleanBullet = isBullet ? line.replace(/^[-•*–]\s*/, '') : line;
        currentExpBlock.bullets.push(cleanBullet);
      }
    } else if (currentSectionType === 'education') {
      if (!currentEduBlock) {
        currentEduBlock = { degree: line };
      } else if (!currentEduBlock.institution) {
        currentEduBlock.institution = line;
      } else {
        currentEduBlock.yearOrCgpa = (currentEduBlock.yearOrCgpa ? currentEduBlock.yearOrCgpa + ' | ' : '') + line;
        educationBlocks.push(currentEduBlock);
        currentEduBlock = null;
      }
    } else if (currentSectionType === 'other') {
      if (!currentOtherBlock) {
        currentOtherBlock = { title: currentSectionTitle || 'Additional Details', lines: [] };
      }
      currentOtherBlock.lines.push(line);
    }
  }

  if (currentExpBlock) experienceBlocks.push(currentExpBlock);
  if (currentEduBlock) educationBlocks.push(currentEduBlock);
  if (currentOtherBlock) otherSections.push(currentOtherBlock);

  // If experience is empty, try to parse lines gracefully
  if (experienceBlocks.length === 0) {
    const defaultExp: { roleTitle: string; bullets: string[] } = { roleTitle: 'Key Professional Experience', bullets: [] };
    for (const l of lines) {
      if (l.length > 25 && !l.includes('@') && !l.includes('http')) {
        defaultExp.bullets.push(l.replace(/^[-•*–]\s*/, ''));
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
    summary: summaryText || `Results-driven professional with proven expertise in executing high-impact initiatives, stakeholder collaboration, and operational excellence.`,
    skills: skillsList,
    experience: experienceBlocks,
    education: educationBlocks,
    otherSections,
    rawText
  };
}
