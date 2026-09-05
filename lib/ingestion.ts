import { JobPosting, VisaSponsorshipType } from './types';
import { lookupCompanySponsorship } from './sponsorship-db';

interface RawExternalJob {
  id?: string | number;
  title?: string;
  company_name?: string;
  companyName?: string;
  location?: string;
  candidate_required_location?: string;
  jobGeo?: string;
  description?: string;
  jobDescription?: string;
  url?: string;
  urlApply?: string;
  publication_date?: string;
  pubDate?: string;
  salary?: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
  category?: string;
  jobCategory?: string;
}

export function detectVisaSponsorship(
  company: string,
  title: string,
  description: string,
  location: string
): { type: VisaSponsorshipType; confidence: 'high' | 'medium' | 'unverified' } {
  const text = `${title} ${description} ${location}`.toLowerCase();
  const sponsorRec = lookupCompanySponsorship(company);

  if (text.includes('contractor') || text.includes('w-8ben') || text.includes('anywhere in the world') || text.includes('global remote') || text.includes('worldwide') || text.includes('anywhere')) {
    return { type: 'US Remote (Contractor/W-8BEN)', confidence: 'high' };
  }

  if (text.includes('cap-exempt') || text.includes('university') || text.includes('school of medicine') || (sponsorRec && sponsorRec.capExempt)) {
    return { type: 'Cap-Exempt H-1B', confidence: 'high' };
  }

  if (text.includes('schedule a') || (text.includes('nurse') && text.includes('green card')) || text.includes('nclex')) {
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

  return { type: 'US Remote (Contractor/W-8BEN)', confidence: 'medium' };
}

export async function fetchLiveRemoteAndUSJobs(): Promise<JobPosting[]> {
  const newlyFetched: JobPosting[] = [];

  // Feed 1: Remotive Public API (up to 50 jobs)
  try {
    const res = await fetch('https://remotive.com/api/remote-jobs?limit=50', {
      headers: { 'User-Agent': 'USCareerSolutions/1.0' },
      next: { revalidate: 1800 }
    });

    if (res.ok) {
      const data = await res.json();
      const jobs: RawExternalJob[] = data.jobs || [];

      for (const item of jobs) {
        const cName = item.company_name || item.companyName;
        if (!item.title || !cName) continue;

        const loc = item.candidate_required_location || item.location || 'Worldwide / Remote';
        const desc = item.description ? item.description.replace(/<[^>]*>?/gm, ' ').slice(0, 1000) : '';
        const { type: visaType, confidence } = detectVisaSponsorship(cName, item.title, desc, loc);

        let category: JobPosting['category'] = 'Software & Tech';
        const catLower = (item.category || item.title).toLowerCase();
        if (catLower.includes('customer') || catLower.includes('support') || catLower.includes('helpdesk')) category = 'Customer Support & Helpdesk';
        else if (catLower.includes('virtual') || catLower.includes('assistant') || catLower.includes('admin')) category = 'Virtual Assistant & Admin';
        else if (catLower.includes('data') || catLower.includes('ai') || catLower.includes('annotation')) category = 'Data, AI Training & Annotation';
        else if (catLower.includes('health') || catLower.includes('nurse') || catLower.includes('medical')) category = 'Healthcare & Nursing';
        else if (catLower.includes('finance') || catLower.includes('business') || catLower.includes('analyst')) category = 'Business & Finance';
        else if (catLower.includes('marketing') || catLower.includes('sales')) category = 'Marketing & Sales';

        const isEntry = item.title.toLowerCase().includes('junior') || 
                        item.title.toLowerCase().includes('entry') || 
                        item.title.toLowerCase().includes('associate') || 
                        item.title.toLowerCase().includes('assistant');
        const experienceLevel = isEntry ? 'Entry Level / Junior' : undefined;

        newlyFetched.push({
          id: `ext-${item.id || Math.random().toString(36).substring(2, 9)}`,
          title: item.title,
          company: cName,
          location: loc,
          isRemote: true,
          category,
          experienceLevel,
          salaryCurrency: 'USD',
          visaSponsorship: visaType,
          sponsorshipConfidence: confidence,
          description: desc,
          requirements: [
            'Demonstrated relevant background and portfolio/work demonstration',
            'Strong English language communication (written and asynchronous)',
            'Reliable workspace and motivation for distributed global teamwork'
          ],
          skills: ['Communication', 'Remote Collaboration', 'Problem Solving'],
          sourceUrl: item.url || 'https://remotive.com',
          atsType: 'direct',
          postedDate: item.publication_date || new Date().toISOString(),
          isFeatured: false
        });
      }
    }
  } catch (err) {
    console.warn('Remotive feed fetch warning:', err);
  }

  // Feed 2: Jobicy Worldwide Public Remote API
  try {
    const res = await fetch('https://jobicy.com/api/v2/remote-jobs?count=30&geo=worldwide', {
      headers: { 'User-Agent': 'USCareerSolutions/1.0' },
      next: { revalidate: 1800 }
    });

    if (res.ok) {
      const data = await res.json();
      const jobs: RawExternalJob[] = data.jobs || [];

      for (const item of jobs) {
        const cName = item.companyName || item.company_name;
        if (!item.title || !cName) continue;

        const loc = item.jobGeo || item.location || 'Worldwide Remote';
        const desc = item.jobDescription ? item.jobDescription.replace(/<[^>]*>?/gm, ' ').slice(0, 1000) : '';
        const { type: visaType, confidence } = detectVisaSponsorship(cName, item.title, desc, loc);

        newlyFetched.push({
          id: `jobicy-${item.id || Math.random().toString(36).substring(2, 9)}`,
          title: item.title,
          company: cName,
          location: loc,
          isRemote: true,
          category: 'Software & Tech',
          salaryMin: item.annualSalaryMin,
          salaryMax: item.annualSalaryMax,
          salaryCurrency: 'USD',
          visaSponsorship: visaType,
          sponsorshipConfidence: confidence,
          description: desc,
          requirements: [
            'Proven track record in remote operations and technical communication',
            'Independent problem solving in asynchronous work environments'
          ],
          skills: ['Remote Work', 'English Fluency', 'Specialized Knowledge'],
          sourceUrl: item.url || item.urlApply || 'https://jobicy.com',
          atsType: 'direct',
          postedDate: item.pubDate || new Date().toISOString(),
          isFeatured: false
        });
      }
    }
  } catch (err) {
    console.warn('Jobicy feed fetch warning:', err);
  }

  return newlyFetched;
}
