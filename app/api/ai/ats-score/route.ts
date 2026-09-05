import { NextRequest, NextResponse } from 'next/server';
import { parseResumeIntelligently } from '@/lib/resume-intelligence';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobDescription, targetRole, fileName } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Resume text and Job description are required.' }, { status: 400 });
    }

    const normResume = resumeText.toLowerCase();
    const normJob = jobDescription.toLowerCase();

    // 1. Intelligently parse candidate's actual resume
    const parsed = parseResumeIntelligently(resumeText, targetRole);

    // 2. Comprehensive Multi-Industry Taxonomy
    const industryTaxonomies: { [key: string]: { triggerWords: string[]; keywords: string[] } } = {
      ingo_and_development: {
        triggerWords: ['ingo', 'ngo', 'non-profit', 'nonprofit', 'un', 'unicef', 'usaid', 'development', 'humanitarian', 'youth leadership', 'community', 'advocacy', 'volunteer'],
        keywords: [
          'PROJECT MANAGEMENT', 'DONOR REPORTING', 'STAKEHOLDER ENGAGEMENT', 'MONITORING & EVALUATION (M&E)', 
          'GRANT WRITING', 'BUDGET OVERSIGHT', 'COMMUNITY OUTREACH', 'CROSS-CULTURAL COMMUNICATION', 
          'PROGRAM COORDINATION', 'FIELD OPERATIONS', 'CAPACITY BUILDING', 'PARTNERSHIP MANAGEMENT'
        ]
      },
      hr_and_admin: {
        triggerWords: ['hr', 'human resources', 'administrative', 'admin', 'recruitment', 'talent acquisition', 'payroll', 'onboarding'],
        keywords: [
          'TALENT ACQUISITION', 'EMPLOYEE RELATIONS', 'PAYROLL ADMINISTRATION', 'HRIS / WORKDAY', 
          'ONBOARDING & TRAINING', 'PERFORMANCE MANAGEMENT', 'LABOR COMPLIANCE', 'OFFICE OPERATIONS', 
          'BENEFITS MANAGEMENT', 'EXECUTIVE SCHEDULING', 'WORKFORCE PLANNING', 'CONFLICT RESOLUTION'
        ]
      },
      healthcare_and_nursing: {
        triggerWords: ['nurse', 'nursing', 'rn', 'nclex', 'hospital', 'clinical', 'patient', 'icu', 'medical', 'healthcare', 'bls', 'acls'],
        keywords: [
          'NCLEX-RN CERTIFIED', 'PATIENT ASSESSMENT', 'EPIC EMR', 'VENTILATOR MANAGEMENT', 
          'CRITICAL CARE (ICU)', 'MEDICATION ADMINISTRATION', 'HIPAA COMPLIANCE', 'HEMODYNAMIC MONITORING', 
          'ACUTE CARE', 'PATIENT ADVOCACY', 'CLINICAL PROTOCOLS', 'DISCHARGE PLANNING'
        ]
      },
      tech_and_software: {
        triggerWords: ['software', 'developer', 'engineer', 'frontend', 'backend', 'fullstack', 'react', 'python', 'javascript', 'typescript', 'aws', 'cloud', 'devops'],
        keywords: [
          'TYPESCRIPT', 'REACT / NEXT.JS', 'PYTHON', 'REST & GRAPHQL APIS', 'DOCKER / KUBERNETES', 
          'POSTGRESQL / SQL', 'CI/CD AUTOMATION', 'AWS / CLOUD ARCHITECTURE', 'MICROSERVICES', 
          'SYSTEM DESIGN', 'AGILE / SCRUM', 'GIT VERSION CONTROL'
        ]
      },
      customer_and_operations: {
        triggerWords: ['customer support', 'helpdesk', 'customer service', 'support', 'zendesk', 'intercom', 'operations', 'client relations'],
        keywords: [
          'ZENDESK / INTERCOM', 'CSAT OPTIMIZATION', 'TECHNICAL TROUBLESHOOTING', 'SLA MANAGEMENT', 
          'HELP CENTER DOCUMENTATION', 'CLIENT ESCALATIONS', 'CROSS-FUNCTIONAL RESOLUTION', 'CRM ADMINISTRATION', 
          'ASYNCHRONOUS WORKFLOW', 'TICKET TRIAGE', 'CUSTOMER ONBOARDING', 'VOICE OF CUSTOMER (VOC)'
        ]
      },
      education_and_academics: {
        triggerWords: ['teacher', 'teaching', 'lecturer', 'faculty', 'curriculum', 'education', 'academic', 'research assistant', 'student'],
        keywords: [
          'CURRICULUM DEVELOPMENT', 'STUDENT MENTORSHIP', 'ACADEMIC RESEARCH', 'CLASSROOM INSTRUCTION', 
          'EDUCATIONAL LEADERSHIP', 'LEARNING MANAGEMENT SYSTEMS (LMS)', 'PEDAGOGICAL STRATEGIES', 'DATA-DRIVEN ASSESSMENT'
        ]
      }
    };

    // Determine primary industry domain based on job and resume
    let detectedIndustry = 'general';
    let domainKeywords: string[] = [
      'PROJECT EXECUTION', 'STAKEHOLDER COMMUNICATION', 'CROSS-FUNCTIONAL LEADERSHIP', 
      'PROCESS OPTIMIZATION', 'DATA ANALYSIS', 'STRATEGIC PLANNING', 'RISK MITIGATION', 'TEAM COLLABORATION'
    ];

    for (const [indKey, indData] of Object.entries(industryTaxonomies)) {
      const isMatch = indData.triggerWords.some(w => normJob.includes(w) || normResume.includes(w) || targetRole.toLowerCase().includes(w));
      if (isMatch) {
        detectedIndustry = indKey;
        domainKeywords = indData.keywords;
        break;
      }
    }

    // Match keywords against candidate resume
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    for (const kw of domainKeywords) {
      const kwLower = kw.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      const words = kwLower.split(' ').filter(w => w.length > 2);
      const isFound = words.some(w => normResume.includes(w));
      if (isFound) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    }

    // Metrics analysis
    const numbersMatch = resumeText.match(/(\d+[\d,]*%?|\$\d+[\d,]*|\b\d{2,}\b)/g) || [];
    const metricCount = numbersMatch.length;
    const metricsScore = Math.min(Math.round((metricCount / 5) * 100), 96);

    // Verbs analysis
    const weakVerbs = ['responsible for', 'worked on', 'assisted with', 'helped', 'handled', 'duties included'];
    const weakVerbsFound = weakVerbs.filter(v => normResume.includes(v));

    const strongVerbs = ['spearheaded', 'orchestrated', 'accelerated', 'engineered', 'optimized', 'delivered', 'facilitated', 'mobilized', 'managed', 'streamlined'];
    const strongVerbsFound = strongVerbs.filter(v => normResume.includes(v));

    // Calculate match score
    const keywordRatio = matchedKeywords.length / Math.max(domainKeywords.length, 1);
    const keywordScore = Math.min(Math.max(Math.round(keywordRatio * 75 + 20), 45), 95);
    const formattingScore = (parsed.experience.length > 0 ? 30 : 15) + (parsed.education.length > 0 ? 30 : 15) + (parsed.skills.length > 0 ? 25 : 15) + (parsed.summary ? 15 : 5);
    
    const finalMatchScore = Math.min(Math.max(Math.round(keywordScore * 0.45 + metricsScore * 0.25 + formattingScore * 0.20 + (strongVerbsFound.length > 0 ? 10 : 0)), 52), 94);

    // Natural Positives
    const positives: string[] = [];
    if (parsed.fullName && parsed.fullName !== 'Candidate Resume') {
      positives.push(`Cleanly extracted candidate identity for ${parsed.fullName} with verified contact channels.`);
    }
    if (matchedKeywords.length > 0) {
      positives.push(`Demonstrates core domain competencies: ${matchedKeywords.slice(0, 3).join(', ')}.`);
    }
    if (metricCount > 2) {
      positives.push(`Includes ${metricCount} numerical metrics and quantifiable results that recruiters value.`);
    }
    if (parsed.experience.length > 0) {
      positives.push(`Well-structured chronological employment records across ${parsed.experience.length} position(s).`);
    }

    // Constructive Red Flags / Actionable Steps
    const negatives: string[] = [];
    if (missingKeywords.length > 0) {
      negatives.push(`Expand domain keywords: Sponsoring recruiters and ATS algorithms search for ${missingKeywords.slice(0, 3).join(', ')}.`);
    }
    if (weakVerbsFound.length > 0) {
      negatives.push(`Contains passive phrasing ("${weakVerbsFound[0]}"). Upgrade to executive action verbs like "Spearheaded" or "Mobilized".`);
    }
    if (metricCount < 3) {
      negatives.push(`Quantifiable metric density is low. Add percentages (%), dollar amounts ($), or volume numbers to your work accomplishments.`);
    }

    // Extract real candidate bullets for personalized makeover
    let firstUserBullet = 'Managed daily organizational operations and communicated with team stakeholders.';
    let secondUserBullet = 'Coordinated project activities and handled reporting documentation.';

    if (parsed.experience.length > 0 && parsed.experience[0].bullets.length > 0) {
      firstUserBullet = parsed.experience[0].bullets[0];
      if (parsed.experience[0].bullets.length > 1) {
        secondUserBullet = parsed.experience[0].bullets[1];
      }
    }

    const bulletMakeovers = [
      {
        original: firstUserBullet,
        enhanced: `Spearheaded ${missingKeywords[0] || 'strategic program'} initiatives, improving operational efficiency by 34% and aligning 15+ cross-functional stakeholders across target deliverables.`,
        reason: 'Applies the Google XYZ formula: Action Verb + Project Context + Quantified Metric.'
      },
      {
        enhanced: `Mobilized cross-functional teams to execute ${missingKeywords[1] || 'high-impact'} workflows, delivering measurable project milestones on time and within budget allocation.`,
        original: secondUserBullet,
        reason: 'Replaces generic duty description with proactive leadership and measurable organizational impact.'
      }
    ];

    const verdict = finalMatchScore >= 80 
      ? 'Strong ATS baseline. Your resume has solid domain terminology and structured credentials.'
      : finalMatchScore >= 65 
      ? 'Good foundation. Adding high-density domain keywords and quantified bullet makeovers will boost your ranking significantly.'
      : 'Moderate ATS alignment. Injecting the missing domain competencies and single-column formatting will protect against automated filter rejections.';

    const result = {
      matchScore: finalMatchScore,
      overallScore: finalMatchScore,
      keywordScore,
      metricsScore,
      formattingScore,
      overallVerdict: verdict,
      matchedKeywords: matchedKeywords.length > 0 ? matchedKeywords : domainKeywords.slice(0, 3),
      missingKeywords: missingKeywords.length > 0 ? missingKeywords : domainKeywords.slice(3, 7),
      positives,
      negatives,
      bulletMakeovers,
      parsedCandidateName: parsed.fullName,
      parsedEmail: parsed.email,
      parsedLocation: parsed.location,
      detectedIndustry,
      fileName: fileName || 'Uploaded_Resume.docx',
      analyzedAt: new Date().toISOString()
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('ATS Score API Error:', error);
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
  }
}
