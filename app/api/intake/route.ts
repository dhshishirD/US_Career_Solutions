import { NextRequest, NextResponse } from 'next/server';

export interface IntakeSubmissionPayload {
  id?: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  plan?: string;
  targetRoles: string[];
  preferredLocations: string[];
  workAuthorization: string;
  minSalaryTarget: string;
  targetCompanyTypes: string[];
  specificTargetCompanies?: string;
  experienceYears: string;
  coreSkills: string[];
  dealBreakers?: string;
  linkedInUrl?: string;
  githubOrPortfolioUrl?: string;
  notesForFulfillment?: string;
  submittedAt?: string;
}

// In-memory cache of client intake requests
const RECENT_INTAKES: (IntakeSubmissionPayload & { id: string; submittedAt: string })[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: IntakeSubmissionPayload = await request.json();

    if (!body.userEmail || !body.targetRoles || body.targetRoles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User email and at least one target role are required.' },
        { status: 400 }
      );
    }

    const id = body.id || `USC-INTAKE-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const recorded = {
      ...body,
      id,
      submittedAt
    };

    // Remove older submission from same email if exists
    const existingIndex = RECENT_INTAKES.findIndex(i => i.userEmail.toLowerCase() === body.userEmail.toLowerCase());
    if (existingIndex >= 0) {
      RECENT_INTAKES[existingIndex] = recorded;
    } else {
      RECENT_INTAKES.unshift(recorded);
    }

    if (RECENT_INTAKES.length > 300) {
      RECENT_INTAKES.pop();
    }

    return NextResponse.json({
      success: true,
      message: 'Client intake profile registered successfully.',
      intake: recorded
    });
  } catch (error) {
    console.error('Intake recording error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing intake.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (email) {
    const found = RECENT_INTAKES.find(i => i.userEmail.toLowerCase() === email.toLowerCase());
    return NextResponse.json({ success: true, intake: found || null });
  }

  return NextResponse.json({
    success: true,
    total: RECENT_INTAKES.length,
    intakes: RECENT_INTAKES
  });
}
