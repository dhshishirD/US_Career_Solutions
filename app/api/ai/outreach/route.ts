import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateName, targetRole, companyName, keyStrengths, recruiterName, outreachType } = body;

    const recruiter = recruiterName?.trim() || 'Hiring Manager';
    const role = targetRole?.trim() || 'Software Engineer';
    const company = companyName?.trim() || 'Target Company';
    const strengths = keyStrengths?.trim() || 'full-stack cloud architecture, high-scale performance optimization, and cross-functional team delivery';
    const candidate = candidateName?.trim() || 'Qualified Candidate';

    const result = {
      subject: `Application & Introduction: ${role} - ${candidate}`,
      linkedInConnectionNote: `Hi ${recruiter}, I noticed the ${role} opening at ${company}. With a strong background in ${strengths}, I’d love to connect and share how my background directly supports your current team roadmap!`,
      coldEmailBody: `Dear ${recruiter},

I hope you are having a productive week.

I am reaching out to formally express my interest in the ${role} role at ${company}. Having followed ${company}’s recent innovations and product growth, I was particularly drawn to your team's mission and engineering standards.

Over the past years, I have specialized in ${strengths}. In my recent work, I focused on designing scalable architectures, driving measurable performance gains, and executing mission-critical projects with high reliability.

Given the requirements of the ${role} position, I am confident I can make an immediate, tangible impact at ${company}.

I have submitted my formal application through your portal and have attached my resume for your convenience. I would welcome the opportunity for a brief 10-minute conversation to discuss how my skill set aligns with your upcoming deliverables.

Thank you for your time and consideration.

Warm regards,

${candidate}
LinkedIn: [Your LinkedIn Profile Link]
Portfolio / GitHub: [Your Portfolio Link]
Contact: [Your Phone / WhatsApp]`,
      hiringManagerPitch: `Hi ${recruiter},

I saw your recent updates on the ${role} expansion at ${company}. 

Rather than sending a standard application, I wanted to reach out directly. My core expertise centers on ${strengths}—specifically helping teams accelerate feature delivery, eliminate technical bottlenecks, and scale operations.

I’d love to share 2 quick ideas on how I could contribute to ${company}'s immediate engineering goals. Do you have 10 minutes next Tuesday or Wednesday for a quick introductory chat?

Best regards,
${candidate}`,
      followUpMessage: `Hi ${recruiter},

Following up on my note last week regarding the ${role} position at ${company}. 

I remain very enthusiastic about the opportunity to contribute my background in ${strengths} to your team. Please let me know if there are any additional details or work samples I can provide to support the hiring team's review.

Looking forward to hearing from you.

Best regards,
${candidate}`,
      professorColdEmail: `Subject: Prospective Graduate Researcher - Fall Admissions & GRA/GTA Inquiry (${candidate})

Dear Professor ${recruiter},

I hope this email finds you well.

I have been following your lab's research at ${company} with great interest, particularly your recent publications in ${strengths}. 

I recently completed my degree in a related STEM discipline and have developed strong hands-on expertise in ${strengths}. Having reviewed your current funded projects, I am eager to contribute to your research group as a Graduate Research Assistant (GRA).

I have attached my academic CV, transcripts, and a summary of my technical projects for your review. I would be honored to schedule a brief 15-minute call to discuss potential research opportunities and assistantship alignment for the upcoming academic intake.

Thank you very much for your time, guidance, and consideration.

Sincerely,

${candidate}
Prospective Graduate Applicant
LinkedIn / Google Scholar: [Your Link]`
    };

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 });
  }
}
