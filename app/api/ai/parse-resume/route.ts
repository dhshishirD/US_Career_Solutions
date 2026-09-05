import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { extractText as extractPdfText } from 'unpdf';

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
        console.warn('Mammoth docx parse error:', err);
      }
    } else if (lowerName.endsWith('.pdf')) {
      try {
        // High-precision modern PDF text extraction via unpdf (PDF.js engine)
        const pdfResult = await extractPdfText(new Uint8Array(fileBuffer));
        if (pdfResult && pdfResult.text) {
          if (Array.isArray(pdfResult.text)) {
            extractedText = pdfResult.text.join('\n');
          } else {
            extractedText = String(pdfResult.text);
          }
        }
      } catch (err) {
        console.warn('unpdf extraction fallback:', err);
        try {
          const pdfParse = require('pdf-parse/lib/pdf-parse.js');
          const data = await pdfParse(fileBuffer);
          extractedText = data.text || '';
        } catch (err2) {
          console.error('All PDF parsers failed:', err2);
        }
      }
    } else {
      // Plain text, markdown, rtf
      extractedText = fileBuffer.toString('utf-8');
    }

    // Clean up extracted text: normalize line breaks, remove null bytes and binary artifacts
    extractedText = extractedText
      .replace(/\0/g, '')
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .trim();

    // Check if result is empty or contaminated with raw PDF binary headers
    if (!extractedText || extractedText.length < 15 || extractedText.startsWith('%PDF-')) {
      return NextResponse.json({ 
        error: 'Unable to extract text from this PDF. The PDF may be a scanned image or protected. Please upload a text-based PDF or a .docx file.' 
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
