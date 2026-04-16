import { client } from '@/sanity/client';
import { navLabelsQuery } from '@/sanity/queries';
import Navbar from './Navbar';

interface NavbarServerProps {
  variant?: 'light' | 'dark';
}

interface NavLabels {
  about?: string;
  borrowers?: string;
  investors?: string;
  strategies?: string;
  insights?: string;
  contact?: string;
}

export default async function NavbarServer({ variant }: NavbarServerProps) {
  const labels = await client.fetch<NavLabels>(navLabelsQuery).catch(() => null);

  const navLinks = [
    { label: labels?.about || 'About', href: '/about' },
    { label: labels?.borrowers || 'Borrowers', href: '/borrowers' },
    { label: labels?.investors || 'Investors', href: '/investors' },
    { label: labels?.strategies || 'Strategies', href: '/strategies' },
    { label: labels?.insights || 'Insights', href: '/insights' },
    { label: labels?.contact || 'Contact', href: '/contact' },
  ];

  return <Navbar variant={variant} navLinks={navLinks} />;
}
