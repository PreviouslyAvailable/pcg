import { client } from '@/sanity/client';
import { siteSettingsQuery } from '@/sanity/queries';
import type { SiteSettings } from '@/sanity/types';
import Navbar from './Navbar';

interface NavbarServerProps {
  variant?: 'light' | 'dark';
}

export default async function NavbarServer({ variant }: NavbarServerProps) {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null);
  return <Navbar variant={variant} navLinks={settings?.navLinks} />;
}
