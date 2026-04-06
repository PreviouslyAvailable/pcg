import Image from 'next/image';

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
    <section className={`${background === 'cream' ? 'bg-cream' : 'bg-cream-warm'} pt-36 pb-16 lg:pt-40 lg:pb-20`}>
      <div className="pcg-inner">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left — text */}
        <div>
          <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,92px)] leading-[1.0] tracking-[-0.015em] mb-6">
            {heading}
          </h1>
          {subtext && (
            <p className="font-nav text-ink text-[18px] leading-[1.3] max-w-[480px]">
              {subtext}
            </p>
          )}
        </div>

        {/* Right — image */}
        {imageSrc && (
          <div>
            <div className="relative w-full aspect-[558/380] rounded-[16px] overflow-hidden bg-cream-warm">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
            </div>
            {imageCaption && (
              <p className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/50 mt-2">
                {imageCaption}
              </p>
            )}
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
