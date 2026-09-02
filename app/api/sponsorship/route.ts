import { NextRequest, NextResponse } from 'next/server';
import { TOP_SPONSOR_COMPANIES, lookupCompanySponsorship } from '@/lib/sponsorship-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const company = searchParams.get('company') || '';

  if (!company) {
    return NextResponse.json({
      companies: TOP_SPONSOR_COMPANIES
    });
  }

  const result = lookupCompanySponsorship(company);

  if (!result) {
    return NextResponse.json({
      found: false,
      message: `No public historical filings directly indexed for "${company}". It may be a smaller or newer company. We recommend checking direct LCA records or inquiring about F-1 STEM OPT or H-1B transfer.`,
      companyName: company
    });
  }

  return NextResponse.json({
    found: true,
    data: result
  });
}
