import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveRemoteAndUSJobs } from '@/lib/ingestion';
import { addOrUpdateJobs, getJobsList } from '@/lib/jobs-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Check authorization header if CRON_SECRET is configured in environment
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
  }

  try {
    const fetched = await fetchLiveRemoteAndUSJobs();
    if (fetched.length > 0) {
      addOrUpdateJobs(fetched);
    }

    const currentTotal = getJobsList().length;

    return NextResponse.json({
      success: true,
      message: `Sync completed successfully. Ingested ${fetched.length} fresh jobs.`,
      newlyIngested: fetched.length,
      totalActiveJobs: currentTotal,
      executedAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed'
    }, { status: 500 });
  }
}
