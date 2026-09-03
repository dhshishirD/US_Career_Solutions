import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Job Posting Sites in USA & Global Remote Talent Scouting | Employers Portal",
  description: "Post verified US job openings for free, hire pre-screened global remote contractors (W-8BEN), and reach 100,000+ international candidates.",
  keywords: [
    "free job posting sites in usa",
    "usa job posting sites",
    "it staffing companies in usa",
    "recruitment agencies in usa for foreigners",
    "post a job in usa"
  ]
};

export default function RecruitersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
