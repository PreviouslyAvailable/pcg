import { getNavLabels } from '@/sanity/loaders';
import Navbar from './Navbar';

interface NavbarServerProps {
  variant?: 'light' | 'dark';
}

export default async function NavbarServer({ variant }: NavbarServerProps) {
  const labels = await getNavLabels();

  const navLinks = [
    { label: labels?.about?.label || 'About',       href: labels?.about?.slug || '/about' },
    { label: labels?.borrowers?.label || 'Borrowers', href: labels?.borrowers?.slug || '/borrowers' },
    { label: labels?.investors?.label || 'Investors', href: labels?.investors?.slug || '/investors' },
    { label: labels?.strategies?.label || 'Strategies', href: labels?.strategies?.slug || '/strategies' },
    { label: labels?.insights?.label || 'News',      href: labels?.insights?.slug || '/news' },
  ];

  return <Navbar variant={variant} navLinks={navLinks} />;
}
