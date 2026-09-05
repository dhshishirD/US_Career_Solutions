import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';

export interface ResumeExportData {
  fullName: string;
  contactInfo: string;
  professionalSummary: string;
  targetRole: string;
  coreCompetencies: string[];
  resumeBody: string;
}

export async function generateATSResumeDocx(data: ResumeExportData): Promise<Blob> {
  const paragraphs: Paragraph[] = [];

  // 1. Header: Full Name (Bold, 16pt)
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: (data.fullName || 'PROFESSIONAL CANDIDATE').toUpperCase(),
          bold: true,
          size: 32, // 16pt
          font: 'Calibri',
          color: '0F172A',
        }),
      ],
    })
  );

  // 2. Sub-Header: Target Role & Contact Info (10.5pt)
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: data.targetRole ? `${data.targetRole.toUpperCase()}  |  ` : '',
          bold: true,
          size: 21,
          font: 'Calibri',
          color: '0369A1',
        }),
        new TextRun({
          text: data.contactInfo || 'Email: candidate@email.com | LinkedIn: /in/candidate | Tel: +1 (555) 019-2834',
          size: 21,
          font: 'Calibri',
          color: '334155',
        }),
      ],
    })
  );

  // Divider Line
  paragraphs.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: '_________________________________________________________________________________',
          color: 'CBD5E1',
          size: 16,
        }),
      ],
    })
  );

  // 3. Section: Professional Summary
  if (data.professionalSummary) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: 'PROFESSIONAL SUMMARY',
            bold: true,
            size: 24, // 12pt
            font: 'Calibri',
            color: '0F172A',
          }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: data.professionalSummary,
            size: 22, // 11pt
            font: 'Calibri',
            color: '334155',
          }),
        ],
      })
    );
  }

  // 4. Section: Core Competencies & ATS Keywords
  if (data.coreCompetencies && data.coreCompetencies.length > 0) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: 'CORE COMPETENCIES & TECHNICAL KEYWORDS',
            bold: true,
            size: 24,
            font: 'Calibri',
            color: '0F172A',
          }),
        ],
      })
    );

    const skillsText = data.coreCompetencies.join('  •  ');
    paragraphs.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: skillsText,
            bold: true,
            size: 21,
            font: 'Calibri',
            color: '1E293B',
          }),
        ],
      })
    );
  }

  // 5. Section: Professional Experience & Body Text
  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: 'PROFESSIONAL EXPERIENCE & KEY ACHIEVEMENTS',
          bold: true,
          size: 24,
          font: 'Calibri',
          color: '0F172A',
        }),
      ],
    })
  );

  const lines = data.resumeBody.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*');
    const cleanText = isBullet ? trimmed.replace(/^[-•*]\s*/, '') : trimmed;

    const isHeaderLine = !isBullet && (trimmed.includes('|') || trimmed.includes('(20') || trimmed === trimmed.toUpperCase());

    paragraphs.push(
      new Paragraph({
        bullet: isBullet ? { level: 0 } : undefined,
        spacing: { before: isHeaderLine ? 160 : 40, after: 40 },
        children: [
          new TextRun({
            text: cleanText,
            bold: isHeaderLine,
            size: isHeaderLine ? 22 : 21,
            font: 'Calibri',
            color: isHeaderLine ? '0F172A' : '334155',
          }),
        ],
      })
    );
  }

  // 6. Subtle ATS-Proof Footer Watermark
  paragraphs.push(
    new Paragraph({
      spacing: { before: 400 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Formatted with US Career Solutions Free ATS Resume Builder & Checker (www.uscareersolutions.online)',
          size: 16,
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
              top: 720,
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
