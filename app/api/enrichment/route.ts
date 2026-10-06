import { NextRequest, NextResponse } from 'next/server';
import { deriveDecisionMakersForCompany, generateDecisionMakerOutreach, fetchLiveApolloOrg } from '@/lib/enrichment-service';

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
    
    // Concurrently fetch live Apollo organization data and decision makers
    const [liveOrg, rawDecisionMakers] = await Promise.all([
      fetchLiveApolloOrg(company),
      Promise.resolve(deriveDecisionMakersForCompany(company, role, category))
    ]);

    const enriched = rawDecisionMakers.map(dm => {
      const outreach = generateDecisionMakerOutreach(dm, candidateName, role, visa, skills);
      return {
        ...dm,
        companyDomain: liveOrg?.website_url ? liveOrg.website_url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : dm.companyDomain,
        location: liveOrg?.city && liveOrg?.state ? `${liveOrg.city}, ${liveOrg.state}` : dm.location,
        outreach
      };
    });

    return NextResponse.json({
      success: true,
      company,
      role,
      apolloIntelligence: liveOrg ? {
        connected: true,
        employees: liveOrg.estimated_num_employees,
        industry: liveOrg.industry,
        headquarters: liveOrg.city && liveOrg.state ? `${liveOrg.city}, ${liveOrg.state}, ${liveOrg.country}` : 'United States',
        website: liveOrg.website_url,
        linkedin: liveOrg.linkedin_url
      } : { connected: false },
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
