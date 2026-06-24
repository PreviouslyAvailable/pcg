'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import Logo from '@/components/Logo';

function useMenuOpenForPath(pathname: string) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;

  return {
    menuOpen,
    openMenu: () => setOpenPath(pathname),
    closeMenu: () => setOpenPath(null),
    toggleMenu: () => setOpenPath(menuOpen ? null : pathname),
  };
}

const defaultNavLinks = [
  { label: 'About', href: '/about' },
  { label: 'Borrowers', href: '/borrowers' },
  { label: 'Investors', href: '/investors' },
  { label: 'News', href: '/news' },
];

interface NavbarProps {
  variant?: 'light' | 'dark';
  navLinks?: Array<{ label?: string; href?: string }>;
}

export default function Navbar({ variant = 'dark', navLinks }: NavbarProps) {
  const menuId = useId();
  const pathname = usePathname();
  const { menuOpen, closeMenu, toggleMenu } = useMenuOpenForPath(pathname);
  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks;

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  const textColor = variant === 'dark' ? 'text-gold' : 'text-ink';
  const borderColor = variant === 'dark' ? 'border-gold' : 'border-ink';

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="py-7" aria-label="Main">
        <div className="flex items-center justify-between px-4 lg:px-[40px] max-w-[1680px] mx-auto">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-8 lg:gap-20">
        <Link href="/" aria-label="Private Capital Group">
          <Logo
            variant="secondary"
            color={variant === 'dark' ? 'light' : 'black'}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav links — grouped with logo on the left */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href ?? '/'}
              className={`font-nav text-[16px] leading-none ${textColor} hover:opacity-70 transition-opacity`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        </div>{/* end left group */}

        {/* Contact CTA — right side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className={`font-nav text-[15px] px-6 py-1.5 rounded-[10px] border transition-colors ${
              variant === 'dark'
                ? `${borderColor} ${textColor} bg-black/30 hover:bg-black/50`
                : `${borderColor} ${textColor} hover:bg-ink/5`
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={`lg:hidden font-nav text-[16px] leading-none ${textColor}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id={menuId} className="lg:hidden bg-dark/95 backdrop-blur-sm py-8">
          <div className="flex flex-col gap-6 px-4 lg:px-[60px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href ?? '/'}
              onClick={closeMenu}
              className="font-nav text-[16px] text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="font-nav text-[16px] text-gold border border-gold rounded-[10px] px-6 py-3 w-fit"
          >
            Contact
          </Link>
          </div>
        </div>
      )}
    </header>
  );
}
