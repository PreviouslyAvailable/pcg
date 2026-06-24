import { getNavLabels, getSiteSettings } from '@/sanity/loaders';
import { buildNavLinks } from '@/lib/nav';
import Navbar from './Navbar';

interface NavbarServerProps {
  variant?: 'light' | 'dark';
}

export default async function NavbarServer({ variant }: NavbarServerProps) {
  const [labels, settings] = await Promise.all([getNavLabels(), getSiteSettings()]);
  const navLinks = buildNavLinks(labels, settings);

  return <Navbar variant={variant} navLinks={navLinks} />;
}
