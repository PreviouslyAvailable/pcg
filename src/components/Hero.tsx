import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
  headline?: string;
  subtext?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function Hero({
  imageSrc,
  imageAlt = 'Private Capital Group',
  headline = 'Just what you need to grow.',
  subtext = 'We partner with ambitious businesses to unlock growth through long-term partnerships, deep sector expertise and capital that fits your business.',
  primaryCta = { label: 'Explore Capital Solutions', href: '/borrowers' },
  secondaryCta = { label: 'For Investors', href: '/investors' },
}: HeroProps) {
  return (
    <section className="relative h-screen min-h-[680px] max-h-[900px] overflow-hidden bg-dark">
      {/* Background image */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
      ) : (
        /* Placeholder gradient until real image is supplied */
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-teal/30 to-dark" />
      )}

      {/* Left-to-right gradient overlay — matches Figma */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-16 lg:pb-24">
        <div className="pcg-inner">
        <div className="max-w-[760px]">
          <h1 className="font-serif font-light text-gold text-[clamp(60px,6.4vw,92px)] leading-[1.0] tracking-[-0.015em] mb-6 lg:mb-8">
            {headline}
          </h1>

          <p className="font-nav text-gold/90 text-[18px] leading-[1.3] mb-8 lg:mb-10 max-w-[448px]">
            {subtext}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className="font-sans text-gold text-[16px] uppercase tracking-wide border border-gold rounded-[10px] px-6 py-3 hover:bg-gold/10 transition-colors"
            >
              {primaryCta.label}
            </Link>
            {/* Hidden on mobile — Figma shows single CTA */}
            <Link
              href={secondaryCta.href}
              className="hidden lg:inline-flex font-sans text-gold text-[16px] uppercase tracking-wide border border-gold rounded-[10px] px-6 py-3 hover:bg-gold/10 transition-colors"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
