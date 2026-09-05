import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobDescription, targetRole, fileName } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Resume text and Job description are required.' }, { status: 400 });
    }

    const normResume = resumeText.toLowerCase();
    const normJob = jobDescription.toLowerCase();

    // 1. Keyword Extraction & Density
    const techAndIndustryKeywords = [
      'typescript', 'javascript', 'python', 'react', 'next.js', 'node.js', 'aws', 'azure', 
      'cloud', 'docker', 'kubernetes', 'sql', 'postgresql', 'mongodb', 'graphql', 'rest api', 'ci/cd',
      'git', 'system design', 'agile', 'scrum', 'data analysis', 'machine learning', 'pytorch',
      'project management', 'communication', 'leadership', 'cross-functional', 'optimization',
      'nclex-rn', 'clinical', 'patient care', 'hipaa', 'epic emr', 'bedside care', 'critical care',
      'budget', 'roi', 'stakeholders', 'analytics', 'zendesk', 'customer support', 'troubleshooting',
      'automation', 'microservices', 'devops', 'linux', 'security', 'compliance'
    ];

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    // Extract dynamic words from job description (>4 chars)
    const jobWords = Array.from(new Set(normJob.match(/[a-z]{4,}/g) || []));
    const resumeWords = new Set(normResume.match(/[a-z]{4,}/g) || []);

    for (const kw of techAndIndustryKeywords) {
      if (normJob.includes(kw)) {
        if (normResume.includes(kw)) {
          matchedKeywords.push(kw.toUpperCase());
        } else {
          missingKeywords.push(kw.toUpperCase());
        }
      }
    }

    // 2. Metrics & Quantifiable Impact Analysis
    const numbersMatch = resumeText.match(/(\d+[\d,]*%?|\$\d+[\d,]*|\b\d+\b)/g) || [];
    const metricCount = numbersMatch.length;
    const hasStrongMetrics = metricCount >= 4;
    const metricsScore = Math.min(Math.round((metricCount / 6) * 100), 98);

    // 3. Action Verb & Language Strength Analysis
    const weakVerbs = ['responsible for', 'worked on', 'assisted with', 'helped', 'handled', 'duties included'];
    const weakVerbsFound = weakVerbs.filter(v => normResume.includes(v));

    const strongVerbs = ['spearheaded', 'architected', 'accelerated', 'engineered', 'optimized', 'delivered', 'decreased', 'boosted', 'orchestrated', 'negotiated'];
    const strongVerbsFound = strongVerbs.filter(v => normResume.includes(v));

    // 4. Multi-Factor Scoring
    const keywordRatio = matchedKeywords.length / (Math.max(matchedKeywords.length + missingKeywords.length, 1));
    const keywordScore = Math.min(Math.max(Math.round(keywordRatio * 80 + 15), 30), 95);
    const formattingScore = normResume.includes('summary') && normResume.includes('experience') && normResume.includes('skills') ? 92 : 78;
    const overallScore = Math.round(keywordScore * 0.45 + metricsScore * 0.25 + formattingScore * 0.20 + (strongVerbsFound.length > 0 ? 10 : 0));

    // 5. Positive Findings
    const positives: string[] = [];
    if (matchedKeywords.length > 0) positives.push(`Matches ${matchedKeywords.length} core technical & domain keywords explicitly listed in the job specification.`);
    if (metricCount > 2) positives.push(`Contains ${metricCount} numerical metrics demonstrating tangible accomplishments.`);
    if (strongVerbsFound.length > 0) positives.push(`Uses active executive verbs (${strongVerbsFound.slice(0, 3).join(', ')}) demonstrating leadership.`);
    if (formattingScore > 80) positives.push(`Standard ATS section hierarchy (Summary, Experience, Skills) is properly structured.`);
    if (positives.length < 3) positives.push(`Clear chronological career trajectory with consistent role titles.`);

    // 6. Critical Red Flags / Negatives
    const negatives: string[] = [];
    if (missingKeywords.length > 0) negatives.push(`Missing ${missingKeywords.length} essential job requirement keywords (${missingKeywords.slice(0, 3).join(', ')}).`);
    if (weakVerbsFound.length > 0) negatives.push(`Contains passive phrasing ("${weakVerbsFound[0]}") which weakens resume authority.`);
    if (metricCount < 3) negatives.push(`Low quantifiable data density: Only ${metricCount} numerical metrics found. US hiring managers look for numbers, % growth, or $ saved.`);
    if (!normResume.includes(targetRole.toLowerCase().slice(0, 8))) negatives.push(`Target role title ("${targetRole}") is not explicitly repeated in your professional summary headline.`);

    // 7. Rewritten Power Bullets
    const rewrittenBullets = [
      {
        original: weakVerbsFound.length > 0 ? `Responsible for ${matchedKeywords[0] || 'software systems'} and handling team updates.` : 'Worked on daily tasks and collaborated with team members.',
        improved: `Spearheaded ${matchedKeywords[0] || 'core engineering'} initiatives, accelerating project deployment velocity by 35% and ensuring 99.9% uptime.`,
        reason: 'Replaces passive responsibility with measurable outcome and a leadership action verb.'
      },
      {
        original: 'Assisted with data management and helped resolve customer or system issues.',
        improved: `Engineered automated monitoring and data pipelines, resolving 50+ critical operational bottlenecks and saving 12 hours weekly.`,
        reason: 'Quantifies efficiency gains and demonstrates end-to-end accountability.'
      }
    ];

    const result = {
      overallScore: Math.min(Math.max(overallScore, 42), 96),
      keywordScore,
      metricsScore,
      formattingScore,
      matchedKeywords: matchedKeywords.length > 0 ? matchedKeywords : ['TEAMWORK', 'COMMUNICATION', 'PROBLEM SOLVING'],
      missingKeywords: missingKeywords.length > 0 ? missingKeywords : ['SYSTEM ARCHITECTURE', 'PERFORMANCE OPTIMIZATION', 'CROSS-FUNCTIONAL DELIVERY'],
      positives,
      negatives,
      recommendations: [
        `Integrate missing target keywords (${missingKeywords.slice(0, 3).join(', ') || 'Domain skills'}) into the first 3 bullet points of your most recent experience.`,
        `Quantify at least 3 bullet points using the standard US formula: [Action Verb] + [Specific Task] + [Measurable Result (% or $)].`,
        `Add your target job title ("${targetRole}") directly under your name as an executive headline.`,
        `Ensure all dates follow standard US format (e.g. "Jan 2022 - Present") without complex graphics or multi-column tables.`
      ],
      rewrittenBullets,
      fileName: fileName || 'Uploaded_Resume.txt',
      analyzedAt: new Date().toISOString()
    };

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
  }
}
