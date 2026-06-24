import type { ReactNode } from 'react';
import Navbar from '@/components/NavbarServer';
import Footer from '@/components/FooterServer';

interface SiteChromeProps {
  variant?: 'light' | 'dark';
  children: ReactNode;
}

export default function SiteChrome({ variant = 'light', children }: SiteChromeProps) {
  return (
    <>
      <Navbar variant={variant} />
      {children}
      <Footer />
    </>
  );
}
