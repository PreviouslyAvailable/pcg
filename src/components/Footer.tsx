import Link from 'next/link';
import Logo from '@/components/Logo';
import LinkedInIcon from '@/components/LinkedInIcon';
import NewsletterForm from '@/components/NewsletterForm';
import type { NavLink } from '@/lib/nav';

interface FooterProps {
  navLinks: NavLink[];
  newsletterHeading?: string;
  footerTagline?: string;
}

export default function Footer({
  navLinks,
  newsletterHeading = 'Subscribe to our mailing list to receive the latest updates.',
  footerTagline,
}: FooterProps) {
  return (
    <footer className="bg-cream">
      <div className="pt-12 lg:pt-20 pb-8 lg:pb-12 px-4 lg:px-[45px] max-w-[1680px] mx-auto">
      <div className="mb-8">
        <Logo variant="full" color="black" className="h-14 w-auto" />
        {footerTagline ? (
          <p className="font-nav text-ink/70 text-[15px] mt-4 max-w-[480px]">{footerTagline}</p>
        ) : null}
      </div>

      <div className="border-t border-black/15 pt-10 mb-10">
        <p className="font-sans text-[12px] uppercase tracking-[1px] text-ink/80 mb-4">Newsletter</p>
        <h3 className="font-serif font-light text-ink text-[38px] leading-[1.15] tracking-[-0.48px] mb-6 lg:mb-8 max-w-[437px]">
          {newsletterHeading}
        </h3>
        <NewsletterForm inputId="footer-newsletter-email" autoCompleteSection="footer-newsletter" />
      </div>

      <div className="border-b border-black/15 pb-6 lg:pb-8 flex flex-wrap items-center gap-4 lg:justify-between">
        <div className="flex flex-wrap items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-nav text-[15px] cursor-pointer text-ink hover:opacity-60 transition-opacity">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="font-nav text-[16px] text-ink border border-ink rounded-[8px] px-5 py-1.5 hover:bg-ink/5 transition-colors">
            Contact
          </Link>
        </div>

        <LinkedInIcon href="https://www.linkedin.com/company/private-capital-group-nz/" label="Private Capital Group on LinkedIn" />
      </div>

      <div className="mt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/50">© 2026 Private Capital Group</span>
      </div>
      </div>
    </footer>
  );
}
