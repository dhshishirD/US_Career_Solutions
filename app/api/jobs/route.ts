import { NextRequest, NextResponse } from 'next/server';
import { getJobsList } from '@/lib/jobs-data';

const STATE_SYNONYMS: Record<string, string[]> = {
  california: ['ca', 'california', 'san francisco', 'los angeles', 'silicon valley', 'mountain view', 'sunnyvale'],
  ca: ['ca', 'california', 'san francisco', 'los angeles', 'silicon valley'],
  'new york': ['ny', 'new york', 'nyc', 'manhattan', 'brooklyn'],
  ny: ['ny', 'new york', 'nyc'],
  texas: ['tx', 'texas', 'austin', 'dallas', 'houston'],
  tx: ['tx', 'texas', 'austin', 'dallas'],
  washington: ['wa', 'washington', 'seattle', 'redmond', 'bellevue'],
  wa: ['wa', 'washington', 'seattle'],
  massachusetts: ['ma', 'massachusetts', 'boston', 'cambridge'],
  ma: ['ma', 'massachusetts', 'boston', 'cambridge'],
  florida: ['fl', 'florida', 'miami', 'orlando', 'tampa'],
  fl: ['fl', 'florida', 'miami'],
  illinois: ['il', 'illinois', 'chicago'],
  il: ['il', 'illinois', 'chicago'],
  georgia: ['ga', 'georgia', 'atlanta'],
  ga: ['ga', 'georgia', 'atlanta'],
  'north carolina': ['nc', 'north carolina', 'raleigh', 'durham', 'charlotte'],
  nc: ['nc', 'north carolina', 'raleigh', 'durham'],
  maryland: ['md', 'maryland', 'baltimore', 'bethesda'],
  md: ['md', 'maryland', 'baltimore'],
  ohio: ['oh', 'ohio', 'cleveland', 'columbus'],
  oh: ['oh', 'ohio', 'cleveland'],
  michigan: ['mi', 'michigan', 'ann arbor', 'detroit'],
  mi: ['mi', 'michigan', 'ann arbor'],
  indiana: ['in', 'indiana', 'west lafayette', 'indianapolis'],
  in: ['in', 'indiana', 'west lafayette'],
  tennessee: ['tn', 'tennessee', 'nashville', 'oak ridge'],
  tn: ['tn', 'tennessee', 'nashville', 'oak ridge'],
  remote: ['remote', 'worldwide', 'w-8ben', 'w8ben', 'work from anywhere']
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQ = searchParams.get('q')?.toLowerCase().trim() || '';
  const sponsorship = searchParams.get('sponsorship') || '';
  const category = searchParams.get('category') || '';
  const remoteOnly = searchParams.get('remote') === 'true';
  const minSalary = Number(searchParams.get('minSalary')) || 0;

  const allJobs = getJobsList();

  const filtered = allJobs.filter(job => {
    if (rawQ) {
      // Direct text matching
      const titleMatch = job.title.toLowerCase().includes(rawQ);
      const companyMatch = job.company.toLowerCase().includes(rawQ);
      const descMatch = job.description.toLowerCase().includes(rawQ);
      const locationMatch = (job.location || '').toLowerCase().includes(rawQ);
      const cityMatch = (job.city || '').toLowerCase().includes(rawQ);
      const stateMatch = (job.state || '').toLowerCase().includes(rawQ);
      const skillsMatch = job.skills.some(s => s.toLowerCase().includes(rawQ));
      const categoryMatch = (job.category || '').toLowerCase().includes(rawQ);

      // Check state synonyms
      let synonymMatch = false;
      const synonyms = STATE_SYNONYMS[rawQ];
      if (synonyms) {
        synonymMatch = synonyms.some(syn => 
          (job.state || '').toLowerCase() === syn ||
          (job.city || '').toLowerCase().includes(syn) ||
          (job.location || '').toLowerCase().includes(syn)
        );
      }

      if (!titleMatch && !companyMatch && !descMatch && !locationMatch && !cityMatch && !stateMatch && !skillsMatch && !categoryMatch && !synonymMatch) {
        return false;
      }
    }

    if (sponsorship && sponsorship !== 'all') {
      if (job.visaSponsorship !== sponsorship) return false;
    }

    if (category && category !== 'all') {
      if (job.category !== category) return false;
    }

    if (remoteOnly && !job.isRemote) {
      return false;
    }

    if (minSalary > 0 && job.salaryMin && job.salaryMin < minSalary) {
      return false;
    }

    return true;
  });

  return NextResponse.json({
    total: filtered.length,
    jobs: filtered,
    fallback: filtered.length === 0 ? allJobs.slice(0, 10) : [],
    timestamp: new Date().toISOString()
  });
}
