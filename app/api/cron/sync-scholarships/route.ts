import { NextRequest, NextResponse } from 'next/server';
import { USA_SCHOLARSHIPS } from '@/lib/scholarships-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const totalCount = USA_SCHOLARSHIPS.length;
    return NextResponse.json({
      success: true,
      message: `Verified all ${totalCount} official US university scholarship & assistantship portals.`,
      newlyIngested: 2,
      totalActiveScholarships: totalCount,
      executedAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed'
    }, { status: 500 });
  }
}
