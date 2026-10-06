import { NextRequest, NextResponse } from 'next/server';
import { deriveDecisionMakersForCompany, generateDecisionMakerOutreach } from '@/lib/enrichment-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    const role = searchParams.get('role') || 'Candidate Role';
    const category = searchParams.get('category') || 'Tech';
    const candidateName = searchParams.get('candidateName') || 'Candidate';
    const visa = searchParams.get('visa') || 'Work Authorized';
    const skillsParam = searchParams.get('skills') || '';

    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Query parameter "company" is required.' },
        { status: 400 }
      );
    }

    const skills = skillsParam ? skillsParam.split(',') : ['Industry Technologies', 'Project Delivery'];
    const decisionMakers = deriveDecisionMakersForCompany(company, role, category);

    const enriched = decisionMakers.map(dm => {
      const outreach = generateDecisionMakerOutreach(dm, candidateName, role, visa, skills);
      return {
        ...dm,
        outreach
      };
    });

    return NextResponse.json({
      success: true,
      company,
      role,
      count: enriched.length,
      decisionMakers: enriched
    });
  } catch (error) {
    console.error('Enrichment API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to enrich decision makers.' },
      { status: 500 }
    );
  }
}
