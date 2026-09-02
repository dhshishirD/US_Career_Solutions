import { NextRequest, NextResponse } from 'next/server';
import { OutreachMessageResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateName, targetRole, companyName, keyStrengths, recruiterName } = body;

    const recruiter = recruiterName || 'Hiring Manager';
    const role = targetRole || 'Software Engineer';
    const company = companyName || 'your team';
    const strengths = keyStrengths || 'full-stack development, cloud architecture, and high-impact delivery';

    const result: OutreachMessageResult = {
      subject: `Application & Introduction: ${role} - ${candidateName || 'Experienced Candidate'}`,
      linkedInConnectionNote: `Hi ${recruiter}, I noticed the ${role} opening at ${company}. With a strong background in ${strengths}, I’d love to connect and share how my technical delivery aligns with your current team goals!`,
      coldEmailBody: `Dear ${recruiter},

I hope this note finds you well.

I am writing to express my strong interest in the ${role} role at ${company}. Having followed ${company}’s recent innovations, I was particularly drawn to your team's mission.

Over the past years, I have specialized in ${strengths}. In my recent work, I focused on designing scalable architectures, driving measurable performance improvements, and delivering mission-critical projects on time.

Given the technical and collaborative requirements of this role, I am confident I can make an immediate contribution to ${company}.

I have submitted my formal application through your portal and have attached my resume here for your convenience. I would welcome the opportunity for a brief 10-minute conversation to discuss how my skill set can support your upcoming roadmap.

Thank you for your time and consideration.

Warm regards,

${candidateName || 'Candidate Name'}
LinkedIn: [Your Profile Link]
Portfolio / GitHub: [Your Portfolio Link]
Phone: [Your Phone Number]`,
      followUpMessage: `Hi ${recruiter}, following up on my note regarding the ${role} position at ${company}. I remain very enthusiastic about the opportunity to contribute to your team and would love to answer any questions you might have about my background.`
    };

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 });
  }
}
