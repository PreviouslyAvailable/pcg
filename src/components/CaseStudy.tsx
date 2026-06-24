'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import type { CaseStudy } from '@/sanity/types';
import FadeUp from './FadeUp';
import { IMAGE_SIZES } from '@/lib/imageSizes';

interface CaseStudyProps {
  slides: CaseStudy[];
  // Fallback props for when Sanity has no data yet
  imageSrc?: string;
  quote?: string;
  label?: string;
}

const fallback: CaseStudy = {
  _id: 'fallback',
  company: 'Rainbow Quarry',
  industry: 'Manufacturing',
  quote: '"We were able to double our capacity with the infrastructure that PCG helped us purchase. This tripled our revenue."',
  attribution: undefined,
  image: undefined,
};

export default function CaseStudy({ slides, imageSrc, quote, label }: CaseStudyProps) {
  const items: CaseStudy[] = slides.length > 0
    ? slides
    : [{
        ...fallback,
        quote: quote ?? fallback.quote,
        image: imageSrc ? { asset: { _id: 'fallback', url: imageSrc } } : undefined,
      }];

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === current || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 350);
  }, [current, transitioning]);

  const next = useCallback(() => goTo((current + 1) % items.length), [goTo, current, items.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, items.length]);

  const slide = items[current];
  const imageUrl = slide.image?.asset?.url ?? imageSrc;

  return (
    <section className="bg-dark py-[calc(var(--spacing)*18)]">
      <div className="pcg-inner flex flex-col items-center">

        {/* Label */}
        <FadeUp threshold={0.1}>
          <p className="font-sans text-[14px] uppercase tracking-[1px] text-gold/60 mb-10">
            {label ?? 'Case Study'}
          </p>
        </FadeUp>

        {/* Quote — fades on transition */}
        <div
          className="text-center max-w-[800px] mb-6 transition-opacity duration-350"
          style={{ opacity: transitioning ? 0 : 1 }}
        >
          <blockquote className="font-sans text-gold text-[30px] lg:text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-[-0.02em] mb-5">
            {slide.quote}
          </blockquote>

          {/* Eyebrow attribution below quote */}
          <p className="font-sans text-[14px] uppercase tracking-[1px] text-gold/50 max-w-none">
            {slide.attribution
              ? `${slide.company} — ${slide.attribution}`
              : slide.industry
                ? `${slide.company} — ${slide.industry}`
                : slide.company}
          </p>
        </div>

        {/* Image */}
        <div
          className="relative w-full max-w-[774px] aspect-[774/374] rounded-[20px] lg:rounded-[23px] overflow-hidden bg-cream-warm mb-8 transition-opacity duration-350"
          style={{ opacity: transitioning ? 0 : 1 }}
        >
          {imageUrl && (
            <Image src={imageUrl} alt={slide.company} fill sizes={IMAGE_SIZES.caseStudy} className="object-cover" />
          )}
        </div>

        {/* Dot navigation */}
        {items.length > 1 && (
          <div className="flex gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`block rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? 'size-[9px] bg-gold'
                    : 'size-[9px] bg-gold/30 hover:bg-gold/60'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
