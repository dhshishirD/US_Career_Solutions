import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Career & Interview Preparation Academy | STAR Method Q&A & Visa Glossary",
  description: "Master behavioral job interviews with US hiring managers, practice STAR method Q&A simulations, and learn plain-English visa pathways (H-1B, Cap-Exempt, EB-3, W-8BEN).",
  keywords: [
    "us job interview preparation",
    "behavioral interview star method",
    "cap exempt h1b visa explained",
    "w8ben contractor agreement guide",
    "how to email us professors for scholarships"
  ]
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
