import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top 100% Fully Funded USA University Scholarships & Graduate Assistantships (GRA/GTA)',
  description: 'Discover 22+ verified 100% fully-funded US university scholarships and graduate assistantships offering complete out-of-state tuition waivers plus $2,000–$3,800/month living stipends.',
  keywords: ['fully funded scholarships in usa', 'graduate student scholarships', 'fully funded masters programs', 'fully funded phd', 'graduate assistantship full tuition waiver', 'stanford knight hennessy scholarship', 'fulbright foreign student program', 'study in usa for free'],
  openGraph: {
    title: 'Top 100% Fully Funded USA University Scholarships & Graduate Assistantships (GRA/GTA)',
    description: 'Discover 22+ verified 100% fully-funded US university scholarships and graduate assistantships offering complete out-of-state tuition waivers plus $2,000–$3,800/month living stipends.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 100% Fully Funded USA University Scholarships & Graduate Assistantships (GRA/GTA)',
    description: 'Discover 22+ verified 100% fully-funded US university scholarships and graduate assistantships offering complete out-of-state tuition waivers plus $2,000–$3,800/month living stipends.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
