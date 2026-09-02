import { JobPosting, VisaSponsorshipType } from './types';
import { lookupCompanySponsorship } from './sponsorship-db';

interface RawExternalJob {
  id?: string;
  title?: string;
  company_name?: string;
  location?: string;
  candidate_required_location?: string;
  description?: string;
  url?: string;
  publication_date?: string;
  salary?: string;
  category?: string;
}

export function detectVisaSponsorship(
  company: string,
  title: string,
  description: string,
  location: string
): { type: VisaSponsorshipType; confidence: 'high' | 'medium' | 'unverified' } {
  const text = `${title} ${description} ${location}`.toLowerCase();
  const sponsorRec = lookupCompanySponsorship(company);

  if (text.includes('contractor') || text.includes('w-8ben') || text.includes('anywhere in the world') || text.includes('global remote') || text.includes('worldwide')) {
    return { type: 'US Remote (Contractor/W-8BEN)', confidence: 'high' };
  }

  if (text.includes('cap-exempt') || text.includes('university') || text.includes('school of medicine') || (sponsorRec && sponsorRec.capExempt)) {
    return { type: 'Cap-Exempt H-1B', confidence: 'high' };
  }

  if (text.includes('opt') || text.includes('cpt') || text.includes('stem opt') || text.includes('f-1')) {
    return { type: 'OPT/CPT Friendly', confidence: 'high' };
  }

  if (text.includes('visa sponsorship provided') || text.includes('h-1b sponsorship') || text.includes('will sponsor') || (sponsorRec && sponsorRec.approvalRate > 95)) {
    return { type: 'H-1B Sponsor', confidence: sponsorRec ? 'high' : 'medium' };
  }

  if (text.includes('no sponsorship') || text.includes('must have existing work authorization') || text.includes('us citizen or green card only') || text.includes('security clearance required')) {
    return { type: 'Requires US Auth', confidence: 'high' };
  }

  if (sponsorRec) {
    return { type: 'H-1B Sponsor', confidence: 'medium' };
  }

  return { type: 'Requires US Auth', confidence: 'unverified' };
}

export async function fetchLiveRemoteAndUSJobs(): Promise<JobPosting[]> {
  const newlyFetched: JobPosting[] = [];

  try {
    // Fetch from Remotive public API for US / Worldwide roles
    const res = await fetch('https://remotive.com/api/remote-jobs?limit=25', {
      headers: { 'User-Agent': 'USCareerSolutions/1.0' },
      next: { revalidate: 3600 }
    });

    if (res.ok) {
      const data = await res.json();
      const jobs: RawExternalJob[] = data.jobs || [];

      for (const item of jobs) {
        if (!item.title || !item.company_name) continue;

        const loc = item.candidate_required_location || item.location || 'USA / Remote';
        const isUSOrGlobal = loc.toLowerCase().includes('usa') || 
                             loc.toLowerCase().includes('united states') || 
                             loc.toLowerCase().includes('anywhere') || 
                             loc.toLowerCase().includes('worldwide');

        if (!isUSOrGlobal) continue;

        const desc = item.description ? item.description.replace(/<[^>]*>?/gm, ' ').slice(0, 1000) : '';
        const { type: visaType, confidence } = detectVisaSponsorship(item.company_name, item.title, desc, loc);

        let category: JobPosting['category'] = 'Software & Tech';
        const catLower = (item.category || item.title).toLowerCase();
        if (catLower.includes('customer') || catLower.includes('support') || catLower.includes('helpdesk')) category = 'Customer Support & Helpdesk';
        else if (catLower.includes('virtual') || catLower.includes('assistant') || catLower.includes('admin')) category = 'Virtual Assistant & Admin';
        else if (catLower.includes('data') || catLower.includes('ai') || catLower.includes('machine learning') || catLower.includes('annotation')) category = 'Data, AI Training & Annotation';
        else if (catLower.includes('health') || catLower.includes('nurse') || catLower.includes('medical')) category = 'Healthcare & Nursing';
        else if (catLower.includes('finance') || catLower.includes('business') || catLower.includes('analyst')) category = 'Business & Finance';
        else if (catLower.includes('engineer') && !catLower.includes('software')) category = 'Engineering';
        else if (catLower.includes('marketing') || catLower.includes('sales')) category = 'Marketing & Sales';

        const isEntry = item.title.toLowerCase().includes('junior') || 
                        item.title.toLowerCase().includes('entry') || 
                        item.title.toLowerCase().includes('associate') || 
                        item.title.toLowerCase().includes('intern') ||
                        item.title.toLowerCase().includes('assistant');
        const experienceLevel = isEntry ? 'Entry Level / Junior' : undefined;

        newlyFetched.push({
          id: `ext-${item.id || Math.random().toString(36).substring(2, 9)}`,
          title: item.title,
          company: item.company_name,
          location: loc,
          isRemote: true,
          category,
          experienceLevel,
          salaryCurrency: 'USD',
          visaSponsorship: visaType,
          sponsorshipConfidence: confidence,
          description: desc,
          requirements: [
            'Proven professional track record in designated domain',
            'Strong English proficiency and asynchronous remote communication',
            'Portfolio or GitHub / LinkedIn project demonstrations'
          ],
          skills: ['Communication', 'Remote Work', 'Problem Solving'],
          sourceUrl: item.url || 'https://remotive.com',
          atsType: 'direct',
          postedDate: item.publication_date || new Date().toISOString(),
          isFeatured: false
        });
      }
    }
  } catch (err) {
    console.error('External feed fetch warning (fallback active):', err);
  }

  return newlyFetched;
}
