import Link from 'next/link';

interface CtaBannerProps {
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  background?: 'cream' | 'dark' | 'teal' | 'image';
  imageSrc?: string;
}

export default function CtaBanner({
  heading = 'Ready to access flexible funding that grows with your business?',
  ctaLabel = 'Get started',
  ctaHref = '/contact',
  background = 'cream',
  imageSrc,
}: CtaBannerProps) {
  const isImageBg = background === 'image' && imageSrc;
  const isTeal = background === 'teal';
  const isDark = background === 'dark';
  const isLight = !isImageBg && !isTeal && !isDark;

  return (
    <section
      className={`relative py-20 ${
        isDark ? 'bg-dark' : isTeal ? 'bg-teal' : 'bg-cream'
      }`}
    >
      <div className="pcg-inner flex flex-col items-center">
      {isImageBg && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-[746px]">
        <h2
          className={`font-serif font-light text-[clamp(36px,3.75vw,54px)] leading-[1.05] tracking-[-0.012em] text-center ${
            isLight ? 'text-ink' : 'text-cream'
          }`}
        >
          {heading}
        </h2>
        <Link
          href={ctaHref}
          className={`font-sans text-[16px] uppercase tracking-wide px-8 py-3 rounded-[10px] border transition-colors ${
            isLight
              ? 'border-ink text-ink hover:bg-ink/5'
              : 'border-cream text-cream hover:bg-cream/10'
          }`}
        >
          {ctaLabel}
        </Link>
      </div>
      </div>
    </section>
  );
}
