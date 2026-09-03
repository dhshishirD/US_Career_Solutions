import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "USA University Scholarships & Fully Funded Graduate Assistantships (GRA/GTA)",
  description: "Explore top 100% fully-funded USA university scholarships and graduate assistantships offering full tuition waivers plus $24,000 - $45,000 / year monthly living stipends.",
  keywords: [
    "usa university scholarships",
    "fully funded scholarships in usa",
    "study in usa with scholarship",
    "graduate assistantship full tuition waiver",
    "phd positions in usa with funding",
    "research assistantship in usa"
  ]
};

export default function ScholarshipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
