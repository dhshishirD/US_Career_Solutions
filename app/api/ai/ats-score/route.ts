import { NextRequest, NextResponse } from 'next/server';
import { ATSAnalysisResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobDescription, targetRole } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Resume text and Job description are required.' }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        const prompt = `You are a certified US Executive Career Coach and Applicant Tracking System (ATS) auditor.
Analyze the following candidate resume against the US job description.
Return a STRICT JSON object (no markdown, no backticks, just raw JSON) matching this TypeScript interface:
{
  "matchScore": number (0 to 100),
  "summary": string (2-3 concise sentences assessing fit),
  "matchedKeywords": string[] (5-8 top matched technical and functional skills),
  "missingKeywords": string[] (4-7 critical keywords mentioned in job description but missing in resume),
  "formattingScore": number (0 to 100),
  "strengthPoints": string[] (3 specific strong points),
  "weaknessPoints": string[] (3 actionable gaps),
  "rewrittenBullets": [
    {
      "original": string (weak bullet from candidate resume or representative phrase),
      "improved": string (rewritten using standard US power action verbs, quantifiable metrics, and business impact),
      "reason": string (why this version passes US ATS scanners and impresses hiring managers)
    }
  ]
}

TARGET ROLE: ${targetRole || 'US Position'}

JOB DESCRIPTION:
${jobDescription.slice(0, 3000)}

CANDIDATE RESUME:
${resumeText.slice(0, 3000)}`;

        const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const jsonText = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            const parsed: ATSAnalysisResult = JSON.parse(jsonText);
            return NextResponse.json(parsed);
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', geminiError);
      }
    }

    // Heuristic analysis engine (works instantly without any external API keys)
    const normalizedResume = resumeText.toLowerCase();
    const normalizedJob = jobDescription.toLowerCase();

    // Extract common tech/business keywords
    const commonKeywords = [
      'typescript', 'javascript', 'python', 'react', 'next.js', 'node.js', 'aws', 'azure', 
      'cloud', 'docker', 'kubernetes', 'sql', 'nosql', 'graphql', 'rest api', 'ci/cd',
      'git', 'system design', 'agile', 'scrum', 'data analysis', 'machine learning',
      'project management', 'communication', 'leadership', 'cross-functional', 'optimization',
      'clinical', 'patient care', 'compliance', 'budget', 'roi', 'stakeholders'
    ];

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    for (const kw of commonKeywords) {
      if (normalizedJob.includes(kw)) {
        if (normalizedResume.includes(kw)) {
          matchedKeywords.push(kw.toUpperCase());
        } else {
          missingKeywords.push(kw.toUpperCase());
        }
      }
    }

    const keywordRatio = matchedKeywords.length / (Math.max(matchedKeywords.length + missingKeywords.length, 1));
    const calculatedScore = Math.min(Math.max(Math.round(keywordRatio * 75 + 20), 35), 94);

    const result: ATSAnalysisResult = {
      matchScore: calculatedScore,
      summary: `Your profile demonstrates foundational alignment with key requirements, matching ${matchedKeywords.length} core competencies. Adding missing US industry terminology will significantly improve your ATS pass rate.`,
      matchedKeywords: matchedKeywords.slice(0, 7),
      missingKeywords: missingKeywords.length > 0 ? missingKeywords.slice(0, 6) : ['SYSTEM DESIGN', 'METRICS & ROI', 'CROSS-FUNCTIONAL COLLABORATION'],
      formattingScore: 85,
      strengthPoints: [
        'Clear demonstration of technical foundations and core responsibilities.',
        'Relevant project experience aligning with the target domain.',
        'Strong contextual terminology matching the primary job track.'
      ],
      weaknessPoints: [
        'Lacks quantifiable metrics (e.g., "% latency reduction", "$ cost savings", "X users served").',
        'Some bullet points start with passive duties rather than strong US action verbs (e.g., "Assisted with" instead of "Spearheaded").',
        'Critical keywords from the job description are not repeated in the top third of the resume.'
      ],
      rewrittenBullets: [
        {
          original: 'Worked on web applications and fixed bugs for the engineering team.',
          improved: 'Architected and deployed responsive full-stack features, decreasing page load times by 38% and resolving 40+ high-priority production defects.',
          reason: 'US recruiters scan for measurable impact and strong leadership action verbs.'
        },
        {
          original: 'Responsible for database management and system updates.',
          improved: 'Optimized high-throughput relational databases and automated CI/CD deployment workflows, achieving 99.9% application uptime.',
          reason: 'Demonstrates accountability, scale, and modern DevOps standards.'
        }
      ]
    };

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
  }
}
