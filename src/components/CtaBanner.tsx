import Link from 'next/link';

interface CtaBannerProps {
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  background?: 'cream' | 'dark' | 'image';
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

  return (
    <section className={`relative py-24 px-10 flex flex-col items-center ${background === 'dark' ? 'bg-dark' : 'bg-cream'}`}>
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
        <h2 className={`font-serif font-light text-[clamp(36px,3.75vw,54px)] leading-[1.05] tracking-[-0.02em] text-center ${isImageBg || background === 'dark' ? 'text-gold' : 'text-ink'}`}>
          {heading}
        </h2>
        <Link
          href={ctaHref}
          className={`font-sans text-[16px] uppercase tracking-wide px-8 py-3 rounded-[10px] border transition-colors ${isImageBg || background === 'dark' ? 'border-gold text-gold hover:bg-gold/10' : 'border-ink text-ink hover:bg-ink/5'}`}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
