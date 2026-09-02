import { NextRequest, NextResponse } from 'next/server';
import { getJobsList } from '@/lib/jobs-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const sponsorship = searchParams.get('sponsorship') || '';
  const category = searchParams.get('category') || '';
  const remoteOnly = searchParams.get('remote') === 'true';
  const minSalary = Number(searchParams.get('minSalary')) || 0;

  const allJobs = getJobsList();

  const filtered = allJobs.filter(job => {
    if (q) {
      const matchQuery = 
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q));
      if (!matchQuery) return false;
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
    timestamp: new Date().toISOString()
  });
}
