import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USCIS Service Center Processing Times (2026) | Texas, Nebraska, California, Vermont Benchmarks',
  description: 'Track official adjudication times across Texas (SRC), Nebraska (LIN), California (WAC), and Vermont (EAC) service centers for H-1B, O-1, EB-1, EB-2 NIW, OPT, and Form I-140/I-485 filings.',
  alternates: {
    canonical: 'https://www.uscareersolutions.online/tools/processing-times',
  },
  openGraph: {
    title: 'USCIS Service Center Processing Times & Benchmarks (2026)',
    description: 'Real-time adjudication timelines for H-1B, O-1, EB-2 NIW, and STEM OPT across all USCIS service centers.',
    url: 'https://www.uscareersolutions.online/tools/processing-times',
    siteName: 'US Career Solutions',
    type: 'website',
  }
};

export default function ProcessingTimesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
