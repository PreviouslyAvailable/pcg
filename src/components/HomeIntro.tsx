import Image from 'next/image';
import Link from 'next/link';
import FadeUp from './FadeUp';
import BodyText from './BodyText';
import { IMAGE_SIZES } from '@/lib/imageSizes';

interface FeatureCard {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[] | string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface HomeIntroProps {
  borrowersImageSrc?: string;
  investorsImageSrc?: string;
  eyebrow?: string;
  borrowersHeading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  borrowersBody?: any[] | string;
  borrowersCtaLabel?: string;
  borrowersCtaHref?: string;
  investorsHeading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  investorsBody?: any[] | string;
  investorsCtaLabel?: string;
  investorsCtaHref?: string;
  featureCards?: FeatureCard[];
}

const defaultCards: FeatureCard[] = [
  {
    title: 'Stability through every cycle',
    body: "There's no substitute for having operated private debt funds through economic recessions, financial crises, and high growth periods. Each creates unique challenges, especially for the uninitiated. Our experience across multiple market cycles in global markets gives us the competence to navigate any environment.",
    ctaLabel: 'Learn more',
    ctaHref: '/about',
  },
  {
    title: 'Cash-on-hand, ready to invest.',
    body: "PCG has grown to $500M Assets Under Management. From $5M at inception to one of New Zealand's largest private credit funds today. This growth reflects the trust our investors and borrowers place in our expertise and execution.",
    ctaLabel: 'About our Funds',
    ctaHref: '/investors',
  },
  {
    title: 'Deep Sector Expertise',
    body: "Extensive expertise spanning multiple sectors and deal structures across New Zealand. We understand the nuances of local business, from seasonal cash flows to regulatory requirements, and use our real-world experience with real businesses to anticipate challenges and structure solutions that actually work for your specific situation.",
    ctaLabel: 'Meet the team',
    ctaHref: '/about',
  },
];

export default function HomeIntro({
  borrowersImageSrc,
  investorsImageSrc,
  eyebrow,
  borrowersHeading,
  borrowersBody,
  borrowersCtaLabel,
  borrowersCtaHref,
  investorsHeading,
  investorsBody,
  investorsCtaLabel,
  investorsCtaHref,
  featureCards,
}: HomeIntroProps) {
  const cards = featureCards && featureCards.length > 0 ? featureCards : defaultCards;

  return (
    <section className="bg-cream-warm pt-10">

      {/* Mobile: single column stacked. Desktop: two-column */}
      <div className="pcg-inner pcg-inner-vertical grid grid-cols-1 lg:grid-cols-2 gap-x-16 pb-10 lg:pb-0">
        {/* Left — Borrowers */}
        <FadeUp>
          <p className="font-sans text-[16px] uppercase tracking-wide text-ink mb-6">
            {eyebrow ?? 'What we do'}
          </p>
          <h2 className="font-serif font-light text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] text-ink mb-5 lg:mb-6">
            {borrowersHeading ?? 'Supporting New Zealand Business Growth'}
          </h2>
          {borrowersBody && Array.isArray(borrowersBody) && borrowersBody.length > 0 ? (
            <BodyText value={borrowersBody} scheme="light" className="mb-6 lg:mb-8" />
          ) : (
            <p className="font-nav text-[16px] leading-[1.3] text-ink mb-6 lg:mb-8">
              {typeof borrowersBody === 'string' ? borrowersBody : "We deliver what traditional lenders can't: flexible capital with the speed and certainty of execution that allows you grow with confidence. With $500M in committed capital and lending that ranges from $5–50M, we use our decades of experience to work with ambitious businesses, providing tailored solutions that enable growth."}
            </p>
          )}
          <OutlineButton href={borrowersCtaHref ?? '/borrowers'}>
            {borrowersCtaLabel ?? 'How it works'}
          </OutlineButton>
        </FadeUp>

        {/* Right column desktop: investors image only */}
        <div className="hidden lg:block">
          <div className="relative w-full aspect-[558/407] rounded-[17px] overflow-hidden">
            {investorsImageSrc ? (
              <Image src={investorsImageSrc} alt="Investors" fill sizes={IMAGE_SIZES.halfViewport} className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-cream border border-black/10" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile: image after left text */}
      <div className="lg:hidden pcg-inner pcg-inner-vertical pt-8 pb-0">
        <div className="relative w-full aspect-[360/272] rounded-[11px] overflow-hidden">
          {borrowersImageSrc ? (
            <Image src={borrowersImageSrc} alt="Supporting NZ businesses" fill sizes={IMAGE_SIZES.halfViewport} className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-cream border border-black/10" />
          )}
        </div>
      </div>

      {/* Mobile: second content block */}
      <div className="lg:hidden pcg-inner pcg-inner-vertical pt-10 pb-10">
        <h2 className="font-serif font-light text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] text-ink mb-5">
          {investorsHeading ?? 'Creating Investment Opportunities'}
        </h2>
          {investorsBody && Array.isArray(investorsBody) && investorsBody.length > 0 ? (
            <BodyText value={investorsBody} scheme="light" className="mb-6" />
          ) : (
            <p className="font-nav text-[16px] leading-[1.3] text-ink mb-6">
              {typeof investorsBody === 'string' ? investorsBody : 'For investors seeking consistent returns and portfolio diversification, we provide access to institutional-quality private debt investments in New Zealand dollars, managed by experienced professionals with a proven track record.'}
            </p>
          )}
        <OutlineButton href={investorsCtaHref ?? '/investors'}>
          {investorsCtaLabel ?? 'Explore investments'}
        </OutlineButton>
      </div>

      {/* Desktop: borrowers image left, investors text right */}
      <div className="hidden lg:grid pcg-inner pcg-inner-vertical pb-[80px] grid-cols-2 gap-x-16 items-start">
        <div className="relative w-full aspect-[558/363] rounded-[17px] overflow-hidden">
          {borrowersImageSrc ? (
            <Image src={borrowersImageSrc} alt="Supporting NZ businesses" fill sizes={IMAGE_SIZES.halfViewport} className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-cream border border-black/10" />
          )}
        </div>
        <div className="pt-[40px]">
          <h2 className="font-serif font-light text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] text-ink mb-6">
            {investorsHeading ?? 'Creating Investment Opportunities'}
          </h2>
          {investorsBody && Array.isArray(investorsBody) && investorsBody.length > 0 ? (
            <BodyText value={investorsBody} scheme="light" className="mb-8" />
          ) : (
            <p className="font-nav text-[16px] leading-[1.3] text-ink mb-8">
              {typeof investorsBody === 'string' ? investorsBody : 'For investors seeking consistent returns and portfolio diversification, we provide access to institutional-quality private debt investments in New Zealand dollars, managed by experienced professionals with a proven track record.'}
            </p>
          )}
          <OutlineButton href={investorsCtaHref ?? '/investors'}>
            {investorsCtaLabel ?? 'Explore investments'}
          </OutlineButton>
        </div>
      </div>

      {/* Three feature cards */}
      <div className="grid pcg-inner pcg-inner-vertical !pb-20 grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <FadeUp key={card.title ?? i} delay={i * 120} className="bg-white rounded-[16px] p-9 flex flex-col justify-start items-start hover-lift">
            <h3 className="font-sans text-[26px] leading-[1.2] text-ink mb-6">{card.title}</h3>
            {card.body && Array.isArray(card.body) && card.body.length > 0 ? (
              <BodyText value={card.body} scheme="light" className="mb-8 flex-1" />
            ) : (
              <p className="font-nav text-[16px] leading-[1.3] text-ink mb-8 flex-1">{typeof card.body === 'string' ? card.body : ''}</p>
            )}
            <OutlineButton href={card.ctaHref ?? '/'}>{card.ctaLabel ?? 'Learn more'}</OutlineButton>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
    >
      {children}
    </Link>
  );
}
