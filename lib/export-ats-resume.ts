import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { parseResumeIntelligently } from './resume-intelligence';

export interface ResumeExportData {
  fullName?: string;
  contactInfo?: string;
  professionalSummary?: string;
  targetRole?: string;
  coreCompetencies?: string[];
  resumeBody: string;
}

export async function generateATSResumeDocx(data: ResumeExportData): Promise<Blob> {
  // Intelligently parse candidate details from their actual resume text
  const parsed = parseResumeIntelligently(data.resumeBody, data.targetRole);

  const finalName = (data.fullName && data.fullName !== 'Candidate Resume' && data.fullName.length > 2) 
    ? data.fullName 
    : parsed.fullName;

  // Build real contact line
  const contactParts: string[] = [];
  if (parsed.location) contactParts.push(parsed.location);
  if (parsed.phone) contactParts.push(parsed.phone);
  if (parsed.email) contactParts.push(parsed.email);
  if (parsed.linkedIn) contactParts.push(parsed.linkedIn);

  const contactLine = contactParts.length > 0 
    ? contactParts.join('  |  ') 
    : (data.contactInfo || 'Email: contact@candidate.com  |  Available for Global & US Roles');

  const paragraphs: Paragraph[] = [];

  // 1. Candidate Full Name
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({
          text: finalName.toUpperCase(),
          bold: true,
          size: 32, // 16pt
          font: 'Calibri',
          color: '0F172A',
        }),
      ],
    })
  );

  // 2. Target Role (if provided)
  if (data.targetRole && data.targetRole.trim().length > 1) {
    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: data.targetRole.toUpperCase(),
            bold: true,
            size: 22, // 11pt
            font: 'Calibri',
            color: '0369A1',
          }),
        ],
      })
    );
  }

  // 3. Contact Info Line
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: contactLine,
          size: 19, // 9.5pt
          font: 'Calibri',
          color: '334155',
        }),
      ],
    })
  );

  // Divider Line
  paragraphs.push(
    new Paragraph({
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: '_________________________________________________________________________________',
          color: 'CBD5E1',
          size: 14,
        }),
      ],
    })
  );

  // 4. Professional Summary
  const summaryToUse = data.professionalSummary || parsed.summary;
  if (summaryToUse && summaryToUse.trim()) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 180, after: 80 },
        children: [
          new TextRun({
            text: 'PROFESSIONAL SUMMARY',
            bold: true,
            size: 23, // 11.5pt
            font: 'Calibri',
            color: '0F172A',
          }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: summaryToUse,
            size: 21, // 10.5pt
            font: 'Calibri',
            color: '334155',
          }),
        ],
      })
    );
  }

  // 5. Core Competencies & Skills
  const combinedSkills = Array.from(new Set([...(data.coreCompetencies || []), ...parsed.skills])).filter(Boolean);
  if (combinedSkills.length > 0) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 180, after: 80 },
        children: [
          new TextRun({
            text: 'CORE COMPETENCIES & KEYWORDS',
            bold: true,
            size: 23,
            font: 'Calibri',
            color: '0F172A',
          }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: combinedSkills.slice(0, 16).join('  •  '),
            bold: true,
            size: 20, // 10pt
            font: 'Calibri',
            color: '1E293B',
          }),
        ],
      })
    );
  }

  // 6. Professional Experience
  if (parsed.experience && parsed.experience.length > 0) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 180, after: 100 },
        children: [
          new TextRun({
            text: 'PROFESSIONAL EXPERIENCE & ACHIEVEMENTS',
            bold: true,
            size: 23,
            font: 'Calibri',
            color: '0F172A',
          }),
        ],
      })
    );

    for (const exp of parsed.experience) {
      // Role & Organization header
      const headerParts = [exp.roleTitle, exp.organization, exp.dateRange].filter(Boolean);
      paragraphs.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: exp.roleTitle || 'Professional Role',
              bold: true,
              size: 22,
              font: 'Calibri',
              color: '0F172A',
            }),
            exp.organization ? new TextRun({
              text: `  |  ${exp.organization}`,
              italics: true,
              size: 21,
              font: 'Calibri',
              color: '0369A1',
            }) : new TextRun({ text: '' }),
            exp.dateRange ? new TextRun({
              text: `  (${exp.dateRange})`,
              size: 19,
              font: 'Calibri',
              color: '64748B',
            }) : new TextRun({ text: '' }),
          ],
        })
      );

      // Bullets
      for (const bullet of exp.bullets) {
        if (!bullet.trim()) continue;
        paragraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: bullet.trim(),
                size: 21,
                font: 'Calibri',
                color: '334155',
              }),
            ],
          })
        );
      }
    }
  }

  // 7. Education
  if (parsed.education && parsed.education.length > 0) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: 'EDUCATION & ACADEMIC CREDENTIALS',
            bold: true,
            size: 23,
            font: 'Calibri',
            color: '0F172A',
          }),
        ],
      })
    );

    for (const edu of parsed.education) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: edu.degree || 'Degree',
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '0F172A',
            }),
            edu.institution ? new TextRun({
              text: ` — ${edu.institution}`,
              size: 21,
              font: 'Calibri',
              color: '334155',
            }) : new TextRun({ text: '' }),
            edu.yearOrCgpa ? new TextRun({
              text: ` (${edu.yearOrCgpa})`,
              size: 19,
              font: 'Calibri',
              color: '64748B',
            }) : new TextRun({ text: '' }),
          ],
        })
      );
    }
  }

  // 8. Other Sections (Leadership, Projects, Publications, Trainings)
  if (parsed.otherSections && parsed.otherSections.length > 0) {
    for (const sec of parsed.otherSections) {
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: sec.title.toUpperCase(),
              bold: true,
              size: 23,
              font: 'Calibri',
              color: '0F172A',
            }),
          ],
        })
      );

      for (const line of sec.lines) {
        if (!line.trim()) continue;
        const isBullet = line.startsWith('-') || line.startsWith('•') || line.startsWith('*');
        const clean = isBullet ? line.replace(/^[-•*]\s*/, '') : line;

        paragraphs.push(
          new Paragraph({
            bullet: isBullet ? { level: 0 } : undefined,
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: clean,
                size: 21,
                font: 'Calibri',
                color: '334155',
              }),
            ],
          })
        );
      }
    }
  }

  // 9. Subtle ATS Verification Footer
  paragraphs.push(
    new Paragraph({
      spacing: { before: 300 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Formatted with US Career Solutions Free ATS Resume Engine (www.uscareersolutions.online)',
          size: 15, // 7.5pt
          font: 'Calibri',
          color: '94A3B8',
          italics: true,
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
