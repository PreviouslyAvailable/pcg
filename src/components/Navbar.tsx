'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Borrowers', href: '/borrowers' },
  { label: 'Investors', href: '/investors' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
];

interface NavbarProps {
  variant?: 'light' | 'dark';
}

export default function Navbar({ variant = 'dark' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const textColor = variant === 'dark' ? 'text-gold' : 'text-ink';
  const borderColor = variant === 'dark' ? 'border-gold' : 'border-ink';
  const logoColor = variant === 'dark' ? 'text-gold' : 'text-ink';

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between px-10 py-7">
        {/* Logo */}
        <Link href="/" className={`flex items-center gap-2 ${logoColor}`}>
          {/* Logo mark — simple SVG placeholder matching Figma */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="shrink-0">
            <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="18" cy="18" r="6" fill="currentColor" />
          </svg>
          <span className="font-sans text-[42px] leading-none tracking-[-0.8px]">
            PCG
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-nav text-[16px] leading-none ${textColor} hover:opacity-70 transition-opacity`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className={`font-nav text-[16px] px-6 py-2 rounded-[10px] border ${borderColor} ${textColor} bg-black/30 hover:bg-black/50 transition-colors`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden ${textColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-dark/95 backdrop-blur-sm px-10 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-nav text-[18px] text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="font-nav text-[18px] text-gold border border-gold rounded-[10px] px-6 py-3 w-fit"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
