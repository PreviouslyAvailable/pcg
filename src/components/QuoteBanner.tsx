import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';

interface QuoteBannerProps {
  quote: string;
  imageSrc: string;
  overlayClassName?: string;
  quoteClassName?: string;
  minHeightClassName?: string;
  priority?: boolean;
}

export default function QuoteBanner({
  quote,
  imageSrc,
  overlayClassName = 'bg-dark/60',
  quoteClassName = 'font-sans text-white text-[clamp(22px,2.8vw,40px)] leading-[1.2] text-center max-w-[720px]',
  minHeightClassName = 'min-h-[420px]',
  priority = false,
}: QuoteBannerProps) {
  return (
    <section className={`relative ${minHeightClassName} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes={IMAGE_SIZES.viewport}
          priority={priority}
          className="object-cover"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>
      <blockquote className={`relative z-10 px-8 ${quoteClassName}`}>{quote}</blockquote>
    </section>
  );
}
