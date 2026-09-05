import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = file.name;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    const lowerName = fileName.toLowerCase();

    if (lowerName.endsWith('.docx') || lowerName.endsWith('.doc')) {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value || '';
      } catch (err) {
        console.warn('Mammoth docx parse fallback:', err);
        extractedText = fileBuffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      }
    } else if (lowerName.endsWith('.pdf')) {
      try {
        // Fallback or lightweight pdf extraction
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(fileBuffer);
        extractedText = data.text || '';
      } catch (err) {
        console.warn('PDF parse fallback:', err);
        extractedText = fileBuffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      }
    } else {
      // Plain text, markdown, rtf
      extractedText = fileBuffer.toString('utf-8');
    }

    // Clean up excessive whitespace
    extractedText = extractedText.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ').trim();

    if (!extractedText || extractedText.length < 10) {
      return NextResponse.json({ 
        error: 'Unable to extract text from this document. Please ensure the file is not password-protected or copy-paste the text directly.' 
      }, { status: 422 });
    }

    const wordCount = extractedText.split(/\s+/).filter(Boolean).length;

    return NextResponse.json({
      success: true,
      fileName,
      wordCount,
      text: extractedText
    });
  } catch (error: any) {
    console.error('Parse resume error:', error);
    return NextResponse.json({ error: error.message || 'File parsing failed' }, { status: 500 });
  }
}
