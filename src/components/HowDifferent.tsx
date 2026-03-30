import Image from 'next/image';

interface Feature {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
}

const features: Feature[] = [
  {
    title: 'Conflict-Free Business Model',
    body: 'We focus exclusively on fund management. No advisory and no mixing equity within the same fund.',
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

interface HowDifferentProps {
  images?: string[];
}

export default function HowDifferent({ images = [] }: HowDifferentProps) {
  return (
    <section className="bg-cream py-24 px-[60px]">
      <h2 className="font-serif font-light text-ink text-[clamp(48px,4.9vw,70px)] leading-[1.1] tracking-[-0.02em] mb-16 max-w-[582px]">
        How is PCG different?
      </h2>

      <div className="flex flex-col gap-16">
        {features.map((feature, i) => {
          const imageOnLeft = i % 2 === 0;
          const imgSrc = images[i];

          return (
            <div
              key={feature.title}
              className={`grid grid-cols-2 gap-x-16 items-center ${imageOnLeft ? '' : 'direction-rtl'}`}
            >
              {/* Image */}
              <div className={`relative aspect-[662/367] rounded-[20px] overflow-hidden bg-cream-warm ${imageOnLeft ? 'order-1' : 'order-2'}`}>
                {imgSrc && (
                  <Image src={imgSrc} alt={feature.imageAlt ?? feature.title} fill className="object-cover" />
                )}
              </div>

              {/* Text */}
              <div className={imageOnLeft ? 'order-2' : 'order-1'}>
                <h3 className="font-sans text-ink text-[clamp(24px,2.3vw,33px)] leading-[1.3] mb-4">
                  {feature.title}
                </h3>
                <p className="font-nav text-ink text-[18px] leading-[1.4] max-w-[514px]">
                  {feature.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
