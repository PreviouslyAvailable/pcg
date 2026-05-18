'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FadeUp from './FadeUp';

interface HeroProps {
  /** Pass an array of 1–3 image URLs. Slideshow only activates with 2+. */
  images?: string[];
  /** @deprecated use images instead */
  imageSrc?: string;
  imageAlt?: string;
  headline?: string;
  subtext?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function Hero({
  images,
  imageSrc,
  imageAlt = 'Private Debt Group',
  headline = 'Just what you need to grow.',
  subtext = 'We partner with ambitious businesses to unlock growth through long-term partnerships, deep sector expertise and capital that fits your business.',
  primaryCta = { label: 'Explore Capital Solutions', href: '/borrowers' },
  secondaryCta = { label: 'For Investors', href: '/investors' },
}: HeroProps) {
  // Normalise: accept either `images` array or legacy `imageSrc`
  const srcs = images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (srcs.length < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % srcs.length);
    }, 10000);
    return () => clearInterval(id);
  }, [srcs.length]);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[780px] overflow-hidden bg-dark">
      {/* Background images — stack all, fade active one in */}
      {srcs.length > 0 ? (
        srcs.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? imageAlt : ''}
            fill
            className="object-cover object-center transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
            priority={i === 0}
          />
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-teal/30 to-dark" />
      )}

      {/* Left-to-right gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-16 lg:pb-20">
        <div className="max-w-[1680px] mx-auto w-full px-4 lg:px-[60px]">
          <div className="max-w-[760px]">
            <FadeUp threshold={0} delay={200} duration={1000}>
              <h1 className="font-serif font-light text-gold text-[clamp(70px,8.3vw,120px)] leading-[0.92] tracking-[-0.015em] mb-6 lg:mb-8">
                {headline}
              </h1>
            </FadeUp>

            <FadeUp threshold={0} delay={450} duration={1000}>
              <p className="font-nav text-gold/90 text-[16px] leading-[1.3] mb-8 lg:mb-10 max-w-[448px]">
                {subtext}
              </p>
            </FadeUp>

            <FadeUp threshold={0} delay={650} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={primaryCta.href}
                  className="font-sans text-gold text-[16px] uppercase tracking-wide border border-gold rounded-[10px] px-6 py-3 hover:bg-gold/10 transition-colors"
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="hidden lg:inline-flex font-sans text-gold text-[16px] uppercase tracking-wide border border-gold rounded-[10px] px-6 py-3 hover:bg-gold/10 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
