import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fully Funded USA Scholarships & Graduate Assistantships [2026 Directory]',
  description: 'Browse verified 100% fully funded US university scholarships & Graduate Assistantships (GRA/GTA) with $0 tuition, living stipends ($24K–$40K/yr), and F-1 visa support.',
  keywords: ['fully funded graduate assistantship in usa for international students', 'fully funded scholarships in usa', 'graduate assistantships top public university', 'stanford knight hennessy scholarship', 'fulbright foreign student program', 'study in usa for free'],
  openGraph: {
    title: 'Fully Funded USA Scholarships & Graduate Assistantships [2026 Directory]',
    description: 'Browse verified 100% fully funded US university scholarships & Graduate Assistantships (GRA/GTA) with $0 tuition, living stipends ($24K–$40K/yr), and F-1 visa support.',
    url: 'https://www.uscareersolutions.online/scholarships',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fully Funded USA Scholarships & Graduate Assistantships [2026 Directory]',
    description: 'Browse verified 100% fully funded US university scholarships & Graduate Assistantships (GRA/GTA) with $0 tuition, living stipends ($24K–$40K/yr), and F-1 visa support.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
