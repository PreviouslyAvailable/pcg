'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import Logo from '@/components/Logo';
import { DEFAULT_NAV_LINKS } from '@/lib/nav';
import { sanitizeHref } from '@/lib/urls';

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

interface NavbarProps {
  variant?: 'light' | 'dark';
  navLinks?: Array<{ label?: string; href?: string }>;
}

export default function Navbar({ variant = 'dark', navLinks }: NavbarProps) {
  const menuId = useId();
  const pathname = usePathname();
  const { menuOpen, closeMenu, toggleMenu } = useMenuOpenForPath(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const links = (navLinks && navLinks.length > 0 ? navLinks : DEFAULT_NAV_LINKS)
    .map((link) => {
      const href = sanitizeHref(link.href) ?? null;
      if (!href || !href.startsWith('/') || !link.label) return null;
      return { label: link.label, href };
    })
    .filter((link): link is { label: string; href: string } => Boolean(link));

  useEffect(() => {
    if (!menuOpen) return;

    const getFocusable = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      const toggle = toggleRef.current;
      const all = toggle ? [toggle, ...focusable.filter((el) => el !== toggle)] : focusable;
      if (all.length === 0) return;

      const first = all[0];
      const last = all[all.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !all.includes(active as HTMLElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    // Move focus into the drawer
    const firstLink = menuRef.current?.querySelector<HTMLElement>('a[href]');
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const textColor = variant === 'dark' ? 'text-gold' : 'text-ink';
  const borderColor = variant === 'dark' ? 'border-gold' : 'border-ink';

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 ${
        menuOpen ? 'bg-dark/95 backdrop-blur-sm' : ''
      }`}
    >
      <nav className="py-5" aria-label="Main">
        <div className="flex items-center justify-between px-4 lg:px-[40px] max-w-[1680px] mx-auto">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-8 lg:gap-20">
        <Link href="/" aria-label="Private Capital Group">
          <Logo
            color={variant === 'dark' ? 'cream' : 'black'}
            className="h-[60px] lg:h-[76px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav links — grouped with logo on the left */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
          ref={toggleRef}
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
        <div ref={menuRef} id={menuId} className="lg:hidden pb-8">
          <div className="flex flex-col gap-6 px-4 lg:px-[60px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
