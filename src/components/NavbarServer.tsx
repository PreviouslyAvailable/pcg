import { getNavLabels } from '@/sanity/loaders';
import { buildNavLinks } from '@/lib/nav';
import Navbar from './Navbar';

interface NavbarServerProps {
  variant?: 'light' | 'dark';
}

export default async function NavbarServer({ variant }: NavbarServerProps) {
  const labels = await getNavLabels();
  const navLinks = buildNavLinks(labels, null);

  return <Navbar variant={variant} navLinks={navLinks} />;
}
