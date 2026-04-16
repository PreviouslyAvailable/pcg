import { client, fetchOptions } from '@/sanity/client';
import { navLabelsQuery } from '@/sanity/queries';
import Navbar from './Navbar';

interface NavbarServerProps {
  variant?: 'light' | 'dark';
}

interface NavEntry {
  label?: string;
  slug?: string;
}

interface NavLabels {
  about?: NavEntry;
  borrowers?: NavEntry;
  investors?: NavEntry;
  strategies?: NavEntry;
  insights?: NavEntry;
  contact?: NavEntry;
}

export default async function NavbarServer({ variant }: NavbarServerProps) {
  const labels = await client.fetch<NavLabels>(navLabelsQuery, {}, { ...fetchOptions }).catch(() => null);

  const navLinks = [
    { label: labels?.about?.label || 'About',       href: labels?.about?.slug || '/about' },
    { label: labels?.borrowers?.label || 'Borrowers', href: labels?.borrowers?.slug || '/borrowers' },
    { label: labels?.investors?.label || 'Investors', href: labels?.investors?.slug || '/investors' },
    { label: labels?.insights?.label || 'News',      href: labels?.insights?.slug || '/news' },
    { label: labels?.contact?.label || 'Contact',    href: labels?.contact?.slug || '/contact' },
  ];

  return <Navbar variant={variant} navLinks={navLinks} />;
}
