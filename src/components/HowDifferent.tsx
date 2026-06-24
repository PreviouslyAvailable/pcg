import Image from 'next/image';
import FadeUp from './FadeUp';
import BodyText from './BodyText';
import { IMAGE_SIZES } from '@/lib/imageSizes';

interface FeatureItem {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[] | string;
  imageSrc?: string;
  imageAlt?: string;
}

interface HowDifferentProps {
  heading?: string;
  items?: FeatureItem[];
}

const defaultImageSrcs = ['/images/how-1.jpg', '/images/how-2.jpg', '/images/how-3.jpg', '/images/how-4.jpg'];

const defaultItems: FeatureItem[] = [
  {
    title: 'Conflict-Free Business Model',
    body: 'We are the only corporate private credit lender that focuses exclusively on funds management.',
    imageAlt: 'Conflict-free business model',
  },
  {
    title: 'Relationship-Driven Approach',
    body: "We spend time face-to-face understanding your business or investment goals. This isn't transactional, we're building long-term partnerships.",
    imageAlt: 'Relationship-driven approach',
  },
  {
    title: 'Local Team, Global Experience',
    body: 'We cover all of New Zealand with offices in both islands. Our global expertise applied at a local, face-to-face level.',
    imageAlt: 'Local team, global experience',
  },
  {
    title: 'Proven Track Record',
    body: "PCG is the fastest-growing private credit fund in New Zealand, trusted by institutional investors and business owners across the country.",
    imageAlt: 'Proven track record',
  },
];

export default function HowDifferent({ heading, items }: HowDifferentProps) {
  const features = items && items.length > 0
    ? items
    : defaultItems.map((item, i) => ({ ...item, imageSrc: defaultImageSrcs[i] }));

  return (
    <section className="bg-cream py-[calc(var(--spacing)*18)]">
      <div className="pcg-inner">
      <FadeUp>
        <h2 className="font-serif font-light text-ink text-[clamp(48px,4.9vw,70px)] leading-[1.03] tracking-[-0.012em] mb-10 lg:mb-16 max-w-[582px]">
          {heading ?? 'How is PCG different?'}
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
        {features.map((feature, i) => (
          <FadeUp key={feature.title ?? i} delay={i * 100} className="flex flex-col">
            <div className="relative aspect-[662/367] rounded-[20px] overflow-hidden bg-cream-warm mb-6 hover-zoom">
              {feature.imageSrc ? (
                <Image src={feature.imageSrc} alt={feature.imageAlt ?? feature.title ?? ''} fill sizes={IMAGE_SIZES.featureCard} className="object-cover img-zoom" />
              ) : null}
            </div>
            <h3 className="font-sans text-ink text-[33px] leading-[1.2] mb-3">
              {feature.title}
            </h3>
            {feature.body && Array.isArray(feature.body) && feature.body.length > 0 ? (
              <BodyText value={feature.body} scheme="light" className="pr-10" />
            ) : (
              <p className="font-nav text-ink text-[16px] leading-[1.3] pr-10">
                {typeof feature.body === 'string' ? feature.body : ''}
              </p>
            )}
          </FadeUp>
        ))}
      </div>
      </div>
    </section>
  );
}
