import Image from 'next/image';
import FadeUp from './FadeUp';

interface PageHeroProps {
  heading: string;
  subtext?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  background?: 'cream' | 'cream-warm';
}

export default function PageHero({
  heading,
  subtext,
  imageSrc,
  imageAlt = '',
  imageCaption,
  background = 'cream',
}: PageHeroProps) {
  return (
    <section className={`${background === 'cream' ? 'bg-cream' : 'bg-cream-warm'} pt-36 pb-0 lg:pt-40`}>
      <div className="pcg-inner">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left — text */}
        <FadeUp className="pt-[30px]">
          <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,70px)] leading-[1.0] tracking-[-0.015em] mb-6">
            {heading}
          </h1>
          {subtext && (
            <p className="font-nav text-ink text-[16px] leading-[1.3] max-w-[480px]">
              {subtext}
            </p>
          )}
        </FadeUp>

        {/* Right — image */}
        {imageSrc && (
          <FadeUp delay={150}>
            <div className="relative w-full aspect-[558/380] rounded-[16px] overflow-hidden bg-cream-warm hover-zoom">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover img-zoom" priority />
            </div>
            {imageCaption && (
              <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mt-4">
                {imageCaption}
              </p>
            )}
          </FadeUp>
        )}
      </div>
      </div>
    </section>
  );
}
